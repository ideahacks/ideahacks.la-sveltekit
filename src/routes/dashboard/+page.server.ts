import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Check if user is authenticated
	if (!event.locals.session) {
		// Redirect to login if not authenticated
		throw redirect(302, '/login');
	}

	const uid = event.locals.session.user.id;

	const { data, error } = await event.locals.sb
		.from('applications_2026')
		.select(`status, team_status, team_id,teams_2026 ( id, team_name)`)
		.eq('uid', uid)
		.maybeSingle();

		if (error) {
			console.error('Error fetching application/team data:', error);
		}

		let teamMembers: Array<{
			uid: string;
			role: string;
			applications_2026: {
				uid?: string | null;
				name?: string | null;
			} | null;
		}> = [];

	if (data?.team_id) {
		const { data: membersData, error: membersError } = await event.locals.sb
			.from('team_members_2026')
			.select(`
				uid,
				role,
				applications_2026 (
					uid,
					name
				)
			`)
			.eq('team_id', data.team_id)
			.neq('uid', uid);
	
		if (membersError) {
			console.error('Error fetching team members:', membersError);
		}
	
		if (!membersError && membersData) {
			teamMembers = membersData;
		}
	}



		const { data: receivedInvites, error: invitesError } = await event.locals.sb
	.from('team_invites_2026')
	.select(`
		id,
		status,
		created_at,
		teams_2026 (
			id,
			team_name
		),
		applications_2026!team_invites_2026_inviter_uid_fkey (
			uid,
			name
		)
	`)
	.eq('invitee_uid', uid)
	.eq('status', 'pending')
	.order('created_at', { ascending: false });

	let myTeamRole: string | null = null;

	if (data?.team_id) {
		const { data: myMembership } = await event.locals.sb
			.from('team_members_2026')
			.select('role')
			.eq('team_id', data.team_id)
			.eq('uid', uid)
			.maybeSingle();
	
		myTeamRole = myMembership?.role ?? null;
	}
	

	return {
		session: event.locals.session,
		hasApplied: !!data && !error,
		status: data?.status ?? null,
		teamStatus: data?.team_status?? null,
		teamName: data?.teams_2026?.team_name ?? null,
		teamMembers,
		receivedInvites: receivedInvites ?? [],
		myTeamRole
	};
};

export const actions: Actions = {
	rejectInvite: async (event) => {
		if (!event.locals.session) throw redirect(302, '/login');

		const formData = await event.request.formData();
		const inviteId = formData.get('invite_id');

		if (!inviteId) {
			return fail(400, { error: 'Missing invite id' });
		}

		const { error } = await event.locals.sb
			.from('team_invites_2026')
			.update({ status: 'rejected' })
			.eq('id', inviteId)

		if (error) {
			return fail(500, { error: error.message });
		}

		return { success: true };
	},

	acceptInvite: async (event) => {
		if (!event.locals.session) throw redirect(302, '/login');
	
		const uid = event.locals.session.user.id;
		const formData = await event.request.formData();
		const inviteId = formData.get('invite_id')?.toString();
	
		if (!inviteId) {
			return fail(400, { error: 'Missing invite id' });
		}
	
		// 1) Load the invite and make sure it belongs to this user
		const { data: invite, error: inviteError } = await event.locals.sb
			.from('team_invites_2026')
			.select('id, team_id, invitee_uid, status')
			.eq('id', inviteId)
			.eq('invitee_uid', uid)
			.maybeSingle();
	
		if (inviteError) {
			return fail(500, { error: inviteError.message });
		}
	
		if (!invite) {
			return fail(404, { error: 'Invite not found.' });
		}
	
		if (invite.status !== 'pending') {
			return fail(400, { error: 'This invite is no longer pending.' });
		}
	
		// 2) Check whether user is already in a team
		const { data: appRow, error: appCheckError } = await event.locals.sb
			.from('applications_2026')
			.select('team_id, team_status')
			.eq('uid', uid)
			.maybeSingle();
	
		if (appCheckError) {
			return fail(500, { error: appCheckError.message });
		}
	
		if (!appRow) {
			return fail(404, { error: 'Application record not found.' });
		}
	
		if (appRow.team_id) {
			return fail(400, { error: 'Please leave your current team before switching teams.' });
		}
	
		// Optional extra safety: make sure they are not already in team_members_2026
		const { data: existingMembership, error: membershipCheckError } = await event.locals.sb
			.from('team_members_2026')
			.select('uid, team_id')
			.eq('uid', uid)
			.maybeSingle();
	
		if (membershipCheckError) {
			return fail(500, { error: membershipCheckError.message });
		}
	
		if (existingMembership) {
			return fail(400, { error: 'Please leave your current team before switching teams.' });
		}

		// 3) Update applications_2026
		const { error: appUpdateError } = await event.locals.sb
			.from('applications_2026')
			.update({
				team_id: invite.team_id,
				team_status: 'In Team'
			})
			.eq('uid', uid);
	
		if (appUpdateError) {
			return fail(500, { error: appUpdateError.message });
		}
	
		// 4) Add them to team_members_2026
		const { error: memberInsertError } = await event.locals.sb
			.from('team_members_2026')
			.insert({
				team_id: invite.team_id,
				uid,
				role: 'member'
			});
	
		if (memberInsertError) {
			return fail(500, { error: memberInsertError.message });
		}
	
		
	
		// 5) Mark this invite as accepted
		const { error: inviteUpdateError } = await event.locals.sb
			.from('team_invites_2026')
			.update({ status: 'accepted' })
			.eq('id', inviteId)
			.eq('invitee_uid', uid);
	
		if (inviteUpdateError) {
			return fail(500, { error: inviteUpdateError.message });
		}
	
		// Optional: reject or clear other pending invites for this user
		const { error: otherInvitesError } = await event.locals.sb
			.from('team_invites_2026')
			.update({ status: 'rejected' })
			.eq('invitee_uid', uid)
			.eq('status', 'pending')
			.neq('id', inviteId);
	
		if (otherInvitesError) {
			return fail(500, { error: otherInvitesError.message });
		}
	
		return { success: true };
	},

	leaveTeam: async (event) => {
		if (!event.locals.session) throw redirect(302, '/login');
	
		const uid = event.locals.session.user.id;
	
		// 1) Get the user's current team
		const { data: appRow, error: appError } = await event.locals.sb
			.from('applications_2026')
			.select('team_id, team_status')
			.eq('uid', uid)
			.maybeSingle();
	
		if (appError) {
			return fail(500, { error: appError.message });
		}
	
		if (!appRow) {
			return fail(404, { error: 'Application record not found.' });
		}
	
		if (!appRow.team_id) {
			return fail(400, { error: 'You are not currently on a team.' });
		}
	
		const teamId = appRow.team_id;
	
		// 2) Check this user's membership + role
		const { data: myMembership, error: membershipError } = await event.locals.sb
			.from('team_members_2026')
			.select('uid, team_id, role, joined_at')
			.eq('uid', uid)
			.eq('team_id', teamId)
			.maybeSingle();
	
		if (membershipError) {
			return fail(500, { error: membershipError.message });
		}
	
		if (!myMembership) {
			return fail(404, { error: 'Team membership not found.' });
		}
	
		// 3) If owner, determine whether to transfer ownership or delete team
		if (myMembership.role === 'owner') {
			const { data: otherMembers, error: othersError } = await event.locals.sb
				.from('team_members_2026')
				.select('uid, role, joined_at')
				.eq('team_id', teamId)
				.neq('uid', uid)
				.order('joined_at', { ascending: true });
	
			if (othersError) {
				return fail(500, { error: othersError.message });
			}
	
			// No one else left -> delete the whole team
			if (!otherMembers || otherMembers.length === 0) {
				// Remove owner membership first
				const { error: deleteMembershipError } = await event.locals.sb
					.from('team_members_2026')
					.delete()
					.eq('uid', uid)
					.eq('team_id', teamId);
	
				if (deleteMembershipError) {
					return fail(500, { error: deleteMembershipError.message });
				}
	
				// Clear application row for leaving user
				const { error: appUpdateError } = await event.locals.sb
					.from('applications_2026')
					.update({
						team_id: null,
						team_status: 'No Team'
					})
					.eq('uid', uid);
	
				if (appUpdateError) {
					return fail(500, { error: appUpdateError.message });
				}
	
				// Delete the team itself
				const { error: teamDeleteError } = await event.locals.sb
					.from('teams_2026')
					.delete()
					.eq('id', teamId);
	
				if (teamDeleteError) {
					return fail(500, { error: teamDeleteError.message });
				}
	
				return { success: true };
			}
	
			// Otherwise transfer ownership to earliest joined member
			const newOwner = otherMembers[0];
	
			const { error: transferError } = await event.locals.sb
				.from('team_members_2026')
				.update({ role: 'owner' })
				.eq('uid', newOwner.uid)
				.eq('team_id', teamId);
	
			if (transferError) {
				return fail(500, { error: transferError.message });
			}
		}
	
		// 4) Remove this user from team_members_2026
		const { error: memberDeleteError } = await event.locals.sb
			.from('team_members_2026')
			.delete()
			.eq('uid', uid)
			.eq('team_id', teamId);
	
		if (memberDeleteError) {
			return fail(500, { error: memberDeleteError.message });
		}
	
		// 5) Clear their application team info
		const { error: appUpdateError } = await event.locals.sb
			.from('applications_2026')
			.update({
				team_id: null,
				team_status: 'No Team'
			})
			.eq('uid', uid);
	
		if (appUpdateError) {
			return fail(500, { error: appUpdateError.message });
		}
	
		return { success: true };
	}

};
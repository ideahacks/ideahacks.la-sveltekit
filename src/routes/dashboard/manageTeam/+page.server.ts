import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) throw redirect(302, '/login');

	const uid = event.locals.session.user.id;

	// Get current user's team + role
	const { data: membership, error: membershipError } = await event.locals.sb
		.from('team_members_2026')
		.select(`
			team_id,
			role,
			teams_2026 (
				id,
				team_name
			)
		`)
		.eq('uid', uid)
		.maybeSingle();

        if (membershipError) {
            console.error(membershipError);
            throw redirect(302, '/dashboard');
        }

	if (!membership?.team_id) {
		throw redirect(302, '/dashboard');
	}

	if (membership.role !== 'owner') {
		throw redirect(302, '/dashboard');
	}

	const { data: participants, error: participantsError } = await event.locals.sb
	.from('applications_2026')
	.select('uid, name, status')
	.eq('status', 'accepted')

	if (participantsError) {
		console.error(participantsError);
		return {
			session: event.locals.session,
			participants: [],
			teamName: membership.teams_2026?.team_name ?? null,
			pendingSentInvites: []
		};
	}

	const { data: pendingSentInvites, error: pendingInvitesError } = await event.locals.sb
		.from('team_invites_2026')
		.select(`
			id,
			invitee_uid,
			status,
			created_at,
			applications_2026!team_invites_2026_invitee_uid_fkey (
				uid,
				name
			)
		`)
		.eq('team_id', membership.team_id)
		.eq('status', 'pending')
		.order('created_at', { ascending: false });

	if (pendingInvitesError) {
		console.error(pendingInvitesError);
	}

	return {
		session: event.locals.session,
		participants: participants ?? [],
		teamId: membership.team_id,
		teamName: membership.teams_2026?.team_name ?? null,
		pendingSentInvites: pendingSentInvites ?? []
	};
};


export const actions: Actions = {
	deletePendingInvite: async (event) => {
		if (!event.locals.session) throw redirect(302, '/login');

		const uid = event.locals.session.user.id;
		const formData = await event.request.formData();
		const inviteId = formData.get('invite_id')?.toString();

		if (!inviteId) {
			return fail(400, { error: 'Missing invite id.' });
		}

		// Confirm current user is an owner and get their team id.
		const { data: membership, error: membershipError } = await event.locals.sb
			.from('team_members_2026')
			.select('team_id, role')
			.eq('uid', uid)
			.maybeSingle();

		if (membershipError) return fail(500, { error: membershipError.message });

		if (!membership?.team_id || membership.role !== 'owner') {
			return fail(403, { error: 'Only the team owner can delete pending invites.' });
		}

		// Ensure the invite belongs to this team and is still pending.
		const { data: inviteRow, error: inviteLookupError } = await event.locals.sb
			.from('team_invites_2026')
			.select('id, team_id, status')
			.eq('id', inviteId)
			.eq('team_id', membership.team_id)
			.maybeSingle();

		if (inviteLookupError) return fail(500, { error: inviteLookupError.message });

		if (!inviteRow) {
			return fail(404, { error: 'Invite not found.' });
		}

		if (inviteRow.status !== 'pending') {
			return fail(400, { error: 'Only pending invites can be deleted.' });
		}

		const { error: deleteError } = await event.locals.sb
			.from('team_invites_2026')
			.delete()
			.eq('id', inviteId)
			.eq('team_id', membership.team_id)
			.eq('status', 'pending');

		if (deleteError) return fail(500, { error: deleteError.message });

		return { success: true };
	},

	sendInvites: async (event) => {
		if (!event.locals.session) throw redirect(302, '/login');
	
		const uid = event.locals.session.user.id;
		const formData = await event.request.formData();
		const invitee_uids_raw = formData.get('invitee_uids')?.toString() ?? '[]';
	
		let invitee_uids: string[] = [];
		try {
			invitee_uids = JSON.parse(invitee_uids_raw);
			if (!Array.isArray(invitee_uids)) invitee_uids = [];
		} catch {
			return fail(400, { error: 'Invalid invite list.' });
		}
	
		invitee_uids = invitee_uids.filter((x) => x && x !== uid);
	
		if (invitee_uids.length === 0) {
			return fail(400, { error: 'No invitees selected.' });
		}
	
		// Confirm current user is owner and get team_id
		const { data: membership, error: membershipError } = await event.locals.sb
			.from('team_members_2026')
			.select('team_id, role')
			.eq('uid', uid)
			.maybeSingle();
	
		if (membershipError) return fail(500, { error: membershipError.message });
	
		if (!membership?.team_id) {
			return fail(400, { error: 'You are not currently on a team.' });
		}
	
		if (membership.role !== 'owner') {
			return fail(403, { error: 'Only the team owner can send invites.' });
		}
	
		const team_id = membership.team_id;
	
		// Filter out people already on a team
		const { data: appRows, error: appRowsError } = await event.locals.sb
			.from('applications_2026')
			.select('uid, team_id')
			.in('uid', invitee_uids);
	
		if (appRowsError) return fail(500, { error: appRowsError.message });
	
		const eligibleInvitees = invitee_uids.filter((invitee_uid) => {
			const row = appRows?.find((r: { uid: string; team_id: number | null }) => r.uid === invitee_uid);
			return row && !row.team_id;
		});
	
		if (eligibleInvitees.length === 0) {
			return fail(400, { error: 'Selected users are already on teams or unavailable.' });
		}
	
		// Get existing invites for this team + these users
		const { data: existingInvites, error: existingInvitesError } = await event.locals.sb
			.from('team_invites_2026')
			.select('id, invitee_uid, status')
			.eq('team_id', team_id)
			.in('invitee_uid', eligibleInvitees);
	
		if (existingInvitesError) return fail(500, { error: existingInvitesError.message });
	
		const pendingInvitees = new Set(
			(existingInvites ?? [])
				.filter((r: { id: number; invitee_uid: string; status: string }) => r.status === 'pending')
				.map((r: { id: number; invitee_uid: string; status: string }) => r.invitee_uid)
		);
	
		const rejectedInvites = (existingInvites ?? []).filter(
			(r: { id: number; invitee_uid: string; status: string }) => r.status === 'rejected'
		);
	
		// Re-open rejected invites
		for (const invite of rejectedInvites) {
			const { error: reopenError } = await event.locals.sb
				.from('team_invites_2026')
				.update({
					status: 'pending',
					created_at: new Date().toISOString()
				})
				.eq('id', invite.id);
	
			if (reopenError) return fail(500, { error: reopenError.message });
		}
	
		const reopenedInvitees = new Set(
			rejectedInvites.map((r: { id: number; invitee_uid: string; status: string }) => r.invitee_uid)
		);
	
		// Insert only brand new invites
		const finalInvitees = eligibleInvitees.filter(
			(id) => !pendingInvitees.has(id) && !reopenedInvitees.has(id)
		);
	
		if (finalInvitees.length === 0 && rejectedInvites.length === 0) {
			return fail(400, { error: 'Those users already have pending invites from your team.' });
		}
	
		if (finalInvitees.length > 0) {
			const inviteRows = finalInvitees.map((invitee_uid) => ({
				team_id,
				inviter_uid: uid,
				invitee_uid,
				status: 'pending'
			}));
	
			const { error: inviteErr } = await event.locals.sb
				.from('team_invites_2026')
				.insert(inviteRows);
	
			if (inviteErr) return fail(500, { error: inviteErr.message });
		}
	
		return { success: true };
	}
};
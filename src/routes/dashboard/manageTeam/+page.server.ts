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
		.from('participants_2026')
		.select('id, full_name');

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

		// Filter out existing pending invites for this team
		const { data: existingInvites, error: existingInvitesError } = await event.locals.sb
			.from('team_invites_2026')
			.select('invitee_uid')
			.eq('team_id', team_id)
			.eq('status', 'pending')
			.in('invitee_uid', eligibleInvitees);

		if (existingInvitesError) return fail(500, { error: existingInvitesError.message });

		const alreadyPending = new Set(
            (existingInvites ?? []).map((r: { invitee_uid: string }) => r.invitee_uid)
        );
		const finalInvitees = eligibleInvitees.filter((id) => !alreadyPending.has(id));

		if (finalInvitees.length === 0) {
			return fail(400, { error: 'Those users already have pending invites from your team.' });
		}

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

		return { success: true };
	}
};
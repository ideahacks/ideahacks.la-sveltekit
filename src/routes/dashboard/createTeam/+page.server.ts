import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.session) throw redirect(302, '/login');

	const { data: participants, error } = await event.locals.sb
		.from('participants_2026')
		.select('id, full_name');

	if (error) {
		console.error(error);
		return {
			session: event.locals.session,
			participants: []
		};
	}

	return {
		session: event.locals.session,
		participants
	};
};

export const actions: Actions = {
	createTeam: async (event) => {
		if (!event.locals.session) throw redirect(302, '/login');

		const uid = event.locals.session.user.id;

		const formData = await event.request.formData();
		const team_name = (formData.get('team_name')?.toString() ?? '').trim();
		const invitee_uids_raw = formData.get('invitee_uids')?.toString() ?? '[]';

		if (!team_name) return fail(400, { error: 'Team name is required.' });

		let invitee_uids: string[] = [];
		try {
			invitee_uids = JSON.parse(invitee_uids_raw);
			if (!Array.isArray(invitee_uids)) invitee_uids = [];
		} catch {
			return fail(400, { error: 'Invalid invite list.' });
		}

		// Optional: remove self if they somehow invited themselves
		invitee_uids = invitee_uids.filter((x) => x && x !== uid);

		// 1) Create team
		const { data: team, error: teamErr } = await event.locals.sb
			.from('teams_2026')
			.insert({
				team_name,
				created_by: uid
			})
			.select('id')
			.single();

		if (teamErr) return fail(500, { error: teamErr.message });
		const team_id = team.id as number; // bigint identity comes through as number in JS

				// 2) Add creator as owner member
				const { error: memberErr } = await event.locals.sb
				.from('team_members_2026')
				.insert({
					team_id,
					uid,
					role: 'owner'
				});
	
			if (memberErr) return fail(500, { error: memberErr.message });
	
			// 3) Update creator's application row
			const { error: appUpdateErr } = await event.locals.sb
				.from('applications_2026')
				.update({
					team_id,
					team_status: 'In Team'
				})
				.eq('uid', uid);
	
			if (appUpdateErr) return fail(500, { error: appUpdateErr.message });
	
			// 4) Insert invites (pending)
		if (invitee_uids.length > 0) {
			const inviteRows = invitee_uids.map((invitee_uid) => ({
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

		// Success — you can redirect or return success state
		throw redirect(302, '/dashboard');
	}
};
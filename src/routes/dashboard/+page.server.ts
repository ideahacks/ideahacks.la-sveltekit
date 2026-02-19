import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Check if user is authenticated
	if (!event.locals.session) {
		// Redirect to login if not authenticated
		throw redirect(302, '/login');
	}

	const uid = event.locals.session.user.id;

	const { data, error } = await event.locals.sb
		.from('applications_2026')
		.select('status, team_status')
		.eq('uid', uid)
		.maybeSingle();

	return {
		session: event.locals.session,
		hasApplied: !!data && !error,
		status: data?.status ?? null,
		teamStatus: data?.team_status?? null
	};
};

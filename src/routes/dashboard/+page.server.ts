import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	// Check if user is authenticated
	if (!event.locals.session) {
		// Redirect to login if not authenticated
		throw redirect(302, '/login');
	}

	return {
		session: event.locals.session
	};
};

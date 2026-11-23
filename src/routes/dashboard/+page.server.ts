import { error, redirect } from '@sveltejs/kit';
import { applicationWindow, getApplicationUser } from '$lib/server/applications';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const user = await getApplicationUser(locals);
	if (!user) redirect(302, '/login');

	const { data: application, error: fetchError } = await locals.sb
		.from('applications_2027')
		.select('name, status')
		.eq('uid', user.id)
		.maybeSingle();

	if (fetchError) {
		console.error('Could not load 2027 application status', fetchError.code);
		error(500, 'Could not load your application status. Please try again.');
	}

	return { application, applicationWindow };
};

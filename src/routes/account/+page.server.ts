import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ locals }) => {
	const { data: application, error: applicationError } = await locals.sb
		.from('applications_2025')
		.select()
		.ilike('email', '%' + locals.session?.user.email?.split('@')[0] + '@%');
	if (applicationError) {
		throw error(500, 'Error checking application status');
	}

	return { application: application[0] };
};

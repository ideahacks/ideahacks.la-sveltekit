// https://supabase.com/docs/reference/javascript/select
import { error } from '@sveltejs/kit';
export const load = async ({ locals }) => {
	const { data: admins, error: adminFetchError } = await locals.sb.from('admins_2025').select();

	if (adminFetchError) {
		throw error(500, 'Could not retrieve admins');
	}

	return {
		admins: admins
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		// extract email from form data
		const formData = await request.formData();
		const email = formData.get('email');

		const { data } = await locals.sb.from('admins_2025').select().eq('email', email);

		if (data && data.length > 0) {
			return {
				success: true,
				message: 'That email has been added already!'
			};
		}

		// insert email into supabase database
		const { error } = await locals.sb.from('admins_2025').insert({ email });
		if (error) {
			console.log(error);
			return {
				success: false,
				message: 'Error. Try again later!'
			};
		} else {
			return {
				success: true,
				message: 'Admin email has been added!'
			};
		}
	}
};

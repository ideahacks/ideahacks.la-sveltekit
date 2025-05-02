// https://supabase.com/docs/reference/javascript/select
import { error } from '@sveltejs/kit';
export const load = async ({ locals }) => {
	const { data: participants, error: fetchParticipantsError } = await locals.sb
		.from('participants_2025')
		.select();

	if (fetchParticipantsError) {
		throw error(500, 'Could not retrieve admins');
	}

	return {
		participants: participants
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		// extract email from form data
		const formData = await request.formData();
		const email = formData.get('email');
		const full_name = formData.get('full_name');

		const { data } = await locals.sb.from('participants_2025').select().eq('email', email);

		if (data && data.length > 0) {
			return {
				success: true,
				message: 'That email has been added already!'
			};
		}

		// insert participant into supabase database
		const { error } = await locals.sb.from('participants_2025').insert({ email, full_name });
		if (error) {
			console.log(error);
			return {
				success: false,
				message: 'Error. Try again later!'
			};
		} else {
			return {
				success: true,
				message: 'Participant has been added!'
			};
		}
	}
};

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
	add: async ({ request, locals }) => {
		// extract email from form data
		const formData = await request.formData();
		const email = formData.get('email');
		const full_name = formData.get('full_name');

		const { data } = await locals.sb.from('participants_2025').select().eq('email', email);

		if (data && data.length > 0) {
			return {
				success: true,
				message: 'That email has been added already!',
				action: 'add'
			};
		}

		function generateRandomNumber() {
			return Math.floor(Math.random() * 10000) + 1;
		}

		// insert participant into supabase database
		const { error } = await locals.sb
			.from('participants_2025')
			.insert({ id: generateRandomNumber(), email, full_name });
		if (error) {
			console.log(error);
			return {
				success: false,
				message: 'AddError. Try again later!',
				action: 'add'
			};
		} else {
			return {
				success: true,
				message: 'Participant has been added!',
				action: 'add'
			};
		}
	},
	delete: async ({ request, locals }) => {
		const formData = await request.formData();
		const emailToDelete = formData.get('email');

		if (!emailToDelete) {
			return {
				success: false,
				message: 'Please provide an email to delete.',
				action: 'delete'
			};
		}

		const { data } = await locals.sb.from('participants_2025').select().eq('email', emailToDelete);
		console.log(emailToDelete);

		if (!data || data.length === 0) {
			return {
				success: false,
				message: 'That email does not exist!',
				action: 'delete'
			};
		}

		const { error: deleteError } = await locals.sb
			.from('participants_2025')
			.delete()
			.eq('email', emailToDelete);

		if (deleteError) {
			console.error('Delete Error:', deleteError);
			return {
				success: false,
				message: 'Error deleting participant. Try again later!',
				action: 'delete'
			};
		} else {
			return {
				success: true,
				message: `Participant with email '${emailToDelete}' has been deleted!`,
				action: 'delete'
			};
		}
	}
};

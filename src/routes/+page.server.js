import { supabase } from '$lib/supabaseClient';

function validateEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}

export const actions = {
	default: async (event) => {
		// extract email from form data
		const formData = await event.request.formData();
		const email = formData.get('email');

		// ensure email is valid
		if (!validateEmail(email)) {
			return {
				success: false,
				message: 'Invalid Email!'
			};
		}

		// check for duplicates
		const { data } = await supabase.from('emails_2025').select().eq('email', email);

		if (data && data.length > 0) {
			return {
				success: true,
				message: "You've been added already!"
			};
		}

		// insert email into supabase database
		const { error } = await supabase.from('emails_2025').insert({ email });
		if (error) {
			console.log(error);
			return {
				success: false,
				message: 'Error. Try again later!'
			};
		} else {
			return {
				success: true,
				message: "You've been added!"
			};
		}
	}
};

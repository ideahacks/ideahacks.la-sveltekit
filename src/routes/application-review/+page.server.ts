import { error } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private';
export const load = async ({ locals: { supabase } }) => {
	const { data: applications, error: applicationError } = await supabase
		.from('applications_2025')
		.select();
	if (applicationError) {
		throw error(500, 'Could not retrieve apps, try again or email webmaster@ieeebruins.com');
	}
	return { applications: applications ?? [] };
};

export const actions = {
	close: () => {
		console.log('nada');
	},
	pending: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { error } = await supabase
			.from('applications_2025')
			.update({ status: 'Pending' })
			.eq('email', formData.get('email'));
		if (error) {
			return {
				success: false,
				message: 'Error. Try again later!'
			};
		} else {
			return {
				success: true,
				message: 'Updated!'
			};
		}
	},
	accept: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { error } = await supabase
			.from('applications_2025')
			.update({ status: 'Accepted' })
			.eq('email', formData.get('email'));
		if (error) {
			return {
				success: false,
				message: 'Error. Try again later!'
			};
		} else {
			return {
				success: true,
				message: 'Updated!'
			};
		}
	},
	reject: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { error } = await supabase
			.from('applications_2025')
			.update({ status: 'Rejected' })
			.eq('email', formData.get('email'));
		if (error) {
			return {
				success: false,
				message: 'Error. Try again later!'
			};
		} else {
			return {
				success: true,
				message: 'Updated!'
			};
		}
	},
	waitlist: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const { error } = await supabase
			.from('applications_2025')
			.update({ status: 'Waitlisted' })
			.eq('email', formData.get('email'));
		if (error) {
			return {
				success: false,
				message: 'Error. Try again later!'
			};
		} else {
			return {
				success: true,
				message: 'Updated!'
			};
		}
	},
	authenticate: async ({ request }) => {
		const formData = await request.formData();
		return { success: formData.get('password') === PASSWORD };
	}
};

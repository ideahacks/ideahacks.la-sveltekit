import { error } from '@sveltejs/kit';
import { PASSWORD } from '$env/static/private';
export const load = async ({ locals: { supabase }, cookies }) => {
	const authenticated = cookies.get('authenticated');
	const { data: applications, error: applicationError } = await supabase
		.from('applications_2025')
		.select();
	if (applicationError) {
		throw error(500, 'Could not retrieve apps, try again or email webmaster@ieeebruins.com');
	}
	return { applications: applications ?? [], authenticated: authenticated === 'true' };
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
	authenticate: async ({ request, cookies }) => {
		const formData = await request.formData();
		cookies.set('authenticated', 'true', { path: '/' });
		return { success: formData.get('password') === PASSWORD };
	}
};

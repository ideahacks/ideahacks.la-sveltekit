import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ locals }) => {
	const { data: admin, error: adminError } = await locals.sb
		.from('admins_2025')
		.select()
		.eq('email', locals.session?.user.email);
	if (adminError) {
		throw error(500, 'Error checking admin status');
	}
	// console.log(admin);
	if (admin.length > 0) {
		const { data: applications, error: applicationError } = await locals.sb
			.from('applications_2025')
			.select();
		if (applicationError) {
			throw error(500, 'Could not retrieve apps, try again or email webmaster@ieeebruins.com');
		}
		return { applications: applications ?? [], is_admin: true };
	}
	return { applications: [], is_admin: false };
};

export const actions: Actions = {
	close: () => {
		console.log('nada');
	},
	pending: async ({ request, locals }) => {
		const formData = await request.formData();
		const { error } = await locals.sb
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
	accept: async ({ request, locals }) => {
		const formData = await request.formData();
		const { error } = await locals.sb
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
	reject: async ({ request, locals }) => {
		const formData = await request.formData();
		const { error } = await locals.sb
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
	waitlist: async ({ request, locals }) => {
		const formData = await request.formData();
		const { error } = await locals.sb
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
	}
};

import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.session?.user.email) return { is_admin: false };

	const { data: admin, error: adminError } = await event.locals.sb
		.from('admins_2026')
		.select()
		.eq('email', event.locals.session?.user.email);
	if (adminError) {
		console.log(adminError);
		error(500, 'Error checking admin status');
	}

	return {
		is_admin: admin.length > 0
	};
};

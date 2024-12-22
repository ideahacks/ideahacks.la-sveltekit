import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	const { data: admin, error: adminError } = await event.locals.sb
		.from('admins_2025')
		.select()
		.eq('email', event.locals.session?.user.email);
	if (adminError) {
		throw error(500, 'Error checking admin status');
	}

	return {
		session: await getServerSession(event),
		is_admin: admin.length > 0
	};
};

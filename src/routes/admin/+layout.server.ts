import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export async function load({ locals: { supabase, getSession } }) {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login?next=admin');
	}

	const { data, error: adminError } = await supabase.from('admins').select();

	if (adminError) {
		throw error(500, 'Could not retrieve parts, please try again!');
	}

	// Only allow authenticated users in `admins` table
	if (!data?.length) {
		throw error(403, 'You are not authorized to access this page');
	}
}

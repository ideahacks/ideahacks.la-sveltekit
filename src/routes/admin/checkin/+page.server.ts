import { redirect } from '@sveltejs/kit';

export async function load({ locals: { supabase, getSession } }) {
	const session = await getSession();

	if (!session) {
	 throw redirect(303, "/login?next=admin/checkin")
	}

	const { data, error } = await supabase.from('parts').select();

	if (error) {
		return { parts: null };
	}

	return { parts: data };
}

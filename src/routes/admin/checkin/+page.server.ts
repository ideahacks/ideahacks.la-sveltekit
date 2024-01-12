import { error } from '@sveltejs/kit';

export async function load({ locals: { supabase } }) {
	const { data, error: partsError } = await supabase.from('parts').select();

	if (partsError) {
		throw error(
			500,
			'Could not retrieve parts, please try again or email webmaster@ieeebruins.com'
		);
	}

	return { parts: data };
}

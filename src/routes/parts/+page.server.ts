// https://supabase.com/docs/reference/javascript/select
import { error } from '@sveltejs/kit';
export const load = async ({ locals: { supabase } }) => {
	const { data: parts, error: partsFetchError } = await supabase.from('parts').select();

	if (partsFetchError) {
		throw error(500, 'Could not retrieve parts');
	}

	return { parts: parts ?? [] };
};

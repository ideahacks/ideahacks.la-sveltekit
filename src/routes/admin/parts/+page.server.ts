// https://supabase.com/docs/reference/javascript/select
import { error } from '@sveltejs/kit';
export const load = async ({ locals }) => {
	const { data: parts, error: partsFetchError } = await locals.sb.from('parts_2025').select();

	if (partsFetchError) {
		throw error(500, 'Could not retrieve parts');
	}

	for (let i = 0; i < parts.length; i++) {
		parts[i].tags = JSON.parse(parts[i].tags);
	}

	return { parts: parts };
};

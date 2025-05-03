// https://supabase.com/docs/reference/javascript/select
import { error } from '@sveltejs/kit';
export const load = async ({ locals }) => {
	const { data: parts, error: partsFetchError } = await locals.sb.from('parts_2025').select();

	if (partsFetchError) {
		throw error(500, 'Could not retrieve parts');
	}

	for (let i = 0; i < parts.length; i++) {
		if (parts[i].requires_checkout === 'Checkout') {
			parts[i].requires_checkout = true;
		} else {
			parts[i].requires_checkout = false;
		}

		if (parts[i].alt_ids) {
			parts[i].alt_ids = parts[i].alt_ids.split(', ');
		} else {
			parts[i].alt_ids = [];
		}
		console.log(parts[i].alt_ids);

		if (parts[i].tags) {
			parts[i].tags = parts[i].tags.split(', ');
		} else {
			parts[i].tags = [];
		}
	}

	return { parts: parts };
};

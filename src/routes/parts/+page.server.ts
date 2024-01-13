import { error } from '@sveltejs/kit';

export async function load({ locals: { supabase } }) {
	const { data: parts, error: partsError } = await supabase.from('parts').select();
	const { data: teamsParts, error: teamsPartsError } = await supabase.from('teams_parts').select();

	if (partsError) {
		throw error(500, 'Could not retrieve parts, try again or email webmaster@ieeebruins.com');
	}

	if (teamsPartsError) {
		throw error(
			500,
			'Could not retrieve teams associated with parts, try again or email webmaster@ieeebruins.com'
		);
	}

	return { parts, teamsParts };
}

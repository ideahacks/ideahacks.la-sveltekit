import type { PostgrestError } from '@supabase/supabase-js';
import { error } from '@sveltejs/kit';
import { handle } from '../../../hooks.server.js';

function handleError(postgrestError: PostgrestError | null, table: string) {
	if (postgrestError) {
		throw error(500, `Could not retrieve ${table}: ${JSON.stringify(postgrestError)}`);
	}
}

export async function load({ locals: { supabase } }) {
	const { data: teams, error: teamsError } = await supabase.from('teams').select('team_id');
	const { data: parts, error: partsError } = await supabase
		.from('parts')
		.select('part_id, name, quantity');
	const { data: teamsParts, error: teamsPartsError } = await supabase
		.from('teams_parts')
		.select('team_id, part_id, quantity');

	handleError(teamsError, 'teams');
	handleError(partsError, 'parts');
	handleError(teamsPartsError, 'teams_parts');

	return { teams: teams ?? [], parts: parts ?? [], teamsParts: teamsParts ?? [] };
}

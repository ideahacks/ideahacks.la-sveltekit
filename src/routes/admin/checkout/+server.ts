import { error, json } from '@sveltejs/kit';

export async function POST({ request, locals: { supabase } }) {
	const { teamNumber, cart } = await request.json();

	// Check if team exists
	const { data: team, error: teamError } = await supabase
		.from('teams')
		.select()
		.eq('team_id', teamNumber);

	if (teamError || !team?.length) {
		throw error(400, `Could not find team ${teamNumber}`);
	}

	// Update quantities by adding number of already checked out parts
	const { data: existingParts, error: existingPartsError } = await supabase
		.from('teams_parts')
		.select()
		.eq('team_id', teamNumber);

	if (existingPartsError) {
		throw error(500, 'Could not get existing parts');
	}

	const checkoutParts = cart.map((part) => {
		part.id = String(part.id).padStart(4, '0');
		const already_checked_out =
			existingParts?.find((existingPart) => existingPart.part_id === part.id)?.quantity ?? 0;
		return {
			team_id: teamNumber,
			part_id: part.id,
			quantity: part.quantity + already_checked_out
		};
	});

	// Upsert all the checked out parts
	const { data: partsData, error: partsError } = await supabase
		.from('teams_parts')
		.upsert(checkoutParts)
		.select();

	if (partsError) {
		throw error(500, `Could not upsert ${checkoutParts.length} parts: ${partsError.code}`);
	}

	return json({ teamNumber, partsData });
}

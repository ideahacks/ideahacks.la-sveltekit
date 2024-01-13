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

	const { data: existingParts, error: existingPartsError } = await supabase
		.from('teams_parts')
		.select()
		.eq('team_id', teamNumber);

	if (existingPartsError) {
		throw error(500, 'Could not get existing parts');
	}

	const parts = await Promise.all(
		cart.map(async (part: { part_id: string; quantity: number }) => {
			const existingPart = existingParts?.find(
				(existingPart) => existingPart.part_id === part.part_id
			);

			if (!existingPart) {
				return { warning: `Part ${part.part_id} is not owned by team ${teamNumber}` };
			}

			const updatedQuantity = existingPart.quantity - part.quantity;

			// Delete a part if entire quantity returned, update otherwise
			if (updatedQuantity <= 0) {
				const { error: deleteError } = await supabase
					.from('teams_parts')
					.delete()
					.eq('team_id', teamNumber)
					.eq('part_id', part.part_id);

				if (deleteError) {
					throw error(500, `Could not delete part ${part.part_id}: ${JSON.stringify(deleteError)}`);
				}
			} else {
				const { error: updateError } = await supabase
					.from('teams_parts')
					.update({ quantity: updatedQuantity })
					.eq('team_id', teamNumber)
					.eq('part_id', part.part_id);

				if (updateError) {
					throw error(500, `Could not update part ${part.part_id}: ${JSON.stringify(updateError)}`);
				}

				return {
					team_id: teamNumber,
					part_id: part.part_id,
					quantity: updatedQuantity
				};
			}
		})
	);

	return json({ teamNumber, parts });
}

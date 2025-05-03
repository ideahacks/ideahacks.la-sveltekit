import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { data: admin, error: adminError } = await locals.sb
		.from('admins_2025')
		.select()
		.eq('email', locals.session?.user.email);
	if (adminError) {
		throw error(500, 'Error checking admin status');
	}
	// console.log(admin);
	if (admin.length > 0) {
		const { data: teams, error: teamsError } = await locals.sb.from('teams_2025').select();
		if (teamsError) {
			throw error(500, 'Error getting teams');
		}
		// console.log(admin);
		const { data: participants, error: participantsError } = await locals.sb
			.from('participants_2025')
			.select();
		if (participantsError) {
			throw error(500, 'Error getting participants');
		}

		const { data: teams_parts, error: teamsPartsError } = await locals.sb
			.from('teams_parts_2025')
			.select();
		if (teamsPartsError) {
			throw error(500, 'Error getting teamsparts');
		}

		const { data: parts, error: partsFetchError } = await locals.sb.from('parts_2025').select();
		if (partsFetchError) {
			throw error(500, 'Error getting parts');
		}

		return { teams, participants, teams_parts, parts, admin: true };
	}
	return { teams: [], participants: [], teams_parts: [], admin: false };
};

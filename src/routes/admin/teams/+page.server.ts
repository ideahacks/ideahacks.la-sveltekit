import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

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
			throw error(500, 'Error getting teams');
		}
		return { teams, participants, admin: true };
	}
	return { teams: [], participants: [], admin: false };
};

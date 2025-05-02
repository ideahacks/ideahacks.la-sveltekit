import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ locals }) => {
	const { data: participant, error: participantError } = await locals.sb
		.from('participants_2025')
		.select()
		.eq('email', locals.session?.user.email);
	if (participantError) {
		throw error(500, 'Error checking participant status');
	}

	const { data: application, error: applicationError } = await locals.sb
		.from('applications_2025')
		.select()
		.ilike('email', '%' + locals.session?.user.email?.split('@')[0] + '@%');
	if (applicationError) {
		throw error(500, 'Error checking application status');
	}

	if (participant[0] && participant[0].team_id) {
		const { data: team, error: teamError } = await locals.sb
			.from('teams_2025')
			.select()
			.eq('id', participant[0].team_id);
		if (teamError) {
			console.log(teamError);
			throw error(500, 'Error checking team status');
		}

		const { data: teamMembers, error: membersError } = await locals.sb
			.from('participants_2025')
			.select()
			.eq('team_id', team[0].id);
		if (membersError) {
			console.log(membersError);
			throw error(500, 'Error fetching members!');
		}

		const { data: teamParts, error: teamPartsError } = await locals.sb
			.from('teams_parts_2025')
			.select(`part_id, quantity, parts_2025 (part_id, name, image_url)`)
			.eq('team_id', team[0].id);
		if (teamPartsError) {
			console.log(teamPartsError);
			throw error(500, 'Error fetching team parts!');
		}

		return {
			participant: participant[0],
			application: application[0],
			team: team[0],
			members: teamMembers,
			parts: teamParts
		};
	}

	return {
		participant: participant[0],
		application: application[0],
		team: null,
		members: null,
		parts: null
	};
};

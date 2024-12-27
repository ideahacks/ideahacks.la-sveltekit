import { error } from '@sveltejs/kit';
import type { Actions } from './$types';

function generateTeamName() {
	const nouns = [
		'Computing',
		'Processors',
		'Cores',
		'RAM',
		'ROM',
		'Bandwidth',
		'Latency',
		'Throughput',
		'Electronics',
		'Transistors',
		'Diodes',
		'ICs',
		'PCBs',
		'Microchips',
		'Sensors',
		'Actuators',
		'Networks',
		'Nodes',
		'Routers',
		'Switches',
		'Protocols',
		'Topologies',
		'Bandwidth',
		'Latency',
		'Software',
		'Hash Maps',
		'Sets',
		'Arrays',
		'Search Trees',
		'Code',
		'Algorithms',
		'APIs',
		'Libraries',
		'Frameworks',
		'Data Structures',
		'Cybersecurity',
		'Encryption',
		'Firewalls',
		'Intrusion Detection',
		'Vulnerability',
		'Threat',
		'Risk'
	];

	const adjectives = [
		'Computing',
		'Processors',
		'Cores',
		'RAM',
		'ROM',
		'Bandwidth',
		'Latency',
		'Throughput',
		'Electronics',
		'Transistors',
		'Diodes',
		'ICs',
		'PCBs',
		'Microchips',
		'Sensors',
		'Actuators',
		'Networks',
		'Nodes',
		'Routers',
		'Switches',
		'Protocols',
		'Topologies',
		'Bandwidth',
		'Latency',
		'Software',
		'Hash Maps',
		'Sets',
		'Arrays',
		'Search Trees',
		'Code',
		'Algorithms',
		'APIs',
		'Libraries',
		'Frameworks',
		'Data Structures',
		'Cybersecurity',
		'Encryption',
		'Firewalls',
		'Intrusion Detection',
		'Vulnerability',
		'Threat',
		'Risk'
	];
	const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
	return `${randomAdjective} ${randomNoun}`;
}

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
		return { participant: participant[0], application: application[0], team: team[0] };
	}

	return { participant: participant[0], application: application[0], team: null };
};

export const actions: Actions = {
	accept_invitation: async ({ request, locals }) => {
		const { data: application, error: applicationError } = await locals.sb
			.from('applications_2025')
			.select()
			.ilike('email', '%' + locals.session?.user.email?.split('@')[0] + '@%');
		if (applicationError || application == null) {
			throw error(500, 'Error checking application status');
		}
		const { data: participant, error: createUserError } = await locals.sb
			.from('participants_2025')
			.insert({
				full_name: application[0].full_name,
				email: application[0].email,
				app_id: application[0].user_id
			})
			.select();
		if (createUserError) {
			throw error(500, `Error Creating User!`);
		}

		return { participant };
	},
	create_team: async ({ request, locals }) => {
		let keepGenerating = true;
		let team_name = '';
		while (keepGenerating) {
			team_name = generateTeamName();
			const { data: teamExists, error: teamExistsError } = await locals.sb
				.from('teams_2025')
				.select()
				.eq('team_name', team_name);

			if (teamExistsError) {
				throw error(500, 'Error checking team name');
			}

			if (teamExists.length === 0) {
				keepGenerating = false;
				break;
			}
		}

		// create the team
		const { data: team, error: teamError } = await locals.sb
			.from('teams_2025')
			.insert({ team_name: team_name })
			.select();
		if (teamError) {
			throw error(500, 'Error creating team');
		}

		// add user to the team
		const { error: participantError } = await locals.sb
			.from('participants_2025')
			.update({ team_id: team[0].id })
			.eq('email', locals.session?.user.email);
		if (participantError) {
			throw error(500, 'Error adding user to team');
		}
	}
};

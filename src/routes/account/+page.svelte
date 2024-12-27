<script>
	import { supabaseClient } from '$lib/supabase';
	import { SupabaseClient } from '@supabase/supabase-js';

	export let data;

	let currentTeam = data.team;
	let teamLoading = false;
	let currentParticipant = data.participant;
	let participantLoading = false;

	function generateTeamCode() {
		const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
		return randomNumber.toString().padStart(4, '0'); // Pad the number with leading zeros to ensure 4 digits
	}

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

	async function createTeam() {
		teamLoading = true;
		let keepGenerating = true;
		let team_name = '';
		let team_code = '';
		while (keepGenerating) {
			team_name = generateTeamName();
			team_code = generateTeamCode();
			const { data: teamExists, error: teamExistsError } = await supabaseClient
				.from('teams_2025')
				.select()
				.or('team_name.eq.' + team_name + ',team_code.eq.' + team_code);
			console.log(teamExists);
			if (teamExistsError) {
				alert('Error checking if team exists');
			}

			if (!teamExists || teamExists.length === 0) {
				keepGenerating = false;
			} else {
				console.log(team_name);
			}
		}

		// create the team
		const { data: team, error: teamError } = await supabaseClient
			.from('teams_2025')
			.insert({ team_name: team_name, team_code: team_code })
			.select();
		if (teamError) {
			console.log(teamError);
			alert('Error creating team!');
		}

		// add curr user to the team
		const { error: participantError } = await supabaseClient
			.from('participants_2025')
			.update({ team_id: team[0].id })
			.eq('email', data.session?.user.email);
		if (participantError) {
			alert('Error adding user to team!');
		}

		currentTeam = team[0];
		teamLoading = false;
	}

	async function acceptInvitation() {
		participantLoading = true;
		const { data: application, error: applicationError } = await supabaseClient
			.from('applications_2025')
			.select()
			.ilike('email', '%' + data.session?.user.email?.split('@')[0] + '@%');
		if (applicationError || application == null) {
			alert('Error checking application status');
		}
		const { data: participant, error: createUserError } = await supabaseClient
			.from('participants_2025')
			.insert({
				full_name: application[0].full_name,
				email: application[0].email,
				app_id: application[0].user_id
			})
			.select();
		if (createUserError) {
			alert('Error creating user!');
		}

		currentParticipant = participant[0];
	}
</script>

<div class="z-10 mx-5 my-10 max-w-4xl font-encode text-white md:mx-24">
	{#if data.session}
		{#if currentParticipant}
			<p>
				Hello {currentParticipant.full_name}!
			</p>
			<p>Email: {currentParticipant.email}</p>
			<h1 class="mt-10 font-paytone text-2xl">Your Team</h1>

			{#if currentTeam == null}
				<p>No team yet? Create one!</p>
				<p>If you don't have a team in mind, there is no need to fill it out</p>

				<button class="btn border-none bg-opacity-10 text-white" on:click={createTeam}
					>Create Team</button
				>

				<br />
				<br />
				<p>Join Team</p>
				<input
					name="preferred_name"
					placeholder="Enter Team Code"
					class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
				/>
			{:else}
				<p>Team Name: {currentTeam.team_name}</p>
				<p>Join Code: {currentTeam.team_code}</p>
			{/if}

			<h1 class="mt-10 font-paytone text-2xl">Parts</h1>
			<p>As you check out parts during the event, you will see them here</p>
		{:else if data.application}
			<p>
				Hello {data.application.preferred_name === ''
					? data.application.full_name
					: data.application.preferred_name}!
			</p>

			<h1 class="mt-10 font-paytone text-2xl">Your Application</h1>

			<p><span class="font-bold">Status:</span> {data.application.status}</p>
			<br />
			{#if data.application.status === 'Accepted'}
				<p class="">I will be attending IDEA Hacks</p>

				<button class="btn border-none bg-opacity-10 text-white" on:click={acceptInvitation}
					>Yes!</button
				>

				<p />
				<h1 class="mt-10 font-paytone text-2xl">Your Team</h1>
				<p>You will be able to create and join your team once you have clicked "yes" above</p>
				<h1 class="mt-10 font-paytone text-2xl">Parts</h1>
				<p>As you check out parts during the event, you will see them here</p>
			{:else}
				<p><span class="font-bold">Name:</span> {data.application.full_name}</p>
				<p><span class="font-bold">Email:</span> {data.application.email}</p>
				<p><span class="font-bold">School:</span> {data.application.school}</p>
				<p><span class="font-bold">Major:</span> {data.application.major}</p>
				<p>
					<span class="font-bold">Prior Engineering Experience:</span>
					{data.application.prior_engineering_experience}
				</p>
				<p><span class="font-bold">Why IDEA Hacks:</span> {data.application.why_ideahacks}</p>
				<p><span class="font-bold">Hackathon Ideas:</span> {data.application.hackathon_ideas}</p>
				<p>
					<span class="font-bold">Prior Hackathon Experience:</span>
					{data.application.prior_hackathon_experience}
				</p>
				<p><span class="font-bold">Suggested Parts:</span> {data.application.suggested_parts}</p>
				<p><span class="font-bold">Shirt Size:</span> {data.application.shirt_size}</p>
				<p>
					<span class="font-bold">Dietary Restrictions:</span>
					{data.application.dietary_restrictions}
				</p>

				<h1 class="mt-10 font-paytone text-2xl">Your Team</h1>

				<p>The team selection form will be released after applications decisions are released!</p>
				<p>If you don't have a team in mind, there is no need to fill it out</p>

				<h1 class="mt-10 font-paytone text-2xl">Parts</h1>
				<p>As you check out parts during the event, you will see them here</p>
				<p class="my-10 max-w-md opacity-50">
					If your application isn't showing correctly, please contact webmaster@ieeebruins.com or
					agariomasster on Discord
				</p>
			{/if}
		{:else}
			<h1 class="mt-10 font-paytone text-2xl">Your Application</h1>
			<p>No application was found under {data.session.user.email}</p>
			<p class="my-10 max-w-md opacity-50">
				If you submitted your application with another email and can't sign in with it. Please
				contact webmaster@ieeebruins.com or agariomasster on Discord
			</p>
		{/if}
	{:else}
		<h1 class="my-10 font-paytone text-xl">Please log in!</h1>
	{/if}
</div>

<script>
	import { supabaseClient } from '$lib/supabase';
	import { SupabaseClient } from '@supabase/supabase-js';
	import { error } from '@sveltejs/kit';
	import { RotateCw } from 'lucide-svelte';
	export let data;

	let currentTeam = data.team;

	let currentParticipant = data.participant;

	let teamLoading = false;
	let participantLoading = false;
	let regenerateTeamLoading = false;
	let joinTeamLoading = false;
	let leaveTeamLoading = false;

	let errorMessage = '';

	let teamMembers = data.members;
	// console.log(teamMembers);
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
			'Motors',
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
			'Risk',
			'Wire Cutters',
			'Soldering Iron',
			'Solder',
			'Solder Suckers',
			'Multimeters',
			'Calipers',
			'Wire Strippers',
			'Heat Guns',
			'Electrical Tape',
			'Heat Shrink Tubing',
			'Zip Ties',
			'Razor Blades',
			'Flashlights',
			'Magnifying Glasses',
			'Calipers'
		];

		const adjectives = [
			'Digital',
			'Binary',
			'Boolean',
			'Integrated',
			'Encoded',
			'Discrete',
			'Virtual',
			'Electrical',
			'Charged',
			'Conductive',
			'Amplified',
			'Resistive',
			'Inductive',
			'Capacitive',
			'Computational',
			'Algorithmic',
			'Recursive',
			'Iterative',
			'Parallel',
			'Distributed',
			'Cloud-Based',
			'Embedded',
			'Integrated',
			'Compact',
			'Real-Time',
			'Resource-Constrained',
			'Intelligent',
			'Autonomous',
			'Cyber',
			'Secure',
			'Resilient',
			'Protected',
			'Encrypted',
			'Virtualized',
			'Networked'
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
				teamLoading = false;
				return;
			}

			if (!teamExists || teamExists.length === 0) {
				keepGenerating = false;
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
		} else {
			// add curr user to the team
			const { data: newParticipant, error: participantError } = await supabaseClient
				.from('participants_2025')
				.update({ team_id: team[0].id })
				.eq('email', data.session?.user.email)
				.select();

			if (participantError) {
				alert('Error adding user to team!');
			} else {
				currentParticipant = newParticipant[0];
				currentTeam = team[0];
				teamMembers = [currentParticipant];
			}
		}
		teamLoading = false;
	}

	let currentTeamCode = '';
	async function joinTeam() {
		joinTeamLoading = true;
		const { data: teamToJoin, error: teamToJoinError } = await supabaseClient
			.from('teams_2025')
			.select()
			.eq('team_code', currentTeamCode);
		if (teamToJoinError) {
			alert('Error checking team!');
			joinTeamLoading = false;
			return;
		}
		if (teamToJoin.length === 0) {
			showError('Join Code Invalid!');
			joinTeamLoading = false;
		} else {
			// check team size
			const { data: members, error: membersError } = await supabaseClient
				.from('participants_2025')
				.select()
				.eq('team_id', teamToJoin[0].id);
			if (membersError) {
				alert('Error getting team members after joining!');
				joinTeamLoading = false;
				return;
			}

			if (members.length >= 5) {
				alert('Team is full!');
				joinTeamLoading = false;
				return;
			}

			// have participant point to team
			const { data: participant, error: participantError } = await supabaseClient
				.from('participants_2025')
				.update({ team_id: teamToJoin[0].id })
				.eq('id', currentParticipant.id)
				.select();
			if (participantError) {
				alert('error updating participant team!');
				joinTeamLoading = false;
				return;
			}

			currentParticipant = participant[0];
			currentTeam = teamToJoin[0];
			teamMembers = [currentParticipant, ...members];
			joinTeamLoading = false;
		}
	}

	async function leaveTeam() {
		leaveTeamLoading = true;
		// remove current member from team
		const { data: newParticipant, error: removeError } = await supabaseClient
			.from('participants_2025')
			.update({ team_id: null })
			.eq('id', currentParticipant.id)
			.select();
		if (removeError) {
			alert('Error removing user from team!');
			leaveTeamLoading = false;
			return;
		}

		// delete team if no members point to it
		const { data: participants, error: participantError } = await supabaseClient
			.from('participants_2025')
			.select()
			.eq('team_id', currentTeam.id);
		if (participantError) {
			alert('Error checking if any participants left in team!');
			leaveTeamLoading = false;
			return;
		}
		if (participants.length === 0) {
			const { error: deleteError } = await supabaseClient
				.from('teams_2025')
				.delete()
				.eq('id', currentParticipant.team_id);
			if (deleteError) {
				alert('Error deleting empty team!');
				leaveTeamLoading = false;
				return;
			}
		}

		// update client side
		currentParticipant = newParticipant[0];
		currentTeam = null;
		teamMembers = null;
		leaveTeamLoading = false;
	}

	async function generateNewTeamName() {
		regenerateTeamLoading = true;
		let keepGenerating = true;
		let team_name = '';
		while (keepGenerating) {
			team_name = generateTeamName();
			const { data: teamExists, error: teamExistsError } = await supabaseClient
				.from('teams_2025')
				.select()
				.eq('team_name', team_name);

			if (teamExistsError) {
				alert('Error checking if team exists');
				regenerateTeamLoading = false;
				return;
			}

			if (!teamExists || teamExists.length === 0) {
				keepGenerating = false;
			}
		}

		// update the team name
		const { data: updatedTeam, error: teamUpdateError } = await supabaseClient
			.from('teams_2025')
			.update({ team_name: team_name })
			.eq('id', currentTeam.id)
			.select();
		if (teamUpdateError) {
			regenerateTeamLoading = false;
			alert('Error creating team!');
		}
		currentTeam = updatedTeam[0];
		regenerateTeamLoading = false;
	}

	async function acceptInvitation() {
		alert('BLURH');
		participantLoading = true;
		const { data: application, error: applicationError } = await supabaseClient
			.from('applications_2025')
			.select()
			.ilike('email', '%' + data.session?.user.email?.split('@')[0] + '@%');
		if (applicationError) {
			alert('Error checking application status');
			participantLoading = false;
			return;
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
			participantLoading = false;
			return;
		}

		currentParticipant = participant[0];
		participantLoading = false;
	}

	function showError(msg) {
		errorMessage = msg;
		setTimeout(() => (errorMessage = ''), 750);
	}
</script>

{#if errorMessage !== ''}
	<div class="toast toast-center toast-top">
		<div class=" alert">
			<span class="">{errorMessage}</span>
		</div>
	</div>
{/if}

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

				{#if !teamLoading}
					<button
						class="btn border-none bg-opacity-10 text-white hover:bg-opacity-10"
						on:click={createTeam}>Create Team</button
					>
				{:else}
					<button class="btn btn-ghost hover:bg-white hover:bg-opacity-10"
						><span class="loading loading-ring loading-md" /></button
					>
				{/if}

				<br />
				<br />
				<p>Join Team</p>
				<input
					name="preferred_name"
					placeholder="Enter Team Code"
					bind:value={currentTeamCode}
					class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
				/>

				{#if !joinTeamLoading}
					<button class="btn btn-ghost mt-2 border-white border-opacity-10" on:click={joinTeam}
						>Join!</button
					>
				{:else}
					<span class="loading loading-ring loading-sm mx-5 mt-5" />
				{/if}
			{:else}
				<p class="">
					Team Name: <span class="text-xl font-bold">{currentTeam.team_name}</span>
				</p>
				{#if !regenerateTeamLoading}
					<button
						class="btn btn-ghost p-1 hover:bg-white hover:bg-opacity-10"
						on:click={generateNewTeamName}><RotateCw class="h-5 w-5" />Generate New Name</button
					>
				{:else}
					<button class="btn btn-ghost p-1 hover:bg-white hover:bg-opacity-10"
						><span class="loading loading-ring loading-md" /></button
					>
				{/if}
				<p>Team Code: <span class="text-xl font-bold">{currentTeam.team_code}</span></p>
				<br />

				{#if teamMembers}
					<p class="font-bold">Team Members ({teamMembers.length}/5)</p>
					{#each teamMembers as member}
						<p>{member.full_name} -- {member.email}</p>
					{/each}
					<br />
					{#if teamMembers.length < 4}
						<p class="">You need at least {4 - teamMembers.length} more member(s)!</p>
					{/if}
				{:else}
					<p class="font-bold">Team Members</p>
					<p>None</p>
					<br />
				{/if}
				<p>
					Send the team code to your teammates so they can join your team! Teams must consist of 4-5
					hackers!
				</p>
				<br />
				{#if !leaveTeamLoading}
					<button class="btn btn-ghost border-white border-opacity-10" on:click={leaveTeam}
						>Leave Team</button
					>
				{:else}
					<button class="btn btn-ghost hover:bg-white hover:bg-opacity-10"
						><span class="loading loading-ring loading-md" /></button
					>
				{/if}
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
				<p class="mb-2">Congrats! You've been accepted to participate in IDEA Hacks!</p>

				{#if !participantLoading}
					<button class="btn border-none bg-opacity-10 text-white" on:click={acceptInvitation}
						>Accept Invitation</button
					>
				{:else}
					<button class="btn btn-ghost hover:bg-white hover:bg-opacity-10"
						><span class="loading loading-ring loading-md" /></button
					>
				{/if}

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

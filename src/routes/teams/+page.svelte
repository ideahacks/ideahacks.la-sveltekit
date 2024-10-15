<script lang="ts">
	import Clouds from '$lib/components/Clouds.svelte';
	import TeamCard from '$lib/components/TeamCard.svelte';
	import pixelclouds from '$lib/images/pixelclouds.png';
	import fuzzysort from 'fuzzysort';

	//const fuzzysort = require('fuzzysort');

	interface Team {
		number: number;
		members: string[];
		membersAsString: string;
		parts: number[];
	}

	const team1: Team = {
		number: 1,
		members: ['abby', 'betty', 'caleb'],
		membersAsString: 'abby,betty,caleb',
		parts: [23345, 23588, 47810]
	};
	const team2: Team = {
		number: 2,
		members: ['david', 'elizabeth', 'francis', 'gabriel'],
		membersAsString: 'david,elizabeth,francis,gabriel',
		parts: [12345, 23456, 34567, 456789, 567890, 13594]
	};
	const team3: Team = {
		number: 3,
		members: ['just me lol as a RIDICULOUSLY long name'],
		membersAsString: 'just me lol as a RIDICULOUSLY long name',
		parts: [11111]
	};
	const team4: Team = {
		number: 4,
		members: ['someonewithanextremelylongnameidkwhatelsetowritehere', 'short name'],
		membersAsString: 'someonewithanextremelylongnameidkwhatelsetowritehere,short name',
		parts: [12345]
	};

	let search = ''; // search content

	const targets: Team[] = [team1, team2, team3, team4];

	$: results = fuzzysort.go(search, targets, {
		key: 'membersAsString',
		all: true
	});

	$: console.log(results);
</script>

<h1 class="mb-6 mt-12 text-center font-paytone text-5xl font-bold text-white">Teams</h1>

<form class="flex justify-center">
	<input
		type="text"
		name="search"
		bind:value={search}
		placeholder="Search team member"
		class="input input-ghost w-full max-w-xs text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
	/>
</form>

<p class="mt-4 text-center font-encode text-xs text-white">
	Showing {results.length} out of {targets.length} teams
</p>

<div class="flex flex-wrap justify-center gap-4 p-6 pb-24">
	{#each results as team}
		<TeamCard team_info={team.obj} />
	{/each}
</div>

<Clouds />

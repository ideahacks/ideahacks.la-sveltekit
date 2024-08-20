<script>
	import TeamCard from '$lib/components/TeamCard.svelte';
	import pixelclouds from '$lib/images/pixelclouds.png';

	const team1 = {
		number: 1,
		members: ['abby', 'betty', 'caleb'],
		parts: [23345, 23588, 47810]
	};
	const team2 = {
		number: 2,
		members: ['david', 'elizabeth', 'francis', 'gabriel'],
		parts: [12345, 23456, 34567, 456789, 567890, 13594]
	};
	const team3 = {
		number: 3,
		members: ['just me lol as a RIDICULOUSLY long name'],
		parts: ['11111']
	};
	const team4 = {
		number: 4,
		members: ['someonewithanextremelylongnameidkwhatelsetowritehere', 'short name'],
		parts: ['12345']
	};
</script>

<h1 class="mb-6 mt-12 text-center font-paytone text-5xl font-bold text-white">Teams</h1>

<form class="flex justify-center">
	<input
		type="text"
		name="search"
		placeholder="Search team/member"
		class="input input-ghost w-full max-w-xs text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
	/>
</form>

<p class="mt-4 text-center font-encode text-sm text-white">Showing 100 out of 100 teams</p>

<div class="flex flex-wrap justify-center gap-4 p-6 pb-24">
	<TeamCard team_info={team1} />
	<TeamCard team_info={team2} />
	<TeamCard team_info={team3} />
	<TeamCard team_info={team4} />
	<TeamCard team_info={team1} />
	<TeamCard team_info={team1} />
	<TeamCard team_info={team1} />
</div>

<div
	class="fixed bottom-0 z-0 h-24 w-full bg-contain"
	style="background-image: url({pixelclouds})"
/>

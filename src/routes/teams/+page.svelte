<script>
	import TeamCard from '$lib/components/TeamCard.svelte';
    import pixelclouds from '$lib/images/pixelclouds.png';

	const team1 = {
		number: 1,
		members: ['abby', 'betty', 'caleb'],
		parts: [23345, 23588, 47810],
	};
    const team2 = {
        number: 2,
        members: ['david', 'elizabeth', 'francis', 'gabriel'],
        parts: [12345, 23456, 34567, 456789, 567890, 13594],
    };
    const team3 = {
        number: 3,
        members: ['just me lol as a RIDICULOUSLY long name'],
        parts: ['11111']
    };
</script>

<h1 class="mt-12 mb-6 font-paytone text-5xl font-bold text-white text-center">Teams</h1>

<form class="flex justify-center">
    <input
        type="text"
        name="search"
        placeholder="Search team/member"
        class="input input-ghost w-full max-w-xs text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
    />
</form>

<div class="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6 pb-24">
    <TeamCard team_info={team1} />
    <TeamCard team_info={team2} />
    <TeamCard team_info={team3} />
    <TeamCard team_info={team1} />
    <TeamCard team_info={team1} />
    <TeamCard team_info={team1} />
    <TeamCard team_info={team1} />

</div>

<div
	class="fixed bottom-0 z-0 h-24 w-full bg-contain"
	style="background-image: url({pixelclouds})"
/>

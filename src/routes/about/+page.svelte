<script>
	import logoText from '$lib/images/logo-text.png';
	import InfoBox from '$lib/components/InfoBox.svelte';

	let data1 = [
		[
			'GAME ROOM',
			'Going along with our game-based theme, we have a room open throughout the event dedicated solely to games. If you ever need a break from your project, drop into this room, pick your game of choice, and try to get the high score! If your high score stands by the end of the event, a prize awaits you. Exact games are still being determined (if you have recommendations, please reach out!), but we aim to include a mix of virtual and hands-on games where you can dance, race, stream, and solve puzzles.'
		],
		[
			'E-WASTE ART TEAM SOCIAL',
			'Friday afternoon, before the hacking starts, we will host a team formation social making art out of unused components from the IEEE lab! This event provides an opportunity to destress before the hacking starts, find a team if needed, and reduce the number of wasted electronic components IEEE produces. This is a fantastic opportunity to express your creative side, build relationships, reduce waste, and play around with random electronic parts.'
		],
		[
			'YOGA SESSION',
			'To get the blood flowing after sitting inside staring at a screen for hours on end, we will host a guided yoga session Saturday evening. This activity is an opportunity to take a quick break, stretch your muscles, and re-energize your body so you can make it through the rest of the hackathon.'
		]
	];
</script>

<div>
	<img class="mx-auto w-3/4 max-w-md" src={logoText} alt="ideahacks logo" />

	<InfoBox data={data1} title="HAVING FUN!" />
</div>

<script lang="ts">
	import PartCard from '$lib/components/PartCard.svelte';
	import pixelclouds from '$lib/images/pixelclouds.png';
	import fuzzysort from 'fuzzysort';

	interface Part {
		picture: string;
		title: string;
		num_in_use: number;
		num_total: number;
		location: string;
		tags: string[];
		id: string;
		details: string;
		datasheet: string;
	}

	const part1: Part = {
		picture: 'https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/3645/MFG_L513SRD-C.jpg',
		title: 'Red LED',
		num_in_use: 5,
		num_total: 100,
		location: 'Table 3',
		tags: ['LED', 'red'],
		id: '00000',
		details:
			'https://www.digikey.com/en/products/detail/american-opto-plus-led-corp./L513SRD-C/13556881?utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Product_Medium%20ROAS%20Categories&utm_term=&utm_content=&utm_id=go_cmp-20223376311_adg-_ad-__dev-c_ext-_prd-13556881_sig-CjwKCAjwlbu2BhA3EiwA3yXyu9GzukOl9fGgg-zmQZC8f1aS_IxYQQW1-FTbW75WhwCc2CYA4D38RRoCprwQAvD_BwE&gad_source=1&gclid=CjwKCAjwlbu2BhA3EiwA3yXyu9GzukOl9fGgg-zmQZC8f1aS_IxYQQW1-FTbW75WhwCc2CYA4D38RRoCprwQAvD_BwE',
		datasheet: 'https://www.aopled.com/AOP_PDFs/L513SRD-C.pdf'
	};

	let search = ''; // search content

	const targets: Part[] = [part1];

	$: results = fuzzysort.go(search, targets, {
		key: 'title',
		all: true
	});

	$: console.log(results);
</script>

<h1 class="mb-6 mt-12 text-center font-paytone text-5xl font-bold text-white">Parts</h1>

<form class="flex justify-center">
	<input
		type="text"
		name="search"
		bind:value={search}
		placeholder="Search part"
		class="input input-ghost w-full max-w-xs text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
	/>
</form>

<p class="mt-4 text-center font-encode text-xs text-white">
	Showing {results.length} out of {targets.length} parts
</p>

<div class="flex flex-wrap justify-center gap-4 p-6 pb-24">
	{#each results as part}
		<PartCard part_info={part.obj} />
	{/each}
</div>

<div
	class="fixed bottom-0 z-0 h-24 w-full bg-contain"
	style="background-image: url({pixelclouds})"
/>

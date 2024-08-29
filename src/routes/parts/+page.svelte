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

	interface Tag {
		title: string;
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
	let dropdownOpen = false; // toggle dropdown

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

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

<div class="dropdown dropdown-bottom mt-1 flex justify-center">
	<button on:click={toggleDropdown}>
		<div tabindex="0" role="button" class="btn btn-xs m-1 font-encode text-xs">
			Filter by:
			{#if dropdownOpen === false}<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-3"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-3"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
				</svg>
			{/if}
		</div>
	</button>
	{#if dropdownOpen === true}
		<ul tabindex="-1" class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
			<li>
				<div class="form-control">
					<input type="checkbox" checked={false} class="rounded-xs checkbox h-5 w-5" />
					<span class="label-text font-encode text-xs">LED</span>
				</div>
			</li>
			<li>
				<div class="form-control">
					<input type="checkbox" checked={false} class="rounded-xs checkbox h-5 w-5" />
					<span class="label-text font-encode text-xs">Comparator</span>
				</div>
			</li>
		</ul>
	{/if}
</div>

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

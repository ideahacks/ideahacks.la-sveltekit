<script lang="ts">
	import PartCard from '$lib/components/PartCard.svelte';
	import pixelclouds from '$lib/images/pixelclouds.png';
	import fuzzysort from 'fuzzysort';
	import { Tag } from 'lucide-svelte';

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

	const part2: Part = {
		picture: '',
		title: 'LM393 Comparator',
		num_in_use: 1,
		num_total: 50,
		location: 'Table 5',
		tags: ['comparator'],
		id: '00001',
		details: 'https://www.ti.com/product/LM393',
		datasheet:
			'https://www.ti.com/lit/ds/symlink/lm393.pdf?ts=1724833750559&ref_url=https%253A%252F%252Fwww.ti.com%252Fproduct%252FLM393%253Futm_source%253Dgoogle%2526utm_medium%253Dcpc%2526utm_campaign%253Dasc-null-null-GPN_EN-cpc-pf-google-wwe%2526utm_content%253DLM393%2526ds_k%253DLM393+Datasheet%2526DCM%253Dyes%2526gad_source%253D1%2526gclid%253DCjwKCAjw4_K0BhBsEiwAfVVZ_8ohohZCAz5NkbyQWgLZqUaVdfJBslQHvShqaGbmZI7StUlPJFH0EhoCKKEQAvD_BwE%2526gclsrc%253Daw.ds'
	};

	const part3: Part = {
		picture: 'https://mm.digikey.com/Volume0/opasdata/d220001/medias/images/1135/151051VS04000.JPG',
		title: 'Green LED',
		num_in_use: 3,
		num_total: 100,
		location: 'Table 3',
		tags: ['green', 'LED'],
		id: '00002',
		details:
			'https://www.digikey.com/en/products/detail/w-rth-elektronik/732-5017-ND/4490015?utm_adgroup=&utm_source=google&utm_medium=cpc&utm_campaign=PMax%20Shopping_Product_Medium%20ROAS%20Categories&utm_term=&utm_content=&utm_id=go_cmp-20223376311_adg-_ad-__dev-c_ext-_prd-4490015_sig-CjwKCAjwlbu2BhA3EiwA3yXyuxG6KGBn796gjaV37F8lJLh9ZXs2G56Gbej_ss8a_HF6qLeGStjkKBoCmK8QAvD_BwE&gad_source=1&gclid=CjwKCAjwlbu2BhA3EiwA3yXyuxG6KGBn796gjaV37F8lJLh9ZXs2G56Gbej_ss8a_HF6qLeGStjkKBoCmK8QAvD_BwE',
		datasheet: 'https://www.we-online.com/components/products/datasheet/151051VS04000.pdf'
	};

	let search = ''; // search content
	let searchTag = ''; // search tag
	let selectedTags: string[] = [];

	const targets: Part[] = [part1, part2, part3];

	$: tagFilteredParts =
		selectedTags.length === 0
			? targets
			: targets.filter(({ tags }) =>
					selectedTags.every((selectedTag: string) => tags.includes(selectedTag))
			  );

	$: tagsAfterFiltering = Array.from(new Set(tagFilteredParts.flatMap((part) => part.tags).sort()));

	$: results = fuzzysort.go(search, tagFilteredParts, {
		key: 'title',
		all: true
	});

	$: results_tags = fuzzysort
		.go(searchTag, tagsAfterFiltering, {
			all: true
		})
		.map((result) => result.target);

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
	<div tabindex="0" role="button" class="btn btn-xs m-1 font-encode text-xs">Filter by:</div>
	<ul
		tabindex="-1"
		class="menu dropdown-content z-[1] w-52 cursor-default overflow-y-auto overflow-x-hidden rounded-box bg-base-100 p-2"
	>
		<input
			type="text"
			name="search"
			bind:value={searchTag}
			placeholder="Search tag"
			class="input input-ghost text-xs text-black"
		/>
		{#each results_tags as tag}
			<li>
				<label class="label cursor-pointer">
					<div class="items-center">
						<input
							type="checkbox"
							value={tag}
							bind:group={selectedTags}
							class="rounded-xs checkbox h-5 w-5"
						/>
						<span class="label-text ml-2 font-encode text-xs">{tag}</span>
					</div>
				</label>
			</li>
		{/each}
	</ul>
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

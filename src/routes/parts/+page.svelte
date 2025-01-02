<script lang="ts">
	import PartCard from '$lib/components/PartCard.svelte';
	import pixelclouds from '$lib/images/pixelclouds.png';
	import lightning from '$lib/images/lightning.png';
	import fuzzysort from 'fuzzysort';
	import { Tag } from 'lucide-svelte';

	export let data;

	let parts = data.parts ?? [];

	// handle the fuzzysort here
	let search = ''; // search content
	let searchTag = ''; // search tag
	let selectedTags: string[] = [];

	$: tagFilteredParts =
		selectedTags.length === 0
			? parts
			: parts.filter(({ tags }) =>
					selectedTags.every((selectedTag: string) => tags.includes(selectedTag))
			  );

	$: tagsAfterFiltering = Array.from(new Set(tagFilteredParts.flatMap((part) => part.tags).sort()));

	$: results = fuzzysort.go(search, tagFilteredParts, {
		key: 'name',
		all: true
	});

	$: results_tags = fuzzysort
		.go(searchTag, tagsAfterFiltering, {
			all: true
		})
		.map((result) => result.target);

	// handle the pagination here
	$: currentPage = 1;
	const itemsPerPage = 25;
	$: totalPages = Math.ceil(results.length / itemsPerPage);
	$: totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

	$: paginatedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	// do some sort of reasoning; as soon as the tags or search is changed then change your default page back to page 1
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

<!-- <div class="dropdown dropdown-bottom mt-1 flex justify-center">
	<div tabindex="0" role="button" class="btn btn-xs m-1 font-encode text-xs">Filter by:</div>
	<div
		tabindex="-1"
		class="overflow-x-none menu dropdown-content z-[1] max-h-52 w-52 overflow-y-auto rounded-box bg-base-100 p-2"
	>
		{#each results_tags as tag}
			<div class="items-center">
				<input
					type="checkbox"
					value={tag}
					bind:group={selectedTags}
					class="rounded-xs checkbox h-5 w-5"
				/>
				<span class="label-text ml-2 font-encode text-xs">{tag}</span>
			</div>
		{/each}
	</div>
</div> -->

<div class="m-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5">
	<input
		type="text"
		name="search"
		bind:value={searchTag}
		placeholder="Search tag"
		class="text-md input input-sm input-ghost mx-auto mb-5 block w-48 text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
	/>

	<div class="flex h-48 flex-wrap justify-center gap-2 overflow-y-auto">
		{#each results_tags as tag}
			<div class="btn form-control btn-sm border-none bg-opacity-10 has-[:hover]:btn-ghost">
				<label class="label cursor-pointer">
					<input type="checkbox" value={tag} class=" checkbox mr-2" bind:group={selectedTags} />
					<span class="label-text text-white">{tag}</span>
				</label>
			</div>
		{/each}
	</div>
</div>

<p class="mt-4 text-center font-encode text-xs text-white">
	Showing {results.length} out of {parts.length} parts
</p>

<div class="flex flex-wrap justify-center gap-4 pb-12">
	{#each paginatedResults as part}
		<PartCard part_info={part.obj} />
	{/each}
</div>

<div class="join my-10 justify-center">
	{#each totalPagesArray as pageNum}
		<input
			class="btn btn-square join-item bg-white"
			type="radio"
			name="options"
			value={pageNum}
			bind:group={currentPage}
			aria-label={String(pageNum)}
			checked={currentPage === pageNum}
		/>
	{/each}
</div>

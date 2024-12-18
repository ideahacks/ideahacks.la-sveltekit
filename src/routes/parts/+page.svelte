<!-- <script lang="ts">
	import PartCard from '$lib/components/PartCard.svelte';
	import pixelclouds from '$lib/images/pixelclouds.png';
	import lightning from '$lib/images/lightning.png';
	import fuzzysort from 'fuzzysort';
	import { Tag } from 'lucide-svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

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

<div class="dropdown dropdown-bottom mt-1 flex justify-center">
	<div tabindex="0" role="button" class="btn btn-xs m-1 font-encode text-xs">Filter by:</div>
	<ul
		tabindex="-1"
		class="menu dropdown-content z-[1] w-52 cursor-default rounded-box bg-base-100 p-2"
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
	Showing {results.length} out of {parts.length} parts
</p>

<div class="flex flex-wrap justify-center gap-4 p-6 pb-12">
	{#each paginatedResults as part}
		<PartCard part_info={part.obj} />
	{/each}
</div>


<div class="join mb-24 mt-0 justify-center">
	{#each totalPagesArray as pageNum}
		<input
			class="active:bg-custom-yellow hover:bg-custom-yellow focus:bg-custom-yellow btn btn-square join-item bg-white"
			type="radio"
			name="options"
			value={pageNum}
			bind:group={currentPage}
			aria-label={String(pageNum)}
			checked={currentPage === pageNum}
		/>
	{/each}
</div>

<div
	class="fixed bottom-0 z-0 h-24 w-full bg-contain"
	style="background-image: url({pixelclouds})"
/>

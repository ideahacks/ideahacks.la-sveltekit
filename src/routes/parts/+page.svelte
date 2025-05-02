<script lang="ts">
	import PartCard from '$lib/components/PartCard.svelte';
	import fuzzysort from 'fuzzysort';
	import SelectionButton from '$lib/components/utility/SelectionButton.svelte';

	export let data;

	let parts = data.parts ?? [];

	// handle the fuzzysort here
	let search = ''; // search content
	let searchTag = ''; // search tag
	let selectedTags: string[] = [];

	$: tagFilteredParts = filterPartsByTags(selectedTags.length);

	function filterPartsByTags(s: number) {
		// we take in s so that tagFilteredParts has something to "react" to
		console.log(s);
		if (selectedTags.length === 0) {
			return parts;
		}

		let result = [];
		for (let i = 0; i < parts.length; i++) {
			let curr_part = parts[i];
			if (curr_part.tags) {
				// if object's tag exists
				// check if part includes all selected tags
				let num_matched_tags = 0;
				for (let j = 0; j < selectedTags.length; j++) {
					if (curr_part.tags.includes(selectedTags[j])) {
						num_matched_tags++;
					}
				}
				// part has all the tags
				if (num_matched_tags === selectedTags.length) {
					result.push(curr_part);
				}
			}
		}

		return result;
	}

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

<form class="z-10 flex justify-center">
	<input
		type="text"
		name="search"
		bind:value={search}
		on:input={() => (currentPage = 1)}
		placeholder="Search part"
		class="input input-ghost w-full max-w-xs font-encode text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
	/>
</form>

<div class="z-10 m-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5">
	<input
		type="text"
		name="search"
		bind:value={searchTag}
		placeholder="Search tag"
		class="text-md input input-sm input-ghost mx-auto mb-5 block w-48 font-encode text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
	/>
	<div class="h-48">
		<div class="flex max-h-48 flex-wrap justify-center gap-2 overflow-y-scroll">
			{#each results_tags as tag}
				<div
					class="btn form-control btn-sm border-none bg-opacity-10 font-encode font-thin has-[:hover]:btn-ghost"
				>
					<label class="label cursor-pointer">
						<input
							type="checkbox"
							value={tag}
							class=" checkbox mr-2"
							bind:group={selectedTags}
							on:click={() => {
								currentPage = 1;
							}}
						/>
						<span class="label-text text-white">{tag}</span>
					</label>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex justify-center">
		<SelectionButton text="Clear Tags" onClick={() => (selectedTags = [])} />
	</div>
</div>

<p class="m-4 text-center font-encode text-xs text-white">
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
			class="btn btn-square join-item after:btn-ghost"
			type="radio"
			name="options"
			id="part_{pageNum}"
			value={pageNum}
			bind:group={currentPage}
			aria-label={String(pageNum)}
			checked={currentPage === pageNum}
		/>
	{/each}
</div>

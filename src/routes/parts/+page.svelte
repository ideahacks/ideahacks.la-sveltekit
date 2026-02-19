<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import PartCard from '$lib/components/PartCard.svelte';
	import SelectionButton from '$lib/components/utility/SelectionButton.svelte';
	import fuzzysort from 'fuzzysort';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let parts = $derived(data.parts ?? []);
	let search = $state('');
	let searchTag = $state('');
	let selectedTags = $state<string[]>([]);
	let currentPage = $state(1);

	function filterPartsByTags(partList: typeof parts, tags: string[]) {
		if (tags.length === 0) return partList;
		return partList.filter((p) => {
			if (!p.tags?.length) return false;
			return tags.every((t) => p.tags.includes(t));
		});
	}

	const tagFilteredParts = $derived(filterPartsByTags(parts, selectedTags));

	const tagsAfterFiltering = $derived(
		Array.from(new Set(tagFilteredParts.flatMap((p) => p.tags ?? []).filter(Boolean))).sort()
	);

	const results = $derived(
		search
			? fuzzysort.go(search, tagFilteredParts, { key: 'name', all: true })
			: tagFilteredParts.map((obj) => ({ obj, target: obj.name }))
	);

	const resultsTags = $derived(
		searchTag
			? fuzzysort.go(searchTag, tagsAfterFiltering, { all: true }).map((r) => r.target)
			: tagsAfterFiltering
	);

	const itemsPerPage = 25;
	const totalPages = $derived(Math.max(1, Math.ceil(results.length / itemsPerPage)));
	const totalPagesArray = $derived(Array.from({ length: totalPages }, (_, i) => i + 1));
	const paginatedResults = $derived(
		results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
	);

	function goToPageOne() {
		currentPage = 1;
	}
</script>

<NavBar />

<div class="parts-page-scroll h-screen overflow-y-auto overflow-x-hidden">
	<div class="flex min-h-full flex-col items-center pt-16 pb-16">
		<div class="max-w-6xl w-full px-4 py-8">
			<h1
				class="mb-6 mt-4 text-center font-mono text-5xl font-bold text-white uppercase tracking-wider"
				style="text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);"
			>
				Parts
			</h1>

			<form class="flex justify-center" onsubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					name="search"
					bind:value={search}
					oninput={goToPageOne}
					placeholder="Search part"
					class="input input-ghost w-full max-w-xs font-mono text-lg text-white placeholder-white/70 caret-white focus:bg-white/10 focus:text-white focus:outline-none border-white/30 rounded-lg"
				/>
			</form>

			<div class="m-4 rounded-lg border border-white/30 bg-black/10 p-5">
				<input
					type="text"
					name="searchTag"
					bind:value={searchTag}
					placeholder="Search tag"
					class="input input-sm input-ghost mx-auto mb-5 block w-48 font-mono text-white placeholder-white/70 caret-white focus:bg-white/10 focus:text-white focus:outline-none border-white/20 rounded-lg"
				/>
				<div class="h-48 overflow-y-auto">
					<div class="flex max-h-48 flex-wrap justify-center gap-2">
						{#each resultsTags as tag}
							<label
								class="flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-mono text-sm text-white hover:bg-white/10"
							>
								<input
									type="checkbox"
									value={tag}
									class="checkbox checkbox-sm"
									bind:group={selectedTags}
									onclick={goToPageOne}
								/>
								<span>{tag}</span>
							</label>
						{/each}
					</div>
				</div>
				<div class="flex justify-center pt-2">
					<SelectionButton text="Clear Tags" onClick={() => { selectedTags = []; goToPageOne(); }} />
				</div>
			</div>

			<p class="m-4 text-center font-mono text-xs text-white/80">
				Showing {results.length} out of {parts.length} parts
			</p>

			<div class="flex flex-wrap justify-center gap-4 pb-12">
				{#each paginatedResults as part}
					<PartCard part_info={part.obj} />
				{/each}
			</div>

			{#if totalPages > 1}
				<div class="join my-10 justify-center">
					{#each totalPagesArray as pageNum}
						<input
							class="btn btn-square join-item bg-white/10 text-white hover:bg-white/20 border-white/20"
							type="radio"
							name="parts_pagination"
							id="part_{pageNum}"
							value={pageNum}
							bind:group={currentPage}
							aria-label={String(pageNum)}
							checked={currentPage === pageNum}
						/>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.parts-page-scroll {
		-webkit-overflow-scrolling: touch;
	}
</style>

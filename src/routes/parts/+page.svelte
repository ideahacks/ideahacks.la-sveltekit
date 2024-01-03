<script lang="ts">
	import fuzzysort from 'fuzzysort';
	import { FileText, Info, Puzzle } from 'lucide-svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	interface Part {
		name: string;
		quantity: number;
		image_url: string;
		datasheet_url: string;
		description: string;
		tags: string[];
	}

	export let data;

	const parts: Part[] = data.parts ?? [];

	let selectedTags: string[] = [];
	let search = '';

	$: tagFilteredParts =
		selectedTags.length === 0
			? parts
			: parts.filter(({ tags }) =>
					selectedTags.every((selectedTag: string) => tags.includes(selectedTag))
			  );

	$: tagsAfterFiltering = new Set(tagFilteredParts.flatMap((part) => part.tags).sort());

	$: results = fuzzysort.go(search, tagFilteredParts, {
		keys: ['name', 'description'],
		all: true
	});

	$: console.log(selectedTags);
</script>

<div class="m-12 justify-center space-y-8">
	<h1 class="flex justify-center font-display-serif text-7xl md:text-9xl">Parts</h1>
	<br />

	{#if data.parts && data.parts.length > 0}
		<p class="text-center font-display-sans text-xl">
			You're currently viewing {results.length}
			{results.length === 1 ? 'part' : 'parts'}
		</p>
		<div class="flex justify-center pb-4">
			<input
				class="input-bordered input w-1/2"
				placeholder="Search for a part..."
				bind:value={search}
			/>
		</div>

		<div
			class="my-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90 bg-blend-normal"
		>
			<div class="min-h96 flex h-48 flex-wrap justify-center gap-2">
				{#each tagsAfterFiltering as tag}
					<div class="has-[:checked]:btn-primary form-control btn-sm btn" transition:fade>
						<label class="label cursor-pointer">
							<input
								type="checkbox"
								value={tag}
								class="peer checkbox mr-2"
								bind:group={selectedTags}
							/>
							<span class="label-text peer-checked:text-primary-content">{tag}</span>
						</label>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-wrap justify-center gap-4">
			{#each results as { obj: { name, quantity, image_url, description, tags, datasheet_url } }}
				<div class="card w-60 border border-white border-opacity-50">
					<figure>
						<img src={image_url} alt={name} />
					</figure>
					<div class="card-body">
						<h2 class="card-title">{name}</h2>
						<div class="badge badge-primary">Quantity: {quantity}</div>
						<p><span class="font-bold">Tags:</span> {tags.join(', ')}</p>
						<div class="card-actions">
							<div class="tooltip tooltip-bottom" data-tip="description">
								<button
									class="btn-secondary btn-circle btn"
									on:click={(event) => {
										event.currentTarget.nextElementSibling?.showModal();
									}}><Info /></button
								>
								<dialog class="modal modal-bottom sm:modal-middle">
									<div class="modal-box border border-primary border-opacity-50">
										<article class="whitespace-pre-line text-base-content">{description}</article>
										<p class="mt-4 text-primary">Click or tap outside to close</p>
									</div>
									<form method="dialog" class="modal-backdrop">
										<button>close</button>
									</form>
								</dialog>
							</div>
							<div class="tooltip tooltip-bottom" data-tip="datasheet">
								<a href={datasheet_url} target="_blank" class="btn-secondary btn-circle btn"
									><FileText /></a
								>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="m-8">Could not load parts!</p>
	{/if}
</div>

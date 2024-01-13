<script lang="ts">
	import fuzzysort from 'fuzzysort';
	import { FileText, Hash, Info, MapPin, Rabbit, ScanBarcode } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import placeholder_part_image from '$lib/images/placeholder_part.png';

	interface Part {
		name: string;
		quantity: number;
		image_url: string | null;
		datasheet_url: string;
		description: string;
		tags: string[];
	}

	export let data;

	// iOS Safari does not load /parts for some reason so I have to give it special treatment
	const isIosSafariBecauseIStronglyDislikeTheirBrowser = /^((?!chrome|android).)*safari/i.test(
		navigator.userAgent
	);

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
		all: true,
		threshold: -100,
		limit: isIosSafariBecauseIStronglyDislikeTheirBrowser ? 20 : 1000
	});

	function quantityInUse(part_id: string) {
		return data.teamsParts
			.filter((part) => part.part_id === part_id)
			.reduce((sum, part) => {
				sum += part.quantity;
				return sum;
			}, 0);
	}
</script>

<div class="m-12 justify-center space-y-4">
	<h1 class="flex justify-center font-display-serif text-5xl md:text-7xl">Parts</h1>

	{#if data.parts && data.parts.length > 0}
		<div class="mb-4 flex flex-col items-center justify-center space-y-4">
			<p class="text-center font-display-sans text-xl">
				You're currently viewing {results.length}
				{results.length === 1 ? 'part' : 'parts'} out of {data.parts.length}
			</p>
			<p class="w-96 text-center font-display-sans">
				iOS Safari is not a fan of this page, so the number of parts shown is limited. You can
				discover more parts by searching or see all parts by switching to a laptop.
			</p>
			<input
				class="input input-bordered w-1/2"
				placeholder="Search for a part..."
				bind:value={search}
			/>
		</div>

		<div
			class="my-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90 bg-blend-normal"
		>
			<div class="flex h-48 flex-wrap justify-center gap-2 overflow-y-auto">
				{#each tagsAfterFiltering as tag}
					<div class="btn form-control btn-sm has-[:checked]:btn-primary" transition:fade>
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
			{#each results as { obj: { part_id, name, quantity, image_url, description, tags, datasheet_url, checkout_location, requires_checkout } }}
				<div class="card w-64 border border-white border-opacity-50">
					<figure>
						<img
							src={image_url && image_url.length > 0 ? image_url : placeholder_part_image}
							alt={name}
						/>
					</figure>
					<div class="card-body">
						<h2 class="card-title">{name}</h2>
						<div class="badge badge-primary">
							<Hash size={12} class="mr-1" />
							{quantity} total, {quantityInUse(part_id)} in use
						</div>
						{#if requires_checkout}
							<div class="badge badge-primary">
								<MapPin size={12} class="mr-1" />
								{checkout_location}
							</div>
						{:else}
							<div class="badge badge-secondary">
								<Rabbit size={12} class="mr-1" />
								Grab & Go: {checkout_location}
							</div>
						{/if}
						<p><span class="font-bold">Tags:</span> {tags.join(', ')}</p>
						<p><span class="font-bold">ID:</span> {part_id}</p>
						<div class="card-actions">
							<div class="tooltip tooltip-bottom" data-tip="description">
								<button
									class="btn btn-circle btn-secondary"
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
							{#if datasheet_url}
								<div class="tooltip tooltip-bottom" data-tip="datasheet">
									<a href={datasheet_url} target="_blank" class="btn btn-circle btn-secondary"
										><FileText /></a
									>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="m-8">Could not load parts!</p>
	{/if}
</div>

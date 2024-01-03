<script lang="ts">
	import fuzzysort from 'fuzzysort';

	export let data;

	const parts = data.parts ?? [];

	let search = '';

	$: results = fuzzysort.go(search, parts, {
		keys: ['name', 'description'],
		all: true
	});
</script>

<div class="m-12 justify-center space-y-8">
	<h1 class="flex justify-center font-display-serif text-7xl md:text-9xl">Parts</h1>
	<!-- <p>List of available parts.</p> -->

	{#if data.parts && data.parts.length > 0}
		<br />
		<div class="flex justify-center pb-4">
			<input
				class="input-bordered input w-1/2"
				placeholder="Search for a part..."
				bind:value={search}
			/>
		</div>

		<div class="flex flex-wrap justify-center gap-4">
			{#each results as { obj: { name, quantity, image_url, description, tags } }}
				<div class="card w-1/5 border border-white border-opacity-50">
					<figure>
						<img src={`${image_url}`} alt={name} />
					</figure>
					<div class="card-body">
						<h2 class="card-title">{name}</h2>
						<div class="badge badge-primary">Quantity: {quantity}</div>
						<button
							class="btn"
							on:click={(event) => {
								event.currentTarget.nextElementSibling?.showModal();
							}}>Description</button
						>
						<dialog class="modal modal-bottom sm:modal-middle">
							<div class="modal-box">
								<p class="text-base-content">{description}</p>
								<p class="mt-4 text-base-content">Press ESC or click outside to close</p>
							</div>
							<form method="dialog" class="modal-backdrop">
								<button>close</button>
							</form>
						</dialog>
						<div class="card-actions justify-end">
							<p><span class="font-bold">Tags:</span> {tags.join(', ')}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<p class="m-8">Could not load parts!</p>
	{/if}
</div>

<script lang="ts">
	import fuzzysort from 'fuzzysort';

	export let data;

	$: partIds = data.parts.map((part) => {
		return {
			...part,
			get all_ids() {
				return `${[part.id, ...part.alt_ids].join(' ')}`;
			}
		};
	});
	let search = '';

	$: results = fuzzysort.go(search, partIds, {
		keys: ['all_ids'],
		all: true,
		threshold: -100
	});

	let cart = new Set();
</script>

<div class=" m-12 justify-center space-y-8">
	<h1 class="text-center font-display-serif text-6xl md:text-8xl">Parts Checkout</h1>
	<div class="flex">
		<div class="w-1/2">
			<h2 class="text-center font-display-serif text-3xl">Search</h2>
			<div class="flex justify-center gap-2 pb-4">
				<input
					class="input input-bordered"
					placeholder="Search for a part by ID"
					bind:value={search}
				/>
			</div>

			<p class="text-center">Items in cart: [{[...cart].join(', ')}]</p>

			<p class="text-center font-display-sans text-xl">
				You're currently viewing {results.length}
				{results.length === 1 ? 'part' : 'parts'}
			</p>

			<div class="flex flex-wrap justify-center gap-4">
				<!-- Exact match returns a score of 0 -->
				{#each results as { score, obj: { id, name, quantity, image_url, all_ids } }}
					<div class="card w-60 border border-opacity-50">
						<div class="card-body">
							<div class="card-actions">
								<button
									class="btn btn-primary"
									on:click={() => {
										cart.add(id);
										// Necessary to trigger Svelte's reactivity
										cart = cart;
									}}>Add to cart</button
								>
							</div>
							<p>IDs: {all_ids}</p>
							<p>Score: {score}</p>
							<h2 class="card-title">{name}</h2>
							<div class="badge">Quantity: {quantity}</div>
						</div>
						<figure>
							<img src={image_url} alt={name} />
						</figure>
					</div>
				{/each}
			</div>
		</div>
		<div class="w-1/2">
			<h2 class="text-center font-display-serif text-3xl">Cart</h2>
		</div>
	</div>
</div>

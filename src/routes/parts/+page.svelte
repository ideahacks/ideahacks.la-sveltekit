<script>
	export let data;

	import Fuse from 'fuse.js';

	const parts = data.parts;

	const fuseOptions = {
		// isCaseSensitive: false,
		// includeScore: false,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		// minMatchCharLength: 1,
		// location: 0,
		// threshold: 0.6,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		// fieldNormWeight: 1,
		keys: ['name']
	};

	const fuse = new Fuse(parts, fuseOptions);

	// Change the pattern
	let searchPattern = '';

	$: fuseResults = fuse.search(searchPattern);

	$: summaries = fuseResults.map((parts) => ({
		name: parts.item.name,
		quantity: parts.item.quantity
	}));
</script>

<h1>Parts</h1>
<p>List of available parts.</p>

<br />

<input class="input-bordered input" bind:value={searchPattern} />

<div class="flex">
	{#each summaries as { name, quantity }}
		<!-- <li>{name}: {quantity}</li> -->
		<div class="card w-96 bg-base-100 shadow-xl">
			<!-- <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> -->
			<div class="card-body">
				<h2 class="card-title">{name}</h2>
				<p>{quantity}</p>
				<div class="card-actions justify-end">
					<button class="btn w-64 rounded-full">Checkout</button>
				</div>
			</div>
		</div>
	{/each}
</div>

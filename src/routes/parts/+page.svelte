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

	const restructuredParts = parts.map(parts => ({
		item: parts,
		matches: [],
		score: 1
	}));

	// Change the pattern
	let searchPattern = '';

	$: fuseResults = searchPattern == '' ? restructuredParts : fuse.search(searchPattern);

	$: summaries = fuseResults.map((parts) => ({
		name: parts.item.name,
		quantity: parts.item.quantity
	}));
</script>

<div class="m-12 space-y-8 justify-center">
	<h1 class="flex justify-center font-display-serif text-8xl md:text-9xl">Parts</h1>
	<!-- <p>List of available parts.</p> -->

	<br />
	<div class="flex justify-center pb-4">
		<input class="input-bordered input" placeholder="Search" bind:value={searchPattern} />
	</div>


	<div class="flex justify-center flex-wrap gap-8">
		{#each summaries as { name, quantity }}
			<!-- <li>{name}: {quantity}</li> -->
			<div class="card w-96 bg-base-100 shadow-xl">
				<figure class="px-10 pt-10">
					<img src="https://hackster.imgix.net/uploads/attachments/1443631/_ArRPjgFw5x.blob?auto=compress%2Cformat&w=900&h=675&fit=min" alt="LED" />
				</figure>
				<div class="card-body gap-4">
					<h2 class="card-title">{name}</h2>
					<p>Quantity: {quantity}</p>
					<p>Description: ...</p>
					<div class="card-actions justify-center pt-2">
						<button class="btn w-64 rounded-full">Checkout</button>
					</div>
				</div>
			</div>
		{/each}
	</div>

</div>

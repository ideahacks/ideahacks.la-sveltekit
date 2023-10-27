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

<ul>
	{#each summaries as { name, quantity }}
		<li>{name}: {quantity}</li>
	{/each}
</ul>

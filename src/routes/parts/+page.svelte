<script>
	import Parts from '$lib/components/Parts.svelte';
	import { createSearchStore, searchHandler } from '$lib/stores/search'
	import { onDestroy } from 'svelte';

    export let data;

	const searchProducts = data.summaries.map((parts) => ({
		...parts,
		searchTerms: `${parts.name} ${parts.quantity}`
	}))

	const searchStore = createSearchStore(searchProducts);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	})
</script>

<!-- <h1>Parts</h1>
<p>List of available parts.</p>

<br>

<ul>
	{#each data.summaries as { name, quantity }}
		<li>{name}: {quantity}</li>
	{/each}
</ul> -->

<div class="container">
	<h1>Search/Filter</h1>
	<input type="search" placeholder="Search..." bind:value={$searchStore.search} />
</div>
<pre>{JSON.stringify($searchStore.filtered, null, 2)}</pre>
<script>
    export let data;
</script>

<h1>Parts</h1>
<p>List of available parts.</p>

<br>

<ul>
	{#each data.summaries as { name, quantity }}
		<li>{name}: {quantity}</li>
	{/each}
</ul>

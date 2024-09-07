<script lang="ts">
	import '../app.css';

	import NavBar from '$lib/components/NavBar.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />

	<slot />
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #4152a9 0%, #bbcced 100%);
	}
</style>

<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import '../app.css';
	import cityscape from '$lib/images/cityscape.png';
</script>

<div class="z-0 flex min-h-screen flex-col">
	<slot />
	<div class="z-20 h-24 w-full bg-contain" style="background-image: url({cityscape});" />
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #2775af 0%, #83c3e8 100%);
		background-color: #83c3e8;
	}
</style>

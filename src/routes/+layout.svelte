<script lang="ts">
	import '../app.css';
	import cityscape from '$lib/images/cityscape.png';
</script>

<div class="z-0 flex min-h-screen flex-col">
	<slot />
	<div class="fixed bottom-0 h-24 w-full bg-contain" style="background-image: url({cityscape});" />
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #2775af 0%, #83c3e8 100%);
		background-color: #83c3e8;
	}
</style>

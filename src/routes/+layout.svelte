<script lang="ts">
	import '../app.css';
	import pixelclouds from '$lib/images/pixelclouds.png';
</script>

<div class="flex min-h-screen flex-col">
	<slot />
	<div
		class="fixed bottom-0 h-12 w-full bg-contain sm:h-24"
		style="background-image: url({pixelclouds});"
	/>
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #2775af 0%, #83c3e8 100%);
		background-color: #83c3e8;
	}
</style>

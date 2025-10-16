<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar />

<div class="w-full min-h-screen flex items-center justify-center bg-gray-900 relative">
	<img
		src="/home-background.svg"
		alt="Retro synthwave background"
		class="w-full h-auto"
	/>
	<div class="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col w-3/4 z-10 min-h-screen">
		<div class="min-h-[120px]"></div>
		<img
			src="/logo.svg"
			alt="Logo"
			class="w-full h-auto"
		/>
		<div class="mt-6 text-center">
			<div class="font-sans text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg">
				Jan 12-14
			</div>
			<div class="font-sans text-gray-300 text-lg sm:text-xl md:text-2xl drop-shadow-lg">
				Ackerman Grand Ballroom
			</div>
		</div>
		<div class="flex-1"></div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: auto;
		background-color: #111827;
	}

	:global(html) {
		margin: 0;
		padding: 0;
		overflow: auto;
	}
</style>

<script>
	import pillar1 from '$lib/images/PILLAR_1.png';
	import pillar2 from '$lib/images/PILLAR_2.png';
	import pillar3 from '$lib/images/PILLAR_3.png';
	import topPrize from '$lib/images/tesla_model_s.png';
	import pixelclouds from '$lib/images/pixelclouds.png';
</script>

<div class="relative overflow-hidden rounded-xl bg-white bg-opacity-30 p-5">
	<!-- Pixel Clouds Overlay -->
	<div
		class="pointer-events-none absolute bottom-0 left-0 z-10 h-48 w-full bg-contain bg-center bg-repeat-x"
		style="background-image: url({pixelclouds});"
	/>

	<h1 class="pt-4 text-center font-paytone text-4xl font-bold text-white">TOP PRIZES</h1>

	<!-- Prizes and Pillars -->
	<div class="z-0 flex items-center justify-center gap-16 overflow-hidden">
		<div class="relative top-24 w-1/6">
			<p class="pb-4 text-center font-paytone text-2xl text-white">Second Prize</p>
			<img src={topPrize} alt="Top Prize" />
			<p class="pb-4 pt-2 text-center font-encode text-2xl text-white">Tesla Model S</p>
			<img src={pillar1} alt="Pillar 1" />
		</div>

		<div class="relative top-8 w-1/6">
			<p class="pb-4 text-center font-paytone text-2xl text-white">First Prize</p>
			<img src={topPrize} alt="Top Prize" />
			<p class="pb-4 pt-2 text-center font-encode text-2xl text-white">Tesla Model S</p>
			<img src={pillar2} alt="Pillar 2" />
		</div>

		<div class="relative top-40 w-1/6">
			<p class="pb-4 text-center font-paytone text-2xl text-white">Third Prize</p>
			<img src={topPrize} alt="Top Prize" />
			<p class="pb-4 pt-2 text-center font-encode text-2xl text-white">Tesla Model S</p>
			<img src={pillar3} alt="Pillar 3" />
		</div>
	</div>
</div>

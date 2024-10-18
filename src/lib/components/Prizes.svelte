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
		class="pointer-events-none absolute bottom-0 left-0 z-10 h-16 w-full bg-contain bg-center bg-repeat-x sm:h-24 md:h-36 lg:h-48"
		style="background-image: url({pixelclouds});"
	/>

	<h1 class="pt-4 text-center font-paytone text-4xl font-bold text-white">TOP PRIZES</h1>

	<!-- Prizes and Pillars -->
	<div class="z-0 flex items-center justify-center gap-16 overflow-hidden">
		<div class="relative top-24 w-1/6">
			<p class="hover pb-4 text-center font-paytone text-base text-white md:text-lg lg:text-2xl">
				Second Prize
			</p>
			<img src={topPrize} alt="Top Prize" class="hover" />
			<p class="hover pb-4 pt-2 text-center font-encode text-xs text-white md:text-base lg:text-xl">
				Tesla Model S
			</p>
			<img src={pillar1} alt="Pillar 1" />
		</div>

		<div class="relative top-8 w-1/6">
			<p class="hover pb-4 text-center font-paytone text-base text-white md:text-lg lg:text-2xl">
				First Prize
			</p>
			<img src={topPrize} alt="Top Prize" class="hover" />
			<p class="hover pb-4 pt-2 text-center font-encode text-xs text-white md:text-base lg:text-xl">
				Tesla Model S
			</p>
			<img src={pillar2} alt="Pillar 2" />
		</div>

		<div class="relative top-40 w-1/6">
			<p class="hover pb-4 text-center font-paytone text-base text-white md:text-lg lg:text-2xl">
				Third Prize
			</p>
			<img src={topPrize} alt="Top Prize" class="hover" />
			<p class="hover pb-4 pt-2 text-center font-encode text-xs text-white md:text-base lg:text-xl">
				Tesla Model S
			</p>
			<img src={pillar3} alt="Pillar 3" />
		</div>
	</div>
</div>

<style>
	@keyframes hover {
		0%,
		100% {
			transform: translateY(8px);
		}
		50% {
			transform: translateY(-2px); /* Adjust the height for the hover effect */
		}
	}

	.hover {
		animation: hover 3s ease-in-out infinite; /* Change duration as needed */
	}
</style>

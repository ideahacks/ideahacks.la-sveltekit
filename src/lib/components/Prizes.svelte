<script>
	import pillar1 from '$lib/images/PILLAR_1.png';
	import pillar2 from '$lib/images/PILLAR_2.png';
	import pillar3 from '$lib/images/PILLAR_3.png';
	import topPrize from '$lib/images/tesla_model_s.png';
	import pixelclouds from '$lib/images/pixelclouds.png';
	import superHumanPrize from '$lib/images/Super_Mario.png';
	import nostalgicPrize from '$lib/images/Old_Radio.png';
	import insanePrize from '$lib/images/Frakenstein_Statue.png';
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

<div class="relative mt-5 overflow-hidden rounded-xl bg-white bg-opacity-30 p-5">
	<h1 class="pt-4 text-center font-paytone text-4xl text-white">TRACK PRIZES</h1>
	<div class="grid grid-cols-1 place-items-center gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col items-center justify-center">
			<h2 class="pb-2 pt-4 text-center font-paytone text-2xl text-white">Super Human</h2>
			<img src={superHumanPrize} alt="Super Human Prize" class="mx-auto w-32" />
			<p class="pt-2 text-center font-encode text-xl text-white">Super Mario Action Figure!</p>
		</div>
		<div class="items-center justify-center">
			<h2 class="pb-2 pt-4 text-center font-paytone text-2xl text-white">Super Nostalgic</h2>
			<img src={nostalgicPrize} alt="Nostalgic Prize" class="mx-auto w-80" />
			<p class="pt-2 text-center font-encode text-xl text-white">Your Grandma's Old Radio</p>
		</div>
		<div class="items-center justify-center md:col-span-2 lg:col-span-1">
			<h2 class="pb-2 pt-4 text-center font-paytone text-2xl text-white">Super (in)sane</h2>
			<img src={insanePrize} alt="Insane Prize" class="mx-auto w-56" />
			<p class="pt-2 text-center font-encode text-xl text-white">$200 Frankenstein Statue</p>
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

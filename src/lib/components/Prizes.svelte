<script>
	import { onMount } from 'svelte';
	import topPrize from '$lib/images/tesla_model_s.png';
	import pixelclouds from '$lib/images/pixelclouds.png';
	import superHumanPrize from '$lib/images/Super_Mario.png';
	import nostalgicPrize from '$lib/images/Old_Radio.png';
	import insanePrize from '$lib/images/Frakenstein_Statue.png';
	import pillar1 from '$lib/images/PILLAR_1.png';
	import pillar2 from '$lib/images/PILLAR_2.png';
	import pillar3 from '$lib/images/PILLAR_3.png';

	let isSmallScreen = false;

	onMount(() => {
		const checkScreenSize = () => {
			isSmallScreen = window.innerWidth < 768;
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});
</script>

{#if isSmallScreen}
	<div class="relative overflow-hidden rounded-xl pb-5">
		<!-- Pixel Clouds Overlay -->

		<h1 class="py-4 text-center font-paytone text-2xl font-bold text-white">TOP PRIZES</h1>

		<!-- Prizes -->
		<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
			<div class="flex flex-col items-center justify-center">
				<p class="pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
					First Prize
				</p>
				<img src={topPrize} alt="Top Prize" class="w-48 max-w-xs" />
				<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
					Tesla Model S
				</p>
			</div>

			<div class="flex flex-col items-center justify-center">
				<p class="pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
					Second Prize
				</p>
				<img src={topPrize} alt="Top Prize" class="w-48 max-w-xs" />
				<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
					Tesla Model S
				</p>
			</div>

			<div class="flex flex-col items-center justify-center">
				<p class="pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
					Third Prize
				</p>
				<img src={topPrize} alt="Top Prize" class="w-48 max-w-xs" />
				<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
					Tesla Model S
				</p>
			</div>
		</div>
	</div>
{:else}
	<div class="relative overflow-hidden rounded-xl pb-5">
		<!-- Pixel Clouds Overlay -->

		<h1 class=" text-center font-paytone text-3xl font-bold text-white">TOP PRIZES</h1>

		<!-- Prizes and Pillars -->
		<div class="z-0 flex items-center justify-center gap-8 overflow-hidden sm:gap-16 md:gap-24">
			<div class="relative top-24 w-1/6">
				<p class="hover pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
					Second Prize
				</p>
				<img src={topPrize} alt="Top Prize" class="hover" />
				<p class="hover pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
					Tesla Model S
				</p>
				<img src={pillar1} alt="Pillar 1" />
			</div>

			<div class="relative top-8 w-1/6">
				<p class="hover pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
					First Prize
				</p>
				<img src={topPrize} alt="Top Prize" class="hover" />
				<p class="hover pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
					Tesla Model S
				</p>
				<img src={pillar2} alt="Pillar 2" />
			</div>

			<div class="relative top-40 w-1/6">
				<p class="hover pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
					Third Prize
				</p>
				<img src={topPrize} alt="Top Prize" class="hover" />
				<p class="hover pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
					Tesla Model S
				</p>
				<img src={pillar3} alt="Pillar 3" />
			</div>
		</div>

		<!-- Gradient Overlay -->
		<div class="absolute inset-0 bg-gradient-to-t from-[#83c3e8] via-transparent to-transparent" />
	</div>
{/if}
<div class="relative overflow-hidden rounded-xl p-5">
	<h1 class="pt-4 text-center font-paytone text-3xl text-white">TRACK PRIZES</h1>
	<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col items-center justify-center">
			<h2 class="py-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				Super Human
			</h2>
			<img src={superHumanPrize} alt="Super Human Prize" class="mx-auto w-32" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				Super Mario Action Figure!
			</p>
		</div>
		<div class="items-center justify-center">
			<h2 class="py-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				Super Nostalgic
			</h2>
			<img src={nostalgicPrize} alt="Nostalgic Prize" class="mx-auto w-80" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				Your Grandma's Old Radio
			</p>
		</div>
		<div class="items-center justify-center md:col-span-2 lg:col-span-1">
			<h2 class="py-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				Super (in)sane
			</h2>
			<img src={insanePrize} alt="Insane Prize" class="mx-auto w-56" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				$200 Frankenstein Statue
			</p>
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

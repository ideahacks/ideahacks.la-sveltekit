<script>
	import grandPrize from '$lib/images/prizes/grand_prize.png';
	import secondPrize from '$lib/images/prizes/second_prize.png';
	import thirdPrize from '$lib/images/prizes/third_prize.png';

	import superHumanPrize from '$lib/images/prizes/super_human_prize.png';
	import superNostalgicPrize from '$lib/images/prizes/super_nostalgic_prize.png';
	import superInsanePrize from '$lib/images/prizes/super_insane_prize.png';
</script>

<div class="relative overflow-hidden rounded-xl pb-5">
	<!-- Prizes -->
	<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col items-center justify-center">
			<p class="pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				🥇 First Place 🥇
			</p>
			<img src={grandPrize} alt="Grand Prize" class="hover1 w-48 max-w-xs" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				Flashforge Adventurer 5M 3D Printer
			</p>
		</div>

		<div class="flex flex-col items-center justify-center">
			<p class="pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				🥈 Second Place 🥈
			</p>
			<img src={secondPrize} alt="Second Prize" class="hover2 w-48 max-w-xs" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				AOC 27" 180Hz 1440p Gaming Monitor
			</p>
		</div>

		<div class="flex flex-col items-center justify-center">
			<p class="pb-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				🥉 Third Place 🥉
			</p>
			<img src={thirdPrize} alt="Third Prize" class="hover3 w-48 max-w-xs" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				JBL Flip 6
			</p>
		</div>
	</div>
</div>
<div class="relative overflow-hidden rounded-xl p-5">
	<div class="grid grid-cols-1 gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
		<div class="flex flex-col items-center justify-center">
			<h2 class="py-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				⭐ Super Human ⭐
			</h2>
			<img src={superHumanPrize} alt="Super Human Prize" class="hover4 mx-auto w-32" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				FitBit Inspire 3
			</p>
		</div>
		<div class="items-center justify-center">
			<h2 class="py-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				☁️ Super Nostalgic ☁️
			</h2>
			<img src={superNostalgicPrize} alt="Super Nostalgic Prize" class="hover5 mx-auto w-32" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				JBL Tune 720BT Headphones
			</p>
		</div>
		<div class="items-center justify-center md:col-span-2 lg:col-span-1">
			<h2 class="py-4 text-center font-paytone text-sm text-white md:text-base lg:text-xl">
				⚡ Super (in)sane ⚡
			</h2>
			<img src={superInsanePrize} alt="Super Insane Prize" class="hover6 mx-auto w-32" />
			<p class="pb-4 pt-2 text-center font-encode text-xs text-white md:text-sm lg:text-lg">
				Levitating Lightbulb Lamp
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

	.hover1 {
		animation: hover 2.5s ease-in-out infinite; /* Change duration as needed */
	}
	.hover2 {
		animation: hover 2s ease-in-out infinite; /* Change duration as needed */
	}
	.hover3 {
		animation: hover 1.5s ease-in-out infinite; /* Change duration as needed */
	}
	.hover4 {
		animation: hover 4s ease-in-out infinite; /* Change duration as needed */
	}
	.hover5 {
		animation: hover 3s ease-in-out infinite; /* Change duration as needed */
	}
	.hover6 {
		animation: hover 3.5s ease-in-out infinite; /* Change duration as needed */
	}
</style>

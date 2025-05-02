<script lang="ts">
	import ideaHacksLogo from '$lib/images/IDEAHACKS_LOGO_WHITE.png';
	import superchargedLogo from '$lib/images/SUPERCHARGE.png';
	import starCharacter from '$lib/images/STAR.png';
	import starIcon from '$lib/images/STAR_ICON.png';
	import SelectionButton from '$lib/components/utility/SelectionButton.svelte';
	import BigFaq from '$lib/components/BigFaq.svelte';
	import Prizes from '$lib/components/Prizes.svelte';

	import ideahacks2020 from '$lib/images/ideahacks2020.png';
	import ideahacks2021 from '$lib/images/ideahacks2021.png';
	import ideahacks2022 from '$lib/images/ideahacks2022.png';
	import ideahacks2023 from '$lib/images/ideahacks2023.png';
	import ideahacks2024 from '$lib/images/ideahacks2024.png';

	import cityscape from '$lib/images/cityscape.png';

	// https://www.ti.com/
	// https://www.infineon.com/
	// https://www.digikey.com/

	import digikey from '$lib/images/sponsors/digikey.svg';
	import infineon from '$lib/images/sponsors/infineon.svg';
	import ti from '$lib/images/sponsors/ti.svg';

	import uclaSamueliLogo from '$lib/images/UCLA_Samueli_Engineering_block-1.png';

	// Generate 40 random star positions
	const stars = Array.from({ length: 40 }, () => ({
		x: Math.random() * 100,
		y: Math.random() * 100,
		scale: 0.1 + Math.random() * 0.9,
		image: Math.random() > 0.5 ? starCharacter : starIcon,
		delay: 0.5 + Math.random() * 3.5,
		duration: 1 + Math.random() * 4
	}));
	export let data;

	let lightningIntervalId;

	import { onMount, onDestroy } from 'svelte';
	import Schedule from '$lib/components/Schedule.svelte';

	let alert = true;

	onMount(() => {
		function generateLightning() {
			const svg = document.getElementById('svgContainer');
			const width = window.innerWidth;
			const initial_x = Math.random() * width;
			let initial_y = 0;
			let colors = ['white', 'yellow', 'cyan'];
			let randomIndex = Math.floor(Math.random() * colors.length);
			let color = colors[randomIndex];
			const segmentDelay = Math.random() * 25; // Adjust for the speed of the lightning
			let currentZigzagPath = `M${initial_x},${initial_y}`;
			const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			line.setAttribute('class', 'rayo');
			line.setAttribute('stroke', color);
			line.setAttribute('stroke-width', '' + (Math.random() * 2 + 1));
			line.setAttribute('fill', 'none');
			if (svg) {
				svg.appendChild(line);
			}

			function addSegment() {
				if (initial_y >= window.innerHeight) {
					setTimeout(() => {
						line.style.transition = 'opacity 0.7s ease-in-out';
						line.style.opacity = '0';
						setTimeout(() => {
							line.remove();
						}, 700);
					}, 700); // Fade out after reaching the bottom
					return;
				}

				let xOffset = (Math.random() - 0.5) * 100;
				let yOffset = Math.random() * 100 + 50;
				initial_y += yOffset;
				currentZigzagPath += ` L${initial_x + xOffset},${initial_y}`;

				if (Math.random() > 0.7) {
					let branchX = initial_x + xOffset + (Math.random() - 0.5) * 50;
					let branchY = initial_y + Math.random() * 30;
					currentZigzagPath += ` M${initial_x + xOffset},${initial_y} L${branchX},${branchY}`;
				}

				line.setAttribute('d', currentZigzagPath);
				setTimeout(addSegment, segmentDelay);
			}

			addSegment(); // Start the process of adding segments
		}

		// Set the interval and store its ID
		lightningIntervalId = setInterval(() => {
			generateLightning();
			if (Math.random() > 0.5) {
				if (Math.random() > 0.5) {
					setTimeout(generateLightning, 20 + Math.random() * 80); // Quicker follow-up
				}
				setTimeout(generateLightning, 20 + Math.random() * 80); // Quicker follow-up
			}
		}, Math.random() * 2500 + 1000); // More frequent
	});

	// Add an event listener for the 'beforeunload' event
	onDestroy(() => {
		clearInterval(lightningIntervalId); // Clear the interval
	});
</script>

<section class="relative top-[-70px] h-screen w-screen overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-black/80 to-blue-950/0" />
	<div class="absolute inset-0">
		{#each stars as star}
			<img
				src={star.image}
				alt="star"
				class="star absolute"
				style="
					left: {star.x}%; 
					top: {star.y}%; 
					transform: scale({star.scale});
					animation-delay: {star.delay}s;
					animation-duration: {star.duration}s;"
			/>
		{/each}
		<svg id="svgContainer" />
	</div>
	<div class="absolute z-20 my-20 w-full p-2">
		{#if alert}
			<div role="alert" class="alert mx-auto mb-4 max-w-4xl opacity-60 shadow-lg">
				<p>
					<span class="font-bold">Attention!</span>
					If you cannot log in with your email, please send a Discord message to `agariomasster` with
					your name, email you signed up with, and google email you want to change it to
				</p>
				<button
					class="hover-lift btn my-1 rounded-full bg-base-300 hover:bg-opacity-60"
					on:click={() => (alert = false)}>OK</button
				>
			</div>
		{/if}
	</div>

	<div class="relative z-10 flex h-full w-full flex-col items-center justify-center text-center">
		<img src={ideaHacksLogo} alt="Idea Hacks Logo" class="mt-20 w-3/4 max-w-lg" />
		<div class="supercharge-container w-1/2 max-w-lg">
			<img src={superchargedLogo} alt="Supercharge" class="supercharge-flicker w-full" />
		</div>
		<!-- <h1 class="pb-6 font-paytone text-6xl font-bold text-white max-md:text-4xl">IdeaHacks 2025</h1> -->
		<p class="mb-0 mt-2 font-encode text-2xl text-white max-md:text-xl">
			<strong>Covel Commons Grand Horizon Room</strong>
		</p>
		<p class="max-md:text-md font-encode text-lg text-white">May 2-4, 2025</p>
		<div class="m-4">
			{#if data.session}
				<a href="/account">
					<SelectionButton
						className="btn-active bg-opacity-10 font-encode mx-2"
						text="My Account"
					/>
				</a>
			{:else}
				<a href="/login">
					<SelectionButton className="btn-active bg-opacity-10 font-encode" text="Log In" />
				</a>
			{/if}
		</div>
	</div>
</section>

<section class="pt-8 text-white">
	<div class="z-10 mx-auto my-10 max-w-4xl p-4 text-center">
		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>About</span>
		</h1>
		<div class="text-md mb-4 font-encode text-white xl:text-lg">
			For the eleventh time, IEEE at UCLA is pleased to present IDEA Hacks, the largest hardware
			hackathon on the West Coast! We provide all our hackers with all the hardware, tools, and
			equipment that they need, including 3D printers and soldering stations, free of charge. Our
			hundreds of hackers will not only code, but create tangible products from scratch over the
			course of 36 hours.
		</div>

		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>Theme & Tracks</span>
		</h1>
		<div class="text-md mb-4 font-encode text-white xl:text-lg">
			Welcome to Supercharge! This year, we're bringing an electrifying mix of innovation and energy
			to our hackathon!
		</div>
		<div class="text-md mb-4 font-encode text-white xl:text-lg">
			<span class="font-bold">⭐ Super Human ⭐</span> - Enhance aspects of your daily life and become
			your best self!
		</div>
		<div class="text-md mb-4 font-encode text-white xl:text-lg">
			<span class="font-bold">☁️ Super Nostalgic ☁️</span> - Take a journey back to your roots and embrace
			your old self!
		</div>
		<div class="text-md mb-4 font-encode text-white xl:text-lg">
			<span class="font-bold">⚡ Super (in)Sane ⚡</span> - Break the mold and discover your true self!
		</div>

		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>Schedule</span>
		</h1>
		<Schedule />

		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>Prizes</span>
			<Prizes />
		</h1>

		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>FAQs</span>
		</h1>
		<BigFaq />

		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>History</span>
		</h1>
		<div class="text-md mb-4 font-encode text-white xl:text-lg">
			IDEA Hacks was founded in 2014 by members of UCLA IEEE and Theta Tau Upsilon Delta. Ever since
			our first hackathon in January 2015, IDEA Hacks’ vision has been to provide engineering
			students with a space to learn, create, and inspire one another. As the first and largest
			hardware hackathon in California, we encourage interdisciplinary teams to build hands-on
			components as opposed to a software hackathon.
		</div>

		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>Previous Events</span>
		</h1>
		<div class="text-md mb-8 font-encode text-white xl:text-lg">
			<a
				href="https://idea-hacks-2024.devpost.com"
				target="_blank"
				class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
				><img
					src={ideahacks2024}
					class="rounded-full opacity-75"
					alt="ideahacks 2023 logo"
				/>2024</a
			>
			<a
				href="https://idea-hacks-2023.devpost.com"
				target="_blank"
				class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
				><img
					src={ideahacks2023}
					class="rounded-full opacity-75"
					alt="ideahacks 2023 logo"
				/>2023</a
			>
			<a
				href="https://ideahacks2022.devpost.com"
				target="_blank"
				class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
				><img
					src={ideahacks2022}
					class="rounded-full opacity-75"
					alt="ideahacks 2022 logo"
				/>2022</a
			>
			<a
				href="https://ideahacks2021.devpost.com"
				target="_blank"
				class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
				><img
					src={ideahacks2021}
					class="rounded-full opacity-75"
					alt="ideahacks 2021 logo"
				/>2021</a
			>
			<a
				href="https://ideahacks2020.devpost.com"
				target="_blank"
				class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
				><img
					src={ideahacks2020}
					class="rounded-full opacity-75"
					alt="ideahacks 2020 logo"
				/>2020</a
			>
		</div>
		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>Sponsors</span>
		</h1>
		<div class="center-align z-100 rounded-2xl p-4">
			<a
				href="https://www.digikey.com/"
				target="_blank"
				class="mt-0 inline-block w-48 p-2 text-center hover:cursor-pointer hover:opacity-80"
				><img src={digikey} class="" alt="digikey logo" /></a
			>
			<a
				href="https://www.infineon.com/"
				target="_blank"
				class="mt-0 inline-block w-48 p-2 text-center hover:cursor-pointer hover:opacity-80"
				><img src={infineon} class="" alt="infineon logo" /></a
			>
			<a
				href="https://www.ti.com/"
				target="_blank"
				class="mt-0 inline-block w-48 p-2 text-center hover:cursor-pointer hover:opacity-80"
				><img src={ti} class="" alt="ti logo" /></a
			>
		</div>
		<p class="text-md mb-4 mt-4 font-encode text-white xl:text-lg">
			Special thanks to UCLA Samueli School of Engineering for their continued support of IDEA Hacks
			and our mission to empower the next generation of engineers.
		</p>
		<img
			src={uclaSamueliLogo}
			class="mx-auto my-8 h-16 w-auto"
			alt="UCLA Samueli School of Engineering logo"
		/>
	</div>
	<div class="bottom-0 z-20 h-24 w-full bg-contain" style="background-image: url({cityscape});" />
</section>

<style>
	.star {
		width: 12px;
		height: 12px;
		opacity: 0.3;
		transform: scale(0.6);
		filter: brightness(0.8);
		animation: twinkle alternate infinite cubic-bezier(0.4, 0, 0.6, 1);
		will-change: transform, opacity, filter;
	}

	@keyframes twinkle {
		0% {
			opacity: 0.3;
			transform: scale(0.6);
			filter: brightness(0.8);
		}
		100% {
			opacity: 0.8;
			transform: scale(1);
			filter: brightness(1.2);
		}
	}

	.supercharge-container {
		position: relative;
	}

	.supercharge-flicker {
		animation: flicker 2s linear infinite;
		filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px #4099ff);
	}

	@keyframes flicker {
		0% {
			opacity: 1;
			filter: brightness(1) drop-shadow(0 0 5px #fff);
		}
		3% {
			opacity: 0.6;
			filter: brightness(1.2) drop-shadow(0 0 15px #4099ff);
		}
		6% {
			opacity: 1;
			filter: brightness(1) drop-shadow(0 0 5px #fff);
		}
		7% {
			opacity: 0.8;
			filter: brightness(1.1) drop-shadow(0 0 10px #4099ff);
		}
		9% {
			opacity: 1;
			transform: scale(1);
			filter: brightness(1) drop-shadow(0 0 5px #fff);
		}
		11% {
			opacity: 0.9;
			filter: brightness(1.2) drop-shadow(0 0 12px #4099ff);
		}
		20% {
			opacity: 1;
			filter: brightness(1) drop-shadow(0 0 5px #fff);
		}
		80% {
			opacity: 1;
			filter: brightness(1) drop-shadow(0 0 5px #fff);
		}
		85% {
			opacity: 0.7;
			filter: brightness(1.3) drop-shadow(0 0 15px #4099ff);
		}
		87% {
			opacity: 1;
			filter: brightness(1) drop-shadow(0 0 5px #fff);
		}
	}

	@keyframes spark {
		0% {
			opacity: 0;
			transform: scale(0.8);
		}
		20% {
			opacity: 0.4;
			transform: scale(1.1);
		}
		40% {
			opacity: 0;
			transform: scale(1.3);
		}
		100% {
			opacity: 0;
			transform: scale(1.4);
		}
	}

	svg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		mix-blend-mode: screen;
		opacity: 0.5;
	}

	@keyframes aparecer {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.5;
		}
	}

	@keyframes desvanecer {
		from {
			opacity: 0.5;
		}
		to {
			opacity: 0;
		}
	}
</style>

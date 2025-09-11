<script lang="ts">
	import ideahacks2020 from '$lib/images/ideahacks2020.png';
	import ideahacks2021 from '$lib/images/ideahacks2021.png';
	import ideahacks2022 from '$lib/images/ideahacks2022.png';
	import ideahacks2023 from '$lib/images/ideahacks2023.png';
	import ideahacks2024 from '$lib/images/ideahacks2024.png';
	import ideahacks2025 from '$lib/images/ideahacks2025.png';

	// https://www.ti.com/
	// https://www.infineon.com/
	// https://www.digikey.com/

	import digikey from '$lib/images/sponsors/digikey.svg';
	import infineon from '$lib/images/sponsors/infineon.svg';
	import ti from '$lib/images/sponsors/ti.svg';

	import uclaSamueliLogo from '$lib/images/UCLA_Samueli_Engineering_block-1.png';

	import { onMount, onDestroy } from 'svelte';
	let { data } = $props();

	let alert = $state(false);
	function scrollToSection(id: string) {
		const target = document.getElementById(id);
		if (!target) return;

		const top = target.getBoundingClientRect().top + window.scrollY;
		window.scrollTo({
			top,
			behavior: 'smooth'
		});
	}
</script>

<!-- Hero Section -->
<section class="w-full bg-gradient-to-b h-screen from-gray-100 to-white text-black">
	<div class="flex h-screen flex-col items-center justify-center text-center px-4">
		<h1 class="text-6xl font-semibold tracking-tight max-md:text-4xl">IdeaHacks 2026</h1>
		<p class="mt-4 text-lg text-gray-700">Coming soon. Details to be announced.</p>

		<!-- Chevron Button -->
		<button
			onclick={() => scrollToSection('about')}
			class="mt-8"
			aria-label="Scroll to About Section"
		>
			<svg
				class="h-6 w-6 text-gray-500 hover:text-black transition"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>
</section>

<!-- About Section -->
<section id="about" class="bg-white text-black px-6">
	<div class="flex h-screen flex-col items-center justify-center px-4 max-w-4xl mx-auto">
		<!-- About -->
		<h2 class="text-3xl font-semibold mb-4 text-center">About</h2>
		<p class="text-base text-gray-800 leading-relaxed">
			Now in its twelfth year, IEEE at UCLA proudly presents IDEA Hacks — the largest hardware
			hackathon on the West Coast. Over 36 hours, students bring ideas to life with free access to
			hardware, tools, 3D printers, soldering stations, and more. It’s not just coding — it’s
			building something real.
		</p>

		<!-- Previous Events -->
		<h2 class="text-3xl font-semibold mt-20 mb-6 text-center">Previous Events</h2>
		<div class="flex flex-wrap justify-center gap-6 text-center">
			<a href="https://idea-hacks-2025.devpost.com" target="_blank" class="group">
				<img
					src={ideahacks2025}
					alt="2025"
					class="h-20 w-20 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-2 text-sm text-gray-800">2025</p>
			</a>
			<a href="https://idea-hacks-2024.devpost.com" target="_blank" class="group">
				<img
					src={ideahacks2024}
					alt="2024"
					class="h-20 w-20 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-2 text-sm text-gray-800">2024</p>
			</a>
			<a href="https://idea-hacks-2023.devpost.com" target="_blank" class="group">
				<img
					src={ideahacks2023}
					alt="2023"
					class="h-20 w-20 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-2 text-sm text-gray-800">2023</p>
			</a>
			<a href="https://ideahacks2022.devpost.com" target="_blank" class="group">
				<img
					src={ideahacks2022}
					alt="2022"
					class="h-20 w-20 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-2 text-sm text-gray-800">2022</p>
			</a>
			<a href="https://ideahacks2021.devpost.com" target="_blank" class="group">
				<img
					src={ideahacks2021}
					alt="2021"
					class="h-20 w-20 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-2 text-sm text-gray-800">2021</p>
			</a>
			<a href="https://ideahacks2020.devpost.com" target="_blank" class="group">
				<img
					src={ideahacks2020}
					alt="2020"
					class="h-20 w-20 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-2 text-sm text-gray-800">2020</p>
			</a>
		</div>

		<!-- Sponsors -->
		<h2 class="text-3xl font-semibold mt-20 text-center mb-6">Sponsors</h2>
		<div class="flex flex-wrap justify-center gap-10 items-center">
			<a href="https://www.digikey.com/" target="_blank" class="hover:opacity-90 transition">
				<img src={digikey} alt="DigiKey" class="h-12" />
			</a>
			<a href="https://www.infineon.com/" target="_blank" class="hover:opacity-90 transition">
				<img src={infineon} alt="Infineon" class="h-12" />
			</a>
			<a href="https://www.ti.com/" target="_blank" class="hover:opacity-90 transition">
				<img src={ti} alt="TI" class="h-12" />
			</a>
		</div>
	</div>
</section>

<style>
</style>

<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	import Tracks from '$lib/components/Tracks.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';

	import ideahacks2020 from '$lib/images/ideahacks_logos/ideahacks2020_icon.png';
	import ideahacks2021 from '$lib/images/ideahacks_logos/ideahacks2021_icon.png';
	import ideahacks2022 from '$lib/images/ideahacks_logos/ideahacks2022_icon.png';
	import ideahacks2023 from '$lib/images/ideahacks_logos/ideahacks2023_icon.png';
	import ideahacks2024 from '$lib/images/ideahacks_logos/ideahacks2024_icon.png';
	import ideahacks2025 from '$lib/images/ideahacks_logos/ideahacks2025_icon.png';

	import previous1 from '$lib/images/previous/Previous 1.png';
	import previous2 from '$lib/images/previous/Previous 2.png';
	import previous3 from '$lib/images/previous/Previous 3.png';
	import previous4 from '$lib/images/previous/Previous 4.png';
	import previous5 from '$lib/images/previous/Previous 5.png';

	// Import sponsor images
	import infineonLogo from '$lib/images/sponsors/infineon.svg';
	import tiLogo from '$lib/images/sponsors/ti.svg';
	import digikeyLogo from '$lib/images/sponsors/digikey.svg';

	// Image cycling logic
	const previousImages = [previous1, previous2, previous3, previous4, previous5];
	let currentImageIndex = 0;
	let currentImage = previousImages[currentImageIndex];
	let hoverSide = '';

	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % previousImages.length;
		currentImage = previousImages[currentImageIndex];
	}

	function prevImage() {
		currentImageIndex = (currentImageIndex - 1 + previousImages.length) % previousImages.length;
		currentImage = previousImages[currentImageIndex];
	}

	function handleMouseMove(event: MouseEvent) {
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const x = event.clientX - rect.left;
		const width = rect.width;

		if (x < width / 2) {
			hoverSide = 'left';
		} else {
			hoverSide = 'right';
		}
	}

	function handleMouseLeave() {
		hoverSide = '';
	}
</script>

<NavBar />

<!-- Hero Section -->
<Hero />

<div class="py-20 px-4">
	<div class="max-w-6xl mx-auto text-center">
		<!-- <SectionTitle title="ABOUT" /> -->
		<div class="flex flex-col items-center gap-6">
			<!-- Image centered -->
			<div class="relative max-w-2xl duration-300 hover:scale-105">
				<div class="absolute inset-0 bg-yellow-400/30 blur-xl rounded-lg"></div>
				<div
					class="relative z-10 w-full aspect-[5/3] overflow-hidden rounded-lg shadow-lg cursor-pointer"
					role="button"
					tabindex="0"
					on:mousemove={handleMouseMove}
					on:mouseleave={handleMouseLeave}
				>
					<img
						src={currentImage}
						alt="IDEA Hacks hackathon workspace"
						class="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
					/>

					<!-- Left click area -->
					<div
						class="absolute left-0 top-0 w-1/3 h-full cursor-pointer transition-opacity duration-300"
						class:opacity-100={hoverSide === 'left'}
						class:opacity-0={hoverSide !== 'left'}
						style="background: linear-gradient(to right, rgba(255,255,255,0.2), transparent);"
						role="button"
						tabindex="0"
						on:click={prevImage}
						on:keydown={(e) => e.key === 'Enter' && prevImage()}
					></div>

					<!-- Right click area -->
					<div
						class="absolute right-0 top-0 w-1/3 h-full cursor-pointer transition-opacity duration-300"
						class:opacity-100={hoverSide === 'right'}
						class:opacity-0={hoverSide !== 'right'}
						style="background: linear-gradient(to left, rgba(255,255,255,0.2), transparent);"
						role="button"
						tabindex="0"
						on:click={nextImage}
						on:keydown={(e) => e.key === 'Enter' && nextImage()}
					></div>
				</div>
			</div>

			<!-- Text underneath image, same width -->
			<div class="max-w-2xl">
				<p
					class="text-white text-sm sm:text-base md:text-lg leading-relaxed pt-5"
					style="font-family: 'Sansation', sans-serif;"
				>
					<b
						>IDEA Hacks is the largest hackathon on the West Coast, hosted annually at UCLA by the
						IEEE student branch.
					</b>
					Each year, it brings together over 500 of the brightest engineering, design, and business minds
					to collaborate, innovate, and build hardware-based solutions in just 36 hours.
				</p>
			</div>
		</div>
	</div>
</div>
<!-- Tracks Component -->
<!-- <Tracks /> -->

<!-- Schedule Component -->
<!-- <Schedule /> -->

<!-- About Section -->
<!-- <div class="flex h-screen flex-col items-center justify-center px-4 max-w-4xl mx-auto"> -->
<!-- About -->

<!-- Previous Events -->
<div class="py-20 px-4">
	<div class="max-w-6xl mx-auto text-center">
		<SectionTitle title="PREVIOUS" />
		<div class="flex flex-wrap justify-center gap-6 text-center text-white text-base font-medium">
			<a
				href="https://idea-hacks-2025.devpost.com"
				target="_blank"
				class="group transition-transform duration-200 hover:scale-105"
			>
				<img
					src={ideahacks2025}
					alt="2025"
					class="h-24 w-24 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-4">2025</p>
			</a>
			<a
				href="https://idea-hacks-2024.devpost.com"
				target="_blank"
				class="group transition-transform duration-200 hover:scale-105"
			>
				<img
					src={ideahacks2024}
					alt="2024"
					class="h-24 w-24 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-4">2024</p>
			</a>
			<a
				href="https://idea-hacks-2023.devpost.com"
				target="_blank"
				class="group transition-transform duration-200 hover:scale-105"
			>
				<img
					src={ideahacks2023}
					alt="2023"
					class="h-24 w-24 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-4">2023</p>
			</a>
			<a
				href="https://ideahacks2022.devpost.com"
				target="_blank"
				class="group transition-transform duration-200 hover:scale-105"
			>
				<img
					src={ideahacks2022}
					alt="2022"
					class="h-24 w-24 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-4">2022</p>
			</a>
			<a
				href="https://ideahacks2021.devpost.com"
				target="_blank"
				class="group transition-transform duration-200 hover:scale-105"
			>
				<img
					src={ideahacks2021}
					alt="2021"
					class="h-24 w-24 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-4">2021</p>
			</a>
			<a
				href="https://ideahacks2020.devpost.com"
				target="_blank"
				class="group transition-transform duration-200 hover:scale-105"
			>
				<img
					src={ideahacks2020}
					alt="2020"
					class="h-24 w-24 rounded-full opacity-80 group-hover:opacity-100 transition"
				/>
				<p class="mt-4">2020</p>
			</a>
		</div>
	</div>
</div>

<!-- Sponsors Section -->
<div class="py-20 px-4">
	<div class="max-w-6xl mx-auto text-center">
		<!-- SPONSORS title -->
		<SectionTitle title="SPONSORS" />

		<!-- Sponsors logos -->
		<div class="flex flex-col md:flex-row gap-8 justify-center items-center">
			<!-- Infineon -->
			<div class="flex items-center justify-center">
				<a
					href="https://www.infineon.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-transform duration-200 hover:scale-105"
				>
					<img
						src={infineonLogo}
						alt="Infineon"
						class="h-16 md:h-20 w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
					/>
				</a>
			</div>
			<!-- Texas Instruments -->
			<div class="flex items-center justify-center">
				<a
					href="https://www.ti.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-transform duration-200 hover:scale-105"
				>
					<img
						src={tiLogo}
						alt="Texas Instruments"
						class="h-16 md:h-20 w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
					/>
				</a>
			</div>
			<!-- DigiKey -->
			<div class="flex items-center justify-center">
				<a
					href="https://www.digikey.com/"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-transform duration-200 hover:scale-105"
				>
					<img
						src={digikeyLogo}
						alt="DigiKey"
						class="h-16 md:h-20 w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
					/>
				</a>
			</div>
		</div>
	</div>
</div>

<!-- FAQ Component -->
<FAQ />

<!-- Footer Component -->
<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		/* overflow-x: hidden; */
		/* background-color: #111827; */
	}

	:global(html) {
		margin: 0;
		padding: 0;
		/* overflow-x: hidden; */
	}
</style>

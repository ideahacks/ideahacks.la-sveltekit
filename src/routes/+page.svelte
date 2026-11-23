<script lang="ts">
	import Fonts2027 from '$lib/components/Fonts2027.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import ideahacks2020 from '$lib/images/ideahacks_logos/ideahacks2020_icon.png';
	import ideahacks2021 from '$lib/images/ideahacks_logos/ideahacks2021_icon.png';
	import ideahacks2022 from '$lib/images/ideahacks_logos/ideahacks2022_icon.png';
	import ideahacks2023 from '$lib/images/ideahacks_logos/ideahacks2023_icon.png';
	import ideahacks2024 from '$lib/images/ideahacks_logos/ideahacks2024_icon.png';
	import ideahacks2025 from '$lib/images/ideahacks_logos/ideahacks2025_icon.png';
	import ideahacks2026 from '$lib/images/ideahacks_logos/ideahacks2026_icon.png';

	import previous1 from '$lib/images/previous/Previous 1.png';
	import previous2 from '$lib/images/previous/Previous 2.png';
	import previous3 from '$lib/images/previous/Previous 3.png';
	import previous4 from '$lib/images/previous/Previous 4.png';
	import previous5 from '$lib/images/previous/Previous 5.png';

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

<Fonts2027 />

<NavBar homepage2027 comingSoon />

<!-- Hero Section -->
<Hero comingSoon />

<div class="bg-gradient-to-b from-[#2EB723] via-[#73CB53] to-[#BBD98D] px-4 py-16 sm:py-24">
	<div class="max-w-6xl mx-auto text-center">
		<div class="flex flex-col items-center gap-6">
			<!-- Image centered -->
			<div class="relative w-full max-w-2xl duration-300 hover:scale-105">
				<div
					class="relative aspect-[5/3] w-full cursor-pointer overflow-hidden rounded-3xl border-4 border-[#FFF385] shadow-[0_8px_0_#0068BD] sm:border-8"
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
						class="absolute left-0 top-0 h-full w-1/3 cursor-pointer bg-gradient-to-r from-white/20 to-transparent transition-opacity duration-300"
						class:opacity-100={hoverSide === 'left'}
						class:opacity-0={hoverSide !== 'left'}
						role="button"
						tabindex="0"
						on:click={prevImage}
						on:keydown={(e) => e.key === 'Enter' && prevImage()}
					></div>

					<!-- Right click area -->
					<div
						class="absolute right-0 top-0 h-full w-1/3 cursor-pointer bg-gradient-to-l from-white/20 to-transparent transition-opacity duration-300"
						class:opacity-100={hoverSide === 'right'}
						class:opacity-0={hoverSide !== 'right'}
						role="button"
						tabindex="0"
						on:click={nextImage}
						on:keydown={(e) => e.key === 'Enter' && nextImage()}
					></div>
				</div>
			</div>

			<!-- Text underneath image, same width -->
			<div class="mt-3 max-w-2xl rounded-2xl bg-[#FFFFFF] px-6 py-5 sm:px-10 sm:py-7">
				<p class="font-inter text-sm leading-relaxed text-[#0068BD] sm:text-base md:text-lg">
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

<!-- Previous Events -->
<div class="bg-[#BBD98D] px-4 pb-20 pt-8 sm:pb-24">
	<div class="max-w-6xl mx-auto text-center">
		<h2 class="mb-8 font-jetbrains text-2xl font-bold tracking-wide text-[#0068BD] sm:text-3xl">
			PREVIOUS
		</h2>
		<div class="flex flex-wrap justify-center gap-x-5 gap-y-7 text-center sm:gap-x-7">
			<a
				href="https://idea-hacks-2026.devpost.com"
				target="_blank"
				class="group flex flex-col items-center rounded-2xl bg-[#FFFFFF] p-3 shadow-[0_4px_0_#73CB53] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068BD]"
			>
				<div
					class="h-20 w-20 overflow-hidden rounded-full opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-24 sm:w-24"
				>
					<img
						src={ideahacks2026}
						alt="2026"
						class="h-full w-full -translate-y-[3%] scale-[1.07]"
					/>
				</div>
				<p class="mt-2 font-jaro text-xl text-[#0068BD]">2026</p>
			</a>
			<a
				href="https://idea-hacks-2025.devpost.com"
				target="_blank"
				class="group flex flex-col items-center rounded-2xl bg-[#FFFFFF] p-3 shadow-[0_4px_0_#73CB53] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068BD]"
			>
				<img
					src={ideahacks2025}
					alt="2025"
					class="h-20 w-20 rounded-full opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-24 sm:w-24"
				/>
				<p class="mt-2 font-jaro text-xl text-[#0068BD]">2025</p>
			</a>
			<a
				href="https://idea-hacks-2024.devpost.com"
				target="_blank"
				class="group flex flex-col items-center rounded-2xl bg-[#FFFFFF] p-3 shadow-[0_4px_0_#73CB53] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068BD]"
			>
				<img
					src={ideahacks2024}
					alt="2024"
					class="h-20 w-20 rounded-full opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-24 sm:w-24"
				/>
				<p class="mt-2 font-jaro text-xl text-[#0068BD]">2024</p>
			</a>
			<a
				href="https://idea-hacks-2023.devpost.com"
				target="_blank"
				class="group flex flex-col items-center rounded-2xl bg-[#FFFFFF] p-3 shadow-[0_4px_0_#73CB53] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068BD]"
			>
				<img
					src={ideahacks2023}
					alt="2023"
					class="h-20 w-20 rounded-full opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-24 sm:w-24"
				/>
				<p class="mt-2 font-jaro text-xl text-[#0068BD]">2023</p>
			</a>
			<a
				href="https://ideahacks2022.devpost.com"
				target="_blank"
				class="group flex flex-col items-center rounded-2xl bg-[#FFFFFF] p-3 shadow-[0_4px_0_#73CB53] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068BD]"
			>
				<img
					src={ideahacks2022}
					alt="2022"
					class="h-20 w-20 rounded-full opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-24 sm:w-24"
				/>
				<p class="mt-2 font-jaro text-xl text-[#0068BD]">2022</p>
			</a>
			<a
				href="https://ideahacks2021.devpost.com"
				target="_blank"
				class="group flex flex-col items-center rounded-2xl bg-[#FFFFFF] p-3 shadow-[0_4px_0_#73CB53] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068BD]"
			>
				<img
					src={ideahacks2021}
					alt="2021"
					class="h-20 w-20 rounded-full opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-24 sm:w-24"
				/>
				<p class="mt-2 font-jaro text-xl text-[#0068BD]">2021</p>
			</a>
			<a
				href="https://ideahacks2020.devpost.com"
				target="_blank"
				class="group flex flex-col items-center rounded-2xl bg-[#FFFFFF] p-3 shadow-[0_4px_0_#73CB53] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0068BD]"
			>
				<img
					src={ideahacks2020}
					alt="2020"
					class="h-20 w-20 rounded-full opacity-80 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:h-24 sm:w-24"
				/>
				<p class="mt-2 font-jaro text-xl text-[#0068BD]">2020</p>
			</a>
		</div>
	</div>
</div>

<section class="bg-[#BBD98D] px-4 pb-14 sm:pb-20" aria-labelledby="sponsorship-title">
	<div class="mx-auto max-w-xl border-t border-[#0068BD]/30 pt-6 text-center text-[#0068BD]">
		<h2 id="sponsorship-title" class="font-jaro text-2xl">
			Interested in sponsoring IDEA Hacks?
		</h2>
		<p class="mt-2 break-words font-inter text-sm sm:text-base">
			Email us at
			<a
				class="font-semibold underline underline-offset-4 hover:decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068BD]"
				href="mailto:corporate@ieeebruins.com"
			>corporate@ieeebruins.com</a>
		</p>
	</div>
</section>

<!-- Footer Component -->
<Footer />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(html) {
		margin: 0;
		padding: 0;
	}
</style>

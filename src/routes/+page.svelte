<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';
	import Track from '$lib/components/Track.svelte';
	import Prize from '$lib/components/Prize.svelte';

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
	import renovateTrack from '$lib/images/tracks/Renovate.png';
	import fashionTrack from '$lib/images/tracks/Fashion.png';
	import educateTrack from '$lib/images/tracks/Educate.png';
	import printerPrize from '$lib/images/prizes/3d_printer.png';
	import monitorPrize from '$lib/images/prizes/sceptre_monitor.png';
	import legoPrize from '$lib/images/prizes/lego_gameboy.png';
	import sewingPrize from '$lib/images/prizes/sewing_machine.png';
	import solderPrize from '$lib/images/prizes/soldering_kit.png';
	import testerPrize from '$lib/images/prizes/component_tester.png';

	// Import sponsor images
	import digikeyLogo from '$lib/images/sponsors/digikey.svg';
	import teledyneLogo from '$lib/images/sponsors/teledyneflir.png';
	import silvusLogo from '$lib/images/sponsors/silvus.png';

	import tiLogo from '$lib/images/sponsors/ti.svg';
	import pcbwayLogo from '$lib/images/sponsors/pcbway.png';
	import expressifLogo from '$lib/images/sponsors/espressif.svg';

	let sponsors = [
		{ href: 'https://www.digikey.com/', src: digikeyLogo, alt: 'DigiKey', height: 80 },
		{ href: 'https://www.flir.com/', src: teledyneLogo, alt: 'Teledyne FLIR', height: 80 },
		{ href: 'https://www.ti.com/', src: tiLogo, alt: 'Texas Instruments', height: 65 },
		{ href: 'https://www.pcbway.com/', src: pcbwayLogo, alt: 'PCBWay', height: 65 },
		{
			href: 'https://silvustechnologies.com/',
			src: silvusLogo,
			alt: 'Silvus Technologies',
			height: 65
		},
		{ href: 'https://www.espressif.com/', src: expressifLogo, alt: 'Espressif', height: 40 }
	];

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

	const prizes = [
		{
			mainImage: printerPrize,
			prizeName: '3D Printer',
			prizeCategory: 'Grand Prize',
			positionClass: 'top-0 left-1/2 -translate-x-1/2',
			floatClass: 'swarm-a',
			floatDelay: '.25s',
			sizeClass: 'w-64 p-4',
			imageClass: 'h-32 w-32'
		},
		{
			mainImage: monitorPrize,
			prizeName: 'Sceptre Monitor',
			prizeCategory: '2nd Place Overall',
			positionClass: 'top-12 left-[21%]',
			floatClass: 'swarm-b',
			floatDelay: '0',
			sizeClass: 'w-48 p-4',
			imageClass: 'h-28 w-28'
		},
		{
			mainImage: legoPrize,
			prizeName: 'LEGO Gameboy',
			prizeCategory: '3rd Place Overall',
			positionClass: 'top-14 right-[22.5%]',
			floatClass: 'swarm-c',
			floatDelay: '0.5s',
			sizeClass: '',
			imageClass: ''
		},
		{
			mainImage: sewingPrize,
			prizeName: 'Sewing Machine',
			prizeCategory: 'Fashion the Future',
			positionClass: 'top-[55%] left-[26%]',
			floatClass: 'swarm-d',
			floatDelay: '0.75s',
			sizeClass: '',
			imageClass: ''
		},
		{
			mainImage: solderPrize,
			prizeName: 'Soldering Kit',
			prizeCategory: 'Renovate the Future',
			positionClass: 'top-[53%] left-1/2 -translate-x-1/2',
			floatClass: 'swarm-e',
			floatDelay: '1s',
			sizeClass: '',
			imageClass: ''
		},
		{
			mainImage: testerPrize,
			prizeName: 'Component Tester',
			prizeCategory: 'Educate the Future',
			positionClass: 'top-[55%] right-[26%]',
			floatClass: 'swarm-f',
			floatDelay: '1.25s',
			sizeClass: '',
			imageClass: ''
		}
	];
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

<!-- Tracks Section -->
<div class="py-12 px-4">
	<div class="max-w-5xl mx-auto text-center">
		<SectionTitle title="TRACKS" />
		<div
			class="grid grid-cols-1 md:grid-cols-[repeat(3,minmax(0,17rem))] justify-center gap-6 items-stretch"
		>
			<Track
				mainImage={renovateTrack}
				bounceDelay="0s"
				trackTitle="Renovate the Future"
				trackDescription="Build innovative solutions for sustainable infrastructure, smart cities, and environmental restoration."
			/>
			<Track
				mainImage={fashionTrack}
				bounceDelay="-0.25s"
				trackTitle="Fashion the Future"
				trackDescription="Create cutting-edge wearable technology, smart textiles, and sustainable fashion innovations."
			/>
			<Track
				mainImage={educateTrack}
				bounceDelay="-0.5s"
				trackTitle="Educate the Future"
				trackDescription="Develop educational technology, learning platforms, and tools that transform how we teach and learn."
			/>
		</div>
	</div>
</div>

<!-- Prizes Section -->
<div class="pt-16 px-4">
	<div class="max-w-6xl mx-auto text-center">
		<SectionTitle title="PRIZES" />

		<div class="relative mt-6 hidden h-[36rem] md:block">
			{#each prizes as prize}
				<div class={`absolute ${prize.positionClass}`}>
					<Prize
						mainImage={prize.mainImage}
						prizeName={prize.prizeName}
						prizeCategory={prize.prizeCategory}
						floatClass={prize.floatClass}
						floatDelay={prize.floatDelay}
						sizeClass={prize.sizeClass}
						imageClass={prize.imageClass}
					/>
				</div>
			{/each}
		</div>

		<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden justify-items-center">
			{#each prizes as prize}
				<Prize
					mainImage={prize.mainImage}
					prizeName={prize.prizeName}
					prizeCategory={prize.prizeCategory}
					floatClass="swarm-mobile"
					floatDelay={prize.floatDelay}
					sizeClass={prize.sizeClass}
					imageClass={prize.imageClass}
				/>
			{/each}
		</div>
	</div>
</div>

<!-- Schedule Component -->
<Schedule />
<!-- About Section -->
<!-- <div class="flex h-screen flex-col items-center justify-center px-4 max-w-4xl mx-auto"> -->
<!-- About -->

<!-- Previous Events -->
<div class="py-16 px-4">
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

<div class="py-20 px-4">
	<div class="max-w-3xl mx-auto text-center">
		<SectionTitle title="SPONSORS" />

		<div class="flex flex-col md:flex-row md:flex-wrap gap-8 justify-center items-center">
			{#each sponsors as sponsor}
				<div class="flex items-center justify-center">
					<a
						href={sponsor.href}
						target="_blank"
						rel="noopener noreferrer"
						class="transition-transform duration-200 hover:scale-105"
					>
						<img
							src={sponsor.src}
							alt={sponsor.alt}
							style="height: {sponsor.height}px;"
							class="w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
						/>
					</a>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- FAQ Component -->
<FAQ />

<!-- Sponsors Section -->
<div class="pt-5 pb-10 px-4">
	<div class="max-w-6xl mx-auto text-center">
		<!-- Footer Text -->
		<p class="text-gray-300 text-md md:text-base text-center">
			Interested in sponsoring IDEA Hacks? <br /> Email us at
			<a class="underline text-gray-400" href="mailto:corporate@ieeebruins.com"
				>corporate@ieeebruins.com</a
			>
		</p>
	</div>
</div>

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

	:global(.swarm-a),
	:global(.swarm-b),
	:global(.swarm-c),
	:global(.swarm-d),
	:global(.swarm-e),
	:global(.swarm-f),
	:global(.swarm-mobile) {
		animation: prize-bounce 3s ease-in-out infinite;
	}

	@keyframes prize-bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-12px);
		}
	}
</style>

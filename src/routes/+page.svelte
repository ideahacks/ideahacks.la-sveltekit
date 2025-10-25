<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	import Tracks from '$lib/components/Tracks.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// Import sponsor images
	import infineonLogo from '$lib/images/sponsors/infineon.svg';
	import tiLogo from '$lib/images/sponsors/ti.svg';
	import digikeyLogo from '$lib/images/sponsors/digikey.svg';
</script>

<NavBar />

<!-- Hero Section -->
<Hero />

<!-- Main Content Section -->
<div class="w-full relative">
	<!-- Image and blurb section -->
	<div class="py-20 px-4">
		<div class="max-w-6xl mx-auto">
			<div class="flex flex-col md:flex-row gap-6">
				<!-- Image on the left -->
				<div class="flex-shrink-0 w-full md:w-1/2 relative">
					<div class="absolute inset-0 bg-yellow-400/30 blur-xl rounded-lg"></div>
					<img
						src="/home-1.png"
						alt="IDEA Hacks hackathon workspace"
						class="w-full h-auto rounded-lg shadow-lg relative z-10"
					/>
				</div>

				<!-- Text blurb on the right -->
				<div class="flex-1 flex items-center">
					<p
						class="text-white text-sm sm:text-base md:text-lg leading-relaxed"
						style="font-family: 'Sansation', sans-serif;"
					>
						<b
							>IDEA Hacks is the largest hackathon on the West Coast, hosted annually at UCLA by the
							IEEE student branch.
						</b>
						Each year, it brings together over 500 of the brightest engineering, design, and business
						minds to collaborate, innovate, and build hardware-based solutions in just 36 hours.
						<br /><br />
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Tracks Component -->
	<Tracks />

	<!-- FAQ Component -->
	<FAQ />

	<!-- Schedule Component -->
	<Schedule />

	<!-- Sponsors Section -->
	<div class="py-20 px-4">
		<div class="max-w-6xl mx-auto text-center">
			<!-- SPONSORS title -->
			<h2
				class="text-white text-5xl sm:text-6xl md:text-7xl font-bold mb-12"
				style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;"
			>
				SPONSORS
			</h2>

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

	<!-- Footer Component -->
	<Footer />
</div>

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

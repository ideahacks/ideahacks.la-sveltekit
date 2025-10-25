<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import FAQ from '$lib/components/FAQ.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	import Tracks from '$lib/components/Tracks.svelte';

	// Import sponsor images
	import infineonLogo from '$lib/images/sponsors/infineon.svg';
	import tiLogo from '$lib/images/sponsors/ti.svg';
	import digikeyLogo from '$lib/images/sponsors/digikey.svg';

	let emailForm: HTMLFormElement;
	let showThankYou = false;

	async function handleEmailSubmit(event: Event) {
		event.preventDefault();

		const emailInput = emailForm.querySelector('input[name="email"]') as HTMLInputElement;
		const email = emailInput.value;

		// Submit to Google Apps Script in background
		try {
			const response = await fetch(
				'https://script.google.com/macros/s/AKfycbx9IQG9oGgHJ5r5y0ZiKJlaQ7Gc74mYnOdL4RfGQB4gxeABLyfybtXg7kUHRmzZvIgp/exec',
				{
					method: 'POST',
					mode: 'no-cors', // This bypasses CORS restrictions
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						email: email
					})
				}
			);
			console.log('Form submitted successfully');
		} catch (error) {
			console.error('Error submitting form:', error);
		}

		// Always show thank you message and clear form (assume success)
		showThankYou = true;
		emailForm.reset();

		// Hide thank you message after 3 seconds
		setTimeout(() => {
			showThankYou = false;
		}, 750);
	}
</script>

<NavBar />

<div class="w-full min-h-screen flex items-center justify-center bg-gray-900 relative">
	<div class="relative w-full">
		<img src="/home-background.svg" alt="Retro synthwave background" class="w-full h-auto" />

		<!-- Image and blurb section positioned at 1/4 from top of SVG -->
		<div class="absolute top-[25%] left-1/2 transform -translate-x-1/2 w-1/2 z-20">
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

		<!-- Tracks Component -->
		<Tracks />

		<!-- FAQ Component -->
		<FAQ />

		<!-- Schedule Component -->
		<Schedule />

		<!-- SPONSORS title at 87.5% -->
		<div class="absolute top-[87.5%] left-1/2 transform -translate-x-1/2 z-20">
			<h2
				class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center"
				style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;"
			>
				SPONSORS
			</h2>
		</div>

		<!-- Sponsors logos positioned below SPONSORS title -->
		<div class="absolute top-[90%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
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

		<!-- Footer section at 95% -->
		<div class="absolute top-[95%] left-1/2 transform -translate-x-1/2 z-20">
			<div class="flex flex-col items-center space-y-4">
				<!-- Social Media Icons -->
				<div class="flex space-x-8">
					<!-- Instagram -->
					<a
						href="https://www.instagram.com/uclaieee"
						target="_blank"
						rel="noopener noreferrer"
						class="text-white hover:text-purple-400 transition-colors duration-200"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
							/>
						</svg>
					</a>
					<!-- Twitter/X -->
					<a
						href="https://x.com/uclaieee"
						target="_blank"
						rel="noopener noreferrer"
						class="text-white hover:text-purple-400 transition-colors duration-200"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
							/>
						</svg>
					</a>
					<!-- LinkedIn -->
					<a
						href="https://www.linkedin.com/company/ieee-student-branch-ucla/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-white hover:text-purple-400 transition-colors duration-200"
					>
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
							/>
						</svg>
					</a>
				</div>

				<!-- Footer Text -->
				<p
					class="text-gray-300 text-sm md:text-base text-center"
					style="font-family: 'Roboto Mono', monospace;"
				>
					Made with ❤️ and ✨ from IDEA Hacks
				</p>
			</div>
		</div>
	</div>

	<div
		class="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col w-3/4 z-10 min-h-screen"
	>
		<div class="min-h-[120px]"></div>
		<img src="/logo.svg" alt="Logo" class="w-full h-auto" />
		<div class="mt-6 text-center">
			<div
				class="font-sans text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg"
			>
				Jan 12-14, 2026
			</div>
			<div class="font-sans text-gray-300 text-lg sm:text-xl md:text-2xl drop-shadow-lg">
				Ackerman Grand Ballroom
			</div>
		</div>
		<div class="mt-8 flex justify-center">
			<div class="relative">
				<form
					bind:this={emailForm}
					on:submit={handleEmailSubmit}
					enctype="multipart/form-data"
					class="rounded-lg overflow-hidden inline-block w-96 md:w-[28rem]"
					style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
				>
					<div class="flex">
						<input
							type="email"
							name="email"
							placeholder="Enter email to stay updated"
							class="flex-1 px-5 py-3 bg-white text-gray-800 placeholder-gray-500 text-sm md:text-base focus:outline-none border-0"
							style="font-family: 'Roboto Mono', monospace;"
							required
						/>
						<button
							type="submit"
							class="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors duration-200 text-sm md:text-base border-0"
							style="font-family: 'Roboto Mono', monospace;"
						>
							Submit
						</button>
					</div>
				</form>

				<!-- Thank you message -->
				{#if showThankYou}
					<div
						class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium transition-all duration-300"
						style="font-family: 'Roboto Mono', monospace;"
					>
						Thank you!
					</div>
				{/if}
			</div>
		</div>
		<div class="flex-1"></div>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: auto;
		background-color: #111827;
	}

	:global(html) {
		margin: 0;
		padding: 0;
		overflow: auto;
	}
</style>

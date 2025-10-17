<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	
	let dropdownStates = Array(11).fill(false);
	let emailForm: HTMLFormElement;
	let showThankYou = false;
	
	function toggleDropdown(index: number) {
		dropdownStates[index] = !dropdownStates[index];
	}
	
	async function handleEmailSubmit(event: Event) {
		event.preventDefault();
		
		const emailInput = emailForm.querySelector('input[name="email"]') as HTMLInputElement;
		const email = emailInput.value;
		
		// Submit to Google Apps Script in background
		try {
			const response = await fetch('https://script.google.com/macros/s/AKfycbx9IQG9oGgHJ5r5y0ZiKJlaQ7Gc74mYnOdL4RfGQB4gxeABLyfybtXg7kUHRmzZvIgp/exec', {
				method: 'POST',
				mode: 'no-cors', // This bypasses CORS restrictions
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: email
				})
			});
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
		<img
			src="/home-background.svg"
			alt="Retro synthwave background"
			class="w-full h-auto"
		/>
		
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
					<p class="text-white text-sm sm:text-base md:text-lg leading-relaxed" style="font-family: 'Sansation', sans-serif;">
						<b>IDEA Hacks is the largest hackathon on the West Coast, hosted annually at UCLA by the IEEE student branch. </b> Each year, it brings together over 500 of the brightest engineering, design, and business minds to collaborate, innovate, and build hardware-based solutions in just 36 hours.
						<br><br>
					</p>
				</div>
			</div>
		</div>

		<!-- TRACKS title -->
		<div class="absolute top-[32.5%] left-1/2 transform -translate-x-1/2 z-20">
			<h2 class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center" style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;">
				TRACKS
			</h2>
		</div>

		<!-- Three columns for tracks positioned at 42.5% from top -->
		<div class="absolute top-[35%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
			<div class="flex flex-col md:flex-row gap-8 justify-center items-center">
				<!-- Column 1: Track 1 -->
				<div class="flex flex-col items-center text-center">
					<img
						src="/track1.svg"
						alt="Track 1"
						class="w-48 h-72 md:w-56 md:h-84 mb-3"
					/>
					<h3 class="text-white text-2xl md:text-3xl font-medium text-center max-w-48 md:max-w-56" style="font-family: 'Roboto Mono', monospace;">
						<span class="text-3xl md:text-4xl font-bold">Renovate</span><br>the Future
					</h3>
					<div class="mt-9 p-4 rounded-lg text-center inline-block max-w-48 md:max-w-56 h-50 flex items-center justify-center" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%); height: 288px;">
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Build innovative solutions for sustainable infrastructure, smart cities, and environmental restoration.
						</p>
					</div>
				</div>

				<!-- Column 2: Track 2 -->
				<div class="flex flex-col items-center text-center">
					<img
						src="/track2.svg"
						alt="Track 2"
						class="w-72 h-72 md:w-84 md:h-84 mb-3"
					/>
					<h3 class="text-white text-2xl md:text-3xl font-medium text-center max-w-48 md:max-w-56" style="font-family: 'Roboto Mono', monospace;">
						<span class="text-3xl md:text-4xl font-bold">Fashion</span><br>the Future
					</h3>
					<div class="mt-9 p-4 rounded-lg text-center inline-block max-w-48 md:max-w-56 h-50 flex items-center justify-center" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%); height: 288px;">
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Create cutting-edge wearable technology, smart textiles, and sustainable fashion innovations.
						</p>
					</div>
				</div>

				<!-- Column 3: Track 3 -->
				<div class="flex flex-col items-center text-center">
					<img
						src="/track3.svg"
						alt="Track 3"
						class="w-48 h-72 md:w-56 md:h-84 mb-3"
					/>
					<h3 class="text-white text-2xl md:text-3xl font-medium text-center max-w-48 md:max-w-56" style="font-family: 'Roboto Mono', monospace;">
						<span class="text-3xl md:text-4xl font-bold">Educate</span><br>the Future
					</h3>
					<div class="mt-9 p-4 rounded-lg text-center inline-block max-w-48 md:max-w-56 h-50 flex items-center justify-center" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%); height: 288px;">
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Develop educational technology, learning platforms, and tools that transform how we teach and learn.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- FAQs title at 50% -->
		<div class="absolute top-[50%] left-1/2 transform -translate-x-1/2 z-20">
			<h2 class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center" style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;">
				FAQs
			</h2>
		</div>

		<!-- FAQs section positioned at 52.5% from top -->
		<div class="absolute top-[52.5%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
			<div class="flex justify-center items-center">
				<div class="block w-3/5 space-y-3">

					<!-- FAQ 2 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(1)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							What time does the hackathon start?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[1] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[1] ? '50px' : '0px'}; opacity: {dropdownStates[1] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								The hackathon starts at 6:00 PM on Friday.
							</p>
						</div>
					</div>

					<!-- FAQ 3 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(2)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Do I need to bring my own laptop?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[2] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[2] ? '50px' : '0px'}; opacity: {dropdownStates[2] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								Yes, please bring your own laptop and charger.
							</p>
						</div>
					</div>

					<!-- FAQ 4 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(3)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Is food provided?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[3] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[3] ? '50px' : '0px'}; opacity: {dropdownStates[3] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								Yes! All meals and snacks are provided throughout the weekend.
							</p>
						</div>
					</div>

					<!-- FAQ 5 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(4)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Can I work on my existing project?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[4] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[4] ? '50px' : '0px'}; opacity: {dropdownStates[4] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								No, all projects must be started during the hackathon.
							</p>
						</div>
					</div>

					<!-- FAQ 6 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(5)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							How many people can be on a team?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[5] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[5] ? '50px' : '0px'}; opacity: {dropdownStates[5] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								Teams can have 1-4 members.
							</p>
						</div>
					</div>

					<!-- FAQ 7 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(6)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							What if I don't have a team?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[6] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[6] ? '50px' : '0px'}; opacity: {dropdownStates[6] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								We'll have team formation activities on Friday night!
							</p>
						</div>
					</div>

					<!-- FAQ 8 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(7)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Is there parking available?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[7] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[7] ? '50px' : '0px'}; opacity: {dropdownStates[7] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								Yes, parking is available in UCLA parking structures.
							</p>
						</div>
					</div>

					<!-- FAQ 9 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(8)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							What should I bring?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[8] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[8] ? '50px' : '0px'}; opacity: {dropdownStates[8] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								Laptop, charger, water bottle, and your creativity!
							</p>
						</div>
					</div>

					<!-- FAQ 10 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(9)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Are there prizes?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[9] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[9] ? '50px' : '0px'}; opacity: {dropdownStates[9] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								Yes! Check out our prizes page for all the amazing rewards.
							</p>
						</div>
					</div>

					<!-- FAQ 11 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(10)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Can I sleep at the venue?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[10] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[10] ? '50px' : '0px'}; opacity: {dropdownStates[10] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								Yes, we have designated sleeping areas with air mattresses.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- SCHEDULE title at 70% -->
		<div class="absolute top-[70%] left-1/2 transform -translate-x-1/2 z-20">
			<h2 class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center" style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;">
				SCHEDULE
			</h2>
		</div>

		<!-- SPONSORS title at 87.5% -->
		<div class="absolute top-[87.5%] left-1/2 transform -translate-x-1/2 z-20">
			<h2 class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center" style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;">
				SPONSORS
			</h2>
		</div>

		<!-- Sponsors logos positioned below SPONSORS title -->
		<div class="absolute top-[90%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
			<div class="flex flex-col md:flex-row gap-8 justify-center items-center">
				<!-- Infineon -->
				<div class="flex items-center justify-center">
					<a href="https://www.infineon.com/" target="_blank" rel="noopener noreferrer" class="transition-transform duration-200 hover:scale-105">
						<img
							src="/infineon.svg"
							alt="Infineon"
							class="h-16 md:h-20 w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
						/>
					</a>
				</div>
				<!-- Texas Instruments -->
				<div class="flex items-center justify-center">
					<a href="https://www.ti.com/" target="_blank" rel="noopener noreferrer" class="transition-transform duration-200 hover:scale-105">
						<img
							src="/ti.svg"
							alt="Texas Instruments"
							class="h-16 md:h-20 w-auto filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-200"
						/>
					</a>
				</div>
				<!-- DigiKey -->
				<div class="flex items-center justify-center">
					<a href="https://www.digikey.com/" target="_blank" rel="noopener noreferrer" class="transition-transform duration-200 hover:scale-105">
						<img
							src="/digikey.svg"
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
					<a href="https://www.instagram.com/uclaieee" target="_blank" rel="noopener noreferrer" class="text-white hover:text-purple-400 transition-colors duration-200">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
						</svg>
					</a>
					<!-- Twitter/X -->
					<a href="https://x.com/uclaieee" target="_blank" rel="noopener noreferrer" class="text-white hover:text-purple-400 transition-colors duration-200">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
					</a>
					<!-- LinkedIn -->
					<a href="https://www.linkedin.com/company/ieee-student-branch-ucla/" target="_blank" rel="noopener noreferrer" class="text-white hover:text-purple-400 transition-colors duration-200">
						<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
				</div>
				
				<!-- Footer Text -->
				<p class="text-gray-300 text-sm md:text-base text-center" style="font-family: 'Roboto Mono', monospace;">
					Made with ❤️ and ✨ from IDEA Hacks
				</p>
			</div>
		</div>

		<!-- Schedule content positioned at 72.5% from top -->
		<div class="absolute top-[72.5%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
			<div class="flex justify-center items-start">
				<div class="block w-3/5">
					<div class="relative">
						<!-- Vertical timeline centered within the left slot -->
						<div class="absolute top-0 bottom-0 left-6 w-0">
							<div class="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-white opacity-60 rounded-full"></div>
							<div class="absolute left-1/2 top-0 w-8 h-8 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
						</div>

						<!-- Rows: each row controls its own pill vertical centering -->
						<div class="space-y-1">
							<!-- Friday Title Row -->
							<div class="relative flex items-center min-h-[48px]">
								<!-- Pill centered on line -->
								<img src="/redpill.svg" alt="Friday" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<!-- Text -->
								<div class="w-full text-center">
									<p class="m-0 text-white text-lg md:text-xl font-bold" style="font-family: 'Roboto Mono', monospace;">FRIDAY</p>
								</div>
							</div>

							<!-- Friday Item 1 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/orangepill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">4:30-8:00 PM • Check in • Ackerman Union 2408</p>
								</div>
							</div>

							<!-- Friday Item 2 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/yellowpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">5:00-5:45 PM • Web Dev Workshop • Ackerman Union 2408</p>
								</div>
							</div>

							<!-- Friday Item 3 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/greenpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">6:00-6:45 PM • IDEA Hacks Kickoff • Ackerman Grand Ballroom</p>
								</div>
							</div>

							<!-- Saturday Title Row -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/redpill.svg" alt="Saturday" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-center">
									<p class="m-0 text-white text-lg md:text-xl font-bold" style="font-family: 'Roboto Mono', monospace;">SATURDAY</p>
								</div>
							</div>

							<!-- Saturday Item 1 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/orangepill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">8:00-9:00 AM • Breakfast • Ackerman Grand Ballroom</p>
								</div>
							</div>

							<!-- Saturday Item 2 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/yellowpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">10:00-11:00 AM • Hardware Workshop • Ackerman Union 2408</p>
								</div>
							</div>

							<!-- Saturday Item 3 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/greenpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">12:00-1:00 PM • Lunch • Ackerman Grand Ballroom</p>
								</div>
							</div>

							<!-- Saturday Item 4 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/orangepill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">2:00-3:00 PM • AI/ML Workshop • Ackerman Union 2408</p>
								</div>
							</div>

							<!-- Saturday Item 5 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/yellowpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">6:00-6:45 PM • 3D Printing Workshop • Ackerman Union 2408</p>
								</div>
							</div>

							<!-- Sunday Title Row -->
							<div class="relative flex items-center min-h-[48px]">
								<!-- Pill centered on line -->
								<img src="/redpill.svg" alt="Sunday" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<!-- Text -->
								<div class="w-full text-center">
									<p class="m-0 text-white text-lg md:text-xl font-bold" style="font-family: 'Roboto Mono', monospace;">SUNDAY</p>
								</div>
							</div>

							<!-- Sunday Item 1 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/orangepill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">8:00-9:00 AM • Breakfast • Ackerman Grand Ballroom</p>
								</div>
							</div>

							<!-- Sunday Item 2 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/yellowpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">10:00-11:00 AM • Pitch Workshop • Ackerman Union 2408</p>
								</div>
							</div>

							<!-- Sunday Item 3 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/greenpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">12:00-1:00 PM • Lunch • Ackerman Grand Ballroom</p>
								</div>
							</div>

							<!-- Sunday Item 4 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/orangepill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">2:00-3:00 PM • Project Submissions Due • Devpost</p>
								</div>
							</div>

							<!-- Sunday Item 5 -->
							<div class="relative flex items-center min-h-[48px]">
								<img src="/yellowpill.svg" alt="Event" class="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28" />
								<div class="w-full text-left pl-36">
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">4:00-6:00 PM • Judging & Awards Ceremony • Ackerman Grand Ballroom</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col w-3/4 z-10 min-h-screen">
		<div class="min-h-[120px]"></div>
		<img
			src="/logo.svg"
			alt="Logo"
			class="w-full h-auto"
		/>
		<div class="mt-6 text-center">
			<div class="font-sans text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-lg">
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
					<div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium transition-all duration-300" style="font-family: 'Roboto Mono', monospace;">
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

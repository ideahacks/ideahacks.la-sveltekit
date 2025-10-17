<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	
	let dropdownStates = Array(11).fill(false);
	
	function toggleDropdown(index: number) {
		dropdownStates[index] = !dropdownStates[index];
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
					<!-- FAQ 1 -->
					<div class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer" style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);" on:click={() => toggleDropdown(0)}>
						<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
							Can we go to the bathroom?
						</p>
						<span class="text-white text-xl transition-transform duration-200" style="transform: rotate({dropdownStates[0] ? '90deg' : '0deg'});">
							&gt;
						</span>
					</div>
					<div class="overflow-hidden transition-all duration-300 ease-in-out" style="max-height: {dropdownStates[0] ? '50px' : '0px'}; opacity: {dropdownStates[0] ? '1' : '0'};">
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p class="text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">
								No. Please do not do that.
							</p>
						</div>
					</div>

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
									<p class="m-0 text-white text-sm md:text-base font-medium" style="font-family: 'Roboto Mono', monospace;">6:00-6:45 PM • 3D Printing Workshop • Ackerman Union 2408</p>
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
				Jan 12-14
			</div>
			<div class="font-sans text-gray-300 text-lg sm:text-xl md:text-2xl drop-shadow-lg">
				Ackerman Grand Ballroom
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

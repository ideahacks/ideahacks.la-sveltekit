<script lang="ts">
	import SectionTitle from './SectionTitle.svelte';

	let dropdownStates = Array(11).fill(false);

	function toggleDropdown(index: number) {
		dropdownStates[index] = !dropdownStates[index];
	}
</script>

<!-- FAQs section -->
<div class="py-20 px-4">
	<div class="max-w-6xl mx-auto text-center">
		<!-- FAQs title -->
		<SectionTitle title="FAQs" />

		<!-- FAQs content -->
		<div class="w-full">
			<div class="flex justify-center items-center">
				<div class="block w-3/5 space-y-3">
					<!-- FAQ 2 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(1)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							What time does the hackathon start?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[1] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[1] ? '50px' : '0px'}; opacity: {dropdownStates[1]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								The hackathon starts at 6:00 PM on Friday, 1/12.
							</p>
						</div>
					</div>

					<!-- FAQ 3 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(2)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							What should I bring?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[2] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[2] ? '100px' : '0px'}; opacity: {dropdownStates[2]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								Bring your laptop, charger, and any hardware you want to work with. We'll provide
								food and drinks!
							</p>
						</div>
					</div>

					<!-- FAQ 4 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(3)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							How long is the hackathon?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[3] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[3] ? '50px' : '0px'}; opacity: {dropdownStates[3]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								36 hours from Friday 6 PM to Sunday 6 PM.
							</p>
						</div>
					</div>

					<!-- FAQ 5 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(4)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							Is there a theme?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[4] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[4] ? '100px' : '0px'}; opacity: {dropdownStates[4]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								Yes! This year's theme will be announced soon.
							</p>
						</div>
					</div>

					<!-- FAQ 6 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(5)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							What are the prizes?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[5] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[5] ? '100px' : '0px'}; opacity: {dropdownStates[5]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								Grand prize, second place, third place, and special category prizes. Stay tuned for
								details!
							</p>
						</div>
					</div>

					<!-- FAQ 7 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(6)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							What if I don't have a team?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[6] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[6] ? '50px' : '0px'}; opacity: {dropdownStates[6]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								We'll have team formation activities right before the event!
							</p>
						</div>
					</div>

					<!-- FAQ 8 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(7)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							Is there parking available?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[7] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[7] ? '100px' : '0px'}; opacity: {dropdownStates[7]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								Yes, there's parking available in UCLA parking structures. More details will be
								provided closer to the event.
							</p>
						</div>
					</div>

					<!-- FAQ 9 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(8)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							Can I work on software projects?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[8] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[8] ? '100px' : '0px'}; opacity: {dropdownStates[8]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								While IDEA Hacks focuses on hardware, software components that support your hardware
								project are welcome!
							</p>
						</div>
					</div>

					<!-- FAQ 10 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(9)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							What hardware is provided?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[9] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[9] ? '100px' : '0px'}; opacity: {dropdownStates[9]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								We'll have Arduino kits, sensors, LEDs, and other basic components.
							</p>
						</div>
					</div>

					<!-- FAQ 11 -->
					<div
						class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
						style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
						on:click={() => toggleDropdown(10)}
					>
						<p
							class="text-white text-sm md:text-base font-medium"
							style="font-family: 'Roboto Mono', monospace;"
						>
							Is there a place to sleep?
						</p>
						<span
							class="text-white text-xl transition-transform duration-200"
							style="transform: rotate({dropdownStates[10] ? '90deg' : '0deg'});"
						>
							&gt;
						</span>
					</div>
					<div
						class="overflow-hidden transition-all duration-300 ease-in-out"
						style="max-height: {dropdownStates[10] ? '50px' : '0px'}; opacity: {dropdownStates[10]
							? '1'
							: '0'};"
					>
						<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								No, make sure you have sleeping arrangements sorted before you come.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

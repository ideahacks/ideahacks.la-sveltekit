<script lang="ts">
	let dropdownStates = Array(11).fill(false);

	function toggleDropdown(index: number) {
		dropdownStates[index] = !dropdownStates[index];
	}
</script>

<!-- FAQs title -->
<div class="absolute top-[50%] left-1/2 transform -translate-x-1/2 z-20">
	<h2
		class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center"
		style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;"
	>
		FAQs
	</h2>
</div>

<!-- FAQs section positioned at 52.5% from top -->
<div class="absolute top-[52.5%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
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
						The hackathon starts at 6:00 PM on Friday.
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
					Do I need to bring my own laptop?
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
				style="max-height: {dropdownStates[2] ? '50px' : '0px'}; opacity: {dropdownStates[2]
					? '1'
					: '0'};"
			>
				<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
					<p
						class="text-white text-sm md:text-base font-medium"
						style="font-family: 'Roboto Mono', monospace;"
					>
						Yes, please bring your own laptop and charger.
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
					Is food provided?
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
						Yes! All meals and snacks are provided throughout the weekend.
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
					Can I work on my existing project?
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
				style="max-height: {dropdownStates[4] ? '50px' : '0px'}; opacity: {dropdownStates[4]
					? '1'
					: '0'};"
			>
				<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
					<p
						class="text-white text-sm md:text-base font-medium"
						style="font-family: 'Roboto Mono', monospace;"
					>
						No, all projects must be started during the hackathon.
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
					How many people can be on a team?
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
				style="max-height: {dropdownStates[5] ? '50px' : '0px'}; opacity: {dropdownStates[5]
					? '1'
					: '0'};"
			>
				<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
					<p
						class="text-white text-sm md:text-base font-medium"
						style="font-family: 'Roboto Mono', monospace;"
					>
						Teams can have 1-4 members.
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
						We'll have team formation activities on Friday night!
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
				style="max-height: {dropdownStates[7] ? '50px' : '0px'}; opacity: {dropdownStates[7]
					? '1'
					: '0'};"
			>
				<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
					<p
						class="text-white text-sm md:text-base font-medium"
						style="font-family: 'Roboto Mono', monospace;"
					>
						Yes, parking is available in UCLA parking structures.
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
					What should I bring?
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
				style="max-height: {dropdownStates[8] ? '50px' : '0px'}; opacity: {dropdownStates[8]
					? '1'
					: '0'};"
			>
				<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
					<p
						class="text-white text-sm md:text-base font-medium"
						style="font-family: 'Roboto Mono', monospace;"
					>
						Laptop, charger, water bottle, and your creativity!
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
					Are there prizes?
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
				style="max-height: {dropdownStates[9] ? '50px' : '0px'}; opacity: {dropdownStates[9]
					? '1'
					: '0'};"
			>
				<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
					<p
						class="text-white text-sm md:text-base font-medium"
						style="font-family: 'Roboto Mono', monospace;"
					>
						Yes! Check out our prizes page for all the amazing rewards.
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
					Can I sleep at the venue?
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
						Yes, we have designated sleeping areas with air mattresses.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>


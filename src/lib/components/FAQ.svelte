<script lang="ts">
	import SectionTitle from './SectionTitle.svelte';

	type FAQItem = {
		question: string;
		answer: string;
		maxHeight: string;
	};

	const faqs: FAQItem[] = [
		{
			question: 'What should I bring?',
			answer:
				"Bring your laptop, charger, and any hardware you want to work with. We'll provide food and drinks!",
			maxHeight: '100px'
		},
		{
			question: 'How long is the hackathon?',
			answer: 'Friday 7 PM to Sunday 1 PM.',
			maxHeight: '50px'
		},
		{
			question: 'Is there a theme?',
			answer: "Yes! This year's theme is A Brighter Future.",
			maxHeight: '100px'
		},
		{
			question: "What if I don't have a team?",
			answer: "We'll have team formation activities right before the event!",
			maxHeight: '50px'
		},
		{
			question: 'Is there parking available?',
			answer: "Yes, there's parking available in UCLA parking structures.",
			maxHeight: '100px'
		},
		{
			question: 'Can I work on software projects?',
			answer:
				'While IDEA Hacks focuses on hardware, software components that support your hardware project are welcome!',
			maxHeight: '100px'
		},
		{
			question: 'What hardware is provided?',
			answer:
				"We'll have Arduino kits, sensors, LEDs, and other basic components. See the Parts page for more details.",
			maxHeight: '100px'
		},
		{
			question: 'Is there a place to sleep?',
			answer: 'No, make sure you have sleeping arrangements sorted before you come.',
			maxHeight: '50px'
		}
	];

	let dropdownStates = Array(faqs.length).fill(false);

	function toggleDropdown(index: number) {
		dropdownStates[index] = !dropdownStates[index];
	}

	function handleKeyDown(event: KeyboardEvent, index: number) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggleDropdown(index);
		}
	}
</script>

<!-- FAQs section -->
<div class="py-20 md:px-4">
	<div class="md:max-w-6xl max-w-[100%] mx-auto text-center">
		<!-- FAQs title -->
		<SectionTitle title="FAQs" />

		<!-- FAQs content -->
		<div class="w-full">
			<div class="flex justify-center items-center">
				<div class="block w-3/5 space-y-3">
					{#each faqs as faq, index}
						<div
							class="p-4 rounded-lg text-left flex items-center justify-between cursor-pointer"
							style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%);"
							role="button"
							tabindex="0"
							on:click={() => toggleDropdown(index)}
							on:keydown={(event) => handleKeyDown(event, index)}
						>
							<p
								class="text-white text-sm md:text-base font-medium"
								style="font-family: 'Roboto Mono', monospace;"
							>
								{faq.question}
							</p>
							<span
								class="text-white text-xl transition-transform duration-200"
								style="transform: rotate({dropdownStates[index] ? '90deg' : '0deg'});"
							>
								&gt;
							</span>
						</div>

						<div
							class="overflow-hidden transition-all duration-300 ease-in-out"
							style="max-height: {dropdownStates[index]
								? faq.maxHeight
								: '0px'}; opacity: {dropdownStates[index] ? '1' : '0'};"
						>
							<div class="px-4 py-1 rounded-lg text-left" style="background: transparent;">
								<p
									class="text-white text-sm md:text-base font-medium"
									style="font-family: 'Roboto Mono', monospace;"
								>
									{faq.answer}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>

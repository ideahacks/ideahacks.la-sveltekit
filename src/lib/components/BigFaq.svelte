<script>
	import Faq from '$lib/components/Faq.svelte';
	import SelectionButton from './utility/SelectionButton.svelte';
	let section = 'general';

	/**
	 * @type {HTMLSpanElement}
	 */
	let rippleElement;

	/**
	 * @param {{ currentTarget: { getBoundingClientRect: () => any; appendChild: (arg0: HTMLSpanElement) => void; }; clientX: number; clientY: number; }} event
	 */
	function handleClick(event) {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		// Reset ripple
		if (rippleElement) {
			rippleElement.remove();
		}

		// Create new ripple
		rippleElement = document.createElement('span');
		rippleElement.classList.add('ripple');
		rippleElement.style.left = `${x}px`;
		rippleElement.style.top = `${y}px`;

		event.currentTarget.appendChild(rippleElement);

		// Remove ripple after animation
		setTimeout(() => {
			if (rippleElement) {
				rippleElement.remove();
			}
		}, 600);
	}
</script>

<div class="text-white">
	<SelectionButton
		className={section === 'general' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
		onClick={() => (section = 'general')}
		text="General"
	/>
	<SelectionButton
		className={section === 'accommodations' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
		onClick={() => (section = 'accommodations')}
		text="Accommodations"
	/>
	<SelectionButton
		className={section === 'applications' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
		onClick={() => (section = 'applications')}
		text="Applications"
	/>
	<SelectionButton
		className={section === 'sustainability' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
		onClick={() => (section = 'sustainability')}
		text="Sustainability"
	/>
	<SelectionButton
		className={section === 'miscellaneous' ? 'btn-active bg-opacity-40' : 'btn-ghost text-white'}
		onClick={() => (section = 'miscellaneous')}
		text="Miscellaneous"
	/>

	<div class="mt-4">
		{#if section === 'general'}
			<div class="fade-in">
				<Faq
					question="Will I just be working the whole weekend?"
					answer="Hacking for 36 hours shouldn’t come at the expense of your mental and physical health. To demonstrate how to stay healthy while working hard, we have many fun events planned throughout the hackathon including guided breaks and miscellaneous mini-games distributed throughout the event."
				/>

				<Faq
					question="Who can attend?"
					answer="All students interested are encouraged to apply regardless of your major or experience level! And although most participants end up being UCLA engineering students, we would love to welcome participants from any major and those outside the Bruin community :)"
				/>

				<Faq
					question="I don't know anything about hardware!"
					answer="You are definitely not alone! Before the hackathon, we will have a hacking fundamentals workshop to provide you with all the baseline knowledge you need to hit the ground running once hacking begins! During the hackathon, there will be workshops on various technologies and techniques such as wireless communication and CAD that will be open to everyone. There will also be mentors and other hardware experts ready to assist those who are having trouble bringing their hacks to life."
				/>
			</div>
		{:else if section === 'accommodations'}
			<div class="fade-in">
				<Faq
					question="How much does it cost?"
					answer="This event is completely free of charge! We supply everything you need all the parts and food you need for the entire weekend."
				/>

				<Faq
					question="What should I bring?"
					answer="At the very least, you need a valid ID to check in for the hackathon. For the most up to date list of items to bring, please refer to our pre-event guide."
				/>

				<Faq
					question="Will food be provided?"
					answer="We will supply 4 meals, all free of charge! This includes breakfast, lunch and dinner on Saturday as well as breakfast on Sunday. We also have several snacks thanks to our generous sponsors."
				/>

				<Faq
					question="How about travel costs?"
					answer="Unfortunately, we cannot cover travel costs. Since most of our participants come from UCLA, we encourage most participants to walk (or bike/scooter) to the venue if possible. For those coming from outside of campus, we encourage you to use public transportation (LA Metro, Santa Manta Blue Bus, Culver City Bus) to minimize your impact on the environment. If you need to use a rental vehicle, we recommend getting an electric car and charging it at one of UCLA’s many EV charging stations."
				/>
			</div>
		{:else if section === 'applications'}
			<div class="fade-in">
				<Faq
					question="How do I apply?"
					answer="Hackers can apply on this website! Applications will remain open until late December. Applications are reviewed and accepted on a first come first serve basis, so apply early! Make sure to apply by December 20, 2024 to ensure you get your preferred shirt size, make sure we can order any preferred parts you list on your application, and be entered into a special raffle as a thanks for applying early!"
				/>

				<Faq
					question="What if I don't have a team?"
					answer="We require everyone to be on teams of around 4-5 hackers. Not only will this make it more enjoyable, but more equipment will be available for your use. Before hacking begins, we will hold a team formation social so that everyone can have the opportunity to meet new people and form a team!"
				/>
			</div>
		{:else if section === 'sustainability'}
			<div class="fade-in">
				<Faq
					question="What are you doing to protect the environment?"
					answer="IDEA Hacks is committed to minimizing our event’s impact on the environment. As the largest hardware-based hackathon on the West Coast, we can set the standard for how large events can operate as sustainably as possible. Moreover, we aim to utilize the reach of the event to educate our 200+ expected participants on how they can establish environmentally-friendly habits and equip them with (free!) supplies to live more sustainably in their day-to-day lives."
				/>

				<Faq
					question="What can I do to help?"
					answer="To help us achieve our goal of making IDEA Hacks 2024 as sustainable as possible, we have a few simple requests from our hackers. Please bring your own water bottles, as well as notebooks, pens, and pencils if you plan on using them. Please pay attention and listen to our waste sorting educational material. Unplug your computer chargers when you’re not using them to minimize “vampire energy”. And, if you want to help us reduce the food wasted by the end of the event, make sure you come hungry and eat enough :)"
				/>
			</div>
		{:else}
			<div class="fade-in">
				<Faq
					question="What tools and hardware will be provided for my team?"
					answer="If you would like to see a specific part or device at the hackathon, you can specify so on your application and we'll do our best to accommodate! You can also view a full list of available parts on our Parts page closer to the start of the hackathon. We will also provide soldering stations, 3D printers, and laser cutters for you to use on your projects."
				/>

				<Faq
					question="How can I check out parts during the hackathon?"
					answer="Our Parts page will let you check which parts are available, and from there you'll be able to go to our parts table and have a volunteer check the part out for you. Some of our parts are consumable, but many need to be scanned so we can keep track of them. Due to changing part availability with recent part shortages, we will update this page as we get closer to the event date with any changes to our inventory."
				/>

				<Faq
					question="How do I contact IDEA Hacks?"
					answer="Email us at evp@ieeebruins.com! We would love to hear from you!"
				/>
			</div>
		{/if}
	</div>
</div>

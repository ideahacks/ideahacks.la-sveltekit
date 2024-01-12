<script>
	import Schedule from '$lib/components/Schedule.svelte';
	import Sponsor from '$lib/components/Sponsor.svelte';
	import {
		Award,
		Calendar,
		CalendarClock,
		Info,
		MapPin,
		MessageCircleQuestion,
		Sparkle
	} from 'lucide-svelte';

	import northrop_grumman from '$lib/images/sponsors/northrop_grumman.svg';
	import texas_instruments from '$lib/images/sponsors/texas_instruments.svg';
	import digikey from '$lib/images/sponsors/digikey.svg';
	import patient_safety_technology_challenge from '$lib/images/sponsors/patient_safety_technology_challenge.png';
</script>

<div class="m-12 justify-center md:m-16">
	<h1 class="font-display-serif text-7xl md:text-9xl">
		<span> IDEA Hacks </span>
		<span class="font-display-sans font-bold tabular-nums">2024</span>
	</h1>
	<h2 class="flex items-center gap-4 font-display-sans text-3xl font-black md:text-6xl">
		<Calendar size={48} /> Jan 12-14
	</h2>
	<h2 class="flex items-center gap-4 font-display-sans text-3xl font-black md:text-6xl">
		<MapPin size={48} /> Ackerman Grand Ballroom
	</h2>

	<div class="divider" />

	<div class="join join-vertical lg:join-horizontal">
		<a href="#prizes" class="btn btn-primary join-item"><Award /> Prizes</a>
		<a href="#schedule" class="btn btn-primary join-item"><CalendarClock /> Schedule</a>
		<a href="#faq" class="btn btn-primary join-item"><MessageCircleQuestion /> FAQ</a>
		<a href="#sponsors" class="btn btn-primary join-item"><Sparkle /> Sponsors</a>
	</div>

	<div class="divider" />

	<div
		class="my-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90 bg-blend-normal"
	>
		<p class="mb-4">
			IEEE at UCLA is pleased to present the tenth anniversary of IDEA Hacks, the premier
			hardware-focused hackathon on the West Coast. Hosted by IEEE’s Student Branch at UCLA for 36
			hours this upcoming January 12-14, 2024, it provides hundreds of students from both UCLA and
			local community colleges with the opportunity to develop their own tangible products.
			Throughout the experience, IEEE provides parts, tools, space, food, and workshops all for
			free, so all students can focus solely on their projects.
		</p>
		<p class="mb-4">
			This year will be the tenth anniversary of IDEA Hacks, and the theme “Celebrating Our
			Communities” will encourage students from all backgrounds to embrace their unique backgrounds
			and create something that will improve or benefit their communities, surroundings, and
			environments.
		</p>
		<p class="mb-4">
			The three sub-categories Sustainability, Accessibility, and “Go Touch Grass” aim to promote
			the creation of projects that will benefit the health of the planet, improve usability, or
			share the enjoyment of life. More information on these subcategories
			<a
				class="link"
				target="_blank"
				href="https://docs.google.com/document/d/1yFtEunybfpHEBj6Bx5U7BCU507Oiu2TjHr9MLfI-Ndg/edit?usp=sharing"
				>can be found here</a
			>.
		</p>
		<p class="mb-4">
			Everything you need throughout the weekend, from parts to food to knowledge, will all be right
			at your fingertips. Communication and announcements will happen through a Discord server we
			will set up for the hackathon.
		</p>
	</div>

	<div
		class="my-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90 bg-blend-normal"
	>
		<h2 id="prizes" class="scroll-mt-8 font-display-serif text-5xl">Prizes</h2>
		<ul class="mt-4 space-y-4">
			<li>
				<h3 class="font-bold">Grand Prize:</h3>
				GIGABYTE M27Q 27" 170Hz 1440P -KVM Gaming Monitor
			</li>
			<li>
				<h3 class="font-bold">Second Place:</h3>
				Electric Gooseneck Kettle, Pour Over Coffee Maker, 16 oz Carter Move Travel Mug
			</li>
			<li>
				<h3 class="font-bold">Third Place:</h3>
				JBL Flip 6 Portable Waterproof Bluetooth Speaker
			</li>
			<li>
				<h3 class="font-bold">Accessibility Track Prize:</h3>
				Luna 20 LB Weighted Blanket and Comfort Spa Backrest Pillow
			</li>
			<li>
				<h3 class="font-bold">Sustainability Track Prize:</h3>
				Bonsai Tree Kit and Hydroponic Indoor Herb Garden Kit with LED Grow Light
			</li>
			<li>
				<h3 class="font-bold">“Go Touch Grass” Track Prize:</h3>
				Camping Hammock, 80”x 80” 3-Layer Waterproof Outdoor Blanket, and White Stainless Steel 24oz
				HydroFlask
			</li>
			<li>
				<h3 class="font-bold">Patient Safety Tech Prize:</h3>
				<p>$500 (split between members)</p>
				<div class="mt-4 flex gap-2">
					<Info size={32} />
					<div>
						<p class="mb-4">
							In order to be eligible to win the patient safety prize, your innovation must align
							with one of the following five leading patient safety challenges facing health care
							across the continuum of care: Medication errors, procedural/surgical errors, errors
							during routine patient care (e.g. pressure ulcers, blood clots, falls), infections and
							diagnostic safety.
						</p>
						<p>
							The winning team will represent the most innovative, impactful, viable idea that
							clearly understands the problem identified.
						</p>
					</div>
				</div>
			</li>
		</ul>
	</div>

	<Schedule />

	<div
		class="my-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90 bg-blend-normal"
	>
		<h2 id="faq" class="mt-4 scroll-mt-8 font-display-serif text-5xl">
			Frequently asked questions
		</h2>

		<div class="grid gap-2 md:grid-cols-2">
			<div class="card">
				<div class="card-body">
					<h3 class="card-title font-display-sans text-3xl">Who can attend?</h3>
					<p>
						All students interested are encouraged to apply regardless of your major or experience
						level! And although most participants end up being UCLA engineering students, we would
						love to welcome participants from any major and those outside the Bruin community :)
					</p>
				</div>
			</div>
			<div class="card">
				<div class="card-body">
					<h3 class="card-title font-display-sans text-3xl">What if I don't have a team?</h3>
					<p>
						You are free to hack alone, but doing it with a team makes it all the more fun! We
						encourage everyone to be on teams of around 4-5 hackers. Not only will this make it more
						enjoyable, but more equipment will be available for your use.
					</p>
				</div>
			</div>
			<div class="card">
				<div class="card-body">
					<h3 class="card-title font-display-sans text-3xl">
						What tools and hardware will be provided for my team?
					</h3>
					<p>
						If you would like to see a specific part or device at the hackathon, you can specify so
						on your application and we'll do our best to accommodate! You can also view a full list
						of available parts on our Parts page closer to the start of the hackathon. We will also
						provide soldering stations, 3D printers, and laser cutters for you to use on your
						projects.
					</p>
				</div>
			</div>
			<div class="card">
				<div class="card-body">
					<h3 class="card-title font-display-sans text-3xl">How do I contact IDEA Hacks?</h3>
					<p>
						Email us at <a href="mailto:evp@ieeebruins.com" class="link">evp@ieeebruins.com</a>! If
						you have feedback on the website please reach out at
						<a href="mailto:webmaster@ieeebruins.com" class="link">webmaster@ieeebruins.com</a>.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div
		class="my-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90 bg-blend-normal"
	>
		<h2 id="sponsors" class="my-4 mt-4 scroll-mt-8 font-display-serif text-5xl">Sponsors</h2>

		<div class="my-4 flex gap-8">
			<Sponsor src={northrop_grumman} alt={'Northrop Grumman'} />
			<Sponsor src={texas_instruments} alt={'Texas Instruments'} />
			<Sponsor src={digikey} alt={'Digikey'} />
			<Sponsor src={patient_safety_technology_challenge} alt={'Patient Safety Technology'} />
		</div>

		<p>
			Interested in sponsoring IDEA Hacks? Check out our <a
				href="https://drive.google.com/file/d/1KDASmkWqPmwoqTGyly87Hjs6MYoJ3MSI/view?usp=sharing"
				class="link">sponsorship brochure</a
			>!
		</p>
	</div>
</div>

<style lang="postcss">
	.cloud-container {
		display: flex;
		animation: scrollImages 10s linear infinite; /* Adjust time as needed */
		margin: 0;
		padding: 0;
		width: max-content; /* Ensures the container fits the images exactly */
	}

	.cloud {
		width: 200px; /* Adjust the width as needed */
		height: auto; /* Maintains the aspect ratio */
		margin-right: 0; /* Spacing between images */
	}

	.cloud:last-child {
		margin-right: 0; /* Removes margin from the last image */
	}

	@keyframes scrollImages {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-60%);
		}
	}
</style>

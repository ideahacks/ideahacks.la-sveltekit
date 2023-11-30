<script>
	import { Sparkles } from 'lucide-svelte';
	import cloud1 from '$lib/images/cloud1.png';
	import cloud2 from '$lib/images/cloud2.png';
	import cloud3 from '$lib/images/cloud3.png';
	import cloud4 from '$lib/images/cloud4.png';
	import cloud5 from '$lib/images/cloud5.png';
</script>

<div class="m-10">
<a href="/static/cloud.png" data-investors-avatar>
	<div class="cloud-container">
		<img class="cloud" src={cloud5} alt="ideahacks" />
		<img class="cloud" src={cloud1} alt="ideahacks" />
		<img class="cloud" src={cloud4} alt="ideahacks" />
		<img class="cloud" src={cloud3} alt="ideahacks" />
		<img class="cloud" src={cloud1} alt="ideahacks" />
		<img class="cloud" src={cloud4} alt="ideahacks" />
		<img class="cloud" src={cloud3} alt="ideahacks" />
		<img class="cloud" src={cloud2} alt="ideahacks" />
		<img class="cloud" src={cloud1} alt="ideahacks" />
		<img class="cloud" src={cloud2} alt="ideahacks" />
		<img class="cloud" src={cloud4} alt="ideahacks" />
		<img class="cloud" src={cloud3} alt="ideahacks" />
		<img class="cloud" src={cloud2} alt="ideahacks" />
		<img class="cloud" src={cloud1} alt="ideahacks" />
		<img class="cloud" src={cloud2} alt="ideahacks" />
		<img class="cloud" src={cloud3} alt="ideahacks" />
		<img class="cloud" src={cloud2} alt="ideahacks" />
		<img class="cloud" src={cloud4} alt="ideahacks" />
	</div>
</a> 
</div>
<div class="m-12 justify-center md:m-16">
	
	<h1 class="font-display-serif text-8xl md:text-9xl">
		<span> IDEA Hacks </span>
		<span class="font-display-sans font-bold tabular-nums">2024</span>
	</h1>
	<h2 class="font-display-sans text-6xl font-black">Jan 12-14</h2>
	<div class="divider" />
	
	<a href="/apply" class="btn-primary btn-lg btn my-8">Applications are open! <Sparkles /></a>

	<p class="mb-4">
		IEEE at UCLA is pleased to present the tenth anniversary of IDEA Hacks, the premier
		hardware-focused hackathon on the West Coast. Hosted by IEEE’s Student Branch at UCLA for 36
		hours this upcoming January 12-14, 2024, it provides hundreds of students from both UCLA and
		local community colleges with the opportunity to develop their own tangible products. Throughout
		the experience, IEEE provides parts, tools, space, food, and workshops all for free, so all
		students can focus solely on their projects.
	</p>
	<p class="mb-4">
		This year will be the tenth anniversary of IDEA Hacks, and the theme “Celebrating Our
		Communities” will encourage students from all backgrounds to embrace their unique backgrounds
		and create something that will improve or benefit their communities, surroundings, and
		environments. The three sub-categories - sustainability, accessibility, and “go touch grass”
		(going outside) - are aimed to promote the creation of projects that will benefit the health of
		the planet, improve usability, or share the enjoyment of life. Everything you need throughout
		the weekend, from parts to food to knowledge, will all be right at your fingertips.
		Communication and announcements will happen through a Discord server we will set up for the
		hackathon.
	</p>

	<h2 class="mt-4 font-display-serif text-5xl">Frequently asked questions</h2>

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
					If you would like to see a specific part or device at the hackathon, you can specify so on
					your application and we'll do our best to accommodate! You can also view a full list of
					available parts on our Parts page closer to the start of the hackathon. We will also
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

	<h2 class="my-4 mt-4 font-display-serif text-5xl">Sponsoring</h2>

	<p>
		Interested in sponsoring IDEA Hacks? Check out our <a
			href="https://drive.google.com/file/d/1KDASmkWqPmwoqTGyly87Hjs6MYoJ3MSI/view?usp=sharing"
			class="link">sponsorship brochure</a
		>!
	</p>
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(
			180deg,
			#240202 0%,
			#70130b 18.75%,
			#a53018 44.27%,
			#d97e2e 71.35%,
			#f6c042 95.83%
		);
	}
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

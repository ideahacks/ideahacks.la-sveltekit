<script lang="ts">
	import logo from '$lib/images/logo.png';
	import { Send } from 'lucide-svelte';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import BigFaq from '$lib/components/BigFaq.svelte';
	import Schedule from '$lib/components/Schedule.svelte';
	// export let supabase: SupabaseClient;
	import cityscape from '$lib/images/cityscape.png';
	// import Prizes from '$lib/components/Prizes.svelte';
	// import Schedule from '$lib/components/Schedule.svelte';
	import uclaSamueliLogo from '$lib/images/UCLA_Samueli_Engineering_block-1.png';

	// export let data;
	export let form;
	// let { supabase, session } = data;
	// $: ({ session } = data);

	// const email = session?.user.email;

	// async function signOut() {
	// 	const { error } = await supabase.auth.signOut();

	// 	// TODO: Actual error handling
	// 	if (error) {
	// 		console.log(`Error signing out: ${error}`);
	// 	}

	// 	console.log('Signed out?');
	// }

	import ideahacks2020 from '$lib/images/ideahacks2020.png';
	import ideahacks2021 from '$lib/images/ideahacks2021.png';
	import ideahacks2022 from '$lib/images/ideahacks2022.png';
	import ideahacks2023 from '$lib/images/ideahacks2023.png';
	import ideahacks2024 from '$lib/images/ideahacks2024.png';

	// https://www.ti.com/
	// https://www.infineon.com/
	// https://www.digikey.com/

	import digikey from '$lib/images/sponsors/digikey.svg';
	import infineon from '$lib/images/sponsors/infineon.svg';
	import ti from '$lib/images/sponsors/ti.svg';

	import Typewriter from 'svelte-typewriter';

	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import SelectionButton from '$lib/components/utility/SelectionButton.svelte';

	let alert = false;

	let current = new Date();
	let dueDate = new Date('2024-12-20T23:59:59-08:00');
	let eventDate = new Date('2025-01-10T21:00:00');

	let isDue = current.getTime() > dueDate.getTime();

	// Calculate the difference in milliseconds
	const calculateTimeDifference = (from: Date, to: Date) => {
		let diff: number = to.getTime() - from.getTime();

		if (diff < 0) {
			// event is over
			return { days: 0, hours: 0, minutes: 0, seconds: 0 };
		}

		const days: number = Math.floor(diff / (1000 * 60 * 60 * 24));
		diff -= days * (1000 * 60 * 60 * 24);

		const hours: number = Math.floor(diff / (1000 * 60 * 60));
		diff -= hours * (1000 * 60 * 60);

		const minutes: number = Math.floor(diff / (1000 * 60));
		diff -= minutes * (1000 * 60);

		const seconds: number = Math.floor(diff / 1000);

		return { days, hours, minutes, seconds };
	};
	let toEventDate = calculateTimeDifference(current, eventDate);

	// Update `current` time and recalculate every second
	setInterval(() => {
		current = new Date();
		toEventDate = calculateTimeDifference(current, eventDate);
	}, 1000);
</script>

<!-- <button on:click={signOut}>Sign Out</button>
<p>hello {email}</p> -->
<!-- <a
	href="/privacy"
	class="z-10 mx-12 mt-12 text-right font-encode font-bold text-white hover:opacity-75">Privacy</a
><a
	href="/sponsor-us"
	class="absolute z-10 mx-5 mt-12 font-encode font-bold text-white hover:opacity-75 md:mx-24"
	>Sponsor Us!</a
> -->

<div class="z-10 mx-5 my-10 max-w-4xl md:mx-24">
	{#if alert}
		<div role="alert" class="alert mb-4 opacity-60 shadow-lg">
			<p>
				<span class="font-bold"
					>IDEA Hacks will be this May 2 to May 4 at the Covel Commons Grand Horizon Room!
				</span>Please fill out this

				<a
					class="font-bold text-[#7785cc]"
					href="https://docs.google.com/forms/d/e/1FAIpQLSdAupqJc3tYzbXrYdHJGwEymJFl2aD0S4F7NYlZm-t-rzP04w/viewform"
					target="_blank">continued interest form</a
				>
				for to let us know if you can make the new date by <span class="font-bold">3/4/25</span>!
			</p>
			<button
				class="hover-lift btn my-1 rounded-full bg-base-300 hover:bg-opacity-60"
				on:click={() => (alert = false)}>OK</button
			>
		</div>
	{/if}
	<h1 class="mb-4 font-paytone text-6xl text-white xl:text-8xl">
		<span>IDEA HACKS 2025</span>
	</h1>
	<h3 class="mb-4 font-paytone text-lg text-white xl:text-xl">
		<span>Covel Commons Grand Horizon Room -- May 2-4</span>
	</h3>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		Get ready to create something amazing! Join us for the 11th annual IDEA Hacks, the West Coast's
		premier hardware hackathon!
	</div>
	<!-- <div class="text-md mb-4 font-encode text-white xl:text-lg">
		Because of this date change, we require all participants to fill out the continued interest
		form. If you don't complete this form, you won't be able to participate! The deadline is <span
			class="font-bold">3/4/25</span
		>!
	</div>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		If you're interested in joining IDEA Hacks but missed the original deadline, we encourage you to
		fill out the form as well! There's a separate section for first-time applicants only and as
		spots open up, we'll reach out to offer them to new participants.
	</div>
	<a
		href="https://docs.google.com/forms/d/e/1FAIpQLSdAupqJc3tYzbXrYdHJGwEymJFl2aD0S4F7NYlZm-t-rzP04w/viewform"
		target="_blank"
		class="hover-lift btn my-1 rounded-full bg-base-200 bg-opacity-10 text-white hover:bg-base-200 hover:bg-opacity-60"
		>Continued Interest Form</a
	> -->

	{#if !isDue}
		<div class="text-md mb-4 font-encode font-bold text-white xl:text-lg">
			Due 12/20/2024, 11:59 PM
		</div>
		<a
			href="/application"
			class="btn border-none bg-opacity-30 text-white {isDue ? 'disabled' : ''}">Apply Now!</a
		>
	{/if}

	<div class="text-md mt-4 font-encode text-white">{form?.message ?? ''}</div>
	<br />

	<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
		<span>About</span>
	</h1>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		For the eleventh time, IEEE at UCLA is pleased to present IDEA Hacks, the largest hardware
		hackathon on the West Coast! We provide all our hackers with all the hardware, tools, and
		equipment that they need, including 3D printers and soldering stations, free of charge. Our
		hundreds of hackers will not only code, but create tangible products from scratch over the
		course of 36 hours.
	</div>

	<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
		<span>Theme & Tracks</span>
	</h1>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		Welcome to Supercharge! This year, we're bringing an electrifying mix of innovation and energy
		to our hackathon!
	</div>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		<span class="font-bold">⭐ Super Human ⭐</span> - Enhance aspects of your daily life and become
		your best self!
	</div>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		<span class="font-bold">☁️ Super Nostalgic ☁️</span> - Take a journey back to your roots and embrace
		your old self!
	</div>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		<span class="font-bold">⚡ Super (in)Sane ⚡</span> - Break the mold and discover your true self!
	</div>
	<!-- <Schedule /> -->

	<!-- <h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
		<span>Prizes</span>
	</h1> -->
	<!-- <Prizes />

	<Schedule /> -->

	<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
		<span>FAQs</span>
	</h1>
	<BigFaq />

	<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
		<span>History</span>
	</h1>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		IDEA Hacks was founded in 2014 by members of UCLA IEEE and Theta Tau Upsilon Delta. Ever since
		our first hackathon in January 2015, IDEA Hacks’ vision has been to provide engineering students
		with a space to learn, create, and inspire one another. As the first and largest hardware
		hackathon in California, we encourage interdisciplinary teams to build hands-on components as
		opposed to a software hackathon.
	</div>

	<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
		<span>Previous Events</span>
	</h1>
	<div class="text-md mb-8 font-encode text-white xl:text-lg">
		<a
			href="https://idea-hacks-2024.devpost.com"
			target="_blank"
			class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
			><img src={ideahacks2024} class="rounded-full opacity-75" alt="ideahacks 2023 logo" />2024</a
		>
		<a
			href="https://idea-hacks-2023.devpost.com"
			target="_blank"
			class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
			><img src={ideahacks2023} class="rounded-full opacity-75" alt="ideahacks 2023 logo" />2023</a
		>
		<a
			href="https://ideahacks2022.devpost.com"
			target="_blank"
			class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
			><img src={ideahacks2022} class="rounded-full opacity-75" alt="ideahacks 2022 logo" />2022</a
		>
		<a
			href="https://ideahacks2021.devpost.com"
			target="_blank"
			class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
			><img src={ideahacks2021} class="rounded-full opacity-75" alt="ideahacks 2021 logo" />2021</a
		>
		<a
			href="https://ideahacks2020.devpost.com"
			target="_blank"
			class="m-2 inline-block h-20 w-20 text-center hover:opacity-80"
			><img src={ideahacks2020} class="rounded-full opacity-75" alt="ideahacks 2020 logo" />2020</a
		>
	</div>

	<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
		<span>Sponsors</span>
	</h1>
	<div class="center-align">
		<a
			href="https://www.digikey.com/"
			target="_blank"
			class="m-2 mt-0 inline-block w-48 text-center hover:opacity-80"
			><img src={digikey} class="" alt="digikey logo" /></a
		>
		<a
			href="https://www.infineon.com/"
			target="_blank"
			class="m-2 mt-0 inline-block w-48 text-center hover:opacity-80"
			><img src={infineon} class="" alt="infineon logo" /></a
		>
		<a
			href="https://www.ti.com/"
			target="_blank"
			class="m-2 mt-0 inline-block w-48 text-center hover:opacity-80"
			><img src={ti} class="" alt="ti logo" /></a
		>
	</div>
	<p class="text-md mb-4 mt-4 font-encode text-white xl:text-lg">
		Special thanks to UCLA Samueli School of Engineering for their continued support of IDEA Hacks
		and our mission to empower the next generation of engineers.
	</p>
	<img
		src={uclaSamueliLogo}
		class="my-8 h-16 w-auto"
		alt="UCLA Samueli School of Engineering logo"
	/>
</div>

<div class="z-20 h-24 w-full bg-contain" style="background-image: url({cityscape});" />

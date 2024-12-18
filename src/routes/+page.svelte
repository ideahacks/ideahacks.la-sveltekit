<script lang="ts">
	import logo from '$lib/images/logo.png';
	import { Send } from 'lucide-svelte';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import BigFaq from '$lib/components/BigFaq.svelte';
	// export let supabase: SupabaseClient;
	import cityscape from '$lib/images/cityscape.png';

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

	import cloud1 from '$lib/images/CLOUDS_1.png';
	import cloud2 from '$lib/images/CLOUDS_2.png';
	import cloud3 from '$lib/images/CLOUDS_3.png';
	import cloud4 from '$lib/images/CLOUDS_4.png';

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

	let wave1 = false;
	let wave2 = false;

	setTimeout(() => (wave1 = true), 0);
	setTimeout(() => (wave2 = true), 15000);

	let alert = true;

	let current = new Date();
	let dueDate = new Date('2024-12-22T23:59:59-08:00');

	let isDue = current.getTime() > dueDate.getTime();
</script>

<img src={logo} alt="logo" class="fixed right-36 top-36 z-0 w-96 opacity-15" />

{#if wave1}
	<img
		src={cloud1}
		transition:fly={{ duration: 50000, x: '150vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-10 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud2}
		transition:fly={{ duration: 20000, x: '50vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-96 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud2}
		transition:fly={{ duration: 30000, x: '100vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 bottom-20 z-0 w-96 opacity-25"
	/>
{/if}

{#if wave2}
	<img
		src={cloud3}
		transition:fly={{ duration: 50000, x: '150vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-36 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud4}
		transition:fly={{ duration: 50000, x: '125vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 bottom-36 z-0 w-96 opacity-25"
	/>
{/if}

<!-- <button on:click={signOut}>Sign Out</button>
<p>hello {email}</p> -->
<a
	href="/privacy"
	class="z-10 mx-12 mt-12 text-right font-encode font-bold text-white hover:opacity-75">Privacy</a
><a
	href="/sponsor-us"
	class="absolute z-10 mx-5 mt-12 font-encode font-bold text-white hover:opacity-75 md:mx-24"
	>Sponsor Us!</a
>

<div class="z-10 mx-5 my-10 max-w-4xl md:mx-24">
	{#if alert}
		<div role="alert" class="alert mb-4 opacity-60 shadow-lg">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="h-6 w-6 shrink-0 stroke-info"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			{#if !isDue}
				<h3 class="">Applications have been extended to 12/22!</h3>
			{:else}
				<h3 class="">Applications have closed</h3>
			{/if}
			<button class="btn btn-sm" on:click={() => (alert = false)}>Okay</button>
		</div>
	{/if}
	<h1 class="mb-4 font-paytone text-6xl text-white xl:text-8xl">
		<span>IDEA HACKS 2025</span>
	</h1>
	<h3 class="mb-4 font-paytone text-lg text-white xl:text-xl">
		<Typewriter mode="loop" interval={75} style="--cursor-color: 'blue'"
			><span>January 10-12, Ackerman Grand Ballroom</span><span
				>The West Coast's Premier Hardware Hackathon!</span
			></Typewriter
		>
	</h3>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		Get ready to create something amazing! Join us for the 11th annual IDEA Hacks, the West Coast's
		premier hardware hackathon!
	</div>

	<!-- 
	<form method="POST" class="flex">
		<input
			type="text"
			name="email"
			placeholder="Email"
			class="input input-ghost w-full max-w-xs font-encode text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
		/>

		<button class="btn btn-ghost mx-2 text-white"><Send /></button>
	</form> -->

	{#if !isDue}
		<div class="text-md mb-4 font-encode font-bold text-white xl:text-lg">
			Due 12/22/2024, 11:59 PM
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
	<div class="text-md mb-24 font-encode text-white xl:text-lg">
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
			class="m-2 inline-block w-48 text-center hover:opacity-80"
			><img src={digikey} class="" alt="digikey logo" /></a
		>
		<a
			href="https://www.infineon.com/"
			target="_blank"
			class="m-2 inline-block w-48 text-center hover:opacity-80"
			><img src={infineon} class="" alt="infineon logo" /></a
		>
		<a
			href="https://www.ti.com/"
			target="_blank"
			class="m-2 inline-block w-48 text-center hover:opacity-80"
			><img src={ti} class="" alt="ti logo" /></a
		>
	</div>
</div>

<div class="z-20 h-24 w-full bg-contain" style="background-image: url({cityscape});" />

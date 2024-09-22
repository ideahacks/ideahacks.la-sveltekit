<script lang="ts">
	import logo from '$lib/images/logo.png';
	import { Send } from 'lucide-svelte';
	import cloud1 from '$lib/images/CLOUDS_1.png';
	import cloud2 from '$lib/images/CLOUDS_2.png';
	import cloud3 from '$lib/images/CLOUDS_3.png';
	import cloud4 from '$lib/images/CLOUDS_4.png';
	import Typewriter from 'svelte-typewriter';

	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	export let form;

	let wave1 = false;
	let wave2 = false;

	setTimeout(() => (wave1 = true), 0);
	setTimeout(() => (wave2 = true), 15000);
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

<a href="/sponsor-us" class="z-10 mx-12 mt-12 text-right font-encode font-bold text-white"
	>Sponsor Us!</a
>
<div class="z-10 mx-5 my-10 max-w-xl md:ml-24">
	<h1 class="mb-4 font-paytone text-6xl text-white xl:text-8xl">
		<span>IDEA HACKS 2025</span>
	</h1>
	<h3 class="mb-4 font-paytone text-lg text-white xl:text-xl">
		<Typewriter mode="loop" interval={75} style="--cursor-color: 'blue'"
			><span>January 17-19, Ackerman Grand Ballroom</span><span
				>The West Coast's Premier Hardware Hackathon!</span
			></Typewriter
		>
	</h3>
	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		Get ready to create something amazing! Join us for the 11th annual IDEA Hacks, the West Coast's
		premier hardware hackathon.
	</div>

	<div class="text-md mb-4 font-encode text-white xl:text-lg">
		Want to be the first to know when applications drop? Enter your email below!
	</div>

	<form method="POST" class="flex">
		<input
			type="text"
			name="email"
			placeholder="Email"
			class="input input-ghost w-full max-w-xs font-encode text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
		/>

		<button class="btn btn-ghost mx-2 text-white"><Send /></button>
	</form>

	<div class="text-md mt-4 font-encode text-white">{form?.message ?? ''}</div>
	<br />
	<a href="/privacy" class="z-10 mb-48 font-encode font-bold text-white">Privacy Policy</a>
</div>

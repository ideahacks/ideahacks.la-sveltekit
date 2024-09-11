<script lang="ts">
	import logo from '$lib/images/logo.png';
	import { Send } from 'lucide-svelte';

	export let form;
</script>

<img src={logo} alt="logo" class="fixed right-36 top-36 z-0 w-96 opacity-15" />

<a href="/sponsor-us" class="mx-12 mt-12 text-right font-encode font-bold text-white">Sponsor Us!</a
>

<div class="z-10 mx-5 my-10 max-w-xl md:ml-24">
	<h1 class="mb-4 font-paytone text-6xl text-white xl:text-8xl">
		<span> IDEA HACKS 2025</span>
	</h1>
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
			class="input input-ghost w-full max-w-xs text-lg text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
		/>

		<button class="btn btn-ghost mx-2 text-white"><Send /></button>
	</form>

	<div class="text-md mt-4 font-encode text-white">{form?.message ?? ''}</div>
</div>

<a href="/privacy" class="z-10 mx-12 my-24 text-right font-encode font-bold text-white"
	>Privacy Policy</a
>

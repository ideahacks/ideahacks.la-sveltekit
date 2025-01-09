<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabase';
	import logo from '$lib/images/logo.png';

	import type { PageData } from './$types';

	export let data: PageData;

	import '../app.css';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	let wave1 = false;
	let wave2 = false;
	let wave3 = false;
	import cloud1 from '$lib/images/CLOUDS_1.png';
	import cloud2 from '$lib/images/CLOUDS_2.png';
	import cloud3 from '$lib/images/CLOUDS_3.png';
	import cloud4 from '$lib/images/CLOUDS_4.png';
	setTimeout(() => (wave1 = true), 0);
	setTimeout(() => (wave2 = true), 15000);
	setTimeout(() => (wave3 = true), 30000);
</script>

<!-- NAVBAR -->
<img src={logo} alt="logo" class="fixed right-36 top-36 z-0 w-96 opacity-15" />
<div class="navbar z-50 h-6 w-full text-white">
	<div class="navbar-start">
		<ul class="font-paytone">
			<a href="/" class="btn btn-ghost text-xl"
				><img src={logo} class="h-10 w-10 max-sm:hidden" alt="navbar logo" />IDEA HACKS</a
			>
		</ul>
	</div>
	<div class="navbar-end">
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<ul
				tabindex="0"
				class="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-box bg-[#2775af] p-2 font-encode font-bold shadow"
			>
				<li>
					<a href="/sponsor-us">Sponsor Us!</a>
				</li>
				<li><a href="/privacy">Privacy</a></li>
				<li />
				{#if data.is_admin}
					<li><a href="/admin">Admin</a></li>
				{/if}
				{#if data.session}
					<li><a href="/account">Account</a></li>
					<li>
						<form action="/logout" method="POST">
							<button type="submit" class="">Log out</button>
						</form>
					</li>
				{:else}
					<li><a href="/login">Log in</a></li>
				{/if}
			</ul>
		</div>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1 font-encode font-bold">
			<li>
				<a href="/sponsor-us">Sponsor Us!</a>
			</li>
			<li><a href="/privacy">Privacy</a></li>
			{#if data.is_admin}
				<li><a href="/admin">Admin</a></li>
			{/if}
			{#if data.session}
				<li><a href="/account">Account</a></li>
				<li>
					<form action="/logout" method="POST">
						<button type="submit" class="">Log out</button>
					</form>
				</li>
			{:else}
				<li>
					<a href="/login">Log in</a>
				</li>
			{/if}
		</ul>
	</div>
</div>

<!-- CLOUDS -->
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

{#if wave3}
	<img
		src={cloud3}
		transition:fly={{ duration: 50000, x: '100vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 bottom-32 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud1}
		transition:fly={{ duration: 50000, x: '150vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-10 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud4}
		transition:fly={{ duration: 50000, x: '125vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-96 z-0 w-96 opacity-25"
	/>
{/if}

<div class="z-0 flex min-h-screen flex-col">
	<slot />
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #2775af 0%, #83c3e8 100%);
		background-color: #83c3e8;
	}
</style>

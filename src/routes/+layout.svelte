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
</script>

<!-- NAVBAR -->

<div class="navbar z-50 h-6 w-full text-white">
	<div class="navbar-start">
		<ul class="font-paytone">
			<a href="/" class="btn btn-ghost text-xl"
				><img src={logo} class="h-10 w-10" alt="navbar logo" />IDEA HACKS</a
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
				<li>
					{#if data.session}
						<form action="/logout" method="POST">
							<button type="submit" class="">Logout</button>
						</form>
					{:else}
						<a href="/login">Login</a>
					{/if}
				</li>
			</ul>
		</div>
	</div>
	<div class="navbar-center hidden lg:flex">
		<ul class="menu menu-horizontal px-1 font-encode font-bold">
			<li>
				<a href="/sponsor-us">Sponsor Us!</a>
			</li>
			<li><a href="/privacy">Privacy</a></li>
			<li>
				{#if data.session}
					<form action="/logout" method="POST">
						<button type="submit" class="">Logout</button>
					</form>
				{:else}
					<a href="/login">Login</a>
				{/if}
			</li>
		</ul>
	</div>
</div>

<!-- <h1>SvelteKit & Supabase Auth</h1>
{#if data.session}
	<p>Welcome, {data.session.user.email}</p>
	<form action="/logout" method="POST">
		<button type="submit" class="btn btn-primary">Logout</button>
	</form>
{:else}
	<p>Let's learn how to register and login users!</p>
	<div class="">
		<a href="/login" class="btn btn-primary">Login</a>
	</div>
{/if} -->

<div class="z-0 flex min-h-screen flex-col">
	<slot />
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #2775af 0%, #83c3e8 100%);
		background-color: #83c3e8;
	}
</style>

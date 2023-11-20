<script lang="ts">
	import logo from '$lib/images/logo.png';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { redirect } from '@sveltejs/kit';
	import { UserCircle2 } from 'lucide-svelte';

	export let supabase: SupabaseClient;
	export let session: Session;

	async function signOut() {
		const { error } = await supabase.auth.signOut();

		// TODO: Actual error handling
		if (error) {
			console.log(`Error signing out: ${error}`);
		}
	}
</script>

<div class="navbar bg-red-950 font-display-sans">
	<div class="flex-1">
		<a href="/">
			<img class="mr-4 w-14" src={logo} alt="ideahacks" />
		</a>
		<a href="/sponsor-us" class="text-sm hover:text-primary md:text-lg">Sponsor Us!</a>
	</div>
	<a href="https://2023.ideahacks.la" class="text-sm hover:text-primary md:text-lg"
		>Looking for last year's website?</a
	>
	{#if session}
		<details class="dropdown">
			<summary class="btn m-1"><UserCircle2 /></summary>
			<ul class="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
				<li>Logged in as {session?.user.email}</li>
				<li><button on:click={signOut}>Logout</button></li>
			</ul>
		</details>
	{:else}
		<a href="/login" class="btn btn-primary">Login</a>
	{/if}
</div>

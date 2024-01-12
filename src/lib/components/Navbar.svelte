<script lang="ts">
	import logo from '$lib/images/logo.png';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { LogOut, Mail, UserCircle2 } from 'lucide-svelte';

	export let supabase: SupabaseClient;
	export let session: Session;

	async function isAdmin() {
		const { data, error } = await supabase.from('admins').select();

		if (error) {
			console.log(`Error checking if user is admin: ${error}`);
		}

		return data && data.length > 0;
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut();

		// TODO: Actual error handling
		if (error) {
			console.log(`Error signing out: ${error}`);
		}
	}
</script>

<div class="navbar bg-red-950 font-display-sans font-bold">
	<div class="flex-1">
		<a href="/">
			<img class="mr-4 w-14" src={logo} alt="ideahacks" />
		</a>
	</div>
	<ul class="mr-4">
		{#await isAdmin() then isAdmin}
			{#if isAdmin}
				<li>
					<a href="/admin" class="mr-4">Admin</a>
				</li>
			{/if}
		{/await}
		<li>
			<a href="/parts" class="mr-4">Parts</a>
		</li>
		{#if session}
			<li>
				<details class="dropdown dropdown-end">
					<summary class="btn btn-circle btn-primary"><UserCircle2 /></summary>
					<ul class="menu dropdown-content rounded-box bg-red-950 text-xl shadow-xl">
						<a href="/login">
							<li>
								<span>
									<Mail />
									{session?.user.email}
								</span>
							</li>
							<li><button on:click={signOut}><LogOut /> Sign out</button></li>
						</a>
					</ul>
				</details>
			</li>
		{:else}
			<a href="/login" class="btn btn-primary">Login</a>
		{/if}
	</ul>
</div>

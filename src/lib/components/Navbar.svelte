<script lang="ts">
	import logo from '$lib/images/logo.png';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { LogOut, Mail, UserCircle2 } from 'lucide-svelte';

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
	</div>
	{#if session}
		<ul class="mr-4">
			<li>
				<a href="/apply" class="mr-4">Apply</a>
			</li>
			<li>
				<details class="dropdown-end dropdown">
					<summary class="btn-primary btn-circle btn"><UserCircle2 /></summary>
					<ul class="dropdown-content menu rounded-box bg-red-950 text-xl shadow-xl">
						<li>
							<span>
								<Mail />
								{session?.user.email}
							</span>
						</li>
						<li><button on:click={signOut}><LogOut /> Sign out</button></li>
					</ul>
				</details>
			</li>
		</ul>
	{:else}
		<a href="/login" class="btn-primary btn">Login</a>
	{/if}
</div>

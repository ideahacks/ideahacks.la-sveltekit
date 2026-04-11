<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	async function handleLogout() {
		await supabaseClient.auth.signOut();
		goto('/');
	}

	function gotoTeamCreation() {
		console.log("clicked");
		goto('/dashboard/createTeam');
	}

	function gotoTeamLookUp() {
		console.log("clicked");
		goto('/dashboard/joinTeam');
	}

</script>

<NavBar />

<!-- Explicit scroll container: fixed height + overflow-y-auto so content scrolls regardless of layout quirks -->
<div class="dashboard-page-scroll h-screen overflow-y-auto overflow-x-hidden">
	<div class="flex min-h-full flex-col items-center pt-16 pb-8">
		<div class="max-w-4xl w-full px-4 py-8">
			<div class="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
			<h1 class="text-4xl font-bold text-white mb-6 font-mono uppercase tracking-wider">
				Dashboard
			</h1>

			<div class="space-y-6">
				{#if !data.hasApplied}
				<!-- Apply Button Section -->
				<div class="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg p-8 border-2 border-cyan-500/30">
					<div class="text-center">
						<h2 class="text-3xl font-bold text-white mb-4 font-mono uppercase tracking-wider">
							Ready to Apply?
						</h2>
						<p class="text-white/80 mb-6">
							Fill out the application form to join IDEA Hacks 2026
						</p>
						<a
							href="/dashboard/apply"
							class="inline-block px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 font-mono uppercase tracking-wider text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
						>
							APPLY HERE
						</a>
					</div>
				</div>
				{:else}
				<!-- Application Status Section -->
				<div class="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
					<div class="text-center">
						<h2 class="text-3xl font-bold text-white mb-4 font-mono uppercase tracking-wider">
							Application Status
						</h2>

						{#if data.status === 'submitted'}
							<p class="text-yellow-300 text-xl font-semibold">
								Submitted — under review
							</p>
						{:else if data.status === 'accepted'}
							<p class="text-green-400 text-xl font-semibold">
								Accepted 🎉
							</p>
						{:else if data.status === 'rejected'}
							<p class="text-red-400 text-xl font-semibold">
								Not accepted
							</p>
						{/if}
					</div>
				</div>
			{/if}

				<!-- Welcome Section -->
				<div class="bg-white/5 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-white mb-2 font-mono">
						Welcome, {data.session?.user?.email}!
					</h2>
						<p class="text-white/80">
							You're successfully logged in to your IDEA Hacks dashboard.
						</p>
				</div>

				<!-- Team Section -->
				{#if data.status === 'accepted'}
				<div class = "bg-white/5 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-white mb-2 font-mono">
						Team Status
					</h2> 
					{#if data.teamStatus == "No Team"}
					<div class = "flex flex-col gap-4">
						<p class="text-white/80">
							You currently don't have a team!
						</p>
						<div class="flex gap-4">
							<button
							onclick={gotoTeamCreation}
							class="px-6 py-2 border border-white/50 text-white rounded-lg 
							transition-colors duration-200 font-mono uppercase tracking-wider
							hover:bg-white hover:text-black">
								Create team
							</button>
							<button
							onclick={gotoTeamLookUp}
							class="px-6 py-2 border border-white/50 text-white rounded-lg 
							transition-colors duration-200 font-mono uppercase tracking-wider
							hover:bg-white hover:text-black">
								Join existing team
							</button>	
						</div>
					</div>
					{/if}
				</div>
				{/if}

				<!-- User Info Section -->
				<div class="bg-white/5 rounded-lg p-6">
					<h3 class="text-xl font-semibold text-white mb-4 font-mono uppercase">
						Account Information
					</h3>
					<div class="space-y-2 text-white/90">
						<p><strong>Email:</strong> {data.session?.user?.email}</p>
						<p><strong>User ID:</strong> {data.session?.user?.id}</p>
						<p><strong>Team Status:</strong> {data.teamStatus}</p>
					</div>
				</div>

				<!-- Actions Section -->
				<div class="bg-white/5 rounded-lg p-6">
					<h3 class="text-xl font-semibold text-white mb-4 font-mono uppercase">
						Actions
					</h3>
					<div class="flex gap-4">
						<button
							onclick={handleLogout}
							class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider"
						>
							Logout
						</button>
					</div>
				</div>
			</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard-page-scroll {
		-webkit-overflow-scrolling: touch;
	}
</style>

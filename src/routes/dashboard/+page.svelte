<script lang="ts">
	import Fonts2027 from '$lib/components/Fonts2027.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let logoutError = $state(false);

	async function handleLogout() {
		const { error } = await supabaseClient.auth.signOut();
		logoutError = Boolean(error);
		if (!error) await goto('/');
	}
</script>

<Fonts2027 />

<NavBar portal2027 />

<!-- Explicit scroll container: fixed height + overflow-y-auto so content scrolls regardless of layout quirks -->
<div class="dashboard-page-scroll h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#3FA9FF] to-[#BBD98D] font-inter text-[#064471]">
	<div class="flex min-h-full flex-col items-center pt-16 pb-8">
		<div class="max-w-4xl w-full px-4 py-8">
			<div class="rounded-lg border border-[#0068BD]/20 bg-white p-8 shadow-lg shadow-[#0068BD]/20">
				<h1 class="mb-6 font-jaro text-4xl uppercase tracking-wide text-[#0068BD]">
					Dashboard
				</h1>

				<div class="space-y-6">
					{#if !data.application}
						{#if data.applicationWindow === 'open'}
							<!-- Apply Button Section -->
							<div
								class="rounded-lg border-2 border-[#0068BD]/20 bg-[#3FA9FF]/20 p-8">
								<div class="text-center">
									<a
										href="/dashboard/apply"
										class="inline-block px-12 py-4 rounded-lg border border-[#0068BD] bg-[#FFF385] text-[#064471] transition-all duration-200 hover:bg-[#BBD98D] font-jetbrains uppercase tracking-wider text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
									>
										APPLY HERE
									</a>
								</div>
							</div>
						{:else if data.applicationWindow === 'upcoming'}
							<p>Applications have not opened yet.</p>
						{:else}
							<p class="text-[#064471]">
									Applications for IDEA Hacks 2027 are now closed. If you have any questions, please
									reach out to us on
									<a
										href="https://discord.com/invite/XFkxmCwME5"
										class="font-semibold text-[#0068BD] underline underline-offset-2 hover:text-[#064471]">Discord</a
									>.
								</p>
						{/if}
					{:else}
						<!-- Application Status Section -->
						<div class="rounded-lg border border-[#0068BD]/20 bg-[#BBD98D]/30 p-3 md:p-4">
							<div class="text-center">
								<h2 class="mb-1 font-jetbrains text-xl font-bold uppercase tracking-wide text-[#064471]">
									Application Status
								</h2>

								{#if data.application.status === 'submitted'}
									<p class="text-amber-800 text-md font-semibold">Submitted — under review</p>
								{:else if data.application.status === 'accepted'}
									<p class="text-green-800 text-md font-semibold">Accepted 🎉</p>
								{:else if data.application. status === 'rejected'}
									<p class="text-red-700 text-md font-semibold">Not accepted</p>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Welcome Section -->
					<div class="rounded-lg bg-[#BBD98D]/30 p-6">
						<h2 class="mb-2 font-jetbrains text-2xl font-semibold text-[#064471]">
							Welcome, {data.application?.name ?? data.session?.user?.email}!
						</h2>
						<p class="text-[#064471]">You're successfully logged in to your IDEA Hacks dashboard.</p>
					</div>



					<!-- User Info Section -->
					<div class="rounded-lg bg-[#BBD98D]/30 p-6">
						<h3 class="mb-4 font-jetbrains text-xl font-semibold uppercase text-[#064471]">
							Account Information
						</h3>
						<div class="space-y-2 text-[#064471]">
							<p><strong>Email:</strong> {data.session?.user?.email}</p>
							<!--<p><strong>Team Status:</strong> {data.teamStatus}</p> -->
						</div>
					</div>

					<!-- Actions Section -->
					<div class="rounded-lg bg-[#BBD98D]/30 p-6">
						<h3 class="mb-4 font-jetbrains text-xl font-semibold uppercase text-[#064471]">Actions</h3>
						<div class="flex gap-4">
							<button
								onclick={handleLogout}
								class="px-6 py-2 rounded-lg border border-[#0068BD] bg-white text-[#0068BD] transition-colors duration-200 hover:bg-[#3FA9FF]/20 font-jetbrains uppercase tracking-wider"
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

<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();

	// layout-only state (no Supabase / no actions yet)
	let teamName = '';

	// mock results for layout preview (replace with real search results later)
	

	function handleCancel() {
		goto('/dashboard');
	}


	type Participant = { uid: string, full_name: string };

	let participantQuery = $state('');

	const participantResults: Participant[] = [
		{ uid:'1' ,full_name: 'Avery Nguyen' },
		{ uid:'2' ,full_name: 'Jordan Patel' },
		{  uid:'3' ,full_name: 'Sam Rivera' },
		{  uid:'4' ,full_name: 'Sophia Coulsell' }
	];

	const filteredParticipants = $derived.by(() => {
		const q = participantQuery.trim().toLowerCase();
		if (!q) return [];

		const score = (name: string) => {
			const n = name.toLowerCase();
			if (n === q) return 0; // exact
			if (n.startsWith(q)) return 1; // prefix
			const idx = n.indexOf(q);
			if (idx >= 0) return 2 + idx / 100; // contains
			return 9999;
		};

		return participantResults
			.map((p) => ({ p, s: score(p.full_name) }))
			.filter((x) => x.s < 9999)
			.sort((a, b) => a.s - b.s || a.p.full_name.localeCompare(b.p.full_name))
			.map((x) => x.p);
	});

	let stagedInvites = $state<Participant[]>([]);


	function stageInvite(p: Participant) {
	if (!stagedInvites.find(i => i.uid === p.uid)) {
		stagedInvites = [...stagedInvites, p];
	}
}

</script>

<NavBar />

<div class="dashboard-page-scroll h-screen overflow-y-auto overflow-x-hidden">
	<div class="flex min-h-full flex-col items-center pt-16 pb-8">
		<div class="max-w-4xl w-full px-4 py-8">
			<div class="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
				<div class="flex items-start justify-between gap-4">
					<div>
						<h1 class="text-4xl font-bold text-white mb-2 font-mono uppercase tracking-wider">
							Create Team
						</h1>
						<p class="text-white/80">
							Name your team and invite participants.
						</p>
					</div>

					<!-- Optional status chip area -->
					<div class="hidden sm:block">
						<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-white/30 text-white/90 bg-white/5">
							IDEA Hacks 2026
						</span>
					</div>
				</div>

				<div class="space-y-6 mt-8">
					<!-- Team Name Card -->
					<div class="bg-white/5 rounded-lg p-6 border border-white/10">
						<h2 class="text-2xl font-semibold text-white mb-4 font-mono uppercase tracking-wider">
							Team Name
						</h2>

						<label class="block text-white/80 font-mono mb-2">
							Enter a team name
						</label>

						<input
							bind:value={teamName}
							placeholder="e.g., Silicon Divas"
							class="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/30 text-white placeholder:text-white/40
							focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
						/>
					</div>

					<!-- Invite Participants Card -->
					<div class="bg-white/5 rounded-lg p-6 border border-white/10">
						<div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
							<div>
								<h2 class="text-2xl font-semibold text-white mb-2 font-mono uppercase tracking-wider">
									Invite Participants
								</h2>
								<p class="text-white/70">
									Search by full name, then send an invite.
								</p>
							</div>

							<!-- Optional small helper badge -->
							<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border border-white/30 text-white/90 bg-white/5">
								Search
							</span>
						</div>

						<div class="mt-6 space-y-4">
							<!-- Search input -->
							<div>
								<label class="block text-white/80 font-mono mb-2">
									Participant search
								</label>

								<div class="flex flex-col sm:flex-row gap-3">
									<input
										bind:value={participantQuery}
										placeholder="Type a full name…"
										class="flex-1 px-4 py-3 rounded-lg bg-black/30 border border-white/30 text-white placeholder:text-white/40
										focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40"
									/>
								</div>

								<p class="text-white/50 text-sm mt-2">
									Results will appear below. You can filter to accepted participants later.
								</p>
							</div>

							<!-- Results list -->
							<div class="bg-black/20 rounded-lg border border-white/10 overflow-hidden">
								<div class="px-4 py-3 border-b border-white/10">
									<p class="text-white/80 font-mono uppercase tracking-wider text-sm">
										Results
									</p>
								</div>

								<ul class="divide-y divide-white/10">
									{#if !participantQuery.trim()}
										<!-- Show nothing OR helper text -->
										<li class="px-4 py-4 text-white/60 text-sm">
										Start typing a name to search participants.
										</li>
									{:else if filteredParticipants.length === 0}
										<li class="px-4 py-4">
											<p class="text-white/70">
												No matches for “{participantQuery}”.
											</p>
										</li>
									{:else}
										{#each filteredParticipants as p}
											<li class="px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
												<div>
													<p class="text-white font-semibold">{p.full_name}</p>
												</div>
								
												<div class="flex gap-3">
													<button
														onclick={() => stageInvite(p)}
														disabled={stagedInvites.some(i => i.uid === p.uid)}
														class={`px-5 py-2 rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider
															${stagedInvites.some(i => i.uid === p.uid)
																? 'bg-white/10 text-white/50 border border-white/10 cursor-not-allowed'
																: 'border border-white/50 text-white hover:bg-white hover:text-black'}`}
													>
														Invite
													</button>
								
													<button
														type="button"
														class="px-5 py-2 border border-white/20 text-white/80 rounded-lg
														transition-colors duration-200 font-mono uppercase tracking-wider
														hover:border-white/40 hover:text-white"
													>
														View
													</button>
												</div>
											</li>
										{/each}
									{/if}
								</ul>
							</div>

							<!-- Invite status placeholder -->
							<div class="rounded-lg border border-white/10 bg-white/5 p-4">
								<h3 class="text-white font-mono uppercase tracking-wider text-sm mb-3">
									Invites to be Sent
								</h3>
							
								{#if stagedInvites.length === 0}
									<p class="text-white/70 text-sm">
										No invites selected yet.
									</p>
								{:else}
									<ul class="space-y-2">
										{#each stagedInvites as p}
											<li class="flex items-center justify-between">
												<p class="text-white/90 text-sm">{p.full_name}</p>
												<span class="text-xs font-mono uppercase tracking-wider text-yellow-300">
													Queued
												</span>
											</li>
										{/each}
									</ul>
								{/if}
							</div>
						</div>
					</div>

					<!-- Bottom Actions -->
					<div class="bg-white/5 rounded-lg p-6 border border-white/10">
						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<p class="text-white/70">
								Once your team is created, you can manage invites and members from the dashboard.
							</p>

							<div class="flex flex-wrap gap-3">
								<!-- Layout-only buttons -->
								<button
									type="button"
									class="px-6 py-2 border border-white/50 text-white rounded-lg
									transition-colors duration-200 font-mono uppercase tracking-wider
									hover:bg-white hover:text-black"
								>
									Create Team
								</button>

								<button
									onclick={handleCancel}
									class="px-6 py-2 border border-white/20 text-white/80 rounded-lg
									transition-colors duration-200 font-mono uppercase tracking-wider
									hover:border-white/40 hover:text-white"
								>
									Cancel
								</button>
							</div>
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
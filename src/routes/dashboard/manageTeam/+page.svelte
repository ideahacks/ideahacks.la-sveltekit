<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';

	let { data, form }: { data: PageData; form: any } = $props();
	

	
	

	// mock results for layout preview (replace with real search results later)
	
	type Participant = { uid: string, full_name: string };

	let participantQuery = $state('');
	let stagedInvites = $state<Participant[]>([]);

	const participantResults: Participant[] = data.participants
	.filter((p: any) => p.id !== data.session.user.id)
	.filter((p: any) => !data.pendingSentInvites.some((inv: any) => inv.invitee_uid === p.id))
	.map((p: any) => ({
		uid: p.id,
		full_name: p.full_name
	}));
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

	


	function stageInvite(p: Participant) {
		if (!stagedInvites.find(i => i.uid === p.uid)) {
			stagedInvites = [...stagedInvites, p];
		}	
	}


	function removeInvite(uid: string) {
		stagedInvites = stagedInvites.filter((p) => p.uid !== uid);
	}

	function handleCancel() {
		goto('/dashboard');
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
                            Manage Team
                        </h1>
                        <p class="text-white/80">
                            Invite participants to join {data.teamName}.
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
					<div class="bg-white/5 rounded-lg p-6 border border-white/10">
                        <h2 class="text-2xl font-semibold text-white mb-4 font-mono uppercase tracking-wider">
                            Current Team
                        </h2>
                    
                        <p class="text-white/80">
                            Managing invites for
                            <span class="text-white font-semibold">{data.teamName}</span>
                        </p>
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
												<button
						type="button"
						onclick={() => removeInvite(p.uid)}
						aria-label={`Remove ${p.full_name}`}
						class="shrink-0 px-3 py-1 border border-white/30 text-white/80 rounded-lg
						transition-colors duration-200 font-mono uppercase tracking-wider
						hover:border-white/60 hover:text-white hover:bg-white/10"
					>
						✕
					</button>
											</li>
										{/each}
									</ul>
								{/if}
							</div>
						</div>
					</div>

                    <div class="bg-white/5 rounded-lg p-6 border border-white/10">
                        <h2 class="text-2xl font-semibold text-white mb-4 font-mono uppercase tracking-wider">
                            Sent Invites
                        </h2>
                    
                        {#if data.pendingSentInvites.length === 0}
                            <p class="text-white/70">
                                No pending invites yet.
                            </p>
                        {:else}
                            <ul class="space-y-2">
                                {#each data.pendingSentInvites as invite}
                                    <li class="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 px-4 py-3">
                                        <span class="text-white">
                                            {invite.applications_2026?.name ?? invite.invitee_uid}
                                        </span>
                                        <span class="text-white/40 text-sm font-mono uppercase">
                                            {invite.status}
                                        </span>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </div>

					<!-- Bottom Actions -->
					<div class="bg-white/5 rounded-lg p-6 border border-white/10">
						<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<p class="text-white/70">
                                Send invites to accepted participants who are not already on a team.
                            </p>

							<form method="POST" action="?/sendInvites" class="flex flex-wrap gap-3">
                                <input
                                    type="hidden"
                                    name="invitee_uids"
                                    value={JSON.stringify(stagedInvites.map((p) => p.uid))}
                                />
                            
                                <button
                                    type="submit"
                                    class="px-6 py-2 border border-white/50 text-white rounded-lg
                                    transition-colors duration-200 font-mono uppercase tracking-wider
                                    hover:bg-white hover:text-black"
                                >
                                    Send Invites
                                </button>
							
								<button
									type="button"
									onclick={handleCancel}
									class="px-6 py-2 border border-white/20 text-white/80 rounded-lg
									transition-colors duration-200 font-mono uppercase tracking-wider
									hover:border-white/40 hover:text-white"
								>
									Go Back
								</button>
							</form>
						</div>
						{#if form?.error}
							<p class="text-red-300 text-sm mt-4">
								{form.error}
							</p>
						{/if}
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
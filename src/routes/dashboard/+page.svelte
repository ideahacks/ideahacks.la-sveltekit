<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto, invalidate } from '$app/navigation';
	import type { PageData } from './$types';
	import type { AngryIcon } from 'lucide-svelte';

	let { data, form }: { data: PageData; form: any } = $props();

	async function handleLogout() {
		await supabaseClient.auth.signOut();
		goto('/');
	}

	function gotoTeamCreation() {
		console.log('clicked');
		goto('/dashboard/createTeam');
	}

	function gotoTeamLookUp() {
		console.log('clicked');
		goto('/dashboard/joinTeam');
	}

	function gotoManageTeam() {
		goto('/dashboard/manageTeam');
	}

	let showError = $state(false);

	$effect(() => {
		if (form?.error) {
			showError = true;

			const timer = setTimeout(() => {
				showError = false;
			}, 5000);

			return () => clearTimeout(timer);
		}
	});

	let showLeaveConfirm = $state(false);
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
						<div
							class="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-lg p-8 border-2 border-cyan-500/30"
						>
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
									<p class="text-yellow-300 text-xl font-semibold">Submitted — under review</p>
								{:else if data.status === 'accepted'}
									<p class="text-green-400 text-xl font-semibold">Accepted 🎉</p>
								{:else if data.status === 'rejected'}
									<p class="text-red-400 text-xl font-semibold">Not accepted</p>
								{/if}
							</div>
						</div>
					{/if}

					<!-- Welcome Section -->
					<div class="bg-white/5 rounded-lg p-6">
						<h2 class="text-2xl font-semibold text-white mb-2 font-mono">
							Welcome, {data.session?.user?.email}!
						</h2>
						<p class="text-white/80">You're successfully logged in to your IDEA Hacks dashboard.</p>
					</div>

					<!-- Team Section -->
					{#if data.status === 'accepted'}
						<div class="bg-white/5 rounded-lg p-6">
							<div class="flex items-center justify-between mb-2">
								<h2 class="text-2xl font-semibold text-white font-mono">Team Status</h2>

								{#if data.teamStatus == 'In Team'}
									<div class="flex gap-3">
										{#if data.myTeamRole === 'owner'}
											<button
												type="button"
												onclick={gotoManageTeam}
												class="px-6 py-2 border border-white/50 text-white rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider hover:bg-white hover:text-black"
											>
												Manage Team
											</button>
										{/if}

										<button
											type="button"
											onclick={() => (showLeaveConfirm = true)}
											class="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider"
										>
											Leave Team
										</button>
									</div>
								{/if}
							</div>

							{#if showLeaveConfirm && data.teamStatus == 'In Team'}
								<div class="bg-red-500/10 border border-red-300/30 rounded-lg p-4 mt-3 mb-4">
									<p class="text-red-200 mb-4">
										Are you sure you want to leave
										<span class="font-semibold text-white">{data.teamName}</span>?
									</p>

									<div class="flex gap-3">
										<form method="POST" action="?/leaveTeam">
											<button
												type="submit"
												class="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider"
											>
												Yes, Leave
											</button>
										</form>

										<button
											type="button"
											onclick={() => (showLeaveConfirm = false)}
											class="px-5 py-2 border border-white/20 text-white/80 rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider hover:border-white/40 hover:text-white"
										>
											Cancel
										</button>
									</div>
								</div>
							{/if}

							{#if data.teamStatus == 'No Team'}
								<div class="flex flex-col gap-4">
									<p class="text-white/80">You currently don't have a team!</p>
									<div class="flex gap-4">
										<button
											onclick={gotoTeamCreation}
											class="px-6 py-2 border border-white/50 text-white rounded-lg
						transition-colors duration-200 font-mono uppercase tracking-wider
						hover:bg-white hover:text-black"
										>
											Create team
										</button>
										<button
											onclick={gotoTeamLookUp}
											class="px-6 py-2 border border-white/50 text-white rounded-lg
						transition-colors duration-200 font-mono uppercase tracking-wider
						hover:bg-white hover:text-black"
										>
											Join existing team
										</button>
									</div>
								</div>
							{/if}

							{#if data.teamStatus == 'In Team'}
								<div class="flex flex-col gap-4">
									<p class="text-white/80">
										Team: <span class="text-white font-semibold">{data.teamName}</span>
									</p>

									{#if data.teamMembers.length > 0}
										<div class="bg-white/5 rounded-lg border border-white/10 p-4">
											<h3
												class="text-lg font-semibold text-white mb-3 font-mono uppercase tracking-wider"
											>
												Team Members
											</h3>

											<ul class="space-y-2">
												{#each data.teamMembers as member}
													<li
														class="bg-black/20 rounded-lg border border-white/10 px-4 py-3 text-white flex items-center justify-between"
													>
														<span>{member.applications_2026?.name ?? member.uid}</span>
														<span class="text-white/40 text-sm font-mono uppercase">
															{member.role}
														</span>
													</li>
												{/each}
											</ul>
										</div>
									{:else}
										<p class="text-white/80">No other team members yet.</p>
									{/if}
								</div>
							{/if}

							{#if data.receivedInvites.length > 0}
								<div class="bg-white/5 rounded-lg p-6 border border-white/10 mt-4">
									<h3
										class="text-xl font-semibold text-white mb-4 font-mono uppercase tracking-wider"
									>
										Pending Invites
									</h3>

									<ul class="space-y-3">
										{#each data.receivedInvites as invite}
											<li
												class="bg-black/20 rounded-lg border border-white/10 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
											>
												<div>
													<p class="text-white">
														<strong>{invite.applications_2026?.name}</strong>
														invited you to join
														<strong>{invite.teams_2026?.team_name}</strong>
													</p>
													<p class="text-white/50 text-sm mt-1">
														Status: {invite.status}
													</p>
												</div>

												<div class="flex gap-3">
													<form method="POST" action="?/acceptInvite">
														<input type="hidden" name="invite_id" value={invite.id} />
														<button
															type="submit"
															class="px-5 py-2 border border-white/50 text-white rounded-lg
										transition-colors duration-200 font-mono uppercase tracking-wider
										hover:bg-white hover:text-black"
														>
															Join
														</button>
													</form>

													<form method="POST" action="?/rejectInvite">
														<input type="hidden" name="invite_id" value={invite.id} />
														<button
															type="submit"
															class="px-4 py-2 border border-white/20 text-white/80 rounded-lg
										transition-colors duration-200 font-mono uppercase tracking-wider
										hover:border-white/40 hover:text-white"
														>
															✕
														</button>
													</form>
												</div>
											</li>
										{/each}
									</ul>
								</div>

								{#if showError && form?.error}
									<p class="text-red-300 text-sm mt-4">
										{form.error}
									</p>
								{/if}
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
						<h3 class="text-xl font-semibold text-white mb-4 font-mono uppercase">Actions</h3>
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

<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form?: ActionData } = $props();

	type TabKey = 'applications' | 'teams' | 'parts' | 'admins';
	type FilterMode = 'all' | 'accepted' | 'rejected' | 'pending';

	type ApplicationRecord = {
		uid: string;
		team_id?: number | string | null;
		status?: string | null;
		email?: string;
		name?: string | null;
		preferred_name?: string | null;
		[key: string]: unknown;
	};

	type TeamRecord = {
		id: number | string;
		team_name: string;
	};

	type TeamView = TeamRecord & {
		members: ApplicationRecord[];
		checkouts: TeamCheckoutRecord[];
	};

	type TeamCheckoutRecord = {
		team_id: number | string;
		part_id: string;
		part_name?: string | null;
		quantity: number;
	};

	type FoundPart = {
		part_id: string;
		name: string;
		quantity: number;
		num_in_use: number;
		alt_ids: string[];
		image_url: string | null;
	};

	type AdminRecord = {
		id: number;
		email: string;
		created_at: string | null;
	};

	const fieldLabels: Record<string, string> = {
		email: 'Email',
		name: 'Name',
		preferred_name: 'Preferred Name',
		pronouns: 'Pronouns',
		school: 'School',
		year: 'Year',
		transfer: 'Transfer',
		major: 'Major',
		prior_engineering_experience: 'Prior Engineering Experience',
		why_ideahacks: 'Why IDEA Hacks',
		hackathon_ideas: 'Hackathon Ideas',
		prior_hackathon_experience: 'Prior Hackathon Experience',
		suggested_parts: 'Suggested Parts',
		shirt_size: 'Shirt Size',
		dietary_restrictions: 'Dietary Restrictions',
		status: 'Status',
		created_at: 'Submitted At'
	};

	const longTextFields = [
		'prior_engineering_experience',
		'why_ideahacks',
		'hackathon_ideas',
		'prior_hackathon_experience',
		'suggested_parts'
	];

	const orderedKeys = [
		'name',
		'preferred_name',
		'email',
		'pronouns',
		'school',
		'year',
		'transfer',
		'major',
		'prior_engineering_experience',
		'why_ideahacks',
		'hackathon_ideas',
		'prior_hackathon_experience',
		'suggested_parts',
		'shirt_size',
		'dietary_restrictions',
		'status',
		'created_at'
	];

	const filterOptions: Array<{ mode: FilterMode; label: string }> = [
		{ mode: 'all', label: 'All' },
		{ mode: 'accepted', label: 'Accepted' },
		{ mode: 'rejected', label: 'Rejected' },
		{ mode: 'pending', label: 'Pending' }
	];

	const tabOptions: Array<{ key: TabKey; label: string }> = [
		{ key: 'applications', label: 'Applications' },
		{ key: 'teams', label: 'Teams' },
		{ key: 'parts', label: 'Parts Checkout' },
		{ key: 'admins', label: 'Admins' }
	];

	let activeTab = $state<TabKey>(
		form?.adminAddError || form?.adminAddSuccess
			? 'admins'
			: form?.teamDeleteError || form?.teamDeleteSuccess
				? 'teams'
				: form?.returnCheckoutError || form?.returnCheckoutSuccess
					? 'teams'
					: form?.foundPart ||
						  form?.lookupError ||
						  form?.lookupSuccess ||
						  form?.checkoutError ||
						  form?.checkoutSuccess
						? 'parts'
						: 'applications'
	);
	let filterMode = $state<FilterMode>('all');
	let collapsedUids = $state<string[]>([]);

	function getStatus(app: { status?: string | null }): 'accepted' | 'rejected' | 'pending' {
		if (app.status === 'accepted') return 'accepted';
		if (app.status === 'rejected') return 'rejected';
		return 'pending';
	}

	function matchesFilter(app: { status?: string | null }): boolean {
		const status = getStatus(app);
		switch (filterMode) {
			case 'accepted':
				return status === 'accepted';
			case 'rejected':
				return status === 'rejected';
			case 'pending':
				return status === 'pending';
			default:
				return true;
		}
	}

	function toggleCollapsed(uid: string): void {
		collapsedUids = collapsedUids.includes(uid)
			? collapsedUids.filter((currentUid) => currentUid !== uid)
			: [...collapsedUids, uid];
	}

	function setCollapsedForVisible(shouldCollapse: boolean): void {
		const visibleUids = filteredApplications.map((app: ApplicationRecord) => app.uid);
		collapsedUids = shouldCollapse ? visibleUids : [];
	}

	const applications = $derived((data.applications ?? []) as ApplicationRecord[]);

	let filteredApplications = $derived(
		applications.filter((app: ApplicationRecord) => matchesFilter(app))
	);

	let allVisibleCollapsed = $derived(
		filteredApplications.length > 0 &&
			filteredApplications.every((app: ApplicationRecord) => collapsedUids.includes(app.uid))
	);

	let counts = $derived(
		applications.reduce(
			(acc: { accepted: number; rejected: number; pending: number }, app: ApplicationRecord) => {
				const status = getStatus(app);
				acc[status] += 1;
				return acc;
			},
			{ accepted: 0, rejected: 0, pending: 0 }
		)
	);

	let teamsView = $derived(
		(() => {
			const checkouts = (data.teamCheckouts ?? []) as TeamCheckoutRecord[];
			const checkoutsByTeam = new Map<string, TeamCheckoutRecord[]>();

			for (const checkout of checkouts) {
				const key = String(checkout.team_id);
				const existing = checkoutsByTeam.get(key) ?? [];
				existing.push(checkout);
				checkoutsByTeam.set(key, existing);
			}

			return ((data.teams ?? []) as TeamRecord[])
				.map((team: TeamRecord) => ({
					...team,
					members: applications.filter(
						(app: ApplicationRecord) => String(app.team_id ?? '') === String(team.id)
					),
					checkouts: checkoutsByTeam.get(String(team.id)) ?? []
				}))
				.sort((left: TeamView, right: TeamView) => left.team_name.localeCompare(right.team_name));
		})()
	);

	let partLookupId = $derived((form?.partLookupId as string | undefined) ?? '');
	let foundPart = $derived((form?.foundPart as FoundPart | null | undefined) ?? null);
	let admins = $derived((data.admins ?? []) as AdminRecord[]);

	function formatValue(key: string, value: unknown): string {
		if (value == null) return '—';
		if (key === 'created_at' && typeof value === 'string') {
			try {
				return new Date(value).toLocaleString();
			} catch {
				return String(value);
			}
		}
		return String(value);
	}
</script>

<NavBar />

<div class="admin-page-scroll h-screen overflow-y-auto overflow-x-hidden">
	<div class="flex min-h-full flex-col items-center pt-16 pb-16">
		<div class="max-w-5xl w-full px-4 py-8">
			<div class="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
				<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
					<div>
						<h1 class="text-4xl font-bold text-white mb-2 font-mono uppercase tracking-wider">
							Admin Dashboard
						</h1>
					</div>
					<div class="flex flex-wrap gap-2">
						{#each tabOptions as tab}
							<button
								type="button"
								onclick={() => (activeTab = tab.key)}
								class={`px-4 py-2 rounded-lg border text-sm font-mono uppercase tracking-wider transition-colors ${
									activeTab === tab.key
										? 'bg-white text-slate-900 border-white'
										: 'bg-white/5 text-white border-white/15 hover:bg-white/10'
								}`}
							>
								{tab.label}
							</button>
						{/each}
					</div>
				</div>

				{#if data.error}
					<div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
						<p class="text-red-200">{data.error}</p>
					</div>
				{/if}

				{#if activeTab === 'applications'}
					{#if form?.error}
						<div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
							<p class="text-red-200">{form.error}</p>
						</div>
					{/if}

					{#if form?.success}
						<div class="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6">
							<p class="text-green-200">Application {form.action} successfully.</p>
						</div>
					{/if}

					<div class="grid gap-4 md:grid-cols-3 mb-6">
						<div class="rounded-lg border border-white/15 bg-white/5 p-4">
							<p class="text-white/60 font-mono uppercase tracking-wider text-xs mb-1">Accepted</p>
							<p class="text-2xl font-bold text-green-200">{counts.accepted}</p>
						</div>
						<div class="rounded-lg border border-white/15 bg-white/5 p-4">
							<p class="text-white/60 font-mono uppercase tracking-wider text-xs mb-1">Rejected</p>
							<p class="text-2xl font-bold text-red-200">{counts.rejected}</p>
						</div>
						<div class="rounded-lg border border-white/15 bg-white/5 p-4">
							<p class="text-white/60 font-mono uppercase tracking-wider text-xs mb-1">Pending</p>
							<p class="text-2xl font-bold text-yellow-200">{counts.pending}</p>
						</div>
					</div>

					<div class="flex flex-wrap items-center gap-3 mb-6">
						<span class="text-white/60 font-mono uppercase tracking-wider text-xs">Filter</span>
						<div class="flex flex-wrap gap-2">
							{#each filterOptions as option}
								<button
									type="button"
									onclick={() => (filterMode = option.mode)}
									class={`px-3 py-2 rounded-lg border text-sm font-mono uppercase tracking-wider transition-colors ${
										filterMode === option.mode
											? 'bg-white text-slate-900 border-white'
											: 'bg-white/5 text-white border-white/15 hover:bg-white/10'
									}`}
								>
									{option.label}
								</button>
							{/each}
						</div>
						<button
							type="button"
							onclick={() => setCollapsedForVisible(!allVisibleCollapsed)}
							class="ml-auto px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-white text-sm font-mono uppercase tracking-wider hover:bg-white/10"
						>
							{allVisibleCollapsed ? 'Expand all' : 'Collapse all'}
						</button>
					</div>

					{#if !applications.length}
						<p class="text-white/80">No applications yet.</p>
					{:else if !filteredApplications.length}
						<p class="text-white/80">No applications match the selected filter.</p>
					{:else}
						<div class="space-y-8">
							{#each filteredApplications as app}
								<div
									class="bg-white/5 rounded-lg border border-white/20 overflow-hidden"
									data-uid={app.uid}
								>
									<div
										class="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10"
									>
										<div>
											<span class="text-white font-semibold font-mono">{app.name ?? app.email}</span
											>
											{#if app.preferred_name}
												<span class="text-white/70 font-mono ml-2">({app.preferred_name})</span>
											{/if}
											<span class="text-white/60 text-sm block mt-1">{app.email}</span>
										</div>
										<div class="flex flex-wrap items-center gap-3">
											<span
												class="px-3 py-1 rounded-full text-sm font-mono uppercase
												{getStatus(app) === 'accepted'
													? 'bg-green-500/30 text-green-200'
													: getStatus(app) === 'rejected'
														? 'bg-red-500/30 text-red-200'
														: 'bg-yellow-500/30 text-yellow-200'}"
											>
												{getStatus(app)}
											</span>
											{#if app.status !== 'accepted'}
												<form method="POST" action="?/approve" use:enhance class="inline">
													<input type="hidden" name="uid" value={app.uid} />
													<button
														type="submit"
														class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-mono uppercase text-sm tracking-wider"
													>
														Approve
													</button>
												</form>
											{/if}
											{#if app.status !== 'rejected'}
												<form method="POST" action="?/reject" use:enhance class="inline">
													<input type="hidden" name="uid" value={app.uid} />
													<button
														type="submit"
														class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-mono uppercase text-sm tracking-wider"
													>
														Reject
													</button>
												</form>
											{/if}
											<button
												type="button"
												onclick={() => toggleCollapsed(app.uid)}
												class="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-mono uppercase text-sm tracking-wider border border-white/10"
											>
												{collapsedUids.includes(app.uid) ? 'Expand' : 'Collapse'}
											</button>
										</div>
									</div>

									{#if !collapsedUids.includes(app.uid)}
										<dl class="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
											{#each orderedKeys as key}
												{#if app[key] != null || key === 'status'}
													<div class={longTextFields.includes(key) ? 'md:col-span-2' : ''}>
														<dt class="text-white/60 font-mono uppercase tracking-wider mb-0.5">
															{fieldLabels[key] ?? key}
														</dt>
														<dd class="text-white/90 whitespace-pre-wrap break-words">
															{formatValue(key, app[key])}
														</dd>
													</div>
												{/if}
											{/each}
										</dl>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				{/if}

				{#if activeTab === 'teams'}
					<div class="space-y-4">
						<div class="rounded-lg border border-white/15 bg-white/5 p-4 mb-4">
							<h2 class="text-xl font-semibold text-white font-mono uppercase tracking-wider mb-2">
								Teams
							</h2>
							<p class="text-white/70">
								Teams are pulled from <span class="font-mono">teams_2026</span> and members are
								grouped from applications by <span class="font-mono">team_id</span>.
							</p>
						</div>

						{#if form?.returnCheckoutError}
							<div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
								<p class="text-red-200">{form.returnCheckoutError}</p>
							</div>
						{/if}

						{#if form?.returnCheckoutSuccess}
							<div class="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4">
								<p class="text-green-200">{form.returnCheckoutSuccess}</p>
							</div>
						{/if}

						{#if form?.teamDeleteError}
							<div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
								<p class="text-red-200">{form.teamDeleteError}</p>
							</div>
						{/if}

						{#if form?.teamDeleteSuccess}
							<div class="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4">
								<p class="text-green-200">{form.teamDeleteSuccess}</p>
							</div>
						{/if}

						{#if !((data.teams ?? []) as TeamRecord[]).length}
							<p class="text-white/80">No teams yet.</p>
						{:else}
							<div class="space-y-4">
								{#each teamsView as team}
									<div class="rounded-lg border border-white/15 bg-white/5 p-4">
										<div class="flex flex-wrap items-center justify-between gap-3 mb-3">
											<div>
												<h3 class="text-white font-semibold font-mono text-lg">{team.team_name}</h3>
												<p class="text-white/50 text-sm font-mono">Team ID: {team.id}</p>
											</div>
											<div class="flex flex-wrap items-center gap-2">
												<span
													class="px-3 py-1 rounded-full border border-white/15 text-white/70 text-sm font-mono uppercase tracking-wider"
												>
													{team.members.length} members
												</span>
												<form method="POST" action="?/deleteTeam" use:enhance>
													<input type="hidden" name="teamId" value={String(team.id)} />
													<button
														type="submit"
														class="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono uppercase tracking-wider text-xs"
													>
														Delete Team
													</button>
												</form>
											</div>
										</div>

										{#if team.members.length}
											<ul class="grid gap-2 md:grid-cols-2">
												{#each team.members as member}
													<li
														class="rounded-md border border-white/10 bg-black/10 px-3 py-2 text-white/85"
													>
														{member.name ?? member.preferred_name ?? member.email ?? member.uid}
													</li>
												{/each}
											</ul>
										{:else}
											<p class="text-white/60">No applications are linked to this team yet.</p>
										{/if}

										<div class="mt-4 border-t border-white/10 pt-4">
											<p class="text-white/70 font-mono uppercase tracking-wider text-xs mb-3">
												Checked Out Parts
											</p>
											{#if team.checkouts.length}
												<div class="space-y-2">
													{#each team.checkouts as checkout}
														<div
															class="rounded-md border border-white/10 bg-black/10 px-3 py-3 flex flex-wrap items-center justify-between gap-3"
														>
															<div>
																<p class="text-white font-mono text-sm">{checkout.part_id}</p>
																<p class="text-white/70 text-sm">
																	{checkout.part_name ?? 'Unknown part'}
																</p>
																<p class="text-white/60 text-xs">Quantity: {checkout.quantity}</p>
															</div>
															<form method="POST" action="?/returnTeamPart" use:enhance>
																<input type="hidden" name="teamId" value={String(team.id)} />
																<input type="hidden" name="partId" value={checkout.part_id} />
																<input
																	type="hidden"
																	name="quantity"
																	value={String(checkout.quantity)}
																/>
																<button
																	type="submit"
																	class="px-3 py-2 rounded-lg bg-amber-400 text-slate-900 font-mono uppercase tracking-wider text-xs"
																>
																	Return
																</button>
															</form>
														</div>
													{/each}
												</div>
											{:else}
												<p class="text-white/60">No parts currently checked out.</p>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				{/if}
				{#if activeTab === 'parts'}
					<div class="space-y-6">
						<div class="rounded-lg border border-white/15 bg-white/5 p-6">
							<h2 class="text-xl font-semibold text-white font-mono uppercase tracking-wider mb-2">
								Parts Checkout
							</h2>
							<p class="text-white/70">
								Find a part by ID (<span class="font-mono">part_id</span> or
								<span class="font-mono">alt_ids</span>)
							</p>
							<p class="text-white/70 mb-4">
								Refer to the <a
									href="https://docs.google.com/spreadsheets/d/1tLmBVyZHYDnfWacVV9OnJ631A-ajusv1Z2gPdddkyWM/edit?resourcekey=&gid=1605859279#gid=1605859279"
									target="_blank"
									class="text-cyan-400 hover:underline">parts inventory spreadsheet</a
								> for available parts and IDs.
							</p>
							{#if form?.lookupError}
								<div class="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
									<p class="text-red-200 text-sm">{form.lookupError}</p>
								</div>
							{/if}

							{#if form?.lookupSuccess}
								<div class="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4">
									<p class="text-green-200 text-sm">{form.lookupSuccess}</p>
								</div>
							{/if}

							<form
								method="POST"
								action="?/findPart"
								use:enhance
								class="grid gap-3 md:grid-cols-[1fr_auto]"
							>
								<input
									type="text"
									name="partLookupId"
									placeholder="Enter part ID or alt ID"
									value={partLookupId}
									required
									class="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white placeholder-white/40 font-mono"
								/>
								<button
									type="submit"
									class="px-4 py-2 rounded-lg bg-white text-slate-900 font-mono uppercase tracking-wider text-sm"
								>
									Find Part
								</button>
							</form>
						</div>

						{#if foundPart}
							<div class="rounded-lg border border-white/15 bg-white/5 p-6">
								<div class="grid gap-2 mb-5 text-sm">
									<p class="text-white font-mono">
										Selected Part: <span class="text-cyan-200">{foundPart.part_id}</span>
									</p>
									<p class="text-white/80">{foundPart.name}</p>
									<p class="text-white/70">
										Available: {Math.max(foundPart.quantity - foundPart.num_in_use, 0)} / {foundPart.quantity}
									</p>
									{#if foundPart.alt_ids.length}
										<p class="text-white/60">Alt IDs: {foundPart.alt_ids.join(', ')}</p>
									{/if}
									{#if foundPart.image_url && foundPart.image_url.length > 0}
										<img
											src={foundPart.image_url}
											alt={`Image for ${foundPart.part_id}`}
											class="mt-2 max-h-48 w-auto rounded-md border border-white/10 bg-black/20"
										/>
									{/if}
								</div>

								{#if form?.checkoutError}
									<div class="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
										<p class="text-red-200 text-sm">{form.checkoutError}</p>
									</div>
								{/if}

								{#if form?.checkoutSuccess}
									<div class="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4">
										<p class="text-green-200 text-sm">{form.checkoutSuccess}</p>
									</div>
								{/if}

								<form
									method="POST"
									action="?/checkoutPart"
									use:enhance
									class="grid gap-4 md:grid-cols-3"
								>
									<input
										type="hidden"
										name="partLookupId"
										value={partLookupId || foundPart.part_id}
									/>
									<input type="hidden" name="selectedPartId" value={foundPart.part_id} />

									<div>
										<label
											for="teamId"
											class="text-white/70 font-mono uppercase tracking-wider text-xs block mb-1"
										>
											Team
										</label>
										<select
											id="teamId"
											name="teamId"
											required
											class="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white font-mono"
										>
											<option value="">Select a team</option>
											{#each data.teams ?? [] as team}
												<option value={team.id}>{team.team_name}</option>
											{/each}
										</select>
									</div>

									<div>
										<label
											for="quantity"
											class="text-white/70 font-mono uppercase tracking-wider text-xs block mb-1"
										>
											Quantity
										</label>
										<input
											id="quantity"
											type="number"
											name="quantity"
											min="1"
											max={Math.max(foundPart.quantity - foundPart.num_in_use, 1)}
											required
											class="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white font-mono"
										/>
									</div>

									<div class="flex items-end gap-2">
										<button
											type="submit"
											class="px-4 py-2 rounded-lg bg-cyan-400 text-slate-900 font-mono uppercase tracking-wider text-sm"
										>
											Checkout
										</button>
									</div>
								</form>

								<form method="POST" action="?/cancelCheckout" use:enhance class="mt-4">
									<button
										type="submit"
										class="px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-white font-mono uppercase tracking-wider text-sm hover:bg-white/10"
									>
										Cancel
									</button>
								</form>
							</div>
						{/if}
					</div>
				{/if}

				{#if activeTab === 'admins'}
					<div class="space-y-6">
						<div class="rounded-lg border border-white/15 bg-white/5 p-6">
							<h2 class="text-xl font-semibold text-white font-mono uppercase tracking-wider mb-2">
								Admins
							</h2>
							<p class="text-white/70 mb-4">Add a new admin via email.</p>

							{#if form?.adminAddError}
								<div class="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
									<p class="text-red-200 text-sm">{form.adminAddError}</p>
								</div>
							{/if}

							{#if form?.adminAddSuccess}
								<div class="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4">
									<p class="text-green-200 text-sm">{form.adminAddSuccess}</p>
								</div>
							{/if}

							<form
								method="POST"
								action="?/addAdmin"
								use:enhance
								class="grid gap-3 md:grid-cols-[1fr_auto]"
							>
								<input
									type="email"
									name="email"
									placeholder="admin@example.com"
									required
									class="w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-white placeholder-white/40 font-mono"
								/>
								<button
									type="submit"
									class="px-4 py-2 rounded-lg bg-white text-slate-900 font-mono uppercase tracking-wider text-sm"
								>
									Add Admin
								</button>
							</form>
						</div>

						<div class="rounded-lg border border-white/15 bg-white/5 p-6">
							<h3 class="text-lg font-semibold text-white font-mono uppercase tracking-wider mb-3">
								Current Admin Emails
							</h3>

							{#if !admins.length}
								<p class="text-white/70">No admins found.</p>
							{:else}
								<ul class="space-y-2">
									{#each admins as admin}
										<li
											class="rounded-md border border-white/10 bg-black/10 px-3 py-2 text-white/90 font-mono break-all"
										>
											{admin.email}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.admin-page-scroll {
		-webkit-overflow-scrolling: touch;
	}
</style>

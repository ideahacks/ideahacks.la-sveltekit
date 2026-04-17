<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form?: ActionData } = $props();

	type FilterMode =
		| 'all'
		| 'accepted'
		| 'rejected'
		| 'pending';

	type ApplicationRecord = {
		uid: string;
		status?: string | null;
		email?: string;
		name?: string | null;
		preferred_name?: string | null;
		[key: string]: unknown;
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

	let filteredApplications = $derived(
		((data.applications ?? []) as ApplicationRecord[]).filter((app: ApplicationRecord) =>
			matchesFilter(app)
		)
	);

	let allVisibleCollapsed = $derived(
		filteredApplications.length > 0 &&
		filteredApplications.every((app: ApplicationRecord) => collapsedUids.includes(app.uid))
	);

	let counts = $derived(
			((data.applications ?? []) as ApplicationRecord[]).reduce(
				(acc: { accepted: number; rejected: number; pending: number }, app: ApplicationRecord) => {
				const status = getStatus(app);
				acc[status] += 1;
				return acc;
			},
			{ accepted: 0, rejected: 0, pending: 0 }
		)
	);

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
				<h1 class="text-4xl font-bold text-white mb-2 font-mono uppercase tracking-wider">
					Admin — Applications
				</h1>
				<p class="text-white/70 mb-8">
					Review and approve or reject applications. Only admins can access this page.
				</p>

				{#if data.error}
					<div class="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
						<p class="text-red-200">{data.error}</p>
					</div>
				{/if}

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

				{#if !data.applications?.length}
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
								<!-- Header: name, email, status, actions -->
								<div class="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-white/10">
									<div>
										<span class="text-white font-semibold font-mono">{app.name ?? app.email}</span>
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
									<!-- All application fields -->
									<dl class="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
										{#each orderedKeys as key}
											{#if app[key] != null || key === 'status'}
												<div class="{longTextFields.includes(key) ? 'md:col-span-2' : ''}">
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
			</div>
		</div>
	</div>
</div>

<style>
	.admin-page-scroll {
		-webkit-overflow-scrolling: touch;
	}
</style>

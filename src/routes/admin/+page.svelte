<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { enhance } from '$app/forms';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form?: ActionData } = $props();

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

				{#if !data.applications?.length}
					<p class="text-white/80">No applications yet.</p>
				{:else}
					<div class="space-y-8">
						{#each data.applications as app}
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
									<div class="flex items-center gap-3">
										<span
											class="px-3 py-1 rounded-full text-sm font-mono uppercase
											{app.status === 'accepted'
												? 'bg-green-500/30 text-green-200'
												: app.status === 'rejected'
													? 'bg-red-500/30 text-red-200'
													: 'bg-yellow-500/30 text-yellow-200'}"
										>
											{app.status ?? 'submitted'}
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
									</div>
								</div>

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

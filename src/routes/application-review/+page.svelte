<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ApplicationStatusCard from '$lib/components/ApplicationStatusCard.svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const APPS_PER_PAGE = 40;

	let apps = data.applications;
	export async function updateApplication(status, email) {
		const { error } = await supabase
			.from('applications')
			.update({ status: status })
			.eq('email', email);

		if (!error) {
			// Update the local apps array
			apps = apps.map((app) => (app.email === email ? { ...app, status: status } : app));
			// Recalculate app_status
			updateAppStatus();
		}
	}
	console.log(apps);
	let filter_text = '';
	let filtered_apps = apps;
	let app_status = { applications: 0, accepted: 0, waitlisted: 0, rejected: 0, pending: 0 };
	function updateAppStatus() {
		app_status = { applications: 0, accepted: 0, waitlisted: 0, rejected: 0, pending: 0 };
		app_status.applications = apps.length;
		for (let app of apps) {
			switch (app.status) {
				case 'Accepted':
					app_status.accepted++;
					break;
				case 'Waitlisted':
					app_status.waitlisted++;
					break;
				case 'Rejected':
					app_status.rejected++;
					break;
				case 'Pending':
				case null:
					app_status.pending++;
					app.status = 'Pending';
					break;
			}
		}
	}
	$: updateAppStatus();

	$: filtered_apps = apps.filter(
		(app) =>
			app.full_name.toLowerCase().includes(filter_text.toLowerCase()) ||
			app.year_at_current_university.toLowerCase().includes(filter_text.toLowerCase()) ||
			(app.status?.toLowerCase().includes(filter_text.toLowerCase()) ?? false)
	);

	let grouped_apps = [];
	$: {
		grouped_apps = [];
		for (let i = 0; i < filtered_apps.length; i += APPS_PER_PAGE) {
			grouped_apps.push(filtered_apps.slice(i, i + APPS_PER_PAGE));
		}
	}

	async function changeStatus(status, email) {
		await updateApplication(status, email);
		console.log('Successfully changed record');
	}
</script>

<div class="title mb-4 text-center font-paytone text-[4.3em] text-white">Application Review</div>
<div class="card-container flex flex-wrap justify-center gap-20">
	<div class="card w-[150px] bg-error p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.applications}</h2>
			<p class="font-paytone">Applications</p>
		</div>
	</div>

	<div class="card w-[150px] bg-warning p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.accepted}</h2>
			<p class="font-paytone">Accepted</p>
		</div>
	</div>

	<div class="card w-[150px] bg-success p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.waitlisted}</h2>
			<p class="font-paytone">Waitlisted</p>
		</div>
	</div>

	<div class="card w-[150px] bg-info p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.rejected}</h2>
			<p class="font-paytone">Rejected</p>
		</div>
	</div>

	<div class="card w-[150px] bg-primary p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.pending}</h2>
			<p class="font-paytone">Pending</p>
		</div>
	</div>
</div>
<input
	type="text"
	placeholder="Search by name, year, or status"
	class="input input-bordered input-info mt-[40px] w-full max-w-xs self-center"
	bind:value={filter_text}
/>
<div class="display flex flex-col items-center justify-center">
	<div class="carousel flex w-full items-center">
		{#each grouped_apps as item, index}
			<div id={'item' + (index + 1)} class="carousel-item w-full">
				<div class="cards-container flex flex-wrap justify-center">
					{#each item as card, cardIndex}
						<ApplicationStatusCard application={card} index={index * APPS_PER_PAGE + cardIndex} />
						<dialog id={`modal_${index * APPS_PER_PAGE + cardIndex}`} class="modal">
							<div class="modal-box">
								<h3 class="text-lg font-bold">{card.full_name}</h3>
								<p class="py-4">Year: {card.year_at_current_university}</p>
								<p class="py-4">Status: {card.status}</p>
								<div class="modal-action">
									<form method="dialog">
										<button class="btn bg-warning" on:click={changeStatus('Accepted', card.email)}
											>Accept</button
										>
										<button class="btn bg-success" on:click={changeStatus('Waitlisted', card.email)}
											>Waitlist</button
										>
										<button class="btn bg-info" on:click={changeStatus('Rejected', card.email)}
											>Reject</button
										>
										<button class="btn bg-primary">Close</button>
									</form>
								</div>
							</div>
						</dialog>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex w-full flex-wrap justify-center gap-2 py-2">
		{#each grouped_apps as item, index}
			<a href={'#item' + (index + 1)} class="btn btn-xs font-paytone">{index + 1}</a>
		{/each}
	</div>
</div>

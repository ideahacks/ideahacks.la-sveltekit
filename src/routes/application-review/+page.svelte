<script>
	import ApplicationStatusCard from '$lib/components/ApplicationStatusCard.svelte';

	let apps = [
		{
			names: 'William',
			year: 'Third',
			status: 'Accepted'
		},
		{
			names: 'Random',
			year: 'Fourth',
			status: 'Pending'
		},
		{
			names: 'Random',
			year: 'First',
			status: 'Waitlisted'
		},
		{
			names: 'Random',
			year: 'Second',
			status: 'Rejected'
		},
		{
			names: 'Random',
			year: 'Second',
			status: 'Rejected'
		},
		{
			names: 'Random',
			year: 'Second',
			status: 'Rejected'
		}
	];

	let filter_text = '';
	let filtered_apps = apps;
	let app_status = { applications: 0, accepted: 0, waitlisted: 0, rejected: 0, pending: 0 };
	let i = 0;
	app_status.applications = apps.length;
	for (i = 0; i < apps.length; i++) {
		switch (apps[i].status) {
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
				app_status.pending++;
				break;
		}
	}

	$: filtered_apps = apps.filter(
		(app) =>
			app.names.toLowerCase().includes(filter_text.toLowerCase()) ||
			app.year.toLowerCase().includes(filter_text.toLowerCase()) ||
			app.status.toLowerCase().includes(filter_text.toLowerCase())
	);

	let grouped_apps = [];
	$: {
		grouped_apps = [];
		for (let i = 0; i < filtered_apps.length; i += 4) {
			grouped_apps.push(filtered_apps.slice(i, i + 4));
		}
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
				<div class="cards-container justify center flex grow flex-col items-stretch">
					{#each item as card}
						<ApplicationStatusCard application={card} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex w-full justify-center gap-2 py-2">
		{#each grouped_apps as item, index}
			<a href={'#item' + (index + 1)} class="btn btn-xs font-paytone">{index + 1}</a>
		{/each}
	</div>
</div>

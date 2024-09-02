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

<div class="title">Application Review</div>
<div class="card-container">
	<div class="card w-96 bg-error p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">{app_status.applications}</h2>
			<p>Applications</p>
		</div>
	</div>

	<div class="card w-96 bg-warning p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">{app_status.accepted}</h2>
			<p>Accepted</p>
		</div>
	</div>

	<div class="card w-96 bg-success p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">{app_status.waitlisted}</h2>
			<p>Waitlisted</p>
		</div>
	</div>

	<div class="card w-96 bg-info p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">{app_status.rejected}</h2>
			<p>Rejected</p>
		</div>
	</div>

	<div class="card w-96 bg-primary p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">{app_status.pending}</h2>
			<p>Pending</p>
		</div>
	</div>
</div>
<input
	type="text"
	placeholder="Search by name, year, or status"
	class="input input-bordered input-info w-full max-w-xs"
	bind:value={filter_text}
/>
<div class="display">
	<div class="carousel w-full">
		{#each grouped_apps as item, index}
			<div id={'item' + (index + 1)} class="carousel-item w-full">
				<div class="cards-container">
					{#each item as card}
						<ApplicationStatusCard application={card} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex w-full justify-center gap-2 py-2">
		{#each grouped_apps as item, index}
			<a href={'#item' + (index + 1)} class="btn btn-xs">{index + 1}</a>
		{/each}
	</div>
</div>

<style>
	.cards-container {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
	}
	.display {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.carousel {
		display: flex;
		align-items: center;
	}
	.title {
		text-align: center;
		font-size: 4.3em;
		margin-bottom: 16px;
		font-family: 'Paytone One', sans-serif;
		color: #ffffff;
	}
	.card-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 80px;
	}

	.card {
		width: 150px;
	}
	.card-title {
		font-family: 'Paytone One', sans-serif;
	}
	.card p {
		font-family: 'Paytone One', sans-serif;
	}
	.input {
		align-self: center;
		margin-top: 40px;
	}
	.btn {
		font-family: 'Paytone One';
	}
</style>

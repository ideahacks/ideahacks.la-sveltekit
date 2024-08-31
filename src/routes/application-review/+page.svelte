<script>
	import ApplicationStatusCard from '$lib/components/ApplicationStatusCard.svelte';

	let application1 = {
		names: 'William',
		year: 'Third',
		status: 'Accepted'
	};
	let application2 = {
		names: 'Random',
		year: 'Fourth',
		status: 'Pending'
	};
	let application3 = {
		names: 'Random',
		year: 'First',
		status: 'Waitlisted'
	};
	let application4 = {
		names: 'Random',
		year: 'Second',
		status: 'Rejected'
	};
</script>

<div class="title">Application Review</div>
<div class="card-container">
	<div class="card w-96 bg-error p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">2</h2>
			<p>Applications</p>
		</div>
	</div>

	<div class="card w-96 bg-warning p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">1</h2>
			<p>Accepted</p>
		</div>
	</div>

	<div class="card w-96 bg-success p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">0</h2>
			<p>Waitlisted</p>
		</div>
	</div>

	<div class="card w-96 bg-info p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">0</h2>
			<p>Rejected</p>
		</div>
	</div>

	<div class="card w-96 bg-primary p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title">1</h2>
			<p>Pending</p>
		</div>
	</div>
</div>
<input type="text" placeholder="Filter" class="input input-bordered input-info w-full max-w-xs" />
<ApplicationStatusCard application={application1} />
<ApplicationStatusCard application={application2} />
<ApplicationStatusCard application={application3} />
<ApplicationStatusCard application={application4} />

<style>
	.title {
		text-align: center;
		font-size: 2em;
		margin-bottom: 16px;
	}
	.card-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center; /* Center the cards horizontally */
		gap: 80px; /* Space between cards */
	}

	.card {
		width: 150px; /* Adjust the width of the cards if needed */
	}
	.input {
		align-self: center;
		margin-top: 40px;
	}
</style>

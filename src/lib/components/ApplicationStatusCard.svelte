<script>
	export let application; // Default status

	// Determine the class based on the status
	let statusClass = '';
	$: {
		if (application.status === 'Accepted') {
			statusClass = 'bg-warning';
		} else if (application.status === 'Waitlisted') {
			statusClass = 'bg-success';
		} else if (application.status === 'Rejected') {
			statusClass = 'bg-info';
		} else if (application.status === 'Pending') {
			statusClass = 'bg-primary';
		}
	}
</script>

<div class={`card ${statusClass}`}>
	<p>{application.names}</p>
	<p>{application.year}</p>
	<p>{application.status}</p>
</div>

<style>
	.card {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
		padding: 16px;
		border-radius: 8px;
		color: white;
		margin: 8px;
		max-width: 200x;
		align-self: center;
	}

	.card p {
		margin: 0;
		padding: 0 8px;
		font-family: 'Paytone one', sans-serif;
	}
</style>

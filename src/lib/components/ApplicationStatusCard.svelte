<script>
	export let application; // Default status

	// Determine the class based on the status
	let statusClass = '';
	$: {
		if (application.status === 'Accepted') {
			statusClass = 'bg-green-500';
		} else if (application.status === 'Waitlisted') {
			statusClass = 'bg-yellow-500';
		} else if (application.status === 'Rejected') {
			statusClass = 'bg-red-500';
		} else if (application.status === 'Pending') {
			statusClass = 'bg-blue-500';
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
		align-items: center; /* Align items vertically in the center */
		justify-content: flex-start; /* Align items to the start */
		padding: 16px;
		border-radius: 8px;
		color: white;
		margin: 8px;
		max-width: 900px;
		align-self: center;
	}

	
	.card p {
		margin: 0;
		padding: 0 8px; /* Add some padding between the items */
	}

	
</style>

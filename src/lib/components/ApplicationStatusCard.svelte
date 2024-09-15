<script>
	export let application;
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

<div
	class={`card ${statusClass} m-2 flex-initial flex-row items-center justify-between self-center rounded-lg p-4 text-white`}
>
	<p class="m-0 px-8 py-0 font-paytone">{application.names}</p>
	<p class="m-0 px-8 py-0 font-paytone">{application.year}</p>
	<p class="m-0 px-8 py-0 font-paytone">{application.status}</p>
</div>

<!-- <script>
	export let application;
	export let index;
	let statusClass = '';
	let status = '';
	$: {
		if (application.status === 'Accepted') {
			statusClass = 'bg-warning';
			status = application.status;
		} else if (application.status === 'Waitlisted') {
			statusClass = 'bg-success';
			status = application.status;
		} else if (application.status === 'Rejected') {
			statusClass = 'bg-info';
			status = application.status;
		} else if (application.status === 'Pending' || application.status == null) {
			statusClass = 'bg-primary';
			status = 'Pending';
		}
	}
	let year = application.year_at_current_university;
	if (year.length > 0) {
		year = year[0].toUpperCase() + year.slice(1);
	}
</script>

<div
	class={`card ${statusClass} m-2 w-64 flex-initial shrink justify-between self-center rounded-lg bg-opacity-50 p-4 text-white`}
	on:click={() => document.getElementById(`modal_${index}`).showModal()}
>
	<div class="firstRow">
		<p class="m-0 px-4 py-0 font-encode">{application.full_name}</p>
		<p class="m-0 px-4 py-0 font-encode">
			{application.year_at_current_university[0].toUpperCase() +
				application.year_at_current_university.slice(1)}
		</p>
		<p class="m-0 px-4 py-0 font-paytone">{status}</p>
	</div>
</div> -->

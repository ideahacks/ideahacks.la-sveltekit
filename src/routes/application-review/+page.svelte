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

	let grouped_apps = [];
	for (let i = 0; i < apps.length; i += 4) {
		grouped_apps.push(apps.slice(i, i + 4));
	}
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
</style>

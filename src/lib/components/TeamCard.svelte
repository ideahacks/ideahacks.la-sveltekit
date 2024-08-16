<script>
	export let team_info;
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title">Team {team_info.number}</h2>
		<h3 class="text-lg font-bold">Members</h3>
		<ul>
			{#each team_info.members as member}
				<li>{member}</li>
			{/each}
		</ul>
		<h3>Parts</h3>
		<p>{team_info.parts}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-primary">Buy Now</button>
		</div>
	</div>
</div>

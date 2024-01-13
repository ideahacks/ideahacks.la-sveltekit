<script>
	import { TerminalSquare } from 'lucide-svelte';
	import { stringify } from 'postcss';

	export let data;

	$: checkouts = data.teams.reduce((checkouts, team) => {
		const teamOwnedParts = data.teamsParts
			.filter((teamPart) => teamPart.team_id === team.team_id)
			.map((teamPart) => {
				const partMetadata = data.parts.find((part) => part.part_id === teamPart.part_id);
				return {
					part_id: teamPart.part_id,
					quantity: teamPart.quantity,
					total_quantity: partMetadata?.quantity,
					name: partMetadata?.name
				};
			});

		checkouts[team.team_id] = teamOwnedParts;

		return checkouts;
	}, {});
</script>

<div class="m-12 justify-center space-y-8">
	<h1 class="text-center font-display-serif text-3xl md:text-4xl">Teams and Parts</h1>
	<div class="overflow-x-auto">
		<table class="table table-lg">
			<thead>
				<tr>
					<th>Team Number</th>
					<th>Parts (ID, Name, Quantity/Total)</th>
				</tr>
			</thead>
			<tbody>
				{#each data.teams as teams}
					<tr>
						<th>{teams.team_id}</th>
						<td
							>{#each checkouts[teams.team_id] as part}
								<p>{JSON.stringify(part)}</p>
							{/each}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

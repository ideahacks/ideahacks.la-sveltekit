<script lang="ts">
	export let data;

	function getPart(part_id: string) {
		let all_parts = data.parts;
		if (all_parts) {
			for (let i = 0; i < all_parts.length; i++) {
				if (all_parts[i].part_id === part_id) {
					return all_parts[i];
				}
			}
		}
		return [];
	}
</script>

{#if data.is_admin}
	<div class="mx-auto my-10 text-center font-paytone text-3xl text-white max-sm:max-w-xs">
		Teams Panel
	</div>
	<div class="overflow-x-auto">
		<table class="table table-xs">
			<thead>
				<tr class="text-white">
					<th />
					<th>Team Name</th>
					<th>Team Code</th>
					<th>Team Members</th>
					<th>Parts</th>
				</tr>
				{#each data.teams as team, i}
					<tr class="font-encode font-thin text-white">
						<th>{i + 1}</th>
						<td>{team.team_name}</td>
						<td>{team.team_code}</td>
						<td
							>{#each data.participants as participant}
								{#if participant.team_id === team.id}
									{participant.full_name} ({participant.email}) <br />
								{/if}
							{/each}
						</td>
						<td
							>{#each data.teams_parts as team_part}
								{#if team_part.team_id === team.id}
									<span class="font-bold">ID: </span>{getPart(team_part.part_id).part_id} |
									<span class="font-bold">Name: </span>{getPart(team_part.part_id).name} |
									<span class="font-bold">Quantity:</span>
									{team_part.quantity}<br />
								{/if}
							{/each}
						</td>
					</tr>
				{/each}
			</thead>
			<tbody />
		</table>
	</div>
{:else}
	<h1 class="m-auto max-w-xl text-center font-encode text-lg text-white">
		You are not an admin! Contact webmaster@ieeebruins.com or agariomasster on discord for any
		questions!
	</h1>
{/if}

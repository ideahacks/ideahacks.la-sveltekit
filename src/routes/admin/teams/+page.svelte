<script>
	export let data;
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

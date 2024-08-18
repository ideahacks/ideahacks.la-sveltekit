<script>
	export let team_info;
</script>

<div class="card max-w-[16rem] bg-base-100 bg-opacity-80 shadow-xl border-4 border-custom-red p-1">
	<div class="card-body p-1">
		<h2 class="card-title justify-center font-paytone text-md">Team {team_info.number}</h2>
        <p class="text-center font-encode">Number of members: {team_info.members.length}</p>
		<h3 class="text-lg font-bold font-paytone">Members</h3>
		<ul class="list-disc font-encode pl-4">
			{#each team_info.members as member}
				<li>{member}</li>
			{/each}
		</ul>
		<h3 class="text-md font-bold font-paytone">Parts</h3>
        <p class="font-encode">
            {#each team_info.parts as part, index}
                {part}{#if index < team_info.parts.length - 1},&nbsp;{/if}
            {/each}
        </p>
	</div>
</div>
<script lang="ts">
	let { team_info } = $props();
</script>

<div
	class="card w-56 max-w-[16rem] border-4 border-custom-red bg-base-100 bg-opacity-80 p-1 shadow-xl"
>
	<div class="card-body p-1">
		<h2 class="hyphenate text-md card-title justify-center font-paytone">
			Team {team_info.number}
		</h2>
		<p class="text-center font-encode text-xs">Number of members: {team_info.members.length}</p>
		<h3 class="text-md font-paytone">Members</h3>
		<ul class="hyphenate text-md list-disc pl-4 font-encode">
			{#each team_info.members as member}
				<li class="">{member}</li>
			{/each}
		</ul>
		<h3 class="text-md font-paytone">Parts</h3>
		<p class="font-encode">
			{#each team_info.parts as part, index}
				{part}{#if index < team_info.parts.length - 1},&#8201;{/if}
			{/each}
		</p>
	</div>
</div>

<style>
	.hyphenate {
		hyphens: auto; /* Add hyphens where appropriate */
	}
</style>

<script>
	// @ts-nocheck
	import OfficerCard from '$lib/components/OfficerCard.svelte';
	export let teamInfo;
</script>

<div
	class="mx-auto my-5 w-10/12 max-w-2xl justify-center rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5"
>
	<h1 class="mx-auto mb-5 text-center text-3xl">{teamInfo.title}</h1>

	<div class="flex flex-wrap justify-center gap-x-10 gap-y-7">
		{#each teamInfo.officers as officerInfo}
			<OfficerCard {officerInfo} />
		{/each}
	</div>
</div>

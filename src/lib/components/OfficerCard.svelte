<script>
	// @ts-nocheck
	export let officerInfo;

	let catMode = false;
</script>

<div
	role="tooltip"
	class="card w-56 bg-gray-100 bg-opacity-10 shadow-xl"
	on:mouseenter={() => (catMode = true)}
	on:mouseleave={() => (catMode = false)}
>
	<figure class="px-5 pt-5">
		{#if catMode}
			<img
				src={officerInfo.cat_img_src}
				alt={officerInfo.name + ' as a cat'}
				class="h-48 w-48 rounded-xl object-cover"
			/>
		{:else}
			<img
				src={officerInfo.img_src}
				alt={officerInfo.name}
				class="h-48 w-48 rounded-xl object-cover"
			/>
		{/if}
	</figure>
	<div class="card-body items-center text-center">
		<h2 class="font-bold">{officerInfo.name}</h2>
	</div>
</div>

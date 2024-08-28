<script>
	export let part_info;
</script>

<div class="card max-w-[16rem] border-4 border-custom-red bg-base-100 bg-opacity-80 p-1 shadow-xl">
	<div class="card-body p-1">
		<figure class="px-8 pt-2">
			<img src={part_info.picture} alt="Red LED" class="xl rounded" />
		</figure>
		<h2 class="hyphenate text-md card-title justify-center font-paytone">{part_info.title}</h2>
		<p class="text-center font-encode text-xs">
			{part_info.num_in_use} out of {part_info.num_total} in use
		</p>
		<p class="inline-block rounded-xl bg-custom-green text-center font-encode text-sm">
			{part_info.location}
		</p>
		<div>
			<h3 class="hyphenate text-md font-encode">
				<span class="font-paytone">Tags: </span>
				{#each part_info.tags as tag, index}
					{tag}{#if index < part_info.tags.length - 1},&#8201;{/if}
				{/each}
			</h3>
		</div>
		<h3 class="text-md font-encode">
			<span class="font-paytone">ID: </span>{part_info.id}
		</h3>
		<div class="card-actions justify-center">
			<a href={part_info.details} class="text-md btn btn-sm bg-custom-red font-paytone text-white"
				>Details</a
			>
			<a href={part_info.datasheet} class="text-md btn btn-sm bg-custom-red font-paytone text-white"
				>Datasheet</a
			>
		</div>
	</div>
</div>

<style>
	.hyphenate {
		hyphens: auto; /* Add hyphens where appropriate */
	}
</style>

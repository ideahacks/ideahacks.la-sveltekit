<script>
	export let part_info;
	export let addPartToCart;
	import default_part_image from '$lib/images/logo.png';
</script>

<div class="card h-[20] w-[16rem] bg-white bg-opacity-10 p-1 text-white shadow-xl">
	<div class="card-body p-1">
		<figure class="h-36 p-12">
			<img
				src={part_info.image_url && part_info.image_url.length > 0
					? part_info.image_url
					: default_part_image}
				alt="default"
				class="rounded"
			/>
		</figure>
		<h2 class="hyphenate text-md card-title justify-center font-encode">{part_info.name}</h2>
		{#if part_info.requires_checkout === true}
			<p class="text-center font-encode text-xs">
				{part_info.quantity - part_info.num_in_use} out of {part_info.quantity} remaining
			</p>
		{:else}
			<p class="text-center font-encode text-xs">No checkout required. Just grab & go!</p>
		{/if}

		<div
			class="flex justify-center rounded-xl bg-white bg-opacity-10 text-center font-encode text-sm"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width={1.2}
				stroke="currentColor"
				class="mr-0.5 size-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
				/>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
				/>
			</svg>

			{part_info.checkout_location}
		</div>

		<div>
			<h3 class="hyphenate text-md font-encode">
				<!-- <span class="font-paytone">Tags: </span>
				{#each part_info.tags as tag, index}
					{tag}{#if index < part_info.tags.length - 1},&#8201;{/if}
				{/each} -->
			</h3>
		</div>
		<h3 class="text-md font-encode">
			<span class="font-paytone">ID: </span>{part_info.part_id}
		</h3>
		<div class="card-actions justify-center">
			<button
				disabled={!part_info.requires_checkout}
				class="text-md btn btn-sm bg-white bg-opacity-10 font-encode text-white disabled:btn-ghost disabled:text-white disabled:opacity-40"
				on:click={() => addPartToCart(part_info.part_id, 1)}
				>{part_info.requires_checkout ? 'Add to Cart' : 'No Checkout Required!'}
			</button>
		</div>
	</div>
</div>

<style>
	.hyphenate {
		hyphens: auto; /* Add hyphens where appropriate */
	}
</style>

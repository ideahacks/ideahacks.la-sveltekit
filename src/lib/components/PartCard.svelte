<script>
	export let part_info;
	import default_part_image from '$lib/images/defaultPartPicture.png';
</script>

<div class="card h-[28rem] w-[16rem] bg-white bg-opacity-10 p-1 text-white shadow-xl">
	<div class="card-body p-1">
		<figure class="h-48 px-12 pt-1">
			<img
				src={part_info.image_url && part_info.image_url.length > 0
					? part_info.image_url
					: default_part_image}
				alt="default"
				class="xl rounded"
			/>
		</figure>
		<h2 class="hyphenate text-md card-title justify-center font-encode">{part_info.name}</h2>
		<p class="text-center font-encode text-xs">
			{part_info.num_in_use} out of {part_info.num_total} in use
		</p>
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
			{part_info.location}
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
			<label
				for={part_info.name}
				class="text-md btn btn-sm bg-white bg-opacity-10 font-encode text-white">Details</label
			>
			<input type="checkbox" id={part_info.name} class="modal-toggle" />
			<div class="modal" role="dialog">
				<div class="modal-box">
					<p class="hyphenate font-encode text-sm text-black">{part_info.description}</p>
					<div class="modal-action">
						<label for={part_info.name} class="btn border-none bg-opacity-10">Close</label>
					</div>
				</div>
				<label class="modal-backdrop" for={part_info.name}>Close</label>
				<!--add the above line so clicking outside modal will also close the thing-->
			</div>
			<a
				href={part_info.datasheet}
				class="text-md btn btn-sm bg-white bg-opacity-10 font-encode text-white"
				target="_blank"
				>Datasheet
			</a>
		</div>
	</div>
</div>

<style>
	.hyphenate {
		hyphens: auto; /* Add hyphens where appropriate */
	}
</style>

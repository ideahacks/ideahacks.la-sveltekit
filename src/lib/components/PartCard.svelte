<script lang="ts">
	interface PartInfo {
		part_id: string;
		name: string;
		tags?: string[];
		requires_checkout?: boolean;
		quantity?: number;
		num_in_use?: number;
		image_url?: string | null;
		description?: string | null;
		datasheet_url?: string | null;
	}

	let { part_info }: { part_info: PartInfo } = $props();
	import defaultPartImage from '$lib/images/ideahacks_logos/default_logo.png';
</script>

<div class="card h-[28rem] w-64 bg-white/10 p-1 text-white shadow-xl border border-white/20">
	<div class="card-body p-1">
		<figure class="h-48 px-8 pt-1 flex items-center justify-center">
			<img
				src={part_info.image_url && part_info.image_url.length > 0 ? part_info.image_url : defaultPartImage}
				alt={part_info.name}
				class="rounded object-contain max-h-full"
			/>
		</figure>
		<h2 class="hyphenate text-md card-title justify-center font-mono">{part_info.name}</h2>
		{#if part_info.requires_checkout === true}
			<p class="text-center font-mono text-xs text-white/90">
				{(part_info.quantity ?? 0) - (part_info.num_in_use ?? 0)} out of {part_info.quantity ?? 0} remaining
			</p>
		{:else}
			<p class="text-center font-mono text-xs text-white/90">No checkout required. Just grab & go!</p>
		{/if}

		<div class="card-actions justify-center gap-2 flex-wrap">
			<label
				for="modal_{part_info.part_id}"
				class="btn btn-sm bg-white/10 font-mono text-white border-none cursor-pointer"
			>
				Details
			</label>
			<input type="checkbox" id="modal_{part_info.part_id}" class="modal-toggle" />
			<div class="modal" role="dialog">
				<div class="modal-box border border-white/30 bg-white/10 backdrop-blur-md shadow-lg">
					<p class="font-mono text-sm text-white/90 hyphenate">{part_info.description ?? 'No description.'}</p>
					<p class="font-mono text-sm text-white/90 mt-2">
						<span class="font-bold">Tags: </span>{part_info.tags?.length ? part_info.tags.join(', ') : 'None'}
					</p>
					<div class="modal-action">
						<label for="modal_{part_info.part_id}" class="btn bg-white/10 text-white border-none">Close</label>
					</div>
				</div>
				<label class="modal-backdrop" for="modal_{part_info.part_id}">Close</label>
			</div>
			{#if part_info.datasheet_url}
				<a
					href={part_info.datasheet_url}
					class="btn btn-sm bg-white/10 font-mono text-white border-none"
					target="_blank"
					rel="noopener noreferrer"
				>
					Datasheet
				</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.hyphenate {
		hyphens: auto;
	}
</style>

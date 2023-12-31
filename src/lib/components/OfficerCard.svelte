<script>
	// @ts-nocheck
	export let officerInfo;
</script>

<div class="card w-56 bg-gray-100 bg-opacity-10 shadow-xl">
	<figure class="px-5 pt-5">
		<img
			src={officerInfo.cat_img_src}
			alt={officerInfo.name + ' as a cat'}
			class="h-48 w-48 rounded-xl object-cover"
		/>
	</figure>
	<div class="card-body items-center text-center">
		<h2 class="font-bold">{officerInfo.name}</h2>
	</div>
</div>

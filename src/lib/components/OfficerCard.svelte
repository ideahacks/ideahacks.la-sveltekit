<script>
	export let officerInfo;
</script>

<div role="tooltip" class="card w-56 bg-gray-100 bg-opacity-10 shadow-xl">
	{#if officerInfo.img_src === ''}
		<figure class="px-5 pt-5">
			<img
				src={officerInfo.cat_img_src}
				alt={officerInfo.name + ' as a cat'}
				class="h-48 w-48 rounded-3xl object-cover"
			/>
		</figure>
	{:else}
		<figure class="px-5 pt-5">
			<div class="flip-card">
				<div class="flip-card-inner">
					<div class="flip-card-back">
						<img
							src={officerInfo.cat_img_src}
							alt={officerInfo.name + ' as a cat'}
							class="h-48 w-48 rounded-3xl object-cover"
						/>
					</div>
					<div class="flip-card-front">
						<img
							src={officerInfo.img_src}
							alt={officerInfo.name}
							class="h-48 w-48 rounded-3xl object-cover"
						/>
					</div>
				</div>
			</div>
		</figure>
	{/if}
	<div class="card-body items-center text-center">
		<h2 class="font-bold">{officerInfo.name}</h2>
	</div>
</div>

<style>
	.flip-card {
		height: 12rem;
		width: 12rem;
		perspective: 1000px;
		background-color: transparent;
	}

	.flip-card-inner {
		background-color: transparent;
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.5s;
		transform-style: preserve-3d;
	}

	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		border-radius: 3rem;
	}

	.flip-card-front {
		background-color: #bbb;
		color: black;
	}

	.flip-card-back {
		background-color: #2980b9;
		color: white;
		transform: rotateY(180deg);
	}
</style>

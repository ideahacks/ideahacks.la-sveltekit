<script>
	export let data;
	export let title;
</script>

<div class="mx-auto max-w-2xl">
	<div
		class="gap-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5 opacity-90"
	>
		<h1 class="text-center text-3xl">{title}</h1>
		<div class="flex flex-wrap">
			{#each data as d}
				<div class="w-full p-2 md:w-1/2">
					<h1>{d[0]}</h1>
					<p>
						{d[1]}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>

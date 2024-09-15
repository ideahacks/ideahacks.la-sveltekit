<script>
	export let part_data;
</script>

<div
	class="card box-border w-96 min-w-40 max-w-64 flex-[1_8] rounded-lg bg-base-100 bg-slate-100 shadow-[0_4px_8px_rgba(0,0,0,0.1)] shadow-xl"
>
	<figure>
		<img class="w-full rounded-t-[10px]" src={part_data.img} alt="" />
	</figure>
	<div class="card-body p-5">
		<h2 class="card-title font-paytone">{part_data.name}</h2>
		<p class="font-paytone">Quantity: {part_data.quantity}</p>
		<p class="font-paytone">ID: {part_data.id}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-error flex-[1_1_calc(50%-16px)] font-paytone text-white"
				>Add to Cart</button
			>
		</div>
	</div>
</div>

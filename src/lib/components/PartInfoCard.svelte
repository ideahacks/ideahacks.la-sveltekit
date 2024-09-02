<script>
	export let part_data;
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<figure>
		<img src={part_data.img} alt="" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{part_data.name}</h2>
		<p>Quantity: {part_data.quantity}</p>
		<p>ID: {part_data.id}</p>
		<div class="card-actions justify-end">
			<button class="btn btn-error">Add to Cart</button>
		</div>
	</div>
</div>

<style>
	.card {
		flex: 1 8;
		min-width: 160px;
		
		box-sizing: border-box;
		max-width: 250px;
		background-color: #f0f0f0;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}
	.card img {
		width: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.card-body {
		padding: 20px;
	}
	.card-body h2,
	p {
		font-family: 'Paytone One', sans-serif;
	}
	.btn {
		flex: 1 1 calc(50% - 16px);
	}
</style>

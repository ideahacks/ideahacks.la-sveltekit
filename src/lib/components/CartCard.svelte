<script>
	export let checkout;
	export let handleRemoveFromCart;
</script>

<div>
	<div class="badge badge-error badge-lg flex items-center">
		<h1 class="mr-2">{checkout.name}</h1>
		<button
			on:click={() => handleRemoveFromCart(checkout, checkout.cartId)}
			class="btn btn-outline btn-xs h-6 min-h-0 p-1 text-xs">X</button
		>
	</div>
</div>

<script>
	import PartInfoCard from '$lib/components/PartInfoCard.svelte';
	let part1_data = {
		name: 'Servo',
		img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
		quantity: 20,
		id: 1443
	};
	let part2_data = {
		name: 'Arduino Uno',
		img: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
		quantity: 5,
		id: 1550
	};
</script>

<div class="title">Parts Checkout</div>
<div class="layout">
	<label class="search-label" for="search-input">Search</label>
	<div class="search-bar-container">
		<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
	</div>

	<div class="cards-container">
		<PartInfoCard part_data={part1_data} />
		<PartInfoCard part_data={part2_data} />
		<PartInfoCard part_data={part2_data} />
		<PartInfoCard part_data={part2_data} />
	</div>
	<div class="cart-container">
		<label class="search-label" for="cart-input">Cart</label>
		<div class="cart-input-group">
			<input
				type="text"
				placeholder="Type here"
				class="cart-input input input-bordered w-full max-w-xs"
			/>
			<button class="btn btn-error">Finish Checkout</button>
		</div>
	</div>
</div>

<style>
	.title {
		text-align: center;
		font-size: 2em;
		margin-bottom: 16px;
	}
	.layout {
		display: grid;
		grid-template-columns: 1fr 3fr;
		gap: 16px;
	}
	.search-bar-container {
		grid-column: 1/-1;
		display: flex;
		margin-left: 36px;
		grid-column: 1/-1;
		margin-bottom: 16px;
		text-align: center;
	}
	.cards-container {
		display: flex;
		margin-left: 20px;
		flex-wrap: wrap;
		gap: 16px; /* Adjust the gap between cards */
	}
	.search-label {
		font-weight: bold;
		margin-bottom: 8px;

		display: block;
		text-align: center;
	}
	
	
	.input {
		align-self: right;
	}
	.cart-container {
		display: flex;
		flex-direction: column;
		align-items: center; /* Center items horizontally */
		margin-top: 16px;
	}
	.cart-input-group {
		display: flex;
		align-items: center; /* Align input and button vertically */
	}
	.cart-input {
		margin-right: 8px; /* Space between input and button */
	}
</style>

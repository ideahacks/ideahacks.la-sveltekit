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
	let parts = [
		{
			name: 'Arduino Uno',
			img: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
			quantity: 5,
			id: 1550
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: 1443
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: 1443
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: 1443
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: 1443
		}
	];
	let grouped_parts = [];
	for (let i = 0; i < parts.length; i += 4) {
		grouped_parts.push(parts.slice(i, i + 4));
	}
</script>

<div class="title">Parts Checkout</div>
<div class="layout">
	<div class="left-side">
		<div class="search-bar-container">
			<label class="search-label" for="search-input">Search</label>
			<!-- <div class="search-bar-container">-->
			<div class="change-bar">
				<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
			</div>
		</div>
		<!--</div>-->

		<div class="carousel w-full">
			{#each grouped_parts as item, index}
				<div id={'item' + (index + 1)} class="carousel-item w-full">
					<div class="cards-container">
						{#each item as card}
							<PartInfoCard part_data={card} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="flex w-full justify-center gap-2 py-2">
			{#each grouped_parts as item, index}
				<a href={'#item' + (index + 1)} class="btn btn-xs">{index + 1}</a>
			{/each}
		</div>
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
		font-size: 5em;
		margin-bottom: 16px;
		font-family: 'Paytone One', sans-serif;
		color: #ffffff;
	}
	.left-side {
		display: flex;
		flex-direction: column;
		place-self: center stretch;
	}
	.search-label {
		font-family: 'Paytone One', sans-serif;
		color: #ffffff;
		font-size: 3em;
	}

	.change-bar {
		align-items: center;
		align-self: center;
		display: flex;
		margin-bottom: 10px;
	}
	.layout {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	}
	.search-bar-container {
		display: flex;
		flex-direction: column;
		align-items: center; 
		margin-top: 16px;
	}
	.cards-container {
		display: flex;
		align-items: stretch;

		margin-top: 5px;
		flex-wrap: wrap;
		gap: 8px; 
		width: 100%;
	}
	.carousel {
		justify-self: center;
	}
	.carousel-item {
		justify-self: center;
	}
	.search-label {
		font-weight: bold;
		margin-bottom: 8px;

		display: block;
		text-align: center;
	}

	.cart-container {
		display: flex;
		flex-direction: column;
		align-items: center; 
		margin-top: 16px;
	}
	.cart-input-group {
		display: flex;
		align-items: center; 
	}
	.cart-input {
		margin-right: 8px; 
	}
</style>

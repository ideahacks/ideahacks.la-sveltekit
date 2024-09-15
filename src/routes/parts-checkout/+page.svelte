<script>
	import PartInfoCard from '$lib/components/PartInfoCard.svelte';

	let parts = [
		{
			name: 'Arduino Uno',
			img: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
			quantity: 5,
			id: '1550'
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: '1443'
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: '1443'
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: '1443'
		},
		{
			name: 'Servo',
			img: 'https://www.electronicwings.com/storage/PlatformSection/TopicContent/236/description/servo.jpg',
			quantity: 20,
			id: '1443'
		}
	];
	let filter_text = '';
	let filtered_parts = parts;
	$: filtered_parts = parts.filter(
		(app) =>
			app.name.toLowerCase().includes(filter_text.toLowerCase()) ||
			app.id.toLowerCase().includes(filter_text.toLowerCase())
	);

	let grouped_parts = [];
	$: {
		grouped_parts = [];
		for (let i = 0; i < filtered_parts.length; i += 4) {
			grouped_parts.push(filtered_parts.slice(i, i + 4));
		}
	}
</script>

<div class="title mb-4 text-center font-paytone text-[5em] text-white">Parts Checkout</div>
<div class="layout grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
	<div class="left-side flex flex-col place-self-center place-self-stretch">
		<div class="search-bar-container mt-4 flex flex-col items-center">
			<label
				class="search-label mb-2 block text-center font-paytone text-[3em] font-bold text-white"
				for="search-input">Search</label
			>
			<!-- <div class="search-bar-container">-->
			<div class="change-bar mb-2.5 flex items-center self-center">
				<input
					type="text"
					placeholder="Search by name or ID"
					class="input input-bordered w-full max-w-xs"
					bind:value={filter_text}
				/>
			</div>
		</div>
		<!--</div>-->

		<div class="carousel w-full justify-self-center">
			{#each grouped_parts as item, index}
				<div id={'item' + (index + 1)} class="carousel-item w-full justify-self-center">
					<div class="cards-container mt-[5px] flex w-full flex-wrap items-stretch gap-2">
						{#each item as card}
							<PartInfoCard part_data={card} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="flex w-full justify-center gap-2 py-2">
			{#each grouped_parts as item, index}
				<a href={'#item' + (index + 1)} class="btn btn-xs font-paytone">{index + 1}</a>
			{/each}
		</div>
	</div>
	<div class="cart-container mt-4 flex flex-col items-center">
		<label
			class="search-label mb-2 block text-center font-paytone text-[3em] font-bold text-white"
			for="cart-input">Cart</label
		>
		<div class="cart-input-group flex items-center">
			<input
				type="text"
				placeholder="Team Number"
				class="cart-input input input-bordered mr-2 w-full max-w-xs"
			/>
			<button class="btn btn-error font-paytone text-white">Finish Checkout</button>
		</div>
	</div>
</div>

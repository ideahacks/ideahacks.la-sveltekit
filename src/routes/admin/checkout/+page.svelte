<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import fuzzysort from 'fuzzysort';
	import { ScanBarcode } from 'lucide-svelte';

	export let data;

	$: partIds = data.parts.map((part) => {
		return {
			...part,
			get all_ids() {
				return `${[part.id, ...part.alt_ids].join(' ')}`;
			}
		};
	});
	let search = '';

	$: results = fuzzysort.go(search, partIds, {
		keys: ['all_ids'],
		all: true,
		threshold: -100
	});

	$: serverResponse = null;

	let cart: { id: number; quantity: number }[] = [];
	let teamNumber: number;

	function addToCart(id: number) {
		if (cart.find((part) => part.id === id)) {
			return;
		}

		cart = [...cart, { id, quantity: 1 }];
	}

	function removeFromCart(id: number) {
		cart = cart.filter((part) => part.id !== id);
	}

	async function checkout() {
		const response = await fetch($page.url.pathname, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ teamNumber, cart })
		});

		if (!response.ok) {
			return;
		}

		serverResponse = await response.json();
	}
</script>

{#if serverResponse}
	<div class="m-12 flex flex-col justify-center gap-2 space-y-8">
		<h1 class="text-center font-display-serif text-3xl md:text-4xl">Parts Checkout</h1>
		<p class="text-center font-bold">Successful checkout for team {serverResponse.teamNumber}!</p>
		<p class="text-center">Updated parts:</p>
		<p class="text-center">{JSON.stringify(serverResponse.partsData)}</p>
		<button
			class="btn btn-primary"
			on:click={() => {
				serverResponse = null;
				cart = [];
				teamNumber = undefined;
			}}>Return to Checkout Page</button
		>
	</div>
{:else}
	<div class="m-12 justify-center space-y-8">
		<h1 class="text-center font-display-serif text-3xl md:text-4xl">Parts Checkout</h1>
		<div class="flex">
			<div class="m-4 w-1/2">
				<h2 class="mb-4 text-center font-display-serif text-3xl">Search</h2>
				<div class="flex justify-center gap-2 pb-4">
					<div class="btn btn-primary"><ScanBarcode /></div>
					<form
						on:submit={() => {
							search = '';
							addToCart(results[0].obj.id);
						}}
					>
						<input
							autofocus
							class="input input-bordered"
							placeholder="Search for a part by ID"
							bind:value={search}
						/>
					</form>
				</div>

				<p class="my-4 text-center font-display-sans text-xl">
					You're currently viewing {results.length}
					{results.length === 1 ? 'part' : 'parts'}
				</p>

				<div class="flex flex-wrap justify-center gap-4">
					{#each results as { score, obj: { id, name, quantity, image_url, all_ids } }}
						<div class="card w-60 border border-opacity-50">
							<div class="card-body">
								<div class="card-actions">
									<button
										class="btn btn-primary"
										on:click={() => {
											search = '';
											addToCart(id);
										}}>Add to cart</button
									>
								</div>
								<p>IDs: {all_ids}</p>
								<p>Search score: {score}</p>
								<h2 class="card-title">{name}</h2>
								<div class="badge">Quantity: {quantity}</div>
							</div>
							<figure>
								<img src={image_url} alt={name} />
							</figure>
						</div>
					{/each}
				</div>
			</div>
			<div class="m-4 w-1/2">
				<h2 class="mb-4 text-center font-display-serif text-3xl">Cart</h2>
				<form on:submit|preventDefault={checkout}>
					<input
						class="input input-bordered mb-2"
						type="number"
						min="1"
						required
						placeholder="Team number"
						bind:value={teamNumber}
					/>
					<button type="submit" class="btn btn-primary">Finish Checkout</button>
					<div class="my-2 flex flex-col gap-2">
						{#each cart as part}
							<div class="join">
								<p class="join-item mr-4 place-self-center">Part {part.id}:</p>
								<input
									type="number"
									min="1"
									class="input join-item input-bordered w-24"
									required
									bind:value={part.quantity}
								/>
								<button class="btn btn-secondary join-item" on:click={() => removeFromCart(part.id)}
									>Remove from cart</button
								>
							</div>
						{/each}
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

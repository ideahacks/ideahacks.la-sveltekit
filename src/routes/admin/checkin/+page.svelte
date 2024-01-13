<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import fuzzysort from 'fuzzysort';
	import { ScanBarcode } from 'lucide-svelte';
	import {
		Html5QrcodeScanner,
		type Html5QrcodeResult,
		type QrcodeSuccessCallback
	} from 'html5-qrcode';
	import { onMount } from 'svelte';

	export let data;

	$: partIds = data.parts.map((part) => {
		return {
			...part,
			get all_ids() {
				return `${[part.part_id, ...part.alt_ids].join(' ')}`;
			}
		};
	});
	let search = '';

	$: results = fuzzysort.go(search, partIds, {
		keys: ['all_ids'],
		all: true,
		threshold: -100
	});

	$: firstResultId = results[0].obj.part_id;

	$: serverResponse = null;

	let cart: { part_id: number; quantity: number }[] = [];
	let teamNumber: number | null;

	function addToCart(part_id: number) {
		const existingIdx = cart.findIndex((part) => part.part_id === part_id);
		if (existingIdx !== -1) {
			cart[existingIdx].quantity += 1;
			cart = cart;
			return;
		}

		cart = [...cart, { part_id, quantity: 1 }];
	}

	function removeFromCart(part_id: number) {
		cart = cart.filter((part) => part.part_id !== part_id);
	}

	async function checkin() {
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

	function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
		search = decodedText;
		// FIXME: result sometimes doesn't update fast enough, so force a delay
		setTimeout(() => {
			addToCart(firstResultId);
			search = '';
		}, 100);
	}

	onMount(() => {
		const html5QrcodeScanner = new Html5QrcodeScanner(
			'barcode-scanner',
			{ fps: 10, qrbox: 250 },
			false
		);

		html5QrcodeScanner.render(onScanSuccess, () => {
			/* Callback when no barcode is detected */
		});
	});
</script>

{#if serverResponse}
	<div class="m-12 flex flex-col justify-center gap-2 space-y-8">
		<h1 class="text-center font-display-serif text-3xl md:text-4xl">Parts Check-in</h1>
		<p class="text-center font-bold">Successful check-in for team {serverResponse.teamNumber}!</p>
		<p class="text-center">Updated part quantities (removed from database if zero or negative):</p>
		<p class="text-center">{JSON.stringify(serverResponse.updatedParts)}</p>
		<button
			class="btn btn-secondary"
			on:click={() => {
				serverResponse = null;
				cart = [];
				teamNumber = null;
			}}>Return to Check-In Page</button
		>
	</div>
{:else}
	<div class="m-12 justify-center space-y-8">
		<h1 class="text-center font-display-serif text-3xl md:text-4xl">Parts Check-In</h1>
		<div class="flex">
			<div class="m-4 w-1/2">
				<h2 class="mb-4 text-center font-display-serif text-3xl">Search</h2>
				<div class="flex flex-col items-center">
					<div class="flex justify-center gap-2 pb-4">
						<div class="form-control">
							<label class="label cursor-pointer">
								<span class="label-text"><ScanBarcode /></span>
								<input
									type="checkbox"
									class="toggle toggle-secondary"
									on:click={() => {
										document.getElementById('barcode-scanner')?.classList.toggle('hidden');
									}}
								/>
							</label>
						</div>
						<form
							id="search"
							on:submit={() => {
								// FIXME: result sometimes doesn't update fast enough, so force a delay
								setTimeout(() => {
									addToCart(firstResultId);
									search = '';
								}, 100);
							}}
						>
							<!-- svelte-ignore a11y-autofocus -->
							<input
								autofocus
								class="input input-bordered"
								placeholder="Search for a part by ID"
								bind:value={search}
							/>
						</form>
					</div>
					<div id="barcode-scanner" class="hidden w-64" />
				</div>

				<p class="my-4 text-center font-display-sans text-xl">
					You're currently viewing {results.length}
					{results.length === 1 ? 'part' : 'parts'}
				</p>

				<div class="flex flex-wrap justify-center gap-4">
					{#each results as { score, obj: { part_id, name, quantity, image_url, all_ids } }}
						<div class="card w-60 border border-opacity-50">
							<div class="card-body">
								<div class="card-actions">
									<button
										class="btn btn-secondary"
										on:click={() => {
											addToCart(part_id);
											search = '';
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
				<form on:submit|preventDefault={checkin}>
					<input
						class="input input-bordered mb-2"
						type="number"
						min="1"
						required
						placeholder="Team number"
						bind:value={teamNumber}
					/>
					<button type="submit" class="btn btn-secondary">Finish Check-In</button>
					<div class="my-2 flex flex-col gap-2">
						{#each cart as part}
							<div class="join">
								<p class="join-item mr-4 place-self-center">Part {part.part_id}:</p>
								<input
									type="number"
									min="1"
									class="input join-item input-bordered w-24"
									required
									bind:value={part.quantity}
								/>
								<button class="btn join-item" on:click={() => removeFromCart(part.part_id)}
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

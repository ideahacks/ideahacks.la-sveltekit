<script lang="ts">
	import AdminPartCard from '$lib/components/AdminPartCard.svelte';
	import { Download } from 'lucide-svelte';
	import { Upload } from 'lucide-svelte';
	import { Trash2 } from 'lucide-svelte';
	import { ScanBarcode } from 'lucide-svelte';
	import { Keyboard } from 'lucide-svelte';
	import { ChevronLeft } from 'lucide-svelte';

	import fuzzysort from 'fuzzysort';

	import { supabaseClient } from '$lib/supabase';

	export let data;

	const is_admin = data.is_admin;

	let parts = data.parts ?? [];
	// handle the fuzzysort here
	let search = ''; // search content
	let searchTag = ''; // search tag
	let selectedTags: string[] = [];

	let team_code = '';
	// progress
	let errorMessage = '';
	let checkoutLoading = false;
	let checkinLoading = false;
	// function onScanSuccess(decodedText: string, decodedResult: Html5QrcodeResult) {
	// 	search = decodedText;
	// 	// FIXME: result sometimes doesn't update fast enough, so force a delay
	// 	setTimeout(() => {}, 100);
	// }
	// onMount(() => {
	// 	const html5QrcodeScanner = new Html5QrcodeScanner(
	// 		'barcode-scanner',
	// 		{ fps: 10, qrbox: 250 },
	// 		false
	// 	);

	// 	html5QrcodeScanner.render(onScanSuccess, () => {
	// 		/* Callback when no barcode is detected */
	// 	});
	// });

	interface CartItem {
		part_id: string;
		part_quantity: number;
	}

	let cartItems: CartItem[] = [];

	function showMessage(msg: string, duration = 750) {
		errorMessage = msg;
		setTimeout(() => (errorMessage = ''), duration);
	}

	function getPartIDFromString(idString: string): string | null {
		if (!parts) {
			return '';
		}

		for (let i = 0; i < parts.length; i++) {
			if (parts[i].part_id === idString) {
				return idString;
			} else {
				if (parts[i].alt_ids) {
					if (parts[i].alt_ids.includes(idString)) {
						return parts[i].part_id;
					}
				}
			}
		}

		return null;
	}

	function addPartToCart(part_id: string, part_quantity: number) {
		if (part_id === '') {
			showMessage('Invalid Barcode!');
			return false;
		}

		const existingItemIndex = cartItems.findIndex((item) => item.part_id === part_id);
		if (existingItemIndex >= 0) {
			cartItems[existingItemIndex].part_quantity += part_quantity;
		} else {
			cartItems = [...cartItems, { part_id, part_quantity }];
		}
		return true;
	}

	function getPartInfo(part_id: string) {
		return parts.find((part) => part.part_id === part_id);
	}

	function removePartFromCart(part_id: string) {
		const existingItemIndex = cartItems.findIndex((item) => item.part_id === part_id);
		cartItems.splice(existingItemIndex, 1);
		// to update the state
		cartItems = cartItems;
	}
	function incrementPartQuantity(part_id: string) {
		const existingItemIndex = cartItems.findIndex((item) => item.part_id === part_id);
		cartItems[existingItemIndex].part_quantity += 1;
	}

	function decrementPartQuantity(part_id: string) {
		const existingItemIndex = cartItems.findIndex((item) => item.part_id === part_id);
		cartItems[existingItemIndex].part_quantity -= 1;
		if (cartItems[existingItemIndex].part_quantity === 0) {
			cartItems.splice(existingItemIndex, 1);
			// to update the state
			cartItems = cartItems;
		}
	}

	async function checkout(e: Event) {
		if (cartItems.length === 0) {
			showMessage('Cart is Empty!');
			return;
		}
		checkoutLoading = true;
		// first, check if the team exists
		const { data: team, error: teamError } = await supabaseClient
			.from('teams_2025')
			.select()
			.eq('team_code', team_code);

		if (teamError) {
			console.log(teamError);
			showMessage('Team fetch error');
			checkoutLoading = false;
			return;
		}

		if (team.length === 0) {
			showMessage('Team Code Invalid!');
			checkoutLoading = false;
			return;
		}

		// fetch part quantities and count how many left
		// convert cart items to a list of part ids
		const part_ids = cartItems.map((item) => item.part_id);
		const { data: partsData, error: partsDataError } = await supabaseClient
			.from('parts_2025')
			.select()
			.in('part_id', part_ids);
		if (partsDataError) {
			console.log(partsDataError);
			showMessage('Error fetching parts!');
			checkoutLoading = false;
			return;
		}

		function getPart(part_id: string) {
			return partsData?.find((item) => item.part_id === part_id);
		}

		// check if there are enough parts to check out
		for (let i = 0; i < cartItems.length; i++) {
			if (
				cartItems[i].part_quantity + getPart(cartItems[i].part_id).num_in_use >
				getPart(cartItems[i].part_id).quantity
			) {
				showMessage(
					'There are not enough parts to checkout for ' +
						getPart(cartItems[i].part_id).name +
						' with ID ' +
						cartItems[i].part_id,
					4500
				);
				updateParts();
				checkoutLoading = false;
				return;
			}
		}

		let upsertRecords = [];

		// update parts database's checked out parts
		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i];
			let upsertRecord = {
				part_id: item.part_id,
				num_in_use: getPart(item.part_id).num_in_use + item.part_quantity
			};
			upsertRecords.push(upsertRecord);
		}

		const { data: partsAfterCheckout, error: checkoutError } = await supabaseClient
			.from('parts_2025')
			.upsert(upsertRecords)
			.select();

		if (checkoutError) {
			alert(JSON.stringify(checkoutError));
		}

		// add team-to-part entry
		const { data: teamParts, error: teamPartsError } = await supabaseClient
			.from('teams_parts_2025')
			.select()
			.eq('team_id', team[0].id)
			.in('part_id', part_ids);
		if (teamPartsError) {
			console.log(teamPartsError);
			checkoutLoading = false;
			return;
		}
		// teamParts contains the team's parts and their quantities
		// Group the parts that don't have a teams_parts entry
		upsertRecords = [];

		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i];
			let upsertRecord = {
				team_id: team[0].id,
				part_id: item.part_id,
				quantity: teamParts?.find((item) => item.part_id === item.part_id)
					? teamParts?.find((item) => item.part_id === item.part_id).quantity + item.part_quantity
					: item.part_quantity
			};
			upsertRecords.push(upsertRecord);
		}

		const { data: insertedParts, error: insertError } = await supabaseClient
			.from('teams_parts_2025')
			.upsert(upsertRecords)
			.select();
		if (insertError) {
			console.log(insertError);
			checkoutLoading = false;
			return;
		}

		cartItems = [];
		showMessage('Success!');
		checkoutLoading = false;
		updateParts();
		focusSearchBar(e);
	}

	async function checkin(e: Event) {
		if (cartItems.length === 0) {
			showMessage('Cart is Empty!');
			return;
		}

		checkinLoading = true;
		// first, check if the team exists
		const { data: team, error: teamError } = await supabaseClient
			.from('teams_2025')
			.select()
			.eq('team_code', team_code);

		if (teamError) {
			console.log(teamError);
			showMessage('Team fetch error');
			checkinLoading = false;
			return;
		}

		if (team.length === 0) {
			showMessage('Team Code Invalid!');
			checkinLoading = false;
			return;
		}

		// fetch part quantities and count how many left
		// convert cart items to a list of part ids
		const part_ids = cartItems.map((item) => item.part_id);
		const { data: partsData, error: partsDataError } = await supabaseClient
			.from('parts_2025')
			.select()
			.in('part_id', part_ids);
		if (partsDataError) {
			console.log(partsDataError);
			showMessage('Error fetching parts!');
			checkinLoading = false;
			return;
		}
		const { data: teamParts, error: teamPartsError } = await supabaseClient
			.from('teams_parts_2025')
			.select()
			.eq('team_id', team[0].id)
			.in('part_id', part_ids);
		if (teamPartsError) {
			console.log(teamPartsError);
			checkinLoading = false;
			return;
		}
		function getPart(part_id: string) {
			return partsData?.find((item) => item.part_id === part_id);
		}
		function getTeamPart(part_id: string) {
			return teamParts?.find((item) => item.part_id === part_id);
		}

		// check if there are enough team parts to check in
		for (let i = 0; i < cartItems.length; i++) {
			if (
				!getTeamPart(cartItems[i].part_id) ||
				cartItems[i].part_quantity > getTeamPart(cartItems[i].part_id).quantity
			) {
				showMessage(
					'There are not enough parts to check in for' +
						getPart(cartItems[i].part_id).name +
						' with ID ' +
						cartItems[i].part_id,
					4500
				);
				updateParts();
				checkinLoading = false;
				return;
			}
		}

		let upsertRecords = [];

		// update parts database's checked in parts
		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i];
			let upsertRecord = {
				part_id: item.part_id,
				num_in_use: getPart(item.part_id).num_in_use - item.part_quantity
			};

			upsertRecords.push(upsertRecord);
		}

		const { data: partsAfterCheckin, error: checkinError } = await supabaseClient
			.from('parts_2025')
			.upsert(upsertRecords)
			.select();
		if (checkinError) {
			alert(checkinError);
			console.log(checkinError);
			checkinLoading = false;
			return;
		}

		// update team-to-part entry
		// teamParts contains the team's parts and their quantities
		upsertRecords = [];

		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i];
			let upsertRecord = {
				team_id: team[0].id,
				part_id: item.part_id,
				quantity: teamParts?.find((item) => item.part_id === item.part_id)
					? teamParts?.find((item) => item.part_id === item.part_id).quantity - item.part_quantity
					: item.part_quantity
			};
			upsertRecords.push(upsertRecord);
		}

		const { data: insertedParts, error: insertError } = await supabaseClient
			.from('teams_parts_2025')
			.upsert(upsertRecords)
			.select();
		if (insertError) {
			alert(insertError);
			checkinLoading = false;
			return;
		}
		const idsToDelete = [];
		for (let i = 0; i < insertedParts.length; i++) {
			const insertedPart = insertedParts[i];

			if (insertedPart.quantity <= 0) {
				// remove from teams_parts
				idsToDelete.push(insertedPart.part_id);
			}
		}

		// Delete the records with 0 quantity
		const { error: deleteError } = await supabaseClient
			.from('teams_parts_2025')
			.delete()
			.eq('team_id', team[0].id)
			.in('part_id', idsToDelete);
		if (deleteError) {
			alert(deleteError);
			checkinLoading = false;
			return;
		}
		cartItems = [];
		showMessage('Success!');
		checkinLoading = false;
		updateParts();
		focusSearchBar(e);
	}

	async function updateParts() {
		const { data: updatedParts, error: partsFetchError } = await supabaseClient
			.from('parts_2025')
			.select();

		if (partsFetchError) {
			alert('Could not show parts!');
			return;
		}

		for (let i = 0; i < updatedParts.length; i++) {
			if (updatedParts[i].requires_checkout === 'Checkout') {
				updatedParts[i].requires_checkout = true;
			} else {
				updatedParts[i].requires_checkout = false;
			}

			if (updatedParts[i].tags) {
				updatedParts[i].tags = updatedParts[i].tags.split(', ');
			} else {
				updatedParts[i].tags = [];
			}
		}

		parts = updatedParts;
	}

	function handleSubmit() {
		// purely by ALT ids

		let part_id = getPartIDFromString(search);
		if (part_id) {
			if (!getPartInfo(part_id).requires_checkout) {
				showMessage('Part does not require checkout');
			} else {
				addPartToCart(part_id, 1);
				showMessage('Part scanned in!');
			}
		} else {
			showMessage("Part doesn't exist");
		}

		search = '';
	}

	function recalibrate(event: Event) {
		focusSearchBar(event);
		showMessage('Re-Calibrated!');
		search = '';
	}

	let searchBar: HTMLInputElement;
	let scannerMode = false;
	function focusSearchBar(event: Event) {
		event.preventDefault();
		searchBar.focus();
	}

	function toggleScannerMode() {
		scannerMode = !scannerMode;
	}

	$: tagFilteredParts =
		selectedTags.length === 0
			? parts
			: parts.filter(({ tags }) =>
					selectedTags.every((selectedTag: string) => tags.includes(selectedTag))
			  );

	$: results = fuzzysort.go(search, tagFilteredParts, {
		keys: scannerMode ? ['part_id'] : ['name', 'part_id'],
		all: true
	});

	// handle the pagination here
	$: currentPage = 1;
	const itemsPerPage = 8;
	$: totalPages = Math.ceil(results.length / itemsPerPage);
	$: paginatedResults = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
</script>

{#if is_admin}
	<div class="z-10 mx-2 w-24 font-encode text-white sm:mx-24">
		<a
			href="/admin"
			class="z-10 flex rounded-md border border-white border-opacity-10 px-2 py-1 font-encode text-sm font-light text-white hover:bg-black hover:bg-opacity-10"
		>
			<ChevronLeft class="h-5" />
			<p class="text-">Admin</p>
		</a>
	</div>
	{#if errorMessage !== ''}
		<div class="toast toast-center toast-top">
			<div class=" alert">
				<span class="">{errorMessage}</span>
			</div>
		</div>
	{/if}

	<h1 class="mb-6 mt-5 text-center font-paytone text-5xl font-bold text-white">
		Parts Admin Panel
	</h1>
	<div class="z-10 flex gap-4">
		<div class="w-1/2">
			<div class="text-center">
				<form on:submit|preventDefault={handleSubmit}>
					{#if scannerMode}
						<input
							type="text"
							name="search"
							bind:value={search}
							bind:this={searchBar}
							autofocus
							class="input absolute top-0 w-0 opacity-0"
						/>
					{:else}
						<input
							type="text"
							name="search"
							bind:value={search}
							bind:this={searchBar}
							on:input={() => (currentPage = 1)}
							placeholder={scannerMode ? 'Scan part' : 'Search part by Name or ID'}
							autofocus
							class="input input-ghost mx-2 w-full max-w-xs font-encode text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
						/>
					{/if}
				</form>
				{#if scannerMode}
					<button
						class="btn btn-ghost border-white border-opacity-10 font-encode text-lg font-light text-white"
						on:click={recalibrate}>Re-Calibrate<ScanBarcode class="w-10" /></button
					>
				{/if}
			</div>
			<div class="mt-2 w-full text-center">
				<button
					class="btn btn-ghost border border-white border-opacity-10 font-encode text-lg font-light text-white"
					on:click={(event) => focusSearchBar(event)}
					on:click={toggleScannerMode}
				>
					{#if !scannerMode}
						Enter Scanning Mode <ScanBarcode class="h-5 w-5 text-white" />
					{:else}
						Enter Manual Mode <Keyboard class="h-5 w-5 text-white" />
					{/if}
				</button>
			</div>

			<!-- <div class="dropdown dropdown-bottom mt-1 flex justify-center">
	<div tabindex="0" role="button" class="btn btn-xs m-1 font-encode text-xs">Filter by:</div>
	<div
		tabindex="-1"
		class="overflow-x-none menu dropdown-content z-[1] max-h-52 w-52 overflow-y-auto rounded-box bg-base-100 p-2"
	>
		{#each results_tags as tag}
			<div class="items-center">
				<input
					type="checkbox"
					value={tag}
					bind:group={selectedTags}
					class="rounded-xs checkbox h-5 w-5"
				/>
				<span class="label-text ml-2 font-encode text-xs">{tag}</span>
			</div>
		{/each}
	</div>
</div> -->

			<!-- FILTERS -->
			<!-- <div class="m-4 rounded-md border border-white border-opacity-50 bg-black bg-opacity-10 p-5">
			<input
				type="text"
				name="search"
				bind:value={searchTag}
				placeholder="Search tag"
				class="text-md input input-sm input-ghost mx-auto mb-5 block w-48 font-encode text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
			/>
			<div class="h-48">
				<div class="flex max-h-48 flex-wrap justify-center gap-2 overflow-y-auto">
					{#each results_tags as tag}
						<div
							class="btn form-control btn-sm border-none bg-opacity-10 font-encode font-thin has-[:hover]:btn-ghost"
						>
							<label class="label cursor-pointer">
								<input
									type="checkbox"
									value={tag}
									class=" checkbox mr-2"
									bind:group={selectedTags}
									on:click={() => (currentPage = 1)}
								/>
								<span class="label-text text-white">{tag}</span>
							</label>
						</div>
					{/each}
				</div>
			</div>
		</div> -->
			{#if scannerMode}
				<h1 class="m-4 text-center font-encode text-lg text-white">Scan your parts now!</h1>
				<h1 class="text-center">
					<span class="loading loading-bars loading-lg text-white" />
				</h1>
				<p class="text-md m-4 text-center font-encode text-white">
					Please do not click or type anywhere during the scanning process!
				</p>
				<p class="text-md m-4 text-center font-encode text-white">
					If the scanned items are not being added to the cart, please click the Re-Calibrate button
					and resume scanning
				</p>
			{:else}
				<p class="m-4 text-center font-encode text-xs text-white">
					Showing {paginatedResults.length} out of {parts.length} parts
				</p>

				<div class="flex flex-wrap justify-center gap-4 pb-12">
					{#each paginatedResults as part}
						<AdminPartCard part_info={part.obj} {addPartToCart} />
					{/each}
				</div>
			{/if}

			<!-- <div class="join my-10 justify-center">
			{#each totalPagesArray as pageNum}
				<input
					class="btn btn-square join-item after:btn-ghost"
					type="radio"
					name="options"
					id="part_{pageNum}"
					value={pageNum}
					bind:group={currentPage}
					aria-label={String(pageNum)}
					checked={currentPage === pageNum}
				/>
			{/each}
		</div> -->
		</div>
		<div class="w-0.5 bg-white bg-opacity-25" />
		<div class="w-1/2 font-encode text-white">
			<h3 class="mt-10 font-paytone text-xl text-white">Cart</h3>
			<div>
				<p>
					<span class="font-bold">Check Out</span>: if they're taking the part from you
				</p>
				<p>
					<span class="font-bold">Check In</span>: if they're bringing the part back to you
				</p>
			</div>
			<div class="overflow-x-auto">
				<table class="table">
					<thead class="font-paytone text-white">
						<tr>
							<th>ID</th>
							<th>Part</th>

							<th />
							<th>Quantity</th>
							<th />
							<th />
						</tr>
					</thead>

					<tbody class="font-encode text-white">
						{#each cartItems as item}
							<tr>
								<td>{item.part_id}</td>
								<td>{getPartInfo(item.part_id).name}</td>
								<td
									><img
										src={getPartInfo(item.part_id).image_url}
										alt="default"
										class="h-16 w-16 rounded object-contain"
									/></td
								>
								<td class="text-lg font-bold">{item.part_quantity}</td>

								<td class="">
									{#if scannerMode}
										<button
											class="btn btn-circle btn-ghost"
											on:click={(e) => {
												decrementPartQuantity(item.part_id);
												focusSearchBar(e);
											}}>-</button
										><button
											class="btn btn-circle btn-ghost"
											on:click={(e) => {
												incrementPartQuantity(item.part_id);
												focusSearchBar(e);
											}}>+</button
										>
									{:else}
										<button
											class="btn btn-circle btn-ghost"
											on:click={() => decrementPartQuantity(item.part_id)}>-</button
										><button
											class="btn btn-circle btn-ghost"
											on:click={() => incrementPartQuantity(item.part_id)}>+</button
										>
									{/if}</td
								>

								<td>
									{#if scannerMode}
										<button
											class="btn btn-circle btn-ghost"
											on:click={(e) => {
												removePartFromCart(item.part_id);
												focusSearchBar(e);
											}}><Trash2 /></button
										>
									{:else}
										<button
											class="btn btn-circle btn-ghost"
											on:click={(e) => {
												removePartFromCart(item.part_id);
											}}><Trash2 /></button
										>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			{#if scannerMode}
				<button
					disabled={cartItems.length === 0}
					class="btn btn-ghost my-10 border-white border-opacity-10 text-white disabled:btn-ghost disabled:text-white disabled:opacity-40"
					on:click={(e) => {
						cartItems = [];
						focusSearchBar(e);
					}}>Clear Cart <Trash2 /></button
				>
			{:else}
				<button
					disabled={cartItems.length === 0}
					class="btn btn-ghost my-10 border-white border-opacity-10 text-white disabled:btn-ghost disabled:text-white disabled:opacity-40"
					on:click={() => (cartItems = [])}>Clear Cart <Trash2 /></button
				>
			{/if}
			<input
				name="preferred_name"
				placeholder="Enter Team Code"
				bind:value={team_code}
				class="input input-ghost block w-full max-w-xs font-encode text-white placeholder-white caret-white focus:bg-opacity-30 focus:text-white focus:outline-none"
			/>
			<div class="flex gap-4">
				{#if !checkoutLoading}
					<button
						class="btn btn-ghost mt-2 border-white border-opacity-10 text-white"
						on:click={checkout}>Check Out <Upload /></button
					>
				{:else}
					<button class="btn btn-ghost text-white hover:bg-white hover:bg-opacity-10"
						><span class="loading loading-ring loading-md" /></button
					>
				{/if}
				{#if !checkinLoading}
					<button
						class="btn btn-ghost mt-2 border-white border-opacity-10 text-white"
						on:click={checkin}>Check In <Download /></button
					>
				{:else}
					<button class="btn btn-ghost text-white hover:bg-white hover:bg-opacity-10"
						><span class="loading loading-ring loading-md" /></button
					>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<h1 class="m-auto max-w-xl text-center font-encode text-lg text-white">
		You are not an admin! Contact webmaster@ieeebruins.com or agariomasster on discord for any
		questions!
	</h1>
{/if}

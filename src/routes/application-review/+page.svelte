<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import ApplicationStatusCard from '$lib/components/ApplicationStatusCard.svelte';
	export let data;
	export let form;

	const APPS_PER_PAGE = 10;

	const is_admin = data.is_admin;

	let apps = data.applications;

	// console.log(apps);
	let filter_text = '';
	let filtered_apps = apps;

	let grouped_apps = [];
	$: {
		grouped_apps = [];
		for (let i = 0; i < filtered_apps.length; i += APPS_PER_PAGE) {
			grouped_apps.push(filtered_apps.slice(i, i + APPS_PER_PAGE));
		}
	}

	$: filtered_apps = apps.filter(
		(app) =>
			app.full_name.toLowerCase().includes(filter_text.toLowerCase()) ||
			(app.status?.toLowerCase().includes(filter_text.toLowerCase()) ?? false)
	);
</script>

{#if is_admin}
	<div class="mx-auto my-10 text-center font-paytone text-3xl text-white max-sm:max-w-xs">
		Application Review
	</div>
	<div class="card-container flex flex-wrap justify-center gap-20">
		<div class="card w-[150px] bg-white bg-opacity-10 p-4 text-neutral-content">
			<div class="card-body items-center text-center">
				<h2 class="card-title font-encode">{apps.length}</h2>
				<p class="font-paytone">Applications</p>
			</div>
		</div>
		<!-- 
	<div class="card w-[150px] bg-warning p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.accepted}</h2>
			<p class="font-paytone">Accepted</p>
		</div>
	</div>

	<div class="card w-[150px] bg-success p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.waitlisted}</h2>
			<p class="font-paytone">Waitlisted</p>
		</div>
	</div>

	<div class="card w-[150px] bg-info p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.rejected}</h2>
			<p class="font-paytone">Rejected</p>
		</div>
	</div>

	<div class="card w-[150px] bg-primary p-4 text-neutral-content">
		<div class="card-body items-center text-center">
			<h2 class="card-title font-paytone">{app_status.pending}</h2>
			<p class="font-paytone">Pending</p>
		</div>
	</div> -->
	</div>
	<input
		type="text"
		placeholder="Search by name or application status"
		class="input m-8 w-full max-w-xs self-center bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		bind:value={filter_text}
	/>
	<div class="display flex flex-col items-center justify-center">
		<div class="carousel flex w-full items-center">
			{#each grouped_apps as item, index}
				<div id={'item' + (index + 1)} class="carousel-item w-full">
					<div class="cards-container flex flex-wrap justify-center">
						{#each item as card, cardIndex}
							<ApplicationStatusCard application={card} index={index * APPS_PER_PAGE + cardIndex} />
							<dialog id={`modal_${index * APPS_PER_PAGE + cardIndex}`} class="modal">
								<div class="modal-box bg-opacity-80">
									<div class="firstSection pb-5">
										<h3 class="text-lg font-bold">{card.full_name}</h3>
										<p class="py">
											<span class="font-bold">Preferred Name:</span>
											{card.preferred_name}
										</p>
										<p class="py"><span class="font-bold">Email: </span>{card.email}</p>
										<p class="py"><span class="font-bold">Status: </span>{card.status}</p>
										<p class="py"><span class="font-bold">Pronouns: </span>{card.pronouns}</p>
										<p class="py"><span class="font-bold">School: </span>{card.school}</p>
										<p class="py">
											<span class="font-bold">Year: </span>{card.year_at_current_university}
										</p>
										{#if card.is_transfer == 'true'}
											<p class="py"><span class="font-bold">Transfer: </span>Yes</p>
										{:else}
											<p class="py"><span class="font-bold">Transfer: </span></p>
										{/if}
										<p class="py"><span class="font-bold">Major: </span> {card.major}</p>
									</div>
									<div class="firstSection pb-5">
										<p class="py">
											<span class="font-bold">Experience: </span>{card.prior_engineering_experience}
										</p>
										<p class="py">
											<span class="font-bold">Why Ideahacks: </span>{card.why_ideahacks}
										</p>
										<p class="py">
											<span class="font-bold">Hackathon Ideas: </span>{card.hackathon_ideas}
										</p>
										<p class="py">
											<span class="font-bold"
												>Prior Hackathon Experience:
											</span>{card.prior_hackathon_experience}
										</p>
									</div>
									{#if card.suggested_parts == ''}
										<p class="py"><span class="font-bold">Suggested Parts: </span></p>
									{:else}
										<p class="py">
											<span class="font-bold">Suggested Parts: </span>{card.suggested_parts}
										</p>
									{/if}
									<p class="py"><span class="font-bold">Shirt Size: </span>{card.shirt_size}</p>
									{#if card.dietary_restrictions == ''}
										<p class="py"><span class="font-bold">Dietary Restrictions: </span>None</p>
									{:else}
										<p class="py">
											<span class="font-bold"
												>Dietary Restrictions:
											</span>{card.dietary_restrictions}
										</p>
									{/if}
									<div class="modal-action">
										<form method="dialog">
											<form method="POST">
												<input hidden name="email" value={card.email} />
												<button
													class="btn m-2 bg-warning text-white opacity-50"
													formaction="?/accept">Accept</button
												>
												<button
													class="btn m-2 bg-success text-white opacity-50"
													formaction="?/waitlist">Waitlist</button
												>
												<button class="btn m-2 bg-info text-white opacity-50" formaction="?/reject"
													>Reject</button
												>
												<button
													class="btn m-2 bg-primary text-white opacity-50"
													formaction="?/pending">Pending</button
												>
												<button
													class="btn m-2 bg-primary text-white opacity-50"
													formaction="?/close">Close</button
												>
											</form>
										</form>
									</div>
								</div>
							</dialog>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="flex w-full flex-wrap justify-center gap-2 py-2">
			{#each grouped_apps as item, index}
				<a href={'#item' + (index + 1)} class="btn btn-xs font-paytone">{index + 1}</a>
			{/each}
		</div>
	</div>
{:else}
	<h1 class="m-auto max-w-xl text-center font-encode text-lg text-white">
		You are not an admin! Contact webmaster@ieeebruins.com or agariomasster on discord for any
		questions!
	</h1>
{/if}

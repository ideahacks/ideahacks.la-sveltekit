<script lang="ts">
	import { Plus, Minus, ChevronLeft } from 'lucide-svelte';

	export let data;
	export let form;

	const is_admin = data.is_admin;
</script>

{#if is_admin}
	<div class="z-10 mx-5 w-24 font-encode text-white sm:mx-24">
		<a
			href="/admin"
			class="z-10 flex rounded-md border border-white border-opacity-10 px-2 py-1 font-encode text-sm font-light text-white hover:bg-black hover:bg-opacity-10"
		>
			<ChevronLeft class="h-5" />
			<p class="text-">Admin</p>
		</a>
	</div>
	<div class="z-10 mx-5 mb-10 max-w-4xl font-encode text-white sm:mx-24">
		<h1 class="mt-10 font-paytone text-2xl">Add New Participant</h1>
		<div class="label">
			<span class="label-text text-white"
				>Make sure email supports Google Sign in and is entered in <span class="font-bold"
					>all lowercase!
				</span>If adding UCLA email, use g.ucla.edu and not ucla.edu</span
			>
		</div>

		<form method="POST" action="?/add">
			<input
				type="email"
				name="email"
				placeholder="Email"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
			/>
			<div class="h-2" />
			<div class="flex">
				<input
					name="full_name"
					placeholder="Full Name"
					class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
				/>
				<button class="btn btn-ghost mx-2 text-white"><Plus /></button>
			</div>
			{#if form?.action == 'add'}
				<div class="text-md mt-4 font-encode text-white">{form?.message ?? ''}</div>
			{/if}
		</form>

		<h1 class="mt-10 font-paytone text-2xl">Delete Participant</h1>
		<div class="label">
			<span class="label-text text-white"
				>Delete a participant by email address (case sensitive).</span
			>
		</div>
		<form method="POST" action="?/delete" class="flex">
			<input
				type="email"
				name="email"
				placeholder="Email to Delete"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
				required
			/>
			<button class="btn btn-ghost mx-2 text-white"><Minus /></button>
		</form>
		{#if form?.action == 'delete'}
			<div class="text-md mt-4 font-encode text-white">{form?.message ?? ''}</div>
		{/if}

		<h1 class="mt-10 font-paytone text-2xl">Current Participants</h1>
		{#each data.participants as participant}
			<p>{participant.full_name} ({participant.email})</p>
		{/each}
	</div>
{:else}
	<h1 class="m-auto max-w-xl text-center font-encode text-lg text-white">
		You are not an admin! Contact webmaster@ieeebruins.com or agariomasster on discord for any
		questions!
	</h1>
{/if}

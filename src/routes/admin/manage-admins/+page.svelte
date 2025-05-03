<script>
	import { Plus } from 'lucide-svelte';

	export let data;
	export let form;

	const is_admin = data.is_admin;
</script>

{#if is_admin}
	<div class="z-10 mx-5 my-10 max-w-4xl font-encode text-white sm:mx-24">
		<h1 class="mt-10 font-paytone text-2xl">Add New Admin</h1>
		<div class="label">
			<span class="label-text text-white"
				>Use g.ucla.edu and not ucla.edu. Make sure the email is entered in <span class="font-bold"
					>all lowercase</span
				></span
			>
		</div>
		<form method="POST" class="flex">
			<input
				name="email"
				placeholder="email (.g.ucla.edu)"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
			/>
			<button class="btn btn-ghost mx-2 text-white"><Plus /></button>
		</form>
		<div class="text-md mt-4 font-encode text-white">{form?.message ?? ''}</div>
		<h1 class="mt-10 font-paytone text-2xl">Current Admins</h1>
		{#each data.admins as admin}
			<p>{admin.email}</p>
		{/each}
	</div>
{:else}
	<h1 class="m-auto max-w-xl text-center font-encode text-lg text-white">
		You are not an admin! Contact webmaster@ieeebruins.com or agariomasster on discord for any
		questions!
	</h1>
{/if}

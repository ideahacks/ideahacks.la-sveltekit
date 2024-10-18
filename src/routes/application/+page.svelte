<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	export let data;

	// Client API:
	const { form } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="POST" class="mx-auto w-full max-w-screen-lg">
	<!-- First Row -->
	<!-- Create a component -->
	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- Name -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">What is your name?</span>
			</div>
			<input
				name="name"
				bind:value={$form.name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<!-- Email -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Email</span>
			</div>
			<input
				name="email"
				bind:value={$form.email}
				type="email"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
	</div>

	<div><button>Submit</button></div>
</form>

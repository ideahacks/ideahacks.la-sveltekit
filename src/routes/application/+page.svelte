<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	export let data;

	// Client API:
	const { form } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="POST" class="mx-auto w-full max-w-xl">
	<div class="mt-4 font-bold">Personal</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- Name -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Full Name*</span>
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
				<span class="label-text">Preferred Name</span>
			</div>
			<input
				name="email"
				bind:value={$form.name}
				type="email"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
	</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- NAME -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">EMAIL*</span>
			</div>
			<input
				name="name"
				bind:value={$form.name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<!-- EMAIL -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">PRONOUNS</span>
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

	<!-- EDUCATIOn -->
	<div class="mt-4 font-bold">Education</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- College -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">SCHOOL*</span>
			</div>
			<input
				name="name"
				bind:value={$form.name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<!-- EMAIL -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">SCHOOL (IF OTHER)</span>
			</div>
			<input
				name="name"
				bind:value={$form.name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>
	</div>

	<!-- MAJOR -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text">MAJOR*</span>
		</div>
		<input
			name="name"
			bind:value={$form.name}
			type="text"
			placeholder="e.g. Electrical Engineering"
			class="input input-bordered w-full"
		/>
	</label>

	<!-- YEAR -->
	<!-- 1, 2, 3, 3rd year transfer, 4, 4th year transfer, 5th or above, Graduated -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text">YEAR*</span>
		</div>
		<input
			name="name"
			bind:value={$form.name}
			type="text"
			placeholder="e.g. Electrical Engineering"
			class="input input-bordered w-full"
		/>
	</label>

	<!-- MAJOR -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text">MAJOR*</span>
		</div>
		<input
			name="name"
			bind:value={$form.name}
			type="text"
			placeholder="e.g. Electrical Engineering"
			class="input input-bordered w-full"
		/>
	</label>

	<div class="mt-4 font-bold">Short Answer</div>
	<!-- Engineering experince -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text"
				>1. What are your previous engineering experiences (250 words max) *</span
			>
		</div>
		<textarea
			name="name"
			rows="4"
			bind:value={$form.name}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
	</label>

	<!-- Why do you want to participate -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text"
				>2. Why do you want to participate in IDEA Hacks? (250 words max)*</span
			>
		</div>
		<textarea
			name="name"
			rows="4"
			bind:value={$form.name}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
	</label>

	<!-- Idea for this years theme -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text"
				>3. Do you have an idea to hack for this year's theme? It's ok if you don't yet! (100 words
				max)*</span
			>
		</div>
		<textarea
			name="name"
			rows="4"
			bind:value={$form.name}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
	</label>

	<!-- Parts request -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text"
				>4. If you have prior hackathon experience, please share with us. (50 words max)</span
			>
		</div>
		<textarea
			name="name"
			rows="4"
			bind:value={$form.name}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
	</label>

	<!-- Idea for this years theme -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text"
				>5. What parts would you like to see at this years IDEA Hacks? (100 words max)</span
			>
		</div>
		<textarea
			name="name"
			rows="4"
			bind:value={$form.name}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
	</label>

	<div class="mt-4 font-bold">Miscellaneous</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- NAME -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Shirt Size*</span>
			</div>
			<input
				name="name"
				bind:value={$form.name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
		</label>

		<!-- EMAIL -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text">Dietary Restrictions/Food Allergies</span>
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

	<div><button class="btn btn-primary my-10">Submit</button></div>
</form>

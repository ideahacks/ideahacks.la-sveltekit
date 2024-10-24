<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';

	export let data;

	// Client API:
	const { form, errors, enhance } = superForm(data.form);
</script>

<SuperDebug data={$form} />

<form method="POST" use:enhance class="mx-auto w-full max-w-xl">
	<div class="mt-4 font-bold text-white max-sm:text-center">Personal</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- Name -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">Full Name*</span>
			</div>
			<input
				name="full_name"
				bind:value={$form.full_name}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.full_name}
				<small class="text-red-300">{$errors.full_name}</small>
			{:else}
				<br />
			{/if}
		</label>

		<!-- Email -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">Preferred Name</span>
			</div>
			<input
				name="preferred_name"
				bind:value={$form.preferred_name}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.preferred_name}
				<small>{$errors.preferred_name}</small>
			{:else}
				<br />
			{/if}
		</label>
	</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- NAME -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">EMAIL*</span>
			</div>
			<input
				name="email"
				bind:value={$form.email}
				type="email"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.email}
				<small>{$errors.email}</small>
			{/if}
		</label>

		<!-- EMAIL -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">PRONOUNS</span>
			</div>
			<input
				name="pronouns"
				bind:value={$form.pronouns}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.pronouns}
				<small>{$errors.pronouns}</small>
			{/if}
		</label>
	</div>

	<!-- EDUCATIOn -->
	<div class="mt-4 font-bold text-white max-sm:text-center">Education</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- College -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">SCHOOL*</span>
			</div>
			<input
				name="school"
				bind:value={$form.school}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.school}
				<small>{$errors.school}</small>
			{/if}
		</label>

		<!-- EMAIL -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">SCHOOL (IF OTHER)</span>
			</div>
			<input
				name="school_if_other"
				bind:value={$form.school_if_other}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.school_if_other}
				<small>{$errors.school_if_other}</small>
			{/if}
		</label>
	</div>

	<!-- MAJOR -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white">MAJOR*</span>
		</div>
		<input
			name="major"
			bind:value={$form.major}
			type="text"
			placeholder="e.g. Electrical Engineering"
			class="input input-bordered w-full"
		/>
		{#if $errors.major}
			<small>{$errors.major}</small>
		{/if}
	</label>

	<!-- YEAR -->
	<!-- 1, 2, 3, 3rd year transfer, 4, 4th year transfer, 5th or above, Graduated -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white">YEAR*</span>
		</div>
		<input
			name="year_at_current_university"
			bind:value={$form.year_at_current_university}
			type="text"
			placeholder="e.g. Electrical Engineering"
			class="input input-bordered w-full"
		/>
		{#if $errors.year_at_current_university}
			<small>{$errors.year_at_current_university}</small>
		{/if}
	</label>

	<div class="mt-4 font-bold text-white max-sm:text-center">Short Answer</div>
	<!-- Engineering experince -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>1. What are your previous engineering experiences (250 words max) *</span
			>
		</div>
		<textarea
			name="prior_engineering_experience"
			rows="4"
			bind:value={$form.prior_engineering_experience}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
		{#if $errors.prior_engineering_experience}
			<small>{$errors.prior_engineering_experience}</small>
		{/if}
	</label>

	<!-- Why do you want to participate -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>2. Why do you want to participate in IDEA Hacks? (250 words max)*</span
			>
		</div>
		<textarea
			name="why_ideahacks"
			rows="4"
			bind:value={$form.why_ideahacks}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
		{#if $errors.why_ideahacks}
			<small>{$errors.why_ideahacks}</small>
		{/if}
	</label>

	<!-- Idea for this years theme -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>3. Do you have an idea to hack for this year's theme? It's ok if you don't yet! (100 words
				max)*</span
			>
		</div>
		<textarea
			name="hackathon_ideas"
			rows="4"
			bind:value={$form.hackathon_ideas}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
		{#if $errors.hackathon_ideas}
			<small>{$errors.hackathon_ideas}</small>
		{/if}
	</label>

	<!-- Parts request -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>4. If you have prior hackathon experience, please share with us. (50 words max)</span
			>
		</div>
		<textarea
			name="prior_hackathon_experience"
			rows="4"
			bind:value={$form.prior_hackathon_experience}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
		{#if $errors.prior_hackathon_experience}
			<small>{$errors.prior_hackathon_experience}</small>
		{/if}
	</label>

	<!-- Idea for this years theme -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>5. What parts would you like to see at this years IDEA Hacks? (100 words max)</span
			>
		</div>
		<textarea
			name="suggested_parts"
			rows="4"
			bind:value={$form.suggested_parts}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt">Word Count: 0/250</span>
		</div>
		{#if $errors.suggested_parts}
			<small>{$errors.suggested_parts}</small>
		{/if}
	</label>

	<div class="mt-4 font-bold text-white max-sm:text-center">Miscellaneous</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- NAME -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">Shirt Size*</span>
			</div>
			<input
				name="shirt_size"
				bind:value={$form.shirt_size}
				type="text"
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.shirt_size}
				<small>{$errors.shirt_size}</small>
			{/if}
		</label>

		<!-- EMAIL -->
		<label class="form-control w-full max-w-xs">
			<div class="label">
				<span class="label-text text-white">Dietary Restrictions/Food Allergies</span>
			</div>
			<input
				name="dietary_restrictions"
				bind:value={$form.dietary_restrictions}
				placeholder="Type here"
				class="input input-bordered w-full max-w-xs"
			/>
			{#if $errors.dietary_restrictions}
				<small>{$errors.dietary_restrictions}</small>
			{/if}
		</label>
	</div>

	<div><button class="btn btn-primary my-10">Submit</button></div>
</form>

<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';

	export let data;

	let { session } = data;
	$: ({ session } = data);

	const user_email = session?.user.email;

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
				<small class="h-4 text-custom-yellow">{$errors.full_name}</small>
			{:else}
				<div class="h-4" />
			{/if}
		</label>

		<!-- Pref Name -->
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
				<small class="h-4 text-custom-yellow">{$errors.preferred_name}</small>
			{:else}
				<div class="h-4" />
			{/if}
		</label>
	</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- EMAIL -->
		<label class="form-control w-full max-w-xs align-top">
			<div class="label">
				<span class="label-text text-white">EMAIL</span>
			</div>
			<input
				name="email"
				value={user_email}
				disabled
				class="input input-bordered w-full max-w-xs"
			/>
			<div class="h-4" />
		</label>

		<!-- PRONOUNS -->
		<label class="form-control w-full max-w-xs align-top">
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
				<small class="h-4 text-custom-yellow">{$errors.pronouns}</small>
			{:else}
				<div class="h-4" />
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
			<select class="select w-full max-w-xs" name="school" bind:value={$form.school}>
				<option disabled selected />
				<option>University of California, Los Angeles</option>
				<option>University of Southern California</option>
				<option>Other</option>
			</select>
			{#if $errors.school}
				<small class="h-4 text-custom-yellow">{$errors.school}</small>
			{:else}
				<div class="h-4" />
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
				<small class="h-4 text-custom-yellow">{$errors.school_if_other}</small>
			{:else}
				<div class="h-4" />
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
			<small class="text-custom-yellow">{$errors.major}</small>
		{/if}
	</label>

	<!-- YEAR -->
	<!-- 1, 2, 3, 3rd year transfer, 4, 4th year transfer, 5th or above, Graduated -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white">YEAR*</span>
		</div>
		<select
			class="select w-full max-w-xs"
			name="year_at_current_university"
			bind:value={$form.year_at_current_university}
		>
			<option disabled selected />
			<option>Freshman</option>
			<option>Second Year</option>
			<option>Third Year</option>
			<option>Fourth Year</option>
			<option>Graduated</option>
			<option>Other</option>
		</select>
		{#if $errors.year_at_current_university}
			<small class="text-custom-yellow">{$errors.year_at_current_university}</small>
		{/if}
	</label>

	<div class="mt-4 font-bold text-white max-sm:text-center">Short Answer</div>
	<!-- Engineering experince -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white">1. What are your previous engineering experiences*</span>
		</div>
		<textarea
			name="prior_engineering_experience"
			rows="4"
			bind:value={$form.prior_engineering_experience}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt text-white"
				>Characters: {$form.prior_engineering_experience.length}/1250</span
			>
		</div>
		{#if $errors.prior_engineering_experience}
			<small class="text-custom-yellow">{$errors.prior_engineering_experience}</small>
		{/if}
	</label>

	<!-- Why do you want to participate -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white">2. Why do you want to participate in IDEA Hacks?*</span>
		</div>
		<textarea
			name="why_ideahacks"
			rows="4"
			bind:value={$form.why_ideahacks}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt text-white">Word Count: {$form.why_ideahacks.length}/1250</span>
		</div>
		{#if $errors.why_ideahacks}
			<small class="text-custom-yellow">{$errors.why_ideahacks}</small>
		{/if}
	</label>

	<!-- Idea for this years theme -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>3. Do you have an idea to hack for this year's theme? It's ok if you don't yet!*</span
			>
		</div>
		<textarea
			name="hackathon_ideas"
			rows="4"
			bind:value={$form.hackathon_ideas}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span
				class={$errors.hackathon_ideas
					? 'label-text-alt text-custom-yellow'
					: 'label-text-alt text-white'}>Characters: {$form.hackathon_ideas.length}/500</span
			>
		</div>
	</label>

	<!-- Prior hackathon experience -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>4. If you have prior hackathon experience, please share with us.</span
			>
		</div>
		<textarea
			name="prior_hackathon_experience"
			rows="4"
			bind:value={$form.prior_hackathon_experience}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt text-white"
				>Characters: {$form.prior_hackathon_experience.length}/250</span
			>
		</div>
		{#if $errors.prior_hackathon_experience}
			<small class="text-custom-yellow">{$errors.prior_hackathon_experience}</small>
		{/if}
	</label>

	<!-- Parts suggestion -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>5. What parts would you like to see at this years IDEA Hacks?</span
			>
		</div>
		<textarea
			name="suggested_parts"
			rows="4"
			bind:value={$form.suggested_parts}
			class="textarea textarea-bordered w-full"
		/>
		<div class="label">
			<span class="label-text-alt text-white">Characters: {$form.suggested_parts.length}/500</span>
		</div>
		{#if $errors.suggested_parts}
			<small>{$errors.suggested_parts}</small>
		{/if}
	</label>

	<div class="mt-4 font-bold text-white max-sm:text-center">Miscellaneous</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- Shirt Size -->
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
				<small class="h-4 text-custom-yellow">{$errors.shirt_size}</small>
			{:else}
				<div class="h-4" />
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
				<small class="h-4 text-custom-yellow">{$errors.dietary_restrictions}</small>
			{:else}
				<div class="h-4 text-custom-yellow" />
			{/if}
		</label>
	</div>

	<div class="mx-auto">
		<button class="btn float-right my-6">Submit</button>
	</div>
</form>

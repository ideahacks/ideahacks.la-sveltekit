<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import type { Session, SupabaseClient } from '@supabase/supabase-js';
	import { onMount } from 'svelte';
	import cityscape from '$lib/images/cityscape.png';

	export let data;

	let { session } = data;
	$: ({ session } = data);

	const user_email = session?.user.email;

	// Client API:
	const { form, errors, enhance } = superForm(data.form);

	// Clouds!
	import cloud1 from '$lib/images/CLOUDS_1.png';
	import cloud2 from '$lib/images/CLOUDS_2.png';
	import cloud3 from '$lib/images/CLOUDS_3.png';
	import cloud4 from '$lib/images/CLOUDS_4.png';
	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	let wave1 = false;
	let wave2 = false;

	setTimeout(() => (wave1 = true), 0);
	setTimeout(() => (wave2 = true), 15000);
</script>

{#if wave1}
	<img
		src={cloud1}
		transition:fly={{ duration: 50000, x: '150vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-10 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud2}
		transition:fly={{ duration: 20000, x: '50vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-96 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud2}
		transition:fly={{ duration: 30000, x: '100vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 bottom-20 z-0 w-96 opacity-25"
	/>
{/if}

{#if wave2}
	<img
		src={cloud3}
		transition:fly={{ duration: 50000, x: '150vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 top-36 z-0 w-96 opacity-25"
	/>
	<img
		src={cloud4}
		transition:fly={{ duration: 50000, x: '125vw', opacity: 1, easing: linear }}
		alt="cloud"
		class="fixed -left-96 bottom-36 z-0 w-96 opacity-25"
	/>
{/if}

<a href="/" class="mx-12 mt-12 text-right font-encode font-bold text-white hover:opacity-75">Home</a
>

<h1 class="mx-auto my-10 text-center font-paytone text-3xl text-white max-sm:max-w-xs">
	IDEA Hacks Application
</h1>
<form method="POST" use:enhance class="z-10 mx-auto w-full max-w-xl">
	<div class="mt-4 font-bold text-white max-sm:text-center">Personal</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- Name -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">Full Name*</span>
			</div>
			<input
				name="full_name"
				bind:value={$form.full_name}
				type="text"
				placeholder="Type here"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
			/>
			{#if $errors.full_name}
				<small class="label h-8 text-custom-yellow">{$errors.full_name}</small>
			{:else}
				<div class="h-8" />
			{/if}
		</label>

		<!-- Pref Name -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">Preferred Name</span>
			</div>
			<input
				name="preferred_name"
				bind:value={$form.preferred_name}
				placeholder="Type here"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
			/>
			{#if $errors.preferred_name}
				<small class="label h-8 text-custom-yellow">{$errors.preferred_name}</small>
			{:else}
				<div class="h-8" />
			{/if}
		</label>
	</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- EMAIL -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 align-top text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">EMAIL</span>
			</div>
			<input
				name="email"
				value={user_email}
				disabled
				class="input w-full max-w-xs disabled:border-none disabled:bg-opacity-10 disabled:text-white disabled:placeholder-gray-200"
			/>
			<div class="h-8" />
		</label>

		<!-- PRONOUNS -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 align-top text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">PRONOUNS</span>
			</div>
			<input
				name="pronouns"
				bind:value={$form.pronouns}
				placeholder="Type here"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
			/>
			{#if $errors.pronouns}
				<small class="label h-8 text-custom-yellow">{$errors.pronouns}</small>
			{:else}
				<div class="h-8" />
			{/if}
		</label>
	</div>

	<!-- EDUCATIOn -->
	<div class="mt-4 font-bold text-white max-sm:text-center">Education</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- College -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">SCHOOL*</span>
			</div>
			<select
				class="select w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
				name="school"
				bind:value={$form.school}
			>
				<option disabled selected />
				<option>University of California, Los Angeles</option>
				<option>University of Southern California</option>
				<option>Other</option>
			</select>
			{#if $errors.school}
				<small class="label h-8 text-custom-yellow">{$errors.school}</small>
			{:else}
				<div class="h-8" />
			{/if}
		</label>

		<!-- EMAIL -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">SCHOOL (IF OTHER)</span>
			</div>
			<input
				name="school_if_other"
				bind:value={$form.school_if_other}
				type="text"
				placeholder="Type here"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
			/>
			{#if $errors.school_if_other}
				<small class="label h-8 text-custom-yellow">{$errors.school_if_other}</small>
			{:else}
				<div class="h-8" />
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
			class="input w-full bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		/>
		{#if $errors.major}
			<small class="label text-custom-yellow">{$errors.major}</small>
		{/if}
	</label>

	<!-- YEAR -->
	<!-- 1, 2, 3, 3rd year transfer, 4, 4th year transfer, 5th or above, Graduated -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white">YEAR*</span>
		</div>
		<select
			class="select w-full bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
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
			<small class="label text-custom-yellow">{$errors.year_at_current_university}</small>
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
			class="textarea bg-opacity-10 text-white focus:outline-none"
		/>
		<div class="label">
			<span
				class="label-text-alt {$form.prior_engineering_experience.length <= 1250
					? 'text-white'
					: 'text-custom-yellow'}"
				>Characters: {$form.prior_engineering_experience.length}/1250</span
			>
			{#if $errors.prior_engineering_experience}
				<small class="label text-custom-yellow">{$errors.prior_engineering_experience}</small>
			{/if}
		</div>
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
			class="textarea bg-opacity-10 text-white focus:outline-none"
		/>
		<div class="label">
			<span
				class="label-text-alt {$form.why_ideahacks.length <= 1250
					? 'text-white'
					: 'text-custom-yellow'}">Characters: {$form.why_ideahacks.length}/1250</span
			>
			{#if $errors.why_ideahacks}
				<small class="label text-custom-yellow">{$errors.why_ideahacks}</small>
			{/if}
		</div>
	</label>

	<!-- Idea for this years theme -->
	<label class="form-control mx-auto flex w-full max-sm:max-w-xs">
		<div class="label">
			<span class="label-text text-white"
				>3. Do you have an idea to hack for this year's theme? It's ok if you don't yet!</span
			>
		</div>
		<textarea
			name="hackathon_ideas"
			rows="4"
			bind:value={$form.hackathon_ideas}
			class="textarea bg-opacity-10 text-white focus:outline-none"
		/>
		<div class="label">
			<span
				class="label-text-alt {$form.hackathon_ideas.length <= 500
					? 'text-white'
					: 'text-custom-yellow'}">Characters: {$form.hackathon_ideas.length}/500</span
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
			class="textarea bg-opacity-10 text-white focus:outline-none"
		/>
		<div class="label">
			<span
				class="label-text-alt {$form.prior_hackathon_experience.length <= 250
					? 'text-white'
					: 'text-custom-yellow'}">Characters: {$form.prior_hackathon_experience.length}/250</span
			>
		</div>
		{#if $errors.prior_hackathon_experience}
			<small class="label text-custom-yellow">{$errors.prior_hackathon_experience}</small>
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
			class="textarea bg-opacity-10 text-white focus:outline-none"
		/>
		<div class="label">
			<span
				class="label-text-alt {$form.suggested_parts.length <= 500
					? 'text-white'
					: 'text-custom-yellow'}">Characters: {$form.suggested_parts.length}/500</span
			>
		</div>
		{#if $errors.suggested_parts}
			<small>{$errors.suggested_parts}</small>
		{/if}
	</label>

	<div class="mt-4 font-bold text-white max-sm:text-center">Miscellaneous</div>

	<div class="mx-auto flex flex-col items-center justify-center gap-3 sm:flex-row">
		<!-- Shirt Size -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">Shirt Size*</span>
			</div>
			<select
				class="select w-full bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
				name="shirt_size"
				bind:value={$form.shirt_size}
			>
				<option disabled selected />
				<option>Small</option>
				<option>Medium</option>
				<option>Large</option>
				<option>Extra Large</option>
			</select>
			{#if $errors.shirt_size}
				<small class="label h-8 text-custom-yellow">{$errors.shirt_size}</small>
			{:else}
				<div class="h-8" />
			{/if}
		</label>

		<!-- EMAIL -->
		<label
			class="form-control w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
		>
			<div class="label">
				<span class="label-text text-white">Dietary Restrictions/Food Allergies</span>
			</div>
			<input
				name="dietary_restrictions"
				bind:value={$form.dietary_restrictions}
				placeholder="Type here"
				class="input w-full max-w-xs bg-opacity-10 text-white placeholder-gray-200 focus:outline-none"
			/>
			{#if $errors.dietary_restrictions}
				<small class="label h-8 text-custom-yellow">{$errors.dietary_restrictions}</small>
			{:else}
				<div class="h-8 text-custom-yellow" />
			{/if}
		</label>
	</div>

	<div class="mx-auto max-sm:max-w-xs">
		<button
			class="btn float-left my-6 border-none bg-opacity-50 text-opacity-70"
			on:click={(e) => e.preventDefault()}>Save</button
		>
		<button class="btn float-right my-6 border-none bg-opacity-50 text-opacity-70">Submit</button>
	</div>
</form>

<div class="z-20 h-24 w-full bg-contain" style="background-image: url({cityscape});" />

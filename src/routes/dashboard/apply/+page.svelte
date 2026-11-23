<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form?: ActionData } = $props();

	// Form state
	let name = '';
	let preferredName = '';
	let pronouns = '';
	let school = '';
	let year = '';
	let isTransfer = false;
	let major = '';
	let priorEngineeringExperience = '';
	let whyIdeaHacks = '';
	let hackathonIdeas = '';
	let priorHackathonExperience = '';
	let suggestedParts = '';
	let shirtSize = '';
	let dietaryRestrictions = '';

	const yearOptions = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'Other'];
	const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

	// Handle successful submission
	$effect(() => {
		if (form?.success) {
			setTimeout(() => {
				goto('/dashboard');
			}, 2000);
		}
	});
</script>

<NavBar />

<!-- Explicit scroll container: fixed height + overflow-y-auto so content scrolls regardless of layout quirks -->
<div class="apply-page-scroll h-screen overflow-y-auto overflow-x-hidden">
	<div class="flex min-h-full flex-col items-center pt-16 pb-16">
		<div class="max-w-4xl w-full px-4 py-8">
			<div class="bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-8">
			<h1 class="text-4xl font-bold text-white mb-2 font-mono uppercase tracking-wider">
				Application Form
			</h1>
			<p class="text-white/70 mb-8">Fill out the form below to apply for IDEA Hacks 2026</p>

			<form
				method="POST"
				action="?/submit"
				use:enhance
				class="space-y-6"
			>
				<!-- Personal Information -->
				<div class="bg-white/5 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-white mb-4 font-mono uppercase">
						Personal Information
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="name" class="block text-sm font-medium mb-1 text-stone-100">
								Full Name <span class="text-red-400">*</span>
							</label>
							<input
								id="name"
								name="name"
								type="text"
								bind:value={name}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="John Doe"
								required
							/>
						</div>
						<div>
							<label for="preferredName" class="block text-sm font-medium mb-1 text-stone-100">
								Preferred Name
							</label>
							<input
								id="preferredName"
								name="preferredName"
								type="text"
								bind:value={preferredName}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="Johnny"
							/>
						</div>
						<div>
							<label for="pronouns" class="block text-sm font-medium mb-1 text-stone-100">
								Pronouns
							</label>
							<input
								id="pronouns"
								name="pronouns"
								type="text"
								bind:value={pronouns}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="he/him, she/her, they/them, etc."
							/>
						</div>
					</div>
				</div>

				<!-- Academic Information -->
				<div class="bg-white/5 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-white mb-4 font-mono uppercase">
						Academic Information
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="school" class="block text-sm font-medium mb-1 text-stone-100">
								School <span class="text-red-400">*</span>
							</label>
							<input
								id="school"
								name="school"
								type="text"
								bind:value={school}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="UCLA"
								required
							/>
						</div>
						<div>
							<label for="year" class="block text-sm font-medium mb-1 text-stone-100">
								Year <span class="text-red-400">*</span>
							</label>
							<select
								id="year"
								name="year"
								bind:value={year}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								required
							>
								<option value="">Select year</option>
								{#each yearOptions as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="major" class="block text-sm font-medium mb-1 text-stone-100">
								Major <span class="text-red-400">*</span>
							</label>
							<input
								id="major"
								name="major"
								type="text"
								bind:value={major}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="Computer Science"
								required
							/>
						</div>
						<div class="flex items-center pt-6">
							<label for="isTransfer" class="flex items-center cursor-pointer">
								<input
									id="isTransfer"
									name="isTransfer"
									type="checkbox"
									bind:checked={isTransfer}
									class="mr-2 w-4 h-4"
								/>
								<span class="text-stone-100">Transfer?</span>
							</label>
						</div>
					</div>
				</div>

				<!-- Application Questions -->
				<div class="bg-white/5 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-white mb-4 font-mono uppercase">
						Application Questions
					</h2>
					<div class="space-y-4">
						<div>
							<label for="priorEngineeringExperience" class="block text-sm font-medium mb-1 text-stone-100">
								Prior Engineering Experience <span class="text-red-400">*</span>
							</label>
							<textarea
								id="priorEngineeringExperience"
								name="priorEngineeringExperience"
								bind:value={priorEngineeringExperience}
								rows="4"
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="Describe your prior engineering experience..."
								required
							></textarea>
						</div>
						<div>
							<label for="whyIdeaHacks" class="block text-sm font-medium mb-1 text-stone-100">
								Why IDEA Hacks? <span class="text-red-400">*</span>
							</label>
							<textarea
								id="whyIdeaHacks"
								name="whyIdeaHacks"
								bind:value={whyIdeaHacks}
								rows="4"
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="Tell us why you want to attend IDEA Hacks..."
								required
							></textarea>
						</div>
						<div>
							<label for="hackathonIdeas" class="block text-sm font-medium mb-1 text-stone-100">
								Hackathon Ideas <span class="text-red-400">*</span>
							</label>
							<textarea
								id="hackathonIdeas"
								name="hackathonIdeas"
								bind:value={hackathonIdeas}
								rows="4"
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="Share your hackathon project ideas..."
								required
							></textarea>
						</div>
						<div>
							<label for="priorHackathonExperience" class="block text-sm font-medium mb-1 text-stone-100">
								Prior Hackathon Experience
							</label>
							<textarea
								id="priorHackathonExperience"
								name="priorHackathonExperience"
								bind:value={priorHackathonExperience}
								rows="3"
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="List any hackathons you've attended..."
							></textarea>
						</div>
						<div>
							<label for="suggestedParts" class="block text-sm font-medium mb-1 text-stone-100">
								Suggested Parts
							</label>
							<textarea
								id="suggestedParts"
								name="suggestedParts"
								bind:value={suggestedParts}
								rows="3"
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="Any parts or components you'd like to see available..."
							></textarea>
						</div>
					</div>
				</div>

				<!-- Event Details -->
				<div class="bg-white/5 rounded-lg p-6">
					<h2 class="text-2xl font-semibold text-white mb-4 font-mono uppercase">
						Event Details
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="shirtSize" class="block text-sm font-medium mb-1 text-stone-100">
								Shirt Size
							</label>
							<select
								id="shirtSize"
								name="shirtSize"
								bind:value={shirtSize}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
							>
								<option value="">Select size</option>
								{#each shirtSizes as size}
									<option value={size}>{size}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="dietaryRestrictions" class="block text-sm font-medium mb-1 text-stone-100">
								Dietary Restrictions
							</label>
							<input
								id="dietaryRestrictions"
								name="dietaryRestrictions"
								type="text"
								bind:value={dietaryRestrictions}
								class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200 bg-white text-gray-900"
								placeholder="Vegetarian, Vegan, Gluten-free, etc."
							/>
						</div>
					</div>
				</div>

				<!-- Error/Success Messages -->
				{#if form?.error}
					<div class="bg-red-500/20 border border-red-500 rounded-lg p-4">
						<p class="text-red-200">{form.error}</p>
					</div>
				{/if}

				{#if form?.success}
					<div class="bg-green-500/20 border border-green-500 rounded-lg p-4">
						<p class="text-green-200">{form.message || 'Application submitted successfully! Redirecting...'}</p>
					</div>
				{/if}

				<!-- Submit Button -->
				<div class="flex gap-4">
					<button
						type="submit"
						disabled={form?.success}
						class="flex-1 px-8 py-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider text-lg font-bold"
					>
						{form?.success ? 'Submitted!' : 'Submit Application'}
					</button>
					<button
						type="button"
						onclick={() => goto('/dashboard')}
						class="px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-mono uppercase tracking-wider"
					>
						Cancel
					</button>
				</div>
			</form>
			</div>
		</div>
	</div>
</div>

<style>
	.apply-page-scroll {
		-webkit-overflow-scrolling: touch;
	}
</style>

<script lang="ts">
	import Fonts2027 from '$lib/components/Fonts2027.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { ActionData } from './$types';

	let { form }: { form?: ActionData } = $props();


	const yearOptions = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate', 'High School','Other'];
	const shirtSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

</script>

<Fonts2027 />

<NavBar portal2027 />

<!-- Explicit scroll container: fixed height + overflow-y-auto so content scrolls regardless of layout quirks -->
<div class="apply-page-scroll h-screen overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#3FA9FF] to-[#BBD98D] font-inter text-[#064471]">
	<div class="flex min-h-full flex-col items-center pt-16 pb-16">
		<div class="max-w-4xl w-full px-4 py-8">
			<div class="rounded-lg border border-[#0068BD]/20 bg-white p-8 shadow-lg shadow-[#0068BD]/20">
			<h1 class="mb-2 font-jaro text-4xl uppercase tracking-wide text-[#0068BD]">
				Application Form
			</h1>
			<p class="mb-8 text-[#064471]">Fill out the form below to apply for IDEA Hacks 2027</p>

			<form
				method="POST"
				action="?/submit"
				use:enhance
				class="space-y-6"
			>
				<!-- Personal Information -->
				<div class="rounded-lg bg-[#BBD98D]/30 p-6">
					<h2 class="mb-4 font-jetbrains text-2xl font-semibold uppercase text-[#064471]">
						Personal Information
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="name" class="block text-sm font-medium mb-1 text-[#064471]">
								Full Name <span class="text-red-700">*</span>
							</label>
							<input
								id="name"
								name="name"
								type="text"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="John Doe"
								required
							/>
						</div>
						<div>
							<label for="preferredName" class="block text-sm font-medium mb-1 text-[#064471]">
								Preferred Name
							</label>
							<input
								id="preferredName"
								name="preferredName"
								type="text"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="Johnny"
							/>
						</div>
						<div>
							<label for="pronouns" class="block text-sm font-medium mb-1 text-[#064471]">
								Pronouns
							</label>
							<input
								id="pronouns"
								name="pronouns"
								type="text"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="he/him, she/her, they/them, etc."
							/>
						</div>
					</div>
				</div>

				<!-- Academic Information -->
				<div class="rounded-lg bg-[#BBD98D]/30 p-6">
					<h2 class="mb-4 font-jetbrains text-2xl font-semibold uppercase text-[#064471]">
						Academic Information
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="school" class="block text-sm font-medium mb-1 text-[#064471]">
								School <span class="text-red-700">*</span>
							</label>
							<input
								id="school"
								name="school"
								type="text"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="UCLA"
								required
							/>
						</div>
						<div>
							<label for="year" class="block text-sm font-medium mb-1 text-[#064471]">
								Year <span class="text-red-700">*</span>
							</label>
							<select
								id="year"
								name="year"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								required
							>
								<option value="">Select year</option>
								{#each yearOptions as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="major" class="block text-sm font-medium mb-1 text-[#064471]">
								Major <span class="text-red-700">*</span>
							</label>
							<input
								id="major"
								name="major"
								type="text"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
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
									class="mr-2 h-4 w-4 accent-[#0068BD]"
								/>
								<span class="text-[#064471]">Transfer?</span>
							</label>
						</div>
					</div>
				</div>

				<!-- Application Questions -->
				<div class="rounded-lg bg-[#BBD98D]/30 p-6">
					<h2 class="mb-4 font-jetbrains text-2xl font-semibold uppercase text-[#064471]">
						Application Questions
					</h2>
					<div class="space-y-4">
						<div>
							<label for="priorEngineeringExperience" class="block text-sm font-medium mb-1 text-[#064471]">
								Prior Engineering Experience <span class="text-red-700">*</span>
							</label>
							<textarea
								id="priorEngineeringExperience"
								name="priorEngineeringExperience"
								rows="4"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="Describe your prior engineering experience..."
								required
							></textarea>
						</div>
						<div>
							<label for="whyIdeaHacks" class="block text-sm font-medium mb-1 text-[#064471]">
								Why IDEA Hacks? <span class="text-red-700">*</span>
							</label>
							<textarea
								id="whyIdeaHacks"
								name="whyIdeaHacks"
								rows="4"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="Tell us why you want to attend IDEA Hacks..."
								required
							></textarea>
						</div>
						<div>
							<label for="hackathonIdeas" class="block text-sm font-medium mb-1 text-[#064471]">
								Hackathon Ideas <span class="text-red-700">*</span>
							</label>
							<textarea
								id="hackathonIdeas"
								name="hackathonIdeas"
								rows="4"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="Share your hackathon project ideas..."
								required
							></textarea>
						</div>
						<div>
							<label for="priorHackathonExperience" class="block text-sm font-medium mb-1 text-[#064471]">
								Prior Hackathon Experience
							</label>
							<textarea
								id="priorHackathonExperience"
								name="priorHackathonExperience"
								rows="3"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="List any hackathons you've attended..."
							></textarea>
						</div>
						<div>
							<label for="suggestedParts" class="block text-sm font-medium mb-1 text-[#064471]">
								Suggested Parts
							</label>
							<textarea
								id="suggestedParts"
								name="suggestedParts"
								rows="3"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="Any parts or components you'd like to see available..."
							></textarea>
						</div>
					</div>
				</div>

				<!-- Event Details -->
				<div class="rounded-lg bg-[#BBD98D]/30 p-6">
					<h2 class="mb-4 font-jetbrains text-2xl font-semibold uppercase text-[#064471]">
						Event Details
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="shirtSize" class="block text-sm font-medium mb-1 text-[#064471]">
								Shirt Size
							</label>
							<select
								id="shirtSize"
								name="shirtSize"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
							>
								<option value="">Select size</option>
								{#each shirtSizes as size}
									<option value={size}>{size}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="dietaryRestrictions" class="block text-sm font-medium mb-1 text-[#064471]">
								Dietary Restrictions
							</label>
							<input
								id="dietaryRestrictions"
								name="dietaryRestrictions"
								type="text"
								class="w-full rounded-lg border border-[#0068BD]/25 bg-white px-3 py-2 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
								placeholder="Vegetarian, Vegan, Gluten-free, etc."
							/>
						</div>
					</div>
				</div>

				<!-- Submission error -->
				{#if form?.error}
					<div class="rounded-lg border border-red-300 bg-red-50 p-4">
						<p class="text-red-800">{form.error}</p>
					</div>
				{/if}

				<!-- Submit Button -->
				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 px-8 py-4 rounded-lg border border-[#0068BD] bg-[#FFF385] text-[#064471] transition-colors duration-200 hover:bg-[#BBD98D] font-jetbrains uppercase tracking-wider text-lg font-bold"
					>
						Submit Application
					</button>
					<button
						type="button"
						onclick={() => goto('/dashboard')}
						class="px-6 py-4 rounded-lg border border-[#0068BD] bg-white text-[#0068BD] transition-colors duration-200 hover:bg-[#3FA9FF]/20 font-jetbrains uppercase tracking-wider"
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

<script>
	export let data;

	let { session } = data;
	$: ({ session } = data);

	const email = session?.user.email;

	// if (!session) {
	// 	supabase.auth.getSession().then((session) => {
	// 		console.log(session);
	// 	});
	// }

	const WORD_LIMITS = {
		prior_engineering_experience: 250,
		why_ideahacks: 250,
		hackathon_ideas: 100,
		prior_hackathon_experience: 50,
		suggested_parts: 100
	};

	// has each mandatory field been updated?
	// use this to prevent red boxes from showing right when application is loaded
	let inputFieldsUpdated = {
		full_name: false,
		preferred_name: false,
		major: false,
		year_at_current_university: false,
		is_transfer: false,
		prior_engineering_experience: false,
		why_ideahacks: false,
		hackathon_ideas: false,
		shirt_size: false
	};

	let rawFormData = {
		// PERSONAL
		full_name: '',
		preferred_name: '',
		pronouns: '',

		// EDUCATION
		school_dropdown: 'University of California, Los Angeles',
		other_school: '',
		major: '',
		year_at_current_university: '',
		is_transfer: '',

		// SHORT ANSWER
		prior_engineering_experience: '',
		why_ideahacks: '',
		hackathon_ideas: '',
		prior_hackathon_experience: '',
		suggested_parts: '',

		// MISCELLANEOUS
		shirt_size: '',
		dietary_restrictions: ''
	};

	let formStatus = '';

	let hasSubmitted = false;

	function countWords(inputText) {
		if (inputText.trim() === '') {
			return 0;
		} else {
			let len = inputText.trim().split(/[\s]+/).length;
			return len;
		}
	}

	function isValidFormData() {
		let inputFieldsValid = {
			full_name: !(rawFormData.full_name === ''),
			preferred_name: !(rawFormData.preferred_name === ''),

			major: !(rawFormData.major === ''),
			year_at_current_university: !(rawFormData.year_at_current_university === ''),
			is_transfer: !(rawFormData.is_transfer === ''),
			prior_engineering_experience:
				!(rawFormData.prior_engineering_experience === '') &&
				countWords(rawFormData.prior_engineering_experience) <=
					WORD_LIMITS.prior_engineering_experience,
			why_ideahacks:
				!(rawFormData.why_ideahacks === '') &&
				countWords(rawFormData.why_ideahacks) <= WORD_LIMITS.why_ideahacks,
			hackathon_ideas:
				!(rawFormData.hackathon_ideas === '') &&
				countWords(rawFormData.hackathon_ideas) <= WORD_LIMITS.hackathon_ideas,
			prior_hackathon_experience:
				countWords(rawFormData.prior_hackathon_experience) <=
				WORD_LIMITS.prior_hackathon_experience,
			suggested_parts: countWords(rawFormData.suggested_parts) <= WORD_LIMITS.suggested_parts,
			shirt_size: !(rawFormData.shirt_size === '')
		};

		console.log(inputFieldsValid);

		// check if all fields are true
		let result = true;

		for (const field in inputFieldsValid) {
			result = result && inputFieldsValid[field];
		}

		return result;
	}

	// converts rawFormData to formData needed to insert to backend
	function getFormData() {
		return {
			full_name: rawFormData.full_name,
			preferred_name: rawFormData.preferred_name,

			pronouns: rawFormData.pronouns,
			school:
				rawFormData.school_dropdown === 'Other'
					? rawFormData.other_school
					: rawFormData.school_dropdown,

			major: rawFormData.major,
			year_at_current_university: rawFormData.year_at_current_university,
			is_transfer: rawFormData.is_transfer,

			prior_engineering_experience: rawFormData.prior_engineering_experience,
			why_ideahacks: rawFormData.why_ideahacks,
			hackathon_ideas: rawFormData.hackathon_ideas,
			prior_hackathon_experience: rawFormData.prior_hackathon_experience,
			suggested_parts: rawFormData.suggested_parts,

			shirt_size: rawFormData.shirt_size,
			dietary_restrictions: rawFormData.dietary_restrictions
		};
	}

	async function handleSubmit(e) {
		// set inputFieldsUpdated to all true (so that red boxes will show)

		console.log(getFormData());

		for (const field in inputFieldsUpdated) {
			inputFieldsUpdated[field] = true;
		}

		e.preventDefault();

		if (isValidFormData()) {
			const response = await fetch('/apply', {
				method: 'POST',
				body: JSON.stringify(getFormData()),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const responseStatus = await response.json();

			if (responseStatus) {
				hasSubmitted = true;
			}
		} else {
			formStatus =
				'Please recheck the red input boxes before submitting. These fields are required or contain invalid data.';
		}
	}
</script>

{#if hasSubmitted}
	<div class="mx-auto p-6">
		<h1 class="mb-2 text-center font-display-sans text-2xl font-bold tracking-wide text-gray-200">
			APPLICATION SUBMITTED
		</h1>
		<h2 class="mb-2 text-center font-display-sans text-lg tracking-wide text-gray-200">
			Check your email for application updates!
		</h2>
	</div>
{:else}
	<div class="mx-auto p-6">
		<h1 class=" mb-2 text-center font-display-serif text-4xl font-bold tracking-wide text-gray-200">
			IDEA Hacks Application
		</h1>
		<h2 class="mb-4 text-center font-display-sans text-2xl font-bold tracking-wide text-gray-200">
			Hi {session.user.email}!
		</h2>
		<form class="mx-auto w-full max-w-xl">
			<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-200">PERSONAL</h2>

			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
					<label
						class="mb-2 block text-xs uppercase tracking-wide text-gray-200"
						for="form-full-name"
					>
						Full Name*
					</label>
					<input
						class="{rawFormData.full_name !== '' ||
						(rawFormData.full_name === '' && !inputFieldsUpdated.full_name)
							? 'bg-gray-200'
							: 'bg-red-300 placeholder-red-500'} mb-3 block
							w-full appearance-none
							rounded px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-full-name"
						type="text"
						placeholder="Joe Bruin"
						bind:value={rawFormData.full_name}
						on:input={() => (inputFieldsUpdated.full_name = true)}
					/>
				</div>
				<div class="w-full px-3 md:w-1/2">
					<label
						class="mb-2 block text-xs uppercase tracking-wide text-gray-200"
						for="form-preferred-name"
					>
						Preferred Name*
					</label>
					<input
						class="mb-3 block w-full appearance-none rounded {rawFormData.preferred_name !== '' ||
						(rawFormData.preferred_name === '' && !inputFieldsUpdated.preferred_name)
							? 'bg-gray-200'
							: 'bg-red-300'} px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						bind:value={rawFormData.preferred_name}
						id="form-preferred-name"
						type="text"
						on:input={() => (inputFieldsUpdated.preferred_name = true)}
					/>
				</div>
			</div>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-email">
						Email*
					</label>
					<input
						class="block w-full appearance-none rounded bg-gray-200 px-4 py-3 leading-tight text-gray-500 focus:outline-none"
						id="form-email"
						type="text"
						placeholder=""
						value={email}
						disabled
					/>
				</div>
				<div class="w-full px-3 md:w-1/2">
					<label
						class="mb-2 block text-xs uppercase tracking-wide text-gray-200"
						for="form-pronouns"
					>
						Pronouns
					</label>
					<input
						class="block w-full appearance-none rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-pronouns"
						type="text"
						placeholder=""
						bind:value={rawFormData.pronouns}
					/>
				</div>
			</div>
			<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-200">
				EDUCATION
			</h2>

			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="mb-6 w-full px-3 md:mb-0 md:w-2/3">
					<!-- SCHOOL DROPDOWN -->
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-school">
						School*
					</label>
					<div class="relative">
						<select
							class="block w-full appearance-none rounded bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:outline-none"
							id="form-school"
							bind:value={rawFormData.school_dropdown}
						>
							<option selected>University of California, Los Angeles</option>
							<option>University of Southern California</option>
							<option>Other</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200"
						>
							<svg
								class="h-4 w-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/></svg
							>
						</div>
					</div>
				</div>
				<div class="w-full px-3 md:w-1/3">
					<label
						class="mb-2 block text-xs uppercase tracking-wide text-gray-200"
						for="form-other-school"
					>
						School (If Other)
					</label>
					<input
						class="block w-full appearance-none rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-other-school"
						type="text"
						placeholder=""
						bind:value={rawFormData.other_school}
					/>
				</div>
			</div>

			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-major">
						Major*
					</label>
					<input
						class="mb-3 block w-full appearance-none rounded {rawFormData.major !== '' ||
						(rawFormData.major === '' && !inputFieldsUpdated.major)
							? 'bg-gray-200'
							: 'bg-red-300 placeholder-red-500'} bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-major"
						type="text"
						placeholder="e.g. Electrical Engineering"
						bind:value={rawFormData.major}
						on:input={() => (inputFieldsUpdated.major = true)}
					/>
				</div>
			</div>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3 md:w-1/2">
					<!-- YEAR DROPDOWN -->
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-year">
						Year*
					</label>
					<div class="relative">
						<select
							class="mb-3 block w-full appearance-none rounded {rawFormData.year_at_current_university !==
								'' ||
							(rawFormData.year_at_current_university === '' &&
								!inputFieldsUpdated.year_at_current_university)
								? 'bg-gray-200'
								: 'bg-red-300'} px-4 py-3 leading-tight text-gray-700 focus:outline-none"
							id="form-year"
							bind:value={rawFormData.year_at_current_university}
							on:input={() => (inputFieldsUpdated.year_at_current_university = true)}
						>
							<option />
							<option value="first">First</option>
							<option value="second">Second</option>
							<option value="third">Third</option>
							<option value="fourth">Fourth</option>
							<option value="fifth_or_above">Fifth or above</option>
							<option value="graduated">Graduated</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200"
						>
							<svg
								class="h-4 w-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/></svg
							>
						</div>
					</div>
				</div>
				<div class="w-full px-3 md:w-1/2">
					<!-- TRANSFER DROPDOWN -->
					<label
						class="mb-2 block text-xs uppercase tracking-wide text-gray-200"
						for="form-transfer"
					>
						Are you a transfer?*
					</label>
					<div class="relative">
						<select
							class="mb-3 block w-full appearance-none rounded {rawFormData.is_transfer !== '' ||
							(rawFormData.is_transfer === '' && !inputFieldsUpdated.is_transfer)
								? 'bg-gray-200'
								: 'bg-red-300'}  px-4 py-3 leading-tight text-gray-700 focus:outline-none"
							id="form-transfer"
							bind:value={rawFormData.is_transfer}
							on:input={() => (inputFieldsUpdated.is_transfer = true)}
						>
							<option />
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200"
						>
							<svg
								class="h-4 w-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/></svg
							>
						</div>
					</div>
				</div>
			</div>

			<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-200">
				SHORT ANSWER
			</h2>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-q1">
						1. What are your previous engineering experiences? ({WORD_LIMITS.prior_engineering_experience}
						Words)*
					</label>
					<textarea
						class="mb-3 block w-full appearance-none rounded {(rawFormData.prior_engineering_experience !==
							'' ||
							(rawFormData.prior_engineering_experience === '' &&
								!inputFieldsUpdated.prior_engineering_experience)) &&
						countWords(rawFormData.prior_engineering_experience) <=
							WORD_LIMITS.prior_engineering_experience
							? 'bg-gray-200'
							: 'bg-red-300'}  px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-q1"
						rows="5"
						placeholder=""
						bind:value={rawFormData.prior_engineering_experience}
						on:input={() => (inputFieldsUpdated.prior_engineering_experience = true)}
					/>
					<label
						class="mb-2 block text-xs uppercase tracking-wide {countWords(
							rawFormData.prior_engineering_experience
						) <= WORD_LIMITS.prior_engineering_experience
							? 'text-gray-200'
							: 'text-gray-300'}"
						for="form-q1"
					>
						Words: {countWords(
							rawFormData.prior_engineering_experience
						)}/{WORD_LIMITS.prior_engineering_experience}
					</label>
				</div>
			</div>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-q2">
						2. Why do you want to participate in IDEA Hacks? ({WORD_LIMITS.why_ideahacks} Words)*
					</label>
					<textarea
						class="mb-3 block w-full appearance-none rounded {(rawFormData.why_ideahacks !== '' ||
							(rawFormData.why_ideahacks === '' && !inputFieldsUpdated.why_ideahacks)) &&
						countWords(rawFormData.why_ideahacks) <= WORD_LIMITS.why_ideahacks
							? 'bg-gray-200'
							: 'bg-red-300'} px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-q2"
						rows="5"
						placeholder=""
						on:input={() => (inputFieldsUpdated.why_ideahacks = true)}
						bind:value={rawFormData.why_ideahacks}
					/>
					<label
						class="mb-2 block text-xs uppercase tracking-wide {countWords(
							rawFormData.why_ideahacks
						) <= WORD_LIMITS.why_ideahacks
							? 'text-gray-200'
							: 'text-gray-300'}"
						for="form-q2"
					>
						Words: {countWords(rawFormData.why_ideahacks)}/{WORD_LIMITS.why_ideahacks}
					</label>
				</div>
			</div>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-q3">
						3. Do you have an idea to hack for this year's theme? It's okay if you don't yet! ({WORD_LIMITS.hackathon_ideas}
						Words)*
					</label>
					<textarea
						class="mb-3 block w-full appearance-none rounded {(rawFormData.hackathon_ideas !== '' ||
							(rawFormData.hackathon_ideas === '' && !inputFieldsUpdated.hackathon_ideas)) &&
						countWords(rawFormData.hackathon_ideas) <= WORD_LIMITS.hackathon_ideas
							? 'bg-gray-200'
							: 'bg-red-300 placeholder-red-500'}  px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-q3"
						rows="5"
						placeholder="Example: Compost Catapult"
						on:input={() => (inputFieldsUpdated.hackathon_ideas = true)}
						bind:value={rawFormData.hackathon_ideas}
					/>
					<label
						class="mb-2 block text-xs uppercase tracking-wide {countWords(
							rawFormData.hackathon_ideas
						) <= WORD_LIMITS.hackathon_ideas
							? 'text-gray-200'
							: 'text-gray-300'}"
						for="form-q3"
					>
						Words: {countWords(rawFormData.hackathon_ideas)}/{WORD_LIMITS.hackathon_ideas}
					</label>
				</div>
			</div>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-q5">
						4. If you have prior hackathon experience, please share your experience with us. ({WORD_LIMITS.prior_hackathon_experience}
						Words)
					</label>
					<textarea
						class="mb-3 block w-full appearance-none rounded {countWords(
							rawFormData.prior_hackathon_experience
						) <= WORD_LIMITS.prior_hackathon_experience
							? 'bg-gray-200'
							: 'bg-red-300'}  px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-q5"
						rows="3"
						placeholder=""
						bind:value={rawFormData.prior_hackathon_experience}
					/>
					<label
						class="mb-2 block text-xs uppercase tracking-wide {countWords(
							rawFormData.prior_hackathon_experience
						) <= WORD_LIMITS.prior_hackathon_experience
							? 'text-gray-200'
							: 'text-gray-300'}"
						for="form-q5"
					>
						Words: {countWords(
							rawFormData.prior_hackathon_experience
						)}/{WORD_LIMITS.prior_hackathon_experience}
					</label>
				</div>
			</div>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="w-full px-3">
					<label class="mb-2 block text-xs uppercase tracking-wide text-gray-200" for="form-q6">
						5. What parts would you like to see at IDEA Hacks this year? ({WORD_LIMITS.suggested_parts}
						Words)
					</label>
					<textarea
						class="mb-3 block w-full appearance-none rounded {countWords(
							rawFormData.suggested_parts
						) <= WORD_LIMITS.suggested_parts
							? 'bg-gray-200'
							: 'bg-red-300'}  px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-q6"
						rows="3"
						placeholder=""
						bind:value={rawFormData.suggested_parts}
					/>
					<label
						class="mb-2 block text-xs uppercase tracking-wide {countWords(
							rawFormData.suggested_parts
						) <= WORD_LIMITS.suggested_parts
							? 'text-gray-200'
							: 'text-gray-300'}"
						for="form-q6"
					>
						Words: {countWords(rawFormData.suggested_parts)}/{WORD_LIMITS.suggested_parts}
					</label>
				</div>
			</div>
			<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-200">
				MISCELLANEOUS
			</h2>
			<div class="-mx-3 mb-6 flex flex-wrap">
				<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
					<label
						class="mb-2 block text-xs uppercase tracking-wide text-gray-200"
						for="form-shirt-size"
					>
						Shirt Size*
					</label>
					<div class="relative">
						<select
							class="mb-3 block w-full appearance-none rounded {rawFormData.shirt_size !== '' ||
							(rawFormData.shirt_size === '' && !inputFieldsUpdated.shirt_size)
								? 'bg-gray-200'
								: 'bg-red-300'}  px-4 py-3 leading-tight text-gray-700 focus:outline-none"
							id="form-shirt-size"
							bind:value={rawFormData.shirt_size}
							on:input={() => (inputFieldsUpdated.shirt_size = true)}
						>
							<option />
							<option value="small">Small</option>
							<option value="medium">Medium</option>
							<option value="large">Large</option>
							<option value="extra_large">Extra Large</option>
						</select>
						<div
							class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200"
						>
							<svg
								class="h-4 w-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								><path
									d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
								/></svg
							>
						</div>
					</div>
					<!-- <p class="text-xs italic text-gray-300">Please fill out this field.</p> -->
				</div>
				<div class="w-full px-3 md:w-1/2">
					<label
						class="mb-2 block text-xs uppercase tracking-wide text-gray-200"
						for="form-allergies"
					>
						dietary restrictions / food allergies
					</label>
					<input
						class="block w-full appearance-none rounded bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:outline-none"
						id="form-allergies"
						type="text"
						placeholder=""
						bind:value={rawFormData.dietary_restrictions}
					/>
				</div>
			</div>

			<button on:click={handleSubmit} class="btn-primary btn border-black px-4 py-2">
				Submit
			</button>

			<p class="mb-2 h-3 p-1 font-display-sans text-xs tracking-wide text-gray-700">
				{formStatus}
			</p>
		</form>
	</div>
{/if}

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #240202 0%, #70130b 19.56%, #a53018 46.19%, #d97e2e 74.45%);
	}
</style>

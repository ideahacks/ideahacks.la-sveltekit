<script>
	// @ts-nocheck

	const DEFAULT_SHORT_ANSWER_WORD_LIMIT = 5;

	const WORD_LIMITS = {
		q1: 250,
		q2: 250,
		q3: 100,
		q4: 250,
		q5: 50,
		q6: 100
	};

	let firstNameCompleted = true;
	let lastNameCompleted = true;
	let emailCompleted = true;
	let emailValid = true;
	let phoneCompleted = true;
	let phoneValid = true;
	let schoolCompleted = true;
	let majorCompleted = true;
	let yearCompleted = true;
	let hasTeamCompleted = true;

	let formStatus = '';

	let shortAnswerWordCounts = {
		q1: 0,
		q2: 0,
		q3: 0,
		q4: 0,
		q5: 0,
		q6: 0
	};

	function countWords(input, questionName) {
		// console.log(input);
		var inputText = input.target.value;

		if (inputText.trim() === '') {
			shortAnswerWordCounts[questionName] = 0;
		} else {
			var len = inputText.trim().split(/[\s]+/).length;
			shortAnswerWordCounts[questionName] = len;
		}
	}

	function getFormData() {
		const formData = {
			// PERSONAL
			firstName: document.getElementById('form-first-name').value,
			lastName: document.getElementById('form-last-name').value,
			email: document.getElementById('form-email').value,
			phone: document.getElementById('form-phone').value,
			pronouns: document.getElementById('form-pronouns').value,

			// EDUCATION
			school:
				document.getElementById('form-school').value === 'Other'
					? document.getElementById('form-other-school').value
					: document.getElementById('form-school').value,
			major: document.getElementById('form-major').value,
			year: document.getElementById('form-year').value,
			github: document.getElementById('form-github').value,
			linkedin: document.getElementById('form-linkedin').value,

			// TEAM INFO
			hasTeam: document.getElementById('form-hasTeam').value,
			teammate1: document.getElementById('form-teammate1').value,
			teammate2: document.getElementById('form-teammate2').value,
			teammate3: document.getElementById('form-teammate3').value,
			teammate4: document.getElementById('form-teammate4').value,

			// SHORT ANSWER
			q1: document.getElementById('form-q1').value,
			q2: document.getElementById('form-q2').value,
			q3: document.getElementById('form-q3').value,
			q4: document.getElementById('form-q4').value,
			q5: document.getElementById('form-q5').value,
			q6: document.getElementById('form-q6').value,

			// MISCELLANEOUS
			requiresHousingAssistance: document.getElementById('form-housing').value,
			shirtSize: document.getElementById('form-shirt-size').value,
			dietaryRestrictions: document.getElementById('form-allergies').value
		};

		return formData;
	}

	function validateFormData(formData) {
		firstNameCompleted = !(formData.firstName === '');
		lastNameCompleted = !(formData.lastName === '');
		emailCompleted = !(formData.email === '');
		phoneCompleted = !(formData.email === '');

		validFormData = true;

		return validFormData;
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = getFormData();

		const response = await fetch('/api/application', {
			method: 'POST',
			body: JSON.stringify(formData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseStatus = await response.json();

		formStatus = responseStatus;

		setTimeout(function () {
			formStatus = '';
		}, 2000);
	}
	function handleSave(e) {
		e.preventDefault();

		formStatus = "Save isn't implemented yet!";

		setTimeout(function () {
			formStatus = '';
		}, 2000);

		console.log('Saved');
	}
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-2 text-center font-display-sans text-2xl font-bold tracking-wide text-gray-700">
		IDEA HACKS APPLICATION
	</h1>
	<form class="mx-auto w-full max-w-xl">
		<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-700">PERSONAL</h2>

		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-first-name"
				>
					First Name*
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
					id="form-first-name"
					type="text"
					placeholder="Jane"
				/>

				{#if !firstNameCompleted}
					<p class="text-xs italic text-red-500">Please fill out this field.</p>
				{/if}
			</div>
			<div class="w-full px-3 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-last-name"
				>
					Last Name*
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-last-name"
					type="text"
					placeholder="Doe"
				/>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-email">
					Email*
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-email"
					type="email"
					placeholder=""
				/>
				<!-- <p class="text-xs italic text-gray-600">Make it as long and as crazy as you'd like</p> -->
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-phone">
					Phone Number*
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
					id="form-phone"
					type="text"
					placeholder="XXX-XXX-XXXX"
				/>
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
			</div>
			<div class="w-full px-3 md:w-1/2">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-pronouns">
					Pronouns
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-pronouns"
					type="text"
					placeholder=""
				/>
			</div>
		</div>
		<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-700">EDUCATION</h2>

		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-2/3">
				<!-- SCHOOL DROPDOWN -->
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-school">
					School*
				</label>
				<div class="relative">
					<select
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						id="form-school"
					>
						<option>University of California, Los Angeles</option>
						<option>University of Southern California</option>
						<option>Other</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							><path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/></svg
						>
					</div>
				</div>
			</div>
			<div class="w-full px-3 md:w-1/3">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-other-school"
				>
					School (If Other)
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-other-school"
					type="text"
					placeholder=""
				/>
			</div>
		</div>

		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-major">
					Major*
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
					id="form-major"
					type="text"
					placeholder=""
				/>
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
			</div>
			<div class="w-full px-3 md:w-1/2">
				<!-- YEAR DROPDOWN -->
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-year">
					Year*
				</label>
				<div class="relative">
					<select
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						id="form-year"
					>
						<option />
						<option>Freshman</option>
						<option>Sophomore</option>
						<option>Junior</option>
						<option>Senior</option>
						<option>Other</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							><path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/></svg
						>
					</div>
				</div>
			</div>
		</div>

		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-major">
					Github
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
					id="form-github"
					type="text"
					placeholder=""
				/>
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
			</div>
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-major">
					Linkedin
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
					id="form-linkedin"
					type="text"
					placeholder=""
				/>
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
			</div>
		</div>

		<!-- Upload Resume Here (for later) -->

		<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-700">TEAM INFO</h2>

		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3 md:w-1/3">
				<!-- TEAM DROPDOWN -->
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-hasTeam">
					Do you have a team?*
				</label>
				<div class="relative">
					<select
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						id="form-hasTeam"
					>
						<option />
						<option>Yes</option>
						<option>No</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							><path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/></svg
						>
					</div>
				</div>
			</div>
		</div>

		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-teammate1"
				>
					Teammate 1
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
					id="form-teammate1"
					type="email"
					placeholder="Email"
				/>
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
			</div>
			<div class="w-full px-3 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-teammate2"
				>
					Teammate 2
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-teammate2"
					type="email"
					placeholder="Email"
				/>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-teammate3"
				>
					Teammate 3
				</label>
				<input
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
					id="form-teammate3"
					type="email"
					placeholder="Email"
				/>
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
			</div>
			<div class="w-full px-3 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-teammate4"
				>
					Teammate 4
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-teammate4"
					type="email"
					placeholder="Email"
				/>
			</div>
		</div>

		<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-700">
			SHORT ANSWER
		</h2>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q1">
					1. What are your previous engineering experiences? ({WORD_LIMITS.q1} Words)*
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q1"
					rows="5"
					placeholder=""
					on:input={(e) => countWords(e, 'q1')}
				/>
				<label
					class="mb-2 block text-xs uppercase tracking-wide {shortAnswerWordCounts['q1'] <=
					WORD_LIMITS.q1
						? 'text-gray-700'
						: 'text-red-500'}"
					for="form-q1"
				>
					Words: {shortAnswerWordCounts['q1']}
				</label>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q2">
					2. Why do you want to participate in IDEA Hacks? ({WORD_LIMITS.q2} Words)*
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q2"
					rows="5"
					placeholder=""
					on:input={(e) => countWords(e, 'q2')}
				/>
				<label
					class="mb-2 block text-xs uppercase tracking-wide {shortAnswerWordCounts['q2'] <=
					WORD_LIMITS.q2
						? 'text-gray-700'
						: 'text-red-500'}"
					for="form-q2"
				>
					Words: {shortAnswerWordCounts['q2']}
				</label>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q3">
					3. Do you have an idea to hack for this year's theme? It's okay if you don't yet! ({WORD_LIMITS.q3}
					Words)*
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q3"
					rows="5"
					placeholder="Example: Compost Catapult"
					on:input={(e) => countWords(e, 'q3')}
				/>
				<label
					class="mb-2 block text-xs uppercase tracking-wide {shortAnswerWordCounts['q3'] <=
					WORD_LIMITS.q3
						? 'text-gray-700'
						: 'text-red-500'}"
					for="form-q3"
				>
					Words: {shortAnswerWordCounts['q3']}
				</label>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q4">
					4. Do you have any previous hackathon experience?*
				</label>
				<div class="relative">
					<select
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						id="form-q4"
					>
						<option />
						<option>Yes</option>
						<option>No</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							><path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/></svg
						>
					</div>
				</div>
			</div>
			<div class="w-full px-3 md:w-1/2">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q5">
					5. If so, please share your experience with us. ({WORD_LIMITS.q5} Words)
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q5"
					type="text"
					placeholder=""
					on:input={(e) => countWords(e, 'q5')}
				/>
				<label
					class="mb-2 block text-xs uppercase tracking-wide {shortAnswerWordCounts['q5'] <=
					WORD_LIMITS.q5
						? 'text-gray-700'
						: 'text-red-500'}"
					for="form-q5"
				>
					Words: {shortAnswerWordCounts['q5']}
				</label>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q6">
					6. What parts would you like to see at IDEA Hacks this year? ({WORD_LIMITS.q6}
					Words)
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q6"
					rows="3"
					placeholder=""
					on:input={(e) => countWords(e, 'q6')}
				/>
				<label
					class="mb-2 block text-xs uppercase tracking-wide {shortAnswerWordCounts['q6'] <=
					WORD_LIMITS.q6
						? 'text-gray-700'
						: 'text-red-500'}"
					for="form-q6"
				>
					Words: {shortAnswerWordCounts['q6']}
				</label>
			</div>
		</div>
		<h2 class="mb-2 font-display-sans text-lg font-bold tracking-wide text-gray-700">
			MISCELLANEOUS
		</h2>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs tracking-wide text-gray-700" for="form-housing">
					If you are visiting from another school, would you like assistance with housing over the
					weekend? Please note that there is a limited number of people we can support, so we will
					prioritize early applications and those with need.
				</label>
				<div class="relative">
					<select
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						id="form-housing"
					>
						<option />
						<option>Yes</option>
						<option>No</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							><path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/></svg
						>
					</div>
				</div>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="mb-6 w-full px-3 md:mb-0 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-shirt-size"
				>
					Shirt Size*
				</label>
				<div class="relative">
					<select
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						id="form-shirt-size"
					>
						<option />
						<option>S</option>
						<option>M</option>
						<option>L</option>
					</select>
					<div
						class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
					>
						<svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
							><path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
							/></svg
						>
					</div>
				</div>
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
			</div>
			<div class="w-full px-3 md:w-1/2">
				<label
					class="mb-2 block text-xs uppercase tracking-wide text-gray-700"
					for="form-allergies"
				>
					dietary restrictions / food allergies
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-allergies"
					type="text"
					placeholder=""
				/>
			</div>
		</div>

		<button
			on:click={handleSave}
			class="rounded bg-orange-500 px-4 py-2 font-bold hover:bg-orange-700"
		>
			Save
		</button>

		<button
			on:click={handleSubmit}
			class="rounded bg-orange-500 px-4 py-2 font-bold hover:bg-orange-700"
		>
			Submit
		</button>

		<p class="mb-2 font-display-sans font-bold tracking-wide text-orange-600">{formStatus}</p>
	</form>
</div>

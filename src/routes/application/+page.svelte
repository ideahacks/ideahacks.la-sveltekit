<script>
</script>

<div class="container mx-auto p-6 font-display-sans">
	<h1 class="mb-2 text-center font-display-sans text-2xl font-bold tracking-wide text-gray-700">
		APPLICATION
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
				<!-- <p class="text-xs italic text-red-500">Please fill out this field.</p> -->
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
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="grid-state">
					School*
				</label>
				<div class="relative">
					<select
						class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
						id="grid-state"
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
					for="form-last-name"
				>
					School (If Other)
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-last-name"
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
					1. What are your previous engineering experiences?*
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q1"
					rows="5"
					placeholder=""
				/>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q2">
					2. Why do you want to participate in IDEA Hacks?*
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q2"
					rows="5"
					placeholder=""
				/>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q3">
					3. Do you have an idea to hack for this year's theme? (It's okay if you don't yet!)*
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q3"
					rows="5"
					placeholder="Example: Compost Catapult"
				/>
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
					5. If so, please share your experience with us.
				</label>
				<input
					class="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q5"
					type="text"
					placeholder=""
				/>
			</div>
		</div>
		<div class="-mx-3 mb-6 flex flex-wrap">
			<div class="w-full px-3">
				<label class="mb-2 block text-xs uppercase tracking-wide text-gray-700" for="form-q6">
					6. What parts would you like to see at IDEA Hacks this year?
				</label>
				<textarea
					class="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
					id="form-q6"
					rows="3"
					placeholder=""
				/>
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
	</form>
</div>

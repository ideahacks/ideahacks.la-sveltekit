<script lang="ts">
	let email: string;
	let submitted: boolean;

	let interval = null;

	const numbers = 'abcdefghijklmnopqrstuvwxyz';

	function scrambleLetters(event) {
		let iteration = 0;

		clearInterval(interval);

		interval = setInterval(() => {
			event.target.innerText = event.target.innerText
				.split('')
				.map((letter: string, index: number) => {
					if (index < iteration) {
						return event.target.dataset.value[index];
					}

					if (letter === ' ') {
						return ' ';
					}

					return numbers[Math.floor(Math.random() * numbers.length)];
				})
				.join('');

			if (iteration >= event.target.dataset.value.length) {
				clearInterval(interval);
			}

			iteration += 1 / 2;
		}, 30);
	}

	let formStatus: String = '';

	async function addEmail(email: String) {
		const response = await fetch('/api/email', {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const responseStatus = await response.json();

		formStatus = responseStatus;
	}

	async function handleSubmit(event: SubmitEvent) {
		const input = document.querySelector('#email');
		if (input) {
			const email = (<HTMLInputElement>input).value;
			await addEmail(email);

			(<HTMLInputElement>input).value = '';
		}
	}
</script>

<div class="m-32 justify-center">
	<h1 class="font-display-serif text-9xl">
		<span data-value="IDEA Hacks" on:mouseover={scrambleLetters} on:focus={scrambleLetters}>
			IDEA Hacks
		</span>
		<span class="font-display-sans font-bold tabular-nums">2024</span>
	</h1>
	<div class="divider" />
	<div class="form-control">
		<label class="label" for="email">
			<span
				data-value="Stay in the loop"
				on:mouseover={scrambleLetters}
				on:focus={scrambleLetters}
				class="label-text font-['Cartograph_CF'] text-5xl font-bold">Stay in the loop</span
			>
		</label>
		<label class="join mt-4">
			<span class="join-item flex max-w-md place-items-center bg-red-950 p-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-mail"
					><rect width="20" height="16" x="2" y="4" rx="2" /><path
						d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
					/></svg
				>
			</span>
			<form on:submit|preventDefault={handleSubmit}>
				<input
					id="email"
					type="email"
					placeholder="Enter your email"
					class="input-bordered input join-item border-red-950 placeholder:text-white"
				/>
				<input type="submit" value="Add Email" />
				<p>{formStatus}</p>
			</form>

			{#if !submitted}
				<button on:click={() => (submitted = true)} class="btn-primary btn-square join-item btn">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</button>
			{:else}
				<span class="join-item flex max-w-md place-items-center bg-green-500 p-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide lucide-mail-check"
						><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" /><path
							d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
						/><path d="m16 19 2 2 4-4" /></svg
					>
				</span>
			{/if}
		</label>
	</div>
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(
			180deg,
			#240202 0%,
			#70130b 18.75%,
			#a53018 44.27%,
			#d97e2e 71.35%,
			#f6c042 95.83%
		);
	}
</style>

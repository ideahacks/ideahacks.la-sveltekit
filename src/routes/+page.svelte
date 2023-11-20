<script lang="ts">
	import { MailCheck, Send } from 'lucide-svelte';
	import type { ActionData } from './$types.js';
	import { enhance } from '$app/forms';

	export let form: ActionData;

	let email: string;
	let submitted: boolean;

	let interval: number | Timer;

	const numbers = 'abcdefghijklmnopqrstuvwxyz';

	function scrambleLetters(event: FocusEvent | MouseEvent) {
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
		console.log(email);
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

<div class="m-12 justify-center md:m-16">
	<h1 class="font-display-serif text-8xl md:text-9xl">
		<span> IDEA Hacks </span>
		<span class="font-display-sans font-bold tabular-nums">2024</span>
	</h1>
	<div class="divider" />
	<div
		data-value="Stay in the loop"
		on:mouseover={scrambleLetters}
		on:focus={scrambleLetters}
		class=" w-fit font-mono text-4xl font-bold md:text-5xl"
	>
		Stay in the loop
	</div>
	<form
		method="POST"
		use:enhance
		action="?/submitEmail"
		class="my-4 flex max-w-lg justify-between gap-2"
	>
		<input
			name="email"
			type="email"
			placeholder="Enter your email"
			class="input-bordered input input-lg grow font-display-sans placeholder:text-white"
			required
		/>
		{#if !form}
			<button class="btn-primary btn-square btn-lg btn" type="submit">
				<Send />
			</button>
		{:else if form?.success}
			<button class="btn-disabled btn-primary btn-square btn-lg btn" type="submit">
				<MailCheck />
			</button>
		{:else if form?.invalid}
			<button class="btn-primary btn-square btn-lg btn" type="submit">
				<Send />
			</button>
		{/if}
	</form>
	{#if form?.success}
		<span class="badge badge-success badge-lg">Subscribed! See you soon.</span>
	{:else if form?.invalid}
		<span class="badge badge-error badge-outline">Uh oh, try resubmitting.</span>
	{/if}
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

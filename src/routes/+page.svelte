<script lang="ts">
	import { MailCheck, Send, Sparkles } from 'lucide-svelte';
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

	let formStatus = '';

	async function addEmail(email: string) {
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
	<h2 class="font-display-sans text-6xl font-black">Jan 12-14</h2>
	<div class="divider" />
	<a href="/apply" class="btn btn-primary btn-lg my-8">Applications are open! <Sparkles /></a>
	<p>
		Interested in sponsoring IDEA Hacks? Check out our <a
			href="https://drive.google.com/file/d/1KDASmkWqPmwoqTGyly87Hjs6MYoJ3MSI/view?usp=sharing"
			class="link">sponsorship brochure</a
		>!
	</p>
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

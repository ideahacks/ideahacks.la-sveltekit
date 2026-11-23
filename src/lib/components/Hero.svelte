<script lang="ts">
	import { onMount } from 'svelte';
	import mountains from '$lib/images/hero-2027/mountains.png';
	import hillLight from '$lib/images/hero-2027/hill-light.png';
	import hillBright from '$lib/images/hero-2027/hill-bright.png';
	import hillFront from '$lib/images/hero-2027/hill-front.png';
	import hillFrontTexture from '$lib/images/hero-2027/hill-front-texture.png';
	import cloudLeft from '$lib/images/hero-2027/cloud-left.png';
	import cloudRight from '$lib/images/hero-2027/cloud-right.png';
	import ideaWhite from '$lib/images/hero-2027/idea-white.png';
	import ideaBlue from '$lib/images/hero-2027/idea-blue.png';
	import gear from '$lib/images/hero-2027/gear.png';
	import hacksWhite from '$lib/images/hero-2027/hacks-white.png';
	import hacksBlue from '$lib/images/hero-2027/hacks-blue.png';

	export let comingSoon = false;

	let hero: HTMLElement;

	onMount(() => {
		const section = hero;
		const parallax = window.matchMedia(
			'(min-width: 701px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
		);
		let frame: number | null = null;
		let lastProgress: number | undefined;

		function updateParallax() {
			frame = null;
			const { top, height } = section.getBoundingClientRect();
			const progress = height > 0 ? Math.min(1, Math.max(0, -top / height)) : 0;

			if (progress !== lastProgress) {
				section.style.setProperty('--parallax-progress', String(progress));
				lastProgress = progress;
			}
		}

		function queueUpdate() {
			if (frame === null) frame = window.requestAnimationFrame(updateParallax);
		}

		function stopParallax() {
			window.removeEventListener('scroll', queueUpdate);
			window.removeEventListener('resize', queueUpdate);
			if (frame !== null) window.cancelAnimationFrame(frame);
			frame = null;
			lastProgress = undefined;
			section.style.removeProperty('--parallax-progress');
		}

		function syncParallax() {
			if (parallax.matches) {
				window.addEventListener('scroll', queueUpdate, { passive: true });
				window.addEventListener('resize', queueUpdate);
				queueUpdate();
			} else {
				stopParallax();
			}
		}

		syncParallax();
		parallax.addEventListener('change', syncParallax);

		return () => {
			parallax.removeEventListener('change', syncParallax);
			stopParallax();
		};
	});
</script>

<section bind:this={hero} class="hero-2027" aria-labelledby="hero-2027-title">
	<div class="rays" aria-hidden="true"></div>

	<div class="terrain" aria-hidden="true">
		<img class="mountains" src={mountains} alt="" />
		<img class="hill-light" src={hillLight} alt="" />
		<img class="hill-bright" src={hillBright} alt="" />
		<div class="hill-front">
			<img src={hillFront} alt="" />
			<img class="hill-texture" src={hillFrontTexture} alt="" />
		</div>
	</div>

	<div class="clouds" aria-hidden="true">
		<img class="cloud-left" src={cloudLeft} alt="" />
		<img class="cloud-right" src={cloudRight} alt="" />
		<img class="cloud-distant" src={cloudRight} alt="" />
	</div>

	<div class="hero-2027-content">
		<h1 class="wordmark" id="hero-2027-title">
			<span class="sr-only">IDEA Hacks 2027</span>
			<span class="lettering idea" aria-hidden="true">
				<img class="letter-shadow" src={ideaWhite} alt="" />
				<img src={ideaBlue} alt="" />
			</span>
			<img class="gear" src={gear} alt="" />
			<span class="lettering hacks" aria-hidden="true">
				<img class="letter-shadow" src={hacksWhite} alt="" />
				<img src={hacksBlue} alt="" />
			</span>
		</h1>
		{#if comingSoon}
			<p class="event-date">Coming Soon</p>
			<p class="event-venue">Details to be announced</p>
		{:else}
			<p class="event-date">January 29–31, 2027</p>
			<p class="event-venue">5:00 PM in Ackerman Grand Ballroom</p>
			<a class="apply" href="/dashboard/apply">Apply Now</a>
		{/if}
	</div>
</section>

<style>
	@property --hero-2027-ray-angle {
		syntax: '<angle>';
		inherits: false;
		initial-value: -14deg;
	}

	.hero-2027 {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		width: 100%;
		container-type: inline-size;
		aspect-ratio: 1440 / 1024;
		background: #3ba3f4 url('$lib/images/hero-2027/sky.png') center / 100% 100% no-repeat;
		--wordmark-top: 4%;
		--wordmark-width: 72%;
		/* The gear center sits 44.5% across the wordmark. */
		--ray-x: calc(50% - 3.96% - 2.2vw);
		--ray-y: calc(var(--wordmark-top) + 10.32cqw);
	}

	.rays {
		position: absolute;
		inset: 0;
		background: conic-gradient(
			from var(--hero-2027-ray-angle, -14deg) at var(--ray-x) var(--ray-y),
			transparent 0deg 23deg,
			#b4ddff65 23deg 29deg,
			#fff3a36b 29deg 44deg,
			#b4ddff65 44deg 51deg,
			transparent 51deg 95deg,
			#b4ddff50 95deg 116deg,
			transparent 116deg 152deg,
			#b4ddff60 152deg 159deg,
			transparent 159deg 171deg,
			#fff3a36b 171deg 188deg,
			#b4ddff60 188deg 195deg,
			transparent 195deg 218deg,
			#b4ddff65 218deg 225deg,
			#fff3a36b 225deg 239deg,
			#b4ddff65 239deg 246deg,
			transparent 246deg 276deg,
			#b4ddff55 276deg 295deg,
			transparent 295deg 330deg,
			#b4ddff65 330deg 337deg,
			#fff3a36b 337deg 351deg,
			#b4ddff65 351deg 357deg,
			transparent 357deg 360deg
		);
	}

	.terrain {
		position: absolute;
		inset: auto 0 0;
		aspect-ratio: 1440 / 1024;
	}

	.terrain img,
	.clouds img {
		position: absolute;
		max-width: none;
	}

	.mountains {
		top: 38%;
		left: -17%;
		width: 139%;
	}

	.hill-light {
		top: 55%;
		left: -8%;
		width: 147%;
	}

	.hill-bright {
		top: 54%;
		left: -46%;
		width: 147%;
	}

	.hill-front {
		position: absolute;
		inset: 77% auto 0 -21%;
		width: 132%;
		background: linear-gradient(to bottom, transparent 85%, #2eb723 85%);
	}

	.hill-front img {
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.hill-texture {
		mix-blend-mode: multiply;
		opacity: 0.28;
	}

	.clouds {
		position: absolute;
		inset: 0;
		container-type: inline-size;
		pointer-events: none;
		--sky-floor: 38%;
	}

	.clouds img {
		/* Leave room for the full cloud above the highest mountain peak. */
		top: min(var(--cloud-top), calc(var(--sky-floor) - 11cqw - 8px));
	}

	.cloud-left {
		--cloud-top: 29.7%;
		left: 5.4%;
		width: 17.7%;
	}

	.cloud-right {
		--cloud-top: 21%;
		right: 4.2%;
		width: 16%;
	}

	.cloud-distant {
		display: none;
	}

	.hero-2027-content {
		position: relative;
		top: var(--wordmark-top);
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.wordmark {
		position: relative;
		width: var(--wordmark-width);
		aspect-ratio: 1037 / 298;
		margin: 0;
		transform: translateX(-2.2vw);
	}

	.wordmark img {
		display: block;
		width: 100%;
	}

	.lettering,
	.gear {
		position: absolute;
	}

	.wordmark .gear {
		top: 0;
		left: 30.5%;
		width: 28%;
	}

	.lettering {
		top: 29%;
		isolation: isolate;
	}

	.idea {
		left: 0;
		width: 28.5%;
	}

	.hacks {
		right: 0;
		width: 38.9%;
	}

	.letter-shadow {
		position: absolute;
		z-index: -1;
		transform: translate(-1.5%, 4%);
	}

	.event-date {
		margin: clamp(0.45rem, 1vw, 0.9rem) 0 0.15rem;
		color: #052c55;
		font-size: clamp(1rem, 1.9vw, 1.7rem);
		font-weight: 800;
	}

	.event-venue {
		margin: 0 1rem 0.55rem;
		color: #052c55;
		font-size: clamp(0.875rem, 1.4vw, 1.25rem);
		font-weight: 700;
	}

	.apply {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 11rem;
		min-height: 56px;
		padding: 0.7rem 2.15rem;
		border: 2px solid #052c55;
		border-radius: 0.5rem;
		background: #fff466;
		color: #052c55;
		font-size: clamp(1.2rem, 1.7vw, 1.55rem);
		font-weight: 800;
		text-decoration: none;
	}

	.apply:hover {
		background: #fff9a6;
	}

	.apply:focus-visible {
		outline: 3px solid #052c55;
		outline-offset: 4px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.rays {
			animation:
				hero-fade-in 1.35s ease-out backwards,
				hero-ray-power-up 10s linear 1.35s infinite;
		}

		.wordmark {
			animation: hero-logo-in 1.1s ease-out backwards;
		}

		.mountains,
		.hill-light,
		.hill-bright,
		.hill-front {
			animation: hero-rise-in 1.15s cubic-bezier(0.2, 0.65, 0.3, 1) backwards;
		}

		.hill-light {
			animation-delay: 120ms;
		}

		.hill-bright {
			animation-delay: 240ms;
		}

		.hill-front {
			animation-delay: 360ms;
		}

		.clouds img {
			right: auto;
			left: 0;
			animation:
				hero-fade-in 1.25s ease-out 250ms backwards,
				hero-cloud-crossing var(--cloud-duration) linear var(--cloud-phase) infinite
					var(--cloud-direction, normal);
		}

		.cloud-left {
			--cloud-duration: 54s;
			--cloud-phase: -10.8s;
		}

		.cloud-right {
			--cloud-duration: 44s;
			--cloud-phase: -7.8s;
			--cloud-direction: reverse;
		}

		.cloud-distant {
			display: block;
			width: 11%;
			--cloud-top: 13%;
			--cloud-duration: 59s;
			--cloud-phase: -40s;
		}

		.event-date,
		.event-venue,
		.apply {
			animation: hero-fade-in 800ms ease-out 1.1s backwards;
		}

		.apply:focus-visible {
			animation: none;
		}
	}

	@keyframes hero-fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes hero-ray-power-up {
		0%,
		82% {
			--hero-2027-ray-angle: -14deg;
			filter: sepia(0) saturate(1) brightness(1);
			animation-timing-function: ease-in-out;
		}
		91% {
			filter: sepia(0.55) saturate(1.6) brightness(1.85);
			animation-timing-function: ease-in-out;
		}
		100% {
			/* One full turn returns to the exact starting angle before the loop restarts. */
			--hero-2027-ray-angle: 346deg;
			filter: sepia(0) saturate(1) brightness(1);
		}
	}

	@keyframes hero-logo-in {
		from {
			opacity: 0;
			scale: 0.97;
		}
	}

	@keyframes hero-rise-in {
		from {
			opacity: 0;
			translate: 0 clamp(10px, 1.6vw, 24px);
		}
	}

	@keyframes hero-cloud-crossing {
		from {
			translate: calc(-100% - 8px);
		}
		to {
			translate: calc(100cqw + 8px);
		}
	}

	@media (min-width: 701px) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
		/* Independent of the entrance animations, which use the translate property. */
		.mountains,
		.hill-light,
		.hill-bright {
			transform: translateY(calc(var(--parallax-progress, 0) * var(--parallax-distance)));
		}

		.mountains {
			--parallax-distance: 48px;
		}

		.hill-light {
			--parallax-distance: 16px;
		}

		.hill-bright {
			--parallax-distance: 8px;
		}
	}

	@media (min-width: 701px) {
		.hero-2027 {
			min-height: 470px;
		}
	}

	@media (max-width: 700px) {
		.hero-2027 {
			min-height: 510px;
			aspect-ratio: auto;
			--wordmark-top: 91px;
			--wordmark-width: min(87%, 485px);
			--ray-x: calc(50% - min(4.785%, 26.675px));
			--ray-y: calc(var(--wordmark-top) + min(12.47cqw, 69.54px));
		}

		.wordmark {
			transform: none;
		}

		.terrain {
			right: auto;
			left: 50%;
			width: max(115%, 620px);
			transform: translateX(-50%);
		}

		.clouds {
			/* The terrain covers 62% of its reference canvas above the bottom. */
			--sky-floor: calc(100% - max(115cqw, 620px) * 1024 / 1440 * 0.62);
		}

		.cloud-left {
			--cloud-top: 46%;
			left: 3%;
			width: 17%;
		}

		.cloud-right {
			--cloud-top: 34%;
			right: 3%;
		}

		.event-date {
			margin-top: 0.9rem;
		}
	}
</style>

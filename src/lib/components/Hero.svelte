<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	// form state
	let emailForm: HTMLFormElement;
	let showThankYou = false;
	let isSubmitting = false;

	// stars
	let starsFar: Array<{ id: number; x: number; y: number; opacity: number; size: number }> = [];
	let starsClose: Array<{ id: number; x: number; y: number; opacity: number; size: number }> = [];

	// mountain + animation
	const numPoints = 100;
	let mountainPath = ''; // valid SVG path string (starts with M)
	let rise = -75; // percentage translateY: start below (100%) -> 0%
	let hasAnimated = false;

	// parallax state
	let scrollY = 0;
	let parallaxMultipliers = {
		background: 1, // furthest back - moves slowest
		starsFar: 0.8,
		starsClose: 0.6,
		banner: 0.6,
		sun: 0.5,
		mountains: 0.2,
		foreground: 0 // closest - moves at normal scroll speed
	};

	function generateStars() {
		const starCount = Math.floor(Math.random() * 101) + 200;
		starsFar = Array.from({ length: starCount / 2 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			opacity: Math.random() * 0.8,
			size: Math.random() * 2 + 1
		}));
		starsClose = Array.from({ length: starCount / 2 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			opacity: Math.random() * 0.8 + 0.2,
			size: Math.random() * 2 + 1
		}));
	}

	// grid precomputed paths
	const horizontalCount = 10;
	let horizontalYs: number[] = [];
	let verticalXs: { x1: number; x2: number }[] = [];
	const numLines = 60;

	function generateGrid() {
		horizontalYs = Array.from({ length: horizontalCount }, (_, i) => {
			const t = i / horizontalCount;
			// Compress near top
			return 100 * Math.pow(t, 2);
		}).reverse();

		// vertical lines spread out further at the bottom than the top
		verticalXs = [];

		for (let i = 1; i <= numLines / 2; i++) {
			const baseOffset = i * 170 * Math.pow(1 / (numLines / 2), 1.4);
			const taper = i * 5;

			verticalXs.push({ x1: 50 + baseOffset, x2: 50 + baseOffset + taper });
			verticalXs.push({ x1: 50 - baseOffset, x2: 50 - baseOffset - taper });
		}
	}

	function generateMountains() {
		let height = 110;
		const minH = 20;
		const maxH = 100;
		const smoothness = 7;
		const points: number[] = [];

		for (let i = 0; i < numPoints; i++) {
			// smooth random walk with gentle bounce at edges
			height += (Math.random() - 0.5) * smoothness;
			if (height > maxH) height -= Math.random() * smoothness * 2;
			if (height < minH) height += Math.random() * smoothness * 2;
			points.push(height);
		}

		// Build SVG path string safely (starts with M)
		let path = `M 0 ${100 - points[0]}`;
		for (let i = 1; i < points.length; i++) {
			const x = (i / (numPoints - 1)) * 100;
			const y = 100 - points[i];
			path += ` L ${x} ${y}`;
		}
		// close to bottom to create filled polygon
		path += ' L 100 100 L 0 100 Z';
		mountainPath = path;
	}

	// email submit with loading state
	async function handleEmailSubmit(event: Event) {
		event.preventDefault();
		const emailInput = emailForm.querySelector('input[name="email"]') as HTMLInputElement;
		const email = emailInput.value;

		isSubmitting = true;

		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

			await fetch(
				'https://script.google.com/macros/s/AKfycbx9IQG9oGgHJ5r5y0ZiKJlaQ7Gc74mYnOdL4RfGQB4gxeABLyfybtXg7kUHRmzZvIgp/exec',
				{
					method: 'POST',
					mode: 'no-cors',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email }),
					signal: controller.signal
				}
			);

			clearTimeout(timeoutId);
			console.log('Form submitted (no-cors)');

			showThankYou = true;
			emailForm.reset();
			setTimeout(() => (showThankYou = false), 750);
		} catch (err) {
			console.error('submit error', err);
			// Show error message to user
			alert('Failed to submit email. Please try again.');
		} finally {
			isSubmitting = false;
		}
	}

	// scroll handler for parallax
	function handleScroll() {
		scrollY = window.scrollY;
	}

	generateStars();
	generateGrid();
	generateMountains();

	onMount(async () => {
		// Trigger CSS transition after mount
		requestAnimationFrame(() => {
			hasAnimated = true;
			rise = 0;
		});

		// Add scroll listener for parallax
		window.addEventListener('scroll', handleScroll, { passive: true });
	});

	onDestroy(() => {
		// window.removeEventListener('scroll', handleScroll);
	});
</script>

<div class="relative w-full h-screen min-h-[800px] overflow-hidden">
	<!-- Gradient Background -->
	<div
		class="absolute inset-0 w-full h-full"
		style="background: linear-gradient(180deg, #000214 0%, #0B0C3C 20%, #310E4D 40%, #651758 60%, #A6275B 80%, #D19EB6 100%); z-index:0; transform: translateY({scrollY *
			parallaxMultipliers.background}px);"
	></div>

	<!-- Stars Farther -->
	<div
		class="absolute inset-0 w-full h-full"
		style="z-index:5; transform: translateY({scrollY * parallaxMultipliers.starsFar}px);"
	>
		{#each starsFar as star (star.id)}
			<div
				class="absolute rounded-full bg-white"
				style="
					left: {star.x}%;
					top: {star.y}%;
					width: {star.size}px;
					height: {star.size}px;
					opacity: {star.opacity};
				"
			></div>
		{/each}
	</div>

	<!-- Stars Closer -->
	<div
		class="absolute inset-0 w-full h-full"
		style="z-index:5; transform: translateY({scrollY * parallaxMultipliers.starsClose}px);"
	>
		{#each starsClose as star (star.id)}
			<div
				class="absolute rounded-full bg-white"
				style="
        left: {star.x}%;
        top: {star.y}%;
        width: {star.size}px;
        height: {star.size}px;
        opacity: {star.opacity};
      "
			></div>
		{/each}
	</div>

	<!-- Content Container -->
	<div
		class="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-[20vh]"
		style="transform: translateY({scrollY * parallaxMultipliers.banner}px);"
	>
		<!-- Logo and Date -->
		<div class="text-center mb-8">
			<img src="/logo.svg" alt="IDEA Hacks Logo" class="w-full max-w-5xl h-auto mx-auto mb-6" />
			<div class="space-y-2">
				<div
					class="font-sans text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg"
				>
					Jan 12-14, 2026
				</div>
				<div
					class="font-sans text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg"
				>
					Ackerman Grand Ballroom
				</div>
			</div>
		</div>

		<!-- Email Signup Form -->
		<div class="relative">
			<form
				bind:this={emailForm}
				on:submit={handleEmailSubmit}
				enctype="multipart/form-data"
				class="rounded-lg overflow-hidden inline-block w-96 md:w-[28rem]"
				style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%); z-index:40;"
			>
				<div class="flex">
					<input
						type="email"
						name="email"
						placeholder="Enter email to stay updated"
						class="flex-1 px-5 py-3 bg-white text-gray-800 placeholder-gray-500 text-sm md:text-base focus:outline-none border-0"
						style="font-family: 'Roboto Mono', monospace;"
						required
					/>
					<button
						type="submit"
						disabled={isSubmitting}
						class="px-8 py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 disabled:cursor-not-allowed text-white font-medium transition-colors duration-200 text-sm md:text-base border-0 flex items-center gap-2"
						style="font-family: 'Roboto Mono', monospace;"
					>
						{#if isSubmitting}
							<div class="loading-spinner"></div>
						{/if}
						{isSubmitting ? 'Submitting...' : 'Submit'}
					</button>
				</div>
			</form>

			{#if showThankYou}
				<div
					class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium transition-all duration-300"
					style="font-family: 'Roboto Mono', monospace;"
				>
					Thank you!
				</div>
			{/if}
		</div>
	</div>

	<!-- Sun with glow (behind mountains) -->
	<div
		class="absolute bottom-[50px] left-1/2 transform -translate-x-1/2 w-96 h-96 md:w-[500px] md:h-[500px]"
		style="z-index:5; transform: translate(-50%, {scrollY * parallaxMultipliers.sun}px);"
	>
		<div
			class="absolute inset-0 rounded-full opacity-60 blur-3xl"
			style="background: radial-gradient(circle, #ffe24f 0%, #FFB80c 50%, transparent 70%);"
		></div>
		<div
			class="relative w-full h-full rounded-full"
			style="background: radial-gradient(circle, #ffe24f 0%, #FFB80c 100%); box-shadow: 0 0 60px #ffe24f, 0 0 120px #FFB80c;"
		></div>
	</div>

	<!-- Mountains + Grid + Panel -->
	<div
		class="scene"
		style="position: absolute; left:0; right:0; bottom:0; z-index:20; pointer-events: none;"
	>
		<!-- Mountains SVG (on top of grid and panel) -->
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			style="height: 100%; width: 100%; z-index:20;"
		>
			<path
				d={mountainPath}
				fill="black"
				style={`transform: translateY(${-rise}%); transition: transform 1400ms cubic-bezier(.22,1,.36,1);`}
			/>
		</svg>

		<!-- Gradient ground panel (slightly overlaps mountains to prevent flicker) -->
		<div
			style="height: 65%; position: absolute; bottom:0; left:0; right:0; z-index:30; transform: translateY({scrollY *
				parallaxMultipliers.foreground}px)"
		>
			<div style="height:100%; background: linear-gradient(to top, #160F38 0%, black 100%);">
				<svg
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					style="width:100%; height:100%; z-index:40;"
				>
					<defs>
						<linearGradient id="grid-fade" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stop-color="white" stop-opacity="0.45" />
							<stop offset="100%" stop-color="white" stop-opacity="0" />
						</linearGradient>
					</defs>

					{#each horizontalYs as y, i}
						<line
							x1="0"
							y1={y - 2}
							x2="100"
							y2={y - 2}
							stroke="white"
							stroke-width="0.3"
							opacity={i / horizontalYs.length}
							stroke-dasharray="100"
							stroke-dashoffset={hasAnimated ? 0 : 100}
							style="transition: stroke-dashoffset 1s ease-out {i * 0.04}s;"
						/>
					{/each}

					{#each verticalXs as vx, i}
						<path
							d={`M ${vx.x1} 0 L ${vx.x2} 100`}
							stroke="url(#grid-fade)"
							stroke-width="0.3"
							opacity="0.9"
							stroke-dasharray="140"
							stroke-dashoffset={hasAnimated ? 0 : 140}
							style="transition: stroke-dashoffset 1s ease-out {i * 0.03}s;"
						/>
					{/each}
				</svg>
			</div>
		</div>
	</div>
</div>

<style>
	/* scene sizing */
	.scene {
		width: 100%;
		height: 400px; /* visible band for mountains + grid + panel */
		overflow: hidden;
	}

	/* ensure svg children align to the scene */
	.scene svg {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: block;
	}

	/* loading spinner animation */
	.loading-spinner {
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top: 2px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

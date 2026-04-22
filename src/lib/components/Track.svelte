<script lang="ts">
	export let mainImage: string;
	export let trackTitle: string;
	export let trackDescription: string;
	export let imageAlt = trackTitle;
	export let bounceDelay = '0s';

	$: titleParts = trackTitle.trim().split(/\s+/);
	$: firstWord = titleParts[0] ?? '';
	$: remainingWords = titleParts.slice(1).join(' ');
</script>

<article
	class="mx-auto w-full max-w-[17rem] overflow-visible rounded-2xl border border-white/15 bg-white/5 px-3 pb-3 pt-2 text-center text-white shadow-lg backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]"
>
	<img
		src={mainImage}
		alt={imageAlt}
		class="track-icon mx-auto -mt-7 w-full max-w-[15rem] aspect-square rounded-xl object-contain p-1"
		style={`animation-delay: ${bounceDelay};`}
	/>
	<h3 class="mt-1 text-xl font-bold leading-tight" style="font-family: 'Ethnocentric', sans-serif;">
		<span class="block text-2xl sm:text-3xl">{firstWord}</span>
		{#if remainingWords}
			<span class="block mt-1 text-lg sm:text-xl">{remainingWords}</span>
		{/if}
	</h3>
	<p
		class="mt-1 text-xs sm:text-sm leading-relaxed text-white/90"
		style="font-family: 'Sansation', sans-serif;"
	>
		{trackDescription}
	</p>
</article>

<style>
	.track-icon {
		animation: icon-float 2.8s ease-in-out infinite;
	}

	@keyframes icon-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-14px);
		}
	}
</style>

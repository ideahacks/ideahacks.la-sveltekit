<script lang="ts">
	export let mainImage: string;
	export let prizeName: string;
	export let prizeCategory: string;
	export let imageAlt = prizeName;
	export let floatClass = '';
	export let floatDelay = '0s';
	export let sizeClass = '';
	export let imageClass = '';
</script>

<div class={`prize-float ${floatClass}`} style={`animation-delay: ${floatDelay};`}>
	<article
		class={`w-44 rounded-2xl border border-white/30 bg-white/10 p-3 text-center text-white shadow-[0_0_24px_rgba(255,255,255,0.18)] backdrop-blur-md transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_34px_rgba(255,255,255,0.28)] ${sizeClass}`}
	>
		<img src={mainImage} alt={imageAlt} class={`mx-auto h-24 w-24 object-contain ${imageClass}`} />
		<h3
			class="mt-2 text-sm font-bold leading-tight"
			style="font-family: 'Ethnocentric', sans-serif;"
		>
			{prizeName}
		</h3>
		<p class="mt-1 text-xs text-white/80" style="font-family: 'Sansation', sans-serif;">
			{prizeCategory}
		</p>
	</article>
</div>

<script>
	import track1 from '$lib/images/track1.svg';
	import track2 from '$lib/images/track2.svg';
	import track3 from '$lib/images/track3.svg';
</script>

<!-- TRACKS title -->
<div class="absolute top-[32.5%] left-1/2 transform -translate-x-1/2 z-20">
	<h2
		class="text-white text-5xl sm:text-6xl md:text-7xl font-bold text-center"
		style="font-family: 'Ethnocentric', sans-serif; text-shadow: 0 0 10px #8b5cf6, 0 0 20px #8b5cf6, 0 0 30px #8b5cf6;"
	>
		TRACKS
	</h2>
</div>

<!-- Three columns for tracks positioned at 42.5% from top -->
<div class="absolute top-[35%] left-1/2 transform -translate-x-1/2 w-3/4 z-20">
	<div class="flex flex-col md:flex-row gap-8 justify-center items-center">
		<!-- Column 1: Track 1 -->
		<div class="flex flex-col items-center text-center">
			<img src={track1} alt="Track 1" class="w-48 h-72 md:w-56 md:h-84 mb-3" />
			<h3
				class="text-white text-2xl md:text-3xl font-medium text-center max-w-48 md:max-w-56"
				style="font-family: 'Roboto Mono', monospace;"
			>
				<span class="text-3xl md:text-4xl font-bold">Renovate</span><br />the Future
			</h3>
			<div
				class="mt-9 p-4 rounded-lg text-center inline-block max-w-48 md:max-w-56 h-50 flex items-center justify-center"
				style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%); height: 288px;"
			>
				<p
					class="text-white text-sm md:text-base font-medium"
					style="font-family: 'Roboto Mono', monospace;"
				>
					Build innovative solutions for sustainable infrastructure, smart cities, and environmental
					restoration.
				</p>
			</div>
		</div>

		<!-- Column 2: Track 2 -->
		<div class="flex flex-col items-center text-center">
			<img src={track2} alt="Track 2" class="w-72 h-72 md:w-84 md:h-84 mb-3" />
			<h3
				class="text-white text-2xl md:text-3xl font-medium text-center max-w-48 md:max-w-56"
				style="font-family: 'Roboto Mono', monospace;"
			>
				<span class="text-3xl md:text-4xl font-bold">Fashion</span><br />the Future
			</h3>
			<div
				class="mt-9 p-4 rounded-lg text-center inline-block max-w-48 md:max-w-56 h-50 flex items-center justify-center"
				style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%); height: 288px;"
			>
				<p
					class="text-white text-sm md:text-base font-medium"
					style="font-family: 'Roboto Mono', monospace;"
				>
					Create cutting-edge wearable technology, smart textiles, and sustainable fashion
					innovations.
				</p>
			</div>
		</div>

		<!-- Column 3: Track 3 -->
		<div class="flex flex-col items-center text-center">
			<img src={track3} alt="Track 3" class="w-48 h-72 md:w-56 md:h-84 mb-3" />
			<h3
				class="text-white text-2xl md:text-3xl font-medium text-center max-w-48 md:max-w-56"
				style="font-family: 'Roboto Mono', monospace;"
			>
				<span class="text-3xl md:text-4xl font-bold">Educate</span><br />the Future
			</h3>
			<div
				class="mt-9 p-4 rounded-lg text-center inline-block max-w-48 md:max-w-56 h-50 flex items-center justify-center"
				style="background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(190,190,190,0.4) 30%, rgba(255,255,255,0.4) 100%); height: 288px;"
			>
				<p
					class="text-white text-sm md:text-base font-medium"
					style="font-family: 'Roboto Mono', monospace;"
				>
					Develop educational technology, learning platforms, and tools that transform how we teach
					and learn.
				</p>
			</div>
		</div>
	</div>
</div>

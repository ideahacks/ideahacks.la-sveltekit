<script lang="ts">
	// Navigation items configuration
	const navItems = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Parts', href: '/parts' }
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Left side navigation -->
			<div class="flex items-center space-x-8">
				{#each navItems as item}
					<a
						href={item.href}
						class="font-mono text-white hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base md:text-lg lg:text-xl font-medium uppercase tracking-wider drop-shadow-lg"
					>
						{item.name}
					</a>
				{/each}
			</div>

			<!-- Right side - Login -->
			<div class="flex items-center">
				<a
					href="/login"
					class="font-mono text-white hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base md:text-lg lg:text-xl font-medium uppercase tracking-wider border border-white/50 px-4 py-2 rounded hover:bg-white/20 drop-shadow-lg"
				>
					Login
				</a>
			</div>
		</div>
	</div>
</nav>

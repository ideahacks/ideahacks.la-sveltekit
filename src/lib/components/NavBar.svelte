<script lang="ts">
	// Left-aligned navigation items
	const leftNavItems = [
		{ name: 'Home', href: '/' },
		{ name: 'IEEE', href: 'https://www.ieeebruins.com/', external: true },
		{ name: 'Discord', href: 'https://discord.gg/XFkxmCwME5', external: true }
	];
</script>

<nav class="fixed top-0 left-0 right-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<!-- Left-aligned navigation -->
			<div class="flex items-center space-x-8">
				{#each leftNavItems as item}
					<a
						href={item.href}
						class="font-mono text-white hover:text-blue-400 transition-colors duration-200 text-sm sm:text-base md:text-lg lg:text-xl font-medium uppercase tracking-wider drop-shadow-lg"
						{...item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>

<script lang="ts">
	// Left-aligned navigation items
	const leftNavItems = [
		{ name: 'Home', href: '/' },
		{ name: 'IEEE @ UCLA', href: 'https://www.ieeebruins.com/', external: true }
	];
	
	// Right-aligned navigation items
	const rightNavItems = [
		{ name: '2025', href: 'https://idea-hacks-2025.devpost.com/', external: true },
		{ name: '2024', href: 'https://idea-hacks-2024.devpost.com/', external: true }
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

			<!-- Right-aligned navigation -->
			<div class="flex items-center space-x-8">
				{#each rightNavItems as item}
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

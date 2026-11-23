<script lang="ts">
	import { page } from '$app/stores';

	export let comingSoon = false;
	export let homepage2027 = false;
	export let portal2027 = false;

	const linkStyle =
		'text-white transition-colors duration-200 sm:text-base md:text-lg lg:text-xl font-medium uppercase tracking-wider drop-shadow-lg';
	$: linkClasses = `${linkStyle} ${homepage2027
		? 'font-jetbrains text-xs hover:text-blue-400'
		: portal2027
			? 'font-jetbrains text-sm hover:text-[#FFF385]'
			: 'font-mono text-sm hover:text-blue-400'}`;
	$: groupClasses = homepage2027 ? 'flex items-center space-x-2 sm:space-x-8' : 'flex items-center space-x-8';

	// Left-aligned navigation items
	const leftNavItems = [
		{ name: 'Home', href: '/' },
		//{ name: 'Parts', href: '/parts' },
		{ name: 'IEEE', href: 'https://www.ieeebruins.com/', external: true },
		{ name: 'Discord', href: 'https://discord.gg/XFkxmCwME5', external: true }
	];

	// Right-aligned navigation items - conditional based on auth and admin
	$: rightNavItems = $page.data.session
		? ('is_admin' in $page.data && $page.data.is_admin)
			? [
					{ name: 'DASHBOARD', href: '/dashboard' },
					{ name: 'ADMIN', href: '/admin' }
				]
			: [{ name: 'DASHBOARD', href: '/dashboard' }]
		: [
				{ name: 'LOGIN', href: '/login' },
				{ name: 'CREATE ACCOUNT', href: '/signup' }
			];
</script>

<nav class={`fixed top-0 left-0 right-0 z-50 ${portal2027 ? 'bg-[#0068BD]' : ''}`}>
	<div class={homepage2027 ? 'px-2 sm:px-4 lg:px-5' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
		<div class="flex justify-between items-center h-16">
			<!-- Left-aligned navigation -->
			<div class={groupClasses}>
				{#each leftNavItems.filter((item) => !comingSoon || item.href !== '/parts') as item}
					<a
						href={item.href}
						class={linkClasses}
						{...item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}
					>
						{item.name}
					</a>
				{/each}
			</div>

			<!-- Right-aligned navigation -->
			<div class={groupClasses}>
				{#each comingSoon ? [] : rightNavItems as item}
					<a
						href={item.href}
						class={linkClasses}
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>

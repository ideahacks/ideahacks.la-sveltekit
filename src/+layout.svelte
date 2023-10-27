<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});

	async function logout() {
		await supabase.auth.signOut();
	}
</script>

<<<<<<< HEAD
<svelte:head>
	<title>Welcome to the IDEAHacks hackathon!</title>
	<meta name="description" content="Welcome to the IDEAHacks hackathon!" />
</svelte:head>

<div class="font-mono min-h-screen flex flex-col">
	<header class="flex justify-between items-center py-6 px-12">
=======
<div class="font-mono flex min-h-screen flex-col">
	<header class="flex items-center justify-between px-12 py-6">
>>>>>>> 6cb8f22e7c2bc4ad5fb578e2d8a07b186ae688e8
		<a class="text-4xl font-bold tracking-wide" href="/">Enceladus-1</a>
		{#if session}
			<div>
				<a href="/dashboard" class="border-2 border-black p-1 text-lg tracking-tighter">Dashboard</a
				>
				<button on:click={logout} class="border-2 border-black p-1 text-lg tracking-tighter"
					>Sign Out</button
				>
			</div>
		{:else}
			<a href="/login" class="border-2 border-black p-1 text-lg tracking-tighter">Login or Signup</a
			>
		{/if}
	</header>

	<slot />
</div>

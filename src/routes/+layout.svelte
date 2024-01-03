<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(async (event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<div class="flex min-h-screen flex-col">
	<Navbar {supabase} {session} />

	<main class="flex-1">
		<slot />
	</main>

	<Footer />
</div>

<style lang="postcss">
	main {
		background: linear-gradient(180deg, #240202 0%, #70130b 19.56%, #a53018 46.19%, #d97e2e 74.45%);
	}
</style>

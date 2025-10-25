<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabase';
	import logo from '$lib/images/ideahacks_logos/default_logo.png';

	import type { PageData } from './$types';

	import '../app.css';

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});

	import { fly } from 'svelte/transition';
	import { linear } from 'svelte/easing';

	let wave1 = $state(false);
	let wave2 = $state(false);
	let wave3 = $state(false);
	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	setTimeout(() => (wave1 = true), 0);
	setTimeout(() => (wave2 = true), 15000);
	setTimeout(() => (wave3 = true), 30000);
</script>

<div class="z-0 flex min-h-screen flex-col">
	{@render children?.()}
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(0deg, #0c2f57 0%, #1b0029 100%);
		overscroll-behavior: contain;
	}
</style>

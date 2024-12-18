<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import '../app.css';

	// export let data;

	// let { supabase, session } = data;
	// $: ({ supabase, session } = data);

	// onMount(() => {
	// 	const {
	// 		data: { subscription }
	// 	} = supabase.auth.onAuthStateChange((event, _session) => {
	// 		if (_session?.expires_at !== session?.expires_at) {
	// 			invalidate('supabase:auth');
	// 		}
	// 	});

	// 	return () => subscription.unsubscribe();
	// });
</script>

<div class="z-0 flex min-h-screen flex-col">
	<slot />
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(180deg, #2775af 0%, #83c3e8 100%);
		background-color: #83c3e8;
	}
</style>

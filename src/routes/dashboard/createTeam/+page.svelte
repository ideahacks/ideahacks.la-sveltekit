<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

</script>

<NavBar />
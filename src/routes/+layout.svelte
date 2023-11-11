<script lang="ts">
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<div class="grid min-h-screen grid-rows-[auto_1fr_auto]">
	<Navbar />

	<main>
		<slot />
	</main>

	<Footer />
</div>

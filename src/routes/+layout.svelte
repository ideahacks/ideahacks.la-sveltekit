<script>
	import '../app.css';
	import Navbar from '../lib/components/Navbar.svelte';
	import Footer from '../lib/components/Footer.svelte';
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />

	<main>
		<slot />
	</main>

	<Footer />
</div>

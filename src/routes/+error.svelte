<script>
	import { page } from '$app/stores';
</script>

<div class="m-8 text-center">
	<h1 class="font-display-serif text-7xl font-bold md:text-8xl">{$page.status}</h1>
	<p class="font-display-sans text-3xl md:text-4xl">{$page.error?.message}</p>
</div>

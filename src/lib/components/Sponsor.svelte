<script lang="ts">
	export let src: string;
	export let alt: string;
</script>

<div class="w-56">
	<img class="brightness-0 invert transition hover:filter-none" {src} {alt} />
</div>

<script>
	import pixelclouds from '$lib/images/pixelclouds.png';
</script>

<div
	class="scrolling-background fixed bottom-0 z-0 h-24 w-full"
	style="background-image: url({pixelclouds})"
/>

<style>
	.scrolling-background {
		opacity: 80%;
		background-repeat: repeat-x;
		background-size: contain;
		animation: scroll-left 20s linear infinite;
	}

	@keyframes scroll-left {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: -990px 0; /* Adjust the -1000px value based on the width of your image */
		}
	}
</style>

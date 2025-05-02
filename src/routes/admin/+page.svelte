<script>
	import SelectionButton from '$lib/components/utility/SelectionButton.svelte';
	export let data;
</script>

{#if data.is_admin}
	<div class="z-10 mx-5 my-10 max-w-4xl font-encode text-white sm:mx-24">
		<h1 class="mb-4 font-paytone text-2xl text-white xl:text-4xl">
			<span>Admin Page</span>
		</h1>

		<a href="/admin/teams"><SelectionButton text="View All Teams" /></a>
		<br />
		<a href="/admin/parts"><SelectionButton text="Parts Checkin/Checkout" /></a>
	</div>
{:else}
	<h1 class="m-auto max-w-xl text-center font-encode text-lg text-white">
		You are not an admin! Contact webmaster@ieeebruins.com or agariomasster on discord for any
		questions!
	</h1>
{/if}

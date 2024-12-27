<script>
	export let data;
</script>

{#if data.is_admin}
	<div class="z-10 mx-5 my-10 max-w-4xl font-encode text-white md:mx-24">
		<ul class="font-bold">
			<li class="hover:opacity-50"><a href="/admin/application-review">Application Review</a></li>
		</ul>
	</div>
{:else}
	<h1 class="m-auto max-w-xl text-center font-encode text-lg text-white">
		You are not an admin! Contact webmaster@ieeebruins.com or agariomasster on discord for any
		questions!
	</h1>
{/if}

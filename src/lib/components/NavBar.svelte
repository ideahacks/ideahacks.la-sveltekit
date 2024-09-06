<script lang="ts">
	export let isAdmin;
</script>

<div class="font-display-sans navbar bg-custom-yellow font-bold">
	<ul class="mr-4">
		{#if isAdmin}
			<li>
				<a href="/admin" class="mr-4">Admin</a>
			</li>
		{/if}
		<li>
			<a href="/parts" class="mr-4">Parts</a>
		</li>
	</ul>
</div>

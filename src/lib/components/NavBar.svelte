<script lang="ts">
	export let isAdmin = true;
	export let isLoggedIn = true;
</script>

<div class="navbar bg-custom-yellow font-paytone font-bold">
	<div class="flex flex-1 pl-4">
		<a href="/" class="mr-4">HOME</a>
	</div>
	<div class="ml-auto flex">
		<ul class="flex flex-row items-center">
			<li>
				<a href="/" class="ml-2 mr-4">ABOUT</a>
			</li>
			<li>
				<a href="/" class="ml-2 mr-4">WORKSHOPS</a>
			</li>
			<li>
				<a href="/parts" class="ml-2 mr-4">PARTS</a>
			</li>
			{#if isLoggedIn === false}
				<li>
					<a href="/" class="ml-2 mr-4 text-custom-brown underline">LOGIN</a>
				</li>
			{:else if isAdmin === false}
				<li>
					<a href="/" class="ml-2 mr-4 text-custom-brown">SIGN OUT</a>
				</li>
			{:else}
				<li>
					<details class="dropdown-center dropdown dropdown-end">
						<summary tabindex="-1" class="mr-4" id="dropdown-button">ADMIN</summary>
						<ul
							tabindex="-1"
							id="dropdown-menu"
							class="menu dropdown-content z-[1] mt-6 w-48 items-center rounded-box bg-custom-yellow p-1 text-sm"
						>
							<li><a href="/teams">Teams</a></li>
							<li><a href="/">Checking Parts</a></li>
							<li><a href="/">Application Review</a></li>
						</ul>
					</details>
				</li>
				<li>
					<a href="/" class="ml-2 mr-4 text-custom-brown">SIGN OUT</a>
				</li>
			{/if}
		</ul>
	</div>
</div>

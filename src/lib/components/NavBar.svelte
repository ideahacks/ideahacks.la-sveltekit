<script lang="ts">
	export let isAdmin = true;
	export let isLoggedIn = true;
	import type { Session, SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;
	export let session: Session;

	const email = session ? session.user.email : '';

	async function checkIfAdmin() {
		const { data, error } = await supabase.from('admins').select();

		if (error) {
			console.log('Error retrieving admins');
		}

		console.log(data);
		const isAdmin = data?.some((item) => item.email === email);

		return isAdmin;
	}
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

			{#await checkIfAdmin() then isAdmin}
				{#if isAdmin}
					<li>
						<div class="dropdown dropdown-end dropdown-hover">
							<div tabindex="-1" class="ml-2 mr-4">
								<span class="hover:underline">ADMIN</span>
							</div>
							<ul
								tabindex="-1"
								class="menu dropdown-content z-[1] w-52 items-center rounded-box border-2 border-custom-yellow bg-base-100 p-1 text-sm"
							>
								<li><a href="/teams">Teams</a></li>
								<li><a href="/">Checking Parts</a></li>
								<li><a href="/">Application Review</a></li>
							</ul>
						</div>
					</li>
					<li>
						<a href="/" class="ml-2 mr-4 text-custom-brown">SIGN OUT</a>
					</li>
				{:else}
					<li>
						<a href="/" class="ml-2 mr-4 text-custom-brown">SIGN OUT</a>
					</li>
				{/if}
			{/await}

			{#if email.length === 0}
				<li>
					<a href="/" class="ml-2 mr-4 text-custom-brown underline">LOGIN</a>
				</li>
			{:else if isAdmin === false}{:else}{/if}
		</ul>
	</div>
</div>

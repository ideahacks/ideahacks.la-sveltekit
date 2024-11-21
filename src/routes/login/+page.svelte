<script lang="ts">
	import { page } from '$app/stores';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	async function signIn() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/application`
			}
		});
	}
</script>

<div class="flex flex-col items-center text-center font-encode">
	<div class="card glass my-16 shadow-xl">
		<div class="card-body items-center text-center">
			<h1 class="card-title text-3xl">Join or sign in</h1>
			<div class="card-actions">
				<button on:click={signIn} class="btn-large btn m-4">Sign in with Google</button>
			</div>
		</div>
	</div>
	<p class="mb-4 max-w-md">
		Glad you're here! If you have any issues with login, please reach out to <a
			href="mailto:webmaster@ieeebruins.com"
			class="link">webmaster@ieeebruins.com</a
		>
		or <span class="font-mono">agariomasster</span> on Discord.
	</p>
</div>

<style lang="postcss">
</style>

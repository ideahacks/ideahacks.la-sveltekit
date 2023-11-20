<script lang="ts">
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	async function signUp() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback`
			}
		});
	}
</script>

<div class="flex w-full grow items-center justify-center bg-neutral-100">
	<div class="rounded-md bg-white p-6 shadow-lg">
		<h2 class="text-center">Welcome</h2>
		<button
			class="mt-2 w-full bg-black px-4 py-4 text-center text-white hover:shadow-lg"
			on:click={signUp}>Sign Up with Google OAuth</button
		>
	</div>
</div>

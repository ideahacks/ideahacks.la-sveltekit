<script lang="ts">
<<<<<<< HEAD
	import { page } from '$app/stores';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const nextPage = $page.url.searchParams.get('next');

	async function signIn() {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${window.location.origin}/auth/callback${nextPage ? `?next=/${nextPage}` : ''}`
			}
		});
	}
</script>

<div class="flex flex-col items-center text-center">
	<div class="card glass my-16 shadow-xl">
		<div class="card-body items-center text-center">
			<h1 class="card-title text-3xl">Join or sign in</h1>
			<div class="card-actions">
				<button on:click={signIn} class="btn-large btn-primary btn m-4">Sign in with Google</button>
			</div>
		</div>
	</div>
	<p class="mb-4 max-w-md">
		Glad you're here! If you have any issues with login, please reach out to <a
			href="mailto:webmaster@ieeebruins.com"
			class="link">webmaster@ieeebruins.com</a
		>
		or <span class="font-mono">paulzzy</span> on Discord.
	</p>
</div>

<style lang="postcss">
	:global(body) {
		background: linear-gradient(
			180deg,
			#240202 0%,
			#70130b 18.75%,
			#a53018 44.27%,
			#d97e2e 71.35%,
			#f6c042 95.83%
		);
	}
</style>
=======
import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

async function signUp(){
	const {error} = await supabase.auth.signInWithOAuth({
			provider: 'google',
			
		});
		
}
	/*
	let uname = (document.getElementById('uname') as HTMLInputElement).value
	let pass = (document.getElementById('pass') as HTMLInputElement).value
	if(uname == null || pass == null){
		return
	}
	else if(uname.includes('@') && uname.includes('.co') && pass.length >= 8){
		const supabaseServer = supabase.auth.signUp({
			email: uname,
			password: pass,
		});
	}
*/

</script>

<div class="grow w-full flex justify-center items-center bg-neutral-100">
	<div class="bg-white rounded-md shadow-lg p-6">
		<h2 class="text-center">Welcome</h2>
		<p>Username:</p>
		<div style="margin-bottom: 30px"><input id="uname"/></div>
		<p>Password:</p>
		<div style="margin-bottom: 30px"><input id="pass"/></div>
		
		
		<button
			class="bg-black text-white w-full text-center py-4 px-4 mt-2 hover:shadow-lg"
			on:click={signUp}>Sign Up with Google OAuth</button
		>
	</div>
</div>
>>>>>>> e2a2066f634eec7d876b170a5a588864662aaa17

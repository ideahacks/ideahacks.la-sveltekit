<script lang="ts">
	import { createClient } from '@supabase/supabase-js';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

	async function signUp() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: '/auth/callback'
			}
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

<div class="flex w-full grow items-center justify-center bg-neutral-100">
	<div class="rounded-md bg-white p-6 shadow-lg">
		<h2 class="text-center">Welcome</h2>
		<p>Username:</p>
		<div style="margin-bottom: 30px"><input id="uname" /></div>
		<p>Password:</p>
		<div style="margin-bottom: 30px"><input id="pass" /></div>

		<button
			class="mt-2 w-full bg-black px-4 py-4 text-center text-white hover:shadow-lg"
			on:click={signUp}>Sign Up with Google OAuth</button
		>
	</div>
</div>

<script lang='ts'>


import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY)

async function signUp(){
	const {error} = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: 'http://localhost:5173/profile'
			}
		});
		const user = supabase.auth.getSession()['data'].session.user
		if (error) {
			console.error('Error during sign in:', error)
		} else if (user && user.email.endsWith('@g.ucla.edu')) {
			console.log('User signed in:', user)
			await supabase.auth.signInWithOAuth({
				provider: 'google',
				options: {
					redirectTo: 'http://localhost:5173/profile'
				}
		});
		} else {
			console.log('Invalid domain. Please use a g.ucla.edu email.')
		}
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
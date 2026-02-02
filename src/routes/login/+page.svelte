<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import previous2 from '$lib/images/previous/Previous 2 trimmed.png';

	let email = '';
	let password = '';
	let errorMsg = '';
	let loading = false;
	let signInDebug: any = null;

	async function handleLogin() {
		loading = true;
		errorMsg = '';
		signInDebug = null;
		try {
			const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
			// Helpful debug - visible in browser console. Remove when not needed.
			console.log('supabase signIn', { data, error });
			signInDebug = { data, error };

			if (error) {
				errorMsg = error.message;
			} else {
				// Redirect on success
				goto('/dashboard');
			}
		} catch (err) {
			// `err` is `unknown` in strict TS configs. Handle safely.
			console.error('signIn exception', err);
			if (err instanceof Error) {
				errorMsg = err.message;
			} else {
				errorMsg = String(err);
			}
		} finally {
			loading = false;
		}
	}
</script>

<div
	class="flex items-center justify-center min-h-screen"
	style="background: linear-gradient(0deg, #0C2F57 0%, #1B0029 100%);"
>
	<div class="bg-white/25 shadow-lg rounded-md p-8 w-[800px] h-[500px] flex">
		<div class="w-1/2 flex items-center justify-center overflow-hidden rounded-l-md">
			<img src={previous2} alt="Login illustration" class="w-full h-full object-cover" />
		</div>

		<div class="w-1/2 flex flex-col justify-center pl-8">
			<h1 class="text-2xl text-stone-100 font-Ethnocentric text-center mb-6">Welcome!</h1>

			<form on:submit|preventDefault={handleLogin} class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium mb-1 text-stone-100"
						>Email Address</label
					>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
						placeholder="joebruin@example.com"
						required
					/>
				</div>

				<div>
					<div class="flex justify-between items-center mb-1">
						<label for="password" class="text-sm font-medium text-stone-100">Password</label>
						<a href="/reset" class="text-sm text-blue-100 hover:underline">Forgot password?</a>
					</div>
					<input
						id="password"
						type="password"
						bind:value={password}
						class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
						placeholder="••••••••"
						required
					/>
				</div>

				{#if errorMsg}
					<p class="text-red-500 text-sm">{errorMsg}</p>
				{/if}

				<p class="text-left text-sm text-stone-100 mt-4">
					Don’t have an account?
					<a href="/signup" class="text-blue-100 hover:underline">Sign up!</a>
				</p>

				<button
					type="submit"
					class="w-full bg-cyan-900 text-stone-100 py-2 rounded-lg hover:bg-cyan-950 transition"
					disabled={loading}
				>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	</div>
</div>

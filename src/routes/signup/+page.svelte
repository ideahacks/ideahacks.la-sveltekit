<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import previous5 from '$lib/images/previous/Previous 5 trimmed.png';

	let email = '';
	let password = '';
	let confirm = '';
	let errorMsg = '';
	let infoMsg = '';
	let loading = false;

	async function handleSignUp() {
		errorMsg = '';
		infoMsg = '';
		if (!email || !password) {
			errorMsg = 'Please fill out email and password.';
			return;
		}

		if (password !== confirm) {
			errorMsg = 'Passwords do not match.';
			return;
		}

		loading = true;
		try {
			const { data, error } = await supabaseClient.auth.signUp({ email, password });
			console.log('supabase signUp', { data, error });

			if (error) {
				errorMsg = error.message;
			} else {
				// If Supabase project requires email confirmation, the session will be null.
				// Provide a friendly message. If a session exists, redirect to dashboard.
				if (data?.session) {
					goto('/dashboard');
				} else {
					infoMsg = 'Signup successful — please check your email to confirm your account.';
				}
			}
		} catch (err) {
			console.error('signUp exception', err);
			if (err instanceof Error) errorMsg = err.message;
			else errorMsg = String(err);
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
		<!-- Left: Decorative image -->
		<div class="w-1/2 flex items-center justify-center overflow-hidden rounded-l-md">
			<img src={previous5} alt="signup illustration" class="w-full h-full object-cover" />
		</div>

		<!-- Right: Signup form -->
		<div class="w-1/2 flex flex-col justify-center pl-8">
			<h1 class="text-2xl text-stone-100 font-Ethnocentric text-center mb-6">Create account</h1>

			<form on:submit|preventDefault={handleSignUp} class="space-y-4">
				<div>
					<label for="email" class="block text-sm font-medium mb-1 text-stone-100"
						>Email Address</label
					>
					<input
						id="email"
						type="email"
						bind:value={email}
						class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
						placeholder="you@example.com"
						required
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium mb-1 text-stone-100"
						>Password</label
					>
					<input
						id="password"
						type="password"
						bind:value={password}
						class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
						placeholder="Create a password"
						required
					/>
				</div>

				<div>
					<label for="confirm" class="block text-sm font-medium mb-1 text-stone-100"
						>Confirm password</label
					>
					<input
						id="confirm"
						type="password"
						bind:value={confirm}
						class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
						placeholder="Repeat password"
						required
					/>
				</div>

				{#if errorMsg}
					<p class="text-red-500 text-sm">{errorMsg}</p>
				{/if}

				{#if infoMsg}
					<p class="text-green-400 text-sm">{infoMsg}</p>
				{/if}

				<button
					type="submit"
					class="w-full bg-cyan-900 text-stone-100 py-2 rounded-lg hover:bg-cyan-950 transition"
					disabled={loading}
				>
					{loading ? 'Creating account...' : 'Sign up'}
				</button>

				<p class="text-center text-sm text-stone-100 mt-4">
					Already have an account?
					<a href="/login" class="text-blue-100 hover:underline">Log in</a>
				</p>
			</form>
		</div>
	</div>
</div>

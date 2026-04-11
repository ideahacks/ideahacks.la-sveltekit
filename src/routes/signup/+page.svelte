<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

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
	class="flex items-center justify-center min-h-screen px-4"
	style="background: linear-gradient(0deg, #0C2F57 0%, #1B0029 100%);"
>
	<div
		class="w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl shadow-cyan-900/20"
	>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div
				class="hidden md:flex flex-col justify-center gap-4 bg-gradient-to-br from-cyan-700/20 via-slate-950/30 to-blue-700/20 p-10"
			>
				<div class="space-y-4">
					<p class="text-xl uppercase tracking-[0.35em] font-mono text-cyan-100/80">
						Join IDEA Hacks
					</p>
					<h2 class="text-4xl font-bold text-white font-mono tracking-wider">Sign Up</h2>
					<p class="text-white/70 leading-relaxed">
						Create your IDEA Hacks account and access the dashboard.
					</p>
				</div>
			</div>

			<div class="p-10">
				<!-- <div class="mb-8 text-center">
					<h1 class="text-3xl font-semibold text-white font-mono uppercase tracking-wider">
						Sign up
					</h1>
					<p class="mt-3 text-sm text-white/70">
						Create your IDEA Hacks account and access the dashboard.
					</p>
				</div> -->

				<form on:submit|preventDefault={handleSignUp} class="space-y-6">
					<div class="space-y-2">
						<label for="email" class="block text-sm font-medium text-white/80">Email Address</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							class="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
							placeholder="you@example.com"
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="password" class="block text-sm font-medium text-white/80">Password</label>
						<input
							id="password"
							type="password"
							bind:value={password}
							class="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
							placeholder="Create a password"
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="confirm" class="block text-sm font-medium text-white/80"
							>Confirm Password</label
						>
						<input
							id="confirm"
							type="password"
							bind:value={confirm}
							class="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
							placeholder="Repeat password"
							required
						/>
					</div>

					{#if errorMsg}
						<p class="text-sm text-red-400">{errorMsg}</p>
					{/if}

					{#if infoMsg}
						<p class="text-sm text-emerald-300">{infoMsg}</p>
					{/if}

					<button
						type="submit"
						class="w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-700/30 transition hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50"
						disabled={loading}
					>
						{loading ? 'Creating account...' : 'Sign up'}
					</button>

					<p class="text-center text-sm text-white/70 mt-4">
						Already have an account?
						<a href="/login" class="text-cyan-200 hover:text-white transition">Log in</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</div>

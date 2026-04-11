<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let errorMsg = '';
	let loading = false;

	async function handleLogin() {
		loading = true;
		errorMsg = '';
		try {
			const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
			// Helpful debug - visible in browser console. Remove when not needed.
			console.log('supabase signIn', { data, error });

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
					<p class="text-xl uppercase tracking-[0.35em] font-mono text-cyan-100/80">IDEA Hacks</p>
					<h2 class="text-4xl font-bold text-white font-mono tracking-wider">Welcome back</h2>
					<p class="text-white/70 leading-relaxed">
						View your application status, manage your team, and check out parts for IDEA Hacks 2026.
					</p>
				</div>
			</div>

			<div class="p-10">
				<form on:submit|preventDefault={handleLogin} class="space-y-6">
					<div class="space-y-2">
						<label for="email" class="block text-sm font-medium text-white/80">Email Address</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							class="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
							placeholder="joebruin@example.com"
							required
						/>
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between text-sm text-white/80">
							<label for="password" class="font-medium">Password</label>
							<a href="/reset" class="text-cyan-200 hover:text-white transition">Forgot password?</a
							>
						</div>
						<input
							id="password"
							type="password"
							bind:value={password}
							class="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
							placeholder="••••••••"
							required
						/>
					</div>

					{#if errorMsg}
						<p class="text-sm text-red-400">{errorMsg}</p>
					{/if}

					<button
						type="submit"
						class="w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-700/30 transition hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50"
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>

					<p class="text-center text-sm text-white/70">
						Don’t have an account?
						<a href="/signup" class="text-cyan-200 hover:text-white transition">Sign up</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</div>

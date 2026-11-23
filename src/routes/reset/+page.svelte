<script lang="ts">
	import { supabaseClient } from '$lib/supabaseClient';

	let email = '';
	let errorMsg = '';
	let infoMsg = '';
	let loading = false;

	async function handleReset() {
		errorMsg = '';
		infoMsg = '';
		if (!email) {
			errorMsg = 'Please enter your email address.';
			return;
		}

		loading = true;
		try {
			const redirectTo = `${window.location.origin}/reset/change`;
			const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
				redirectTo
			});
			console.log('supabase resetPasswordForEmail', { data, error });
			if (error) {
				errorMsg = error.message;
			} else {
				infoMsg = 'If that email exists, a password reset link has been sent. Check your inbox.';
			}
		} catch (err) {
			console.error('reset exception', err);
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
		class="w-full max-w-2xl rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl shadow-cyan-900/20 overflow-hidden"
	>
		<div class="p-10">
			<div class="text-center mb-8">
				<p class="text-sm uppercase tracking-[0.35em] font-mono text-cyan-100/80">Password reset</p>
				<h1 class="mt-3 text-3xl font-semibold text-white font-mono tracking-wider">
					Forgot your password?
				</h1>
				<p class="mt-3 text-sm text-white/70">
					Enter your email and we’ll send you a link to reset it.
				</p>
			</div>

			<form on:submit|preventDefault={handleReset} class="space-y-6">
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
					{loading ? 'Sending...' : 'Send reset link'}
				</button>

				<p class="text-center text-sm text-white/70 mt-4">
					Remembered your password?
					<a href="/login" class="text-cyan-200 hover:text-white transition">Log in</a>
				</p>
			</form>
		</div>
	</div>
</div>

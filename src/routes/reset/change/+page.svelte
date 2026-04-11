<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/supabaseClient';

	let password = '';
	let confirmPassword = '';
	let errorMsg = '';
	let infoMsg = '';
	let loading = false;
	let recoverySession = false;

	onMount(async () => {
		if (
			window.location.hash.includes('type=recovery') ||
			window.location.hash.includes('access_token')
		) {
			const { error } = await supabaseClient.auth.initialize();
			if (error) {
				errorMsg = error.message;
			} else {
				const { data } = await supabaseClient.auth.getSession();
				if (data.session) {
					recoverySession = true;
					infoMsg = 'Recovery link validated. Enter a new password.';
				}
			}
		} else {
			const { data } = await supabaseClient.auth.getSession();
			if (data.session) {
				recoverySession = true;
			}
		}
	});

	async function handleChange() {
		errorMsg = '';
		infoMsg = '';

		if (!password || !confirmPassword) {
			errorMsg = 'Please enter and confirm your new password.';
			return;
		}

		if (password !== confirmPassword) {
			errorMsg = 'Passwords do not match.';
			return;
		}

		loading = true;
		try {
			const { data: sessionData } = await supabaseClient.auth.getSession();
			if (!sessionData.session) {
				errorMsg =
					'Unable to update password because your recovery session was not detected. Please request a new reset link.';
				return;
			}

			const { data, error } = await supabaseClient.auth.updateUser({ password });
			console.log('supabase updateUser', { data, error });

			if (error) {
				errorMsg = error.message;
			} else {
				infoMsg = 'Password updated successfully. Redirecting to login...';
				setTimeout(() => goto('/login'), 1500);
			}
		} catch (err) {
			console.error('update password exception', err);
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
				<p class="text-sm uppercase tracking-[0.35em] font-mono text-cyan-100/80">
					Update password
				</p>
				<h1 class="mt-3 text-3xl font-semibold text-white font-mono tracking-wider">
					Choose a new password
				</h1>
				<p class="mt-3 text-sm text-white/70">
					Enter a new password to complete your password reset.
				</p>
			</div>

			<form on:submit|preventDefault={handleChange} class="space-y-6">
				<div class="space-y-2">
					<label for="password" class="block text-sm font-medium text-white/80">New Password</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						class="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
						placeholder="••••••••"
						required
					/>
				</div>

				<div class="space-y-2">
					<label for="confirmPassword" class="block text-sm font-medium text-white/80"
						>Confirm Password</label
					>
					<input
						id="confirmPassword"
						type="password"
						bind:value={confirmPassword}
						class="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
						placeholder="••••••••"
						required
					/>
				</div>

				{#if errorMsg}
					<p class="text-sm text-red-400">{errorMsg}</p>
				{/if}

				{#if infoMsg}
					<p class="text-sm text-emerald-300">{infoMsg}</p>
				{/if}

				{#if !recoverySession}
					<p class="text-sm text-white/70">
						Waiting for recovery validation, or visit the reset page again if your link is expired.
					</p>
				{/if}

				<button
					type="submit"
					class="w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-cyan-700/30 transition hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50"
					disabled={loading}
				>
					{loading ? 'Updating...' : 'Update password'}
				</button>

				<p class="text-center text-sm text-white/70 mt-4">
					Remembered your password?
					<a href="/login" class="text-cyan-200 hover:text-white transition">Log in</a>
				</p>
			</form>
		</div>
	</div>
</div>

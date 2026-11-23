<script lang="ts">
	import Fonts2027 from '$lib/components/Fonts2027.svelte';
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

<Fonts2027 />

<div
	class="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#3FA9FF] to-[#BBD98D] px-4 font-inter text-[#064471]"
>
	<div
		class="w-full max-w-4xl overflow-hidden rounded-[32px] border border-[#0068BD]/20 bg-white shadow-xl shadow-[#0068BD]/20"
	>
		<div class="grid grid-cols-1 md:grid-cols-2">
			<div
				class="hidden md:flex flex-col justify-center gap-4 bg-[#0068BD] text-white p-10"
			>
				<div class="space-y-4">
					<p class="text-xl uppercase tracking-[0.35em] font-jetbrains text-[#FFF385]">
						Join IDEA Hacks
					</p>
					<h2 class="font-jaro text-4xl text-white tracking-wide">Sign Up</h2>
					<p class="text-white leading-relaxed">
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
						<label for="email" class="block text-sm font-medium text-[#064471]">Email Address</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							class="w-full rounded-2xl border border-[#0068BD]/25 bg-white px-4 py-3 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
							placeholder="you@example.com"
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="password" class="block text-sm font-medium text-[#064471]">Password</label>
						<input
							id="password"
							type="password"
							bind:value={password}
							class="w-full rounded-2xl border border-[#0068BD]/25 bg-white px-4 py-3 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
							placeholder="Create a password"
							required
						/>
					</div>

					<div class="space-y-2">
						<label for="confirm" class="block text-sm font-medium text-[#064471]"
							>Confirm Password</label
						>
						<input
							id="confirm"
							type="password"
							bind:value={confirm}
							class="w-full rounded-2xl border border-[#0068BD]/25 bg-white px-4 py-3 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
							placeholder="Repeat password"
							required
						/>
					</div>

					{#if errorMsg}
						<p class="text-sm text-red-700">{errorMsg}</p>
					{/if}

					{#if infoMsg}
						<p class="text-sm text-green-800">{infoMsg}</p>
					{/if}

					<button
						type="submit"
						class="w-full rounded-2xl border border-[#0068BD] bg-[#FFF385] px-4 py-3 font-jetbrains text-sm font-bold uppercase tracking-wider text-[#064471] transition-colors hover:bg-[#BBD98D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068BD] disabled:opacity-50"
						disabled={loading}
					>
						{loading ? 'Creating account...' : 'Sign up'}
					</button>

					<p class="text-center text-sm text-[#064471] mt-4">
						Already have an account?
						<a href="/login" class="font-semibold text-[#0068BD] underline underline-offset-2 transition-colors hover:text-[#064471]">Log in</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</div>

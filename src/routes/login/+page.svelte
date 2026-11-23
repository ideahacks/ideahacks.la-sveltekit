<script lang="ts">
	import Fonts2027 from '$lib/components/Fonts2027.svelte';
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
			const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

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
					<p class="text-xl uppercase tracking-[0.35em] font-jetbrains text-[#FFF385]">IDEA Hacks</p>
					<h2 class="font-jaro text-4xl text-white tracking-wide">Welcome back</h2>
					<p class="text-white leading-relaxed">
						Apply for IDEA Hacks 2027 or view your application status.
					</p>
				</div>
			</div>

			<div class="p-10">
				<form on:submit|preventDefault={handleLogin} class="space-y-6">
					<div class="space-y-2">
						<label for="email" class="block text-sm font-medium text-[#064471]">Email Address</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							class="w-full rounded-2xl border border-[#0068BD]/25 bg-white px-4 py-3 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
							placeholder="joebruin@example.com"
							required
						/>
					</div>

					<div class="space-y-2">
						<div class="flex items-center justify-between text-sm text-[#064471]">
							<label for="password" class="font-medium">Password</label>
							<a href="/reset" class="font-semibold text-[#0068BD] underline underline-offset-2 transition-colors hover:text-[#064471]">Forgot password?</a
							>
						</div>
						<input
							id="password"
							type="password"
							bind:value={password}
							class="w-full rounded-2xl border border-[#0068BD]/25 bg-white px-4 py-3 text-[#064471] placeholder:text-slate-500 focus:border-[#0068BD] focus:outline-none focus:ring-2 focus:ring-[#3FA9FF]/50"
							placeholder="••••••••"
							required
						/>
					</div>

					{#if errorMsg}
						<p class="text-sm text-red-700">{errorMsg}</p>
					{/if}

					<button
						type="submit"
						class="w-full rounded-2xl border border-[#0068BD] bg-[#FFF385] px-4 py-3 font-jetbrains text-sm font-bold uppercase tracking-wider text-[#064471] transition-colors hover:bg-[#BBD98D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0068BD] disabled:opacity-50"
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>

					<p class="text-center text-sm text-[#064471]">
						Don’t have an account?
						<a href="/signup" class="font-semibold text-[#0068BD] underline underline-offset-2 transition-colors hover:text-[#064471]">Sign up</a>
					</p>
				</form>
			</div>
		</div>
	</div>
</div>

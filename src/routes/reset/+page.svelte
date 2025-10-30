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
      const redirectTo = typeof window !== 'undefined' ? `${location.origin}/login` : undefined;
      const opts = redirectTo ? { redirectTo } : undefined;
      const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, opts as any);
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

<div class="flex items-center justify-center min-h-screen" style="background: linear-gradient(0deg, #0C2F57 0%, #1B0029 100%);">
  <div class="bg-white/25 shadow-lg rounded-md p-8 w-[600px] h-[300px] flex items-center">
    <div class="w-full">
      <h1 class="text-2xl text-stone-100 font-Ethnocentric text-center mb-6">Reset password</h1>

      <form on:submit|preventDefault={handleReset} class="max-w-md mx-auto space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium mb-1 text-stone-100">Email Address</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
            placeholder="you@example.com"
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
          {loading ? 'Sending...' : 'Send reset link'}
        </button>

        <p class="text-center text-sm text-stone-100 mt-4">
          Remembered your password?
          <a href="/login" class="text-blue-100 hover:underline">Log in</a>
        </p>
      </form>
    </div>
  </div>
</div>

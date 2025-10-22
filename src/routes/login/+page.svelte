<script lang="ts">
  import { supabaseClient } from '$lib/supabaseClient';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let email = '';
  let password = '';
  let errorMsg = '';
  let loading = false;

  async function handleLogin() {
    loading = true;
    errorMsg = '';

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      errorMsg = error.message;
    } else {
      // Redirect on success
      goto('/dashboard');
    }

    loading = false;
  }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-500">
  <div class="bg-white shadow-lg rounded-2xl p-8 w-[360px]">
    <h1 class="text-2xl font-Ethnocentric text-center mb-6">Welcome!</h1>
    
    <form on:submit|preventDefault={handleLogin} class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          bind:value={email}
          class="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input
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

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p class="text-center text-sm text-gray-500 mt-4">
        Don’t have an account?
        <a href="/signup" class="text-blue-600 hover:underline">Sign up</a>
      </p>
    </form>
  </div>
</div>

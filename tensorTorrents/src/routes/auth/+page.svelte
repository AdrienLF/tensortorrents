<!-- src/routes/auth/+page.svelte -->
<script>

import { Section, Register } from 'flowbite-svelte-blocks';
import { Button, Checkbox, Label, Input } from 'flowbite-svelte';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase } = data);

	let email = '';
	let password = '';
	let message = '';
	let messageType = '';
  let signin = true

	const showMessage = (text, type = 'error') => {
		message = text;
		messageType = type;
		setTimeout(() => (message = ''), 3000); // Message disappears after 3 seconds
	};

	const handleSignUp = async () => {
		if (!email || !password) {
			showMessage('Please enter both email and password');
			return;
		}

		try {
			await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${location.origin}/auth/callback`
				}
			});
			showMessage('Sign up successful, please check your email', 'success');
		} catch (error) {
			showMessage(error.error_description || 'Sign up failed');
		}
	};

	const handleSignIn = async () => {
		await supabase.auth.signInWithPassword({
			email,
			password
		});
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>


<Section name="login">
  <Register href="/">
    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
      <form class="flex flex-col space-y-6" action="/">
        <h3 class="text-xl font-medium text-gray-900 dark:text-white p-0">Login</h3>
        <Label class="space-y-2">
          <span>Your email</span>
          <Input id="email" type="email" bind:value={email} placeholder="Enter your email" />
        </Label>
        <Label class="space-y-2">
          <span>Your password</span>
          <Input
				id="password"
				type="password"
				bind:value={password}
				placeholder="Enter your password"
			/>
        </Label>

        <!-- <div class="flex items-start">
          <Checkbox>Remember me</Checkbox>
          <a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Forgot password?</a>
        </div>
         -->
        

        {#if signin}
        <Button type="submit" class="w-full" on:click={handleSignIn}>{signin ? "Sign In" : "Sign Up"}</Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet? 
                <span on:click={() => signin=false} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</span>
            </p>
        {:else}
        <Button type="submit" class="w-full" on:click={handleSignUp}>{signin ? "Sign In" : "Sign Up"}</Button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? 
                <span on:click={() => signin=true} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</span>
            </p>
        {/if}
        
        
      </form>
    </div>
  </Register>
</Section>

<style>
	form,
	button {
		margin: 10px 0;
	}

	input {
		padding: 8px;
		margin: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	button {
		padding: 10px 15px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:hover {
		background-color: #0056b3;
	}

	.message {
		color: #d8000c;
		background-color: #ffbaba;
	}

	.message.success {
		color: #4f8a10;
		background-color: #dff2bf;
	}
</style>

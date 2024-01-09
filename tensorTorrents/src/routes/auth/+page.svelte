<!-- src/routes/auth/+page.svelte -->
<script>
  export let data;
  let { supabase, session } = data;
  $: ({ supabase } = data);

  let email = '';
  let password = '';
  let message = '';
  let messageType = '';

  const showMessage = (text, type = 'error') => {
    message = text;
    messageType = type;
    setTimeout(() => message = '', 3000); // Message disappears after 3 seconds
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
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });
      showMessage('Sign up successful, please check your email', 'success');
    } catch (error) {
      showMessage(error.error_description || 'Sign up failed');
    }
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }
</script>

<div class="container flex items-center flex-col">
<form on:submit|preventDefault={handleSignUp}>
  <div>
    <label for="email">Email:</label>
    <input id="email" type="email" bind:value="{email}" placeholder="Enter your email" />
  </div>

  <div>
    <label for="password">Password:</label>
    <input id="password" type="password" bind:value="{password}" placeholder="Enter your password" />
  </div>

  <button type="submit">Sign up</button>
</form>

{#if session}
<button on:click="{handleSignOut}">Sign out</button>
{:else}
<button on:click="{handleSignIn}">Sign in</button>
{/if}




{#if message}
  <div class="message {messageType === 'success' ? 'success' : ''}">
    {message}
  </div>
{/if}

</div>


<style>
  form, button {
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
    color: #4F8A10;
    background-color: #DFF2BF;
  }
</style>

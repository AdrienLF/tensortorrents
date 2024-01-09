<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { Heading } from 'flowbite-svelte';

    export let data;
  let { supabase, session } = data;
  $: ({ supabase } = data);

  let email = '';
  let password = '';
  let message = '';
  let messageType = '';

const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  onMount(async () => {
    await handleSignOut();
    setTimeout(() => goto("/"), 3000);
  });


  </script>

<div class="container p-4 flex items-center align-middle">
  <Heading tag="h1" >Signing out...</Heading>
</div>
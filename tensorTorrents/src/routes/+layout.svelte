<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/ui/Navbar.svelte';
	import Footer from '$lib/components/ui/Footer.svelte';

  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'

  export let data

  let { supabase, session } = data
  $: ({ supabase, session } = data)

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, _session) => {
      if (_session?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => subscription.unsubscribe()
  });
</script>

<Navbar />
<slot />
<Footer />

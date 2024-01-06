<script>
        export let data
    let { supabase } = data
    $: ({ supabase, session } = data)
  
	import Auth from 'supabase-ui-svelte';
    console.log(supabase)
    console.log(session)
</script>

<Auth supabaseClient={supabase}/>

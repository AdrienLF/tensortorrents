import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'


export function createDatabase(){
    const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, 
        )
        return supabase
}
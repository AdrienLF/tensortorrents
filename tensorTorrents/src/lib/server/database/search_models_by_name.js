import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'


export async function search_models_by_name( search_input) {

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, 
		)

	console.log(search_input)
	let { data: models, error } = await supabase.from('models').select('*, modeltypes(type_id, name),owner(username, avatar_url, created_at)').like("name", `%${search_input}%`);

	console.log(models)
	console.log(error)
	// Check if there was an error in the query
	if (error) {
		console.error('Error fetching base models:', error);
		// Optionally, you can handle the error more gracefully, such as returning an error message or status code
		return { error };
	}

	console.log(models);
	// Return the fetched data
	return models;
}

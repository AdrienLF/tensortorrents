import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'

export async function get_model_from_id(model_id) {
	console.log(model_id)

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, 
	  )

	  console.log(supabase)

	console.log(model_id);
	let { data: models, error } = await supabase
		.from('models')
		.select('*, modeltypes(type_id, name),owner(username, avatar_url, created_at)')
		.eq('model_id', model_id);

	let { data: versions, version_error } = await supabase
		.from('versions')
		.select('*, basemodels(base_model_id, name)')
		.eq('model_id', model_id);

	console.log(versions);

	// Check if there was an error in the query
	if (error) {
		console.error('Error fetching base models:', error);
		// Optionally, you can handle the error more gracefully, such as returning an error message or status code
		return { error };
	}

	console.log(models);
	// Return the fetched data
	return {models, versions};
}

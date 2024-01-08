import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createBrowserClient, isBrowser, parse } from '@supabase/ssr'


export async function get_models( page = 1, itemsPerPage = 20) {

	const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, 
		)
		
    let start_pagination = (page - 1) * itemsPerPage;
    let end_pagination = start_pagination + itemsPerPage - 1;
	let { data: models, error } = await supabase.from('models').select('*, modeltypes(type_id, name)').range(start_pagination, end_pagination);

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

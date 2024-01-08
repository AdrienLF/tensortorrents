export async function get_models(supabase, models_per_view=20, start_pagination=0) {
	let { data: models, error } = await supabase.from('models').select('*').range(start_pagination, models_per_view);

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

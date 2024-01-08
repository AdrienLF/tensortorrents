export async function get_base_models(supabase) {
    let { data: basemodels, error } = await supabase
        .from('basemodels')
        .select('*');

    // Check if there was an error in the query
    if (error) {
        console.error('Error fetching base models:', error);
        // Optionally, you can handle the error more gracefully, such as returning an error message or status code
        return { error };
    }

    console.log(basemodels)
    // Return the fetched data
    return basemodels;
}

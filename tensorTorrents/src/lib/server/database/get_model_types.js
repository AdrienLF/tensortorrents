export async function get_model_types(supabase) {
    let { data: modeltypes, error } = await supabase
        .from('modeltypes')
        .select('*');

    // Check if there was an error in the query
    if (error) {
        console.error('Error fetching base models:', error);
        // Optionally, you can handle the error more gracefully, such as returning an error message or status code
        return { error };
    }

    console.log(modeltypes)
    // Return the fetched data
    return modeltypes;
}

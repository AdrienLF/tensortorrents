import { search_models_by_name } from '$lib/server/database/search_models_by_name.js';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
    
    const url = new URL(request.url);
    const query = url.searchParams.get('query');
    console.log(query)
  
    try {
        const models = await search_models_by_name(query)
        
        console.log(models)

        // Using the json utility function from @sveltejs/kit to return a Response object
        return json(models);
    } catch (error) {
        // Using the json utility function to return an error response
        return json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
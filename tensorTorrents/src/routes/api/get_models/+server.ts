
import { get_models } from '$lib/server/database/get_models.js';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
    console.log("call")
    const url = new URL(request.url);
    console.log(url)
    const page = url.searchParams.get('page');
    const itemsPerPage = url.searchParams.get('itemsPerPage')
    console.log(page)
    console.log(itemsPerPage)
  
    try {
        const models= await get_models(page, itemsPerPage)
        
        console.log(models)

        // Using the json utility function from @sveltejs/kit to return a Response object
        return json(models);
    } catch (error) {
        // Using the json utility function to return an error response
        return json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
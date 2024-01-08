import { get_model_from_id } from '$lib/server/database/get_model_from_id.js';
import { json } from '@sveltejs/kit';

export async function GET({ request }) {
    console.log("call")
    const url = new URL(request.url);
    const model_id = url.searchParams.get('model_id');
    console.log(model_id)
  
    try {
        const {models, versions} = await get_model_from_id(model_id)
        console.log("------------------------------------- MODEL VERSIONS ---------------------------")
        console.log(models, versions)

        // Using the json utility function from @sveltejs/kit to return a Response object
        return json({models, versions});
    } catch (error) {
        // Using the json utility function to return an error response
        return json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
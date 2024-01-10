// src/routes/getAlbumImages.ts
import { IMGUR_CLIENT_ID } from '$env/static/private';

import { json } from '@sveltejs/kit';

export async function GET({ request }) {
    const url = new URL(request.url);
    const albumHash = url.searchParams.get('albumHash');

    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID);

    try {
        const response = await fetch(`https://api.imgur.com/3/album/${albumHash}/images`, {
            method: 'GET',
            headers: myHeaders
        });

        const result = await response.json();
        

        // Using the json utility function from @sveltejs/kit to return a Response object
        return json(result.data);
    } catch (error) {
        // Using the json utility function to return an error response
        return json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}

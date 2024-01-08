import { IMGUR_CLIENT_ID, IMGUR_CLIENT_SECRET } from '$env/static/private';
let imgur_album_hash = 'buLJ6';

export async function getImagesFromAlbum(album) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Client-ID " + IMGUR_CLIENT_ID);

  const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
  };

  try {
      const response = await fetch(`https://api.imgur.com/3/album/${album}/images`, requestOptions);
      const result = await response.json();
      return result.data; // Assuming the images are in the 'data' field of the response
  } catch (error) {
      console.log('error', error);
      return []; // Return an empty array in case of an error
  }
}


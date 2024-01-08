

import { IMGUR_CLIENT_ID, IMGUR_CLIENT_SECRET } from '$env/static/private';
let imgur_album_hash = "buLJ6"

var myHeaders = new Headers();
myHeaders.append("Authorization", "Client-ID {{clientId}}");

var formdata = new FormData();

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("https://api.imgur.com/3/album/{{albumHash}}/images", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

const fetch = require('node-fetch')

let auth_key = ""

async function inventory(){
  let response = await fetch('https://bloxyapi.com/api/inventory', {
  headers: {
    'Accept': '*/*',
    'Authorization': auth_key
  }
}); response = await response.json();
  return response;
}


async function create(display_name, game_name, name, uid, value){
  let response = await fetch('https://bloxyapi.com/api/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryA64AyzmBRDrd1wXK',
    'Authorization': auth_key
  },
  body: `------WebKitFormBoundaryA64AyzmBRDrd1wXK\r\nContent-Disposition: form-data; name="items"\r\n\r\n[{"display_name":"${display_name}","game_name":"${game_name}","name":"${name}","thumbnail":"https://tr.rbxcdn.com/7d3bd92a62e34ffaa081519d098da231/420/420/Image/Png","uid":"${uid}","value":${value}}]\r\n------WebKitFormBoundaryA64AyzmBRDrd1wXK\r\nContent-Disposition: form-data; name="side"\r\n\r\n${Math.random() < 0.5 ? "heads" : "tails"}\r\n------WebKitFormBoundaryA64AyzmBRDrd1wXK--\r\n`
}); response = await response.json(); console.log(response);
}


async function main(){
  let inv = await inventory();
  for (let x in inv['inventory']){
    create(inv['inventory'][x]['display_name'], inv['inventory'][x]['game_name'], inv['inventory'][x]['name'], inv['inventory'][x]['uid'], inv['inventory'][x]['value'])
  }
}

main()

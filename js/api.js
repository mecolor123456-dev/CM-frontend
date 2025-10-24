// api.js - helper para llamadas al backend
// Si sirves frontend desde el mismo backend, deja API_URL = '' (rutas relativas)
// Si sirves frontend por separado, usa la URL completa del backend, ej: 'https://mi-backend.onrender.com'
const API_URL = 'https://cm-backend-gsnp.onrender.com'; <-- PON AQUÍ la URL de tu backend si es remoto

export async function obtenerProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  return await res.json();
}

export async function agregarProductoCarrito(producto) {
  // Aquí opcionalmente podrías enviar a backend
}

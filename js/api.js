// api.js - helper para llamadas al backend
// Si sirves frontend desde el mismo backend, deja API_URL = '' (rutas relativas)
// Si sirves frontend por separado, usa la URL completa del backend, ej: 'https://mi-backend.onrender.com'
const API_URL = 'https://cm-backend-gsnp.onrender.com'; <-- PON AQUÍ la URL de tu backend si es remoto

// Obtener todos los productos
async function obtenerProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  return await res.json();
}

// Agregar producto al backend
async function agregarProductoBackend(producto) {
  const res = await fetch(`${API_URL}/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  return await res.json();
}

// Editar producto
async function editarProductoBackend(id, producto) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  return await res.json();
}

// Eliminar producto
async function eliminarProductoBackend(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, { method: "DELETE" });
  return await res.json();
}

// Subir imagen al backend
async function subirImagen(file) {
  const formData = new FormData();
  formData.append("imagen", file);
  const res = await fetch(`${API_URL}/api/productos/upload`, {
    method: "POST",
    body: formData
  });
  return await res.json();
}

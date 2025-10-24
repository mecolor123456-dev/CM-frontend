// api.js - helper para llamadas al backend
// Si sirves frontend desde el mismo backend, deja API_URL = '' (rutas relativas)
// Si sirves frontend por separado, usa la URL completa del backend, ej: 'https://mi-backend.onrender.com'
const API_URL = 'https://cm-backend-gsnp.onrender.com'; <-- PON AQUÍ la URL de tu backend si es remoto

// Obtener todos los productos
async function obtenerProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  const data = await res.json();
  return data;
}

// Agregar producto al backend (solo para admin)
async function agregarProductoBackend(producto) {
  const res = await fetch(`${API_URL}/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  return await res.json();
}

// Eliminar producto del backend
async function eliminarProductoBackend(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "DELETE"
  });
  return await res.json();
}

// Login de usuario
async function loginUsuario(usuario, contrasena) {
  const res = await fetch(`${API_URL}/api/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ usuario, contrasena })
  });
  return await res.json();
}

// Obtener reporte
async function obtenerReporte(tipo = "mensual") {
  const res = await fetch(`${API_URL}/api/reportes/${tipo}`);
  return await res.json();
}

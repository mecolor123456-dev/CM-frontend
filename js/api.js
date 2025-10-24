const API_URL = 'https://cm-backend-gsnp.onrender.com/';

// GET productos
async function obtenerProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  return await res.json();
}

// POST agregar producto
async function agregarProductoBackend(producto) {
  const res = await fetch(`${API_URL}/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  return await res.json();
}

// PUT editar producto
async function editarProductoBackend(id, producto) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
  return await res.json();
}

// DELETE producto
async function eliminarProductoBackend(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, { method: "DELETE" });
  return await res.json();
}

// POST subir imagen
async function subirImagen(file) {
  const formData = new FormData();
  formData.append("imagen", file);
  const res = await fetch(`${API_URL}/api/productos/upload`, {
    method: "POST",
    body: formData
  });
  return await res.json();
}

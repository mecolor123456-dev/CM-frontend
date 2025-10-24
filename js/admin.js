async function cargarProductosAdmin() {
  const productos = await obtenerProductos();
  const contenedor = document.getElementById("productosAdmin");
  contenedor.innerHTML = productos.map(p => `
    <div>
      <strong>${p.nombre}</strong> ($${p.precio}) - ${p.categoria}
      <button onclick='eliminarProducto(${p.id})'>Eliminar</button>
      <button onclick='mostrarEditarProducto(${p.id}, "${p.nombre}", ${p.precio}, "${p.categoria}", "${p.personalizaciones}")'>Editar</button>
    </div>
  `).join("");
}

// Agregar producto desde el admin
async function agregarProductoAdmin() {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value;
  const personalizaciones = document.getElementById("personalizaciones").value.split(",");
  const imagenFile = document.getElementById("imagen").files[0];
  let urlImagen = "";

  if (imagenFile) {
    const res = await subirImagen(imagenFile);
    urlImagen = API_URL + res.url;
  }

  await agregarProductoBackend({ nombre, precio, categoria, personalizaciones, imagen: urlImagen });
  cargarProductosAdmin();
}

// Eliminar producto desde el admin
async function eliminarProducto(id) {
  await eliminarProductoBackend(id);
  cargarProductosAdmin();
}

// Mostrar formulario de edición con los valores actuales
function mostrarEditarProducto(id, nombre, precio, categoria, personalizaciones) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
  document.getElementById("categoria").value = categoria;
  document.getElementById("personalizaciones").value = personalizaciones;
  document.getElementById("formAgregarProducto").onsubmit = async (e) => {
    e.preventDefault();
    await editarProductoAdmin(id);
  };
}

// Editar producto desde el admin
async function editarProductoAdmin(id) {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value;
  const personalizaciones = document.getElementById("personalizaciones").value.split(",");
  const imagenFile = document.getElementById("imagen").files[0];
  let urlImagen = "";

  if (imagenFile) {
    const res = await subirImagen(imagenFile);
    urlImagen = API_URL + res.url;
  }

  await editarProductoBackend(id, { nombre, precio, categoria, personalizaciones, imagen: urlImagen });
  // Limpiar formulario y recargar productos
  document.getElementById("formAgregarProducto").reset();
  cargarProductosAdmin();
}

// Listener para agregar producto nuevo
document.getElementById("formAgregarProducto").addEventListener("submit", async (e) => {
  e.preventDefault();
  await agregarProductoAdmin();
});

// Inicializar admin
window.onload = cargarProductosAdmin;
window.eliminarProducto = eliminarProducto;
window.mostrarEditarProducto = mostrarEditarProducto;

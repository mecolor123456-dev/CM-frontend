async function cargarProductosAdmin() {
  const productos = await obtenerProductos();
  const cont = document.getElementById("productosAdmin");
  cont.innerHTML = productos.map(p => `
    <div>
      <strong>${p.nombre}</strong> ($${p.precio}) - ${p.categoria}
      <button onclick='eliminarProducto(${p.id})'>Eliminar</button>
      <button onclick='mostrarEditarProducto(${p.id}, "${p.nombre}", ${p.precio}, "${p.categoria}", "${p.personalizaciones}")'>Editar</button>
    </div>
  `).join("");
}

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
  document.getElementById("formAgregarProducto").reset();
}

async function eliminarProducto(id) {
  await eliminarProductoBackend(id);
  cargarProductosAdmin();
}

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
  cargarProductosAdmin();
  document.getElementById("formAgregarProducto").reset();
}

document.getElementById("formAgregarProducto").addEventListener("submit", async (e) => {
  e.preventDefault();
  await agregarProductoAdmin();
});

window.onload = cargarProductosAdmin;
window.eliminarProducto = eliminarProducto;
window.mostrarEditarProducto = mostrarEditarProducto;

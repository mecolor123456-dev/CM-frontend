async function cargarProductosAdmin() {
  const productos = await obtenerProductos();
  const contenedor = document.getElementById("productosAdmin");
  contenedor.innerHTML = productos.map(p => `
    <div>
      <strong>${p.nombre}</strong> ($${p.precio}) - ${p.categoria}
      <button onclick='eliminarProducto(${p.id})'>Eliminar</button>
    </div>
  `).join("");
}

async function agregarProductoAdmin() {
  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const categoria = document.getElementById("categoria").value;
  const personalizaciones = document.getElementById("personalizaciones").value.split(',');

  await agregarProductoBackend({ nombre, precio, categoria, personalizaciones });
  cargarProductosAdmin();
}

async function eliminarProducto(id) {
  await eliminarProductoBackend(id);
  cargarProductosAdmin();
}

window.cargarProductosAdmin = cargarProductosAdmin;
window.agregarProductoAdmin = agregarProductoAdmin;
window.eliminarProducto = eliminarProducto;
window.onload = cargarProductosAdmin;

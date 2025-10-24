async function loadProductsList() {
  const products = await obtenerProductos(); // ← función correcta del api.js
  const contenedor = document.getElementById("productosAdmin");
  contenedor.innerHTML = products.map(p => `
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
  const personalizaciones = document.getElementById("personalizaciones").value.split(",");
  const imagenFile = document.getElementById("imagen").files[0];
  let urlImagen = "";

  if(imagenFile){
    const res = await subirImagen(imagenFile);
    urlImagen = API_URL + res.url;
  }

  await agregarProductoBackend({ nombre, precio, categoria, personalizaciones, imagen: urlImagen });
  cargarProductosAdmin();
}

async function eliminarProducto(id){
  await eliminarProductoBackend(id);
  cargarProductosAdmin();
}

document.getElementById("formAgregarProducto").addEventListener("submit", e=>{
  e.preventDefault();
  agregarProductoAdmin();
});

window.cargarProductosAdmin = cargarProductosAdmin;
window.eliminarProducto = eliminarProducto;

window.onload = cargarProductosAdmin;

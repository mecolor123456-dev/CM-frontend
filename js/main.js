let todosProductos = [];

async function init() {
  todosProductos = await obtenerProductos();
  mostrarCategoria("Bebidas");
}

function mostrarCategoria(categoria) {
  const productos = todosProductos.filter(p => p.categoria === categoria);
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = productos.map(p => `
    <div class="producto">
      <h3>${p.nombre}</h3>
      <img src="${p.imagen}" width="100">
      <p>Precio: $${p.precio}</p>
      ${p.personalizaciones ? `<p>Opciones: ${p.personalizaciones.join(', ')}</p>` : ''}
      <button onclick='agregarAlCarrito(${JSON.stringify(p)})'>Agregar</button>
    </div>
  `).join("");
}

window.mostrarCategoria = mostrarCategoria;
window.onload = init;

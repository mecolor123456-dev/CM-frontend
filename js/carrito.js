let carrito = [];

export function agregarAlCarrito(producto) {
  const p = {...producto, cantidad: 1, seleccionadas: producto.personalizaciones || []};
  carrito.push(p);
  actualizarCarrito();
}

function actualizarCarrito() {
  const contenedor = document.getElementById("itemsCarrito");
  contenedor.innerHTML = carrito.map((p,i) => `
    <div>
      <strong>${p.nombre}</strong> ($${p.precio}) 
      <button onclick="quitarDelCarrito(${i})">X</button>
      <p>Personalizaciones: ${p.seleccionadas.join(', ')}</p>
    </div>
  `).join("");

  const total = carrito.reduce((acc,p) => acc + p.precio, 0);
  document.getElementById("total").innerText = total;
}

window.quitarDelCarrito = function(index) {
  carrito.splice(index,1);
  actualizarCarrito();
}

window.vaciarCarrito = function() {
  carrito = [];
  actualizarCarrito();
}

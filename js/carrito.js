let carrito = [];

function agregarAlCarrito(producto) {
  const p = {...producto, cantidad:1, seleccionadas: producto.personalizaciones || []};
  carrito.push(p);
  actualizarCarrito();
}

function actualizarCarrito() {
  const cont = document.getElementById("itemsCarrito");
  cont.innerHTML = carrito.map((p,i)=>`
    <div>
      <strong>${p.nombre}</strong> ($${p.precio})
      <button onclick='quitarDelCarrito(${i})'>X</button>
      <p>Personalizaciones: ${p.seleccionadas.join(', ')}</p>
    </div>
  `).join("");

  const total = carrito.reduce((acc,p)=> acc+p.precio,0);
  document.getElementById("total").innerText = total;
}

function quitarDelCarrito(i){ carrito.splice(i,1); actualizarCarrito(); }
function vaciarCarrito(){ carrito=[]; actualizarCarrito(); }

window.agregarAlCarrito = agregarAlCarrito;
window.quitarDelCarrito = quitarDelCarrito;
window.vaciarCarrito = vaciarCarrito;

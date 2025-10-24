// main.js - lógica de venta y carrito
import { } from './api.js'; // solo para claridad; api functions are global here

let products = [];
let cart = [];

const productosEl = document.getElementById('productos');
const carritoList = document.getElementById('carrito-list');
const totalEl = document.getElementById('total');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalCustoms = document.getElementById('modal-customs');
const modalAdd = document.getElementById('modal-add');
const modalClose = document.getElementById('modal-close');

let currentProduct = null;

async function loadProducts(category='bebidas'){
  try{
    const res = await apiGET(`/api/products?category=${category}`);
    products = res;
    renderProducts();
  }catch(e){ console.error(e); alert('Error cargando productos'); }
}

function renderProducts(){
  productosEl.innerHTML = products.map(p => `
    <div class="product">
      ${p.image_url ? `<img src="${p.image_url}" alt="">` : ''}
      <h3>${escapeHtml(p.name)}</h3>
      <p>$${Number(p.price).toFixed(2)}</p>
      <div class="actions">
        <button class="btn small" onclick="openCustomize(${p.id})">Personalizar</button>
        <button class="btn add" onclick="addToCart(${p.id})">Agregar</button>
      </div>
    </div>
  `).join('');
}

window.openCustomize = async function(id){
  const res = await apiGET(`/api/products/${id}`);
  currentProduct = res;
  modalTitle.innerText = res.name;
  // cargar customizaciones
  const custs = await apiGET(`/api/products/${id}/customizations`);
  if(custs.length === 0){
    modalCustoms.innerHTML = '<p class="muted">No hay personalizaciones predeterminadas</p>';
  } else {
    modalCustoms.innerHTML = custs.map(c => `
      <label style="display:block; margin:6px 0">
        <input type="checkbox" data-delta="${c.price_delta||0}" data-name="${escapeHtml(c.name)}"> ${escapeHtml(c.name)} ${c.price_delta ? `(+${c.price_delta})` : ''}
      </label>
    `).join('');
  }
  modal.classList.remove('hidden');
};

modalClose.onclick = ()=> modal.classList.add('hidden');

modalAdd.onclick = ()=>{
  const checks = Array.from(modalCustoms.querySelectorAll('input[type=checkbox]:checked'));
  const names = checks.map(c => c.dataset.name);
  const delta = checks.reduce((s,c)=>s + Number(c.dataset.delta||0), 0);
  addToCart(currentProduct.id, names.join(', '), delta);
  modal.classList.add('hidden');
};

window.addToCart = function(id, customizationText = '', extra = 0){
  const p = products.find(x=>x.id===id);
  if(!p) return alert('Producto no encontrado');
  const unit = Number(p.price) + Number(extra || 0);
  const item = { product_id:id, product_name:p.name, unit_price:unit, quantity:1, customization_text: customizationText, subtotal: unit };
  cart.push(item);
  renderCart();
};

function renderCart(){
  carritoList.innerHTML = cart.map((c, i)=>`
    <li>
      <div>
        <strong>${escapeHtml(c.product_name)}</strong>
        ${c.customization_text ? `<br><small>${escapeHtml(c.customization_text)}</small>` : ''}
      </div>
      <div>
        <span>$${Number(c.subtotal).toFixed(2)}</span>
        <button class="btn outline" onclick="removeFromCart(${i})">x</button>
      </div>
    </li>
  `).join('');
  const tot = cart.reduce((s,i)=>s + Number(i.subtotal), 0);
  totalEl.innerText = tot.toFixed(2);
}

window.removeFromCart = function(i){
  cart.splice(i,1);
  renderCart();
};

document.getElementById('btn-clear').onclick = ()=>{
  cart = []; renderCart();
};

document.getElementById('btn-finalizar').onclick = async ()=>{
  if(cart.length===0) return alert('Carrito vacío');
  const cliente = document.getElementById('cliente').value || 'Anonimo';
  const payload = { cliente, items: cart };
  const res = await apiPOST('/api/sales', payload);
  if(res.ok){ alert('Venta registrada'); cart = []; renderCart(); } else { alert('Error al registrar venta'); }
};

// tabs
document.querySelectorAll('.tab').forEach(b=>{
  b.addEventListener('click', e=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    e.target.classList.add('active');
    const cat = e.target.dataset.cat;
    loadProducts(cat);
  });
});

// helper
function escapeHtml(s){ if(!s) return ''; return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// init
loadProducts('bebidas');
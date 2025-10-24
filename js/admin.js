// admin.js - crear/editar/eliminar productos y customizaciones
async function loadProductsList(){
  const list = await apiGET('/api/products');
  const container = document.getElementById('products-list');
  container.innerHTML = list.map(p=>`
    <div class="card">
      <div style="display:flex;gap:12px">
        ${p.image_url? `<img src="${p.image_url}" style="width:84px;height:64px;object-fit:cover;border-radius:6px">` : ''}
        <div>
          <strong>${escapeHtml(p.name)}</strong><div class="muted">$${Number(p.price).toFixed(2)}</div>
          <div style="margin-top:6px">
            <button class="btn small" onclick="editProduct(${p.id})">Editar</button>
            <button class="btn small outline" onclick="deleteProduct(${p.id})">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

document.getElementById('productForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const id = document.getElementById('p-id').value;
  const name = document.getElementById('p-name').value;
  const price = document.getElementById('p-price').value;
  const category = document.getElementById('p-category').value;
  const customs = document.getElementById('p-customs').value;
  const file = document.getElementById('p-image').files[0];

  const fd = new FormData();
  fd.append('name', name);
  fd.append('price', price);
  fd.append('category_slug', category);
  if(file) fd.append('image', file);
  fd.append('personalizaciones', customs);

  const url = id ? `/api/products/${id}` : '/api/products';
  const method = id ? 'PUT' : 'POST';
  const res = await apiPUT(url, fd);
  if(res.ok){ alert('Guardado'); document.getElementById('productForm').reset(); loadProductsList(); }
  else{ alert('Error guardando'); }
});

async function editProduct(id){
  const p = await apiGET(`/api/products/${id}`);
  document.getElementById('p-id').value = p.id;
  document.getElementById('p-name').value = p.name;
  document.getElementById('p-price').value = p.price;
  document.getElementById('p-category').value = p.category_slug || p.category;
  document.getElementById('p-customs').value = (p.personalizations || p.personalizaciones || []).join(', ');
  window.scrollTo({top:0,behavior:'smooth'});
}

async function deleteProduct(id){
  if(!confirm('Eliminar producto?')) return;
  await apiDELETE(`/api/products/${id}`);
  loadProductsList();
}

function escapeHtml(s){ if(!s) return ''; return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

document.getElementById('btn-clear-form').onclick = ()=> document.getElementById('productForm').reset();

loadProductsList();
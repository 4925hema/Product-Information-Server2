const productList = document.getElementById('productList');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const overlay = document.querySelector('.modal-overlay');
const productForm = document.getElementById('productForm');

function setModal(open){
  modal.setAttribute('aria-hidden', String(!open));
  if(open) {
    const first = productForm.querySelector('input[name="name"]');
    first.focus();
  }
}

openModalBtn.addEventListener('click', ()=> setModal(true));

// Close on overlay click or elements with data-close attribute
document.addEventListener('click', (e)=>{
  const target = e.target;
  if (target && target.dataset && target.dataset.close) setModal(false);
});

// Close on ESC
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') setModal(false);
});

productForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  clearErrors();

  const form = new FormData(productForm);
  const name = (form.get('name') || '').trim();
  const price = parseFloat(form.get('price'));

  const errors = {};
  if(!name) errors.name = 'Name is required';
  if(Number.isNaN(price) || price < 0) errors.price = 'Price must be a non-negative number';

  if(Object.keys(errors).length){
    showErrors(errors);
    return;
  }

  const payload = { name, price };

  const res = await fetch('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if(res.ok){
    productForm.reset();
    setModal(false);
    loadProducts();
  } else {
    const err = await res.json().catch(()=>({ error: 'Failed to add product' }));
    alert(err.error || 'Failed to add product');
  }
});

function showErrors(errors){
  Object.entries(errors).forEach(([k,v])=>{
    const el = document.querySelector(`.field-error[data-for="${k}"]`);
    if(el) el.textContent = v;
  });
}

function clearErrors(){
  document.querySelectorAll('.field-error').forEach(e=>e.textContent='');
}

async function loadProducts(){
  const res = await fetch('/products');
  const list = await res.json();
  productList.innerHTML = '';
  for(const p of list){
    const li = document.createElement('li');
    li.innerHTML = `<div class="title">${escapeHtml(p.name)}</div><div class="price">$${Number(p.price).toFixed(2)}</div>`;
    productList.appendChild(li);
  }
}

function escapeHtml(s){
  return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

loadProducts();

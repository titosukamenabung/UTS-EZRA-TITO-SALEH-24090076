// script.js — versi terbaru dengan 3 produk baru

// --- Data summary ---
const summary = {
  totalProducts: 3,
  totalSales: 40,
  totalRevenue: 480000
};

// --- Data Produk Baru ---
let products = [
  { id: 1, name: "Ayam Geprek", price: 11000, stock: 40 },
  { id: 2, name: "Nasi Lengko + Telor", price: 10000, stock: 40 },
  { id: 3, name: "Nasi goreng Mawud", price: 13000, stock: 25 }
];

// Utility: format rupiah
function formatRupiah(n){
  return 'Rp ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// ---- Login page ----
const loginForm = document.getElementById('loginForm');
if(loginForm){
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if(!email || !password){
      alert('Email dan password tidak boleh kosong');
      return;
    }

    localStorage.setItem('uts_user', email);
    alert('Login berhasil');
    window.location.href = 'dashboard.html';
  });
}

// ---- Dashboard ----
const totalProductsEl = document.getElementById('totalProducts');
const totalSalesEl = document.getElementById('totalSales');
const totalRevenueEl = document.getElementById('totalRevenue');
const toProductsBtn = document.getElementById('toProducts');
const logout = document.getElementById('logout');

if(totalProductsEl) totalProductsEl.textContent = summary.totalProducts;
if(totalSalesEl) totalSalesEl.textContent = summary.totalSales;
if(totalRevenueEl) totalRevenueEl.textContent = formatRupiah(summary.totalRevenue);

if(toProductsBtn){
  toProductsBtn.addEventListener('click', ()=>{
    window.location.href = 'products.html';
  });
}

if(logout){
  logout.addEventListener('click', ()=>{
    localStorage.removeItem('uts_user');
    window.location.href = 'index.html';
  });
}

// ---- Products Page ----
const productsTable = document.getElementById('productsTable');
if(productsTable){
  const tbody = productsTable.querySelector('tbody');

  function renderProducts(){
    tbody.innerHTML = '';

    products.forEach((p, idx) =>{
      const tr = document.createElement('tr');
      tr.dataset.id = p.id;
      tr.innerHTML = `
        <td>${idx+1}</td>
        <td>${p.name}</td>
        <td>${formatRupiah(p.price)}</td>
        <td>${p.stock}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;

      // Edit
      tr.querySelector('.edit-btn').addEventListener('click', ()=>{
        alert(`Edit produk: ${p.name}`);
      });

      // Delete
      tr.querySelector('.delete-btn').addEventListener('click', ()=>{
        if(confirm('Yakin hapus produk ini?')){
          products = products.filter(item => item.id !== p.id);
          renderProducts();
        }
      });

      tbody.appendChild(tr);
    });
  }

  renderProducts();

  const logout2 = document.getElementById('logout2');
  if(logout2){
    logout2.addEventListener('click', ()=>{
      localStorage.removeItem('uts_user');
      window.location.href = 'index.html';
    });
  }
}
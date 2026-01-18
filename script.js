// --- 1. DATA DUMMY (Database Sementara) ---
const campaignsData = [
    {
        id: 1,
        title: "Jadilah pendukung pendidikan iklim untuk generasi masa depan",
        image: "assets/CardPict/Lingkungan.png",
        category: "Lingkungan",
        collected: 160000,
        target: 20000000,
        organizer: "UI Biology Festival",
        verified: true
    },
    {
        id: 2,
        title: "Gerakan Makan Gratis di Masjid Jumat Berkah",
        image: "assets/CardPict/Sosial.png",
        category: "Sosial",
        collected: 9800000,
        target: 108000000,
        organizer: "Sedekah Global",
        verified: true
    },
    {
        id: 3,
        title: "Bantu Abah Hendra Sembuh dari Stroke Berkepanjangan",
        image: "assets/CardPict/Kesehatan.png",
        category: "Kesehatan",
        collected: 11825000,
        target: 30000000,
        organizer: "Keluarga Abah",
        verified: false
    },
    {
        id: 4,
        title: "Vege & Feli Bergerak Untuk Pendidikan Sumatra",
        image: "assets/CardPict/Pendidikan.png",
        category: "Pendidikan",
        collected: 6220019,
        target: 8000000,
        organizer: "Vege Team",
        verified: true
    },
    {
        id: 5,
        title: "Bangun Jembatan Desa Pelosok yang Putus",
        image: "assets/CardPict/Sosial2.png",
        category: "Sosial",
        collected: 45000000,
        target: 50000000,
        organizer: "Kawan Desa",
        verified: true
    },
    {
        id: 6,
        title: "Beasiswa Anak Yatim Berprestasi",
        image: "assets/CardPict/Pendidikan2.jpg",
        category: "Pendidikan",
        collected: 2500000,
        target: 15000000,
        organizer: "Yayasan Harapan",
        verified: true
    }
];

// --- [BARU] DATA USER (DATABASE AKUN) ---
const usersData = [
    {
        id: 1,
        name: "Admin Super",
        email: "admin@ruangpeduli.com",
        password: "admin123", // Password dummy
        role: "admin"         // KUNCI UTAMA: Role Admin
    },
    {
        id: 2,
        name: "Budi Santoso",
        email: "user@gmail.com",
        password: "user123",
        role: "user"          // Role User biasa
    }
];

// --- 2. HELPER: FORMAT RUPIAH ---
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number).replace('IDR', 'Rp');
};

// --- 3. FUNGSI RENDER GENERIC (Pembuat Kartu HTML) ---
function createCardHTML(item) {
    let percentage = (item.collected / item.target) * 100;
    if (percentage > 100) percentage = 100;
    
    // Gunakan placeholder jika gambar error/tidak ada
    const imgSrc = item.image; 

    return `
        <div onclick="window.location.href='#detail/${item.id}'" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer transform hover:-translate-y-1">
            
            <!-- Gambar Card -->
            <div class="relative h-48 w-full overflow-hidden bg-gray-200">
                <img src="${imgSrc}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x200?text=No+Image'" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-700 shadow-sm border border-gray-100">
                    ${item.category}
                </div>
            </div>

            <!-- Konten Card -->
            <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-bold text-lg text-gray-900 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-600 transition">
                    ${item.title}
                </h3>

                <!-- Progress Bar -->
                <div class="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div class="bg-brand-500 h-2.5 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
                </div>

                <!-- Info Donasi -->
                <div class="flex justify-between items-center text-xs text-gray-500 mb-4">
                    <div>
                        <span class="text-brand-600 font-bold text-sm block">${formatRupiah(item.collected)}</span>
                        <span>terkumpul</span>
                    </div>
                    <div class="text-right">
                        <span class="font-bold text-gray-700 block">${Math.round(percentage)}%</span>
                        <span class="text-gray-400">tercapai</span>
                    </div>
                </div>

                <!-- Organizer Info -->
                <div class="mt-auto flex items-center pt-4 border-t border-gray-50">
                    <div class="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 mr-3 flex items-center justify-center text-brand-500">
                        <i class="fas fa-user text-xs"></i>
                    </div>
                    <div class="flex items-center text-sm font-medium text-gray-600 truncate">
                        <span class="truncate mr-1 max-w-[120px]">${item.organizer}</span>
                        ${item.verified ? '<i class="fas fa-check-circle text-blue-500 text-xs" title="Terverifikasi"></i>' : ''}
                    </div>
                </div>
            </div>

            <!-- Tombol Donasi -->
            <div class="p-4 pt-0">
                <button class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg transition duration-200 shadow-sm shadow-brand-200">
                    Donasi
                </button>
            </div>
        </div>
    `;
}

// --- 4. RENDER BERANDA (HOME) ---
function renderHomeCampaigns() {
    const container = document.getElementById('home-campaign-list');
    if(!container) return;

    const trendingData = campaignsData.slice(0, 3); // Ambil 3 data pertama
    
    let html = '';
    trendingData.forEach(item => {
        html += createCardHTML(item);
    });
    container.innerHTML = html;
}

// --- 5. RENDER HALAMAN GALANG DANA (EXPLORE) ---
let currentCategory = 'Semua';
let currentSearch = '';

function renderExploreCampaigns() {
    const container = document.getElementById('all-campaign-list');
    if(!container) return;

    // Filter Logic
    const filtered = campaignsData.filter(item => {
        const matchCategory = currentCategory === 'Semua' || item.category === currentCategory;
        const matchSearch = item.title.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    // Empty State
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                <i class="fas fa-search text-4xl text-gray-300 mb-4"></i>
                <h3 class="text-lg font-bold text-gray-600">Yah, tidak ada hasil.</h3>
                <p class="text-gray-400">Coba ganti kata kunci atau kategori lain.</p>
                <button onclick="resetFilter()" class="mt-4 text-brand-600 font-bold hover:underline">Reset Filter</button>
            </div>
        `;
        return;
    }

    // Generate HTML
    let html = '';
    filtered.forEach(item => {
        html += createCardHTML(item);
    });
    container.innerHTML = html;
}

// --- 6. HANDLE FILTER & BUTTONS ---
function filterCampaigns(category) {
    currentCategory = category;
    
    // Update Tampilan Tombol
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.dataset.category === category) {
            btn.className = "filter-btn active px-5 py-2 rounded-full text-sm font-bold border transition whitespace-nowrap bg-brand-600 text-white border-brand-600 shadow-md";
        } else {
            btn.className = "filter-btn px-5 py-2 rounded-full text-sm font-bold border border-gray-300 text-gray-600 bg-white hover:border-brand-500 hover:text-brand-600 transition whitespace-nowrap";
        }
    });

    renderExploreCampaigns();
}

function resetFilter() {
    const searchInput = document.getElementById('explore-search');
    if(searchInput) searchInput.value = '';
    currentSearch = '';
    filterCampaigns('Semua');
}

// Listener Search di halaman Explore
const exploreSearchInput = document.getElementById('explore-search');
if(exploreSearchInput) {
    exploreSearchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        renderExploreCampaigns();
    });
}

// --- 7. SPA ROUTING (Standard) ---
function handleRouting() {
    const hash = window.location.hash || '#home';
    
    // Bersihkan tampilan section
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
    });
    
    // Tentukan target
    let targetId = hash.replace('#', '');
    if(targetId.includes('/')) targetId = targetId.split('/')[0];
    
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
        targetSection.classList.remove('hidden-section');
        setTimeout(() => targetSection.classList.add('active-section'), 10);
    } else {
        // Default ke Home jika hash tidak dikenali
        document.getElementById('home').classList.remove('hidden-section');
        document.getElementById('home').classList.add('active-section');
    }

    // Update Navbar Active State
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if(href === hash) {
            link.classList.add('text-brand-600');
        } else {
            link.classList.remove('text-brand-600');
        }
    });

    window.scrollTo(0, 0);
}

// --- [BARU] 8. SISTEM LOGIN & OTENTIKASI ---

// Fungsi Login
function handleLogin(event) {
    event.preventDefault(); // Mencegah reload halaman
    
    const emailInput = document.getElementById('login-email').value;
    const passInput = document.getElementById('login-password').value;
    const errorMsg = document.getElementById('login-error');

    // Cari user yang cocok
    const foundUser = usersData.find(u => u.email === emailInput && u.password === passInput);

    if (foundUser) {
        // Simpan data user ke Local Storage
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        
        // Reset form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';
        errorMsg.classList.add('hidden');

        // Redirect ke halaman Donasi (agar langsung lihat fitur admin)
        window.location.hash = '#create';
        
        // Update UI segera
        checkLoginStatus(); 
    } else {
        // Tampilkan Error
        errorMsg.classList.remove('hidden');
    }
}

// Fungsi Logout
function handleLogout() {
    if(confirm("Yakin ingin keluar?")) {
        localStorage.removeItem('currentUser');
        window.location.hash = '#home';
        checkLoginStatus();
    }
}

// Fungsi Cek Status Login & Update UI
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navContainer = document.getElementById('nav-auth-container');
    const adminContainer = document.getElementById('admin-actions-container');

    // 1. Update Navbar (Masuk vs Keluar)
    if (currentUser) {
        navContainer.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="text-sm font-semibold text-gray-700 hidden md:block">Halo, ${currentUser.name}</span>
                <button onclick="handleLogout()" class="inline-flex items-center justify-center px-5 py-2 border border-red-500 text-red-500 font-bold text-sm rounded-full hover:bg-red-50 transition duration-300 shadow-sm">
                    Keluar
                </button>
            </div>
        `;
    } else {
        navContainer.innerHTML = `
            <a href="#login" class="inline-flex items-center justify-center px-6 py-2.5 border border-brand-600 text-brand-600 font-bold text-sm rounded-full hover:bg-brand-600 hover:text-white transition duration-300 shadow-sm">
                Masuk
            </a>
        `;
    }

    // 2. Fitur Khusus Admin (Tombol Buat Kampanye)
    // Cek: Apakah user login? DAN apakah role-nya admin?
    if (currentUser && currentUser.role === 'admin') {
        if(adminContainer) {
            adminContainer.innerHTML = `
                <div class="bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between shadow-lg transform transition hover:scale-[1.01]">
                    <div class="mb-4 md:mb-0">
                        <h3 class="font-bold text-xl flex items-center gap-2">
                            Mode Admin Aktif
                        </h3>
                        <p class="text-brand-50 text-sm opacity-90">Anda memiliki akses untuk membuat penggalangan dana baru.</p>
                    </div>
                    <button onclick="alert('Fitur Form Buat Kampanye akan muncul di sini!')" class="bg-white text-brand-600 font-bold py-3 px-6 rounded-lg shadow hover:bg-gray-50 transition flex items-center gap-2">
                        <i class="fas fa-plus-circle"></i> Buat Kampanye Baru
                    </button>
                </div>
            `;
        }
    } else {
        // Jika bukan admin atau belum login, kosongkan container
        if(adminContainer) adminContainer.innerHTML = '';
    }
}


// --- 9. INITIALIZATION ---
window.addEventListener('load', () => {
    handleRouting();
    renderHomeCampaigns();
    renderExploreCampaigns();
    checkLoginStatus(); // Cek login saat pertama kali load
});

window.addEventListener('hashchange', handleRouting);
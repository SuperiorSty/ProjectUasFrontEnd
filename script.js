// --- 1. DATA DUMMY (Database Sementara) ---
let campaignsData = [
  {
    id: 1,
    title: "Gerakan 1000 Pohon untuk Paru-Paru Dunia",
    image: "assets/CardPict/jaga alam.png",
    category: "Lingkungan",
    collected: 25000000,
    target: 25000000,
    organizer: "Green Earth",
    verified: true,
    isActive: true,
    description: "Hutan kita semakin gundul. Mari ambil peran nyata dengan berdonasi untuk penanaman kembali pohon di lahan kritis.",
  },
  {
    id: 2,
    title: "Solidaritas Kemanusiaan: Hangatkan Palestina",
    image: "assets/CardPict/Palestiina.png",
    category: "Kemanusiaan",
    collected: 500000000, 
    target: 500000000,
    organizer: "Peduli Sesama",
    verified: true,
    isActive: false,
    description: "Musim dingin tiba, saudara kita di Palestina membutuhkan selimut, makanan, dan obat-obatan.",
  },
  {
    id: 3,
    title: "Darurat! Bantu Dek Jarif Berjuang Melawan Kanker",
    image: "assets/CardPict/Jarif kanker.png",
    category: "Kesehatan",
    collected: 79000000,
    target: 80000000,
    organizer: "Kitabisa",
    verified: true,
    isActive: true, 
    description: "Di usianya yang masih kecil, Jarif harus menahan sakit akibat kanker ganas. Uluran tanganmu adalah harapan baginya.",
  },
  {
    id: 4,
    title: "Bantu Renovasi Sekolah Pelosok yang Hampir Roboh",
    image: "assets/CardPict/Bangun Sekolah.png",
    category: "Pendidikan",
    collected: 45000000,
    target: 150000000,
    organizer: "Sekolah Kita",
    verified: true,
    isActive: true,
    description: "Ratusan siswa terpaksa belajar dengan atap bocor. Mari patungan bangun kembali sekolah mereka.",
  },
  {
    id: 5,
    title: "Sedekah Air Bersih untuk Warga Aceh Kekeringan",
    image: "assets/CardPict/Air Bersih Untuk Warga Aceh.png",
    category: "Sosial",
    collected: 12500000,
    target: 50000000,
    organizer: "Aksi Cepat Tanggap",
    verified: true,
    isActive: true,
    description: "Krisis air bersih melanda warga Aceh. Donasimu digunakan untuk membangun sumur bor dan sanitasi.",
  },
  {
    id: 6,
    title: "Beasiswa Yatim Dhuafa: Jangan Biarkan Putus Sekolah",
    image: "assets/CardPict/Pendidikan.png",
    category: "Pendidikan",
    collected: 30000000,
    target: 60000000,
    organizer: "Yayasan Harapan",
    verified: true,
    isActive: true,
    description: "Bantuan biaya pendidikan untuk anak-anak yatim dan dhuafa yang berprestasi namun terkendala biaya.",
  },
];

// --- [BARU] DUMMY RIWAYAT DONASI & AKTIVITAS ---
// Ini simulasi data database transaksi
const donationsHistory = [
    { id: 101, userId: 2, campaignId: 1, amount: 50000, date: '2023-10-25', status: 'Berhasil' },
    { id: 102, userId: 2, campaignId: 4, amount: 100000, date: '2023-11-02', status: 'Berhasil' },
    { id: 103, userId: 1, campaignId: 2, amount: 1000000, date: '2023-10-15', status: 'Berhasil' }, // Admin donasi juga
    { id: 104, userId: 2, campaignId: 3, amount: 25000, date: '2023-11-10', status: 'Pending' },
];


// --- DATA USER ---
const usersData = [
  {
    id: 1,
    name: "Admin Super",
    email: "admin@ruangpeduli.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Budi Santoso",
    email: "user@gmail.com",
    password: "user123",
    role: "user",
  },
];

// --- HELPER: FORMAT RUPIAH ---
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace("IDR", "Rp");
};

// --- FUNGSI RENDER GENERIC (Pembuat Kartu HTML) ---
function createCardHTML(item) {
  let percentage = (item.collected / item.target) * 100;
  if (percentage > 100) percentage = 100;

  let barColorClass = "bg-brand-500"; 
  if (item.hasOwnProperty('isActive') && !item.isActive) {
      barColorClass = "bg-gray-500";
  } else if (percentage >= 100) {
      barColorClass = "bg-red-500";
  }

  let badgeText = "Dibuka";
  let badgeClass = "bg-brand-600"; 

  if (item.hasOwnProperty('isActive') && !item.isActive) {
      badgeText = "Ditutup";
      badgeClass = "bg-gray-600"; 
  } else if (percentage >= 100) {
      badgeText = "Tercapai";
      badgeClass = "bg-red-600"; 
  }

  const imgSrc = item.image;

  return `
        <div onclick="window.location.href='#detail/${item.id}'" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer transform hover:-translate-y-1">
            
            <div class="relative h-48 w-full overflow-hidden bg-gray-200">
                <img src="${imgSrc}" alt="${item.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://placehold.co/400x200?text=Gagal+Memuat+Gambar'" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                
                <div class="absolute top-3 left-3 ${badgeClass} text-white px-2 py-1 rounded text-xs font-bold shadow-md z-10 border border-white/20">
                    ${badgeText}
                </div>

                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-700 shadow-sm border border-gray-100 z-10">
                    ${item.category}
                </div>
            </div>

            <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-bold text-lg text-gray-900 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-600 transition">
                    ${item.title}
                </h3>

                <div class="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div class="${barColorClass} h-2.5 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
                </div>

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

                <div class="mt-auto flex items-center pt-4 border-t border-gray-50">
                    <div class="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 mr-3 flex items-center justify-center text-brand-500">
                        <i class="fas fa-user text-xs"></i>
                    </div>
                    <div class="flex items-center text-sm font-medium text-gray-600 truncate">
                        <span class="truncate mr-1 max-w-[120px]">${item.organizer}</span>
                        ${item.verified ? '<i class="fas fa-check-circle text-blue-500 text-xs" title="Terverifikasi"></i>' : ""}
                    </div>
                </div>
            </div>

            <div class="p-4 pt-0">
                <button onclick="window.location.href='#detail/${item.id}'; event.stopPropagation();" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg transition duration-200 shadow-sm shadow-brand-200">
                    Donasi Sekarang
                </button>
            </div>
        </div>
    `;
}

// --- RENDER BERANDA (HOME) ---
function renderHomeCampaigns() {
  const container = document.getElementById("home-campaign-list");
  if (!container) return;

  const sortedData = [...campaignsData].reverse().slice(0, 3);

  let html = "";
  sortedData.forEach((item) => {
    html += createCardHTML(item);
  });
  container.innerHTML = html;
}

// --- RENDER HALAMAN GALANG DANA (EXPLORE) ---
let currentCategory = "Semua";
let currentSearch = "";

function renderExploreCampaigns() {
  const container = document.getElementById("all-campaign-list");
  if (!container) return;

  const reversedData = [...campaignsData].reverse();
  const filtered = reversedData.filter((item) => {
    const matchCategory =
      currentCategory === "Semua" || item.category === currentCategory;
    const matchSearch = item.title
      .toLowerCase()
      .includes(currentSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

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

  let html = "";
  filtered.forEach((item) => {
    html += createCardHTML(item);
  });
  container.innerHTML = html;
}

// --- [BARU] RENDER DASHBOARD (LOGIC UTAMA) ---
function renderDashboard() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    // 1. Set Header Info
    document.getElementById("dashboard-username").innerText = user.name;
    document.getElementById("dashboard-role-label").innerText = user.role === 'admin' ? "Administrator" : "Donatur";

    // 2. Logic Tombol Aksi (Khusus Admin vs User)
    const actionContainer = document.getElementById("dashboard-action-buttons");
    if (user.role === 'admin') {
        actionContainer.innerHTML = `
            <div class="flex gap-3">
                <button onclick="alert('Fitur Kelola Relawan (Segera Hadir)')" class="bg-white border border-gray-300 text-gray-700 font-bold py-2.5 px-4 rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2">
                    <i class="fas fa-users"></i> Relawan
                </button>
                <button onclick="window.location.hash='#create-form'" class="bg-brand-600 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-brand-700 transition shadow-lg flex items-center gap-2">
                    <i class="fas fa-plus"></i> Buat Kampanye
                </button>
            </div>
        `;
        
        // ADMIN STATS (Global)
        // Hitung total semua donasi di platform (mockup logic)
        // Disini kita hitung dari campaignsData saja untuk simpelnya
        const totalPlatformDonations = campaignsData.reduce((acc, curr) => acc + curr.collected, 0);
        const totalCampaigns = campaignsData.length;

        document.getElementById("stat-label-1").innerText = "Total Donasi Masuk";
        document.getElementById("stat-value-1").innerText = formatRupiah(totalPlatformDonations);
        
        document.getElementById("stat-label-2").innerText = "Total Kampanye Aktif";
        document.getElementById("stat-value-2").innerText = totalCampaigns;

    } else {
        // USER STATS (Pribadi)
        actionContainer.innerHTML = `
            <button onclick="window.location.href='#create'" class="bg-brand-600 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-brand-700 transition shadow-lg flex items-center gap-2">
                <i class="fas fa-heart"></i> Mulai Donasi
            </button>
        `;

        // Filter donasi milik user ini
        const myHistory = donationsHistory.filter(d => d.userId === user.id);
        const myTotalDonations = myHistory.reduce((acc, curr) => acc + curr.amount, 0);
        const myCampaignCount = new Set(myHistory.map(d => d.campaignId)).size; // Unique campaigns

        document.getElementById("stat-label-1").innerText = "Total Donasi Saya";
        document.getElementById("stat-value-1").innerText = formatRupiah(myTotalDonations);

        document.getElementById("stat-label-2").innerText = "Kampanye Didukung";
        document.getElementById("stat-value-2").innerText = myCampaignCount;
    }

    // 3. Render Tabel Riwayat (History)
    const historyBody = document.getElementById("dashboard-history-body");
    let historyData = [];

    if (user.role === 'admin') {
        // Admin lihat semua transaksi (mockup: ambil 5 terakhir dari dummy)
        historyData = donationsHistory; 
    } else {
        // User lihat punya sendiri
        historyData = donationsHistory.filter(d => d.userId === user.id);
    }

    // Sort by Date Descending
    historyData.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (historyData.length === 0) {
        historyBody.innerHTML = `<tr><td class="px-6 py-8 text-center text-gray-400" colspan="4"><i class="fas fa-inbox text-2xl mb-2 block"></i>Belum ada riwayat aktivitas.</td></tr>`;
    } else {
        let html = "";
        historyData.forEach(trx => {
            // Cari nama campaign
            const campaign = campaignsData.find(c => c.id === trx.campaignId);
            const campaignTitle = campaign ? campaign.title : "Kampanye Tidak Dikenal";
            
            // Status Color
            let statusColor = "text-green-600 bg-green-50";
            if (trx.status === 'Pending') statusColor = "text-yellow-600 bg-yellow-50";

            html += `
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 whitespace-nowrap text-gray-500">${trx.date}</td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-bold text-gray-900 line-clamp-1">${campaignTitle}</div>
                        <div class="text-xs text-gray-400">ID: #${trx.id}</div>
                    </td>
                    <td class="px-6 py-4">
                        <span class="px-3 py-1 rounded-full text-xs font-bold ${statusColor}">${trx.status}</span>
                    </td>
                    <td class="px-6 py-4 text-right font-bold text-gray-700">
                        ${formatRupiah(trx.amount)}
                    </td>
                </tr>
            `;
        });
        historyBody.innerHTML = html;
    }
}


// --- RENDER DETAIL PAGE ---
function renderDetailPage(id) {
  const container = document.getElementById("detail-content");
  if (!container) return;

  const item = campaignsData.find((c) => c.id == id);

  if (!item) {
    container.innerHTML = `
            <div class="text-center py-20">
                <h2 class="text-2xl font-bold text-gray-700">Kampanye tidak ditemukan</h2>
                <a href="#explore" class="text-brand-600 hover:underline">Kembali ke galang dana</a>
            </div>
        `;
    return;
  }

  let percentage = (item.collected / item.target) * 100;
  if (percentage > 100) percentage = 100;

  // LOGIKA WARNA BAR & BADGE DI DETAIL PAGE
  let barColorClass = "bg-brand-500"; 
  let badgeText = "Dibuka";
  let badgeClass = "bg-brand-600";

  if (item.hasOwnProperty('isActive') && !item.isActive) {
      barColorClass = "bg-gray-500";
      badgeText = "Ditutup";
      badgeClass = "bg-gray-600";
  } else if (percentage >= 100) {
      barColorClass = "bg-red-500";
      badgeText = "Tercapai";
      badgeClass = "bg-red-600";
  }

  container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div class="md:flex">
                <div class="md:w-1/2 h-64 md:h-auto relative bg-gray-200">
                     <img src="${item.image}" alt="${item.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Gagal+Memuat+Gambar'" class="w-full h-full object-cover">
                     
                     <div class="absolute top-4 right-4 ${badgeClass} text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md z-10">
                        ${badgeText}
                     </div>

                     <div class="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold text-brand-700">
                        ${item.category}
                     </div>
                </div>

                <div class="md:w-1/2 p-6 md:p-10 flex flex-col">
                    <div class="flex items-center gap-2 mb-4">
                         <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                            <i class="fas fa-user-check text-xs"></i>
                        </div>
                        <span class="text-sm font-semibold text-gray-600">${item.organizer}</span>
                        ${item.verified ? '<i class="fas fa-check-circle text-blue-500 text-xs" title="Terverifikasi"></i>' : ""}
                    </div>

                    <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">${item.title}</h1>
                    
                    <p class="text-gray-600 mb-6 leading-relaxed">
                        ${item.description || "Belum ada deskripsi lengkap untuk kampanye ini."}
                    </p>

                    <div class="mt-auto bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <div class="flex justify-between items-end mb-2">
                            <div>
                                <p class="text-sm text-gray-500 mb-1">Terkumpul</p>
                                <p class="text-2xl font-bold text-brand-600">${formatRupiah(item.collected)}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-sm text-gray-500 mb-1">Target</p>
                                <p class="text-lg font-semibold text-gray-700">${formatRupiah(item.target)}</p>
                            </div>
                        </div>

                        <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div class="${barColorClass} h-3 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
                        </div>
                        <p class="text-right text-xs text-gray-500 mb-6">${Math.round(percentage)}% tercapai</p>

                        <button onclick="alert('Lanjut ke Payment Gateway...')" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-200 transition transform hover:-translate-y-1">
                            Donasi Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- HANDLE FILTER & BUTTONS ---
function filterCampaigns(category) {
  currentCategory = category;

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    if (btn.dataset.category === category) {
      btn.className =
        "filter-btn active px-5 py-2 rounded-full text-sm font-bold border transition whitespace-nowrap bg-brand-600 text-white border-brand-600 shadow-md";
    } else {
      btn.className =
        "filter-btn px-5 py-2 rounded-full text-sm font-bold border border-gray-300 text-gray-600 bg-white hover:border-brand-500 hover:text-brand-600 transition whitespace-nowrap";
    }
  });

  renderExploreCampaigns();
}

function resetFilter() {
  const searchInput = document.getElementById("explore-search");
  if (searchInput) searchInput.value = "";
  currentSearch = "";
  filterCampaigns("Semua");
}

const exploreSearchInput = document.getElementById("explore-search");
if (exploreSearchInput) {
  exploreSearchInput.addEventListener("input", (e) => {
    currentSearch = e.target.value;
    renderExploreCampaigns();
  });
}

// --- FUNGSI PREVIEW GAMBAR ---
function updateImagePreview() {
  const url = document.getElementById("new-image").value.trim();
  const preview = document.getElementById("image-preview");

  if (!preview) return; 

  preview.referrerPolicy = "no-referrer";

  if (url && url.length > 0) {
    preview.src = url;
    preview.classList.remove("opacity-50");
  } else {
    preview.src = "https://placehold.co/600x400?text=Pratinjau+Gambar";
    preview.classList.add("opacity-50");
  }
}

// --- LOGIKA FORM GALANG DANA ---
function handleCreateCampaign(event) {
  event.preventDefault();

  const title = document.getElementById("new-title").value.trim();
  const category = document.getElementById("new-category").value;
  const target = parseInt(document.getElementById("new-target").value);
  const organizer = document.getElementById("new-organizer").value.trim();
  const imageInput = document.getElementById("new-image").value.trim();
  const description = document.getElementById("new-description").value.trim();

  const image =
    imageInput && imageInput.length > 0
      ? imageInput
      : "https://placehold.co/600x400?text=Gambar+Kampanye";

  const newId =
    campaignsData.length > 0
      ? Math.max(...campaignsData.map((c) => c.id)) + 1
      : 1;

  const newCampaign = {
    id: newId,
    title: title,
    image: image,
    category: category,
    collected: 0,
    target: target,
    organizer: organizer,
    verified: true,
    isActive: true, // Default Aktif
    description: description,
  };

  campaignsData.push(newCampaign);
  event.target.reset();
  
  // Setelah create, kembali ke dashboard
  window.location.hash = "#dashboard";
  renderExploreCampaigns();
  renderHomeCampaigns();
  alert("Kampanye berhasil dibuat! Silakan cek di Explore.");
}

// --- SPA ROUTING (Diperbarui untuk Dashboard) ---
function handleRouting() {
  const hash = window.location.hash || "#home";

  document.querySelectorAll("section").forEach((section) => {
    section.classList.remove("active-section");
    section.classList.add("hidden-section");
  });

  let targetSectionId = hash.replace("#", "");
  let campaignId = null;

  if (targetSectionId.includes("/")) {
    const parts = targetSectionId.split("/");
    targetSectionId = parts[0];
    campaignId = parts[1];
  }

  const targetSection = document.getElementById(targetSectionId);

  if (targetSection) {
    // GUARD: Cek Akses Dashboard / Create Form
    if (targetSectionId === "dashboard" || targetSectionId === "create-form") {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        
        // 1. Harus Login
        if (!user) {
            alert("Silakan masuk terlebih dahulu untuk mengakses Dashboard.");
            window.location.hash = "#login";
            return;
        }

        // 2. Khusus Create Form: Harus Admin
        if (targetSectionId === "create-form" && user.role !== "admin") {
             alert("Akses ditolak! Hanya admin yang boleh membuat kampanye.");
             window.location.hash = "#dashboard";
             return;
        }

        // 3. Render Dashboard jika akses diizinkan
        if (targetSectionId === "dashboard") {
            renderDashboard();
        }
    }

    targetSection.classList.remove("hidden-section");

    if (targetSectionId === "detail" && campaignId) {
      renderDetailPage(campaignId);
      window.scrollTo(0, 0);
    }

    setTimeout(() => targetSection.classList.add("active-section"), 10);
  } else {
    document.getElementById("home").classList.remove("hidden-section");
    document.getElementById("home").classList.add("active-section");
  }

  // Update Navbar Active Link
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === hash) {
      link.classList.add("text-brand-600");
    } else {
      link.classList.remove("text-brand-600");
    }
  });

  if (!campaignId) window.scrollTo(0, 0);
}

// --- SISTEM LOGIN & OTENTIKASI ---
function handleLogin(event) {
  event.preventDefault();

  const emailInput = document.getElementById("login-email").value;
  const passInput = document.getElementById("login-password").value;
  const errorMsg = document.getElementById("login-error");

  const foundUser = usersData.find(
    (u) => u.email === emailInput && u.password === passInput,
  );

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    document.getElementById("login-email").value = "";
    document.getElementById("login-password").value = "";
    errorMsg.classList.add("hidden");

    // Redirect ke dashboard untuk semua user yang login
    window.location.hash = "#dashboard";

    checkLoginStatus();
  } else {
    errorMsg.classList.remove("hidden");
  }
}

function handleLogout() {
  if (confirm("Yakin ingin keluar?")) {
    localStorage.removeItem("currentUser");
    window.location.hash = "#home";
    checkLoginStatus();
  }
}

function checkLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navContainer = document.getElementById("nav-auth-container");

  // Kita hapus logika "admin-actions-container" dari sini karena tombolnya sudah pindah ke Dashboard
  
  if (currentUser) {
    navContainer.innerHTML = `
            <div class="flex items-center gap-3">
                <a href="#dashboard" class="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-brand-600 transition">
                    <div class="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                        <i class="fas fa-user"></i>
                    </div>
                    <span>${currentUser.name}</span>
                </a>
                <button onclick="handleLogout()" class="inline-flex items-center justify-center px-4 py-2 border border-red-200 text-red-500 font-bold text-sm rounded-full hover:bg-red-50 transition duration-300 shadow-sm">
                    <i class="fas fa-sign-out-alt md:hidden"></i>
                    <span class="hidden md:inline">Keluar</span>
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
}

window.addEventListener("load", () => {
  handleRouting();
  renderHomeCampaigns();
  renderExploreCampaigns();
  checkLoginStatus();
});

window.addEventListener("hashchange", handleRouting);
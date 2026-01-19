// --- 1. DATA DUMMY (Database Sementara) ---
let campaignsData = [
  {
    id: 1,
    title: "Jadilah pendukung pendidikan iklim untuk generasi masa depan",
    image: "assets/CardPict/Lingkungan.png",
    category: "Lingkungan",
    collected: 160000,
    target: 20000000,
    organizer: "UI Biology Festival",
    verified: true,
    description:
      "Program ini bertujuan untuk memberikan edukasi mengenai perubahan iklim kepada siswa sekolah dasar di daerah terpencil. Donasi Anda akan digunakan untuk buku, alat peraga, dan operasional relawan.",
  },
  {
    id: 2,
    title: "Gerakan Makan Gratis di Masjid Jumat Berkah",
    image: "assets/CardPict/Sosial.png",
    category: "Sosial",
    collected: 9800000,
    target: 108000000,
    organizer: "Sedekah Global",
    verified: true,
    description:
      "Setiap hari Jumat, kami membagikan 500 porsi makan siang gratis untuk jamaah dan kaum dhuafa di sekitar masjid. Mari berbagi kebahagiaan melalui sebungkus nasi.",
  },
  {
    id: 3,
    title: "Bantu Abah Hendra Sembuh dari Stroke Berkepanjangan",
    image: "assets/CardPict/Kesehatan.png",
    category: "Kesehatan",
    collected: 11825000,
    target: 30000000,
    organizer: "Keluarga Abah",
    verified: false,
    description:
      "Abah Hendra sudah 3 tahun berjuang melawan stroke. Biaya pengobatan dan terapi sangat besar. Bantuan Anda sangat berarti untuk kesembuhan Abah.",
  },
  {
    id: 4,
    title: "Vege & Feli Bergerak Untuk Pendidikan Sumatra",
    image: "assets/CardPict/Pendidikan.png",
    category: "Pendidikan",
    collected: 6220019,
    target: 8000000,
    organizer: "Vege Team",
    verified: true,
    description:
      "Membangun perpustakaan mini dan menyumbangkan alat tulis untuk anak-anak di pedalaman Sumatra yang kekurangan akses pendidikan.",
  },
  {
    id: 5,
    title: "Bangun Jembatan Desa Pelosok yang Putus",
    image: "assets/CardPict/Sosial2.png",
    category: "Sosial",
    collected: 45000000,
    target: 50000000,
    organizer: "Kawan Desa",
    verified: true,
    description:
      "Jembatan satu-satunya penghubung desa ke kota putus akibat banjir bandang. Warga kesulitan menjual hasil bumi dan anak sekolah harus menyeberang sungai deras.",
  },
  {
    id: 6,
    title: "Beasiswa Anak Yatim Berprestasi",
    image: "assets/CardPict/Pendidikan2.jpg",
    category: "Pendidikan",
    collected: 2500000,
    target: 15000000,
    organizer: "Yayasan Harapan",
    verified: true,
    description:
      "Memberikan beasiswa penuh untuk 10 anak yatim berprestasi agar bisa melanjutkan sekolah ke jenjang SMA.",
  },
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

  const imgSrc = item.image;

  // PERBAIKAN: Menambahkan referrerpolicy="no-referrer" agar Imgur tidak memblokir gambar
  return `
        <div onclick="window.location.href='#detail/${item.id}'" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer transform hover:-translate-y-1">
            
            <div class="relative h-48 w-full overflow-hidden bg-gray-200">
                <img src="${imgSrc}" alt="${item.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://placehold.co/400x200?text=Gagal+Memuat+Gambar'" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-700 shadow-sm border border-gray-100">
                    ${item.category}
                </div>
            </div>

            <div class="p-5 flex flex-col flex-grow">
                <h3 class="font-bold text-lg text-gray-900 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-600 transition">
                    ${item.title}
                </h3>

                <div class="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden">
                    <div class="bg-brand-500 h-2.5 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
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

  // PERBAIKAN: Menambahkan referrerpolicy="no-referrer" di sini juga
  container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div class="md:flex">
                <div class="md:w-1/2 h-64 md:h-auto relative bg-gray-200">
                     <img src="${item.image}" alt="${item.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Gagal+Memuat+Gambar'" class="w-full h-full object-cover">
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
                            <div class="bg-brand-500 h-3 rounded-full transition-all duration-1000" style="width: ${percentage}%"></div>
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

// --- [BARU] FUNGSI PREVIEW GAMBAR ---
function updateImagePreview() {
  const url = document.getElementById("new-image").value.trim();
  const preview = document.getElementById("image-preview");

  if (!preview) return; // Mencegah error jika elemen preview tidak ada

  // PERBAIKAN: Set referrerPolicy untuk elemen preview juga
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
  event.preventDefault(); // Cegah reload

  // Ambil data dari form dan gunakan TRIM untuk menghapus spasi berlebih
  const title = document.getElementById("new-title").value.trim();
  const category = document.getElementById("new-category").value;
  const target = parseInt(document.getElementById("new-target").value);
  const organizer = document.getElementById("new-organizer").value.trim();
  const imageInput = document.getElementById("new-image").value.trim();
  const description = document.getElementById("new-description").value.trim();

  // Gunakan placeholder jika gambar kosong atau invalid string
  const image =
    imageInput && imageInput.length > 0
      ? imageInput
      : "https://placehold.co/600x400?text=Gambar+Kampanye";

  // Buat ID baru (Max ID + 1)
  const newId =
    campaignsData.length > 0
      ? Math.max(...campaignsData.map((c) => c.id)) + 1
      : 1;

  // Object Kampanye Baru
  const newCampaign = {
    id: newId,
    title: title,
    image: image,
    category: category,
    collected: 0, // Awal 0
    target: target,
    organizer: organizer,
    verified: true, // Auto verified karena admin yang buat
    description: description,
  };

  // Masukkan ke Database Array
  campaignsData.push(newCampaign);

  // Reset Form
  event.target.reset();

  // Reset Preview
  updateImagePreview();

  // Redirect kembali ke halaman Explore
  window.location.hash = "#create";

  // Re-render semua halaman agar data muncul
  renderExploreCampaigns();
  renderHomeCampaigns();

  // Optional: Alert sukses
  alert("Kampanye berhasil dibuat!");
}

// --- SPA ROUTING ---
// --- SPA ROUTING (Update: Support Animasi & Halaman Tentang) ---
function handleRouting() {
  const hash = window.location.hash || "#home";

  // 1. Sembunyikan semua section
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
    // 2. PROTEKSI HALAMAN ADMIN (Tetap Pertahankan!)
    if (targetSectionId === "create-form") {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (!user || user.role !== "admin") {
        alert("Akses ditolak! Hanya admin yang boleh masuk.");
        window.location.hash = "#home";
        return;
      }

      // Re-bind Event Listener untuk Preview Gambar
      setTimeout(() => {
        const imageInput = document.getElementById("new-image");
        if (imageInput) {
          imageInput.addEventListener("input", updateImagePreview);
        }
      }, 100);
    }

    targetSection.classList.remove("hidden-section");

    // 3. Render Detail jika ID kampanye ada
    if (targetSectionId === "detail" && campaignId) {
      renderDetailPage(campaignId);
      window.scrollTo(0, 0);
    }

    // 4. TIMEOUT PENTING: Untuk memicu animasi slide-up & fade-in di CSS
    setTimeout(() => {
        targetSection.classList.add("active-section");
    }, 10);
  } else {
    // Fallback ke Home jika halaman tidak dikenal
    const homeSection = document.getElementById("home");
    if (homeSection) {
        homeSection.classList.remove("hidden-section");
        homeSection.classList.add("active-section");
    }
  }

  // 5. Update Navbar Active State (Warna Hijau pada Menu Aktif)
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

    // Redirect
    if (foundUser.role === "admin") {
      window.location.hash = "#create"; // Admin ke halaman donasi
    } else {
      window.location.hash = "#home";
    }

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
  const adminContainer = document.getElementById(
    "admin-actions-container",
  );

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

  // [MODIFIKASI] Fitur Khusus Admin - Mengarahkan ke Form
  if (currentUser && currentUser.role === "admin") {
    if (adminContainer) {
      adminContainer.innerHTML = `
                <div class="bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl p-6 text-white flex flex-col md:flex-row items-center justify-between shadow-lg transform transition hover:scale-[1.01]">
                    <div class="mb-4 md:mb-0">
                        <h3 class="font-bold text-xl flex items-center gap-2">
                            Mode Admin Aktif
                        </h3>
                        <p class="text-brand-50 text-sm opacity-90">Anda memiliki akses untuk membuat penggalangan dana baru.</p>
                    </div>
                    <button onclick="window.location.href='#create-form'" class="bg-white text-brand-600 font-bold py-3 px-6 rounded-lg shadow hover:bg-gray-50 transition flex items-center gap-2">
                        <i class="fas fa-plus-circle"></i> Buat Kampanye Baru
                    </button>
                </div>
            `;
    }
  } else {
    if (adminContainer) adminContainer.innerHTML = "";
  }
}

window.addEventListener("load", () => {
  handleRouting();
  renderHomeCampaigns();
  renderExploreCampaigns();
  checkLoginStatus();
});

window.addEventListener("hashchange", handleRouting);
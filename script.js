// --- 1. DATA DUMMY (Database Sementara) ---
// Kampanye Donasi
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
    isActive: false, // Sudah ditutup
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
    title: "Sedekah Air Bersih untuk Warga Aceh Terdampak Banjir",
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

// --- [BARU] DATA DUMMY RELAWAN ---
let volunteerCampaigns = [
    {
        id: 201,
        title: "Relawan Mengajar di Sumba",
        location: "Sumba, NTT",
        date: "2023-12-10",
        targetPeople: 10, // Target relawan
        image: "assets/relawan/Relawan_Sumba.jpg",
        description: "Mari berbagi ilmu dengan anak-anak di pedalaman Sumba. Dibutuhkan 5 orang relawan pengajar Matematika dasar dan Bahasa Inggris.",
        isActive: true
    },
    {
        id: 202,
        title: "Bersih Pantai Kuta Bali",
        location: "Kuta, Bali",
        date: "2023-11-20",
        targetPeople: 50, // Target relawan
        image: "assets/relawan/Cleaning_Kuta.jpg",
        description: "Aksi nyata membersihkan sampah plastik di sepanjang pantai Kuta. Free snack dan sertifikat.",
        isActive: true
    }
];

// Data Pendaftar Relawan (Applicants)
// Structure Updated: Added email, address
let volunteerApplicants = [
    { id: 1, campaignId: 201, userId: 2, name: "Bayu kurniawan", email: "bayukur@gmail.com", contact: "085933671760", address: "Jl. Raya Ubud", appliedDate: "2023-11-01", status: "Pending" },
    { id: 2, campaignId: 202, userId: 2, name: "Budi santoso", email: "budisantoso@gmail.com", contact: "08457765443", address: "Jl. Merdeka No 1", appliedDate: "2023-10-28", status: "Diterima" }
];


// --- [BARU] DUMMY RIWAYAT DONASI & AKTIVITAS ---
// Ini simulasi data database transaksi
let donationsHistory = [
    { id: 101, userId: 2, campaignId: 1, amount: 50000, date: '2023-10-25', status: 'Berhasil' },
    { id: 102, userId: 2, campaignId: 4, amount: 100000, date: '2023-11-02', status: 'Berhasil' },
    { id: 103, userId: 1, campaignId: 2, amount: 1000000, date: '2023-10-15', status: 'Berhasil' }, // Admin donasi juga
    { id: 104, userId: 2, campaignId: 3, amount: 25000, date: '2023-11-10', status: 'Pending' },
];


// --- DATA USER ---
const usersData = [
  {
    id: 1,
    name: "Admin",
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

// --- [BARU] CUSTOM ALERT & CONFIRM LOGIC ---
let alertCallback = null;

function showCustomAlert(message, title = "Info", callback = null) {
    const modal = document.getElementById('custom-alert-modal');
    if(!modal) { alert(message); return; } // Fallback
    document.getElementById('alert-title').innerText = title;
    document.getElementById('alert-message').innerText = message;
    alertCallback = callback; // Simpan callback untuk dijalankan saat tutup
    modal.classList.remove('hidden');
}

function closeCustomAlert() {
    document.getElementById('custom-alert-modal').classList.add('hidden');
    // Jika ada callback yang disimpan, jalankan sekarang
    if (alertCallback) {
        alertCallback();
        alertCallback = null; // Reset
    }
}

let confirmCallback = null;

function showCustomConfirm(message, onConfirm, title = "Konfirmasi") {
    const modal = document.getElementById('custom-confirm-modal');
    if(!modal) { 
        // Fallback standard confirm
        const result = confirm(message);
        onConfirm(result);
        return;
    }

    document.getElementById('confirm-title').innerText = title;
    document.getElementById('confirm-message').innerText = message;
    
    // Set callback global
    confirmCallback = onConfirm;
    
    // Remove existing event listeners to prevent multiple firings
    const yesBtn = document.getElementById('confirm-yes-btn');
    const noBtn = document.getElementById('confirm-no-btn');
    
    // Clone node to clear listeners easily
    const newYesBtn = yesBtn.cloneNode(true);
    const newNoBtn = noBtn.cloneNode(true);
    
    yesBtn.parentNode.replaceChild(newYesBtn, yesBtn);
    noBtn.parentNode.replaceChild(newNoBtn, noBtn);
    
    newYesBtn.addEventListener('click', () => {
        const callbackToRun = confirmCallback; 
        closeCustomConfirm();
        if (callbackToRun) callbackToRun(true);
    });
    
    newNoBtn.addEventListener('click', () => {
        const callbackToRun = confirmCallback;
        closeCustomConfirm();
        if (callbackToRun) callbackToRun(false);
    });

    modal.classList.remove('hidden');
}

function closeCustomConfirm() {
    document.getElementById('custom-confirm-modal').classList.add('hidden');
    confirmCallback = null;
}


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

// --- FUNGSI RENDER DONATION CARD ---
function createCardHTML(item) {
  let percentage = (item.collected / item.target) * 100;
  if (percentage > 100) percentage = 100;

  // Logic Warna Bar
  let barColorClass = "bg-brand-500"; 
  if (item.hasOwnProperty('isActive') && !item.isActive) {
      barColorClass = "bg-gray-500";
  } else if (percentage >= 100) {
      barColorClass = "bg-red-500";
  }

  // Logic Badge Status
  let badgeText = "Dibuka";
  let badgeClass = "bg-brand-600"; 

  if (item.hasOwnProperty('isActive') && !item.isActive) {
      badgeText = "Ditutup";
      badgeClass = "bg-gray-600"; 
  } else if (percentage >= 100) {
      badgeText = "Tercapai";
      badgeClass = "bg-red-600"; 
  }

  // Logic Button
  let buttonHtml = "";
  if (!item.isActive || percentage >= 100) {
      buttonHtml = `
        <button disabled class="w-full bg-gray-300 text-gray-500 font-bold py-2.5 rounded-lg cursor-not-allowed shadow-none">
            ${!item.isActive ? 'Donasi Ditutup' : 'Target Tercapai'}
        </button>
      `;
  } else {
      buttonHtml = `
        <button onclick="window.location.href='#detail/${item.id}'; event.stopPropagation();" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg transition duration-200 shadow-sm shadow-brand-200">
            Donasi Sekarang
        </button>
      `;
  }

  const imgSrc = item.image;

  return `
        <div onclick="window.location.href='#detail/${item.id}'" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer transform hover:-translate-y-1">
            
            <div class="relative h-48 w-full overflow-hidden bg-gray-200">
                <img src="${imgSrc}" alt="${item.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://placehold.co/400x200?text=Gagal+Memuat+Gambar'" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ${!item.isActive ? 'grayscale' : ''}">
                
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
                ${buttonHtml}
            </div>
        </div>
    `;
}

// --- [UPDATE] FUNGSI RENDER VOLUNTEER CARD (DENGAN PROGRES BAR) ---
function createVolunteerCardHTML(item) {
    // Hitung relawan yang diterima
    const acceptedCount = volunteerApplicants.filter(a => a.campaignId === item.id && a.status === 'Diterima').length;
    const targetCount = item.targetPeople || 10; // Default fallback
    let percent = (acceptedCount / targetCount) * 100;
    if (percent > 100) percent = 100;

    // Logic Button & Status
    let buttonHtml = "";
    let badgeHtml = '<div class="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold shadow-md">Relawan</div>';
    let imageClass = "";

    if (!item.isActive) {
        // Jika Ditutup
        buttonHtml = `
            <button disabled class="w-full bg-gray-300 text-gray-500 font-bold py-2.5 rounded-lg cursor-not-allowed">
                Pendaftaran Ditutup
            </button>
        `;
        badgeHtml = '<div class="absolute top-3 left-3 bg-gray-600 text-white px-2 py-1 rounded text-xs font-bold shadow-md">Ditutup</div>';
        imageClass = "grayscale";
    } else {
        // Jika Buka
        buttonHtml = `
            <button onclick="registerVolunteer(${item.id})" class="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2.5 rounded-lg transition">
                Daftar Jadi Relawan
            </button>
        `;
    }

    return `
        <div class="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
            <div class="relative h-48 w-full overflow-hidden bg-gray-200">
                <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover ${imageClass}">
                ${badgeHtml}
            </div>
            <div class="p-5 flex flex-col flex-grow">
                 <h3 class="font-bold text-lg text-gray-900 leading-snug mb-2 line-clamp-2">${item.title}</h3>
                 <p class="text-sm text-gray-500 mb-3"><i class="fas fa-map-marker-alt text-red-400 mr-2"></i>${item.location}</p>
                 <p class="text-sm text-gray-500 mb-4"><i class="far fa-calendar-alt text-blue-400 mr-2"></i>${item.date}</p>
                 
                 <!-- PROGRESS BAR RELAWAN -->
                 <div class="mb-4">
                    <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-600 font-semibold">${acceptedCount} / ${targetCount} Relawan</span>
                        <span class="text-blue-600 font-bold">${Math.round(percent)}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-blue-500 h-2 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
                    </div>
                 </div>

                 <p class="text-gray-600 text-sm line-clamp-2 mb-4">${item.description}</p>
                 
                 <div class="mt-auto">
                    ${buttonHtml}
                 </div>
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

// --- RENDER HALAMAN RELAWAN (PUBLIC) ---
function renderVolunteerPage() {
    const container = document.getElementById("volunteer-campaign-list");
    if (!container) return;

    if (volunteerCampaigns.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">Belum ada kegiatan relawan saat ini.</p>`;
        return;
    }

    let html = "";
    volunteerCampaigns.forEach(item => {
        html += createVolunteerCardHTML(item);
    });
    container.innerHTML = html;
}

// --- RENDER HALAMAN ADMIN RELAWAN (MANAGE APPLICANTS) ---
function renderAdminRelawan() {
    const tbody = document.getElementById("admin-volunteer-tbody");
    if(!tbody) return;

    if (volunteerApplicants.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center py-6 text-gray-400">Belum ada pendaftar relawan.</td></tr>`;
        return;
    }

    let html = "";
    volunteerApplicants.forEach(app => {
        // Cari info campaignnya
        const campaign = volunteerCampaigns.find(c => c.id === app.campaignId);
        const title = campaign ? campaign.title : "Kegiatan Dihapus";
        
        let statusBadge = "";
        if(app.status === 'Pending') statusBadge = `<span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">Pending</span>`;
        else if(app.status === 'Diterima') statusBadge = `<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">Diterima</span>`;
        else statusBadge = `<span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">Ditolak</span>`;

        html += `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="font-bold text-gray-700">${app.name}</div>
                    <div class="text-xs text-gray-400">${app.email || '-'}</div>
                </td>
                <td class="px-6 py-4 text-gray-600">${title}</td>
                <td class="px-6 py-4 text-gray-500">
                    <div class="font-medium text-gray-600"><i class="fab fa-whatsapp text-green-500 mr-1"></i>${app.contact}</div>
                    <div class="text-xs text-gray-400 truncate max-w-[150px]" title="${app.address || ''}">${app.address || '-'}</div>
                </td>
                <td class="px-6 py-4">${statusBadge}</td>
                <td class="px-6 py-4 text-center">
                    ${app.status === 'Pending' ? `
                    <button onclick="updateVolunteerStatus(${app.id}, 'Diterima')" class="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 mr-2">Terima</button>
                    <button onclick="updateVolunteerStatus(${app.id}, 'Ditolak')" class="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600">Tolak</button>
                    ` : '<span class="text-xs text-gray-400">Selesai</span>'}
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}


// --- RENDER DASHBOARD (LOGIC UTAMA) ---
function renderDashboard() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) return;

    // 1. Set Header Info
    document.getElementById("dashboard-username").innerText = user.name;
    document.getElementById("dashboard-role-label").innerText = user.role === 'admin' ? "Administrator" : "Donatur";

    // 2. Logic Tombol Aksi (Khusus Admin vs User)
    const actionContainer = document.getElementById("dashboard-action-buttons");
    const adminManageSection = document.getElementById("admin-management-section");
    const userVolunteerSection = document.getElementById("user-volunteer-history-section");

    if (user.role === 'admin') {
        // ADMIN DASHBOARD
        actionContainer.innerHTML = `
            <div class="flex flex-wrap gap-3 justify-end">
                <button onclick="window.location.hash='#admin-relawan'" class="bg-white border border-blue-200 text-blue-600 font-bold py-2.5 px-4 rounded-lg hover:bg-blue-50 transition shadow-sm flex items-center gap-2">
                    <i class="fas fa-users-cog"></i> Kelola Relawan
                </button>
                <button onclick="window.location.hash='#buat-relawan'" class="bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
                    Buat Kegiatan
                </button>
                <button onclick="window.location.hash='#create-form'" class="bg-brand-600 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-brand-700 transition shadow-lg flex items-center gap-2">
                    Buat Donasi
                </button>
            </div>
        `;
        
        // Tampilkan Tabel Manajemen Kampanye (Untuk Hapus)
        adminManageSection.classList.remove('hidden');
        if(userVolunteerSection) userVolunteerSection.classList.add('hidden'); // Sembunyikan history relawan user
        renderAdminCampaignManagement();

        // ADMIN STATS (Global)
        const totalPlatformDonations = campaignsData.reduce((acc, curr) => acc + curr.collected, 0);
        const totalCampaigns = campaignsData.length + volunteerCampaigns.length;

        document.getElementById("stat-label-1").innerText = "Total Donasi Masuk";
        document.getElementById("stat-value-1").innerText = formatRupiah(totalPlatformDonations);
        
        document.getElementById("stat-label-2").innerText = "Total Kampanye Aktif";
        document.getElementById("stat-value-2").innerText = totalCampaigns;

    } else {
        // USER DASHBOARD
        adminManageSection.classList.add('hidden'); // Sembunyikan tabel admin
        
        // TAMPILKAN TABEL HISTORY RELAWAN (USER)
        if(userVolunteerSection) {
            userVolunteerSection.classList.remove('hidden');
            renderUserVolunteerHistory(user.id);
        }
        
        actionContainer.innerHTML = `
            <div class="flex gap-3">
                 <button onclick="window.location.href='#relawan'" class="bg-white border border-brand-200 text-brand-600 font-bold py-2.5 px-5 rounded-lg hover:bg-brand-50 transition shadow-sm flex items-center gap-2">
                    Jadi Relawan
                </button>
                <button onclick="window.location.href='#create'" class="bg-brand-600 text-white font-bold py-2.5 px-5 rounded-lg hover:bg-brand-700 transition shadow-lg flex items-center gap-2">
                    Mulai Donasi
                </button>
            </div>
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
        historyData = donationsHistory; 
    } else {
        historyData = donationsHistory.filter(d => d.userId === user.id);
    }

    historyData.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (historyData.length === 0) {
        historyBody.innerHTML = `<tr><td class="px-6 py-8 text-center text-gray-400" colspan="4"><i class="fas fa-inbox text-2xl mb-2 block"></i>Belum ada riwayat aktivitas.</td></tr>`;
    } else {
        let html = "";
        historyData.forEach(trx => {
            const campaign = campaignsData.find(c => c.id === trx.campaignId);
            const campaignTitle = campaign ? campaign.title : "Kampanye Tidak Dikenal";
            
            let statusColor = "text-green-600 bg-green-50";
            if (trx.status === 'Pending') statusColor = "text-yellow-600 bg-yellow-50";

            html += `
                <tr class="hover:bg-gray-50 transition">
                    <td class="px-6 py-4 whitespace-nowrap text-gray-500">${trx.date}</td>
                    <td class="px-6 py-4">
                        <div class="text-sm font-bold text-gray-900 line-clamp-1">${campaignTitle}</div>
                        <div class="text-xs text-gray-400">ID Donasi: #${trx.id}</div>
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

// --- RENDER HISTORY RELAWAN (USER SPECIFIC) ---
function renderUserVolunteerHistory(userId) {
    const tbody = document.getElementById("dashboard-volunteer-history-body");
    if(!tbody) return;

    // Filter pendaftaran milik user ini
    const myApplications = volunteerApplicants.filter(app => app.userId === userId);
    
    if (myApplications.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-center py-6 text-gray-400">Belum ada riwayat pendaftaran relawan.</td></tr>`;
        return;
    }

    let html = "";
    myApplications.forEach(app => {
        const campaign = volunteerCampaigns.find(c => c.id === app.campaignId);
        const title = campaign ? campaign.title : "Kegiatan Dihapus";
        const location = campaign ? campaign.location : "-";
        
        let statusBadge = "";
        if(app.status === 'Pending') statusBadge = `<span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">Menunggu</span>`;
        else if(app.status === 'Diterima') statusBadge = `<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">Diterima</span>`;
        else statusBadge = `<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold">Ditolak</span>`;

        const dateDisplay = app.appliedDate || "2023-10-01"; 

        html += `
            <tr class="hover:bg-blue-50 transition">
                <td class="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">${dateDisplay}</td>
                <td class="px-6 py-4 font-bold text-gray-800">${title}</td>
                <td class="px-6 py-4 text-gray-600 text-sm"><i class="fas fa-map-marker-alt text-red-400 mr-1"></i>${location}</td>
                <td class="px-6 py-4">${statusBadge}</td>
            </tr>
        `;
    });
    tbody.innerHTML = html;
}

// --- [UPDATE] RENDER TABEL MANAGEMEN KAMPANYE (ADMIN) ---
function renderAdminCampaignManagement() {
    const tbody = document.getElementById("admin-campaign-list-body");
    if (!tbody) return;

    let html = "";

    // 1. List Donasi
    campaignsData.forEach(c => {
        const statusLabel = c.isActive ? 'Aktif' : 'Tutup';
        const statusClass = c.isActive ? 'text-green-600' : 'text-gray-500';
        const statusBtnClass = c.isActive ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100';
        const statusIcon = c.isActive ? 'fa-ban' : 'fa-check';
        const statusText = c.isActive ? 'Tutup' : 'Buka';

        html += `
             <tr class="hover:bg-red-50 transition group ${!c.isActive ? 'bg-gray-50' : ''}">
                <td class="px-6 py-3 text-xs text-gray-500">#${c.id}</td>
                <td class="px-6 py-3 font-semibold text-gray-800 line-clamp-1">${c.title}</td>
                <td class="px-6 py-3 text-xs"><span class="bg-gray-100 text-gray-600 px-2 py-1 rounded">Donasi</span></td>
                <td class="px-6 py-3 text-xs ${statusClass} font-bold">${statusLabel}</td>
                <td class="px-6 py-3 text-center whitespace-nowrap">
                     <button onclick="toggleCampaignStatus(${c.id}, 'donation')" class="inline-flex items-center px-3 py-1.5 ${statusBtnClass} rounded-lg transition duration-200 text-xs font-bold mr-2">
                        <i class="fas ${statusIcon} mr-1.5"></i> ${statusText}
                    </button>
                     <button onclick="openEditCampaignModal(${c.id}, 'donation')" class="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-200 text-xs font-bold mr-2">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button onclick="handleDeleteCampaign(${c.id}, 'donation')" class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200 text-xs font-bold">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    // 2. List Relawan
    volunteerCampaigns.forEach(v => {
        const statusLabel = v.isActive ? 'Aktif' : 'Tutup';
        const statusClass = v.isActive ? 'text-green-600' : 'text-gray-500';
        const statusBtnClass = v.isActive ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' : 'bg-green-50 text-green-600 hover:bg-green-100';
        const statusIcon = v.isActive ? 'fa-ban' : 'fa-check';
        const statusText = v.isActive ? 'Tutup' : 'Buka';

        html += `
             <tr class="hover:bg-red-50 transition group ${!v.isActive ? 'bg-gray-50' : ''}">
                <td class="px-6 py-3 text-xs text-gray-500">#${v.id}</td>
                <td class="px-6 py-3 font-semibold text-gray-800 line-clamp-1">${v.title}</td>
                <td class="px-6 py-3 text-xs"><span class="bg-blue-100 text-blue-600 px-2 py-1 rounded">Relawan</span></td>
                <td class="px-6 py-3 text-xs ${statusClass} font-bold">${statusLabel}</td>
                <td class="px-6 py-3 text-center whitespace-nowrap">
                    <button onclick="toggleCampaignStatus(${v.id}, 'volunteer')" class="inline-flex items-center px-3 py-1.5 ${statusBtnClass} rounded-lg transition duration-200 text-xs font-bold mr-2">
                        <i class="fas ${statusIcon} mr-1.5"></i> ${statusText}
                    </button>
                    <button onclick="openEditCampaignModal(${v.id}, 'volunteer')" class="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition duration-200 text-xs font-bold mr-2">
                        <i class="fas fa-edit mr-1.5"></i> Edit
                    </button>
                    <button onclick="handleDeleteCampaign(${v.id}, 'volunteer')" class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200 text-xs font-bold">
                        <i class="fas fa-trash mr-1.5"></i> Hapus
                    </button>
                </td>
            </tr>
        `;
    });

    if (html === "") {
        html = `<tr><td colspan="5" class="text-center py-4 text-gray-400">Tidak ada kampanye aktif.</td></tr>`;
    }

    tbody.innerHTML = html;
}

// --- [BARU] FUNGSI TOGGLE STATUS KAMPANYE ---
function toggleCampaignStatus(id, type) {
    let item;
    if (type === 'donation') {
        item = campaignsData.find(c => c.id === id);
    } else {
        item = volunteerCampaigns.find(v => v.id === id);
    }

    if (item) {
        // Toggle status
        item.isActive = !item.isActive;
        const statusText = item.isActive ? "Dibuka kembali" : "Ditutup";
        
        showCustomAlert(`Kampanye berhasil ${statusText}!`);
        
        // Refresh UI
        renderDashboard();
        renderHomeCampaigns();
        renderExploreCampaigns();
        renderVolunteerPage();
        
        // Jika sedang di detail page kampanye ini, refresh juga
        if(window.location.hash.includes(`detail/${id}`)) {
            renderDetailPage(id);
        }
    }
}

// --- LOGIKA EDIT KAMPANYE ---
function openEditCampaignModal(id, type) {
    let item;
    const collectedInput = document.getElementById("edit-collected-container");

    if (type === 'donation') {
        item = campaignsData.find(c => c.id === id);
        collectedInput.classList.remove('hidden'); // Tampilkan field donasi
        document.getElementById("edit-collected").value = item.collected;
    } else {
        item = volunteerCampaigns.find(v => v.id === id);
        collectedInput.classList.add('hidden'); // Sembunyikan field donasi untuk relawan
    }

    if (!item) return;

    document.getElementById("edit-campaign-id").value = id;
    document.getElementById("edit-campaign-type").value = type;
    document.getElementById("edit-title").value = item.title;
    document.getElementById("edit-description").value = item.description;

    document.getElementById("edit-campaign-modal").classList.remove('hidden');
}

function closeEditCampaignModal() {
    document.getElementById("edit-campaign-modal").classList.add('hidden');
}

function handleUpdateCampaign(event) {
    event.preventDefault();

    const id = parseInt(document.getElementById("edit-campaign-id").value);
    const type = document.getElementById("edit-campaign-type").value;
    const newTitle = document.getElementById("edit-title").value;
    const newDesc = document.getElementById("edit-description").value;

    if (type === 'donation') {
        const item = campaignsData.find(c => c.id === id);
        if (item) {
            item.title = newTitle;
            item.description = newDesc;
            item.collected = parseInt(document.getElementById("edit-collected").value);
        }
    } else {
        const item = volunteerCampaigns.find(v => v.id === id);
        if (item) {
            item.title = newTitle;
            item.description = newDesc;
        }
    }

    showCustomAlert("Perubahan berhasil disimpan!");
    closeEditCampaignModal();
    
    // Refresh Tampilan
    renderDashboard();
    renderHomeCampaigns();
    renderExploreCampaigns();
    renderVolunteerPage();
}

// --- FUNGSI HAPUS KAMPANYE ---
function handleDeleteCampaign(id, type) {
    showCustomConfirm("Apakah Anda yakin ingin menghapus kampanye ini? Data yang dihapus tidak bisa dikembalikan.", (confirmed) => {
        if (confirmed) {
            if (type === 'donation') {
                campaignsData = campaignsData.filter(c => c.id !== id);
            } else {
                volunteerCampaigns = volunteerCampaigns.filter(v => v.id !== id);
            }

            // Re-render
            renderDashboard();
            renderHomeCampaigns();
            renderExploreCampaigns();
            renderVolunteerPage();
            showCustomAlert("Kampanye berhasil dihapus!");
        }
    });
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

  // LOGIC TOMBOL DONASI
  const isFinished = !item.isActive || percentage >= 100;
  let actionButtonHtml = "";

  if (isFinished) {
       actionButtonHtml = `
        <button disabled class="w-full bg-gray-300 text-gray-500 font-bold py-4 rounded-xl cursor-not-allowed shadow-none">
            ${!item.isActive ? 'Donasi Ditutup' : 'Target Tercapai'}
        </button>
       `;
  } else {
      actionButtonHtml = `
        <button onclick="openDonationModal(${item.id})" class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-200 transition transform hover:-translate-y-1">
            Donasi Sekarang
        </button>
      `;
  }

  container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div class="md:flex">
                <div class="md:w-1/2 h-64 md:h-auto relative bg-gray-200">
                      <img src="${item.image}" alt="${item.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; this.src='https://placehold.co/600x400?text=Gagal+Memuat+Gambar'" class="w-full h-full object-cover ${!item.isActive ? 'grayscale' : ''}">
                      
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

                        ${actionButtonHtml}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// --- LOGIKA POPUP DONASI ---
let currentDonationCampaignId = null;

function openDonationModal(campaignId) {
    const campaign = campaignsData.find(c => c.id === campaignId);
    if(!campaign) return;

    currentDonationCampaignId = campaignId;
    document.getElementById('modal-campaign-title').innerText = campaign.title;
    document.getElementById('donation-amount').value = '';
    document.getElementById('donor-name').value = '';
    document.getElementById('donor-message').value = '';
    
    // Pre-fill name if logged in
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if(user) {
        document.getElementById('donor-name').value = user.name;
    }

    document.getElementById('donation-modal').classList.remove('hidden');
}

function closeDonationModal() {
    document.getElementById('donation-modal').classList.add('hidden');
    currentDonationCampaignId = null;
}

function setAmount(amount) {
    document.getElementById('donation-amount').value = amount;
}

function handleDonationPayment(event) {
    event.preventDefault();
    
    const amount = parseInt(document.getElementById('donation-amount').value);
    const method = document.getElementById('payment-method').value;
    const nameInput = document.getElementById('donor-name').value.trim();
    const message = document.getElementById('donor-message').value.trim();
    
    // Get User (Optional, can be anonymous)
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const userId = user ? user.id : null; // If null, it's guest
    const donorName = nameInput || "Hamba Allah";

    // 1. Add to Transaction History
    const newTransaction = {
        id: Date.now(), // Generate ID
        userId: userId || 9999, // 9999 for Guest
        campaignId: currentDonationCampaignId,
        amount: amount,
        date: new Date().toISOString().split('T')[0],
        status: 'Berhasil',
        name: donorName,
        method: method
    };
    donationsHistory.push(newTransaction);

    // 2. Update Campaign Collected Amount
    const campaignIndex = campaignsData.findIndex(c => c.id === currentDonationCampaignId);
    if(campaignIndex !== -1) {
        campaignsData[campaignIndex].collected += amount;
    }

    // 3. Close & Refresh
    closeDonationModal();
    renderDetailPage(currentDonationCampaignId); 
    renderHomeCampaigns(); 
    renderExploreCampaigns(); 
    renderDashboard(); 

    // Tampilkan notifikasi dan arahkan ke halaman donasi (#create) setelah OK diklik
    showCustomAlert(
        `Terima kasih, ${donorName}! Donasi sebesar ${formatRupiah(amount)} berhasil diterima via ${method}.`,
        "Berhasil", 
        () => {
            window.location.hash = "#create";
        }
    );
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

// --- LOGIKA FORM DONASI (CREATE CAMPAIGN) ---
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
    isActive: true,
    description: description,
  };

  campaignsData.push(newCampaign);
  event.target.reset();
  
  window.location.hash = "#dashboard";
  renderExploreCampaigns();
  renderHomeCampaigns();
  showCustomAlert("Kampanye Donasi berhasil dibuat!");
}

// --- LOGIKA FORM RELAWAN (ADMIN CREATE) ---
function handleCreateVolunteerCampaign(event) {
    event.preventDefault();

    const title = document.getElementById("vol-title").value.trim();
    const location = document.getElementById("vol-location").value.trim();
    const date = document.getElementById("vol-date").value;
    const targetPeople = parseInt(document.getElementById("vol-target-people").value); // Ambil jumlah orang
    const imageInput = document.getElementById("vol-image").value.trim();
    const description = document.getElementById("vol-description").value.trim();

    const image = imageInput && imageInput.length > 0
      ? imageInput
      : "https://placehold.co/400x250?text=Kegiatan+Relawan";

    const newId = volunteerCampaigns.length > 0 ? Math.max(...volunteerCampaigns.map(v => v.id)) + 1 : 201;

    const newVol = {
        id: newId,
        title: title,
        location: location,
        date: date,
        targetPeople: targetPeople, // Simpan jumlah orang
        image: image,
        description: description,
        isActive: true
    };

    volunteerCampaigns.push(newVol);
    event.target.reset();

    window.location.hash = "#dashboard";
    renderVolunteerPage();
    showCustomAlert("Kegiatan Relawan berhasil dibuat!");
}

// --- [UPDATE] LOGIKA DAFTAR RELAWAN (MODAL GUEST) ---
let currentVolCampaignId = null;

function registerVolunteer(campaignId) {
    // Cari data campaign
    const campaign = volunteerCampaigns.find(c => c.id === campaignId);
    if(!campaign) return;

    // CEK STATUS AKTIF
    if(!campaign.isActive) {
        showCustomAlert("Maaf, pendaftaran untuk kegiatan ini sudah ditutup.");
        return;
    }

    currentVolCampaignId = campaignId;
    
    // Set Modal Content
    document.getElementById('vol-modal-title').innerText = campaign.title;
    document.getElementById('vol-modal-location').innerText = campaign.location;
    
    // Clear Form
    document.getElementById('volunteer-form').reset();

    // Pre-fill jika user login
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if(user) {
        document.getElementById('vol-name').value = user.name;
        document.getElementById('vol-email').value = user.email;
        // Phone & Address tidak ada di data user basic, jadi biarkan kosong
    }

    // Open Modal
    document.getElementById('volunteer-modal').classList.remove('hidden');
}

function closeVolunteerModal() {
    document.getElementById('volunteer-modal').classList.add('hidden');
    currentVolCampaignId = null;
}

function handleVolunteerSubmit(event) {
    event.preventDefault();

    // Ambil data form
    const name = document.getElementById('vol-name').value.trim();
    const email = document.getElementById('vol-email').value.trim();
    const phone = document.getElementById('vol-phone').value.trim();
    const address = document.getElementById('vol-address').value.trim();

    // Cek duplikasi (berdasarkan email & campaign ID untuk guest)
    const existing = volunteerApplicants.find(a => a.campaignId === currentVolCampaignId && a.email === email);
    if(existing) {
        showCustomAlert("Email ini sudah terdaftar untuk kegiatan ini.", "Peringatan");
        return;
    }

    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    // Buat data pendaftar baru
    const newApplicant = {
        id: Date.now(),
        campaignId: currentVolCampaignId,
        userId: user ? user.id : 9999, // 9999 for Guest
        name: name,
        email: email,
        contact: phone, // Mapping phone ke contact
        address: address,
        status: "Pending",
        appliedDate: new Date().toISOString().split('T')[0] // MENYIMPAN TANGGAL PENDAFTARAN
    };

    volunteerApplicants.push(newApplicant);
    
    closeVolunteerModal();
    showCustomAlert(`Terima kasih, ${name}! Pendaftaran Anda telah diterima dan menunggu konfirmasi admin.`);
    
    // Refresh dashboard jika di halaman dashboard
    renderDashboard();
    // Refresh admin table jika sedang dibuka di tab lain/admin
    renderAdminRelawan();
    // Refresh page relawan untuk update progress bar
    renderVolunteerPage();
}

// --- LOGIKA TERIMA/TOLAK RELAWAN (ADMIN) ---
function updateVolunteerStatus(appId, newStatus) {
    const appIndex = volunteerApplicants.findIndex(a => a.id === appId);
    if(appIndex !== -1) {
        volunteerApplicants[appIndex].status = newStatus;
        renderAdminRelawan(); // Re-render table
        showCustomAlert(`Status relawan berhasil diubah menjadi: ${newStatus}`);
        renderVolunteerPage(); // Refresh public view
    }
}


// --- SPA ROUTING ---
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

  // --- ACCESS GUARD (PROTEKSI HALAMAN) ---
  if (targetSection) {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      // 1. HALAMAN YANG BUTUH LOGIN
      const protectedRoutes = ["dashboard", "create-form", "buat-relawan", "admin-relawan"];
      if (protectedRoutes.includes(targetSectionId) && !user) {
           showCustomAlert("Silakan masuk terlebih dahulu.", "Akses Dibatasi");
           window.location.hash = "#login";
           return;
      }

      // 2. HALAMAN KHUSUS ADMIN
      const adminRoutes = ["create-form", "buat-relawan", "admin-relawan"];
      if (adminRoutes.includes(targetSectionId) && user.role !== "admin") {
          showCustomAlert("Akses Ditolak! Halaman ini khusus Administrator.", "Akses Ditolak");
          window.location.hash = "#dashboard";
          return;
      }

      // Render khusus per halaman
      if (targetSectionId === "dashboard") renderDashboard();
      if (targetSectionId === "relawan") renderVolunteerPage();
      if (targetSectionId === "admin-relawan") renderAdminRelawan();

      targetSection.classList.remove("hidden-section");

      if (targetSectionId === "detail" && campaignId) {
        renderDetailPage(campaignId);
        window.scrollTo(0, 0);
      }

      setTimeout(() => targetSection.classList.add("active-section"), 10);
  } else {
    // Default fallback
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

    window.location.hash = "#dashboard";
    checkLoginStatus();
  } else {
    errorMsg.classList.remove("hidden");
  }
}

function handleLogout() {
  showCustomConfirm("Yakin ingin keluar?", (confirmed) => {
      if(confirmed) {
        localStorage.removeItem("currentUser");
        window.location.hash = "#home";
        checkLoginStatus();
      }
  });
}

function checkLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navContainer = document.getElementById("nav-auth-container");
  
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

// --- GLOBAL SEARCH LOGIC (FIXED) ---
// Menambahkan event listener untuk global search di navbar
const globalSearchInput = document.getElementById("global-search");
if (globalSearchInput) {
    globalSearchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const query = globalSearchInput.value;
            if(!query) return;

            // 1. Pindah ke halaman explore (#create)
            window.location.hash = "#create";

            // 2. Set nilai input search di halaman explore
            // Gunakan timeout kecil agar halaman sempat dirender
            setTimeout(() => {
                const exploreInput = document.getElementById("explore-search");
                if(exploreInput) {
                    exploreInput.value = query;
                    
                    // 3. Trigger input event agar filter berjalan
                    // Kita update global var currentSearch dulu
                    currentSearch = query;
                    renderExploreCampaigns();
                    
                    // Scroll ke bagian list
                    document.getElementById("all-campaign-list").scrollIntoView({behavior: "smooth"});
                }
            }, 100);
        }
    });
}

window.addEventListener("load", () => {
  handleRouting();
  renderHomeCampaigns();
  renderExploreCampaigns();
  renderVolunteerPage(); // init
  checkLoginStatus();
});

window.addEventListener("hashchange", handleRouting);

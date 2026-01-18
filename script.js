// --- 1. DATA DUMMY (Database Sementara) ---
const campaignsData = [
    {
        id: 1,
        title: "Jadilah pendukung pendidikan iklim untuk generasi masa depan",
        image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=500",
        category: "Lingkungan",
        collected: 160000,
        target: 20000000,
        organizer: "UI Biology Festival",
        verified: true
    },
    {
        id: 2,
        title: "Gerakan Makan Gratis di Masjid Jumat Berkah",
        image: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=500",
        category: "Sosial",
        collected: 0,
        target: 108000000,
        organizer: "Sedekah Global",
        verified: true
    },
    {
        id: 3,
        title: "Bantu Abah Hendra Sembuh dari Stroke Berkepanjangan",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=500",
        category: "Kesehatan",
        collected: 11825000,
        target: 30000000,
        organizer: "Keluarga Abah",
        verified: false
    },
    {
        id: 4,
        title: "Vege & Feli Bergerak Untuk Pendidikan Sumatra",
        image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&q=80&w=500",
        category: "Pendidikan",
        collected: 6220019,
        target: 8000000,
        organizer: "Vege Team",
        verified: true
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

// --- 3. FUNGSI RENDER KARTU (Dengan Styling Brand & Fitur Search) ---
// Menerima parameter 'keyword' agar search bar tetap berfungsi
function renderCampaigns(keyword = '') {
    const container = document.getElementById('campaign-list');
    
    // Safety check: kalau elemen tidak ada, stop
    if (!container) return;

    // Filter data berdasarkan keyword pencarian
    const filteredData = campaignsData.filter(item => 
        item.title.toLowerCase().includes(keyword.toLowerCase())
    );

    // Reset isi container
    container.innerHTML = '';

    // Cek jika hasil pencarian kosong
    if (filteredData.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-10 text-gray-400">
                <i class="fas fa-search text-3xl mb-2"></i>
                <p>Tidak ada kampanye yang cocok.</p>
            </div>
        `;
        return;
    }

    // Loop data dan buat HTML Card
    filteredData.forEach(item => {
        // Hitung persentase
        let percentage = (item.collected / item.target) * 100;
        if (percentage > 100) percentage = 100; 

        // Tentukan template Card
        const cardHTML = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group cursor-pointer">
                
                <!-- Gambar Card -->
                <div class="relative h-48 w-full overflow-hidden">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500">
                    <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-700 shadow-sm">
                        ${item.category}
                    </div>
                </div>

                <!-- Konten Card -->
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="font-bold text-lg text-gray-900 leading-snug mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-brand-600 transition">
                        ${item.title}
                    </h3>

                    <!-- Progress Bar (Warna Brand) -->
                    <div class="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                        <div class="bg-brand-500 h-2.5 rounded-full" style="width: ${percentage}%"></div>
                    </div>

                    <!-- Info Donasi -->
                    <div class="flex justify-between items-center text-xs text-gray-500 mb-4">
                        <div>
                            <span class="text-brand-600 font-bold text-sm">${formatRupiah(item.collected)}</span>
                            <span> terkumpul</span>
                        </div>
                        <div class="text-right">
                            <span class="text-gray-400">dari ${formatRupiah(item.target)}</span>
                        </div>
                    </div>

                    <!-- Organizer Info -->
                    <div class="mt-auto flex items-center pt-4 border-t border-gray-50">
                        <div class="w-8 h-8 rounded-full bg-brand-50 overflow-hidden mr-3 flex items-center justify-center text-brand-500">
                            <!-- Pakai inisial kalau avatar error, atau pakai dicebear -->
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="flex items-center text-sm font-medium text-gray-700">
                            ${item.organizer}
                            ${item.verified ? '<i class="fas fa-check-circle text-blue-500 ml-1 text-xs" title="Terverifikasi"></i>' : ''}
                        </div>
                    </div>
                </div>

                <!-- Tombol Donasi (Warna Brand) -->
                <div class="p-4 pt-0">
                    <button class="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-2.5 rounded-lg transition duration-200 shadow-sm shadow-brand-200">
                        Donasi Sekarang
                    </button>
                </div>
            </div>
        `;
        
        container.innerHTML += cardHTML;
    });
}

// --- 4. SISTEM ROUTING SPA (Updated & Fix Conflict) ---
// Kita pakai logic baru ini karena mendukung 'hidden-section' (untuk fix login page)
function handleRouting() {
    const hash = window.location.hash || '#home';
    
    // 1. Sembunyikan SEMUA section terlebih dahulu
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section'); // PENTING: Paksa sembunyi
    });
    
    // 2. Tentukan target
    const targetId = hash.replace('#', '');
    const targetSection = document.getElementById(targetId);

    // 3. Tampilkan target jika ada
    if (targetSection) {
        targetSection.classList.remove('hidden-section'); // Hapus paksa sembunyi
        // Timeout kecil biar animasi CSS transisi jalan halus
        setTimeout(() => {
            targetSection.classList.add('active-section');
        }, 10);
    } else {
        // Fallback ke Home
        const home = document.getElementById('home');
        if(home) {
            home.classList.remove('hidden-section');
            home.classList.add('active-section');
        }
    }

    // 4. Update Navbar Active State (Opsional biar rapi)
    document.querySelectorAll('nav a').forEach(link => {
        if(link.getAttribute('href') === hash) {
            link.classList.add('text-brand-600');
        } else {
            link.classList.remove('text-brand-600');
        }
    });

    // 5. Scroll ke atas
    window.scrollTo(0, 0);
}

// --- 5. INISIALISASI ---
window.addEventListener('load', () => {
    handleRouting();
    renderCampaigns(); // Render data awal
    
    // Listener Search Input (Agar search bar jalan)
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderCampaigns(e.target.value);
        });
    }
});

window.addEventListener('hashchange', handleRouting);
// --- FILE LOGIC DASAR (COMMIT PERTAMA) ---
// Fokus: Hanya menangani perpindahan halaman (Routing)

// Fungsi untuk mengatur Routing (Pindah Halaman)
function handleRouting() {
    // 1. Ambil hash dari URL (misal: #home, #create), default ke #home
    const hash = window.location.hash || '#home';
    
    // 2. Sembunyikan semua section (hapus class active-section)
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
    });
    
    // 3. Ambil section target berdasarkan ID (hilangkan tanda #)
    const targetId = hash.replace('#', '');
    const targetSection = document.getElementById(targetId);

    // 4. Jika section ketemu, tampilkan. Jika tidak, balik ke home.
    if (targetSection) {
        targetSection.classList.add('active-section');
    } else {
        document.getElementById('home').classList.add('active-section');
    }
}

// Jalankan fungsi routing saat:
// a. Halaman pertama kali diload
window.addEventListener('load', handleRouting);
// b. Hash di URL berubah (user klik menu navbar)
window.addEventListener('hashchange', handleRouting);

console.log("Sistem Routing Berjalan...");
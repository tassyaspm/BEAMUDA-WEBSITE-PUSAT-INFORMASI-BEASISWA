// DATA & STATE
let currentUser = null;
let currentUserId = null; // ← TAMBAH DI SINI
let bookmarks = [];

// LOAD BOOKMARKS DARI DATABASE
function loadBookmarks() {
    fetch(`php/get_bookmarks.php?user_id=${currentUserId}`)
    .then(res => res.json())
    .then(data => {
        bookmarks = data;
        displayScholarships(scholarships);
    });
}

const scholarships = [
    { id: 1, title: 'LPDP - Australia Awards (AAS)', logo: 'lpdp.png', country: 'Australia', level: 'S1', start: '01 Jan 2026', deadline: '05 Mei 2026', desc: 'Beasiswa penuh kolaborasi pemerintah Indonesia dan Australia.', tagClass: 's1',
      requirements: ['IPK min 3.0', 'Usia maks 35 tahun', 'Sertifikat IELTS min 6.5', 'WNI aktif'] },
    { id: 2, title: 'Global Korea Scholarship (GKS)', logo: 'lpdp.png', country: 'Korea Selatan', level: 'S2', start: '05 Feb 2026', deadline: '25 Mar 2026', desc: 'Beasiswa penuh pemerintah Korea Selatan untuk pascasarjana.', tagClass: 's2',
      requirements: ['IPK min 3.0', 'Usia maks 40 tahun', 'Sertifikat TOPIK atau IELTS', 'Tidak sedang menerima beasiswa lain'] },
    { id: 3, title: 'MEXT Scholarship Undergraduate',logo: 'lpdp.png', country: 'Jepang', level: 'S1', start: '25 Jan 2026',deadline: '15 Jun 2026', desc: 'Beasiswa riset dan studi di universitas terbaik Jepang.', tagClass: 's1',
      requirements: ['Lulusan SMA/sederajat', 'Usia 17–25 tahun', 'Nilai rata-rata min 8.0', 'Sertifikat JLPT N3 (diutamakan)'] },
    { id: 4, title: 'Beasiswa Unggulan', logo: 'beasiswaunggulan.jpg', country: 'Indonesia', level: 'S1', start: '01 Jan 2026', deadline: '10 Agu 2026', desc: 'Beasiswa prestasi untuk mahasiswa aktif di Indonesia.', tagClass: 's1',
      requirements: ['IPK min 3.25', 'Mahasiswa aktif semester 1–4', 'Aktif organisasi kampus', 'Surat rekomendasi dosen'] },
    { id: 5, title: 'Chevening Scholarship UK',logo: 'lpdp.png', country: 'Inggris', level: 'S2', start: '30 Jan 2026', deadline: '02 Nov 2026', desc: 'Beasiswa kepemimpinan dari pemerintah Inggris.', tagClass: 's2',
      requirements: ['IPK min 3.0', 'Pengalaman kerja min 2 tahun', 'IELTS min 6.5', 'Komitmen kembali ke Indonesia setelah studi'] },
    { id: 6, title: 'LPDP Reguler Doktoral', logo: 'lpdp.png', country: 'Indonesia', level: 'S3',start: '01 Mar 2026', deadline: '30 Jun 2026', desc: 'Beasiswa riset lanjut untuk dosen dan peneliti.', tagClass: 's3',
      requirements: ['IPK S2 min 3.25', 'Usia maks 47 tahun', 'Proposal riset', 'Surat izin dari instansi'] },
];

// TAMPILKAN BEASISWA
function displayScholarships(data, targetGridId = 'scholarship-grid') {
    const grid = document.getElementById(targetGridId);
    grid.innerHTML = '';
    if (data.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column: 1/-1; padding: 50px; color: #888;">Tidak ada data ditemukan.</p>';
        return;
    }
    data.forEach(item => {
        const isBookmarked = bookmarks.includes(item.id);
        grid.innerHTML += `
            <div class="card">
                <i class="bookmark-icon fa-bookmark ${isBookmarked ? 'active fa-solid' : 'fa-regular'}" onclick="toggleBookmark(event, ${item.id})"></i>
                <div onclick="openDetail(${item.id})" style="display:flex; gap:15px; width:100%">
                    <img src="${item.logo}" class="scholarship-logo">
                    <div class="card-info">
                        <h3>${item.title}</h3>
                        <span class="tag ${item.tagClass}">${item.level}</span> 
                        <span style="font-size: 11px; color:#666; margin-left: 5px;">${item.country}</span>
                        <div class="dates">
                            <div class="date-box"><span>Mulai</span><strong>${item.start}</strong></div>
                            <div class="date-box"><span>Deadline</span><strong class="deadline-text">${item.deadline}</strong></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}

// LOGIN
// REGISTER
function handleRegister() {
    const nama     = document.getElementById('reg-nama').value;
    const email    = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (nama.trim() === "" || email.trim() === "" || password.trim() === "") {
        alert("Semua kolom harus diisi!");
        return;
    }

    fetch('php/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `nama=${nama}&email=${email}&password=${password}`
    })
    .then(res => res.json())
    .then(data => {
        alert(data.pesan);
        if (data.status === 'sukses') showPage('login');
    });
}

// LOGIN
function handleLogin() {
    const email    = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email.trim() === "" || password.trim() === "") {
        alert("Email dan password harus diisi!");
        return;
    }

    fetch('php/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${email}&password=${password}`
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'sukses') {
            currentUser = data.nama;
            currentUserId = data.id;
            document.getElementById('user-display-name').innerText = currentUser;
            document.getElementById('login-nav-btn').style.display = 'none';
            document.getElementById('user-dropdown').style.display = 'inline-block';
            showPage('main');
            loadBookmarks();
        } else {
            alert(data.pesan);
        }
    });
}


// LOGOUT (MENGHAPUS STATUS & KEMBALI)
function logout() {
    currentUser = null;
    bookmarks = [];
    document.getElementById('login-nav-btn').style.display = 'block';
    document.getElementById('user-dropdown').style.display = 'none';
    showPage('main');
    displayScholarships(scholarships);
    alert("Berhasil Log Out");
}

// BOOKMARK
function toggleBookmark(event, id) {
    event.stopPropagation();
    if (!currentUser) {
        alert("Silakan login terlebih dahulu!");
        showPage('login');
        return;
    }
    const action = bookmarks.includes(id) ? 'remove' : 'add';
    fetch('php/bookmark.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `user_id=${currentUserId}&scholarship_id=${id}&action=${action}`
    })
    .then(res => res.json())
    .then(() => {
        if (action === 'add') {
            bookmarks.push(id);
        } else {
            bookmarks = bookmarks.filter(bid => bid !== id);
        }
        displayScholarships(scholarships);
        if (document.getElementById('saved-page').style.display === 'block') showSaved();
    });
}

// SHOW SAVED SCHOLARSHIPS
function showSaved() {
    showPage('saved');
    const savedData = scholarships.filter(s => bookmarks.includes(s.id));
    displayScholarships(savedData, 'saved-grid');
}

// NAVIGASI
function showPage(p) {
    const pages = ['main-page', 'login-page', 'signup-page', 'saved-page'];
    pages.forEach(id => document.getElementById(id).style.display = 'none');
    
    if (p === 'main') document.getElementById('main-page').style.display = 'block';
    else if (p === 'login' || p === 'signup') document.getElementById(p + '-page').style.display = 'flex';
    else if (p === 'saved') document.getElementById('saved-page').style.display = 'block';
    
    window.scrollTo(0,0);
}

function filterScholarships() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const level = document.getElementById('level-select').value;
    const country = document.getElementById('country-select').value;
    const filtered = scholarships.filter(s => 
        s.title.toLowerCase().includes(query) && (level === "" || s.level === level) && (country === "" || s.country === country)
    );
    displayScholarships(filtered);
}

function openDetail(id) {
    const item = scholarships.find(s => s.id === id);
    if (!item) return;
    const reqList = item.requirements.map(r => `<li>${r}</li>`).join('');
    document.getElementById('modal-body').innerHTML = `
        <h3>${item.title}</h3><p style="color:#666">${item.country} | ${item.level}</p>
        <br><p>${item.desc}</p><br>
        <h4 style="font-size: 14px;">Persyaratan Umum:</h4>
        <ul style="padding-left: 20px; font-size: 14px;">${reqList}</ul>
    `;
    document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal() { document.getElementById('detail-modal').style.display = 'none'; }
window.onclick = function(e) { if (e.target == document.getElementById('detail-modal')) closeModal(); }

displayScholarships(scholarships);

// main.js

// Fungsi untuk efek pengetikan judul
function typeWriter(elementId, textContent, speed, callback) {
    const element = document.getElementById(elementId);
    let i = 0;
    element.textContent = ''; // Bersihkan teks sebelumnya
    function type() {
        if (i < textContent.length) {
            element.textContent += textContent.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
}

// Fungsi untuk menginisialisasi animasi sel tabel
function initializeTableAnimations(containerId) {
    const scheduleContainer = document.getElementById(containerId);
    scheduleContainer.classList.add('animate-entrance');
    scheduleContainer.style.opacity = '1';
    
    scheduleContainer.addEventListener('animationend', () => {
        const tableCells = document.querySelectorAll(`#${containerId} tbody td`);
        tableCells.forEach((cell, index) => {
            cell.style.animation = `cellPopIn 0.4s ease-out forwards ${index * 0.03}s`;
        });
    }, { once: true });
}

// Fungsi untuk menginisialisasi modal pop-up mata kuliah
function initializeSubjectModals() {
    const subjectCells = document.querySelectorAll('.subject-cell');
    const subjectModal = document.getElementById('subjectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeModalButton = document.getElementById('closeModalButton');
    
    subjectCells.forEach(cell => {
        cell.addEventListener('click', () => {
            const title = cell.textContent.trim();
            const description = cell.dataset.description;
            
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            subjectModal.classList.add('show');
        });
    });
    
    closeModalButton.addEventListener('click', () => {
        subjectModal.classList.remove('show');
    });
    
    subjectModal.addEventListener('click', (event) => {
        if (event.target === subjectModal) {
            subjectModal.classList.remove('show');
        }
    });
}

// Fungsi umum untuk menangani klik ikon media sosial
function handleSocialIconClick(iconElement, activeClass, redirectUrl, typedMessage, elementsToHide) {
    iconElement.addEventListener('click', (event) => {
        event.preventDefault(); // Mencegah perilaku tautan default
        
        // Sembunyikan semua elemen yang ditentukan dengan efek fade-out
        elementsToHide.forEach(el => el.classList.add('fade-out'));
        
        // Terapkan kelas untuk memperbesar dan memposisikan ikon yang diklik
        iconElement.classList.add(activeClass);
        
        // Tunggu hingga fade-out dan transisi ikon selesai
        setTimeout(() => {
            // Sembunyikan elemen sepenuhnya
            elementsToHide.forEach(el => el.style.display = 'none');
            
            // Tampilkan layar donasi/pesan dengan transisi
            const donationScreen = document.getElementById('donation-screen');
            const donationTypedTextElement = document.getElementById('donation-typed-text');
            donationScreen.classList.add('show');
            
            // Mulai animasi pengetikan teks
            let k = 0;
            const typingSpeed = 100;
            donationTypedTextElement.textContent = ''; // Bersihkan teks sebelumnya
            
            function typeMessage() {
                if (k < typedMessage.length) {
                    donationTypedTextElement.textContent += typedMessage.charAt(k);
                    k++;
                    setTimeout(typeMessage, typingSpeed);
                } else {
                    // Animasi teks selesai, tunggu 2 detik kemudian redirect
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 2000); // 2 detik penundaan sebelum redirect
                }
            }
            typeMessage();
            
        }, 700); // Penundaan ini harus >= durasi transisi maksimal (0.7s untuk ikon)
    });
}

// Inisialisasi aplikasi saat DOM selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
    const fullTitleText = "Jadwal Pelajaran SMK 7 Jurusan Animasi";
    const typingSpeed = 70;
    
    // Elemen-elemen yang perlu disembunyikan saat ikon diklik
    const scheduleContainer = document.getElementById('schedule-container');
    const sholatReminder = document.getElementById('sholat-reminder');
    const saweriaIconWrapper = document.getElementById('saweria-icon-wrapper'); // Menggunakan wrapper
    const instagramIconWrapper = document.getElementById('instagram-icon-wrapper'); // Menggunakan wrapper
    const githubIconWrapper = document.getElementById('github-icon-wrapper'); // Menggunakan wrapper
    
    // Daftar semua elemen yang mungkin perlu disembunyikan
    const allHideableElements = [
        scheduleContainer,
        sholatReminder,
        saweriaIconWrapper,
        instagramIconWrapper,
        githubIconWrapper
    ];
    
    // Mulai efek pengetikan judul, lalu inisialisasi animasi tabel dan modal
    typeWriter('typed-title', fullTitleText, typingSpeed, () => {
        setTimeout(() => {
            initializeTableAnimations('schedule-container');
        }, 500);
    });
    
    initializeSubjectModals();
    
    // Terapkan fungsi handleSocialIconClick ke setiap ikon
    handleSocialIconClick(
        saweriaIconWrapper, // Menggunakan wrapper
        'saweria-active-state',
        'https://saweria.co/AfganCT',
        'Donasi Buat Beli Kopi ☕',
        allHideableElements.filter(el => el !== saweriaIconWrapper) // Sembunyikan semua kecuali saweriaIconWrapper
    );
    
    handleSocialIconClick(
        instagramIconWrapper, // Menggunakan wrapper
        'instagram-active-state',
        'https://www.instagram.com/newganfxzx?igsh=M3R2b3drY3k1ZWw3&utm_source=qr',
        'Kunjungi Profil Instagram 📸',
        allHideableElements.filter(el => el !== instagramIconWrapper) // Sembunyikan semua kecuali instagramIconWrapper
    );
    
    // Jika Anda ingin GitHub memiliki perilaku yang sama, aktifkan baris ini:
    // handleSocialIconClick(
    //     githubIconWrapper, // Menggunakan wrapper
    //     'github-active-state',
    //     'https://github.com/AFGANS',
    //     'Lihat Proyek GitHub Saya 💻',
    //     allHideableElements.filter(el => el !== githubIconWrapper) // Sembunyikan semua kecuali githubIconWrapper
    // );
});
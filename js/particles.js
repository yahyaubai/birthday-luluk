/* ==========================================
   PARTICLES.JS - Efek Partikel Ambient
   ========================================== */

// Konfigurasi partikel
const PARTICLE_CONFIG = {
    count: 45,               // Jumlah partikel (lebih banyak)
    minSize: 2,              // Ukuran minimum (px)
    maxSize: 7,              // Ukuran maksimum (px)
    minDuration: 4,          // Durasi animasi minimum (detik)
    maxDuration: 14,         // Durasi animasi maksimum (detik)
    colors: [
        'rgba(255, 45, 149, 0.6)',   // Pink utama
        'rgba(255, 45, 149, 0.4)',   // Pink medium
        'rgba(255, 100, 180, 0.5)',  // Pink terang
        'rgba(255, 150, 200, 0.4)',  // Pink soft
        'rgba(200, 50, 150, 0.4)',   // Magenta
        'rgba(255, 80, 160, 0.5)',   // Hot pink
        'rgba(255, 200, 220, 0.3)',  // Pink pastel
        'rgba(255, 255, 255, 0.25)', // Putih subtle
    ]
};

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    adjustParticlesForScreen();
});

// Sesuaikan jumlah partikel saat resize
window.addEventListener('resize', debounce(() => {
    adjustParticlesForScreen();
}, 300));

/* ==========================================
   CREATE PARTICLES - Generate partikel
   ========================================== */
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Bersihkan partikel lama
    container.innerHTML = '';

    const count = getParticleCount();

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = randomBetween(PARTICLE_CONFIG.minSize, PARTICLE_CONFIG.maxSize);
        const posX = Math.random() * 100;
        const duration = randomBetween(PARTICLE_CONFIG.minDuration, PARTICLE_CONFIG.maxDuration);
        const delay = Math.random() * duration;
        const color = PARTICLE_CONFIG.colors[Math.floor(Math.random() * PARTICLE_CONFIG.colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            bottom: -${size}px;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
            box-shadow: 0 0 ${size * 2}px ${color};
        `;

        container.appendChild(particle);
    }
}

/* ==========================================
   ADJUST FOR SCREEN - Responsif
   ========================================== */
function getParticleCount() {
    const width = window.innerWidth;

    if (width <= 375) return 15;         // Small phone
    if (width <= 430) return 20;         // iPhone 15
    if (width <= 768) return 22;         // Tablet
    return PARTICLE_CONFIG.count;         // Desktop/Laptop
}

function adjustParticlesForScreen() {
    const container = document.getElementById('particles');
    if (!container) return;

    const currentCount = container.children.length;
    const targetCount = getParticleCount();

    // Recreate jika jumlah berubah signifikan
    if (Math.abs(currentCount - targetCount) > 5) {
        createParticles();
    }
}

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
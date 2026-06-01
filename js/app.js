/* ==========================================
   APP.JS - Logic Utama & Transisi Halaman
   ========================================== */
// Tunggu DOM siap
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});
/* ==========================================
   INISIALISASI
   ========================================== */
function initApp() {
    const startBtn = document.getElementById('startBtn');
    startBtn.addEventListener('click', handleStart);
    startBtn.addEventListener('click', createRipple);
}
/* ==========================================
   HANDLE START - Klik tombol mulai
   ========================================== */
function handleStart(e) {
    const startBtn = document.getElementById('startBtn');
    startBtn.style.animation = 'none';
    startBtn.classList.add('btn-clicked');
    startBtn.style.transform = 'scale(1.3)';
    startBtn.style.opacity = '0';
    startBtn.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => {
        switchSection('start-section', 'countdown-section');
        startCountdown();
    }, 800);
}
/* ==========================================
   SWITCH SECTION - Transisi antar halaman
   ========================================== */
function switchSection(fromId, toId) {
    const fromSection = document.getElementById(fromId);
    const toSection = document.getElementById(toId);
    if (!fromSection || !toSection) return;
    toSection.classList.remove('hidden');
    toSection.classList.add('active');
    toSection.style.opacity = '0';
    requestAnimationFrame(() => {
        fromSection.style.opacity = '0';
        toSection.style.opacity = '1';
        setTimeout(() => {
            fromSection.classList.remove('active');
            fromSection.classList.add('hidden');
            fromSection.style.opacity = '';
            toSection.style.opacity = '';
            triggerSectionAnimations(toId);
        }, 600);
    });
}
/* ==========================================
   TRIGGER ANIMATIONS - Jalankan animasi per section
   ========================================== */
function triggerSectionAnimations(sectionId) {
    switch (sectionId) {
        case 'countdown-section':
            break;
        case 'opening-section':
            initOpeningAnimation();
            break;
        case 'pin-section':
            initPinSection();
            break;
        case 'loading-section':
            // GIF otomatis jalan, tidak perlu logic tambahan
            break;
        case 'greeting-section':
            initGreetingAnimation();
            break;
        case 'letter-section':
            initLetterAnimation();
            break;
        case 'mystery-section':
            initMysterySection();
            break;
        default:
            break;
    }
}
/* ==========================================
   COUNTDOWN 3-2-1
   ========================================== */
function startCountdown() {
    const countdownEl = document.getElementById('countdownNumber');
    let count = 3;
    showNumber(countdownEl, count);
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownEl.classList.remove('pop-in');
            countdownEl.classList.add('pop-out');
            setTimeout(() => {
                countdownEl.textContent = count;
                countdownEl.classList.remove('pop-out');
                countdownEl.classList.add('pop-in');
            }, 350);
        } else {
            clearInterval(interval);
            countdownEl.classList.remove('pop-in');
            countdownEl.classList.add('pop-out');
            setTimeout(() => {
                switchSection('countdown-section', 'opening-section');
            }, 500);
        }
    }, 1200);
}
function showNumber(el, num) {
    el.textContent = num;
    el.classList.add('pop-in');
}
/* ==========================================
   OPENING ANIMATION - Birthday Text + Love Bubbles
   ========================================== */
function initOpeningAnimation() {
    const title = document.getElementById('birthdayTitle');
    const loveIcon = document.getElementById('loveIcon');
    setTimeout(() => {
        title.classList.add('show');
    }, 300);
    setTimeout(() => {
        if (loveIcon) loveIcon.classList.add('show');
    }, 800);
    setTimeout(() => {
        createLoveBubbles();
    }, 500);
    // Setelah 5 detik, pindah ke PIN section
    setTimeout(() => {
        switchSection('opening-section', 'pin-section');
    }, 5000);
}
/* ==========================================
   PIN INPUT LOGIC
   ========================================== */
const CORRECT_PIN = '190426';
let currentPin = '';
function initPinSection() {
    const keypad = document.getElementById('pinKeypad');
    keypad.addEventListener('click', (e) => {
        const btn = e.target.closest('.key-btn');
        if (!btn) return;
        const num = btn.dataset.num;
        if (btn.classList.contains('key-delete')) {
            deletePin();
        } else if (num !== undefined) {
            addPin(num);
        }
    });
}
function addPin(num) {
    if (currentPin.length >= 6) return;
    currentPin += num;
    updateDots();
    if (currentPin.length === 6) {
        setTimeout(() => {
            verifyPin();
        }, 300);
    }
}
function deletePin() {
    if (currentPin.length === 0) return;
    currentPin = currentPin.slice(0, -1);
    updateDots();
    clearHint();
}
function updateDots() {
    const dots = document.querySelectorAll('#pinDots .dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('filled', 'error', 'success');
        if (i < currentPin.length) {
            dot.classList.add('filled');
        }
    });
}
function verifyPin() {
    const dots = document.querySelectorAll('#pinDots .dot');
    const hint = document.getElementById('pinHint');
    if (currentPin === CORRECT_PIN) {
        // PIN benar — success
        dots.forEach(dot => {
            dot.classList.remove('filled');
            dot.classList.add('success');
        });
        hint.style.color = '#44ff88';
        hint.textContent = '💕 Unlocked!';
        // Pindah ke loading GIF dulu, baru greeting
        setTimeout(() => {
            switchSection('pin-section', 'loading-section');
            // Setelah GIF selesai, pindah ke greeting
            setTimeout(() => {
                switchSection('loading-section', 'greeting-section');
            }, 3000); // Sesuaikan dengan durasi loading.gif
        }, 1500);
    } else {
        // PIN salah — error shake
        dots.forEach(dot => {
            dot.classList.remove('filled');
            dot.classList.add('error');
        });
        hint.style.color = '#ff4444';
        hint.textContent = 'PIN salah, coba lagi ya 💔';
        setTimeout(() => {
            currentPin = '';
            dots.forEach(dot => {
                dot.classList.remove('error');
            });
        }, 800);
    }
}
function clearHint() {
    document.getElementById('pinHint').textContent = '';
}
/* ==========================================
   LOVE BUBBLES - Gelembung hati melayang
   ========================================== */
function createLoveBubbles() {
    const container = document.getElementById('loveParticles');
    if (!container) return;
    const hearts = ['💕', '❤️', '💖', '💗', '💓', '♥️', '💘', '💝'];
    const bubbleCount = window.innerWidth <= 430 ? 20 : 30;
    for (let i = 0; i < bubbleCount; i++) {
        setTimeout(() => {
            spawnLoveBubble(container, hearts);
        }, i * 300);
    }
    setInterval(() => {
        spawnLoveBubble(container, hearts);
    }, 800);
}
function spawnLoveBubble(container, hearts) {
    const bubble = document.createElement('span');
    bubble.classList.add('love-bubble');
    bubble.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    const posX = Math.random() * 90 + 5;
    const size = Math.random() * 1 + 1.2;
    const duration = Math.random() * 4 + 4;
    const delay = Math.random() * 1;
    bubble.style.cssText = `
        left: ${posX}%;
        bottom: 0;
        font-size: ${size}rem;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    container.appendChild(bubble);
    setTimeout(() => {
        bubble.remove();
    }, (duration + delay) * 1000);
}
/* ==========================================
   GREETING ANIMATION - Section 5
   Vinyl + Amplop + Musik
   ========================================== */
function initGreetingAnimation() {
    // Mulai musik saat masuk section ini
    // playMusic();


    // Init swipe gesture pada amplop
    initEnvelopeSwipe();
}
document.getElementById('startBtn').addEventListener('click', () => {
    playMusic();
});

/* ==========================================
   ENVELOPE SWIPE - Gesture buka amplop
   ========================================== */
function initEnvelopeSwipe() {
    const envelope = document.getElementById('envelope');
    const hint = document.getElementById('swipeHint');
    if (!envelope) return;

    let startX = 0;
    let isDragging = false;
    let opened = false;

    // Touch events (mobile)
    envelope.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    envelope.addEventListener('touchend', (e) => {
        if (!isDragging || opened) return;
        const endX = e.changedTouches[0].clientX;
        const diff = Math.abs(endX - startX);
        if (diff > 50) openEnvelope();
        isDragging = false;
    });

    // Mouse events (desktop)
    envelope.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    envelope.addEventListener('mouseup', (e) => {
        if (!isDragging || opened) return;
        const diff = Math.abs(e.clientX - startX);
        if (diff > 50) openEnvelope();
        isDragging = false;
    });

    // Shake hint animation
    setTimeout(() => {
        envelope.style.animation = 'envelopeShake 0.6s ease';
        setTimeout(() => { envelope.style.animation = ''; }, 600);
    }, 1000);
}

function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const flap = document.querySelector('.envelope-flap');
    const hint = document.getElementById('swipeHint');

    // Buka flap
    flap.classList.add('open');

    // Sembunyikan hint
    if (hint) hint.style.opacity = '0';

    // Animasi amplop menghilang
    setTimeout(() => {
        envelope.style.animation = 'envelopeOpen 0.7s ease forwards';
        setTimeout(() => {
            // Pindah ke section surat + foto
            switchSection('greeting-section', 'letter-section');
        }, 700);
    }, 600);
}

/* ==========================================
   LETTER SECTION - Section 6
   Ucapan + Typing + Gallery
   ========================================== */
const LETTER_TEXT = `Hari ini, 23 tahun yang lalu,
dunia menjadi jauh lebih indah
karenamu hadir. 💕

Selamat ulang tahun, Dek Luluk 🎂

Semoga setiap langkahmu selalu
diterangi cahaya kebahagiaan,
doa-doamu dikabulkan satu per satu,
dan hatimu selalu dipenuhi
cinta yang tulus.

Di usiamu yang ke-23 ini,
semoga kamu makin cantik, makin kuat,
dan selalu tersenyum seperti
yang bikin aku jatuh hati.

Aku bersyukur kamu ada
di hidupku. 🌹`;

function initLetterAnimation() {
    const paper = document.getElementById('letterPaper');
    const textEl = document.getElementById('letterText');
    const gallery = document.getElementById('galleryContainer');

    // Buat bintang kelap-kelip
    createStars();

    // Tampilkan kertas surat
    setTimeout(() => {
        paper.classList.add('show');
    }, 300);

    // Typing effect teks
    setTimeout(() => {
        typeText(textEl, LETTER_TEXT, 35);
    }, 800);

    // Tampilkan gallery setelah teks selesai
    const typingDuration = LETTER_TEXT.length * 35 + 1000;
    setTimeout(() => {
        gallery.classList.add('show');
        initGallery();

        // Tampilkan tombol tutup surat setelah gallery muncul
        setTimeout(() => {
            const closeBtn = document.getElementById('closeLetterBtn');
            if (closeBtn) {
                closeBtn.style.display = 'flex';
                closeBtn.classList.add('animate-fadeIn');
                closeBtn.addEventListener('click', () => {
                    closeLetterWithAnimation();
                });
            // const closeBtn = document.getElementById('closeLetterBtn');
            // if (closeBtn) {
            //     closeBtn.style.display = 'flex';
            //     closeBtn.classList.add('animate-fadeIn');
            //     closeBtn.addEventListener('click', () => {
            //         switchSection('letter-section', 'mystery-section');
            //     });
            }
        }, 800);
    }, typingDuration);
}

/* ==========================================
   CLOSE LETTER - Animasi surat tertutup
   ========================================== */
function closeLetterWithAnimation() {
    const letterPaper = document.getElementById('letterPaper');
    const closeBtn = document.getElementById('closeLetterBtn');

    // Sembunyikan tombol
    if (closeBtn) closeBtn.style.display = 'none';

    // Buat overlay gelap
    const overlay = document.createElement('div');
    overlay.className = 'close-overlay';
    document.body.appendChild(overlay);

    // Buat amplop yang akan muncul
    const envelope = document.createElement('div');
    envelope.className = 'closing-envelope';
    envelope.innerHTML = `
        <div class="ce-body"></div>
        <div class="ce-flap"></div>
    `;
    document.body.appendChild(envelope);

    // Step 1: Surat melipat & mengecil
    if (letterPaper) letterPaper.classList.add('closing');
    requestAnimationFrame(() => overlay.classList.add('show'));

    // Step 2: Amplop muncul "menelan" surat
    setTimeout(() => {
        envelope.classList.add('show');
    }, 700);

    // Step 3: Bersihkan & pindah section
    setTimeout(() => {
        overlay.remove();
        envelope.remove();
        if (letterPaper) letterPaper.classList.remove('closing');
        switchSection('letter-section', 'mystery-section');
    }, 1900);
}

/* ==========================================
   TYPING EFFECT
   ========================================== */
function typeText(el, text, speed) {
    let i = 0;
    el.textContent = '';
    const interval = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) clearInterval(interval);
    }, speed);
}

/* ==========================================
   MYSTERY SECTION - Section 7
   ========================================== */
function initMysterySection() {
    // Bintang background
    createMysteryStars();

    // Bangun pola love
    setTimeout(() => {
        buildLovePattern();
    }, 400);

    // Tampilkan teks mystery
    setTimeout(() => {
        const textBox = document.querySelector('.mystery-text-container');
        if (textBox) textBox.classList.add('show');
    }, 2200);
}

function createMysteryStars() {
    const container = document.getElementById('mysteryStars');
    if (!container) return;
    container.innerHTML = '';
    const count = window.innerWidth <= 430 ? 50 : 80;
    const types = ['', 'pink', 'soft'];
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const type = types[Math.floor(Math.random() * types.length)];
        if (type) star.classList.add(type);
        const size = Math.random() * 2.5 + 1;
        star.style.cssText = `
            width: ${size}px; height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 4 + 3}s;
            animation-delay: ${Math.random() * 6}s;
        `;
        container.appendChild(star);
    }
}

/* ==========================================
   LOVE PATTERN - Bentuk pola hati dari foto & icon
   ========================================== */
function buildLovePattern() {
    const container = document.getElementById('lovePattern');
    if (!container) return;

    // Pola hati 9x9 (1 = isi, 0 = kosong)
    const HEART_GRID = [
        [0,0,1,1,0,1,1,0,0],
        [0,1,1,1,1,1,1,1,0],
        [1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1],
        [0,1,1,1,1,1,1,1,0],
        [0,0,1,1,1,1,1,0,0],
        [0,0,0,1,1,1,0,0,0],
        [0,0,0,0,1,0,0,0,0],
    ];

    const cols = HEART_GRID[0].length;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.innerHTML = '';

    // Foto yang tersedia (7 foto)
    const photos = [
        'assets/img/foto1.jpg','assets/img/foto2.jpg','assets/img/foto3.jpg',
        'assets/img/foto4.jpg','assets/img/foto5.jpg','assets/img/foto6.jpg',
        'assets/img/foto7.jpg','assets/img/foto8.jpg','assets/img/foto9.jpg',
        'assets/img/foto10.jpg','assets/img/foto11.jpg','assets/img/foto12.jpg'
    ];
    const icons = ['💕','❤️','💖','💗','💓','💘','💝','🌹'];

    let photoIdx = 0;
    let cellIndex = 0;

    HEART_GRID.forEach((row, r) => {
        row.forEach((val, c) => {
            const cell = document.createElement('div');
            cell.classList.add('pattern-cell');

            if (val === 1) {
                cell.classList.add('filled');
                cell.style.animationDelay = `${cellIndex * 0.06}s`;

                // Selang-seling foto dan icon
                if (photoIdx % 2 === 0 || cellIndex % 3 === 0) {
                    cell.classList.add('photo-cell');
                    const img = document.createElement('img');
                    img.src = photos[photoIdx % photos.length];
                    img.alt = `foto ${photoIdx + 1}`;
                    cell.appendChild(img);
                    photoIdx++;
                } else {
                    cell.classList.add('icon-cell');
                    cell.textContent = icons[cellIndex % icons.length];
                }
                cellIndex++;
            }

            container.appendChild(cell);
        });
    });

    container.classList.add('show');
}

/* ==========================================
   STARS - Bintang kelap-kelip background
   ========================================== */
function createStars() {
    const container = document.getElementById('starsContainer');
    if (!container) return;
    container.innerHTML = '';

    const types = ['', 'pink', 'soft'];
    const count = window.innerWidth <= 430 ? 50 : 80;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random jenis warna
        const type = types[Math.floor(Math.random() * types.length)];
        if (type) star.classList.add(type);

        const size = Math.random() * 2.5 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 4 + 3;  // 3–7 detik (perlahan)
        const delay = Math.random() * 6;

        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        container.appendChild(star);
    }
}

/* ==========================================
   GALLERY SWIPE - Foto Kenangan
   ========================================== */
let currentSlide = 0;
const totalSlides = 7;

function initGallery() {
    const track = document.getElementById('galleryTrack');
    const dots = document.querySelectorAll('.gdot');
    const prevBtn = document.getElementById('arrowPrev');
    const nextBtn = document.getElementById('arrowNext');
    if (!track) return;

    // Set tinggi track berdasarkan gambar pertama
    const firstImg = track.querySelector('.gallery-img');
    if (firstImg) {
        firstImg.addEventListener('load', () => {
            track.style.height = firstImg.offsetHeight + 'px';
        });
        if (firstImg.complete) {
            track.style.height = (window.innerWidth <= 430 ? 180 : 220) + 'px';
        }
    }

    // Set posisi awal semua slides
    goToSlide(0);

    let startX = 0;

    // Touch swipe
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        const diff = e.changedTouches[0].clientX - startX;
        if (diff < -50 && currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
        if (diff > 50 && currentSlide > 0) goToSlide(currentSlide - 1);
    });

    // Mouse swipe
    track.addEventListener('mousedown', (e) => { startX = e.clientX; });
    track.addEventListener('mouseup', (e) => {
        const diff = e.clientX - startX;
        if (diff < -50 && currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
        if (diff > 50 && currentSlide > 0) goToSlide(currentSlide - 1);
    });

    // Arrow buttons
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) goToSlide(currentSlide - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) goToSlide(currentSlide + 1);
    });

    // Dots click
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gdot');
    const prevBtn = document.getElementById('arrowPrev');
    const nextBtn = document.getElementById('arrowNext');

    currentSlide = index;

    // Posisikan semua slides
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    });

    // Update dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });

    // Update arrow state
    if (prevBtn) prevBtn.classList.toggle('disabled', currentSlide === 0);
    if (nextBtn) nextBtn.classList.toggle('disabled', currentSlide === totalSlides - 1);
}
/* ==========================================
   RIPPLE EFFECT - Efek gelombang saat klik
   ========================================== */
function createRipple(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 45, 149, 0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    `;
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    setTimeout(() => {
        ripple.remove();
    }, 600);
}
/* ==========================================
   UTILITY - Inject CSS ripple animation
   ========================================== */
(function injectRippleCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(2.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();
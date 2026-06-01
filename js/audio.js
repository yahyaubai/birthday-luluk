/* ==========================================
   AUDIO.JS - Kontrol Musik Background
   ========================================== */

let bgMusic = null;
let isMusicPlaying = false;

// /* ==========================================
//    INIT MUSIC - Siapkan audio
//    Panggil setelah user interaksi pertama
//    ========================================== */
// function initMusic() {
//     if (bgMusic) return;

//     bgMusic = new Audio('assets/audio/birthday.mp3');
//     bgMusic.loop = true;
//     bgMusic.volume = 0.5;

//     // Preload
//     bgMusic.preload = 'auto';
// }

// /* ==========================================
//    PLAY MUSIC - Mainkan musik
//    ========================================== */
// function playMusic() {
//     if (!bgMusic) initMusic();
//     if (isMusicPlaying) return;

//     bgMusic.play().then(() => {
//         isMusicPlaying = true;
//         fadeInMusic();
//     }).catch((err) => {
//         // Autoplay blocked — akan dicoba ulang saat ada interaksi
//         console.warn('Autoplay blocked:', err);
//     });
// }

// /* ==========================================
//    FADE IN - Naikkan volume perlahan
//    ========================================== */
// function fadeInMusic() {
//     bgMusic.volume = 0;
//     let vol = 0;
//     const fade = setInterval(() => {
//         vol += 0.05;
//         if (vol >= 0.55) {
//             bgMusic.volume = 0.55;
//             clearInterval(fade);
//         } else {
//             bgMusic.volume = vol;
//         }
//     }, 120);
// }

// /* ==========================================
//    PAUSE / RESUME
//    ========================================== */
// function pauseMusic() {
//     if (!bgMusic || !isMusicPlaying) return;
//     bgMusic.pause();
//     isMusicPlaying = false;
// }

// function resumeMusic() {
//     if (!bgMusic || isMusicPlaying) return;
//     bgMusic.play();
//     isMusicPlaying = true;
// }

// /* ==========================================
//    TOGGLE - Pause/Play
//    ========================================== */
// function toggleMusic() {
//     if (isMusicPlaying) {
//         pauseMusic();
//     } else {
//         resumeMusic();
//     }
//     return isMusicPlaying;
// }
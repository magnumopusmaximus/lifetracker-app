// ============================================================================
// support.js – WERBUNG KOMPLETT DEAKTIVIERT
// ============================================================================

console.warn('WERBUNG IST AUS – ALLES BLOCKIERT');

// === KEINE FUNKTIONEN MEHR ===
function watchVideoAd() { return false; }
function showAdAndReward() { return false; }
function showAdModal() { return false; }
function displayNextAd() { return false; }
function displayAdFallback() { return false; }
function handleAdComplete() { return false; }
function completeAllAds() { return false; }
function showSupportModal() { return false; }

// === ALLE KLICKS IM QUICK MENU BLOCKIEREN ===
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.quick-menu-btn').forEach(btn => {
        btn.onclick = () => false;
    });
});

// === GLOBAL BLOCK ===
window.watchVideoAd = () => false;
window.showAdModal = () => false;
window.showSupportModal = () => false;

console.log('WERBUNG AUS – KEIN MODAL, KEINE NACHRICHT');
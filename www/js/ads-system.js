// ============================================================================
// ads-system.js – WERBUNG AUS, QUICK MENU FUNKTIONIERT 100%
// ============================================================================

// WERBUNG IMMER AUS
let adsRemoved = true;
localStorage.setItem('adsRemoved', 'true');

function areAdsRemoved() {
    return true;
}

// === KEINE WERBUNG ===
function showAdPopup() {
    // NICHTS – Werbung aus
    return;
}

// === QUICK MENU KLICKS DIREKT DURCHLASSEN ===
function initAdTriggers() {
    const quickMenuBtns = document.querySelectorAll('.quick-menu-btn');
    quickMenuBtns.forEach(btn => {
        const originalOnclick = btn.getAttribute('onclick');
        if (originalOnclick) {
            // Entferne den alten Listener (falls vorhanden)
            btn.onclick = null;
            // Setze neuen, direkten Klick
            btn.onclick = () => {
                eval(originalOnclick); // z. B. showWeeklySummary()
            };
        }
    });
    console.log('Quick Menu: Werbung AUS, Funktionen DIREKT');
}

// === Rest bleibt, aber tut nichts ===
function createRemoveAdsButton() {}
function updateRemoveAdsButton() {}
function showRemoveAdsModal() {}
function closeRemoveAdsModal() {}
function purchaseRemoveAds() {}
function showSuccessNotification() {}
function updatePdfButtonUI() {}

// === Init ===
function initAdsSystem() {
    console.log('WERBUNG AUS – Quick Menu läuft normal');
    initAdTriggers(); // Setzt direkte Klicks
}

// DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdsSystem);
} else {
    initAdsSystem();
}

// Export
window.showRemoveAdsModal = () => {};
window.areAdsRemoved = () => true;
window.showAdPopup = () => {};
// ================================================================================
// PRO VERSION SYSTEM - €2,99 Einmalig / Keine Werbung + PDF Export
// ================================================================================

// 🔧 TESTING MODE - Setze auf FALSE für echten Release!
const PRO_FEATURE_ENABLED = false; // ← HIER ANPASSEN: true = Pro aktiv, false = Pro deaktiviert

// ✅ Pro Status
let isPro = PRO_FEATURE_ENABLED && localStorage.getItem('lifetracker_pro') === 'true';
const PRO_PRICE = '2.99';
const PRO_CURRENCY = 'EUR';

console.log('👑 Pro Status:', isPro ? '✅ PRO' : '❌ FREE');
console.log('🔧 Pro Features:', PRO_FEATURE_ENABLED ? '✅ ENABLED' : '❌ DISABLED (TESTING MODE)');

// ================================================================================
// INIT - Prüfe Pro Status beim Start
// ================================================================================

function initProSystem() {
    updateProUI();
    updateAdsVisibility();
    updatePdfVisibility();
    console.log('✅ Pro System initialisiert');
}

// ================================================================================
// PRO UI UPDATE
// ================================================================================

function updateProUI() {
    const proButton = document.querySelector('.remove-ads-btn');
    
    if (!PRO_FEATURE_ENABLED) {
        // Pro Features komplett deaktiviert - Button IMMER verstecken
        if (proButton) {
            proButton.style.display = 'none !important';
            proButton.style.visibility = 'hidden';
            console.log('🔒 Pro Button versteckt (Features deaktiviert)');
        }
        return;
    }
    
    if (isPro) {
        // Pro aktiv - Button ändert sich
        if (proButton) {
            proButton.textContent = '✨';
            proButton.style.opacity = '1';
            proButton.style.display = 'block';
            proButton.onclick = () => showProActiveModal();
        }
        document.body.setAttribute('data-pro', 'true');
    } else {
        // Free - normaler Button
        if (proButton) {
            proButton.textContent = '👑';
            proButton.style.opacity = '0.8';
            proButton.style.display = 'block';
            proButton.onclick = () => showRemoveAdsModal();
        }
        document.body.removeAttribute('data-pro');
    }
}

// ================================================================================
// WERBUNG VISIBILITY
// ================================================================================

function updateAdsVisibility() {
    const quickMenuWerbung = document.querySelector('.quick-menu');
    
    if (isPro) {
        // Keine Werbung wenn Pro
        if (quickMenuWerbung) {
            quickMenuWerbung.style.display = 'none';
        }
        console.log('🚫 Werbung ausgeblendet (Pro)');
    } else {
        // Werbung zeigen wenn Free
        if (quickMenuWerbung) {
            quickMenuWerbung.style.display = 'flex';
        }
        console.log('📺 Werbung aktiv (Free)');
    }
}

// ================================================================================
// PDF EXPORT VISIBILITY
// ================================================================================

function updatePdfVisibility() {
    const pdfSection = document.getElementById('pdfExportSection');
    
    if (PRO_FEATURE_ENABLED && isPro) {
        // PDF verfügbar (nur wenn Pro enabled UND aktiv)
        if (pdfSection) {
            pdfSection.style.display = 'block';
            pdfSection.classList.add('pro-feature');
        }
        console.log('📄 PDF Export verfügbar (Pro)');
    } else {
        // PDF nicht verfügbar
        if (pdfSection) {
            pdfSection.style.display = 'none';
        }
        console.log('🔒 PDF Export gesperrt');
    }
}

// ================================================================================
// PRO MODAL - KAUFEN
// ================================================================================

function showRemoveAdsModal() {
    if (!PRO_FEATURE_ENABLED) {
        console.log('⚠️ Pro Features sind deaktiviert');
        return;
    }
    
    const modal = document.getElementById('removeAdsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeRemoveAdsModal() {
    const modal = document.getElementById('removeAdsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// ================================================================================
// PRO KAUFPROZESS
// ================================================================================

function buyProVersion() {
    if (!PRO_FEATURE_ENABLED) {
        console.log('⚠️ Pro Features sind deaktiviert');
        return;
    }
    
    console.log('💳 Starte Pro-Kaufprozess...');
    
    // Zeige Loading
    const loadingNotif = document.createElement('div');
    loadingNotif.className = 'ad-notification';
    loadingNotif.innerHTML = `
        <div class="ad-notification-content">
            <div class="ad-notification-icon">⏳</div>
            <div class="ad-notification-text">
                <strong>Processing Payment...</strong><br>
                €2,99 - LifeTracker Pro
            </div>
        </div>
    `;
    document.body.appendChild(loadingNotif);
    setTimeout(() => loadingNotif.classList.add('show'), 100);
    
    // Simuliere Zahlungsprozess
    setTimeout(() => {
        // Zahlung erfolgreich
        activateProVersion();
        
        loadingNotif.classList.remove('show');
        setTimeout(() => loadingNotif.remove(), 300);
        
        closeRemoveAdsModal();
    }, 2000);
}

// ================================================================================
// PRO AKTIVIEREN
// ================================================================================

function activateProVersion() {
    if (!PRO_FEATURE_ENABLED) {
        console.log('⚠️ Pro Features sind deaktiviert');
        return;
    }
    
    console.log('✅ Pro-Version aktiviert!');
    
    // Speichere Pro Status
    localStorage.setItem('lifetracker_pro', 'true');
    isPro = true;
    
    // Update UI
    updateProUI();
    updateAdsVisibility();
    updatePdfVisibility();
    
    // Erfolgs-Nachricht
    showProSuccessNotification();
}

// ================================================================================
// ERFOLGS-NOTIFICATION
// ================================================================================

function showProSuccessNotification() {
    const notification = document.createElement('div');
    notification.className = 'thank-you-notification';
    notification.innerHTML = `
        <div class="thank-you-content">
            <div class="thank-you-icon">✨</div>
            <div class="thank-you-text">
                <strong>Welcome to Pro!</strong><br>
                ✅ PDF Export unlocked<br>
                ✅ No more ads<br>
                Thank you for supporting! 🙏
            </div>
        </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ================================================================================
// PRO AKTIV MODAL (Wenn schon Pro)
// ================================================================================

function showProActiveModal() {
    if (!PRO_FEATURE_ENABLED) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'proActiveModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">✨ LifeTracker Pro</h2>
                <button class="modal-close" onclick="document.getElementById('proActiveModal').remove()">&times;</button>
            </div>
            <div class="modal-body">
                <p><strong>Thank you for being a Pro member!</strong></p>
                <p>You have access to:</p>
                <ul>
                    <li>✅ PDF Export</li>
                    <li>✅ No Ads</li>
                    <li>✅ All Features</li>
                </ul>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// ================================================================================
// STARTUP
// ================================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProSystem);
} else {
    initProSystem();
}
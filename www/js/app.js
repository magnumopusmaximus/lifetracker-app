function init() {
    console.log('Initializing app...');
    
    initSwipe();
    loadProfile();
    setupProfileListeners();
    
    renderTrackers();
    renderHabits();
    renderStamina();
    renderStrength();
    renderFinance();
    
    updateStats();
    updateAddButtons();
    updateYearChart();
    
    if (typeof updateAllTexts === 'function') {
        updateAllTexts();
    }
    
    checkAchievements();
    
    setInterval(() => {
        if (trackers.some(t => t.active)) {
            renderTrackers();
        }
    }, 1000);
    
    console.log('App initialized!');
}

// ... rest vom Code

// Override save functions to check achievements
const originalSaveStaminaData = saveStaminaData;
saveStaminaData = function() {
    originalSaveStaminaData();
    checkAchievements();
};

const originalSaveStrengthData = saveStrengthData;
saveStrengthData = function() {
    originalSaveStrengthData();
    checkAchievements();
};

const originalSaveFinanceData = saveFinanceData;
saveFinanceData = function() {
    originalSaveFinanceData();
    checkAchievements();
};

const originalSaveData = saveData;
saveData = function() {
    originalSaveData();
    checkAchievements();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Am Ende von app.js hinzufügen:
if (typeof initProSystem === 'function') {
    initProSystem();
    console.log('🚀 Pro-System initialisiert');
}
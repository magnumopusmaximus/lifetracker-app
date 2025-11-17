// Screen Management
let currentScreen = 1; // 1 = homeScreen
const screenMap = ['habitsScreen', 'homeScreen', 'staminaScreen', 'strengthScreen', 'financeScreen', 'addictionsScreen'];
let isTransitioning = false;

function initSwipe() {
    console.log('🚀 Init Swipe - forcing home screen');
    
    // FORCE: Remove active from ALL screens first
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // FORCE: Set ONLY homeScreen to active
    const homeScreen = document.getElementById('homeScreen');
    if (homeScreen) {
        homeScreen.classList.add('active');
        console.log('✅ Home screen activated');
    } else {
        console.error('❌ Home screen not found!');
    }
    
    updateAddButtons();
}

function goToScreen(screenIndex) {
    if (isTransitioning) return;
    if (currentScreen === screenIndex) return;
    
    console.log('📱 Going to screen:', screenMap[screenIndex]);
    
    isTransitioning = true;
    currentScreen = screenIndex;
    showScreen(screenIndex);
    updateDots();
    updateAddButtons();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 300);
}

function showScreen(index) {
    const targetScreenId = screenMap[index];
    const targetScreen = document.getElementById(targetScreenId);
    
    if (!targetScreen) {
        console.error('❌ Screen not found:', targetScreenId);
        return;
    }
    
    console.log('🖼️  Showing screen:', targetScreenId);
    
    // Remove active from ALL screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Add active to target screen
    targetScreen.classList.add('active');
    targetScreen.scrollTop = 0;
    
    console.log('✅ Active screen is now:', targetScreenId);
}

function goToHome() {
    goToScreen(1); // 1 = homeScreen index
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentScreen);
    });
}

function updateAddButtons() {
    const buttons = document.querySelectorAll('.add-btn');
    buttons.forEach(btn => btn.style.display = 'none');
    
    const screenButtonMap = {
        0: 'habits',
        2: 'stamina',
        3: 'strength',
        4: 'finance',
        5: 'addictions'
    };
    
    const currentScreenType = screenButtonMap[currentScreen];
    if (currentScreenType) {
        const btn = document.querySelector(`.add-btn[data-screen="${currentScreenType}"]`);
        if (btn) {
            btn.style.display = 'block';
        }
    }
}
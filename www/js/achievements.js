// Achievements System - MIT ÜBERSETZUNGEN
let achievements = JSON.parse(localStorage.getItem('achievements') || '[]');

function getAchievementDefinitions() {
    const defs = {
        de: [
            { id: 'strength_first', name: 'Erste Kraft', desc: '1 Training', icon: '💪', target: 1, progress: () => strengthEntries.length },
            { id: 'strength_10', name: 'Power Start', desc: '10 Trainings', icon: '🏋️', target: 10, progress: () => strengthEntries.length },
            { id: 'strength_50', name: 'Kraftprotz', desc: '50 Trainings', icon: '💎', target: 50, progress: () => strengthEntries.length },
            { id: 'strength_100', name: 'Beast Mode', desc: '100 Trainings', icon: '🦍', target: 100, progress: () => strengthEntries.length },
            
            { id: 'stamina_first', name: 'Erste Ausdauer', desc: '1 Training', icon: '⚡', target: 1, progress: () => staminaEntries.length },
            { id: 'stamina_10', name: 'Marathon Start', desc: '10 Trainings', icon: '🏃', target: 10, progress: () => staminaEntries.length },
            { id: 'stamina_50', name: 'Ausdauer-Held', desc: '50 Trainings', icon: '🔥', target: 50, progress: () => staminaEntries.length },
            { id: 'stamina_100', name: 'Unaufhaltsam', desc: '100 Trainings', icon: '⚡', target: 100, progress: () => staminaEntries.length },
            
            { id: 'habit_first', name: 'Erste Gewohnheit', desc: '1 Gewohnheit', icon: '✨', target: 1, progress: () => habits.length },
            { id: 'habit_streak_7', name: 'Woche Strong', desc: '7 Tage Streak', icon: '📅', target: 7, progress: () => getLongestStreak() },
            { id: 'habit_streak_30', name: 'Monat Meister', desc: '30 Tage', icon: '🔥', target: 30, progress: () => getLongestStreak() },
            { id: 'habit_streak_100', name: 'Unzerbrechlich', desc: '100 Tage', icon: '💯', target: 100, progress: () => getLongestStreak() },
            
            { id: 'finance_first', name: 'Erstes Sparen', desc: '1 Einlage', icon: '💰', target: 1, progress: () => financeEntries.length },
            { id: 'finance_1000', name: 'Tausender', desc: '€1000', icon: '💎', target: 1000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            { id: 'finance_5000', name: 'Fünftausender', desc: '€5000', icon: '🏆', target: 5000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            
            { id: 'addiction_first', name: 'Erster Tracker', desc: '1 Tracker', icon: '🎯', target: 1, progress: () => trackers.length },
            { id: 'addiction_week', name: 'Clean Week', desc: '7 Tage', icon: '✅', target: 7, progress: () => getMaxCleanDays() },
            { id: 'addiction_month', name: 'Clean Month', desc: '30 Tage', icon: '🌟', target: 30, progress: () => getMaxCleanDays() },
            
            { id: 'perfect_week', name: 'Perfekte Woche', desc: 'Alle Habits 7 Tage', icon: '⭐', target: 1, progress: () => checkPerfectWeek() },
            { id: 'total_100', name: 'Zenturio', desc: '100 Aktivitäten', icon: '💯', target: 100, progress: () => strengthEntries.length + staminaEntries.length }
        ],
        en: [
            { id: 'strength_first', name: 'First Strength', desc: '1 Training', icon: '💪', target: 1, progress: () => strengthEntries.length },
            { id: 'strength_10', name: 'Power Start', desc: '10 Trainings', icon: '🏋️', target: 10, progress: () => strengthEntries.length },
            { id: 'strength_50', name: 'Strong One', desc: '50 Trainings', icon: '💎', target: 50, progress: () => strengthEntries.length },
            { id: 'strength_100', name: 'Beast Mode', desc: '100 Trainings', icon: '🦍', target: 100, progress: () => strengthEntries.length },
            
            { id: 'stamina_first', name: 'First Stamina', desc: '1 Training', icon: '⚡', target: 1, progress: () => staminaEntries.length },
            { id: 'stamina_10', name: 'Marathon Start', desc: '10 Trainings', icon: '🏃', target: 10, progress: () => staminaEntries.length },
            { id: 'stamina_50', name: 'Stamina Hero', desc: '50 Trainings', icon: '🔥', target: 50, progress: () => staminaEntries.length },
            { id: 'stamina_100', name: 'Unstoppable', desc: '100 Trainings', icon: '⚡', target: 100, progress: () => staminaEntries.length },
            
            { id: 'habit_first', name: 'First Habit', desc: '1 Habit', icon: '✨', target: 1, progress: () => habits.length },
            { id: 'habit_streak_7', name: 'Week Strong', desc: '7 Days Streak', icon: '📅', target: 7, progress: () => getLongestStreak() },
            { id: 'habit_streak_30', name: 'Month Master', desc: '30 Days', icon: '🔥', target: 30, progress: () => getLongestStreak() },
            { id: 'habit_streak_100', name: 'Unbreakable', desc: '100 Days', icon: '💯', target: 100, progress: () => getLongestStreak() },
            
            { id: 'finance_first', name: 'First Savings', desc: '1 Entry', icon: '💰', target: 1, progress: () => financeEntries.length },
            { id: 'finance_1000', name: 'Thousander', desc: '€1000', icon: '💎', target: 1000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            { id: 'finance_5000', name: 'Five Thousand', desc: '€5000', icon: '🏆', target: 5000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            
            { id: 'addiction_first', name: 'First Tracker', desc: '1 Tracker', icon: '🎯', target: 1, progress: () => trackers.length },
            { id: 'addiction_week', name: 'Clean Week', desc: '7 Days', icon: '✅', target: 7, progress: () => getMaxCleanDays() },
            { id: 'addiction_month', name: 'Clean Month', desc: '30 Days', icon: '🌟', target: 30, progress: () => getMaxCleanDays() },
            
            { id: 'perfect_week', name: 'Perfect Week', desc: 'All Habits 7 Days', icon: '⭐', target: 1, progress: () => checkPerfectWeek() },
            { id: 'total_100', name: 'Centurion', desc: '100 Activities', icon: '💯', target: 100, progress: () => strengthEntries.length + staminaEntries.length }
        ],
        ru: [
            { id: 'strength_first', name: 'Первая Сила', desc: '1 Тренировка', icon: '💪', target: 1, progress: () => strengthEntries.length },
            { id: 'strength_10', name: 'Старт Силы', desc: '10 Тренировок', icon: '🏋️', target: 10, progress: () => strengthEntries.length },
            { id: 'strength_50', name: 'Силач', desc: '50 Тренировок', icon: '💎', target: 50, progress: () => strengthEntries.length },
            { id: 'strength_100', name: 'Режим Зверя', desc: '100 Тренировок', icon: '🦍', target: 100, progress: () => strengthEntries.length },
            
            { id: 'stamina_first', name: 'Первая Выносливость', desc: '1 Тренировка', icon: '⚡', target: 1, progress: () => staminaEntries.length },
            { id: 'stamina_10', name: 'Марафон Старт', desc: '10 Тренировок', icon: '🏃', target: 10, progress: () => staminaEntries.length },
            { id: 'stamina_50', name: 'Герой Выносливости', desc: '50 Тренировок', icon: '🔥', target: 50, progress: () => staminaEntries.length },
            { id: 'stamina_100', name: 'Неудержимый', desc: '100 Тренировок', icon: '⚡', target: 100, progress: () => staminaEntries.length },
            
            { id: 'habit_first', name: 'Первая Привычка', desc: '1 Привычка', icon: '✨', target: 1, progress: () => habits.length },
            { id: 'habit_streak_7', name: 'Неделя Силы', desc: '7 Дней Серия', icon: '📅', target: 7, progress: () => getLongestStreak() },
            { id: 'habit_streak_30', name: 'Мастер Месяца', desc: '30 Дней', icon: '🔥', target: 30, progress: () => getLongestStreak() },
            { id: 'habit_streak_100', name: 'Несокрушимый', desc: '100 Дней', icon: '💯', target: 100, progress: () => getLongestStreak() },
            
            { id: 'finance_first', name: 'Первые Сбережения', desc: '1 Запись', icon: '💰', target: 1, progress: () => financeEntries.length },
            { id: 'finance_1000', name: 'Тысячник', desc: '€1000', icon: '💎', target: 1000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            { id: 'finance_5000', name: 'Пять Тысяч', desc: '€5000', icon: '🏆', target: 5000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            
            { id: 'addiction_first', name: 'Первый Трекер', desc: '1 Трекер', icon: '🎯', target: 1, progress: () => trackers.length },
            { id: 'addiction_week', name: 'Чистая Неделя', desc: '7 Дней', icon: '✅', target: 7, progress: () => getMaxCleanDays() },
            { id: 'addiction_month', name: 'Чистый Месяц', desc: '30 Дней', icon: '🌟', target: 30, progress: () => getMaxCleanDays() },
            
            { id: 'perfect_week', name: 'Идеальная Неделя', desc: 'Все Привычки 7 Дней', icon: '⭐', target: 1, progress: () => checkPerfectWeek() },
            { id: 'total_100', name: 'Центурион', desc: '100 Активностей', icon: '💯', target: 100, progress: () => strengthEntries.length + staminaEntries.length }
        ],
        es: [
            { id: 'strength_first', name: 'Primera Fuerza', desc: '1 Entrenamiento', icon: '💪', target: 1, progress: () => strengthEntries.length },
            { id: 'strength_10', name: 'Inicio Power', desc: '10 Entrenamientos', icon: '🏋️', target: 10, progress: () => strengthEntries.length },
            { id: 'strength_50', name: 'Fuerte', desc: '50 Entrenamientos', icon: '💎', target: 50, progress: () => strengthEntries.length },
            { id: 'strength_100', name: 'Modo Bestia', desc: '100 Entrenamientos', icon: '🦍', target: 100, progress: () => strengthEntries.length },
            
            { id: 'stamina_first', name: 'Primera Resistencia', desc: '1 Entrenamiento', icon: '⚡', target: 1, progress: () => staminaEntries.length },
            { id: 'stamina_10', name: 'Inicio Maratón', desc: '10 Entrenamientos', icon: '🏃', target: 10, progress: () => staminaEntries.length },
            { id: 'stamina_50', name: 'Héroe Resistencia', desc: '50 Entrenamientos', icon: '🔥', target: 50, progress: () => staminaEntries.length },
            { id: 'stamina_100', name: 'Imparable', desc: '100 Entrenamientos', icon: '⚡', target: 100, progress: () => staminaEntries.length },
            
            { id: 'habit_first', name: 'Primer Hábito', desc: '1 Hábito', icon: '✨', target: 1, progress: () => habits.length },
            { id: 'habit_streak_7', name: 'Semana Fuerte', desc: '7 Días Racha', icon: '📅', target: 7, progress: () => getLongestStreak() },
            { id: 'habit_streak_30', name: 'Maestro Mes', desc: '30 Días', icon: '🔥', target: 30, progress: () => getLongestStreak() },
            { id: 'habit_streak_100', name: 'Inquebrantable', desc: '100 Días', icon: '💯', target: 100, progress: () => getLongestStreak() },
            
            { id: 'finance_first', name: 'Primeros Ahorros', desc: '1 Entrada', icon: '💰', target: 1, progress: () => financeEntries.length },
            { id: 'finance_1000', name: 'Mil', desc: '€1000', icon: '💎', target: 1000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            { id: 'finance_5000', name: 'Cinco Mil', desc: '€5000', icon: '🏆', target: 5000, progress: () => financeEntries.reduce((sum, e) => sum + e.amount, 0) },
            
            { id: 'addiction_first', name: 'Primer Rastreador', desc: '1 Rastreador', icon: '🎯', target: 1, progress: () => trackers.length },
            { id: 'addiction_week', name: 'Semana Limpia', desc: '7 Días', icon: '✅', target: 7, progress: () => getMaxCleanDays() },
            { id: 'addiction_month', name: 'Mes Limpio', desc: '30 Días', icon: '🌟', target: 30, progress: () => getMaxCleanDays() },
            
            { id: 'perfect_week', name: 'Semana Perfecta', desc: 'Todos Hábitos 7 Días', icon: '⭐', target: 1, progress: () => checkPerfectWeek() },
            { id: 'total_100', name: 'Centurión', desc: '100 Actividades', icon: '💯', target: 100, progress: () => strengthEntries.length + staminaEntries.length }
        ]
    };
    
    return defs[currentLanguage] || defs.de;
}

function getLongestStreak() {
    let maxStreak = 0;
    habits.forEach(habit => {
        if (habit.dates) {
            let streak = 0;
            const now = new Date();
            for (let i = 0; i < 365; i++) {
                const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
                const dateStr = date.toDateString();
                if (habit.dates[dateStr]) {
                    streak++;
                } else {
                    break;
                }
            }
            maxStreak = Math.max(maxStreak, streak);
        }
    });
    return maxStreak;
}

function getMaxCleanDays() {
    let maxDays = 0;
    trackers.forEach(tracker => {
        let totalTime = tracker.elapsedTime || 0;
        if (tracker.active && tracker.startTime) {
            totalTime += Date.now() - tracker.startTime;
        }
        const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
        maxDays = Math.max(maxDays, days);
    });
    return maxDays;
}

function checkPerfectWeek() {
    if (habits.length === 0) return 0;
    const now = new Date();
    for (let day = 0; day < 7; day++) {
        const date = new Date(now.getTime() - (day * 24 * 60 * 60 * 1000));
        const dateStr = date.toDateString();
        if (!habits.every(h => h.dates && h.dates[dateStr])) return 0;
    }
    return 1;
}

function checkAchievements() {
    let newAchievements = [];
    const achievementDefinitions = getAchievementDefinitions();
    
    achievementDefinitions.forEach(def => {
        const unlocked = achievements.includes(def.id);
        const currentProgress = def.progress();
        
        if (!unlocked && currentProgress >= def.target) {
            achievements.push(def.id);
            newAchievements.push(def);
        }
    });
    
    if (newAchievements.length > 0) {
        localStorage.setItem('achievements', JSON.stringify(achievements));
        showAchievementNotification(newAchievements[0]);
    }
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <div class="achievement-title">${t('achievementUnlocked')}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.desc}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    
    let touchStartX = 0;
    
    notification.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    notification.addEventListener('touchmove', (e) => {
        const touchMoveX = e.touches[0].clientX;
        const diff = touchStartX - touchMoveX;
        if (diff > 50) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }
    });
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showAchievementsModal() {
    const modal = document.getElementById('achievementsModal');
    if (!modal) return;
    
    const list = document.getElementById('achievementsList');
    list.innerHTML = '';
    
    const achievementDefinitions = getAchievementDefinitions();
    
    achievementDefinitions.forEach(def => {
        const unlocked = achievements.includes(def.id);
        const currentProgress = def.progress();
        const percentage = Math.min((currentProgress / def.target) * 100, 100);
        
        const card = document.createElement('div');
        card.className = `achievement-card ${unlocked ? 'unlocked' : ''}`;
        
        card.innerHTML = `
            <div class="achievement-card-icon ${unlocked ? '' : 'locked-icon'}">${unlocked ? def.icon : '🔒'}</div>
            <div class="achievement-card-content">
                <div class="achievement-card-name">${def.name}</div>
                <div class="achievement-card-desc">${def.desc}</div>
                ${!unlocked ? `
                    <div class="achievement-progress-bar">
                        <div class="achievement-progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <div class="achievement-progress-text">${currentProgress} / ${def.target}</div>
                ` : `<div class="achievement-unlocked-badge">${t('achievementCheck')}</div>`}
            </div>
        `;
        
        list.appendChild(card);
    });
    
    const unlockedCount = achievements.length;
    const totalCount = achievementDefinitions.length;
    document.getElementById('achievementsCount').textContent = `${unlockedCount} / ${totalCount} ${t('unlocked')}`;
    
    modal.classList.add('show');
}

function closeAchievementsModal() {
    document.getElementById('achievementsModal').classList.remove('show');
}
// Weekly Summary
function showWeeklySummary() {
    const modal = document.getElementById('weeklySummaryModal');
    if (!modal) return;
    
    const now = new Date();
    const weekStart = new Date(now.getTime() - (6 * 24 * 60 * 60 * 1000));
    
    // Calculate stats
    const weekStrength = strengthEntries.filter(e => {
        const date = new Date(e.date);
        return date >= weekStart && date <= now;
    }).length;
    
    const weekStamina = staminaEntries.filter(e => {
        const date = new Date(e.date);
        return date >= weekStart && date <= now;
    }).length;
    
    const weekFinance = financeEntries.filter(e => {
        const date = new Date(e.date);
        return date >= weekStart && date <= now;
    }).reduce((sum, e) => sum + e.amount, 0);
    
    // Habit completion
    let habitCompletions = 0;
    let totalPossible = habits.length * 7;
    
    habits.forEach(habit => {
        if (habit.dates) {
            for (let i = 0; i < 7; i++) {
                const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
                const dateStr = date.toDateString();
                if (habit.dates[dateStr]) {
                    habitCompletions++;
                }
            }
        }
    });
    
    const habitRate = totalPossible > 0 ? ((habitCompletions / totalPossible) * 100).toFixed(0) : 0;
    
    // Clean days
    let cleanDays = 0;
    trackers.forEach(tracker => {
        if (tracker.mode === 'clean' && tracker.active) {
            let totalTime = tracker.elapsedTime || 0;
            if (tracker.startTime) {
                totalTime += Date.now() - tracker.startTime;
            }
            const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
            cleanDays = Math.max(cleanDays, days);
        }
    });
    
    // Daily breakdown
    let dailyHTML = '<div class="weekly-daily-grid">';
    const days = t('daysShort');
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const dateStr = date.toDateString();
        const dayName = days[6 - i];
        
        const hasStrength = strengthEntries.some(e => new Date(e.date).toDateString() === dateStr);
        const hasStamina = staminaEntries.some(e => new Date(e.date).toDateString() === dateStr);
        const hasHabit = habits.some(h => h.dates && h.dates[dateStr]);
        
        let activities = [];
        if (hasStrength) activities.push('💪');
        if (hasStamina) activities.push('⚡');
        if (hasHabit) activities.push('✅');
        
        dailyHTML += `
            <div class="weekly-day ${activities.length > 0 ? 'active' : ''}">
                <div class="weekly-day-name">${dayName}</div>
                <div class="weekly-day-icons">${activities.join(' ') || '-'}</div>
            </div>
        `;
    }
    dailyHTML += '</div>';
    
    // Build summary
    document.getElementById('weeklySummaryContent').innerHTML = `
        <div class="summary-stats-list">
            <div class="summary-stat-row">
                <div class="summary-stat-left">
                    <span class="summary-stat-icon">💪</span>
                    <span class="summary-stat-label">${t('strength')}</span>
                </div>
                <div class="summary-stat-value">${weekStrength}</div>
            </div>
            <div class="summary-stat-row">
                <div class="summary-stat-left">
                    <span class="summary-stat-icon">⚡</span>
                    <span class="summary-stat-label">${t('stamina')}</span>
                </div>
                <div class="summary-stat-value">${weekStamina}</div>
            </div>
            <div class="summary-stat-row">
                <div class="summary-stat-left">
                    <span class="summary-stat-icon">✅</span>
                    <span class="summary-stat-label">${t('habits')}</span>
                </div>
                <div class="summary-stat-value">${habitRate}%</div>
            </div>
            <div class="summary-stat-row">
                <div class="summary-stat-left">
                    <span class="summary-stat-icon">🚫</span>
                    <span class="summary-stat-label">${t('clean')} ${t('days')}</span>
                </div>
                <div class="summary-stat-value">${cleanDays}</div>
            </div>
            <div class="summary-stat-row">
                <div class="summary-stat-left">
                    <span class="summary-stat-icon">💰</span>
                    <span class="summary-stat-label">${t('saved')}</span>
                </div>
                <div class="summary-stat-value">€${weekFinance.toFixed(0)}</div>
            </div>
        </div>
        
        <div class="weekly-section-title">${t('thisWeek')}</div>
        ${dailyHTML}
        
        <div class="weekly-insights">
            ${weekStrength + weekStamina >= 5 ? 
                `<div class="insight-item positive">🔥 ${t('strongWeek')}</div>` : 
                `<div class="insight-item">💪 ${t('moreTraining')}</div>`}
            ${habitRate >= 80 ? 
                `<div class="insight-item positive">⭐ ${t('topHabits')}</div>` : 
                habitRate >= 50 ? 
                `<div class="insight-item">✨ ${t('goodConsistency')}</div>` :
                `<div class="insight-item">📈 ${t('focusHabits')}</div>`}
            ${cleanDays >= 7 ? 
                `<div class="insight-item positive">🎯 ${t('cleanWeekReached')}</div>` : ''}
        </div>
    `;
    
    modal.classList.add('show');
}

function closeWeeklySummary() {
    document.getElementById('weeklySummaryModal').classList.remove('show');
}
// Year Overview - Graph, Heatmap & Personality
let yearChart = null;
let personalityChart = null;
let activeDatasets = {
    strength: true,
    stamina: true,
    habits: true,
    addictions: true,
    finances: true
};

function switchView(viewType) {
    // Hide all views
    document.querySelectorAll('.overview-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Remove active from all toggle buttons
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected view
    if (viewType === 'graph') {
        document.getElementById('graphView').classList.add('active');
        document.querySelector('[data-view="graph"]').classList.add('active');
        updateYearChart();
    } else if (viewType === 'heatmap') {
        document.getElementById('heatmapView').classList.add('active');
        document.querySelector('[data-view="heatmap"]').classList.add('active');
        updateHeatmap();
    } else if (viewType === 'personality') {
        document.getElementById('personalityView').classList.add('active');
        document.querySelector('[data-view="personality"]').classList.add('active');
        updatePersonalityChart();
    }
}

function toggleDataset(dataset) {
    activeDatasets[dataset] = !activeDatasets[dataset];
    
    const btn = document.querySelector(`[data-dataset="${dataset}"]`);
    if (btn) {
        btn.classList.toggle('active');
    }
    
    updateYearChart();
}

function updateYearOverview() {
    const activeView = document.querySelector('.overview-view.active');
    if (!activeView) {
        updateYearChart();
        return;
    }
    
    const viewId = activeView.id;
    if (viewId === 'graphView') {
        updateYearChart();
    } else if (viewId === 'heatmapView') {
        updateHeatmap();
    } else if (viewId === 'personalityView') {
        updatePersonalityChart();
    }
}

function updateYearChart() {
    const ctx = document.getElementById('yearChart');
    if (!ctx) return;
    
    const now = new Date();
    const year = now.getFullYear();
    
    // Calculate monthly data
const months = t('months');
    
    const strengthData = new Array(12).fill(0);
    const staminaData = new Array(12).fill(0);
    const habitsData = new Array(12).fill(0);
    const addictionsData = new Array(12).fill(0);
    const financesData = new Array(12).fill(0);
    
    // Count strength entries
    if (typeof strengthEntries !== 'undefined' && strengthEntries.length > 0) {
        strengthEntries.forEach(entry => {
            const date = new Date(entry.date);
            if (date.getFullYear() === year) {
                strengthData[date.getMonth()]++;
            }
        });
    }
    
    // Count stamina entries
    if (typeof staminaEntries !== 'undefined' && staminaEntries.length > 0) {
        staminaEntries.forEach(entry => {
            const date = new Date(entry.date);
            if (date.getFullYear() === year) {
                staminaData[date.getMonth()]++;
            }
        });
    }
    
    // Count habit completions
    if (typeof habits !== 'undefined' && habits.length > 0) {
        habits.forEach(habit => {
            if (habit.dates) {
                Object.keys(habit.dates).forEach(dateStr => {
                    if (habit.dates[dateStr]) {
                        const date = new Date(dateStr);
                        if (date.getFullYear() === year) {
                            habitsData[date.getMonth()]++;
                        }
                    }
                });
            }
        });
    }
    
    // Count addiction clean days (simplified - show current streak per month)
    if (typeof trackers !== 'undefined' && trackers.length > 0) {
        trackers.forEach(tracker => {
            if (tracker.mode === 'clean' && tracker.elapsedTime) {
                const days = Math.floor(tracker.elapsedTime / (1000 * 60 * 60 * 24));
                const currentMonth = now.getMonth();
                addictionsData[currentMonth] = Math.max(addictionsData[currentMonth], days);
            }
        });
    }
    
    // Sum finance entries
    if (typeof financeEntries !== 'undefined' && financeEntries.length > 0) {
        financeEntries.forEach(entry => {
            const date = new Date(entry.date);
            if (date.getFullYear() === year) {
                financesData[date.getMonth()] += entry.amount;
            }
        });
    }
    
    // Prepare datasets
    const datasets = [];
    
    if (activeDatasets.strength) {
        datasets.push({
            label: 'Strength',
            data: strengthData,
            borderColor: '#ff4757',
            backgroundColor: 'rgba(255, 71, 87, 0.1)',
            tension: 0.4,
            fill: true
        });
    }
    
    if (activeDatasets.stamina) {
        datasets.push({
            label: 'Stamina',
            data: staminaData,
            borderColor: '#56ccf2',
            backgroundColor: 'rgba(86, 204, 242, 0.1)',
            tension: 0.4,
            fill: true
        });
    }
    
    if (activeDatasets.habits) {
        datasets.push({
            label: 'Habits',
            data: habitsData,
            borderColor: '#f7b731',
            backgroundColor: 'rgba(247, 183, 49, 0.1)',
            tension: 0.4,
            fill: true
        });
    }
    
    if (activeDatasets.addictions) {
        datasets.push({
            label: 'Addictions',
            data: addictionsData,
            borderColor: '#9b59b6',
            backgroundColor: 'rgba(155, 89, 182, 0.1)',
            tension: 0.4,
            fill: true
        });
    }
    
    if (activeDatasets.finances) {
        datasets.push({
            label: 'Finances',
            data: financesData.map(v => Math.round(v / 100)), // Scale down for better visualization
            borderColor: '#00d2a0',
            backgroundColor: 'rgba(0, 210, 160, 0.1)',
            tension: 0.4,
            fill: true
        });
    }
    
    // Destroy old chart
    if (yearChart) {
        yearChart.destroy();
    }
    
    // Find max value for scaling
    const allData = [
        ...strengthData,
        ...staminaData,
        ...habitsData,
        ...addictionsData,
        ...financesData.map(v => Math.round(v / 100))
    ];
    const maxValue = Math.max(...allData, 1);
    
    // Create new chart
    yearChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.ceil(maxValue * 1.2),
                    ticks: {
                        color: '#8b8b9e',
                        stepSize: Math.max(1, Math.ceil(maxValue / 5))
                    },
                    grid: {
                        color: 'rgba(139, 139, 158, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#8b8b9e'
                    },
                    grid: {
                        color: 'rgba(139, 139, 158, 0.05)'
                    }
                }
            }
        }
    });
}

function updateHeatmap() {
    const container = document.getElementById('heatmapContainer');
    if (!container) return;
    
    const now = new Date();
    const year = now.getFullYear();
    
    const activityMap = {};
    
    if (typeof strengthEntries !== 'undefined') {
        strengthEntries.forEach(entry => {
            const date = new Date(entry.date);
            if (date.getFullYear() === year) {
                const dateStr = date.toDateString();
                activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
            }
        });
    }
    
    if (typeof staminaEntries !== 'undefined') {
        staminaEntries.forEach(entry => {
            const date = new Date(entry.date);
            if (date.getFullYear() === year) {
                const dateStr = date.toDateString();
                activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
            }
        });
    }
    
    if (typeof habits !== 'undefined') {
        habits.forEach(habit => {
            if (habit.dates) {
                Object.keys(habit.dates).forEach(dateStr => {
                    if (habit.dates[dateStr]) {
                        const date = new Date(dateStr);
                        if (date.getFullYear() === year) {
                            activityMap[dateStr] = (activityMap[dateStr] || 0) + 1;
                        }
                    }
                });
            }
        });
    }
    
    let html = '<div class="heatmap-year-grid">';
    
    const months = t('months');
    
    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        html += '<div class="heatmap-month-row">';
        html += `<div class="heatmap-month-label">${months[month]}</div>`;
        html += '<div class="heatmap-days-row">';
        
        for (let day = 1; day <= 31; day++) {
            if (day <= daysInMonth) {
                const date = new Date(year, month, day);
                const dateStr = date.toDateString();
                const activity = activityMap[dateStr] || 0;
                
                let className = 'heatmap-day empty';
                if (activity >= 3) className = 'heatmap-day high';
                else if (activity >= 2) className = 'heatmap-day medium';
                else if (activity >= 1) className = 'heatmap-day low';
                
                html += `<div class="${className}" title="${date.toLocaleDateString()}: ${activity} activities"></div>`;
            } else {
                html += '<div class="heatmap-day invisible"></div>';
            }
        }
        
        html += '</div></div>';
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    const totalActiveDays = Object.keys(activityMap).length;
    
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const dateStr = date.toDateString();
        if (activityMap[dateStr]) {
            streak++;
        } else {
            break;
        }
    }
    
    const monthTotals = new Array(12).fill(0);
    Object.keys(activityMap).forEach(dateStr => {
        const date = new Date(dateStr);
        if (date.getFullYear() === year) {
            monthTotals[date.getMonth()] += activityMap[dateStr];
        }
    });
    const bestMonthIndex = monthTotals.indexOf(Math.max(...monthTotals));
    const bestMonth = months[bestMonthIndex];
    
    const weeksPassed = Math.ceil((now - new Date(year, 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    const avgWeek = weeksPassed > 0 ? (totalActiveDays / weeksPassed).toFixed(1) : 0;
    
    document.getElementById('heatmapTotalDays').textContent = totalActiveDays;
    document.getElementById('heatmapStreak').textContent = streak;
    document.getElementById('heatmapBestMonth').textContent = bestMonth || '-';
    document.getElementById('heatmapAvgWeek').textContent = avgWeek;
}

function updatePersonalityChart() {
    const ctx = document.getElementById('personalityChart');
    if (!ctx) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // Calculate scores
    const strengthCount = (typeof strengthEntries !== 'undefined') ? 
        strengthEntries.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
        }).length : 0;
    const strengthScore = Math.min((strengthCount / 4) * 10, 10);
    
    const staminaCount = (typeof staminaEntries !== 'undefined') ?
        staminaEntries.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
        }).length : 0;
    const staminaScore = Math.min((staminaCount / 4) * 10, 10);
    
    const habitScore = (typeof habits !== 'undefined') ? Math.min((habits.length * 2), 10) : 0;
    
    let addictionDays = 0;
    if (typeof trackers !== 'undefined') {
        trackers.forEach(tracker => {
            if (tracker.active && tracker.startTime) {
                addictionDays += (Date.now() - tracker.startTime) / (1000 * 60 * 60 * 24);
            }
        });
    }
    const addictionScore = Math.min((addictionDays / 7) * 3, 10);
    
    const financeAmount = (typeof financeEntries !== 'undefined') ?
        financeEntries.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
        }).reduce((sum, e) => sum + e.amount, 0) : 0;
    const financeScore = Math.min((financeAmount / 100), 10);
    
    if (personalityChart) {
        personalityChart.destroy();
    }
    
    const labels = ['💪', '⚡', '✅', '🚫', '💰'];
    
    personalityChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Your Stats',
                data: [strengthScore, staminaScore, habitScore, addictionScore, financeScore],
                backgroundColor: 'rgba(0, 212, 255, 0.2)',
                borderColor: '#00d4ff',
                borderWidth: 3,
                pointBackgroundColor: '#00d4ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { display: false },
                tooltip: {
callbacks: {
    title: function(context) {
        const index = context[0].dataIndex;
        const names = [t('strength'), t('stamina'), t('habits'), t('addictions'), t('finances')];
        return names[index];
    },
                        label: function(context) {
                            return 'Score: ' + context.parsed.r.toFixed(1) + '/10';
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 2,
                        color: '#8b8b9e',
                        backdropColor: 'transparent',
                        font: { size: 11 }
                    },
                    grid: {
                        color: 'rgba(139, 139, 158, 0.2)'
                    },
                    pointLabels: {
                        color: '#ffffff',
                        font: { size: 24 }
                    }
                }
            }
        }
    });
    
// Stats-Namen übersetzen
const stats = [
    { name: t('strength'), score: strengthScore, icon: '💪', glow: 'red', count: strengthCount },
    { name: t('stamina'), score: staminaScore, icon: '⚡', glow: 'cyan', count: staminaCount },
    { name: t('habits'), score: habitScore, icon: '✅', glow: 'gold', count: (typeof habits !== 'undefined') ? habits.length : 0 },
    { name: t('clean'), score: addictionScore, icon: '🚫', glow: 'purple', count: Math.floor(addictionDays) },
    { name: t('finances'), score: financeScore, icon: '💰', glow: 'green', count: financeAmount }
];
    
    stats.sort((a, b) => b.score - a.score);
    const bestStat = stats[0];
    const worstStat = stats[stats.length - 1];
    
    const insights = [];
    const totalScore = strengthScore + staminaScore + habitScore + addictionScore + financeScore;
    const avgScore = totalScore / 5;
    
// Overall assessment
if (avgScore >= 8) {
    insights.push({ icon: '🏆', text: t('insightFire'), glow: 'gold' });
} else if (avgScore >= 6) {
    insights.push({ icon: '💎', text: t('insightStrong'), glow: 'blue' });
} else if (avgScore >= 4) {
    insights.push({ icon: '⚡', text: t('insightGood'), glow: 'cyan' });
} else {
    insights.push({ icon: '🚀', text: t('insightStart'), glow: 'purple' });
}

// Best stat
if (bestStat.score >= 7) {
    insights.push({ icon: bestStat.icon, text: `${t('insightTop')}: ${bestStat.name} ${t('insightCrushing')}`, glow: bestStat.glow });
}

// Worst stat
if (worstStat.score < 4) {
    insights.push({ icon: worstStat.icon, text: `${worstStat.name} ${t('insightNeedsAttention')}`, glow: worstStat.glow });
}
    
// Specific insights
if (strengthScore >= 7) {
    insights.push({ icon: '💪', text: `${strengthCount} ${t('trainings')} - ${t('insightMuscles')}`, glow: 'red' });
}

if (staminaScore >= 7) {
    insights.push({ icon: '⚡', text: `${staminaCount} ${t('trainings')} - ${t('insightHeart')}`, glow: 'cyan' });
}

if (habitScore >= 8) {
    insights.push({ icon: '✅', text: `${stats[2].count} ${t('habits')} - ${t('insightRoutine')}`, glow: 'gold' });
}

if (addictionScore >= 7) {
    insights.push({ icon: '🚫', text: `${Math.floor(addictionDays)} ${t('days')} ${t('clean')}! ${t('insightLegendary')}`, glow: 'purple' });
}

if (financeScore >= 7) {
    insights.push({ icon: '💰', text: `€${financeAmount.toFixed(0)} ${t('saved')} - ${t('insightMoney')}`, glow: 'green' });
}

// Balance check
const maxScore = Math.max(...stats.map(s => s.score));
const minScore = Math.min(...stats.map(s => s.score));

if (maxScore - minScore > 6) {
    insights.push({ icon: '⚖️', text: t('insightUnbalance'), glow: 'blue' });
} else if (maxScore - minScore < 2) {
    insights.push({ icon: '⚖️', text: t('insightBalance'), glow: 'gold' });
}

// Motivational closer
if (avgScore < 6) {
    insights.push({ icon: '🔥', text: t('insightKeepGoing'), glow: 'blue' });
}
    
   
    
    const insightsEl = document.getElementById('personalityInsights');
    insightsEl.innerHTML = insights.map(insight => `
        <div class="insight-card insight-glow-${insight.glow}">
            <div class="insight-icon">${insight.icon}</div>
            <div class="insight-text">${insight.text}</div>
        </div>
    `).join('');
}




// PDF Section initialisieren
setTimeout(() => {
    if (typeof showPdfExportSection === 'function') {
        showPdfExportSection();
    }
}, 500);
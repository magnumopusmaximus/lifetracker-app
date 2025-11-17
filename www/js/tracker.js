// Tracker Management - WITH INFO-ROW MONEY DISPLAY
let trackers = JSON.parse(localStorage.getItem('trackers') || '[]');
let editingTrackerId = null;
let currentAddAmountTrackerId = null;
let trackerDetailChart = null;

function saveData() {
    localStorage.setItem('trackers', JSON.stringify(trackers));
    localStorage.setItem('habits', JSON.stringify(habits));
    updateStats();
    updateYearOverview();
}

function showAddTrackerModal() {
    // Update Select Options mit Übersetzungen
    const trackerModeSelect = document.getElementById('trackerMode');
    if (trackerModeSelect) {
        trackerModeSelect.innerHTML = `
            <option value="clean">🚫 ${t('cleanMode')}</option>
            <option value="reduction">📉 ${t('reductionMode')}</option>
        `;
    }
    
    document.getElementById('trackerModal').classList.add('show');
    document.getElementById('trackerShowMoney').checked = true;
    updateTrackerModalFields();
}

function closeTrackerModal() {
    document.getElementById('trackerModal').classList.remove('show');
    document.getElementById('trackerName').value = '';
    document.getElementById('trackerCost').value = '';
    document.getElementById('trackerDailyLimit').value = '3';
    document.getElementById('trackerMonthlyGoal').value = '20';
    document.getElementById('trackerMode').value = 'clean';
    document.getElementById('trackerShowMoney').checked = true;
}

function updateTrackerModalFields() {
    const mode = document.getElementById('trackerMode').value;
    const limitContainer = document.getElementById('trackerDailyLimitContainer');
    
    if (mode === 'clean') {
        // Clean mode - no goal field needed
        limitContainer.style.display = 'none';
    } else {
        // Reduction mode - show daily limit fields
        limitContainer.style.display = 'block';
    }
}

function updateEditTrackerModalFields() {
    const mode = document.getElementById('editTrackerMode').value;
    const limitContainer = document.getElementById('editTrackerDailyLimitContainer');
    
    if (mode === 'clean') {
        // Clean mode - no goal field
        limitContainer.style.display = 'none';
    } else {
        // Reduction mode - show daily limit and monthly goal
        limitContainer.style.display = 'block';
    }
}

function addTracker() {
    const name = document.getElementById('trackerName').value.trim();
    const cost = parseFloat(document.getElementById('trackerCost').value) || 0;
    const mode = document.getElementById('trackerMode').value;
    const showMoney = document.getElementById('trackerShowMoney').checked;
    
    if (name) {
        const tracker = {
            id: Date.now(),
            name: name,
            cost: cost,
            mode: mode,
            showMoneySaved: showMoney
        };
        
        if (mode === 'clean') {
            tracker.startTime = null;
            tracker.elapsedTime = 0;
            tracker.active = false;
        } else {
            tracker.dailyLimit = parseInt(document.getElementById('trackerDailyLimit').value) || 3;
            tracker.monthlyGoal = parseInt(document.getElementById('trackerMonthlyGoal').value) || 20;
            tracker.amounts = {};
        }
        
        trackers.push(tracker);
        saveData();
        renderTrackers();
        closeTrackerModal();
    }
}

function showEditTrackerModal(id) {
    const tracker = trackers.find(t => t.id === id);
    if (tracker) {
        editingTrackerId = id;
        document.getElementById('editTrackerName').value = tracker.name;
        document.getElementById('editTrackerCost').value = tracker.cost;
        
        // Update Select Options mit Übersetzungen
        const editTrackerModeSelect = document.getElementById('editTrackerMode');
        if (editTrackerModeSelect) {
            editTrackerModeSelect.innerHTML = `
                <option value="clean">🚫 ${t('cleanMode')}</option>
                <option value="reduction">📉 ${t('reductionMode')}</option>
            `;
            editTrackerModeSelect.value = tracker.mode;
        }
        
        document.getElementById('editTrackerShowMoney').checked = tracker.showMoneySaved !== false;
        
        if (tracker.mode === 'clean') {
            // No goal input for clean mode
        } else {
            document.getElementById('editTrackerDailyLimit').value = tracker.dailyLimit || 3;
            document.getElementById('editTrackerMonthlyGoal').value = tracker.monthlyGoal || 20;
        }
        
        updateEditTrackerModalFields();
        document.getElementById('editTrackerModal').classList.add('show');
    }
}

function closeEditTrackerModal() {
    document.getElementById('editTrackerModal').classList.remove('show');
    editingTrackerId = null;
}

function saveTrackerEdit() {
    const tracker = trackers.find(t => t.id === editingTrackerId);
    if (tracker) {
        const name = document.getElementById('editTrackerName').value.trim();
        const cost = parseFloat(document.getElementById('editTrackerCost').value) || 0;
        const newMode = document.getElementById('editTrackerMode').value;
        const showMoney = document.getElementById('editTrackerShowMoney').checked;
        
        if (name) {
            tracker.name = name;
            tracker.cost = cost;
            tracker.showMoneySaved = showMoney;
            
            if (tracker.mode !== newMode) {
                if (newMode === 'clean') {
                    tracker.startTime = null;
                    tracker.elapsedTime = 0;
                    tracker.active = false;
                    delete tracker.dailyLimit;
                    delete tracker.monthlyGoal;
                    delete tracker.amounts;
                } else {
                    tracker.dailyLimit = parseInt(document.getElementById('editTrackerDailyLimit').value) || 3;
                    tracker.monthlyGoal = parseInt(document.getElementById('editTrackerMonthlyGoal').value) || 20;
                    tracker.amounts = {};
                    delete tracker.goal;
                    delete tracker.startTime;
                    delete tracker.elapsedTime;
                    delete tracker.active;
                }
                tracker.mode = newMode;
            } else {
                if (tracker.mode === 'clean') {
                    // No goal to save for clean mode
                } else {
                    tracker.dailyLimit = parseInt(document.getElementById('editTrackerDailyLimit').value) || 3;
                    tracker.monthlyGoal = parseInt(document.getElementById('editTrackerMonthlyGoal').value) || 20;
                }
            }
            
            saveData();
            renderTrackers();
            closeEditTrackerModal();
        }
    }
}

function toggleTracker(id) {
    const tracker = trackers.find(t => t.id === id);
    if (tracker && tracker.mode === 'clean') {
        if (tracker.active) {
            tracker.elapsedTime += Date.now() - tracker.startTime;
            tracker.active = false;
            tracker.startTime = null;
        } else {
            tracker.active = true;
            tracker.startTime = Date.now();
        }
        saveData();
        renderTrackers();
    }
}

function resetTracker(id) {
    const tracker = trackers.find(t => t.id === id);
    if (tracker && confirm(t('confirmReset'))) {
        if (tracker.mode === 'clean') {
            tracker.active = false;
            tracker.startTime = null;
            tracker.elapsedTime = 0;
        } else {
            tracker.amounts = {};
        }
        saveData();
        renderTrackers();
    }
}

function deleteTracker(id) {
    if (confirm(t('confirmDeleteTracker'))) {
        trackers = trackers.filter(t => t.id !== id);
        saveData();
        renderTrackers();
    }
}

function showAddAmountModal(trackerId) {
    currentAddAmountTrackerId = trackerId;
    const tracker = trackers.find(t => t.id === trackerId);
    if (tracker) {
        document.getElementById('addAmountModalTitle').textContent = tracker.name;
        
        const today = new Date().toDateString();
        const currentAmount = tracker.amounts && tracker.amounts[today] ? tracker.amounts[today] : 0;
        document.getElementById('addAmountValue').value = currentAmount;
        
        document.getElementById('addAmountModal').classList.add('show');
        setTimeout(() => document.getElementById('addAmountValue').focus(), 100);
    }
}

function closeAddAmountModal() {
    document.getElementById('addAmountModal').classList.remove('show');
    currentAddAmountTrackerId = null;
}

function saveAmount() {
    const tracker = trackers.find(t => t.id === currentAddAmountTrackerId);
    if (tracker) {
        const amount = parseInt(document.getElementById('addAmountValue').value) || 0;
        const today = new Date().toDateString();
        
        if (!tracker.amounts) tracker.amounts = {};
        
        if (amount === 0) {
            delete tracker.amounts[today];
        } else {
            tracker.amounts[today] = amount;
        }
        
        saveData();
        renderTrackers();
        closeAddAmountModal();
    }
}

function showTrackerDetail(id) {
    const tracker = trackers.find(t => t.id === id);
    if (!tracker || tracker.mode !== 'reduction') return;
    
    document.getElementById('trackerDetailTitle').textContent = tracker.name;
    
    const now = new Date();
    const year = now.getFullYear();
    
    let yearTotal = 0;
    let monthTotals = new Array(12).fill(0);
    
    if (tracker.amounts) {
        Object.entries(tracker.amounts).forEach(([dateStr, amount]) => {
            const date = new Date(dateStr);
            if (date.getFullYear() === year) {
                yearTotal += amount;
                monthTotals[date.getMonth()] += amount;
            }
        });
    }
    
    const avgMonth = (yearTotal / 12).toFixed(1);
    const currentMonth = now.getMonth();
    const currentMonthTotal = monthTotals[currentMonth];
    const daysInYear = now.getDate() + (currentMonth * 30);
    const avgDay = daysInYear > 0 ? (yearTotal / daysInYear).toFixed(1) : 0;
    
    document.getElementById('trackerYearTotal').textContent = yearTotal;
    document.getElementById('trackerAvgMonth').textContent = avgMonth;
    document.getElementById('trackerCurrentMonth').textContent = currentMonthTotal;
    document.getElementById('trackerAvgDay').textContent = avgDay;
    
    // Update Labels mit Übersetzungen
    const labels = document.querySelectorAll('#trackerDetailModal .tracker-detail-stat-label');
    if (labels[0]) labels[0].textContent = t('yearTotal');
    if (labels[1]) labels[1].textContent = t('avgMonth');
    if (labels[2]) labels[2].textContent = t('currentMonth');
    if (labels[3]) labels[3].textContent = t('avgDay');
    
    const ctx = document.getElementById('trackerDetailChart');
    if (trackerDetailChart) {
        trackerDetailChart.destroy();
    }
    
    const months = t('months');
    
    trackerDetailChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: tracker.name,
                data: monthTotals,
                backgroundColor: 'rgba(155, 89, 182, 0.6)',
                borderColor: '#9b59b6',
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
    y: {
        beginAtZero: true,
        ticks: { color: '#8b8b9e' },
        grid: { color: 'rgba(139, 139, 158, 0.1)' }
    },
    x: {
    ticks: {
        color: '#8b8b9e',
        autoSkip: false,
        maxRotation: 45,
        minRotation: 0,
        padding: 10
    },
    grid: {
        color: 'rgba(139, 139, 158, 0.05)'
    }
}
}
        }
    });
    
    document.getElementById('trackerDetailModal').classList.add('show');
}

function closeTrackerDetailModal() {
    document.getElementById('trackerDetailModal').classList.remove('show');
}

function formatTime(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    
    return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderTrackers() {
    const list = document.getElementById('trackerList');
    list.innerHTML = '';
    
    if (trackers.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎯</div>
                <div class="empty-state-title">${t('noTrackersYet')}</div>
                <div class="empty-state-text">${t('noTrackersText')}</div>
            </div>
        `;
        return;
    }
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    trackers.forEach(tracker => {
        const card = document.createElement('div');
        card.className = 'tracker-card';
        
        if (tracker.mode === 'clean') {
            renderCleanModeCard(card, tracker);
        } else {
            renderReductionModeCard(card, tracker, now, currentMonth, currentYear);
        }
        
        list.appendChild(card);
    });
}

// ERSETZE DIE KOMPLETTE renderCleanModeCard FUNKTION MIT DEM CODE HIER:

function renderCleanModeCard(card, tracker) {
    let totalTime = tracker.elapsedTime || 0;
    if (tracker.active && tracker.startTime) {
        totalTime += Date.now() - tracker.startTime;
    }
    
    const timeStr = formatTime(totalTime);
    const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
    const goal = tracker.goal || 30;
    const progress = Math.min((days / goal) * 100, 100).toFixed(0);
    
    const savedMoney = (days / 7 * tracker.cost).toFixed(2);
    const showMoney = tracker.showMoneySaved !== false;
    
    card.innerHTML = `
        <button class="delete-btn" onclick="deleteTracker(${tracker.id})">🗑️</button>
        <button class="settings-btn" onclick="showEditTrackerModal(${tracker.id})">⚙️</button>
        
        <div class="tracker-mode-badge clean-mode">🚫 ${t('cleanMode')}</div>
        <div class="tracker-name">${tracker.name}</div>
        
        <!-- TIMER - DD:HH:MM:SS FORMAT -->
        <div class="tracker-timer-display">
            <div class="timer-value">${timeStr}</div>
            
        </div>

        ${showMoney ? `
        <div class="tracker-info-row">
            <span class="tracker-info-label">💰 ${t('saved')}</span>
            <span class="tracker-info-value">€${savedMoney}</span>
        </div>` : ''}
        
        <div class="tracker-buttons">
            ${tracker.active ? 
                `<button class="tracker-btn pause" onclick="toggleTracker(${tracker.id})">${t('pause')}</button>` :
                `<button class="tracker-btn start" onclick="toggleTracker(${tracker.id})">${t('start')}</button>`
            }
            <button class="tracker-btn reset" onclick="resetTracker(${tracker.id})">${t('reset')}</button>
            
        </div>
    `;
}

// NEUER CODE FÜR TRACKER.JS - Week View & Editable Days
// Ersetze die renderReductionModeCard Funktion damit:

function renderReductionModeCard(card, tracker, now, currentMonth, currentYear) {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const dailyLimit = tracker.dailyLimit || '-';
const monthlyGoal = tracker.monthlyGoal || '-';
const totalAmount = Object.values(tracker.amounts).reduce((sum, val) => sum + (val || 0), 0);
const saved = (totalAmount * tracker.cost).toFixed(2);
    
    let daysUnderLimit = 0;
    let monthTotal = 0;
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = new Date(currentYear, currentMonth, day).toDateString();
        const amount = tracker.amounts && tracker.amounts[dateStr] ? tracker.amounts[dateStr] : 0;
        
        if (amount > 0) {
            monthTotal += amount;
            if (amount <= dailyLimit) {
                daysUnderLimit++;
            }
        }
    }
    
    const progress = Math.min((daysUnderLimit / monthlyGoal) * 100, 100).toFixed(0);
    
    const avgPerDay = monthTotal / daysInMonth;
    const assumedWithoutLimit = dailyLimit * 2;
    const savedPerMonth = (assumedWithoutLimit * daysInMonth - monthTotal) * (tracker.cost / (assumedWithoutLimit * 4));
    
    const showMoney = tracker.showMoneySaved !== false;
    
    const dayNames = t('daysShort');
    
    // WEEK VIEW: Mo(0) bis So(6)
    let daysHTML = '<div class="tracker-week-preview">';
    
    // Find current week start (Monday)
    const currentDate = new Date(now);
    const day = currentDate.getDay();
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    const weekStart = new Date(currentDate.setDate(diff));
    
    // Show 7 days from Monday
    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);
        const dateStr = date.toDateString();
        const dayName = dayNames[i]; // Mo, Di, Mi, Do, Fr, Sa, So
        const amount = tracker.amounts && tracker.amounts[dateStr] ? tracker.amounts[dateStr] : 0;
        
        const dayClass = amount === 0 ? '' : amount <= dailyLimit ? 'within-limit' : 'over-limit';
        const isFuture = date > now;
        
        daysHTML += `
            <div class="tracker-week-day ${dayClass} ${isFuture ? 'future' : ''}" 
                 onclick="editTrackerDay(${tracker.id}, '${dateStr}')">
                <div class="tracker-week-day-name">${dayName}</div>
                <div class="tracker-week-day-amount">${amount || '-'}</div>
            </div>
        `;
    }
    daysHTML += '</div>';
    
    card.innerHTML = `
        <button class="delete-btn" onclick="deleteTracker(${tracker.id})">🗑️</button>
        <button class="settings-btn" onclick="showEditTrackerModal(${tracker.id})">⚙️</button>
        
        <div class="tracker-mode-badge reduction-mode">📉 ${t('reductionMode')}</div>
        <div class="tracker-name">${tracker.name}</div>
        
        <div class="tracker-info-row">
            <span class="tracker-info-label">${t('dailyLimit')}</span>
            <span class="tracker-info-value">${dailyLimit} / ${t('days')}</span>
        </div>
        
        <div class="tracker-info-row">
            <span class="tracker-info-label">${t('monthlyGoal')}</span>
            <span class="tracker-info-value">${monthlyGoal} ${t('days')}</span>
        </div>
        
        <div class="tracker-info-row">
            <span class="tracker-info-label">${t('progress')}</span>
            <span class="tracker-info-value ${daysUnderLimit >= monthlyGoal ? 'success' : ''}">${daysUnderLimit} / ${monthlyGoal} (${progress}%)</span>
        </div>
        
        ${showMoney ? `
        <div class="tracker-info-row">
            <span class="tracker-info-label">💰 ${t('saved')}</span>
            <span class="tracker-info-value">€${savedPerMonth.toFixed(2)}</span>
        </div>` : ''}
        
        <div class="tracker-week-label">Woche (Mo - So)</div>
        ${daysHTML}
        
        <div class="tracker-buttons">
            <button class="tracker-btn start" onclick="showAddAmountModal(${tracker.id})">+ ${t('add')}</button>
            <button class="tracker-btn edit" onclick="showTrackerDetail(${tracker.id})">📊</button>
            <button class="tracker-btn reset" onclick="resetTracker(${tracker.id})">${t('reset')}</button>
        </div>
    `;
}

// NEUE FUNKTION: Edit einzelne Tracker-Tage
function editTrackerDay(trackerId, dateStr) {
    const tracker = trackers.find(t => t.id === trackerId);
    if (!tracker) return;
    
    const date = new Date(dateStr);
    const currentAmount = tracker.amounts && tracker.amounts[dateStr] ? tracker.amounts[dateStr] : 0;
    
    // Modal öffnen mit dem Datum
const dayFormatOptions = currentLanguage === 'de' ? 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } :
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
const locale = currentLanguage === 'de' ? 'de-DE' : 
               currentLanguage === 'en' ? 'en-US' : 
               currentLanguage === 'ru' ? 'ru-RU' : 'de-DE';

document.getElementById('editTrackerDayTitle').textContent = 
    `${tracker.name} - ${date.toLocaleDateString(locale, dayFormatOptions)}`;
    document.getElementById('editTrackerDayAmount').value = currentAmount;
    document.getElementById('editTrackerDayAmount').dataset.trackerId = trackerId;
    document.getElementById('editTrackerDayAmount').dataset.dateStr = dateStr;
    
    document.getElementById('editTrackerDayModal').classList.add('show');
    setTimeout(() => document.getElementById('editTrackerDayAmount').focus(), 100);
}

function closeEditTrackerDayModal() {
    document.getElementById('editTrackerDayModal').classList.remove('show');
}

function saveTrackerDay() {
    const input = document.getElementById('editTrackerDayAmount');
    const trackerId = parseInt(input.dataset.trackerId);
    const dateStr = input.dataset.dateStr;
    const amount = parseInt(input.value) || 0;
    
    const tracker = trackers.find(t => t.id === trackerId);
    if (tracker) {
        if (!tracker.amounts) tracker.amounts = {};
        
        if (amount === 0) {
            delete tracker.amounts[dateStr];
        } else {
            tracker.amounts[dateStr] = amount;
        }
        
        saveData();
        renderTrackers();
        closeEditTrackerDayModal();
    }
}


// FÜGE DIESE ZEILEN AM ENDE VON tracker.js HINZU (falls nicht schon da):

// Update timers every second
setInterval(() => {
    const activeTrackers = trackers.filter(t => t.mode === 'clean' && t.active);
    if (activeTrackers.length > 0) {
        renderTrackers();
    }
}, 1000);
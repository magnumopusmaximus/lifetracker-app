// Mood Journal
let moodEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');

function saveMoodData() {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
}

function showMoodJournal() {
    const modal = document.getElementById('moodJournalModal');
    if (!modal) return;
    
    const today = new Date().toDateString();
    const todayEntry = moodEntries.find(e => new Date(e.date).toDateString() === today);
    
    renderMoodInterface(todayEntry);
    modal.classList.add('show');
}

function closeMoodJournal() {
    document.getElementById('moodJournalModal').classList.remove('show');
}

// Mood Heatmap anzeigen
function showMoodHeatmap() {
    const modal = document.getElementById('moodHeatmapModal');
    if (!modal) return;
    
    const now = new Date();
    const year = now.getFullYear();
    
    // Stats berechnen
    const yearEntries = moodEntries.filter(e => new Date(e.date).getFullYear() === year);
    const avgMood = yearEntries.length > 0 
        ? (yearEntries.reduce((sum, e) => sum + e.mood, 0) / yearEntries.length).toFixed(1)
        : 0;
    
    let bestMonth = '-';
    let worstMonth = '-';
    let monthlyAvg = new Array(12).fill(0);
    let monthlyCounts = new Array(12).fill(0);
    
    yearEntries.forEach(e => {
        const month = new Date(e.date).getMonth();
        monthlyAvg[month] += e.mood;
        monthlyCounts[month]++;
    });
    
    // Beste/schlechteste Monate finden
    let maxAvg = 0, minAvg = 6;
    monthlyAvg.forEach((total, idx) => {
        if (monthlyCounts[idx] > 0) {
            const avg = total / monthlyCounts[idx];
            if (avg > maxAvg) {
                maxAvg = avg;
                bestMonth = t('months')[idx];
            }
            if (avg < minAvg) {
                minAvg = avg;
                worstMonth = t('months')[idx];
            }
        }
    });
    
// Heatmap HTML - OHNE extra Wrapper
let heatmapHTML = '<div class="mood-heatmap-grid">';
const months = t('months');

for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    heatmapHTML += '<div class="mood-month-row">';
    heatmapHTML += `<div class="mood-month-label">${months[month]}</div>`;
    heatmapHTML += '<div class="mood-days-row">';
    
    for (let day = 1; day <= 31; day++) {
        if (day <= daysInMonth) {
            const date = new Date(year, month, day);
            const dateStr = date.toDateString();
            const entry = moodEntries.find(e => new Date(e.date).toDateString() === dateStr);
            
            let className = 'mood-heatmap-day empty';
            if (entry) {
                if (entry.mood >= 4) className = 'mood-heatmap-day great';
                else if (entry.mood === 3) className = 'mood-heatmap-day okay';
                else className = 'mood-heatmap-day bad';
            }
            
            const emoji = entry ? ['😢', '😕', '😐', '😊', '😄'][entry.mood - 1] : '';
            heatmapHTML += `<div class="${className}" title="${date.toLocaleDateString()}: ${emoji}"></div>`;
        } else {
            heatmapHTML += '<div class="mood-heatmap-day invisible"></div>';
        }
    }
    
    heatmapHTML += '</div></div>';
}
heatmapHTML += '</div>';
    
document.getElementById('moodHeatmapContent').innerHTML = `
    <div class="mood-heatmap-explanation">
        <strong>${t('moodHeatmapHow')}</strong><br>
        ${t('moodHeatmapDesc')}
        <div class="mood-heatmap-legend">
            <span><span class="legend-dot great"></span> ${t('great')}</span>
            <span><span class="legend-dot okay"></span> ${t('okay')}</span>
            <span><span class="legend-dot bad"></span> ${t('bad')}</span>
        </div>
    </div>
    
    <div class="mood-heatmap-stats">
        <div class="mood-heatmap-stat">
            <div class="mood-heatmap-stat-value">${avgMood}</div>
            <div class="mood-heatmap-stat-label">${t('avgYear')}</div>
        </div>
        <div class="mood-heatmap-stat">
            <div class="mood-heatmap-stat-value">${yearEntries.length}</div>
            <div class="mood-heatmap-stat-label">${t('entries')}</div>
        </div>
        <div class="mood-heatmap-stat">
            <div class="mood-heatmap-stat-value">${bestMonth}</div>
            <div class="mood-heatmap-stat-label">${t('bestMonth')}</div>
        </div>
        <div class="mood-heatmap-stat">
            <div class="mood-heatmap-stat-value">${worstMonth}</div>
            <div class="mood-heatmap-stat-label">${t('worstMonth')}</div>
        </div>
    </div>
    
    ${heatmapHTML}
`;
    
    modal.classList.add('show');
}

function closeMoodHeatmap() {
    document.getElementById('moodHeatmapModal').classList.remove('show');
}


function addMood(moodValue, dateStr = null) {
    const targetDate = dateStr ? new Date(dateStr).toDateString() : new Date().toDateString();
    
    moodEntries = moodEntries.filter(e => new Date(e.date).toDateString() !== targetDate);
    
    moodEntries.push({
        id: Date.now(),
        mood: moodValue,
        date: new Date(dateStr || new Date()).toISOString()
    });
    
    saveMoodData();
    const entry = moodEntries.find(e => new Date(e.date).toDateString() === targetDate);
    renderMoodInterface(entry);
}

function renderMoodInterface(todayEntry) {
    const container = document.getElementById('moodContent');
    if (!container) return;
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
    const weekEntries = moodEntries.filter(e => new Date(e.date) >= weekAgo);
    const weekAvg = weekEntries.length > 0 
        ? (weekEntries.reduce((sum, e) => sum + e.mood, 0) / weekEntries.length).toFixed(1)
        : '-';
    
    let streak = 0;
    for (let i = 0; i < 365; i++) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const dateStr = date.toDateString();
        if (moodEntries.some(e => new Date(e.date).toDateString() === dateStr)) {
            streak++;
        } else {
            break;
        }
    }
    
    const moods = [
        { value: 5, emoji: '😄', label: t('great') },
        { value: 4, emoji: '😊', label: t('good') },
        { value: 3, emoji: '😐', label: t('okay') },
        { value: 2, emoji: '😕', label: t('bad') },
        { value: 1, emoji: '😢', label: t('terrible') }
    ];
    
    let html = `

        
        <div class="mood-title-compact">${t('howDoYouFeel')}</div>
        
        <div class="mood-selector-horizontal">
    `;
    
    moods.forEach(mood => {
        const isSelected = todayEntry && todayEntry.mood === mood.value;
        html += `
            <button class="mood-btn-compact ${isSelected ? 'selected' : ''}" onclick="addMood(${mood.value})">
                <div class="mood-emoji-big">${mood.emoji}</div>
                <div class="mood-label-small">${mood.label}</div>
            </button>
        `;
    });
    
    html += `
        </div>
        
        ${todayEntry ? `<div class="mood-saved-text">${t('savedToday')}</div>` : ''}
        
        <div class="mood-history-mini">
    `;
    
const days = t('daysShort');
    
    // Zeige die letzten 7 Tage rückwärts (heute ist rechts)
    for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
        const dateStr = date.toDateString();
        const entry = moodEntries.find(e => new Date(e.date).toDateString() === dateStr);
        
        const dayName = days[date.getDay()];
        const emoji = entry ? moods.find(m => m.value === entry.mood).emoji : '-';
        const dateParam = date.toISOString().split('T')[0];
        
        html += `
            <div class="mood-day-mini" onclick="showMoodEditModal('${dateParam}')">
                <div class="mood-day-name">${dayName}</div>
                <div class="mood-day-emoji">${emoji}</div>
            </div>
        `;
    }
    
    html += '</div>';

html += `
    <button class="mood-view-year-btn" onclick="showMoodHeatmap()">
         ${t('viewYearHeatmap')}
    </button>
`;

    container.innerHTML = html;
}

function showMoodEditModal(dateStr) {
    const date = new Date(dateStr);
    const entry = moodEntries.find(e => new Date(e.date).toDateString() === date.toDateString());
    
    const moods = [
        { value: 5, emoji: '😄', label: t('great') },
        { value: 4, emoji: '😊', label: t('good') },
        { value: 3, emoji: '😐', label: t('okay') },
        { value: 2, emoji: '😕', label: t('bad') },
        { value: 1, emoji: '😢', label: t('terrible') }
    ];
    
    let modalHTML = `<div style="text-align: center; margin-bottom: 20px;">
        <h3 style="margin: 0; color: #ffffff; font-size: 16px;">${date.toLocaleDateString()}</h3>
        <p style="margin: 5px 0 0 0; color: #8b8b9e; font-size: 12px;">${t('howDoYouFeel')}</p>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 15px;">`;
    
    moods.forEach(mood => {
        const isSelected = entry && entry.mood === mood.value;
        modalHTML += `<button class="mood-btn-modal ${isSelected ? 'selected' : ''}" onclick="addMood(${mood.value}, '${dateStr}'); closeMoodEditModal();">
            <div style="font-size: 32px; margin-bottom: 5px;">${mood.emoji}</div>
            <div style="font-size: 12px;">${mood.label}</div>
        </button>`;
    });
    
    modalHTML += `</div><button class="modal-btn secondary" onclick="closeMoodEditModal()" style="width: 100%; margin-top: 15px;">Cancel</button>`;
    
    const modal = document.getElementById('moodEditModal');
    if (!modal) {
        const newModal = document.createElement('div');
        newModal.id = 'moodEditModal';
        newModal.className = 'modal';
        newModal.innerHTML = `<div class="modal-content" style="max-width: 300px;">${modalHTML}</div>`;
        document.body.appendChild(newModal);
    } else {
        modal.innerHTML = `<div class="modal-content" style="max-width: 300px;">${modalHTML}</div>`;
    }
    
    document.getElementById('moodEditModal').classList.add('show');
}

function closeMoodEditModal() {
    const modal = document.getElementById('moodEditModal');
    if (modal) modal.classList.remove('show');
}
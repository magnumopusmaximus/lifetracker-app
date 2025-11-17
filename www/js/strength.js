// Strength Management - MIT ÜBERSETZUNGEN
let strengthEntries = JSON.parse(localStorage.getItem('strengthEntries') || '[]');
let strengthGoal = parseInt(localStorage.getItem('strengthGoal') || '0');
let editingStrengthId = null;

function saveStrengthData() {
    localStorage.setItem('strengthEntries', JSON.stringify(strengthEntries));
    localStorage.setItem('strengthGoal', strengthGoal.toString());
    updateStats();
    updateYearOverview();
}

function showStrengthGoalModal() {
    document.getElementById('strengthGoalInput').value = strengthGoal || '';
    document.getElementById('strengthGoalModal').classList.add('show');
}

function closeStrengthGoalModal() {
    document.getElementById('strengthGoalModal').classList.remove('show');
}

function saveStrengthGoal() {
    const goal = parseInt(document.getElementById('strengthGoalInput').value) || 0;
    if (goal > 0) {
        strengthGoal = goal;
        saveStrengthData();
        renderStrength();
        closeStrengthGoalModal();
    }
}

function showAddStrengthModal() {
    const select = document.getElementById('strengthType');
    select.innerHTML = `
        <option value="Weight Training">🏋️ ${t('weightTraining')}</option>
        <option value="Gym">💪 ${t('gym')}</option>
        <option value="Bodyweight">🤸 ${t('bodyweight')}</option>
        <option value="Powerlifting">⚡ ${t('powerlifting')}</option>
    `;
    document.getElementById('strengthNotes').placeholder = t('notesPlaceholderStrength');
    document.getElementById('strengthModal').classList.add('show');
}

function closeStrengthModal() {
    document.getElementById('strengthModal').classList.remove('show');
    document.getElementById('strengthNotes').value = '';
}

function addStrength() {
    const type = document.getElementById('strengthType').value;
    const notes = document.getElementById('strengthNotes').value.trim();
    
    strengthEntries.push({
        id: Date.now(),
        type: type,
        notes: notes,
        date: new Date().toISOString()
    });
    
    saveStrengthData();
    renderStrength();
    closeStrengthModal();
}

function showEditStrengthModal(id) {
    const entry = strengthEntries.find(e => e.id === id);
    if (entry) {
        editingStrengthId = id;
        const select = document.getElementById('editStrengthType');
        select.innerHTML = `
            <option value="Weight Training">🏋️ ${t('weightTraining')}</option>
            <option value="Gym">💪 ${t('gym')}</option>
            <option value="Bodyweight">🤸 ${t('bodyweight')}</option>
            <option value="Powerlifting">⚡ ${t('powerlifting')}</option>
        `;
        select.value = entry.type;
        document.getElementById('editStrengthNotes').value = entry.notes || '';
        document.getElementById('editStrengthNotes').placeholder = t('notesPlaceholderStrength');
        document.getElementById('editStrengthModal').classList.add('show');
    }
}

function closeEditStrengthModal() {
    document.getElementById('editStrengthModal').classList.remove('show');
    editingStrengthId = null;
}

function saveStrengthEdit() {
    const entry = strengthEntries.find(e => e.id === editingStrengthId);
    if (entry) {
        entry.type = document.getElementById('editStrengthType').value;
        entry.notes = document.getElementById('editStrengthNotes').value.trim();
        saveStrengthData();
        renderStrength();
        closeEditStrengthModal();
    }
}

function deleteStrength(id) {
    if (confirm(t('confirmDeleteTraining'))) {
        strengthEntries = strengthEntries.filter(e => e.id !== id);
        saveStrengthData();
        renderStrength();
    }
}

function getStrengthIcon(type) {
    const icons = {
        'Weight Training': '🏋️',
        'Gym': '💪',
        'Bodyweight': '🤸',
        'Powerlifting': '⚡'
    };
    return icons[type] || '💪';
}

function getStrengthName(type) {
    const names = {
        'Weight Training': t('weightTraining'),
        'Gym': t('gym'),
        'Bodyweight': t('bodyweight'),
        'Powerlifting': t('powerlifting')
    };
    return names[type] || type;
}

function renderStrength() {
    const list = document.getElementById('strengthList');
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const thisMonthEntries = strengthEntries.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });
    
    const count = thisMonthEntries.length;
    const goalDisplay = document.getElementById('strengthGoalDisplay');
    const progressDisplay = document.getElementById('strengthGoalProgress');
    
    if (strengthGoal > 0) {
        const percentage = Math.min((count / strengthGoal) * 100, 100).toFixed(0);
        goalDisplay.textContent = `${strengthGoal} ${t('trainingsPerMonth')}`;
        progressDisplay.textContent = `${count} / ${strengthGoal} (${percentage}%)`;
    } else {
        goalDisplay.textContent = t('setGoal');
        progressDisplay.textContent = `${count}`;
    }
    
    list.innerHTML = '';
    
    if (strengthEntries.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💪</div>
                <div class="empty-state-title">${t('noTrainingsYet')}</div>
                <div class="empty-state-text">${t('noTrainingsText')}</div>
            </div>
        `;
        return;
    }
    
    const sorted = [...strengthEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sorted.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'training-card';
        
        const date = new Date(entry.date);
        const dateStr = date.toLocaleDateString(currentLanguage, { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = date.toLocaleTimeString(currentLanguage, { hour: '2-digit', minute: '2-digit' });
        
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteStrength(${entry.id})">🗑️</button>
            <div class="training-type">${getStrengthIcon(entry.type)} ${getStrengthName(entry.type)}</div>
            <div class="training-date">${dateStr} • ${timeStr}</div>
            ${entry.notes ? `<div class="training-notes">${entry.notes}</div>` : ''}
            <button class="edit-btn-small" onclick="showEditStrengthModal(${entry.id})">⚙️</button>
        `;
        
        list.appendChild(card);
    });
}
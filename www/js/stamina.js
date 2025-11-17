// Stamina Management - FIXED
let staminaEntries = JSON.parse(localStorage.getItem('staminaEntries') || '[]');
let staminaGoal = parseInt(localStorage.getItem('staminaGoal') || '0');
let editingStaminaId = null;

function saveStaminaData() {
    localStorage.setItem('staminaEntries', JSON.stringify(staminaEntries));
    localStorage.setItem('staminaGoal', staminaGoal.toString());
    updateStats();
    updateYearOverview();
}

function showStaminaGoalModal() {
    document.getElementById('staminaGoalInput').value = staminaGoal || '';
    document.getElementById('staminaGoalModal').classList.add('show');
}

function closeStaminaGoalModal() {
    document.getElementById('staminaGoalModal').classList.remove('show');
}

function saveStaminaGoal() {
    const goal = parseInt(document.getElementById('staminaGoalInput').value) || 0;
    if (goal > 0) {
        staminaGoal = goal;
        saveStaminaData();
        renderStamina();
        closeStaminaGoalModal();
    }
}

function showAddStaminaModal() {
    document.getElementById('staminaModal').classList.add('show');
}

function closeStaminaModal() {
    document.getElementById('staminaModal').classList.remove('show');
    document.getElementById('staminaNotes').value = '';
}

function addStamina() {
    const type = document.getElementById('staminaType').value;
    const notes = document.getElementById('staminaNotes').value.trim();
    
    staminaEntries.push({
        id: Date.now(),
        type: type,
        notes: notes,
        date: new Date().toISOString()
    });
    
    saveStaminaData();
    renderStamina();
    closeStaminaModal();
}

function showEditStaminaModal(id) {
    const entry = staminaEntries.find(e => e.id === id);
    if (entry) {
        editingStaminaId = id;
        document.getElementById('editStaminaType').value = entry.type;
        document.getElementById('editStaminaNotes').value = entry.notes || '';
        document.getElementById('editStaminaModal').classList.add('show');
    }
}

function closeEditStaminaModal() {
    document.getElementById('editStaminaModal').classList.remove('show');
    editingStaminaId = null;
}

function saveStaminaEdit() {
    const entry = staminaEntries.find(e => e.id === editingStaminaId);
    if (entry) {
        entry.type = document.getElementById('editStaminaType').value;
        entry.notes = document.getElementById('editStaminaNotes').value.trim();
        saveStaminaData();
        renderStamina();
        closeEditStaminaModal();
    }
}

function deleteStamina(id) {
    if (confirm(t('confirmDeleteTraining'))) {
        staminaEntries = staminaEntries.filter(e => e.id !== id);
        saveStaminaData();
        renderStamina();
    }
}

function getStaminaIcon(type) {
    const icons = {
        'Calisthenics': '🤸',
        'Running': '🏃',
        'Cardio': '❤️',
        'HIIT': '⚡'
    };
    return icons[type] || '💪';
}

function showAddStaminaModal() {
    const select = document.getElementById('staminaType');
    select.innerHTML = `
        <option value="Calisthenics">🤸 ${t('calisthenics')}</option>
        <option value="Running">🏃 ${t('running')}</option>
        <option value="Cardio">❤️ ${t('cardio')}</option>
        <option value="HIIT">⚡ ${t('hiit')}</option>
    `;
    document.getElementById('staminaNotes').placeholder = t('notesPlaceholderStamina');
    document.getElementById('staminaModal').classList.add('show');
}

function getStaminaName(type) {
    const names = {
        'Calisthenics': t('calisthenics'),
        'Running': t('running'),
        'Cardio': t('cardio'),
        'HIIT': t('hiit')
    };
    return names[type] || type;
}

function renderStamina() {
    const list = document.getElementById('staminaList');
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const thisMonthEntries = staminaEntries.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });
    
    const count = thisMonthEntries.length;
    const goalDisplay = document.getElementById('staminaGoalDisplay');
    const progressDisplay = document.getElementById('staminaGoalProgress');
    
    if (staminaGoal > 0) {
        const percentage = Math.min((count / staminaGoal) * 100, 100).toFixed(0);
        goalDisplay.textContent = `${staminaGoal} ${t('trainingsPerMonth').replace(':', '')}`;
        progressDisplay.textContent = `${count} / ${staminaGoal} (${percentage}%)`;
    } else {
        goalDisplay.textContent = t('setGoal');
        progressDisplay.textContent = `${count}`;
    }
    
    list.innerHTML = '';
    
    if (staminaEntries.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚡</div>
                <div class="empty-state-title">${t('noTrainingsYet')}</div>
                <div class="empty-state-text">${t('noTrainingsText')}</div>
            </div>
        `;
        return;
    }
    
    const sorted = [...staminaEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sorted.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'training-card';
        
        const date = new Date(entry.date);
        const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
        
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteStamina(${entry.id})">🗑️</button>
            <div class="training-type">${getStaminaIcon(entry.type)} ${getStaminaName(entry.type)}</div>
            <div class="training-date">${dateStr} • ${timeStr}</div>
            ${entry.notes ? `<div class="training-notes">${entry.notes}</div>` : ''}
            <button class="edit-btn-small" onclick="showEditStaminaModal(${entry.id})">⚙️</button>
        `;
        
        list.appendChild(card);
    });
}
// Habits Management - MIT GOAL SYSTEM
let habits = JSON.parse(localStorage.getItem('habits') || '[]');
let editingHabitId = null;
let viewingHabitId = null;

// CSS für Calendar Grid sicherstellen
const style = document.createElement('style');
style.textContent = `
.calendar-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 2px;
}

.calendar-day-name {
    text-align: center;
    color: #8b8b9e;
    font-size: 11px;
    font-weight: 700;
    padding: 4px;
}

.calendar-grid-real {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
    margin-top: 12px;
}

.calendar-day {
    aspect-ratio: 1;
    background: #0f1929;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
    color: #ffffff;
    font-weight: 600;
    border: 2px solid #2a3f5f;
}

.calendar-day.empty {
    visibility: hidden;
}

.calendar-day.weekend {
    background: rgba(139, 139, 158, 0.1);
}

.calendar-day.checked {
    background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%);
    color: white;
    border-color: #00d4ff;
    box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
}

.calendar-day:not(.empty):hover {
    transform: scale(1.1);
    border-color: #00d4ff;
}

.calendar-day:not(.empty):active {
    transform: scale(0.95);
}
`;
document.head.appendChild(style);


function showAddHabitModal() {
    document.getElementById('habitModal').classList.add('show');
}

function closeHabitModal() {
    document.getElementById('habitModal').classList.remove('show');
    document.getElementById('habitName').value = '';
    document.getElementById('habitGoal').value = '';
}

function addHabit() {
    const name = document.getElementById('habitName').value.trim();
    const goal = parseInt(document.getElementById('habitGoal').value) || 20;
    
    if (name) {
        habits.push({
            id: Date.now(),
            name: name,
            goal: goal,
            dates: {}
        });
        saveData();
        renderHabits();
        closeHabitModal();
    }
}

function showEditHabitModal(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        editingHabitId = id;
        document.getElementById('editHabitName').value = habit.name;
        document.getElementById('editHabitGoal').value = habit.goal || 20;
        document.getElementById('editHabitModal').classList.add('show');
    }
}

function closeEditHabitModal() {
    document.getElementById('editHabitModal').classList.remove('show');
    editingHabitId = null;
}

function saveHabitEdit() {
    const habit = habits.find(h => h.id === editingHabitId);
    if (habit) {
        const name = document.getElementById('editHabitName').value.trim();
        const goal = parseInt(document.getElementById('editHabitGoal').value) || 20;
        
        if (name) {
            habit.name = name;
            habit.goal = goal;
            saveData();
            renderHabits();
            closeEditHabitModal();
        }
    }
}

function deleteHabit(id) {
    if (confirm(t('confirmDeleteHabit'))) {
        habits = habits.filter(h => h.id !== id);
        saveData();
        renderHabits();
    }
}

function toggleHabitDay(habitId, date) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
        if (!habit.dates) habit.dates = {};
        habit.dates[date] = !habit.dates[date];
        saveData();
        renderHabits();
        
        if (viewingHabitId === habitId) {
            showHabitDetailModal(habitId);
        }
    }
}

function showHabitDetailModal(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;
    
    viewingHabitId = habitId;
    const modal = document.getElementById('habitDetailModal');
    
    if (!modal) {
        console.error('habitDetailModal not found');
        return;
    }
    
    document.getElementById('habitDetailTitle').textContent = habit.name;
    
    const now = new Date();
    const year = now.getFullYear();
    const monthlyData = new Array(12).fill(0);
    const monthlyGoals = new Array(12).fill(0);
    
    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        monthlyGoals[month] = habit.goal || Math.floor(daysInMonth * 0.7);
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day).toDateString();
            if (habit.dates && habit.dates[date]) {
                monthlyData[month]++;
            }
        }
    }
    
    const totalDays = monthlyData.reduce((sum, val) => sum + val, 0);
    const totalGoal = monthlyGoals.reduce((sum, val) => sum + val, 0);
    const successRate = totalGoal > 0 ? ((totalDays / totalGoal) * 100).toFixed(1) : 0;
    
    document.getElementById('habitYearTotal').textContent = totalDays;
    document.getElementById('habitYearGoal').textContent = totalGoal;
    document.getElementById('habitSuccessRate').textContent = successRate + '%';
    
    // Update Labels
    const labels = document.querySelectorAll('#habitDetailModal .habit-detail-stat-label');
    if (labels[0]) labels[0].textContent = t('totalDays');
    if (labels[1]) labels[1].textContent = t('yearGoal');
    if (labels[2]) labels[2].textContent = t('successRate');
    
    const currentMonthLabel = document.querySelector('#habitDetailModal .habit-current-label');
    if (currentMonthLabel) currentMonthLabel.textContent = t('currentMonth');
    
    const currentMonth = now.getMonth();
    const currentMonthDays = monthlyData[currentMonth];
    const currentMonthGoal = monthlyGoals[currentMonth];
    const currentProgress = currentMonthGoal > 0 ? ((currentMonthDays / currentMonthGoal) * 100).toFixed(0) : 0;
    
    document.getElementById('habitMonthProgress').textContent = 
        `${currentMonthDays} / ${currentMonthGoal} (${currentProgress}%)`;
    
    renderHabitChart(monthlyData, monthlyGoals);
    
    modal.classList.add('show');
}

function closeHabitDetailModal() {
    const modal = document.getElementById('habitDetailModal');
    if (modal) {
        modal.classList.remove('show');
    }
    viewingHabitId = null;
}

let habitChart = null;

function renderHabitChart(data, goals) {
    const canvas = document.getElementById('habitDetailChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (habitChart) {
        habitChart.destroy();
    }
    
    const months = t('months');
    
    const maxData = Math.max(...data, ...goals);
    const yMax = Math.ceil(maxData * 1.2);
    
    habitChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: t('completed'),
                data: data,
                backgroundColor: 'rgba(0, 212, 255, 0.6)',
                borderColor: '#00d4ff',
                borderWidth: 2,
                borderRadius: 6
            }, {
                label: t('goal'),
                data: goals,
                type: 'line',
                borderColor: '#f7b731',
                backgroundColor: 'transparent',
                borderWidth: 3,
                pointRadius: 4,
                pointBackgroundColor: '#f7b731',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#ffffff',
                        font: { size: 12 }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: yMax > 0 ? yMax : 10,
                    ticks: {
                        color: '#8b8b9e',
                        stepSize: Math.max(1, Math.ceil(yMax / 5))
                    },
                    grid: {
                        color: 'rgba(139, 139, 158, 0.1)'
                    }
                },
x: {
    ticks: {
        color: '#8b8b9e',
        font: { size: 11 },
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
}

function renderHabits() {
    const list = document.getElementById('habitList');
    list.innerHTML = '';
    
    if (habits.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💪</div>
                <div class="empty-state-title">${t('noHabitsYet')}</div>
                <div class="empty-state-text">${t('noHabitsText')}</div>
            </div>
        `;
        return;
    }
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    habits.forEach(habit => {
        const card = document.createElement('div');
        card.className = 'habit-card';
        
        let completedDays = 0;
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i).toDateString();
            if (habit.dates && habit.dates[date]) {
                completedDays++;
            }
        }
        
        const goal = habit.goal || Math.floor(daysInMonth * 0.7);
        const progress = goal > 0 ? ((completedDays / goal) * 100).toFixed(0) : 0;
        
        let calendarHTML = '<div class="calendar-header">';
        const dayNames = t('daysShort');
        dayNames.forEach(day => {
            calendarHTML += `<div class="calendar-day-name">${day}</div>`;
        });
        calendarHTML += '</div>';
        
        calendarHTML += '<div class="calendar-grid-real">';
        
        const firstDay = new Date(year, month, 1).getDay();
        const startDay = firstDay === 0 ? 6 : firstDay - 1;
        
        for (let i = 0; i < startDay; i++) {
            calendarHTML += '<div class="calendar-day empty"></div>';
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i).toDateString();
            const isChecked = habit.dates && habit.dates[date];
            const dayOfWeek = new Date(year, month, i).getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            
            calendarHTML += `
                <div class="calendar-day ${isChecked ? 'checked' : ''} ${isWeekend ? 'weekend' : ''}" 
                     onclick="event.stopPropagation(); toggleHabitDay(${habit.id}, '${date}')">
                    ${i}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        
        card.innerHTML = `
            <button class="delete-btn" onclick="event.stopPropagation(); deleteHabit(${habit.id})">🗑️</button>
            <div class="habit-header">
                <div class="habit-name" onclick="event.stopPropagation(); showEditHabitModal(${habit.id})">${habit.name} ✏️</div>
            </div>
            <div class="habit-goal-display">
                <span class="habit-goal-label"> ${t('goal')}:</span>
                <span class="habit-goal-value">${goal}/${daysInMonth} ${t('days')}</span>
            </div>
            <div class="habit-progress-display">
                <span class="habit-progress-label"> ${t('progress')}:</span>
                <span class="habit-progress-value ${completedDays >= goal ? 'success' : ''}">${completedDays}/${goal} (${progress}%)</span>
            </div>
            ${calendarHTML}
            <div class="habit-tap-hint">📈 ${t('tapForYearView')}</div>
        `;
        
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('calendar-day') && 
                !e.target.classList.contains('delete-btn') &&
                !e.target.classList.contains('habit-name')) {
                showHabitDetailModal(habit.id);
            }
        });
        
        list.appendChild(card);
    });
}
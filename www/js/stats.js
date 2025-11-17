// Stats Management - MIT PERSONALITY CHART AUTO-UPDATE
function updateStats() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // UPDATE UI TEXTS FIRST
    if (typeof updateHomeScreenTexts === 'function') {
        
    }
    
    // === STAMINA ===
    const thisMonthStamina = staminaEntries.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });
    
    let staminaValue = 0;
    if (staminaGoal > 0) {
        const percentage = (thisMonthStamina.length / staminaGoal) * 100;
        staminaValue = Math.min((percentage / 10), 10);
    }
    
    // === STRENGTH ===
    const thisMonthStrength = strengthEntries.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });
    
    let strengthValue = 0;
    if (strengthGoal > 0) {
        const percentage = (thisMonthStrength.length / strengthGoal) * 100;
        strengthValue = Math.min((percentage / 10), 10);
    }
    
    // === HABITS ===
    let habitValue = 0;
    if (habits.length > 0) {
        let totalCompleted = 0;
        let totalGoal = 0;
        
        habits.forEach(habit => {
            const habitGoal = habit.goal || Math.floor(daysInMonth * 0.7);
            totalGoal += habitGoal;
            
            let completed = 0;
            for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = new Date(currentYear, currentMonth, day).toDateString();
                if (habit.dates && habit.dates[dateStr]) {
                    completed++;
                }
            }
            totalCompleted += completed;
        });
        
        if (totalGoal > 0) {
            const successRate = (totalCompleted / totalGoal) * 100;
            habitValue = Math.min(successRate / 10, 10);
        }
    }
    
    // === ADDICTIONS - EINHEITLICHE BERECHNUNG ===
    let addictionsValue = 0;
    
    if (trackers.length > 0) {
        let totalPerformance = 0;
        
        trackers.forEach(tracker => {
            let current = 0;
            let goal = 0;
            
            if (tracker.mode === 'clean') {
                let totalTime = tracker.elapsedTime || 0;
                if (tracker.active && tracker.startTime) {
                    totalTime += Date.now() - tracker.startTime;
                }
                current = Math.floor(totalTime / (1000 * 60 * 60 * 24));
                goal = tracker.goal || 30;
                
            } else if (tracker.mode === 'reduction') {
                let daysUnderLimit = 0;
                
                for (let day = 1; day <= daysInMonth; day++) {
                    const dateStr = new Date(currentYear, currentMonth, day).toDateString();
                    const amount = tracker.amounts && tracker.amounts[dateStr] ? tracker.amounts[dateStr] : 0;
                    
                    if (amount > 0 && amount <= (tracker.dailyLimit || 3)) {
                        daysUnderLimit++;
                    }
                }
                
                current = daysUnderLimit;
                goal = tracker.monthlyGoal || 20;
            }
            
            if (goal > 0) {
                const percentage = (current / goal) * 100;
                totalPerformance += Math.min(percentage, 100);
            }
        });
        
        if (trackers.length > 0) {
            const avgPerformance = totalPerformance / trackers.length;
            addictionsValue = Math.min(avgPerformance / 10, 10);
        }
    }
    
    // === FINANCE ===
    const thisMonthFinance = financeEntries.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });
    
    const savedThisMonth = thisMonthFinance.reduce((sum, e) => sum + e.amount, 0);
    
    let financesValue = 0;
    if (financeGoal > 0) {
        const percentage = (savedThisMonth / financeGoal) * 100;
        financesValue = Math.min((percentage / 10), 10);
    }

    // === UPDATE DISPLAY ===
    document.getElementById('strengthValue').textContent = strengthValue.toFixed(1);
    document.getElementById('strengthBar').style.width = (strengthValue * 10) + '%';
    
    document.getElementById('staminaValue').textContent = staminaValue.toFixed(1);
    document.getElementById('staminaBar').style.width = (staminaValue * 10) + '%';
    
    document.getElementById('habitsValue').textContent = habitValue.toFixed(1);
    document.getElementById('habitsBar').style.width = (habitValue * 10) + '%';
    
    document.getElementById('addictionsValue').textContent = addictionsValue.toFixed(1);
    document.getElementById('addictionsBar').style.width = (addictionsValue * 10) + '%';
    
    document.getElementById('financesValue').textContent = financesValue.toFixed(1);
    document.getElementById('financesBar').style.width = (financesValue * 10) + '%';
    
    // === AUTO-UPDATE PERSONALITY CHART ===
    const personalityView = document.getElementById('personalityView');
    if (personalityView && personalityView.classList.contains('active')) {
        // Chart ist aktiv → sofort updaten
        if (typeof updatePersonalityChart === 'function') {
            updatePersonalityChart();
        }
    }



}
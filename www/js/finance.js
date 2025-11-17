// Finance Management - Nur Sparen
let financeEntries = JSON.parse(localStorage.getItem('financeEntries') || '[]');
let financeGoal = parseFloat(localStorage.getItem('financeGoal') || '0');
let editingFinanceId = null;
let finanzPlan = JSON.parse(localStorage.getItem('finanzPlan') || '{"income":[],"expenses":[]}');

function saveFinanceData() {
    localStorage.setItem('financeEntries', JSON.stringify(financeEntries));
    localStorage.setItem('financeGoal', financeGoal.toString());
    updateStats();
    updateYearOverview();
}

function showFinanceGoalModal() {
    document.getElementById('financeGoalInput').value = financeGoal || '';
    document.getElementById('financeGoalModal').classList.add('show');
}

function closeFinanceGoalModal() {
    document.getElementById('financeGoalModal').classList.remove('show');
}

function saveFinanceGoal() {
    const goal = parseFloat(document.getElementById('financeGoalInput').value) || 0;
    if (goal > 0) {
        financeGoal = goal;
        saveFinanceData();
        renderFinance();
        closeFinanceGoalModal();
    }
}

function showAddFinanceModal() {
    document.getElementById('financeNotes').placeholder = t('notesPlaceholderFinance');
    document.getElementById('financeModal').classList.add('show');
}

function closeFinanceModal() {
    document.getElementById('financeModal').classList.remove('show');
    document.getElementById('financeAmount').value = '';
    document.getElementById('financeNotes').value = '';
}

function addFinance() {
    const amount = parseFloat(document.getElementById('financeAmount').value) || 0;
    const notes = document.getElementById('financeNotes').value.trim();
    
    if (amount > 0) {
        financeEntries.push({
            id: Date.now(),
            amount: amount,
            notes: notes,
            date: new Date().toISOString()
        });
        
        saveFinanceData();
        renderFinance();
        closeFinanceModal();
    }
}

function showEditFinanceModal(id) {
    const entry = financeEntries.find(e => e.id === id);
    if (entry) {
        editingFinanceId = id;
        document.getElementById('editFinanceAmount').value = entry.amount;
        document.getElementById('editFinanceNotes').value = entry.notes || '';
        document.getElementById('editFinanceModal').classList.add('show');
    }
}

function closeEditFinanceModal() {
    document.getElementById('editFinanceModal').classList.remove('show');
    editingFinanceId = null;
}

function saveFinanceEdit() {
    const entry = financeEntries.find(e => e.id === editingFinanceId);
    if (entry) {
        entry.amount = parseFloat(document.getElementById('editFinanceAmount').value) || 0;
        entry.notes = document.getElementById('editFinanceNotes').value.trim();
        saveFinanceData();
        renderFinance();
        closeEditFinanceModal();
    }
}

function deleteFinance(id) {
    if (confirm(t('confirmDelete'))) {
        financeEntries = financeEntries.filter(e => e.id !== id);
        saveFinanceData();
        renderFinance();
    }
}

function renderFinance() {
    const list = document.getElementById('financeList');
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const thisMonthEntries = financeEntries.filter(e => {
        const entryDate = new Date(e.date);
        return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
    });
    
    const savedThisMonth = thisMonthEntries.reduce((sum, e) => sum + e.amount, 0);
    const totalSaved = financeEntries.reduce((sum, e) => sum + e.amount, 0);
    
    const goalDisplay = document.getElementById('financeGoalDisplay');
    const progressDisplay = document.getElementById('financeGoalProgress');
    
    if (financeGoal > 0) {
        const percentage = Math.min((savedThisMonth / financeGoal) * 100, 100).toFixed(0);
        goalDisplay.textContent = `€${financeGoal.toFixed(0)}`;
        progressDisplay.textContent = `€${savedThisMonth.toFixed(2)} / €${financeGoal.toFixed(0)} (${percentage}%)`;
    } else {
        goalDisplay.textContent = t('setGoal');
        progressDisplay.textContent = `€${savedThisMonth.toFixed(2)}`;
    }
    
    document.getElementById('totalSaved').textContent = `€${totalSaved.toFixed(2)}`;
    document.getElementById('thisMonthSaved').textContent = `€${savedThisMonth.toFixed(2)}`;
    
    list.innerHTML = '';
    
    if (financeEntries.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">💰</div>
                <div class="empty-state-title">${t('noEntriesYet')}</div>
                <div class="empty-state-text">${t('noEntriesText')}</div>
            </div>
        `;
        return;
    }
    
    const sorted = [...financeEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sorted.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'training-card finance-card';
        
        const date = new Date(entry.date);
        const dateStr = date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        card.innerHTML = `
            <button class="delete-btn" onclick="deleteFinance(${entry.id})">🗑️</button>
            <div class="training-type">💰 Gespart</div>
            <div class="finance-amount">€${entry.amount.toFixed(2)}</div>
            <div class="training-date">${dateStr}</div>
            ${entry.notes ? `<div class="training-notes">${entry.notes}</div>` : ''}
            <button class="edit-btn-small" onclick="showEditFinanceModal(${entry.id})">⚙️</button>
        `;
        
        list.appendChild(card);
    });
    
    // Update button text
    const planBtn = document.getElementById('financeScreenPlanBtn');
    if (planBtn) {
        planBtn.textContent = t('financePlanningTitle');
    }
}

// ===== FINANZPLANUNG =====
function saveFinanzPlan() {
    localStorage.setItem('finanzPlan', JSON.stringify(finanzPlan));
}

function showFinanzplanModal() {
    document.getElementById('finanzplanTitle').textContent = t('financePlanningTitle');
    renderFinanzplan();
    document.getElementById('finanzplanModal').classList.add('show');
}

function closeFinanzplanModal() {
    document.getElementById('finanzplanModal').classList.remove('show');
}

function renderFinanzplan() {
    const container = document.getElementById('finanzplanContent');
    if (!container) return;
    
    const totalIncomeFixed = finanzPlan.income.filter(i => i.type === 'fixed').reduce((sum, item) => sum + item.value, 0);
    const totalIncomeVariable = finanzPlan.income.filter(i => i.type === 'variable').reduce((sum, item) => sum + item.value, 0);
    const totalIncomeTotal = totalIncomeFixed + totalIncomeVariable;
    
    const totalExpensesFixed = finanzPlan.expenses.filter(i => i.type === 'fixed').reduce((sum, item) => sum + item.value, 0);
    const totalExpensesVariable = finanzPlan.expenses.filter(i => i.type === 'variable').reduce((sum, item) => sum + item.value, 0);
    const totalExpensesTotal = totalExpensesFixed + totalExpensesVariable;
    
    const difference = totalIncomeTotal - totalExpensesTotal;
    
    let html = `
        <div style="padding: 10px; background: rgba(17, 26, 38, 0.69); border-radius: 12px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 16px;">
            <div style="background: rgba(0, 212, 255, 0.08); padding: 11px; border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.2); text-align: center;">
                <div style="font-size: 11px; color: #8b8b9e; font-weight: 500; margin-bottom: 5px;">💰 ${t('income')}</div>
                <div style="font-size: 16px; font-weight: 700; color: #00d4ff;">${totalIncomeTotal.toFixed(0)}€</div>
            </div>
            <div style="background: rgba(255, 100, 100, 0.08); padding: 11px; border-radius: 8px; border: 1px solid rgba(255, 100, 100, 0.2); text-align: center;">
                <div style="font-size: 11px; color: #8b8b9e; font-weight: 500; margin-bottom: 5px;">💸 ${t('expenses')}</div>
                <div style="font-size: 16px; font-weight: 700; color: #ff6464;">${totalExpensesTotal.toFixed(0)}€</div>
            </div>
            <div style="background: linear-gradient(135deg, rgba(100, 100, 100, 0.1), rgba(100, 100, 100, 0.05)); padding: 11px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.15); text-align: center;">
                <div style="font-size: 11px; color: #ffffff; font-weight: 500; margin-bottom: 5px;">📊 ${t('currentBalance')}</div>
                <div style="font-size: 16px; font-weight: 700; color: #ffffff;">${difference.toFixed(0)}€</div>
            </div>
        </div>
        
        <div style="background: #0f1929; border-radius: 10px; padding: 14px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="margin: 0; color: #00d4ff; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">💰 ${t('income').toUpperCase()}</h4>
                <button onclick="showAddIncomeModal()" style="background: #00d4ff; border: none; border-radius: 5px; padding: 6px 11px; color: #000; font-weight: 700; cursor: pointer; font-size: 11px;">+ ${t('add')}</button>
            </div>
            
            <div style="margin-bottom: 12px;">
                <div style="font-size: 11px; color: #00d4ff; font-weight: 600; margin-bottom: 6px; padding-left: 6px;">${t('fixed')} (${totalIncomeFixed.toFixed(2)}€)</div>
    `;
    
    const incomeFixed = finanzPlan.income.filter(i => i.type === 'fixed');
    if (incomeFixed.length > 0) {
        incomeFixed.forEach(item => {
            html += `<div style="background: rgba(0, 212, 255, 0.05); padding: 5px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border: 1px solid rgba(0, 212, 255, 0.1);">
                <div>
                    <div style="color: #ffffff; font-size: 11px; font-weight: 500;">${item.name}</div>
                    <div style="color: #8b8b9e; font-size: 9px;">${item.value.toFixed(2)}€</div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button onclick="editPlanItem('${item.id}', 'income')" style="background: transparent; border: 1px solid #2a3f5f; color: #00d4ff; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">✏️</button>
                    <button onclick="deletePlanItem('${item.id}', 'income')" style="background: transparent; border: 1px solid #2a3f5f; color: #ff6464; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">🗑️</button>
                </div>
            </div>`;
        });
    } else {
        html += `<div style="text-align: center; color: #8b8b9e; font-size: 10px; padding: 10px; opacity: 0.6;">${t('noFixedIncomeYet')}</div>`;
    }
    
    html += `</div><div>
                <div style="font-size: 11px; color: #00d4ff; font-weight: 600; margin-bottom: 6px; padding-left: 6px;">${t('variable')} (${totalIncomeVariable.toFixed(2)}€)</div>
    `;
    
    const incomeVariable = finanzPlan.income.filter(i => i.type === 'variable');
    if (incomeVariable.length > 0) {
        incomeVariable.forEach(item => {
            html += `<div style="background: rgba(0, 212, 255, 0.05); padding: 5px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border: 1px solid rgba(0, 212, 255, 0.1);">
                <div>
                    <div style="color: #ffffff; font-size: 11px; font-weight: 500;">${item.name}</div>
                    <div style="color: #8b8b9e; font-size: 9px;">${item.value.toFixed(2)}€</div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button onclick="editPlanItem('${item.id}', 'income')" style="background: transparent; border: 1px solid #2a3f5f; color: #00d4ff; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">✏️</button>
                    <button onclick="deletePlanItem('${item.id}', 'income')" style="background: transparent; border: 1px solid #2a3f5f; color: #ff6464; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">🗑️</button>
                </div>
            </div>`;
        });
    } else {
        html += `<div style="text-align: center; color: #8b8b9e; font-size: 10px; padding: 10px; opacity: 0.6;">${t('noVariableIncomeYet')}</div>`;
    }
    
    html += `</div></div></div>
        
        <div style="background: #0f1929; border-radius: 10px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <h4 style="margin: 0; color: #ff6464; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">💸 ${t('expenses').toUpperCase()}</h4>
                <button onclick="showAddExpenseModal()" style="background: #ff6464; border: none; border-radius: 5px; padding: 6px 11px; color: #fff; font-weight: 700; cursor: pointer; font-size: 11px;">+ ${t('add')}</button>
            </div>
            
            <div style="margin-bottom: 12px;">
                <div style="font-size: 11px; color: #ff6464; font-weight: 600; margin-bottom: 6px; padding-left: 6px;">${t('fixed')} (${totalExpensesFixed.toFixed(2)}€)</div>
    `;
    
    const expensesFixed = finanzPlan.expenses.filter(i => i.type === 'fixed');
    if (expensesFixed.length > 0) {
        expensesFixed.forEach(item => {
            html += `<div style="background: rgba(255, 100, 100, 0.05); padding: 5px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border: 1px solid rgba(255, 100, 100, 0.1);">
                <div>
                    <div style="color: #ffffff; font-size: 11px; font-weight: 500;">${item.name}</div>
                    <div style="color: #8b8b9e; font-size: 9px;">${item.value.toFixed(2)}€</div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button onclick="editPlanItem('${item.id}', 'expenses')" style="background: transparent; border: 1px solid #2a3f5f; color: #ff6464; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">✏️</button>
                    <button onclick="deletePlanItem('${item.id}', 'expenses')" style="background: transparent; border: 1px solid #2a3f5f; color: #ff6464; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">🗑️</button>
                </div>
            </div>`;
        });
    } else {
        html += `<div style="text-align: center; color: #8b8b9e; font-size: 10px; padding: 10px; opacity: 0.6;">${t('noFixedExpenseYet')}</div>`;
    }
    
    html += `</div><div>
                <div style="font-size: 11px; color: #ff6464; font-weight: 600; margin-bottom: 6px; padding-left: 6px;">${t('variable')} (${totalExpensesVariable.toFixed(2)}€)</div>
    `;
    
    const expensesVariable = finanzPlan.expenses.filter(i => i.type === 'variable');
    if (expensesVariable.length > 0) {
        expensesVariable.forEach(item => {
            html += `<div style="background: rgba(255, 100, 100, 0.05); padding: 5px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; border: 1px solid rgba(255, 100, 100, 0.1);">
                <div>
                    <div style="color: #ffffff; font-size: 11px; font-weight: 500;">${item.name}</div>
                    <div style="color: #8b8b9e; font-size: 9px;">${item.value.toFixed(2)}€</div>
                </div>
                <div style="display: flex; gap: 5px;">
                    <button onclick="editPlanItem('${item.id}', 'expenses')" style="background: transparent; border: 1px solid #2a3f5f; color: #ff6464; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">✏️</button>
                    <button onclick="deletePlanItem('${item.id}', 'expenses')" style="background: transparent; border: 1px solid #2a3f5f; color: #ff6464; border-radius: 3px; padding: 3px 5px; cursor: pointer; font-size: 10px; transition: all 0.2s;">🗑️</button>
                </div>
            </div>`;
        });
    } else {
        html += `<div style="text-align: center; color: #8b8b9e; font-size: 10px; padding: 10px; opacity: 0.6;">${t('noVariableExpenseYet')}</div>`;
    }
    
    html += `</div></div></div>`;
    
    container.innerHTML = html;
}

function showAddIncomeModal() {
    const type = prompt(`${t('incomeType')}\n1 = ${t('incomeTypeFixed')}\n2 = ${t('incomeTypeVariable')}`);
    if (!type || !['1', '2'].includes(type)) return;
    
    const itemType = type === '1' ? 'fixed' : 'variable';
    const name = prompt(`${itemType === 'fixed' ? t('fixedIncome') : t('variableIncome')}:`);
    if (!name) return;
    
    const value = parseFloat(prompt(t('amount')));
    if (!value || value <= 0) return;
    
    finanzPlan.income.push({
        id: Date.now().toString(),
        name: name,
        value: value,
        type: itemType
    });
    
    saveFinanzPlan();
    renderFinanzplan();
}

function showAddExpenseModal() {
    const type = prompt(`${t('expenseType')}\n1 = ${t('expenseTypeFixed')}\n2 = ${t('expenseTypeVariable')}`);
    if (!type || !['1', '2'].includes(type)) return;
    
    const itemType = type === '1' ? 'fixed' : 'variable';
    const name = prompt(`${itemType === 'fixed' ? t('fixedExpense') : t('variableExpense')}:`);
    if (!name) return;
    
    const value = parseFloat(prompt(t('amount')));
    if (!value || value <= 0) return;
    
    finanzPlan.expenses.push({
        id: Date.now().toString(),
        name: name,
        value: value,
        type: itemType
    });
    
    saveFinanzPlan();
    renderFinanzplan();
}

function editPlanItem(id, type) {
    const item = finanzPlan[type].find(i => i.id === id);
    if (!item) return;
    
    const newName = prompt(t('name'), item.name);
    if (!newName) return;
    
    const newValue = parseFloat(prompt(t('amount'), item.value));
    if (!newValue || newValue <= 0) return;
    
    item.name = newName;
    item.value = newValue;
    saveFinanzPlan();
    renderFinanzplan();
}

function deletePlanItem(id, type) {
    if (confirm(t('confirmDelete'))) {
        finanzPlan[type] = finanzPlan[type].filter(i => i.id !== id);
        saveFinanzPlan();
        renderFinanzplan();
    }
}
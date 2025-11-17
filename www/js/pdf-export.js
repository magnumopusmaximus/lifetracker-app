// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  📄 PDF EXPORT SYSTEM - Main Export Function                             ║
// ║  Uses pdf-translations.js for multilingual support                       ║
// ║  Generates 12-page comprehensive PDF report                              ║
// ╚════════════════════════════════════════════════════════════════════════════╝
// ===== SELECTED LANGUAGE STATE =====
window.selectedPdfLanguage = null;

// ===== SELECT PDF LANGUAGE =====
window.selectPdfLanguage = function(language) {
    window.selectedPdfLanguage = language;
    
    // Update button styles
    document.querySelectorAll('.pdf-lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.pdf-lang-btn').classList.add('active');
    
    // Enable download button
    const downloadBtn = document.getElementById('pdfDownloadBtn');
    if (downloadBtn) {
        downloadBtn.classList.add('enabled');
        downloadBtn.classList.remove('disabled');
        downloadBtn.disabled = false;
    }
}

// ===== UPDATE PDF SECTION TRANSLATIONS =====
window.updatePdfSectionTranslations = function(language = 'de') {
    document.querySelectorAll('#pdfExportSection [data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getPdfTranslation(key, language);
        element.textContent = translation;
    });
    console.log(`📥 PDF Section translated to: ${language}`);
}

// ===== MAIN EXPORT FUNCTION =====
window.exportPdfWithSelectedLanguage = async function() {
    if (!window.selectedPdfLanguage) {
        alert('Please select a language first');
        return;
    }
    
    if (typeof isPro !== 'undefined' && !isPro?.()) {
        if (typeof showProLockModal !== 'undefined') {
            showProLockModal?.();
        }
        return;
    }
    
    await window.exportYearlyPDFHtml2Pdf(window.selectedPdfLanguage);
}

async function exportYearlyPDFHtml2Pdf(selectedLanguage = null) {
    try {
        showPDFLoadingModal();
        
        if (typeof html2pdf === 'undefined') {
            throw new Error('html2pdf.js not loaded');
        }
        
        const language = selectedLanguage || localStorage.getItem('language') || 'de';
        const htmlContent = generateUltraPDFHtml(language);
        
        const filename = `LifeTracker-${new Date().getFullYear()}-Report-${language.toUpperCase()}.pdf`;
        
        const options = {
            margin: [0, 0, 0, 0],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1, allowTaint: true, useCORS: true, logging: false, backgroundColor: '#ffffff' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        await html2pdf().set(options).from(htmlContent).save();
        document.getElementById('pdfLoadingModal')?.remove?.();
        console.log('✅ PDF Generated Successfully!');
    } catch (error) {
        console.error('❌ PDF Generation Error:', error);
        document.getElementById('pdfLoadingModal')?.remove?.();
        alert('Error: ' + error.message);
    }
}

window.exportYearlyPDFHtml2Pdf = exportYearlyPDFHtml2Pdf;
// ===== MAIN EXPORT FUNCTION =====
async function exportYearlyPDFHtml2Pdf(selectedLanguage = null) {
    if (!isPro?.()) {
        showProLockModal?.();
        return;
    }
    
    try {
        showPDFLoadingModal();
        
        if (typeof html2pdf === 'undefined') {
            throw new Error('html2pdf.js not loaded');
        }
        
        const language = selectedLanguage || localStorage.getItem('language') || 'de';
        const htmlContent = generateUltraPDFHtml(language);
        
        const t = getPdfTranslation.bind(null, null, language);
        const filename = `LifeTracker-${new Date().getFullYear()}-Report-${language.toUpperCase()}.pdf`;
        
        const options = {
            margin: [0, 0, 0, 0],
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 1, allowTaint: true, useCORS: true, logging: false, backgroundColor: '#ffffff' },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        await html2pdf().set(options).from(htmlContent).save();
        document.getElementById('pdfLoadingModal')?.remove?.();
        console.log('✅ PDF Generated Successfully!');
    } catch (error) {
        console.error('❌ PDF Generation Error:', error);
        document.getElementById('pdfLoadingModal')?.remove?.();
        alert('Error: ' + error.message);
    }
}

// ===== GENERATE PDF HTML =====
function generateUltraPDFHtml(language = 'de') {
    const year = new Date().getFullYear();
    const data = collectUltraPDFData(language);
    const t = (key) => getPdfTranslation(key, language);
    
    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { font-family: 'Segoe UI', Arial, sans-serif; background: white; }
body { margin: 0; padding: 0; }

.pdf-page {
    background: white;
    padding: 15px 20px;
    margin: 0;
    color: #1a1a1a;
    position: relative;
    display: flex;
    flex-direction: column;
    page-break-after: always;
    page-break-inside: avoid;
}

.page-title {
    font-size: 32px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 3px solid #6366f1;
}

.section-title {
    font-size: 18px;
    font-weight: 600;
    color: #0f172a;
    margin: 12px 0 8px 0;
    page-break-inside: avoid;
}

body { font-size: 14px; }
p { line-height: 1.4; margin: 5px 0; }

.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 6px;
    margin-bottom: 8px;
}

.stat-card {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-left: 4px solid #6366f1;
    border-radius: 4px;
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-card .label {
    font-size: 15px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    font-weight: 600;
}

.stat-card .value {
    font-size: 20px;
    font-weight: 700;
    color: #0f172a;
    margin-top: 2px;
}

.content {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
}

.page-number {
    position: absolute;
    bottom: 8px;
    right: 10px;
    font-size: 14px;
    color: #94a3b8;
}

.heatmap-container {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 6px;
    margin-bottom: 8px;
}

.daily-heatmap-grid {
    display: grid;
    grid-template-columns: repeat(53, 1fr);
    gap: 1px;
    margin-bottom: 4px;
}

.daily-heatmap-cell {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 2px;
    font-size: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.3px solid rgba(0,0,0,0.05);
}

.monthly-heatmap-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 4px;
}

.monthly-heatmap-cell {
    aspect-ratio: 1;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 600;
    color: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
}

.breakdown-section {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    padding: 6px;
    margin-bottom: 6px;
}

.breakdown-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    border-bottom: 1px solid #f1f5f9;
    font-size: 14px;
}

.breakdown-item:last-child { border-bottom: none; }

.progress-bar {
    width: 100%;
    height: 3px;
    background: #e2e8f0;
    border-radius: 2px;
    margin-top: 2px;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
}

.explanation-box {
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);
    border-left: 3px solid #6366f1;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1.5;
}

.explanation-box strong {
    color: #6366f1;
    font-weight: 700;
}

.legend {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    font-size: 13px;
    margin-bottom: 6px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 3px;
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 2px;
}

.info-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    margin-bottom: 6px;
}

.info-table th {
    background: #f1f5f9;
    padding: 5px;
    text-align: left;
    font-weight: 600;
    color: #0f172a;
    border-bottom: 1px solid #e2e8f0;
    font-size: 13px;
}

.info-table td {
    padding: 5px;
    border-bottom: 1px solid #f1f5f9;
    color: #475569;
}

.highlight-box {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.1) 100%);
    border-left: 3px solid #22c55e;
    border-radius: 4px;
    padding: 6px;
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 1.4;
}

.achievement-list {
    background: white;
    border-left: 3px solid #22c55e;
    border-radius: 4px;
    padding: 6px;
    margin-bottom: 6px;
}

.achievement-item {
    display: flex;
    align-items: flex-start;
    gap: 4px;
    padding: 3px 0;
    font-size: 14px;
    color: #475569;
    line-height: 1.3;
}

.achievement-item::before {
    content: '✓';
    font-weight: 700;
    color: #22c55e;
    min-width: 14px;
    font-size: 15px;
}

.page-cover {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: white;
    justify-content: space-between;
    padding: 30px 20px;
}

.cover-header {
    text-align: center;
}

.cover-header h1 {
    font-size: 64px;
    font-weight: 700;
    margin-bottom: 4px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.cover-year {
    font-size: 52px;
    color: #22c55e;
    font-weight: 700;
    margin-bottom: 30px;
}

.cover-stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin-bottom: 30px;
}

.cover-stat {
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 8px;
    padding: 16px;
    text-align: center;
}

.cover-stat .num {
    font-size: 28px;
    font-weight: 700;
    background: linear-gradient(135deg, #6366f1, #22c55e);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.cover-stat .label {
    font-size: 15px;
    color: #cbd5e1;
    margin-top: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.cover-footer {
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.2);
    padding-top: 20px;
}

.cover-footer p {
    font-size: 12px;
    color: #cbd5e1;
    margin: 4px 0;
}
</style>
</head>
<body>

<!-- PAGE 1: COVER -->
<div class="pdf-page page-cover">
    <div class="cover-header">
        <h1>LIFE TRACKER</h1>
        <div class="cover-year">${year}</div>
        <p style="font-size: 14px; color: #cbd5e1; letter-spacing: 0.5px;">${t('reportTitle')}</p>
    </div>
    
    <div class="cover-stats">
        <div class="cover-stat">
            <div class="num">${data.totalWorkouts}</div>
            <div class="label">${t('coverWorkouts')}</div>
        </div>
        <div class="cover-stat">
            <div class="num">${data.habitCount}</div>
            <div class="label">${t('coverHabitDays')}</div>
        </div>
        <div class="cover-stat">
            <div class="num">€${data.totalSaved}</div>
            <div class="label">${t('coverSaved')}</div>
        </div>
    </div>
    
    <div class="cover-footer">
        <p style="font-size: 14px; font-weight: 700;">${t('coverByline')}</p>
        <p>${t('coverDescription')}</p>
        <p>${new Date().toLocaleDateString(language === 'de' ? 'de-DE' : language === 'en' ? 'en-US' : language === 'ru' ? 'ru-RU' : 'es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p style="margin-top: 15px; font-size: 13px; color: #94a3b8;">${t('coverFooter')}</p>
    </div>
</div>

<!-- PAGE 2: GUIDE -->
<div class="pdf-page">
    <h2 class="page-title">${t('guidTitle')}</h2>
    
    <div class="content">
        <h3 class="section-title">${t('guideWhat')}</h3>
        <p>${t('guideWhatText')}</p>
        
        <h3 class="section-title" style="margin-top: 8px;">${t('guideHeatmap')}</h3>
        <div class="explanation-box">
            <div style="font-weight: 600; color: #6366f1; margin-bottom: 3px;">${t('guideHeatmapTitle')}</div>
            <p>${t('guideHeatmapText')}</p>
            <p style="margin-top: 4px;">${t('guideHeatmapColors')}</p>
        </div>
        
        <h3 class="section-title" style="margin-top: 8px;">${t('guideBreakdown')}</h3>
        <div class="explanation-box">
            <div style="font-weight: 600; color: #6366f1; margin-bottom: 3px;">${t('guideBreakdownTitle')}</div>
            <p>${t('guideBreakdownText')}</p>
            <p style="margin-top: 4px;"><strong>${t('guideBreakdownBars')}</strong></p>
        </div>
        
        <h3 class="section-title" style="margin-top: 8px;">${t('guideSections')}</h3>
        <p>${t('guideSectionWorkouts')}</p>
        <p>${t('guideSectionHabits')}</p>
        <p>${t('guideSectionFinance')}</p>
        <p>${t('guideSectionMood')}</p>
        <p>${t('guideSectionRecovery')}</p>
        <p>${t('guideSectionAchievements')}</p>
        
        <h3 class="section-title" style="margin-top: 8px;">${t('guideTips')}</h3>
        <p>${t('guideTip1')}</p>
        <p>${t('guideTip2')}</p>
        <p>${t('guideTip3')}</p>
    </div>
    
    <div class="page-number">1</div>
</div>

<!-- PAGE 3: WORKOUTS -->
<div class="pdf-page">
    <h2 class="page-title">${t('workoutTitle')}</h2>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="label">${t('workoutStrength')}</div>
            <div class="value">${data.strength}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('workoutStamina')}</div>
            <div class="value">${data.stamina}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('workoutTotal')}</div>
            <div class="value">${data.totalWorkouts}</div>
        </div>
    </div>
    
    <h3 class="section-title">${t('workoutHeatmapTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('workoutHeatmapExplain')}</strong>
    </div>
    ${data.dailyWorkoutHeatmap}
    
    <h3 class="section-title">${t('workoutMonthlyTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('workoutMonthlyExplain')}</strong>
    </div>
    ${data.monthlyWorkoutHeatmap}
    
    <h3 class="section-title">${t('workoutStrengthTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('workoutStrengthExplain')}</strong>
    </div>
    ${data.strengthBreakdown}
    
    <h3 class="section-title">${t('workoutStaminaTitle')}</h3>
    ${data.staminaBreakdown}
    
    <div class="page-number">2</div>
</div>

<!-- PAGE 4: HABITS -->
<div class="pdf-page">
    <h2 class="page-title">${t('habitTitle')}</h2>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="label">${t('habitTotalDays')}</div>
            <div class="value">${data.habitCount}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('habitCount')}</div>
            <div class="value">${data.habitsArray.length}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('habitAvgDays')}</div>
            <div class="value">${data.habitsArray.length > 0 ? Math.round(data.habitCount / data.habitsArray.length) : 0}</div>
        </div>
    </div>
    
    <h3 class="section-title">${t('habitHeatmapTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('habitHeatmapExplain')}</strong>
    </div>
    ${data.dailyHabitHeatmap}
    
    <h3 class="section-title">${t('habitTopTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('habitTopExplain')}</strong>
    </div>
    ${data.topHabitsHtml}
    
    <h3 class="section-title">${t('habitInsights')}</h3>
    ${data.habitInsights}
    
    <div class="page-number">3</div>
</div>

<!-- PAGE 5: FINANCE -->
<div class="pdf-page">
    <h2 class="page-title">${t('financeTitle')}</h2>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="label">${t('financeTotalSaved')}</div>
            <div class="value">€${data.totalSaved}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('financeTransactions')}</div>
            <div class="value">${data.financeCount}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('financeAvgMonth')}</div>
            <div class="value">€${Math.round(data.totalSaved / 12)}</div>
        </div>
    </div>
    
    <h3 class="section-title">${t('financeHeatmapTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('financeHeatmapExplain')}</strong>
    </div>
    ${data.dailyFinanceHeatmap}
    
    <h3 class="section-title">${t('financeMonthlyTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('financeMonthlyExplain')}</strong>
    </div>
    ${data.financeBreakdown}
    
    <h3 class="section-title">${t('financeInsights')}</h3>
    ${data.financeInsights}
    
    <div class="page-number">4</div>
</div>

<!-- PAGE 6: MOOD -->
<div class="pdf-page">
    <h2 class="page-title">${t('moodTitle')}</h2>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="label">${t('moodEntries')}</div>
            <div class="value">${data.moods}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('moodPositive')}</div>
            <div class="value">${data.moodDistribution.great + data.moodDistribution.good}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('moodPercent')}</div>
            <div class="value">${data.avgMood}</div>
        </div>
    </div>
    
    <h3 class="section-title">${t('moodHeatmapTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('moodHeatmapExplain')}</strong>
    </div>
    ${data.dailyMoodHeatmap}
    
    <h3 class="section-title">${t('moodBreakdownTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('moodBreakdownExplain')}</strong>
    </div>
    ${data.moodBreakdown}
    
    <div class="page-number">5</div>
</div>

<!-- PAGE 7: RECOVERY -->
<div class="pdf-page">
    <h2 class="page-title">${t('recoveryTitle')}</h2>
    
    <div class="stats-grid">
        <div class="stat-card">
            <div class="label">${t('recoveryTrackers')}</div>
            <div class="value">${data.trackers}</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('recoveryBestStreak')}</div>
            <div class="value">${data.cleanDays}d</div>
        </div>
        <div class="stat-card">
            <div class="label">${t('recoverySaved')}</div>
            <div class="value">€${data.addictionMoneySaved}</div>
        </div>
    </div>
    
    <h3 class="section-title">${t('recoveryTitle')}</h3>
    <div class="explanation-box">
        <strong>${t('recoveryExplain')}</strong>
    </div>
    ${data.trackersBreakdown}
    
    <h3 class="section-title">${t('recoveryInsights')}</h3>
    ${data.addictionInsights}
    
    <div class="highlight-box">
        <strong>${t('recoveryAchievement')}</strong> ${t('recoveryAchievementText')}
    </div>
    
    <div class="page-number">6</div>
</div>

<!-- PAGE 8: STATISTICS -->
<div class="pdf-page">
    <h2 class="page-title">${t('statsTitle')}</h2>
    
    <h3 class="section-title">${t('statsPerformance')}</h3>
    <table class="info-table">
        <tr>
            <th>${t('statsCategory')}</th>
            <th>${t('statsCount')}</th>
            <th>${t('statsRating')}</th>
        </tr>
        <tr>
            <td><strong>${t('workoutStrength')}</strong></td>
            <td>${data.strength}</td>
            <td>${data.strength > 30 ? t('statsExcellent') : data.strength > 15 ? t('statsGood') : t('statsBuild')}</td>
        </tr>
        <tr>
            <td><strong>${t('workoutStamina')}</strong></td>
            <td>${data.stamina}</td>
            <td>${data.stamina > 30 ? t('statsExcellent') : data.stamina > 15 ? t('statsGood') : t('statsBuild')}</td>
        </tr>
        <tr>
            <td><strong>${t('habitTitle')}</strong></td>
            <td>${data.habitCount}</td>
            <td>${data.habitCount > 100 ? t('statsExcellent') : data.habitCount > 50 ? t('statsGood') : t('statsBuild')}</td>
        </tr>
    </table>
    
    <h3 class="section-title">${t('statsMetrics')}</h3>
    <p><strong>${t('statsTotalWorkouts')}</strong> ${data.totalWorkouts} ${t('sessions')}</p>
    <p><strong>${t('statsUniqueDays')}</strong> ${data.totalWorkoutDays} ${t('tableHeaderDays')}</p>
    <p><strong>${t('statsAvgMonth')}</strong> ${Math.round(data.totalWorkouts / 12)} ${t('sessions')}</p>
    
    <div class="page-number">7</div>
</div>

<!-- PAGE 9: ACHIEVEMENTS -->
<div class="pdf-page">
    <h2 class="page-title">${t('achievementTitle')}</h2>
    
    <h3 class="section-title">${t('achievementMilestones')}</h3>
    ${data.achievementsHtml}
    
    <h3 class="section-title">${t('achievementScores')}</h3>
    <table class="info-table">
        <tr>
            <th>${t('achievementScoreDimension')}</th>
            <th>${t('achievementScoreValue')}</th>
        </tr>
        <tr>
            <td>${t('achievementConsistency')}</td>
            <td><strong>9.2/10</strong> 🟢</td>
        </tr>
        <tr>
            <td>${t('achievementDiscipline')}</td>
            <td><strong>8.8/10</strong> 🟢</td>
        </tr>
        <tr>
            <td>${t('achievementHealth')}</td>
            <td><strong>9.0/10</strong> 🟢</td>
        </tr>
        <tr>
            <td>${t('achievementFinancial')}</td>
            <td><strong>8.5/10</strong> 🟢</td>
        </tr>
        <tr>
            <td>${t('achievementWellbeing')}</td>
            <td><strong>8.7/10</strong> 🟢</td>
        </tr>
    </table>
    
    <div class="page-number">8</div>
</div>

<!-- PAGE 10: GOALS -->
<div class="pdf-page">
    <h2 class="page-title">${t('goalsTitle')} ${year + 1}</h2>
    
    <h3 class="section-title">${t('goalsTargets')}</h3>
    <div class="achievement-list">
        <div class="achievement-item">${t('goalsTarget1')} <strong>${Math.round(data.totalWorkouts * 1.2)}</strong> ${t('goalsTarget1b')}</div>
        <div class="achievement-item">${t('goalsTarget2')}</div>
        <div class="achievement-item">${t('goalsTarget3')} <strong>€${Math.round(data.totalSaved * 1.5)}</strong> ${t('goalsTarget3b')}</div>
        <div class="achievement-item">${t('goalsTarget4')}</div>
        <div class="achievement-item">${t('goalsTarget5')}</div>
    </div>
    
    <h3 class="section-title">${t('goalsActions')}</h3>
    <table class="info-table">
        <tr>
            <th>${t('goalsPriority')}</th>
            <th>${t('goalsAction')}</th>
            <th>${t('goalsTarget')}</th>
        </tr>
        <tr>
            <td>${t('goalsHigh')}</td>
            <td>${t('goalsEstablish')}</td>
            <td>${t('goalsEstablishTarget')}</td>
        </tr>
        <tr>
            <td>${t('goalsHigh')}</td>
            <td>${t('goalsKeystone')}</td>
            <td>${t('goalsKeystoneTarget')}</td>
        </tr>
        <tr>
            <td>${t('goalsMedium')}</td>
            <td>${t('goalsSavings')}</td>
            <td>${t('goalsSavingsTarget')}</td>
        </tr>
    </table>
    
    <div class="page-number">9</div>
</div>

<!-- PAGE 11: INSIGHTS -->
<div class="pdf-page">
    <h2 class="page-title">${t('insightsTitle')}</h2>
    
    <h3 class="section-title">${t('insightsLearnings')}</h3>
    <div class="achievement-list">
        <div class="achievement-item">${t('insightsData')}</div>
        <div class="achievement-item">${t('insightsConsistency')}</div>
        <div class="achievement-item">${t('insightsDimensions')}</div>
        <div class="achievement-item">${t('insightsRecovery')}</div>
        <div class="achievement-item">${t('insightsDifferent')} ${year} ${t('insightsDifferentB')} ${year} ${t('insightsDifferentC')}</div>
    </div>
    
    <h3 class="section-title">${t('insightsAhead')}</h3>
    <div class="explanation-box">
        ${t('insightsAheadText')}
    </div>
    
    <div class="page-number">10</div>
</div>

<!-- PAGE 12: CLOSING -->
<div class="pdf-page">
    <h2 class="page-title">${t('closingTitle')}</h2>
    
    <h3 class="section-title">${t('closingSteps')}</h3>
    <div class="achievement-list">
        <div class="achievement-item">${t('closingStep1')}</div>
        <div class="achievement-item">${t('closingStep2')}</div>
        <div class="achievement-item">${t('closingStep3')} ${year + 1} ${t('closingStep3b')}</div>
    </div>
    
    <h3 class="section-title">${t('closingUse')}</h3>
    <p>${t('closingUse1')}</p>
    <p>${t('closingUse2')}</p>
    <p>${t('closingUse3')}</p>
    <p>${t('closingUse4')}</p>
    <p>${t('closingUse5')}</p>
    
    <div style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; border-radius: 4px; padding: 8px; text-align: center; margin-top: 10px; font-size: 15px;">
        <p style="margin: 2px 0;"><strong>${t('closingMotivation')}</strong></p>
        <p style="margin: 2px 0;">${t('closingMotivationB')}</p>
        <p style="margin: 2px 0; font-size: 12px; font-weight: 600;">${t('closingMotivationC')}</p>
    </div>
    
    <div class="page-number">11</div>
</div>

</body>
</html>
    `;
}

// ===== COLLECT PDF DATA =====
function collectUltraPDFData(language = 'de') {
    const staminaEntries = JSON.parse(localStorage.getItem('staminaEntries') || '[]');
    const strengthEntries = JSON.parse(localStorage.getItem('strengthEntries') || '[]');
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const moodEntries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
    const trackers = JSON.parse(localStorage.getItem('trackers') || '[]');
    const financeEntries = JSON.parse(localStorage.getItem('financeEntries') || '[]');
    
    const stamina = staminaEntries.length;
    const strength = strengthEntries.length;
    const totalWorkouts = stamina + strength;
    
    const workoutDates = new Set();
    staminaEntries.forEach(e => workoutDates.add(new Date(e.date).toDateString()));
    strengthEntries.forEach(e => workoutDates.add(new Date(e.date).toDateString()));
    const totalWorkoutDays = workoutDates.size;
    
    let habitCount = 0;
    habits.forEach(h => {
        if (h.entries) habitCount += h.entries.length;
        if (h.dates) habitCount += Object.values(h.dates).filter(v => v).length;
    });
    
    const moods = moodEntries.length;
    const totalSaved = financeEntries.reduce((sum, e) => sum + (e.amount || 0), 0);
    const financeCount = financeEntries.length;
    
    let cleanDays = 0, addictionMoneySaved = 0;
    trackers.forEach(t => {
        if (t.mode === 'clean' && t.elapsedTime) {
            const days = Math.floor(t.elapsedTime / (1000 * 60 * 60 * 24));
            cleanDays = Math.max(cleanDays, days);
        }
        if (t.showMoneySaved && t.cost && t.elapsedTime) {
            const days = Math.floor(t.elapsedTime / (1000 * 60 * 60 * 24));
            addictionMoneySaved += t.cost * days;
        }
    });
    
    let moodDistribution = { great: 0, good: 0, okay: 0, bad: 0, terrible: 0 };
    moodEntries.forEach(m => {
        if (m.mood === 5) moodDistribution.great++;
        else if (m.mood === 4) moodDistribution.good++;
        else if (m.mood === 3) moodDistribution.okay++;
        else if (m.mood === 2) moodDistribution.bad++;
        else if (m.mood === 1) moodDistribution.terrible++;
    });
    const avgMood = moods > 0 ? Math.round(((moodDistribution.great + moodDistribution.good) / moods) * 100) + '%' : 'N/A';
    
    return {
        stamina, strength, totalWorkouts, totalWorkoutDays, habitCount, moods, cleanDays, trackers: trackers.length,
        totalSaved: Math.round(totalSaved), financeCount, addictionMoneySaved: Math.round(addictionMoneySaved),
        avgMood, habitsArray: habits, moodDistribution,
        dailyWorkoutHeatmap: generateDailyHeatmapCompact(staminaEntries, strengthEntries),
        monthlyWorkoutHeatmap: generateMonthlyHeatmapCompact(staminaEntries, strengthEntries),
        strengthBreakdown: generateDetailedBreakdownCompact(strengthEntries, 'strength'),
        staminaBreakdown: generateDetailedBreakdownCompact(staminaEntries, 'stamina'),
        dailyHabitHeatmap: generateDailyHabitsHeatmapCompact(habits),
        topHabitsHtml: generateTopHabitsCompact(habits),
        habitInsights: generateInsightsCompact('habits', habitCount, habits, language),
        dailyFinanceHeatmap: generateDailyFinanceHeatmapCompact(financeEntries),
        financeBreakdown: generateDetailedFinanceBreakdownCompact(financeEntries),
        financeInsights: generateInsightsCompact('finance', totalSaved, financeEntries, language),
        dailyMoodHeatmap: generateDailyMoodHeatmapCompact(moodEntries),
        moodBreakdown: generateDetailedMoodBreakdownCompact(moodDistribution, moods, language),
        trackersBreakdown: generateDetailedTrackersBreakdownCompact(trackers, language),
        addictionInsights: generateInsightsCompact('addiction', cleanDays, trackers, language),
achievementsHtml: generateDetailedAchievementsCompact(totalWorkouts, habitCount, moods, stamina, strength, language)    };
}

// ===== HEATMAP & BREAKDOWN GENERATORS =====
function generateDailyHeatmapCompact(stamina, strength) {
    const year = new Date().getFullYear();
    const startDate = new Date(year, 0, 1);
    const dailyData = {};
    
    for (let d = new Date(startDate); d.getFullYear() === year; d.setDate(d.getDate() + 1)) {
        dailyData[d.toDateString()] = 0;
    }
    
    stamina.forEach(e => {
        const dateStr = new Date(e.date).toDateString();
        if (dailyData.hasOwnProperty(dateStr)) dailyData[dateStr]++;
    });
    strength.forEach(e => {
        const dateStr = new Date(e.date).toDateString();
        if (dailyData.hasOwnProperty(dateStr)) dailyData[dateStr]++;
    });
    
    const values = Object.values(dailyData);
    const max = Math.max(...values, 1);
    
    let html = '<div class="heatmap-container"><div class="daily-heatmap-grid">';
    Object.entries(dailyData).forEach(([date, count]) => {
        const intensity = count / max;
        const color = `hsl(120, ${intensity * 100}%, ${100 - intensity * 50}%)`;
        html += `<div class="daily-heatmap-cell" style="background: ${color};"></div>`;
    });
    html += '</div></div>';
    return html;
}

function generateMonthlyHeatmapCompact(stamina, strength) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = new Array(12).fill(0);
    
    stamina.forEach(e => data[new Date(e.date).getMonth()]++);
    strength.forEach(e => data[new Date(e.date).getMonth()]++);
    
    const max = Math.max(...data, 1);
    
    let html = '<div class="heatmap-container"><div class="monthly-heatmap-grid">';
    months.forEach((month, i) => {
        const intensity = data[i] / max;
        const color = `hsl(120, ${intensity * 100}%, ${100 - intensity * 50}%)`;
        html += `<div class="monthly-heatmap-cell" style="background: ${color};">${data[i]}</div>`;
    });
    html += '</div></div>';
    return html;
}

function generateDetailedBreakdownCompact(entries, type) {
    const types = {};
    entries.forEach(e => {
        types[e.type] = (types[e.type] || 0) + 1;
    });
    
    const total = entries.length;
    let html = '<div class="breakdown-section">';
    Object.entries(types).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
        const pct = Math.round((count / total) * 100);
        html += `
            <div class="breakdown-item">
                <span>${type}</span>
                <span>${count} (${pct}%)</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${pct}%"></div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function generateDailyHabitsHeatmapCompact(habits) {
    const year = new Date().getFullYear();
    const dailyData = {};
    
    for (let d = new Date(year, 0, 1); d.getFullYear() === year; d.setDate(d.getDate() + 1)) {
        dailyData[d.toDateString()] = 0;
    }
    
    habits.forEach(h => {
        if (h.dates) {
            Object.entries(h.dates).forEach(([dateStr, checked]) => {
                if (checked && dailyData.hasOwnProperty(dateStr)) dailyData[dateStr]++;
            });
        }
        if (h.entries) {
            h.entries.forEach(e => {
                const dateStr = new Date(e.date).toDateString();
                if (dailyData.hasOwnProperty(dateStr)) dailyData[dateStr]++;
            });
        }
    });
    
    const values = Object.values(dailyData);
    const max = Math.max(...values, 1);
    
    let html = '<div class="heatmap-container"><div class="daily-heatmap-grid">';
    Object.entries(dailyData).forEach(([date, count]) => {
        const intensity = count / max;
        const color = `hsl(45, ${intensity * 100}%, ${100 - intensity * 50}%)`;
        html += `<div class="daily-heatmap-cell" style="background: ${color};"></div>`;
    });
    html += '</div></div>';
    return html;
}

function generateTopHabitsCompact(habits) {
    if (!habits.length) return '';
    
    let html = '<div class="breakdown-section">';
    habits.slice(0, 3).forEach(h => {
        const count = (h.entries ? h.entries.length : 0) + (h.dates ? Object.values(h.dates).filter(v => v).length : 0);
        const pct = Math.min((count / 100) * 100, 100);
        html += `
            <div class="breakdown-item">
                <span>${h.name}</span>
                <span><strong>${count}d</strong></span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${pct}%; background: linear-gradient(90deg, #f97316, #ea580c);"></div>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function generateDailyFinanceHeatmapCompact(entries) {
    const year = new Date().getFullYear();
    const dailyData = {};
    
    for (let d = new Date(year, 0, 1); d.getFullYear() === year; d.setDate(d.getDate() + 1)) {
        dailyData[d.toDateString()] = 0;
    }
    
    entries.forEach(e => {
        const dateStr = new Date(e.date).toDateString();
        if (dailyData.hasOwnProperty(dateStr)) dailyData[dateStr] += e.amount || 0;
    });
    
    const values = Object.values(dailyData);
    const max = Math.max(...values, 1);
    
    let html = '<div class="heatmap-container"><div class="daily-heatmap-grid">';
    Object.entries(dailyData).forEach(([date, amount]) => {
        const intensity = amount / max;
        const color = `hsl(45, ${intensity * 100}%, ${100 - intensity * 50}%)`;
        html += `<div class="daily-heatmap-cell" style="background: ${color};"></div>`;
    });
    html += '</div></div>';
    return html;
}

function generateDetailedFinanceBreakdownCompact(entries) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyData = new Array(12).fill(0);
    
    entries.forEach(e => {
        const month = new Date(e.date).getMonth();
        monthlyData[month] += e.amount || 0;
    });
    
    let html = '<table class="info-table"><tr><th>Month</th><th>Saved</th></tr>';
    monthlyData.forEach((amount, i) => {
        if (amount > 0) {
            html += `<tr><td>${months[i]}</td><td>€${amount.toFixed(2)}</td></tr>`;
        }
    });
    html += '</table>';
    return html;
}

function generateDailyMoodHeatmapCompact(entries) {
    const year = new Date().getFullYear();
    const dailyData = {};
    
    for (let d = new Date(year, 0, 1); d.getFullYear() === year; d.setDate(d.getDate() + 1)) {
        dailyData[d.toDateString()] = 0;
    }
    
    entries.forEach(e => {
        const dateStr = new Date(e.date).toDateString();
        if (dailyData.hasOwnProperty(dateStr) && e.mood >= 4) {
            dailyData[dateStr]++;
        }
    });
    
    const values = Object.values(dailyData);
    const max = Math.max(...values, 1);
    
    let html = '<div class="heatmap-container"><div class="daily-heatmap-grid">';
    Object.entries(dailyData).forEach(([date, count]) => {
        const intensity = count / max;
        const color = `hsl(280, ${intensity * 100}%, ${100 - intensity * 50}%)`;
        html += `<div class="daily-heatmap-cell" style="background: ${color};"></div>`;
    });
    html += '</div></div>';
    return html;
}

function generateDetailedMoodBreakdownCompact(dist, total, language = 'de') {
    const t = (key) => getPdfTranslation(key, language);
    let html = `<table class="info-table"><tr><th>${t('tableHeaderMood')}</th><th>${t('tableHeaderDays')}</th><th>${t('tableHeaderPercent')}</th></tr>`; 
    
const moods = [
    { label: `<span style="font-size: 24px;">😄</span> ${t('great')}`, value: dist.great },
    { label: `<span style="font-size: 24px;">😊</span> ${t('good')}`, value: dist.good },
    { label: `<span style="font-size: 24px;">😐</span> ${t('okay')}`, value: dist.okay },
    { label: `<span style="font-size: 24px;">😕</span> ${t('bad')}`, value: dist.bad },
    { label: `<span style="font-size: 24px;">😢</span> ${t('terrible')}`, value: dist.terrible }
];
    
    moods.forEach(m => {
        const pct = total > 0 ? Math.round((m.value / total) * 100) : 0;
        html += `<tr><td>${m.label}</td><td>${m.value}</td><td>${pct}%</td></tr>`;
    });
    
    html += '</table>';
    return html;
}

// ============================================================================
// COPY THIS ENTIRE FUNCTION AND PASTE IT INTO pdf-export.js
// Replace the old generateDetailedTrackersBreakdownCompact function
// ============================================================================

function generateDetailedTrackersBreakdownCompact(trackers, language = 'de') {
    if (!trackers || trackers.length === 0) {
        const t = (key) => getPdfTranslation(key, language);
        return '<p>' + t('noTrackers') + '</p>';
    }
    
    const t = (key) => getPdfTranslation(key, language);
    
    const cleanTrackers = trackers.filter(tr => tr.mode === 'clean');
    const reductionTrackers = trackers.filter(tr => tr.mode !== 'clean');
    
    let html = '';
    
    // ===== CLEAN MODE =====
    if (cleanTrackers.length > 0) {
        html += `<h4 style="font-size: 16px; font-weight: 600; margin: 12px 0 8px 0; color: #0f172a;">
                    🚫 ${t('recoveryTrackers')}
                </h4>`;
        html += `<table class="info-table" style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                    <tr style="background: #f1f5f9;">
                        <th style="padding: 8px; text-align: left; font-weight: 600; border-bottom: 2px solid #e2e8f0;">
                            ${t('tableHeaderTracker')}
                        </th>
                        <th style="padding: 8px; text-align: center; font-weight: 600; border-bottom: 2px solid #e2e8f0;">
                            ${t('tableHeaderDays')}
                        </th>
                        <th style="padding: 8px; text-align: right; font-weight: 600; border-bottom: 2px solid #e2e8f0;">
                            ${t('tableHeaderSaved')}
                        </th>
                    </tr>`;
        
        cleanTrackers.forEach(tracker => {
            // ECHTE FORMULA AUS DER APP
            let totalTime = tracker.elapsedTime || 0;
            if (tracker.active && tracker.startTime) {
                totalTime += Date.now() - tracker.startTime;
            }
            
            const days = Math.floor(totalTime / (1000 * 60 * 60 * 24));
            const savedMoney = (days / 7 * tracker.cost).toFixed(2);
            
            const trackerName = tracker.name || 'Unnamed';
            html += `<tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px; text-align: left;">${trackerName}</td>
                        <td style="padding: 8px; text-align: center;">${days}d</td>
                        <td style="padding: 8px; text-align: right;">€${savedMoney}</td>
                    </tr>`;
        });
        
        html += '</table>';
    }
    
    // ===== REDUCTION MODE =====
    if (reductionTrackers.length > 0) {
        html += `<h4 style="font-size: 16px; font-weight: 600; margin: 12px 0 8px 0; color: #0f172a;">
                    📉 ${t('reductionMode')}
                </h4>`;
        html += `<table class="info-table" style="width: 100%; border-collapse: collapse; margin-bottom: 12px;">
                    <tr style="background: #f1f5f9;">
                        <th style="padding: 8px; text-align: left; font-weight: 600; border-bottom: 2px solid #e2e8f0;">
                            ${t('tableHeaderTracker')}
                        </th>
                        <th style="padding: 8px; text-align: center; font-weight: 600; border-bottom: 2px solid #e2e8f0;">
                            ${t('tableHeaderGoal')}
                        </th>
                        <th style="padding: 8px; text-align: center; font-weight: 600; border-bottom: 2px solid #e2e8f0;">
                            ${t('tableHeaderCurrent')}
                        </th>
                        <th style="padding: 8px; text-align: right; font-weight: 600; border-bottom: 2px solid #e2e8f0;">
                            ${t('tableHeaderSaved')}
                        </th>
                    </tr>`;
        
        reductionTrackers.forEach(tracker => {
            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            
            // ECHTE WERTE AUS DER APP
            const dailyLimit = tracker.dailyLimit || 3;
            const monthlyGoal = tracker.monthlyGoal || 20;
            
            // Zähle Tage unter Limit
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
            
            // ECHTE FORMULA AUS DER APP
            const assumedWithoutLimit = dailyLimit * 2;
            const savedPerMonth = (assumedWithoutLimit * daysInMonth - monthTotal) * (tracker.cost / (assumedWithoutLimit * 4));
            
            const trackerName = tracker.name || 'Unnamed';
            html += `<tr style="border-bottom: 1px solid #e2e8f0;">
                        <td style="padding: 8px; text-align: left;">${trackerName}</td>
                        <td style="padding: 8px; text-align: center;">${monthlyGoal}</td>
                        <td style="padding: 8px; text-align: center;">${daysUnderLimit}</td>
                        <td style="padding: 8px; text-align: right;">€${savedPerMonth.toFixed(2)}</td>
                    </tr>`;
        });
        
        html += '</table>';
    }
    
    if (html === '') {
        return '<p>' + t('noTrackers') + '</p>';
    }
    
    return html;
}

// ============================================================================
// ANLEITUNG ZUM EINFÜGEN:
// ============================================================================
/*

1. Öffne /mnt/project/pdf-export.js

2. Finde die Zeile mit: function generateDetailedTrackersBreakdownCompact(trackers, language = 'de') {
   (sollte irgendwo um Zeile 1181 sein)

3. Lösche die KOMPLETTE alte Funktion bis zur nächsten Funktion:
   (bis zu: function generateInsightsCompact)

4. Füge diesen kompletten Code ein

5. Speichern

6. PDF generieren und testen

*/




function generateInsightsCompact(category, count, entries, language = 'de') {
    const t = (key) => getPdfTranslation(key, language);
    let insight = '';
    
    if (category === 'habits') {
        const habitText = language === 'ru' 
            ? `Ваша сила привычки: ${count} завершений показывают самоотверженность. Это дисциплина в действии!`
            : language === 'en'
            ? `Your habit strength: ${count} completions show dedication. That's discipline in action!`
            : language === 'es'
            ? `Tu fuerza de hábito: ${count} finalizaciones muestran dedicación. ¡Eso es disciplina en acción!`
            : `Ihre Gewohnheitskraft: ${count} Vervollständigungen zeigen Hingabe. Das ist Disziplin in Aktion!`;
        insight = `<div class="explanation-box"><strong>${habitText}</strong></div>`;
    } else if (category === 'finance') {
        const monthAmount = Math.round(count / 12);
        const financeText = language === 'ru'
            ? `Достижение в сбережениях: €${count} в год = €${monthAmount}/месяц. Вы строите богатство! 💰`
            : language === 'en'
            ? `Savings achievement: €${count} in a year = €${monthAmount}/month. You're building wealth! 💰`
            : language === 'es'
            ? `Logro de ahorros: €${count} en un año = €${monthAmount}/mes. ¡Estás construyendo riqueza! 💰`
            : `Sparleistung: €${count} in einem Jahr = €${monthAmount}/Monat. Du baust Vermögen auf! 💰`;
        insight = `<div class="explanation-box"><strong>${financeText}</strong></div>`;
    } else if (category === 'addiction') {
        const addictionText = language === 'ru'
            ? `Сила восстановления: ${count} дней трезвости - ЭТО ОГРОМНО. Каждый день доказывает, что ты сильнее своих триггеров! 🔥`
            : language === 'en'
            ? `Recovery power: ${count} days clean is HUGE. Every day proves you're stronger than your triggers! 🔥`
            : language === 'es'
            ? `Poder de recuperación: ${count} días limpios es ENORME. ¡Cada día prueba que eres más fuerte que tus disparadores! 🔥`
            : `Genesungskraft: ${count} Tage sauber ist RIESIG. Jeder Tag beweist, dass du stärker bist als deine Auslöser! 🔥`;
        insight = `<div class="explanation-box"><strong>${addictionText}</strong></div>`;
    }
    return insight;
}

function generateDetailedAchievementsCompact(total, habits, moods, stamina, strength, language = 'de') {
    const t = (key) => getPdfTranslation(key, language);
    
    let achievements = [];
    if (language === 'ru') {
        achievements = [
            `💪 Зафиксирована <strong>${total}</strong> тренировка (${stamina} Выносливость + ${strength} Сила)`,
            `✅ Завершено <strong>${habits}</strong> дней привычек—это трансформация!`,
            `😊 Отслежено эмоции <strong>${moods}</strong> раз—осознание эмоций важно`,
            `🔥 Показывал последовательность весь год`,
            `🎯 Создал реальный импульс для изменения жизни`,
            `📈 Предпринял действие каждый день`
        ];
    } else if (language === 'en') {
        achievements = [
            `💪 Logged <strong>${total}</strong> workouts (${stamina} Stamina + ${strength} Strength)`,
            `✅ Completed <strong>${habits}</strong> habit days—that's transformation!`,
            `😊 Tracked emotions <strong>${moods}</strong> times—emotional awareness matters`,
            `🔥 Showed up consistently all year`,
            `🎯 Built real momentum for life change`,
            `📈 Took action every single day`
        ];
    } else if (language === 'es') {
        achievements = [
            `💪 Registrado <strong>${total}</strong> entrenamientos (${stamina} Resistencia + ${strength} Fuerza)`,
            `✅ Completado <strong>${habits}</strong> días de hábitos—¡eso es transformación!`,
            `😊 Emociones rastreadas <strong>${moods}</strong> veces—la conciencia emocional importa`,
            `🔥 Se mostró consistentemente todo el año`,
            `🎯 Construyó impulso real para el cambio de vida`,
            `📈 Tomó medidas cada día`
        ];
    } else {
        achievements = [
            `💪 <strong>${total}</strong> Trainings protokolliert (${stamina} Ausdauer + ${strength} Kraft)`,
            `✅ <strong>${habits}</strong> Gewohnheitstage abgeschlossen—das ist Transformation!`,
            `😊 Emotionen <strong>${moods}</strong>-mal erfasst—emotionale Bewusstsein ist wichtig`,
            `🔥 Das ganze Jahr über konsistent dabei`,
            `🎯 Echten Schwung für Lebensveränderung aufgebaut`,
            `📈 Jeden Tag Maßnahmen ergriffen`
        ];
    }
    
    let html = '<div class="achievement-list">';
    achievements.forEach(a => {
        html += `<div class="achievement-item">${a}</div>`;
    });
    html += '</div>';
    return html;
}

// ===== LOADING MODAL =====
function showPDFLoadingModal() {
    const modal = document.createElement('div');
    modal.id = 'pdfLoadingModal';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
        z-index: 9999; backdrop-filter: blur(8px);
    `;
    modal.innerHTML = `
        <div style="background: white; padding: 40px; border-radius: 16px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 16px; animation: spin 1s linear infinite;">⚙️</div>
            <h2 style="font-size: 18px; color: #0f172a; font-weight: 700;">Generating PDF...</h2>
            <p style="color: #64748b; font-size: 12px;">Creating your complete report</p>
        </div>
        <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    `;
    document.body.appendChild(modal);
}

// ===== UPDATE PDF SECTION TEXT WITH TRANSLATIONS =====
function updatePdfSectionTranslations(language = 'de') {
    document.querySelectorAll('#pdfExportSection [data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getPdfTranslation(key, language);
        element.textContent = translation;
    });
    console.log(`📥 PDF Section translated to: ${language}`);
}

// Call this when language changes
window.addEventListener('languageChanged', (e) => {
    updatePdfSectionTranslations(e.detail.language);
});

// ===== LANGUAGE SELECTOR =====
function showLanguageSelectorForPDF() {
    const languages = [
        { code: 'de', name: '🇩🇪 Deutsch' },
        { code: 'en', name: '🇬🇧 English' },
        { code: 'ru', name: '🇷🇺 Русский' },
        { code: 'es', name: '🇪🇸 Español' }
    ];
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.6); display: flex; align-items: center;
        justify-content: center; z-index: 9998; backdrop-filter: blur(8px);
    `;
    
    let html = `
        <div style="background: white; padding: 30px; border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3); min-width: 300px;">
            <h2 style="margin-bottom: 20px; color: #0f172a; font-size: 20px; font-weight: 700;">
                📥 Select Language
            </h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
    `;
    
    languages.forEach(lang => {
        html += `
            <button onclick="
                exportYearlyPDFHtml2Pdf('${lang.code}');
                this.closest('div').parentElement.parentElement.remove();
            " style="padding: 15px 20px; border: 2px solid #e2e8f0; background: white;
            border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600;
            transition: all 0.3s;">
                ${lang.name}
            </button>
        `;
    });
    
    html += `</div></div>`;
    modal.innerHTML = html;
    document.body.appendChild(modal);
}

console.log('✅ PDF Export System Loaded');
window.exportYearlyPDFHtml2Pdf = exportYearlyPDFHtml2Pdf;
window.showLanguageSelectorForPDF = showLanguageSelectorForPDF;
window.updatePdfSectionTranslations = updatePdfSectionTranslations;
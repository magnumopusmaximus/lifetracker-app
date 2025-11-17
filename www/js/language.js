// GLOBALE SPRACHE
let currentLanguage = localStorage.getItem('language') || 'en'; // Standard: Englisch

const translations = {
    de: {

        financeManagement: 'Finanzmanagement',
        financePlanningTitle: '📊 Finanzplanung',
        income: 'Einnahmen',
        expenses: 'Ausgaben',
        currentBalance: 'Aktueller Stand',
        fixed: 'Fest',
        variable: 'Variabel',
        addIncome: '+ Hinzufügen',
        addExpense: '+ Hinzufügen',
        incomeType: 'Einnahmen-Typ:',
        incomeTypeFixed: 'Fix (z.B. Gehalt)',
        incomeTypeVariable: 'Variabel (z.B. Bonus)',
        fixedIncome: 'Feste Einnahme',
        variableIncome: 'Variable Einnahme',
        expenseType: 'Ausgaben-Typ:',
        expenseTypeFixed: 'Fix (z.B. Miete)',
        expenseTypeVariable: 'Variabel (z.B. Essen)',
        fixedExpense: 'Fixe Ausgabe',
        variableExpense: 'Variable Ausgabe',
        noFixedIncomeYet: 'Keine festen Einnahmen',
        noVariableIncomeYet: 'Keine variablen Einnahmen',
        noFixedExpenseYet: 'Keine festen Ausgaben',
        noVariableExpenseYet: 'Keine variablen Ausgaben',
        currentlyAvailable: 'Verfügbar',
        positiveBalance: '✅ Positiv',
        negativeBalance: '⚠️ Negativ',

        trainingsPerMonth: "Trainings pro Monat",

tableHeaderMonth: 'Monat',
tableHeaderSaved: 'Gespart',
tableHeaderDays: 'Tage',
tableHeaderTracker: 'Tracker',
great: 'Großartig',
good: 'Gut',
okay: 'Okay',
bad: 'Schlecht',
terrible: 'Furchtbar',

        pdfDownloadTitle: 'Pro: Laden Sie Ihren Jahresbericht herunter',
        pdfDownloadDesc: 'Erhalten Sie Ihren vollständigen Jahresbericht mit allen Statistiken',
        pdfFeature1: '📊 Alle Gewohnheits- & Tracker-Statistiken',
        pdfFeature2: '📈 Detaillierte Diagramme für alle Kategorien',
        pdfFeature3: '📝 Zusammenfassung der Stimmungseinträge',
        pdfFeature4: '💪 Kraft- & Ausdauer-Trainingsprotokoll',
        pdfFeature5: '🚫 Fortschritt der Suchtbekämpfung',
        pdfFeature6: '🏆 Erfolge & Meilensteine',
        pdfFeature7: '💰 Ersparte Geldberechnungen',
        pdfFeature8: '📅 Vollständige Jahresübersicht Kalender',
        pdfDownloadBtn: '📥 Jahresbericht herunterladen',
        pdfFooter: 'PDF Format • Nur auf Ihrem Gerät • Keine Datenweitergabe',
        proVersion: '💎 Pro Version',
        selectLanguage: 'Sprache wählen',

            proVersion: 'Pro Version',
    unlockedFeatures: 'Schalte Pro Features frei!',
    pdfExport: 'Jahresübersicht als PDF exportieren',
    advancedStats: 'Erweiterte Statistiken',
    noAds: 'Keine Werbung',

    calisthenics: 'Calisthenics',
    running: 'Laufen',
    cardio: 'Cardio',
    hiit: 'HIIT',

    enter0ToDelete: 'Gib 0 ein zum Löschen',
        Name: 'Bezeichnung',

        // ===== HÄUFIGE HINTS & MESSAGES =====
        amountToday: 'Betrag heute:',
        amountLabel: 'Betrag:',
        editTrackerDay: 'Tag bearbeiten',
        
        hintAddItem: 'Drücke +, um eine neue Eintrag hinzuzufügen',
        hintEditItem: 'Tippe zum Bearbeiten',
        hintDeleteItem: 'Lange drücken zum Löschen',
        hintSwipeLeft: 'Nach links wischen zum Löschen',
        hintSwipeRight: 'Nach rechts wischen für Details',
        hintTapDetails: 'Tippe für weitere Informationen',
        noData: 'Keine Daten vorhanden',
        loading: 'Lädt...',
        error: 'Ein Fehler ist aufgetreten',
        success: 'Erfolgreich!',
        warning: 'Warnung',
        info: 'Information',
        
        // ===== WERBUNG & UNTERSTÜTZUNG =====
        removeAdsTitle: 'Alle Werbung entfernen',
        adFreeExperience: 'Genieße ein werbefreies Erlebnis!',
        noMorePopups: 'Keine Popup-Werbung mehr',
        smoothExperience: 'Reibungslose Nutzung',
        supportDevelopment: 'Unterstütze die Entwicklung',
        oneTimePurchase: 'Einmaliger Kauf, lebenslanger Zugang',
        oneTime: 'einmalig',
        purchaseNow: 'Jetzt kaufen',
        purchaseComplete: 'Kauf abgeschlossen!',
        adsRemovedSuccess: 'Alle Werbung entfernt!',
        loadingAd: 'Werbung wird geladen...',

        supportTitle: 'Entwickler unterstützen',
        supportMessage: 'Hey! Ich bin ein Solo-Entwickler, der hart daran arbeitet, diese App für dich besser zu machen. Wenn du sie gerne nutzt und mich unterstützen möchtest, kannst du ein paar Werbeanzeigen ansehen. Jede Ansicht hilft mir bei der Weiterentwicklung! 🙏',
        supportShort: 'Kurze Werbung',
        supportShortDesc: '1 kurze Werbung (~15 Sek)',
        supportMedium: 'Standard Werbung',
        supportMediumDesc: '1 Werbung (~30 Sek)',
        supportDouble: 'Doppelte Unterstützung',
        supportDoubleDesc: '2 Werbungen (~60 Sek gesamt)',
        supportBest: '🌟 Am hilfreichsten',
        adsWatchedText: 'Werbung heute angesehen:',
        supportThanks: 'Danke für deine Unterstützung!',
        supportClose: 'Schließen',
        preparingAd: 'Werbung wird vorbereitet...',
        adDuration: 'Dauer',
        thankYou: 'Vielen Dank!',
        supportReceived: 'Deine Unterstützung bedeutet mir viel! ❤️',

        // ===== MOOD & HEATMAP =====
        moodHeatmapHow: '💡 Wie funktioniert die Mood-Heatmap?',
        moodHeatmapDesc: 'Jeder Tag wird nach deiner Stimmung farbig markiert',
        avgYear: 'Ø Jahr',
        worstMonth: 'Schlechtester Monat',

        // ===== INSIGHTS & ACHIEVEMENTS =====
        insightMuscles: 'Muskeln wachsen im Schlaf! 😴',
        insightHeart: 'Herz eines Löwen! 🦁',
        insightRoutine: 'Routine Master freigeschaltet! 📅',
        insightLegendary: 'Legendär! 👑',
        insightMoney: 'Smart Money Moves! 📈',
        insightUnbalance: 'Ungleichgewicht entdeckt! Schwache Bereiche brauchen mehr Fokus!',
        insightBalance: 'Perfektes Gleichgewicht freigeschaltet! Allround-Champion!',
        insightKeepGoing: 'Denk dran: Erfolg ist die Summe kleiner Schritte! Weiter so!',
        insightFire: 'Du brennst! Absolut exzellent auf allen Ebenen!',
        insightStrong: 'Starke Performance! Du bist auf dem Champion-Pfad!',
        insightGood: 'Gute Basis - jetzt beschleunigen und dominieren!',
        insightStart: 'Zeit zu grinden! Dein Comeback startet jetzt!',
        insightTop: 'TOP',
        insightCrushing: 'Rockt es! Weiter so!',
        insightNeedsAttention: 'braucht Aufmerksamkeit! Lass uns hier fokussieren.',
        mode: 'Modus',

        // ===== PROFIL & STATS =====
        yourName: 'Dein Name',
        profileSubtitle: 'Bleib stark und fokussiert!',

        strength: 'Kraft',
        stamina: 'Ausdauer',
        habits: 'Gewohnheiten',
        addictions: 'Abhängigkeiten',
        finances: 'Finanzen',

        // ===== HOME & NAVIGATION =====
        swipeHint: 'Tippe auf einen Stat für mehr Details',
        yearOverview: 'Jahresübersicht 2025',

        week: 'Woche',
        achievements: 'Erfolge',
        mood: 'Stimmung',

        selectLanguage: 'Sprache wählen',

        // ===== BUTTONS =====
        back: '<',
        close: 'Schließen',
        cancel: 'Abbrechen',
        save: 'Speichern',
        add: 'Hinzufügen',
        edit: 'Bearbeiten',
        delete: 'Löschen',
        required: 'Erforderlich',
        optional: 'Optional',
        yes: 'Ja',
        no: 'Nein',
        ok: 'OK',
        retry: 'Erneut versuchen',
        done: 'Fertig',
        continue: 'Fortfahren',
        skip: 'Überspringen',

        // ===== MODAL TITLES =====
        weeklyTitle: 'Wochenrückblick',
        achievementsTitle: 'Erfolge',
        moodTitle: 'Stimmung',
        habitTitle: 'Gewohnheiten',
        strengthTitle: 'Kraft',
        staminaTitle: 'Ausdauer',
        financeTitle: 'Finanzen',
        addictionsTitle: 'Abhängigkeiten',

        // ===== GOALS =====
        setGoal: 'Ziel setzen',
        monthlyGoal: 'Monatliches Ziel',
        savingsGoal: 'Sparziel',
        trainingsPerMonth: 'Trainings pro Monat:',
        savingsPerMonth: 'Monatliches Sparziel (€):',
        goal: 'Ziel',
        progress: 'Fortschritt',

        // ===== HABITS =====
        newHabit: 'Neue Gewohnheit',
        editHabit: 'Gewohnheit bearbeiten',
        habitName: 'Gewohnheit Name',
        noHabitsYet: 'Noch keine Gewohnheiten',
        noHabitsText: 'Drücke + um eine zu erstellen',
        monthlyGoalDays: 'Monatliches Ziel (Tage):',
        tapForYearView: 'Tippe für Jahresansicht',
        totalDays: 'Tage Gesamt',
        yearGoal: 'Jahresziel',
        successRate: 'Erfolgsrate',
        currentMonth: 'Aktueller Monat',
        completed: 'Abgeschlossen',
        days: 'Tage',

        // ===== TRAINING =====
        addTraining: 'Training hinzufügen',
        editTraining: 'Training bearbeiten',
        trainingType: 'Trainingsart:',
        notes: 'Notizen:',
        notesOptional: 'Notizen (optional):',
        noTrainingsYet: 'Noch keine Trainings',
        noTrainingsText: 'Drücke + um ein Training hinzuzufügen',
        trainings: 'Trainings',

        calisthenics: 'Calisthenics',
        running: 'Laufen',
        cardio: 'Cardio',
        hiit: 'HIIT',

        krafttraining: 'Krafttraining',
        gym: 'Fitnessstudio',
        bodyweight: 'Körpergewicht',
        powerlifting: 'Powerlifting',
        weightTraining: 'Krafttraining',

        // ===== FINANCE =====
        addSavings: 'Sparen hinzufügen',
        editSavings: 'Sparen bearbeiten',
        amount: 'Betrag (€):',
        total: 'Gesamt',
        thisMonth: 'Diesen Monat',
        saved: 'Gespart',
        noEntriesYet: 'Noch keine Einträge',
        noEntriesText: 'Drücke + um zu sparen',

        // ===== ADDICTIONS =====
        newTracker: 'Neuer Tracker',
        editTracker: 'Tracker bearbeiten',
        trackerName: 'Name:',
        costPerWeek: 'Kosten pro Woche:',
        noTrackersYet: 'Noch keine Tracker',
        noTrackersText: 'Drücke + um einen zu erstellen',
        pause: 'Pause',
        resume: 'Fortsetzen',
        reset: 'Zurücksetzen',
        start: 'Start',
        cleanMode: 'Clean Modus',
        reductionMode: 'Reduktions-Modus',
        cleanDaysGoal: 'Clean Days Ziel:',
        dailyLimit: 'Tageslimit:',
        monthlyGoalDaysUnderLimit: 'Monatsziel (Tage unter Limit):',
        showMoneySaved: 'Geld gespart anzeigen',
        yearTotal: 'Jahresgesamt',
        avgMonth: 'Ø/Monat',
        avgDay: 'Ø/Tag',

        // ===== STATS SUMMARY =====
        unlocked: 'freigeschaltet',

        // ===== WEEKLY SUMMARY =====
        thisWeek: 'Diese Woche',
        strongWeek: 'Starke Trainingswoche!',
        moreTraining: 'Mehr Training möglich!',
        topHabits: 'Top Gewohnheiten!',
        goodConsistency: 'Gute Konsistenz!',
        focusHabits: 'Fokus auf Gewohnheiten!',
        cleanWeekReached: 'Clean Week erreicht!',
        clean: 'Clean',

        // ===== MOOD SECTION =====
        howDoYouFeel: 'Wie fühlst du dich?',
        great: 'Großartig',
        good: 'Gut',
        okay: 'Okay',
        bad: 'Schlecht',
        terrible: 'Mies',
        noteOptional: 'Notiz (optional):',
        whatHappened: 'Was ist heute passiert?',
        avgWeek: 'Ø Woche',
        streak: 'Serie',
        entries: 'Einträge',
        savedToday: '✓ Heute gespeichert',
        viewYearHeatmap: '📅 Jahresübersicht anzeigen',
        moodYearHeatmap: 'Stimmungs-Heatmap 2025',

        // ===== CHART =====
        activitiesPerMonth: 'Aktivitäten pro Monat',
        count: 'Anzahl',
        month: 'Monat',
        months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        daysShort: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],

        // ===== HEATMAP =====
        heatmapHow: '💡 Wie funktioniert die Heatmap?',
        heatmapDesc: 'Jeder Tag im Jahr wird farbig markiert:',
        heatmapEmpty: 'Leer = Keine Aktivität',
        heatmapLight: 'Hell = 1 Aktivität',
        heatmapMedium: 'Mittel = 2 Aktivitäten',
        heatmapHigh: 'Dunkel = 3+ Aktivitäten',
        heatmapLegend: '• Leer: Keine Aktivität, Hell: 1, Mittel: 2, Dunkel: 3+ Aktivitäten',
        activeDays: 'Aktive Tage',
        bestMonth: 'Bester Monat',

        // ===== PERSONALITY =====
        personalityDesc: 'Deine Entwicklung',
        personalityYourStats: 'Deine Statistiken',

        // ===== PLACEHOLDERS =====
        phHabitName: 'Gewohnheit Name',
        phTrackerName: 'Tracker Name',
        phAmount: 'Betrag',
        phNotes: 'z.B. 5km, 30 min',
        phNotesFinance: 'z.B. Gehalt',
        phStrengthNotes: 'z.B. Brust, 90kg',
        phGoalStamina: 'z.B. 20',
        phGoalStrength: 'z.B. 16',
        phGoalFinance: 'z.B. 500',
        phCostWeek: '€',
        notesPlaceholderStamina: 'z.B. 5km, 30 min',
        notesPlaceholderStrength: 'z.B. Brust, 90kg',
        notesPlaceholderFinance: 'z.B. Gehalt',

        // ===== CONFIRMATIONS =====
        confirmDelete: 'Löschen?',
        confirmDeleteHabit: 'Gewohnheit löschen?',
        confirmDeleteTraining: 'Training löschen?',
        confirmDeleteEntry: 'Eintrag löschen?',
        confirmDeleteTracker: 'Tracker löschen?',
        confirmReset: 'Zurücksetzen?',

        // ===== ACHIEVEMENTS =====
        achievementUnlocked: 'Erfolg freigeschaltet!',
        achievementCheck: '✓ Freigeschaltet',
        
        // ===== ERROR & VALIDATION =====
        noInternetConnection: 'Keine Internetverbindung',
        tryAgain: 'Erneut versuchen',
        fieldRequired: 'Dieses Feld ist erforderlich',
        invalidInput: 'Ungültige Eingabe',
        selectAtLeastOne: 'Wähle mindestens eine Option'
    },

    en: {

        financeManagement: 'Financial Management',
        financePlanningTitle: '📊 Financial Planning',
        income: 'Income',
        expenses: 'Expenses',
        currentBalance: 'Current Balance',
        fixed: 'Fixed',
        variable: 'Variable',
        addIncome: '+ Add',
        addExpense: '+ Add',
        incomeType: 'Income type:',
        incomeTypeFixed: 'Fixed (e.g. Salary)',
        incomeTypeVariable: 'Variable (e.g. Bonus)',
        fixedIncome: 'Fixed income',
        variableIncome: 'Variable income',
        expenseType: 'Expense type:',
        expenseTypeFixed: 'Fixed (e.g. Rent)',
        expenseTypeVariable: 'Variable (e.g. Food)',
        fixedExpense: 'Fixed expense',
        variableExpense: 'Variable expense',
        noFixedIncomeYet: 'No fixed income yet',
        noVariableIncomeYet: 'No variable income yet',
        noFixedExpenseYet: 'No fixed expenses yet',
        noVariableExpenseYet: 'No variable expenses yet',
        currentlyAvailable: 'Available',
        positiveBalance: '✅ Positive',
        negativeBalance: '⚠️ Negative',

        trainingsPerMonth: "Trainings per month",

tableHeaderMonth: 'Month',
tableHeaderSaved: 'Saved',
tableHeaderDays: 'Days',
tableHeaderTracker: 'Tracker',
great: 'Great',
good: 'Good',
okay: 'Okay',
bad: 'Bad',
terrible: 'Terrible',

                pdfDownloadTitle: 'Pro: Download Your Annual Report',
        pdfDownloadDesc: 'Get your complete annual report with all statistics',
        pdfFeature1: '📊 All Habits & Tracker Statistics',
        pdfFeature2: '📈 Detailed Charts for All Categories',
        pdfFeature3: '📝 Mood Entries Summary',
        pdfFeature4: '💪 Strength & Stamina Training Log',
        pdfFeature5: '🚫 Addiction Recovery Progress',
        pdfFeature6: '🏆 Achievements & Milestones',
        pdfFeature7: '💰 Money Saved Calculations',
        pdfFeature8: '📅 Complete Year Overview Calendar',
        pdfDownloadBtn: '📥 Download Annual Report',
        pdfFooter: 'PDF Format • Only on Your Device • No Data Sharing',
        proVersion: '💎 Pro Version',
        selectLanguage: 'Select Language',

    pdfDownloadTitle: 'Pro: Download Your Year Report',
    pdfDownloadDesc: 'Get your complete yearly report with all statistics and insights',
    pdfFeature1: 'All habit & tracker statistics',
    pdfFeature2: 'Detailed graphs for all categories',
    pdfFeature3: 'Mood journal entries summary',
    pdfFeature4: 'Strength & stamina trainings log',
    pdfFeature5: 'Addiction recovery progress',
    pdfFeature6: 'Achievements & milestones',
    pdfFeature7: 'Money saved calculations',
    pdfFeature8: 'Full year overview calendar',
    pdfDownloadBtn: '📥 Download Your Year Report',
    pdfFooter: 'PDF Format • Your device only • No data sharing',

            proVersion: 'Pro Version',
    unlockedFeatures: 'Unlock Pro Features!',
    pdfExport: 'Export yearly overview as PDF',
    advancedStats: 'Advanced statistics',
    noAds: 'No ads',

    calisthenics: 'Calisthenics',
    running: 'Running',
    cardio: 'Cardio',
    hiit: 'HIIT',

    enter0ToDelete: 'Enter 0 to delete',
        Name: 'Name',

        // ===== COMMON HINTS & MESSAGES =====
        amountToday: 'Amount today:',
        amountLabel: 'Amount:',
        editTrackerDay: 'Edit day',
        
        hintAddItem: 'Press + to add a new entry',
        hintEditItem: 'Tap to edit',
        hintDeleteItem: 'Long press to delete',
        hintSwipeLeft: 'Swipe left to delete',
        hintSwipeRight: 'Swipe right for details',
        hintTapDetails: 'Tap for more information',
        noData: 'No data available',
        loading: 'Loading...',
        error: 'An error occurred',
        success: 'Success!',
        warning: 'Warning',
        info: 'Information',

        // ===== ADS & SUPPORT =====
        removeAdsTitle: 'Remove all ads',
        adFreeExperience: 'Enjoy an ad-free experience!',
        noMorePopups: 'No more popup ads',
        smoothExperience: 'Smooth experience',
        supportDevelopment: 'Support development',
        oneTimePurchase: 'One-time purchase, lifetime access',
        oneTime: 'one-time',
        purchaseNow: 'Buy now',
        purchaseComplete: 'Purchase completed!',
        adsRemovedSuccess: 'All ads removed!',
        loadingAd: 'Loading ad...',

        supportTitle: 'Support developer',
        supportMessage: 'Hey! I\'m a solo developer working hard to make this app better for you. If you enjoy it and want to support me, you can watch a few ads. Every view helps me keep developing! 🙏',
        supportShort: 'Short ad',
        supportShortDesc: '1 short ad (~15 sec)',
        supportMedium: 'Standard ad',
        supportMediumDesc: '1 ad (~30 sec)',
        supportDouble: 'Double support',
        supportDoubleDesc: '2 ads (~60 sec total)',
        supportBest: '🌟 Most helpful',
        adsWatchedText: 'Ads watched today:',
        supportThanks: 'Thanks for your support!',
        supportClose: 'Close',
        preparingAd: 'Preparing ad...',
        adDuration: 'Duration',
        thankYou: 'Thank you!',
        supportReceived: 'Your support means a lot to me! ❤️',

        // ===== MOOD & HEATMAP =====
        moodHeatmapHow: '💡 How does the Mood Heatmap work?',
        moodHeatmapDesc: 'Each day is colored based on your mood',
        avgYear: 'Ø Year',
        worstMonth: 'Worst month',

        // ===== INSIGHTS & ACHIEVEMENTS =====
        insightMuscles: 'Muscles grow while you sleep! 😴',
        insightHeart: 'Heart of a lion! 🦁',
        insightRoutine: 'Routine Master unlocked! 📅',
        insightLegendary: 'Legendary! 👑',
        insightMoney: 'Smart Money Moves! 📈',
        insightUnbalance: 'Imbalance detected! Weak areas need more focus!',
        insightBalance: 'Perfect balance unlocked! All-around champion!',
        insightKeepGoing: 'Remember: Success is the sum of small steps! Keep going!',
        insightFire: 'You\'re on fire! Absolutely excellent on all levels!',
        insightStrong: 'Strong performance! You\'re on the champion\'s path!',
        insightGood: 'Good foundation - now accelerate and dominate!',
        insightStart: 'Time to grind! Your comeback starts now!',
        insightTop: 'TOP',
        insightCrushing: 'Crushing it! Keep it up!',
        insightNeedsAttention: 'needs attention! Let\'s focus here.',
        mode: 'Mode',

        // ===== PROFILE & STATS =====
        yourName: 'Your name',
        profileSubtitle: 'Stay strong and focused!',

        strength: 'Strength',
        stamina: 'Stamina',
        habits: 'Habits',
        addictions: 'Addictions',
        finances: 'Finances',

        // ===== HOME & NAVIGATION =====
        swipeHint: 'Tap a stat for details',
        yearOverview: 'Year overview 2025',

        week: 'Week',
        achievements: 'Achievements',
        mood: 'Mood',

        selectLanguage: 'Select language',

        // ===== BUTTONS =====
        back: '<',
        close: 'Close',
        cancel: 'Cancel',
        save: 'Save',
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        required: 'Required',
        optional: 'Optional',
        yes: 'Yes',
        no: 'No',
        ok: 'OK',
        retry: 'Retry',
        done: 'Done',
        continue: 'Continue',
        skip: 'Skip',

        // ===== MODAL TITLES =====
        weeklyTitle: 'Weekly review',
        achievementsTitle: 'Achievements',
        moodTitle: 'Mood',
        habitTitle: 'Habits',
        strengthTitle: 'Strength',
        staminaTitle: 'Stamina',
        financeTitle: 'Finances',
        addictionsTitle: 'Addictions',

        // ===== GOALS =====
        setGoal: 'Set goal',
        monthlyGoal: 'Monthly goal',
        savingsGoal: 'Savings goal',
        trainingsPerMonth: 'Trainings per month:',
        savingsPerMonth: 'Monthly savings goal (€):',
        goal: 'Goal',
        progress: 'Progress',

        // ===== HABITS =====
        newHabit: 'New habit',
        editHabit: 'Edit habit',
        habitName: 'Habit name',
        noHabitsYet: 'No habits yet',
        noHabitsText: 'Press + to create one',
        monthlyGoalDays: 'Monthly goal (days):',
        tapForYearView: 'Tap for year view',
        totalDays: 'Total days',
        yearGoal: 'Year goal',
        successRate: 'Success rate',
        currentMonth: 'Current month',
        completed: 'Completed',
        days: 'Days',

        // ===== TRAINING =====
        addTraining: 'Add training',
        editTraining: 'Edit training',
        trainingType: 'Training type:',
        notes: 'Notes:',
        notesOptional: 'Notes (optional):',
        noTrainingsYet: 'No trainings yet',
        noTrainingsText: 'Press + to add a training',
        trainings: 'Trainings',

        calisthenics: 'Calisthenics',
        running: 'Running',
        cardio: 'Cardio',
        hiit: 'HIIT',

        krafttraining: 'Strength training',
        gym: 'Gym',
        bodyweight: 'Bodyweight',
        powerlifting: 'Powerlifting',
        weightTraining: 'Strength training',

        // ===== FINANCE =====
        addSavings: 'Add savings',
        editSavings: 'Edit savings',
        amount: 'Amount (€):',
        total: 'Total',
        thisMonth: 'This month',
        saved: 'Saved',
        noEntriesYet: 'No entries yet',
        noEntriesText: 'Press + to add savings',

        // ===== ADDICTIONS =====
        newTracker: 'New tracker',
        editTracker: 'Edit tracker',
        trackerName: 'Name:',
        costPerWeek: 'Cost per week:',
        noTrackersYet: 'No trackers yet',
        noTrackersText: 'Press + to create one',
        pause: 'Pause',
        resume: 'Resume',
        reset: 'Reset',
        start: 'Start',
        cleanMode: 'Clean Mode',
        reductionMode: 'Reduction Mode',
        cleanDaysGoal: 'Clean Days Goal:',
        dailyLimit: 'Daily limit:',
        monthlyGoalDaysUnderLimit: 'Monthly goal (days under limit):',
        showMoneySaved: 'Show money saved',
        yearTotal: 'Year total',
        avgMonth: 'Ø/Month',
        avgDay: 'Ø/Day',

        // ===== STATS SUMMARY =====
        unlocked: 'unlocked',

        // ===== WEEKLY SUMMARY =====
        thisWeek: 'This week',
        strongWeek: 'Strong training week!',
        moreTraining: 'More training possible!',
        topHabits: 'Top habits!',
        goodConsistency: 'Good consistency!',
        focusHabits: 'Focus on habits!',
        cleanWeekReached: 'Clean week reached!',
        clean: 'Clean',

        // ===== MOOD SECTION =====
        howDoYouFeel: 'How do you feel?',
        great: 'Great',
        good: 'Good',
        okay: 'Okay',
        bad: 'Bad',
        terrible: 'Terrible',
        noteOptional: 'Note (optional):',
        whatHappened: 'What happened today?',
        avgWeek: 'Ø Week',
        streak: 'Streak',
        entries: 'Entries',
        savedToday: '✓ Saved today',
        viewYearHeatmap: '📅 View year heatmap',
        moodYearHeatmap: 'Mood Heatmap 2025',

        // ===== CHART =====
        activitiesPerMonth: 'Activities per month',
        count: 'Count',
        month: 'Month',
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        daysShort: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

        // ===== HEATMAP =====
        heatmapHow: '💡 How does the heatmap work?',
        heatmapDesc: 'Each day of the year is colored:',
        heatmapEmpty: 'Empty = No activity',
        heatmapLight: 'Light = 1 activity',
        heatmapMedium: 'Medium = 2 activities',
        heatmapHigh: 'Dark = 3+ activities',
        heatmapLegend: '• Empty: No activity, Light: 1, Medium: 2, Dark: 3+ activities',
        activeDays: 'Active days',
        bestMonth: 'Best month',

        // ===== PERSONALITY =====
        personalityDesc: 'Your development',
        personalityYourStats: 'Your stats',

        // ===== PLACEHOLDERS =====
        phHabitName: 'Habit name',
        phTrackerName: 'Tracker name',
        phAmount: 'Amount',
        phNotes: 'e.g. 5km, 30 min',
        phNotesFinance: 'e.g. Salary',
        phStrengthNotes: 'e.g. Chest, 90kg',
        phGoalStamina: 'e.g. 20',
        phGoalStrength: 'e.g. 16',
        phGoalFinance: 'e.g. 500',
        phCostWeek: '€',
        notesPlaceholderStamina: 'e.g. 5km, 30 min',
        notesPlaceholderStrength: 'e.g. Chest, 90kg',
        notesPlaceholderFinance: 'e.g. Salary',

        // ===== CONFIRMATIONS =====
        confirmDelete: 'Delete?',
        confirmDeleteHabit: 'Delete habit?',
        confirmDeleteTraining: 'Delete training?',
        confirmDeleteEntry: 'Delete entry?',
        confirmDeleteTracker: 'Delete tracker?',
        confirmReset: 'Reset?',

        // ===== ACHIEVEMENTS =====
        achievementUnlocked: 'Achievement unlocked!',
        achievementCheck: '✓ Unlocked',
        
        // ===== ERROR & VALIDATION =====
        noInternetConnection: 'No internet connection',
        tryAgain: 'Try again',
        fieldRequired: 'This field is required',
        invalidInput: 'Invalid input',
        selectAtLeastOne: 'Select at least one option'
    },

    ru: {

        financeManagement: 'Финансовое управление',
        financePlanningTitle: '📊 Финансовое планирование',
        income: 'Доход',
        expenses: 'Расходы',
        currentBalance: 'Текущий баланс',
        fixed: 'Фиксированный',
        variable: 'Переменный',
        addIncome: '+ Добавить',
        addExpense: '+ Добавить',
        incomeType: 'Тип дохода:',
        incomeTypeFixed: 'Фиксированный (напр. Зарплата)',
        incomeTypeVariable: 'Переменный (напр. Бонус)',
        fixedIncome: 'Фиксированный доход',
        variableIncome: 'Переменный доход',
        expenseType: 'Тип расходов:',
        expenseTypeFixed: 'Фиксированные (напр. Аренда)',
        expenseTypeVariable: 'Переменные (напр. Еда)',
        fixedExpense: 'Фиксированные расходы',
        variableExpense: 'Переменные расходы',
        noFixedIncomeYet: 'Нет фиксированного дохода',
        noVariableIncomeYet: 'Нет переменного дохода',
        noFixedExpenseYet: 'Нет фиксированных расходов',
        noVariableExpenseYet: 'Нет переменных расходов',
        currentlyAvailable: 'Доступно',
        positiveBalance: '✅ Положительный',
        negativeBalance: '⚠️ Отрицательный',

        trainingsPerMonth: "Тренировок в месяц",

tableHeaderMonth: 'Месяц',
tableHeaderSaved: 'Сэкономлено',
tableHeaderDays: 'Дни',
tableHeaderTracker: 'Трекер',
great: 'Отлично',
good: 'Хорошо',
okay: 'Нормально',
bad: 'Плохо',
terrible: 'Ужасно',

         pdfDownloadTitle: 'Про: Загрузите свой годовой отчет',
        pdfDownloadDesc: 'Получите полный годовой отчет со всей статистикой',
        pdfFeature1: '📊 Все статистики привычек и трекеров',
        pdfFeature2: '📈 Подробные диаграммы для всех категорий',
        pdfFeature3: '📝 Резюме записей о настроении',
        pdfFeature4: '💪 Журнал тренировок силы и выносливости',
        pdfFeature5: '🚫 Прогресс борьбы с зависимостями',
        pdfFeature6: '🏆 Достижения и вехи',
        pdfFeature7: '💰 Расчеты сэкономленных денег',
        pdfFeature8: '📅 Полный обзор года и календарь',
        pdfDownloadBtn: '📥 Загрузить годовой отчет',
        pdfFooter: 'Формат PDF • Только на вашем устройстве • Без обмена данными',
        proVersion: '💎 Версия Про',
        selectLanguage: 'Выберите язык',

            proVersion: 'Про версия',
    unlockedFeatures: 'Разблокируйте Про функции!',
    pdfExport: 'Экспортировать обзор года в PDF',
    advancedStats: 'Расширенная статистика',
    noAds: 'Нет объявлений',

    calisthenics: 'Калистеника',
    running: 'Бег',
    cardio: 'Кардио',
    hiit: 'HIIT',

    enter0ToDelete: 'Введите 0 для удаления',
Name: 'Название',

        // ===== ЧАСТЫЕ ПОДСКАЗКИ И СООБЩЕНИЯ =====
        amountToday: 'Сумма сегодня:',
        amountLabel: 'Сумма:',
        editTrackerDay: 'Редактировать день',
        
        hintAddItem: 'Нажмите +, чтобы добавить новую запись',
        hintEditItem: 'Коснитесь, чтобы редактировать',
        hintDeleteItem: 'Долгое нажатие для удаления',
        hintSwipeLeft: 'Проведите влево для удаления',
        hintSwipeRight: 'Проведите вправо для деталей',
        hintTapDetails: 'Коснитесь для получения дополнительной информации',
        noData: 'Данные недоступны',
        loading: 'Загрузка...',
        error: 'Произошла ошибка',
        success: 'Успешно!',
        warning: 'Предупреждение',
        info: 'Информация',

        // ===== РЕКЛАМА И ПОДДЕРЖКА =====
        removeAdsTitle: 'Удалить всю рекламу',
        adFreeExperience: 'Наслаждайтесь отсутствием рекламы!',
        noMorePopups: 'Больше нет всплывающих объявлений',
        smoothExperience: 'Плавный опыт',
        supportDevelopment: 'Поддержите разработку',
        oneTimePurchase: 'Одноразовая покупка, пожизненный доступ',
        oneTime: 'одноразово',
        purchaseNow: 'Купить сейчас',
        purchaseComplete: 'Покупка завершена!',
        adsRemovedSuccess: 'Вся реклама удалена!',
        loadingAd: 'Загрузка объявления...',

        supportTitle: 'Поддержать разработчика',
        supportMessage: 'Привет! Я одиночный разработчик, который усердно работает, чтобы сделать это приложение лучше для вас. Если вам это нравится и вы хотите меня поддержать, вы можете посмотреть несколько объявлений. Каждый просмотр помогает мне продолжать разработку! 🙏',
        supportShort: 'Короткое объявление',
        supportShortDesc: '1 короткое объявление (~15 сек)',
        supportMedium: 'Стандартное объявление',
        supportMediumDesc: '1 объявление (~30 сек)',
        supportDouble: 'Двойная поддержка',
        supportDoubleDesc: '2 объявления (~60 сек всего)',
        supportBest: '🌟 Самая полезная',
        adsWatchedText: 'Объявлений просмотрено сегодня:',
        supportThanks: 'Спасибо за вашу поддержку!',
        supportClose: 'Закрыть',
        preparingAd: 'Подготовка объявления...',
        adDuration: 'Продолжительность',
        thankYou: 'Спасибо!',
        supportReceived: 'Ваша поддержка много значит для меня! ❤️',

        // ===== НАСТРОЕНИЕ И ТЕПЛОВАЯ КАРТА =====
        moodHeatmapHow: '💡 Как работает тепловая карта настроения?',
        moodHeatmapDesc: 'Каждый день раскрашивается в соответствии с вашим настроением',
        avgYear: 'Ø Год',
        worstMonth: 'Худший месяц',

        // ===== ОЗАРЕНИЯ И ДОСТИЖЕНИЯ =====
        insightMuscles: 'Мышцы растут во сне! 😴',
        insightHeart: 'Сердце льва! 🦁',
        insightRoutine: 'Разблокирован мастер рутины! 📅',
        insightLegendary: 'Легендарно! 👑',
        insightMoney: 'Умные ходы с деньгами! 📈',
        insightUnbalance: 'Обнаружен дисбаланс! Слабые области нуждаются в большем внимании!',
        insightBalance: 'Разблокирован идеальный баланс! Универсальный чемпион!',
        insightKeepGoing: 'Помните: успех - это сумма малых шагов! Продолжайте!',
        insightFire: 'Вы в огне! Абсолютно отлично на всех уровнях!',
        insightStrong: 'Сильное выступление! Вы на пути чемпиона!',
        insightGood: 'Хорошая основа - теперь ускорьтесь и господствуйте!',
        insightStart: 'Время работать! Ваше возвращение начинается сейчас!',
        insightTop: 'ТОП',
        insightCrushing: 'Крушит! Продолжайте!',
        insightNeedsAttention: 'нужно внимание! Давайте сосредоточимся здесь.',
        mode: 'Режим',

        // ===== ПРОФИЛЬ И СТАТИСТИКА =====
        yourName: 'Ваше имя',
        profileSubtitle: 'Оставайтесь сильными и сосредоточенными!',

        strength: 'Сила',
        stamina: 'Выносливость',
        habits: 'Привычки',
        addictions: 'Зависимости',
        finances: 'Финансы',

        // ===== ГЛАВНАЯ И НАВИГАЦИЯ =====
        swipeHint: 'Нажмите на статистику для подробностей',
        yearOverview: 'Обзор года 2025',

        week: 'Неделя',
        achievements: 'Достижения',
        mood: 'Настроение',

        selectLanguage: 'Выберите язык',

        // ===== КНОПКИ =====
        back: '<',
        close: 'Закрыть',
        cancel: 'Отмена',
        save: 'Сохранить',
        add: 'Добавить',
        edit: 'Редактировать',
        delete: 'Удалить',
        required: 'Обязательно',
        optional: 'Опционально',
        yes: 'Да',
        no: 'Нет',
        ok: 'ОК',
        retry: 'Повторить попытку',
        done: 'Готово',
        continue: 'Продолжить',
        skip: 'Пропустить',

        // ===== НАЗВАНИЯ МОДАЛЕЙ =====
        weeklyTitle: 'Еженедельный обзор',
        achievementsTitle: 'Достижения',
        moodTitle: 'Настроение',
        habitTitle: 'Привычки',
        strengthTitle: 'Сила',
        staminaTitle: 'Выносливость',
        financeTitle: 'Финансы',
        addictionsTitle: 'Зависимости',

        // ===== ЦЕЛИ =====
        setGoal: 'Установить цель',
        monthlyGoal: 'Ежемесячная цель',
        savingsGoal: 'Цель сбережений',
        trainingsPerMonth: 'Тренировок в месяц:',
        savingsPerMonth: 'Ежемесячная цель сбережений (€):',
        goal: 'Цель',
        progress: 'Прогресс',

        // ===== ПРИВЫЧКИ =====
        newHabit: 'Новая привычка',
        editHabit: 'Редактировать привычку',
        habitName: 'Название привычки',
        noHabitsYet: 'Привычек пока нет',
        noHabitsText: 'Нажмите +, чтобы создать',
        monthlyGoalDays: 'Ежемесячная цель (дни):',
        tapForYearView: 'Коснитесь для просмотра года',
        totalDays: 'Всего дней',
        yearGoal: 'Годовая цель',
        successRate: 'Процент успеха',
        currentMonth: 'Текущий месяц',
        completed: 'Завершено',
        days: 'Дни',

        // ===== ТРЕНИРОВКА =====
        addTraining: 'Добавить тренировку',
        editTraining: 'Редактировать тренировку',
        trainingType: 'Тип тренировки:',
        notes: 'Заметки:',
        notesOptional: 'Заметки (опционально):',
        noTrainingsYet: 'Тренировок пока нет',
        noTrainingsText: 'Нажмите +, чтобы добавить тренировку',
        trainings: 'Тренировки',

        calisthenics: 'Калистеника',
        running: 'Бег',
        cardio: 'Кардио',
        hiit: 'HIIT',

        krafttraining: 'Силовая подготовка',
        gym: 'Тренажерный зал',
        bodyweight: 'Вес тела',
        powerlifting: 'Пауэрлифтинг',
        weightTraining: 'Силовая подготовка',

        // ===== ФИНАНСЫ =====
        addSavings: 'Добавить сбережения',
        editSavings: 'Редактировать сбережения',
        amount: 'Сумма (€):',
        total: 'Итого',
        thisMonth: 'В этом месяце',
        saved: 'Сохранено',
        noEntriesYet: 'Записей пока нет',
        noEntriesText: 'Нажмите +, чтобы сохранить',

        // ===== ЗАВИСИМОСТИ =====
        newTracker: 'Новый трекер',
        editTracker: 'Редактировать трекер',
        trackerName: 'Название:',
        costPerWeek: 'Стоимость в неделю:',
        noTrackersYet: 'Трекеров пока нет',
        noTrackersText: 'Нажмите +, чтобы создать',
        pause: 'Пауза',
        resume: 'Возобновить',
        reset: 'Сброс',
        start: 'Начать',
        cleanMode: 'Чистый режим',
        reductionMode: 'Режим сокращения',
        cleanDaysGoal: 'Цель чистых дней:',
        dailyLimit: 'Ежедневный лимит:',
        monthlyGoalDaysUnderLimit: 'Ежемесячная цель (дни под лимитом):',
        showMoneySaved: 'Показать сэкономленные деньги',
        yearTotal: 'Итого за год',
        avgMonth: 'Ø/Месяц',
        avgDay: 'Ø/День',

        // ===== СВОДКА СТАТИСТИКИ =====
        unlocked: 'разблокировано',

        // ===== ЕЖЕНЕДЕЛЬНАЯ СВОДКА =====
        thisWeek: 'На этой неделе',
        strongWeek: 'Сильная неделя тренировок!',
        moreTraining: 'Больше тренировок возможно!',
        topHabits: 'Топ привычек!',
        goodConsistency: 'Хорошая консистентность!',
        focusHabits: 'Сосредоточьтесь на привычках!',
        cleanWeekReached: 'Чистая неделя достигнута!',
        clean: 'Чистый',

        // ===== РАЗДЕЛ НАСТРОЕНИЯ =====
        howDoYouFeel: 'Как вы себя чувствуете?',
        great: 'Отлично',
        good: 'Хорошо',
        okay: 'Нормально',
        bad: 'Плохо',
        terrible: 'Ужасно',
        noteOptional: 'Заметка (опционально):',
        whatHappened: 'Что произошло сегодня?',
        avgWeek: 'Ø Неделя',
        streak: 'Серия',
        entries: 'Записи',
        savedToday: '✓ Сохранено сегодня',
        viewYearHeatmap: '📅 Просмотреть тепловую карту года',
        moodYearHeatmap: 'Тепловая карта настроения 2025',

        // ===== ГРАФИК =====
        activitiesPerMonth: 'Активность в месяц',
        count: 'Количество',
        month: 'Месяц',
        months: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        daysShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],

        // ===== ТЕПЛОВАЯ КАРТА =====
        heatmapHow: '💡 Как работает тепловая карта?',
        heatmapDesc: 'Каждый день в году раскрашивается:',
        heatmapEmpty: 'Пусто = Нет активности',
        heatmapLight: 'Светлый = 1 активность',
        heatmapMedium: 'Средний = 2 активности',
        heatmapHigh: 'Темный = 3+ активности',
        heatmapLegend: '• Пусто: Нет активности, Светлый: 1, Средний: 2, Темный: 3+ активности',
        activeDays: 'Активные дни',
        bestMonth: 'Лучший месяц',

        // ===== ЛИЧНОСТЬ =====
        personalityDesc: 'Ваше развитие',
        personalityYourStats: 'Ваша статистика',

        // ===== ЗАПОЛНИТЕЛИ =====
        phHabitName: 'Название привычки',
        phTrackerName: 'Название трекера',
        phAmount: 'Сумма',
        phNotes: 'напр. 5км, 30 мин',
        phNotesFinance: 'напр. Зарплата',
        phStrengthNotes: 'напр. Грудь, 90кг',
        phGoalStamina: 'напр. 20',
        phGoalStrength: 'напр. 16',
        phGoalFinance: 'напр. 500',
        phCostWeek: '€',
        notesPlaceholderStamina: 'напр. 5км, 30 мин',
        notesPlaceholderStrength: 'напр. Грудь, 90кг',
        notesPlaceholderFinance: 'напр. Зарплата',

        // ===== ПОДТВЕРЖДЕНИЯ =====
        confirmDelete: 'Удалить?',
        confirmDeleteHabit: 'Удалить привычку?',
        confirmDeleteTraining: 'Удалить тренировку?',
        confirmDeleteEntry: 'Удалить запись?',
        confirmDeleteTracker: 'Удалить трекер?',
        confirmReset: 'Сбросить?',

        // ===== ДОСТИЖЕНИЯ =====
        achievementUnlocked: 'Достижение разблокировано!',
        achievementCheck: '✓ Разблокировано',
        
        // ===== ОШИБКИ И ВАЛИДАЦИЯ =====
        noInternetConnection: 'Нет подключения к интернету',
        tryAgain: 'Попробуйте снова',
        fieldRequired: 'Это поле обязательно',
        invalidInput: 'Неверный ввод',
        selectAtLeastOne: 'Выберите хотя бы один вариант'
    },

    es: {

        financeManagement: 'Gestión financiera',
        financePlanningTitle: '📊 Planificación Financiera',
        income: 'Ingresos',
        expenses: 'Gastos',
        currentBalance: 'Saldo Actual',
        fixed: 'Fijo',
        variable: 'Variable',
        addIncome: '+ Añadir',
        addExpense: '+ Añadir',
        incomeType: 'Tipo de ingreso:',
        incomeTypeFixed: 'Fijo (p. ej. Salario)',
        incomeTypeVariable: 'Variable (p. ej. Bonificación)',
        fixedIncome: 'Ingreso fijo',
        variableIncome: 'Ingreso variable',
        expenseType: 'Tipo de gasto:',
        expenseTypeFixed: 'Fijo (p. ej. Alquiler)',
        expenseTypeVariable: 'Variable (p. ej. Comida)',
        fixedExpense: 'Gasto fijo',
        variableExpense: 'Gasto variable',
        noFixedIncomeYet: 'Sin ingresos fijos aún',
        noVariableIncomeYet: 'Sin ingresos variables aún',
        noFixedExpenseYet: 'Sin gastos fijos aún',
        noVariableExpenseYet: 'Sin gastos variables aún',
        currentlyAvailable: 'Disponible',
        positiveBalance: '✅ Positivo',
        negativeBalance: '⚠️ Negativo',

        trainingsPerMonth: "Entrenamientos por mes",

tableHeaderMonth: 'Mes',
tableHeaderSaved: 'Ahorrado',
tableHeaderDays: 'Días',
tableHeaderTracker: 'Rastreador',
great: 'Excelente',
good: 'Bueno',
okay: 'Bien',
bad: 'Mal',
terrible: 'Horrible',

 pdfDownloadTitle: 'Pro: Descargue su informe anual',
        pdfDownloadDesc: 'Obtenga su informe anual completo con todas las estadísticas',
        pdfFeature1: '📊 Todas las estadísticas de hábitos y rastreadores',
        pdfFeature2: '📈 Gráficos detallados para todas las categorías',
        pdfFeature3: '📝 Resumen de entradas de estado de ánimo',
        pdfFeature4: '💪 Registro de entrenamientos de fuerza y resistencia',
        pdfFeature5: '🚫 Progreso de la lucha contra las adicciones',
        pdfFeature6: '🏆 Logros e hitos',
        pdfFeature7: '💰 Cálculos de dinero ahorrado',
        pdfFeature8: '📅 Resumen anual completo y calendario',
        pdfDownloadBtn: '📥 Descargar informe anual',
        pdfFooter: 'Formato PDF • Solo en su dispositivo • Sin compartir datos',
        proVersion: '💎 Versión Pro',
        selectLanguage: 'Seleccionar idioma',

            proVersion: 'Versión Pro',
    unlockedFeatures: '¡Desbloquea funciones Pro!',
    pdfExport: 'Exportar resumen anual como PDF',
    advancedStats: 'Estadísticas avanzadas',
    noAds: 'Sin anuncios',

    calisthenics: 'Calistenia',
    running: 'Correr',
    cardio: 'Cardio',
    hiit: 'HIIT',

    enter0ToDelete: 'Ingrese 0 para eliminar',
        Name: 'Nombre',

        // ===== PISTAS Y MENSAJES COMUNES =====
        amountToday: 'Cantidad hoy:',
        amountLabel: 'Cantidad:',
        editTrackerDay: 'Editar día',
        
        hintAddItem: 'Presiona + para añadir una nueva entrada',
        hintEditItem: 'Toca para editar',
        hintDeleteItem: 'Presión larga para eliminar',
        hintSwipeLeft: 'Desliza a la izquierda para eliminar',
        hintSwipeRight: 'Desliza a la derecha para ver detalles',
        hintTapDetails: 'Toca para más información',
        noData: 'Sin datos disponibles',
        loading: 'Cargando...',
        error: 'Ocurrió un error',
        success: '¡Éxito!',
        warning: 'Advertencia',
        info: 'Información',

        // ===== ANUNCIOS Y SOPORTE =====
        removeAdsTitle: 'Eliminar todos los anuncios',
        adFreeExperience: '¡Disfruta una experiencia sin anuncios!',
        noMorePopups: 'Sin más anuncios emergentes',
        smoothExperience: 'Experiencia fluida',
        supportDevelopment: 'Apoyar desarrollo',
        oneTimePurchase: 'Compra única, acceso de por vida',
        oneTime: 'única',
        purchaseNow: 'Comprar ahora',
        purchaseComplete: '¡Compra completada!',
        adsRemovedSuccess: '¡Todos los anuncios eliminados!',
        loadingAd: 'Cargando anuncio...',

        supportTitle: 'Apoyar al desarrollador',
        supportMessage: '¡Hola! Soy un desarrollador independiente que trabaja duro para mejorar esta aplicación para ti. Si te gusta y quieres apoyarme, puedes ver algunos anuncios. ¡Cada vista me ayuda a seguir desarrollando! 🙏',
        supportShort: 'Anuncio corto',
        supportShortDesc: '1 anuncio corto (~15 seg)',
        supportMedium: 'Anuncio estándar',
        supportMediumDesc: '1 anuncio (~30 seg)',
        supportDouble: 'Apoyo doble',
        supportDoubleDesc: '2 anuncios (~60 seg total)',
        supportBest: '🌟 Más útil',
        adsWatchedText: 'Anuncios vistos hoy:',
        supportThanks: '¡Gracias por tu apoyo!',
        supportClose: 'Cerrar',
        preparingAd: 'Preparando anuncio...',
        adDuration: 'Duración',
        thankYou: '¡Gracias!',
        supportReceived: '¡Tu apoyo significa mucho! ❤️',

        // ===== ÁNIMO Y MAPA DE CALOR =====
        moodHeatmapHow: '💡 ¿Cómo funciona el mapa de calor de ánimo?',
        moodHeatmapDesc: 'Cada día está coloreado según tu ánimo',
        avgYear: 'Ø Año',
        worstMonth: 'Peor mes',

        // ===== PERSPECTIVAS Y LOGROS =====
        insightMuscles: '¡Los músculos crecen mientras duermes! 😴',
        insightHeart: '¡Corazón de león! 🦁',
        insightRoutine: '¡Maestro de rutina desbloqueado! 📅',
        insightLegendary: '¡Legendario! 👑',
        insightMoney: '¡Movimientos de dinero inteligentes! 📈',
        insightUnbalance: '¡Desequilibrio detectado! ¡Las áreas débiles necesitan más enfoque!',
        insightBalance: '¡Equilibrio perfecto desbloqueado! ¡Campeón completo!',
        insightKeepGoing: '¡Recuerda: El éxito es la suma de pequeños pasos! ¡Sigue adelante!',
        insightFire: '¡Estás en llamas! ¡Absolutamente excelente en todos los niveles!',
        insightStrong: '¡Desempeño fuerte! ¡Estás en el camino del campeón!',
        insightGood: 'Buena base - ¡ahora acelera y domina!',
        insightStart: '¡Hora de trabajar! ¡Tu regreso comienza ahora!',
        insightTop: 'TOP',
        insightCrushing: '¡Lo está aplastando! ¡Sigue así!',
        insightNeedsAttention: 'necesita atención! Concentrémonos aquí.',
        mode: 'Modo',

        // ===== PERFIL Y ESTADÍSTICAS =====
        yourName: 'Tu nombre',
        profileSubtitle: '¡Mantente fuerte y enfocado!',

        strength: 'Fuerza',
        stamina: 'Resistencia',
        habits: 'Hábitos',
        addictions: 'Adicciones',
        finances: 'Finanzas',

        // ===== INICIO Y NAVEGACIÓN =====
        swipeHint: 'Toca una estadística para más detalles',
        yearOverview: 'Resumen anual 2025',

        week: 'Semana',
        achievements: 'Logros',
        mood: 'Ánimo',

        selectLanguage: 'Seleccionar idioma',

        // ===== BOTONES =====
        back: '<',
        close: 'Cerrar',
        cancel: 'Cancelar',
        save: 'Guardar',
        add: 'Añadir',
        edit: 'Editar',
        delete: 'Eliminar',
        required: 'Requerido',
        optional: 'Opcional',
        yes: 'Sí',
        no: 'No',
        ok: 'OK',
        retry: 'Reintentar',
        done: 'Hecho',
        continue: 'Continuar',
        skip: 'Saltar',

        // ===== TÍTULOS DE MODALES =====
        weeklyTitle: 'Resumen semanal',
        achievementsTitle: 'Logros',
        moodTitle: 'Ánimo',
        habitTitle: 'Hábitos',
        strengthTitle: 'Fuerza',
        staminaTitle: 'Resistencia',
        financeTitle: 'Finanzas',
        addictionsTitle: 'Adicciones',

        // ===== METAS =====
        setGoal: 'Establecer meta',
        monthlyGoal: 'Meta mensual',
        savingsGoal: 'Meta de ahorro',
        trainingsPerMonth: 'Entrenamientos por mes:',
        savingsPerMonth: 'Meta de ahorro mensual (€):',
        goal: 'Meta',
        progress: 'Progreso',

        // ===== HÁBITOS =====
        newHabit: 'Nuevo hábito',
        editHabit: 'Editar hábito',
        habitName: 'Nombre del hábito',
        noHabitsYet: 'Sin hábitos aún',
        noHabitsText: 'Presiona + para crear uno',
        monthlyGoalDays: 'Meta mensual (días):',
        tapForYearView: 'Toca para vista anual',
        totalDays: 'Total de días',
        yearGoal: 'Meta anual',
        successRate: 'Tasa de éxito',
        currentMonth: 'Mes actual',
        completed: 'Completado',
        days: 'Días',

        // ===== ENTRENAMIENTO =====
        addTraining: 'Añadir entrenamiento',
        editTraining: 'Editar entrenamiento',
        trainingType: 'Tipo de entrenamiento:',
        notes: 'Notas:',
        notesOptional: 'Notas (opcional):',
        noTrainingsYet: 'Sin entrenamientos aún',
        noTrainingsText: 'Presiona + para añadir un entrenamiento',
        trainings: 'Entrenamientos',

        calisthenics: 'Calistenia',
        running: 'Correr',
        cardio: 'Cardio',
        hiit: 'HIIT',

        krafttraining: 'Entrenamiento de fuerza',
        gym: 'Gimnasio',
        bodyweight: 'Peso corporal',
        powerlifting: 'Powerlifting',
        weightTraining: 'Entrenamiento de fuerza',

        // ===== FINANZAS =====
        addSavings: 'Añadir ahorros',
        editSavings: 'Editar ahorros',
        amount: 'Cantidad (€):',
        total: 'Total',
        thisMonth: 'Este mes',
        saved: 'Ahorrado',
        noEntriesYet: 'Sin entradas aún',
        noEntriesText: 'Presiona + para ahorrar',

        // ===== ADICCIONES =====
        newTracker: 'Nuevo rastreador',
        editTracker: 'Editar rastreador',
        trackerName: 'Nombre:',
        costPerWeek: 'Costo por semana:',
        noTrackersYet: 'Sin rastreadores aún',
        noTrackersText: 'Presiona + para crear uno',
        pause: 'Pausar',
        resume: 'Reanudar',
        reset: 'Reiniciar',
        start: 'Iniciar',
        cleanMode: 'Modo Limpio',
        reductionMode: 'Modo Reducción',
        cleanDaysGoal: 'Meta de días limpios:',
        dailyLimit: 'Límite diario:',
        monthlyGoalDaysUnderLimit: 'Meta mensual (días bajo límite):',
        showMoneySaved: 'Mostrar dinero ahorrado',
        yearTotal: 'Total anual',
        avgMonth: 'Ø/Mes',
        avgDay: 'Ø/Día',

        // ===== RESUMEN DE ESTADÍSTICAS =====
        unlocked: 'desbloqueado',

        // ===== RESUMEN SEMANAL =====
        thisWeek: 'Esta semana',
        strongWeek: '¡Semana de entrenamiento fuerte!',
        moreTraining: '¡Más entrenamiento posible!',
        topHabits: '¡Hábitos principales!',
        goodConsistency: '¡Buena consistencia!',
        focusHabits: '¡Enfócate en hábitos!',
        cleanWeekReached: '¡Semana limpia alcanzada!',
        clean: 'Limpio',

        // ===== SECCIÓN DE ÁNIMO =====
        howDoYouFeel: '¿Cómo te sientes?',
        great: 'Excelente',
        good: 'Bien',
        okay: 'Normal',
        bad: 'Mal',
        terrible: 'Terrible',
        noteOptional: 'Nota (opcional):',
        whatHappened: '¿Qué pasó hoy?',
        avgWeek: 'Ø Semana',
        streak: 'Racha',
        entries: 'Entradas',
        savedToday: '✓ Guardado hoy',
        viewYearHeatmap: '📅 Ver mapa de calor anual',
        moodYearHeatmap: 'Mapa de calor de ánimo 2025',

        // ===== GRÁFICO =====
        activitiesPerMonth: 'Actividades por mes',
        count: 'Cantidad',
        month: 'Mes',
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        daysShort: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],

        // ===== MAPA DE CALOR =====
        heatmapHow: '💡 ¿Cómo funciona el mapa de calor?',
        heatmapDesc: 'Cada día del año está coloreado:',
        heatmapEmpty: 'Vacío = Sin actividad',
        heatmapLight: 'Claro = 1 actividad',
        heatmapMedium: 'Medio = 2 actividades',
        heatmapHigh: 'Oscuro = 3+ actividades',
        heatmapLegend: '• Vacío: Sin actividad, Claro: 1, Medio: 2, Oscuro: 3+ actividades',
        activeDays: 'Días activos',
        bestMonth: 'Mejor mes',

        // ===== PERSONALIDAD =====
        personalityDesc: 'Tu desarrollo',
        personalityYourStats: 'Tus estadísticas',

        // ===== MARCADORES DE POSICIÓN =====
        phHabitName: 'Nombre del hábito',
        phTrackerName: 'Nombre del rastreador',
        phAmount: 'Cantidad',
        phNotes: 'ej. 5km, 30 min',
        phNotesFinance: 'ej. Salario',
        phStrengthNotes: 'ej. Pecho, 90kg',
        phGoalStamina: 'ej. 20',
        phGoalStrength: 'ej. 16',
        phGoalFinance: 'ej. 500',
        phCostWeek: '€',
        notesPlaceholderStamina: 'ej. 5km, 30 min',
        notesPlaceholderStrength: 'ej. Pecho, 90kg',
        notesPlaceholderFinance: 'ej. Salario',

        // ===== CONFIRMACIONES =====
        confirmDelete: '¿Eliminar?',
        confirmDeleteHabit: '¿Eliminar hábito?',
        confirmDeleteTraining: '¿Eliminar entrenamiento?',
        confirmDeleteEntry: '¿Eliminar entrada?',
        confirmDeleteTracker: '¿Eliminar rastreador?',
        confirmReset: '¿Reiniciar?',

        // ===== LOGROS =====
        achievementUnlocked: '¡Logro desbloqueado!',
        achievementCheck: '✓ Desbloqueado',
        
        // ===== ERROR Y VALIDACIÓN =====
        noInternetConnection: 'Sin conexión a internet',
        tryAgain: 'Intenta de nuevo',
        fieldRequired: 'Este campo es requerido',
        invalidInput: 'Entrada inválida',
        selectAtLeastOne: 'Selecciona al menos una opción'
    }
};

function t(key) {
    return translations[currentLanguage][key] || translations['de'][key] || key;
}

function switchLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Sprache nicht gefunden: ${lang} – fallback auf en`);
        lang = 'en';
    }

    currentLanguage = lang;
    localStorage.setItem('language', lang);

    console.log(`Sprache gewechselt zu: ${lang}`);

    // ALLE Übersetzungen aktualisieren
    updateAllTexts();
    updateSelectOptions();
    updatePdfSection();
    translatePage(lang); // data-i18n

    // UI neu rendern
    if (typeof renderHabits === 'function') renderHabits();
    if (typeof renderStamina === 'function') renderStamina();
    if (typeof renderStrength === 'function') renderStrength();
    if (typeof renderFinance === 'function') renderFinance();
    if (typeof renderTrackers === 'function') renderTrackers();
    if (typeof updateStats === 'function') updateStats();
    if (typeof updateYearOverview === 'function') updateYearOverview();

    closeLanguageModal();
}

function showLanguageModal() {
    document.getElementById('languageModal').classList.add('show');
}

function closeLanguageModal() {
    document.getElementById('languageModal').classList.remove('show');
}


function updateAllTexts() {
    console.log('📄 Updating all UI texts to:', currentLanguage);

    const addAmountHint = document.getElementById('addAmountHint');
if (addAmountHint) addAmountHint.textContent = '💡 ' + t('enter0ToDelete');

const editTrackerDayHint = document.getElementById('editTrackerDayHint');
if (editTrackerDayHint) editTrackerDayHint.textContent = '💡 ' + t('enter0ToDelete');
    
// Alle costPerWeek Labels
const trackerCostPerWeekLabel = document.getElementById('trackerCostPerWeekLabel');
if (trackerCostPerWeekLabel) trackerCostPerWeekLabel.textContent = t('costPerWeek');

const editTrackerCostPerWeekLabel = document.getElementById('editTrackerCostPerWeekLabel');
if (editTrackerCostPerWeekLabel) editTrackerCostPerWeekLabel.textContent = t('costPerWeek');

const financeCostPerWeekLabel = document.getElementById('financeCostPerWeekLabel');
if (financeCostPerWeekLabel) financeCostPerWeekLabel.textContent = t('costPerWeek');

// Alle Goal Labels
const trackerGoalLabel = document.getElementById('trackerGoalLabel');
if (trackerGoalLabel) trackerGoalLabel.textContent = t('cleanDaysGoal');

const editTrackerGoalLabel = document.getElementById('editTrackerGoalLabel');
if (editTrackerGoalLabel) editTrackerGoalLabel.textContent = t('cleanDaysGoal');

// Support Modal
const supportTitle = document.getElementById('supportTitle');
if (supportTitle) supportTitle.textContent = t('supportTitle');

const supportMessage = document.getElementById('supportMessage');
if (supportMessage) supportMessage.textContent = t('supportMessage');

const supportShort = document.getElementById('supportShort');
if (supportShort) supportShort.textContent = t('supportShort');

const supportShortDesc = document.getElementById('supportShortDesc');
if (supportShortDesc) supportShortDesc.textContent = t('supportShortDesc');

const supportMedium = document.getElementById('supportMedium');
if (supportMedium) supportMedium.textContent = t('supportMedium');

const supportMediumDesc = document.getElementById('supportMediumDesc');
if (supportMediumDesc) supportMediumDesc.textContent = t('supportMediumDesc');

const supportDouble = document.getElementById('supportDouble');
if (supportDouble) supportDouble.textContent = t('supportDouble');

const supportDoubleDesc = document.getElementById('supportDoubleDesc');
if (supportDoubleDesc) supportDoubleDesc.textContent = t('supportDoubleDesc');

const supportBest = document.getElementById('supportBest');
if (supportBest) supportBest.textContent = t('supportBest');

// Support Modal Texts
const adsWatchedText = document.getElementById('adsWatchedText');
if (adsWatchedText) {
    const currentCount = adsWatchedToday || 0;
    adsWatchedText.innerHTML = t('adsWatchedText') + ' <strong id="adsWatchedCount">' + currentCount + '</strong>';
}

const supportThanks = document.getElementById('supportThanks');
if (supportThanks) supportThanks.textContent = t('supportThanks');

const supportClose = document.getElementById('supportClose');
if (supportClose) supportClose.textContent = t('supportClose');

// Finance Goal Modal
const financeGoalModalLabel = document.querySelector('#financeGoalModal .modal-label');
if (financeGoalModalLabel) financeGoalModalLabel.textContent = t('savingsPerMonth');

// Tracker Mode Label
const trackerModeLabel = document.querySelectorAll('#trackerModal .modal-label')[2];
if (trackerModeLabel) trackerModeLabel.textContent = t('mode') + ':';

const editTrackerModeLabel = document.querySelectorAll('#editTrackerModal .modal-label')[2];
if (editTrackerModeLabel) editTrackerModeLabel.textContent = t('mode') + ':';

// Tracker Daily Limit Labels (Reduction Mode)
const trackerDailyLimitLabels = document.querySelectorAll('#trackerDailyLimitContainer .modal-label');
if (trackerDailyLimitLabels[0]) trackerDailyLimitLabels[0].textContent = t('dailyLimit');
if (trackerDailyLimitLabels[1]) trackerDailyLimitLabels[1].textContent = t('monthlyGoalDaysUnderLimit');

const editTrackerDailyLimitLabels = document.querySelectorAll('#editTrackerDailyLimitContainer .modal-label');
if (editTrackerDailyLimitLabels[0]) editTrackerDailyLimitLabels[0].textContent = t('dailyLimit');
if (editTrackerDailyLimitLabels[1]) editTrackerDailyLimitLabels[1].textContent = t('monthlyGoalDaysUnderLimit');

// Show Money Saved Checkbox
const showMoneyLabel = document.querySelector('label[for="trackerShowMoney"]');
if (showMoneyLabel) showMoneyLabel.textContent = t('showMoneySaved');

const editShowMoneyLabel = document.querySelector('label[for="editTrackerShowMoney"]');
if (editShowMoneyLabel) editShowMoneyLabel.textContent = t('showMoneySaved');


    // HOME SCREEN - mit Safety Checks
    const statStrength = document.getElementById('statStrength');
    if (statStrength) statStrength.textContent = t('strength');
    
    const statStamina = document.getElementById('statStamina');
    if (statStamina) statStamina.textContent = t('stamina');
    
    const statHabits = document.getElementById('statHabits');
    if (statHabits) statHabits.textContent = t('habits');
    
    const statAddictions = document.getElementById('statAddictions');
    if (statAddictions) statAddictions.textContent = t('addictions');
    
    const statFinances = document.getElementById('statFinances');
    if (statFinances) statFinances.textContent = t('finances');
    
    const profileSubtitle = document.getElementById('profileSubtitle');
    if (profileSubtitle) profileSubtitle.textContent = t('profileSubtitle');
    
    const swipeHint = document.getElementById('swipeHint');
    if (swipeHint) swipeHint.textContent = t('swipeHint');
    
    const quickWeek = document.getElementById('quickWeek');
    if (quickWeek) quickWeek.textContent = t('week');
    
    const quickAchievements = document.getElementById('quickAchievements');
    if (quickAchievements) quickAchievements.textContent = t('achievements');
    
    const quickMood = document.getElementById('quickMood');
    if (quickMood) quickMood.textContent = t('mood');
    
    const yearOverviewTitle = document.getElementById('yearOverviewTitle');
    if (yearOverviewTitle) yearOverviewTitle.textContent = t('yearOverview');
    
    const legendStrength = document.getElementById('legendStrength');
    if (legendStrength) legendStrength.textContent = t('strength');
    
    const legendStamina = document.getElementById('legendStamina');
    if (legendStamina) legendStamina.textContent = t('stamina');
    
    const legendHabits = document.getElementById('legendHabits');
    if (legendHabits) legendHabits.textContent = t('habits');
    
    const legendAddictions = document.getElementById('legendAddictions');
    if (legendAddictions) legendAddictions.textContent = t('addictions');
    
    const legendFinances = document.getElementById('legendFinances');
    if (legendFinances) legendFinances.textContent = t('finances');

    // FINANCE PLANNING BUTTON
    const financeScreenPlanBtn = document.getElementById('financeScreenPlanBtn');
    if (financeScreenPlanBtn) financeScreenPlanBtn.textContent = t('financePlanningTitle');
    
    const heatmapHow = document.getElementById('heatmapHow');
    if (heatmapHow) heatmapHow.textContent = t('heatmapHow');
    
    const heatmapDesc = document.getElementById('heatmapDesc');
    if (heatmapDesc) heatmapDesc.textContent = t('heatmapDesc');
    
    const heatmapLegend = document.getElementById('heatmapLegend');
    if (heatmapLegend) heatmapLegend.textContent = t('heatmapLegend');
    
    const heatmapActiveDaysLabel = document.getElementById('heatmapActiveDaysLabel');
    if (heatmapActiveDaysLabel) heatmapActiveDaysLabel.textContent = t('activeDays');
    
    const heatmapStreakLabel = document.getElementById('heatmapStreakLabel');
    if (heatmapStreakLabel) heatmapStreakLabel.textContent = t('streak');
    
    const heatmapBestMonthLabel = document.getElementById('heatmapBestMonthLabel');
    if (heatmapBestMonthLabel) heatmapBestMonthLabel.textContent = t('bestMonth');
    
    const heatmapAvgWeekLabel = document.getElementById('heatmapAvgWeekLabel');
    if (heatmapAvgWeekLabel) heatmapAvgWeekLabel.textContent = t('avgWeek');
    
    const personalityDesc = document.getElementById('personalityDesc');
    if (personalityDesc) personalityDesc.textContent = t('personalityDesc');
    
    // SCREEN HEADERS
    const habitsHeader = document.querySelector('#habitsScreen .screen-header');
    if (habitsHeader) habitsHeader.textContent = '💪 ' + t('habits');
    
    const staminaHeader = document.querySelector('#staminaScreen .screen-header');
    if (staminaHeader) staminaHeader.textContent = '⚡ ' + t('stamina');
    
    const strengthHeader = document.querySelector('#strengthScreen .screen-header');
    if (strengthHeader) strengthHeader.textContent = '💪 ' + t('strength');
    
    const financeHeader = document.querySelector('#financeScreen .screen-header');
    if (financeHeader) financeHeader.textContent = '💰 ' + t('finances');
    
    const addictionsHeader = document.querySelector('#addictionsScreen .screen-header');
    if (addictionsHeader) addictionsHeader.textContent = '🚫 ' + t('addictions');
    
    // FINANCE SUMMARY
    const financeLabels = document.querySelectorAll('.finance-stat-label');
    if (financeLabels[0]) financeLabels[0].textContent = '💰 ' + t('total');
    if (financeLabels[1]) financeLabels[1].textContent = '📅 ' + t('thisMonth');
    
 // GOAL CARDS
    const staminaGoalLabel = document.querySelector('#staminaScreen .goal-label');
    if (staminaGoalLabel) staminaGoalLabel.textContent = t('monthlyGoal');
    
    const strengthGoalLabel = document.querySelector('#strengthScreen .goal-label');
    if (strengthGoalLabel) strengthGoalLabel.textContent = t('monthlyGoal');
    
    const financeGoalLabel = document.querySelector('#financeScreen .goal-label');
    if (financeGoalLabel) financeGoalLabel.textContent = t('savingsGoal');
    
    // MODAL TITLES
    const staminaGoalModalTitle = document.querySelector('#staminaGoalModal .modal-title');
    if (staminaGoalModalTitle) staminaGoalModalTitle.textContent = '⚡ ' + t('staminaTitle') + ' ' + t('goal');
    
    const strengthGoalModalTitle = document.querySelector('#strengthGoalModal .modal-title');
    if (strengthGoalModalTitle) strengthGoalModalTitle.textContent = '💪 ' + t('strengthTitle') + ' ' + t('goal');
    
    const financeGoalModalTitle = document.querySelector('#financeGoalModal .modal-title');
    if (financeGoalModalTitle) financeGoalModalTitle.textContent = '💰 ' + t('savingsGoal');
    
    const habitModalTitle = document.querySelector('#habitModal .modal-title');
    if (habitModalTitle) habitModalTitle.textContent = t('newHabit');
    
    const trackerModalTitle = document.querySelector('#trackerModal .modal-title');
    if (trackerModalTitle) trackerModalTitle.textContent = t('newTracker');
    
    const languageModalTitle = document.querySelector('#languageModal .modal-title');
    if (languageModalTitle) languageModalTitle.textContent = t('selectLanguage');
    
    // BUTTONS - Cancel
    document.querySelectorAll('.modal-btn.secondary').forEach(btn => {
        const text = btn.textContent.trim();
        if (text === 'Cancel' || text === 'Abbrechen' || text === 'Cancelar' || text === 'Отмена') {
            btn.textContent = t('cancel');
        }
    });
    
    // BUTTONS - Save/Add
    document.querySelectorAll('.modal-btn.primary').forEach(btn => {
        const text = btn.textContent.trim();
        if (text === 'Save' || text === 'Speichern' || text === 'Guardar' || text === 'Сохранить') {
            btn.textContent = t('save');
        } else if (text === 'Add' || text === 'Hinzufügen' || text === 'Añadir' || text === 'Добавить') {
            btn.textContent = t('add');
        }
    });
    
    // PLACEHOLDERS
    const staminaGoalInput = document.getElementById('staminaGoalInput');
    if (staminaGoalInput) staminaGoalInput.placeholder = t('phGoalStamina');
    
    const strengthGoalInput = document.getElementById('strengthGoalInput');
    if (strengthGoalInput) strengthGoalInput.placeholder = t('phGoalStrength');
    
    const financeGoalInput = document.getElementById('financeGoalInput');
    if (financeGoalInput) financeGoalInput.placeholder = t('phGoalFinance');
    
    const habitNameInput = document.getElementById('habitName');
    if (habitNameInput) habitNameInput.placeholder = t('phHabitName');
    
    const trackerNameInput = document.getElementById('trackerName');
    if (trackerNameInput) trackerNameInput.placeholder = t('phTrackerName');
    
// === MODAL LABELS ===
// Stamina Modal
document.querySelectorAll('#staminaModal .modal-label')[0].textContent = t('trainingType');
document.querySelectorAll('#staminaModal .modal-label')[1].textContent = t('notes');
document.querySelectorAll('#editStaminaModal .modal-label')[0].textContent = t('trainingType');
document.querySelectorAll('#editStaminaModal .modal-label')[1].textContent = t('notes');

// Strength Modal
document.querySelectorAll('#strengthModal .modal-label')[0].textContent = t('trainingType');
document.querySelectorAll('#strengthModal .modal-label')[1].textContent = t('notes');
document.querySelectorAll('#editStrengthModal .modal-label')[0].textContent = t('trainingType');
document.querySelectorAll('#editStrengthModal .modal-label')[1].textContent = t('notes');

// Finance Modal
document.querySelectorAll('#financeModal .modal-label')[0].textContent = t('amount');
document.querySelectorAll('#financeModal .modal-label')[1].textContent = t('notesOptional');
document.querySelectorAll('#editFinanceModal .modal-label')[0].textContent = t('amount');
document.querySelectorAll('#editFinanceModal .modal-label')[1].textContent = t('notesOptional');

// Habit Modal
document.querySelectorAll('#habitModal .modal-label')[0].textContent = t('habitName');
document.querySelectorAll('#habitModal .modal-label')[1].textContent = t('monthlyGoalDays');
document.querySelectorAll('#editHabitModal .modal-label')[0].textContent = t('habitName');
document.querySelectorAll('#editHabitModal .modal-label')[1].textContent = t('monthlyGoalDays');

// Tracker Modal
document.querySelectorAll('#trackerModal .modal-label')[0].textContent = t('trackerName');
document.querySelectorAll('#trackerModal .modal-label')[1].textContent = t('costPerWeek');

const editTrackerNameLabel = document.getElementById('editTrackerNameLabel');
if (editTrackerNameLabel) editTrackerNameLabel.textContent = t('Name');

const editTrackerCleanDaysGoalLabel = document.getElementById('editTrackerCleanDaysGoalLabel');
if (editTrackerCleanDaysGoalLabel) editTrackerCleanDaysGoalLabel.textContent = t('cleanDaysGoal');

// === EDIT MODAL TITLES ===
const editStaminaModalTitle = document.querySelector('#editStaminaModal .modal-title');
if (editStaminaModalTitle) editStaminaModalTitle.textContent = t('editTraining');

const editStrengthModalTitle = document.querySelector('#editStrengthModal .modal-title');
if (editStrengthModalTitle) editStrengthModalTitle.textContent = t('editTraining');

const editFinanceModalTitle = document.querySelector('#editFinanceModal .modal-title');
if (editFinanceModalTitle) editFinanceModalTitle.textContent = t('editSavings');

const editHabitModalTitle = document.querySelector('#editHabitModal .modal-title');
if (editHabitModalTitle) editHabitModalTitle.textContent = t('editHabit');

const editTrackerModalTitle = document.querySelector('#editTrackerModal .modal-title');
if (editTrackerModalTitle) editTrackerModalTitle.textContent = t('editTracker');

// === MODAL TITLES WITH CUSTOM HEADER ===
const weeklySummaryTitle = document.querySelector('#weeklySummaryModal .modal-title-inline');
if (weeklySummaryTitle) weeklySummaryTitle.textContent = t('weeklyTitle');

const achievementsTitle = document.querySelector('#achievementsModal .modal-title-inline');
if (achievementsTitle) achievementsTitle.textContent = t('achievementsTitle');

const moodTitle = document.querySelector('#moodJournalModal .modal-title-inline');
if (moodTitle) moodTitle.textContent = t('moodTitle');

// === DETAIL MODAL TITLES ===
const habitDetailTitle = document.querySelector('#habitDetailModal .modal-title-inline');
if (habitDetailTitle) habitDetailTitle.textContent = t('habitTitle');

const trackerDetailTitle = document.querySelector('#trackerDetailModal .modal-title-inline');
if (trackerDetailTitle) trackerDetailTitle.textContent = t('addictionsTitle');

// === ADD AMOUNT MODAL ===
const addAmountTitle = document.getElementById('addAmountModalTitle');
if (addAmountTitle) addAmountTitle.textContent = t('add') + ' ' + t('amount');
    

// === MODAL TITLES - ALLE ===
const modalTitles = {
    '#staminaGoalModal .modal-title': '⚡ ' + t('staminaTitle') + ' ' + t('goal'),
    '#staminaModal .modal-title': t('addTraining'),
    '#editStaminaModal .modal-title': t('editTraining'),
    '#strengthGoalModal .modal-title': '💪 ' + t('strengthTitle') + ' ' + t('goal'),
    '#strengthModal .modal-title': t('addTraining'),
    '#editStrengthModal .modal-title': t('editTraining'),
    '#financeGoalModal .modal-title': '💰 ' + t('savingsGoal'),
    '#financeModal .modal-title': t('addSavings'),
    '#editFinanceModal .modal-title': t('editSavings'),
    '#trackerModal .modal-title': t('newTracker'),
    '#editTrackerModal .modal-title': t('editTracker'),
    '#habitModal .modal-title': t('newHabit'),
    '#editHabitModal .modal-title': t('editHabit'),
    '#languageModal .modal-title': t('selectLanguage'),
    '#weeklySummaryModal .modal-title-inline': t('weeklyTitle'),
    '#achievementsModal .modal-title-inline': t('achievementsTitle'),
    '#moodJournalModal .modal-title-inline': t('moodTitle'),
    '#moodHeatmapModal .modal-title-inline': t('moodYearHeatmap'),
    '#addAmountModal .modal-title': t('add') + ' ' + t('amount')
};
    
    Object.keys(modalTitles).forEach(selector => {
        const element = document.querySelector(selector);
        if (element) element.textContent = modalTitles[selector];
    });


// Add Amount Modal
const addAmountTodayLabel = document.getElementById('addAmountTodayLabel');
if (addAmountTodayLabel) addAmountTodayLabel.textContent = t('amountToday');



const addAmountCancel = document.getElementById('addAmountCancel');
if (addAmountCancel) addAmountCancel.textContent = t('cancel');

const addAmountSave = document.getElementById('addAmountSave');
if (addAmountSave) addAmountSave.textContent = t('save');

// Edit Tracker Day Modal
const editTrackerDayAmountLabel = document.getElementById('editTrackerDayAmountLabel');
if (editTrackerDayAmountLabel) editTrackerDayAmountLabel.textContent = t('amountLabel');



const editTrackerDayCancel = document.getElementById('editTrackerDayCancel');
if (editTrackerDayCancel) editTrackerDayCancel.textContent = t('cancel');

const editTrackerDaySave = document.getElementById('editTrackerDaySave');
if (editTrackerDaySave) editTrackerDaySave.textContent = t('save');

// PDF Button übersetzen - DIREKT HIER
const pdfBtn = document.getElementById('pdfDownloadBtn');
if (pdfBtn) pdfBtn.textContent = t('pdfDownloadBtn');
    
    console.log('✅ All UI texts updated!');
}



function updateSelectOptions() {
    const staminaSelects = [
        document.getElementById('staminaType'),
        document.getElementById('editStaminaType')
    ];
    
    staminaSelects.forEach(select => {
        if (select) {
            const currentValue = select.value;
            select.innerHTML = `
                <option value="Calisthenics">🤸 ${t('calisthenics')}</option>
                <option value="Laufen">🏃 ${t('running')}</option>
                <option value="Cardio">❤️ ${t('cardio')}</option>
                <option value="HIIT">⚡ ${t('hiit')}</option>
            `;
            if (currentValue) select.value = currentValue;
        }
    });
    
    const strengthSelects = [
        document.getElementById('strengthType'),
        document.getElementById('editStrengthType')
    ];
    
    strengthSelects.forEach(select => {
        if (select) {
            const currentValue = select.value;
            select.innerHTML = `
                <option value="Krafttraining">🏋️ ${t('krafttraining')}</option>
                <option value="Gym">💪 ${t('gym')}</option>
                <option value="Bodyweight">🤸 ${t('bodyweight')}</option>
                <option value="Powerlifting">⚡ ${t('powerlifting')}</option>
            `;
            if (currentValue) select.value = currentValue;
        }
    });
    
    // TRACKER MODE SELECTS - NEU!
    const trackerModeSelects = [
        document.getElementById('trackerMode'),
        document.getElementById('editTrackerMode')
    ];
    
    trackerModeSelects.forEach(select => {
        if (select) {
            const currentValue = select.value;
            select.innerHTML = `
                <option value="clean">🚫 ${t('cleanMode')}</option>
                <option value="reduction">📉 ${t('reductionMode')}</option>
            `;
            if (currentValue) select.value = currentValue;
        }
    });
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateAllTexts();  // ✅ RICHTIG
    });
} else {
    updateAllTexts();  // ✅ RICHTIG
}

// Funktion zum Übersetzen
function translateText(key, lang = currentLanguage) {
    return translations[lang]?.[key] || key;
}

// Alle data-i18n Elemente übersetzen
function translatePage(lang = currentLanguage) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = translateText(key, lang);
        element.textContent = translation;
    });
}

// Beim Laden der Seite initiale Übersetzung
document.addEventListener('DOMContentLoaded', () => {
    translatePage(currentLanguage);
});


function updatePdfSection() {
    const pdfElements = document.querySelectorAll('#pdfExportSection [data-i18n]');
    pdfElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            const text = t(key);
            if (text) {
                el.textContent = text;
            }
        }
    });
    
    // AUCH Button-Span übersetzen
    const btnSpan = document.querySelector('span[data-i18n="pdfDownloadBtn"]');
    if (btnSpan) {
        btnSpan.textContent = t('pdfDownloadBtn');
        console.log('✅ PDF Button übersetzt:', btnSpan.textContent);
    }
}

// ============================================================================
// FIX FOR language.js - Lines 1833-1916
// ============================================================================
// Replace the entire section from line 1833 to the end with this code:

// Globale Variable für PDF-Container
let pdfContainer = null;

// PDF Button übersetzen
function translatePdfButton() {
    const btn = document.getElementById('pdfDownloadBtn');
    if (!btn) return;
    
    let text = '';
    if (currentLanguage === 'de') text = '📥 PDF Generieren';
    else if (currentLanguage === 'en') text = '📥 Generate PDF';
    else if (currentLanguage === 'ru') text = '📥 Загрузить PDF';
    else if (currentLanguage === 'es') text = '📥 Descargar PDF';
    
    if (text) {
        btn.textContent = text;
        console.log('✅ PDF Button übersetzt zu:', text);
    }
}

// Funktion zum Übersetzen von PDF-Inhalten
function translatePdfContent() {
    pdfContainer = document.getElementById('pdfContent');
    if (!pdfContainer) {
        console.warn('⚠️ PDF Container nicht gefunden - ID "pdfContent" existiert nicht');
        return false;
    }

    // Übersetze alle data-i18n in PDF
    pdfContainer.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = getPdfTranslation(key, currentLanguage);
    });

    // Speziell für Tabellen-Header (z.B. Mood)
    const moodHeaders = pdfContainer.querySelectorAll('.mood-table th');
    if (moodHeaders && moodHeaders.length > 0) {
        moodHeaders[0].textContent = getPdfTranslation('moodDistribution', currentLanguage);
        moodHeaders[1].textContent = getPdfTranslation('days', currentLanguage);
        moodHeaders[2].textContent = '%';
    }

    // Tracker-Table
    const trackerHeaders = pdfContainer.querySelectorAll('.tracker-table th');
    if (trackerHeaders && trackerHeaders.length > 0) {
        trackerHeaders[0].textContent = getPdfTranslation('tracker', currentLanguage);
        trackerHeaders[1].textContent = getPdfTranslation('days', currentLanguage);
        trackerHeaders[2].textContent = getPdfTranslation('saved', currentLanguage);
    }

    // Monthly-Table
    const monthlyHeaders = pdfContainer.querySelectorAll('.monthly-table th');
    if (monthlyHeaders && monthlyHeaders.length > 0) {
        monthlyHeaders[0].textContent = getPdfTranslation('month', currentLanguage);
        monthlyHeaders[1].textContent = getPdfTranslation('saved', currentLanguage);
    }

    // Mood-Labels dynamisch übersetzen
    const moodRows = pdfContainer.querySelectorAll('.mood-row td:first-child');
    moodRows.forEach((td, index) => {
        const moods = ['great', 'good', 'okay', 'bad', 'terrible'];
        const emoji = ['😄', '😊', '😐', '😕', '😢'][index];
        td.textContent = `${emoji} ${getPdfTranslation(moods[index], currentLanguage)}`;
    });
    
    return true;
}

// Funktion zum Exportieren von PDF (wird von pdf-export.js aufgerufen)
function exportPdf() {
    if (translatePdfContent()) {
        if (typeof exportPdf === 'function') {
    exportPdf();
} else {
    console.error('exportPdf function not available');
}
        console.log('✅ PDF exported successfully');
    } else {
        console.error('❌ PDF export failed - container not found');
    }
}

const oldSwitchLang = window.switchLanguage;
window.switchLanguage = function(lang) {
    oldSwitchLang.call(this, lang);
    setTimeout(() => translatePdfButton(), 100);
};

// Beim Laden
translatePdfButton();

// Beim Laden und immer wieder prüfen
document.addEventListener('DOMContentLoaded', () => {
    translatePdfButton();
});

setInterval(() => {
    const btn = document.getElementById('pdfDownloadBtn');
    if (btn) translatePdfButton();
}, 500);  // 500ms statt 1000ms
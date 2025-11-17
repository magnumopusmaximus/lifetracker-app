// ============================================================================
// TUTORIAL SYSTEM - Mit Consent Screen Step 0 - FIXED VERSION
// ============================================================================

class TutorialSystem {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 10;
        this.isRunning = false;
        this.originalStats = {};
        this.showingLanguageSelection = false;
        this.animationFrameIds = [];  // Track animation frames
        
        this.init();
    }

    init() {
        const consentGiven = localStorage.getItem('lifetracker_consent_v1');
        const tutorialShown = localStorage.getItem('tutorialShown');
        
        console.log('🎓 Tutorial Init - Consent:', !!consentGiven, 'TutorialShown:', !!tutorialShown);
        
        // ✅ FIX: Nur starten wenn BEIDE nicht vorhanden sind UND Tutorial nicht läuft
        if (!this.isRunning && !tutorialShown && !consentGiven) {
            console.log('📽️ Starte Tutorial (erstes Mal)');
            setTimeout(() => this.start(), 500);
        } else if (tutorialShown && consentGiven) {
            console.log('✅ Tutorial bereits gezeigt - NICHTS STARTEN');
        } else if (this.isRunning) {
            console.log('⏸️  Tutorial läuft bereits - NICHTS STARTEN');
        }
    }

    createTutorialUI() {
        if (document.getElementById('tutorialOverlay')) return;

        const tutorialHTML = `
            <div id="tutorialOverlay">
                <div class="tutorial-bg"></div>
                
                <div class="tutorial-modal" style="max-height: 270px !important;">
                    <div class="tutorial-content">
                        <div class="tutorial-icon" id="tutorialIcon">📊</div>
                        <h3 class="tutorial-step-title" id="tutorialStepTitle">Welcome</h3>
                        <p class="tutorial-step-desc" id="tutorialStepDesc">Description</p>
                    </div>

                    <div class="tutorial-footer">
                        <div class="tutorial-progress">
                            <span id="tutorialStepCounter">1/10</span>
                            <div class="tutorial-progress-bar">
                                <div class="tutorial-progress-fill" id="tutorialProgressFill"></div>
                            </div>
                        </div>

                        <div class="tutorial-buttons">
                            <button class="tutorial-btn tutorial-btn-secondary" id="tutorialPrevBtn" style="display: none;">Back</button>
                            <button class="tutorial-btn tutorial-btn-secondary" id="tutorialSkipBtn">Skip</button>
                            <button class="tutorial-btn tutorial-btn-primary" id="tutorialNextBtn">Next</button>
                        </div>
                    </div>
                </div>

                <div class="tutorial-highlight" id="tutorialHighlight" style="display: none;"></div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', tutorialHTML);
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('tutorialNextBtn').addEventListener('click', () => this.nextStep());
        document.getElementById('tutorialPrevBtn').addEventListener('click', () => this.previousStep());
        document.getElementById('tutorialSkipBtn').addEventListener('click', () => this.skip());
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isRunning) this.skip();
        });
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        
        // Nicht resetten - behalte currentStep falls schon gesetzt (z.B. Step 2 vom Button)
        const startStep = this.currentStep;
        
        // Warte kurz bis Stats wirklich geladen sind
        setTimeout(() => {
            this.saveOriginalStats();
            this.createTutorialUI();
            this.showStep(startStep);
        }, 500);
    }

    saveOriginalStats() {
        const statIds = {
            'strength': 'strengthValue',
            'stamina': 'staminaValue', 
            'habits': 'habitsValue',
            'addictions': 'addictionsValue',
            'finances': 'financesValue'
        };
        
        Object.entries(statIds).forEach(([stat, valueId]) => {
            const value = document.getElementById(valueId);
            const barId = stat + 'Bar';
            const bar = document.getElementById(barId);
            
            if (bar && value) {
                const computedStyle = window.getComputedStyle(bar);
                const barWidth = computedStyle.width;
                const valueText = value.textContent;
                
                this.originalStats[stat] = {
                    barWidth: barWidth,
                    value: valueText
                };
            }
        });
    }

    getStepContent(step) {
        // Fallback für t() wenn nicht definiert
        const t = (key) => {
            if (typeof window.t === 'function') return window.t(key);
            return key;
        };
        const steps = [
            {
                title: 'Select Language',
                desc: '',
                icon: '🌐',
                highlight: null,
                isLanguageSelect: true
            },
            {
                title: 'Privacy & Terms',
                desc: '',
                icon: '⚖️',
                highlight: null,
                isConsentScreen: true
            },
            {
                title: t('strength'),
                desc: currentLanguage === 'de' ? 'Verfolge deine Kraft-Workouts und messe deinen Fortschritt.' : 
                      currentLanguage === 'ru' ? 'Отслеживайте силовые тренировки и измеряйте прогресс.' :
                      currentLanguage === 'es' ? 'Sigue tus entrenamientos de fuerza y mide tu progreso.' :
                      'Track your strength workouts and measure progress.',
                icon: '💪',
                highlight: '[data-stat="strength"]'
            },
            {
                title: t('stamina'),
                desc: currentLanguage === 'de' ? 'Protokolliere Cardio-Aktivitäten und baue Ausdauer auf.' :
                      currentLanguage === 'ru' ? 'Записывайте кардио-активность и развивайте выносливость.' :
                      currentLanguage === 'es' ? 'Registra actividades cardio y desarrolla resistencia.' :
                      'Log your cardio activities and build endurance.',
                icon: '❤️',
                highlight: '[data-stat="stamina"]'
            },
            {
                title: t('habits'),
                desc: currentLanguage === 'de' ? 'Erstelle tägliche Gewohnheiten und verfolge Konsistenz.' :
                      currentLanguage === 'ru' ? 'Создавайте ежедневные привычки и отслеживайте последовательность.' :
                      currentLanguage === 'es' ? 'Crea hábitos diarios y rastreia la consistencia.' :
                      'Create daily habits and track your consistency.',
                icon: '📅',
                highlight: '[data-stat="habits"]'
            },
            {
                title: t('addictions'),
                desc: currentLanguage === 'de' ? 'Zähle deine sauberen Tage und verfolge Erholung.' :
                      currentLanguage === 'ru' ? 'Считайте чистые дни и отслеживайте восстановление.' :
                      currentLanguage === 'es' ? 'Cuenta tus días limpios y rastrea la recuperación.' :
                      'Count your clean days and track recovery.',
                icon: '🚫',
                highlight: '[data-stat="addictions"]'
            },
            {
                title: t('finances'),
                desc: currentLanguage === 'de' ? 'Protokolliere deine Ersparnisse und erreiche Ziele.' :
                      currentLanguage === 'ru' ? 'Записывайте сбережения и достигайте целей.' :
                      currentLanguage === 'es' ? 'Registra ahorros y alcanza metas financieras.' :
                      'Log your savings and reach financial goals.',
                icon: '💰',
                highlight: '[data-stat="finances"]'
            },
            {
                title: t('thisWeek'),
                desc: currentLanguage === 'de' ? 'Schau deine wöchentlichen Statistiken an.' :
                      currentLanguage === 'ru' ? 'Просмотрите еженедельную статистику и производительность.' :
                      currentLanguage === 'es' ? 'Ver estadísticas y rendimiento semanal.' :
                      'View your weekly stats and performance.',
                icon: '📱',
                highlight: '#quickWeek'
            },
            {
                title: t('achievements'),
                desc: currentLanguage === 'de' ? 'Schalte Erfolge frei wenn du Meilensteine erreichst.' :
                      currentLanguage === 'ru' ? 'Разблокируйте значки при достижении вех.' :
                      currentLanguage === 'es' ? 'Desbloquea insignias al alcanzar hitos.' :
                      'Unlock badges as you reach milestones.',
                icon: '🏆',
                highlight: '#quickAchievements'
            },
            {
                title: t('howDoYouFeel'),
                desc: currentLanguage === 'de' ? 'Verfolge deine tägliche Stimmung und Tagebuch.' :
                      currentLanguage === 'ru' ? 'Отслеживайте ежедневное настроение и ведите дневник.' :
                      currentLanguage === 'es' ? 'Rastrea tu estado de ánimo diario y mantén un diario.' :
                      'Track your daily mood and keep a journal.',
                icon: '😊',
                highlight: '#quickMood'
            }
        ];

        return steps[step] || steps[0];
    }

    showStep(stepNum) {
        this.currentStep = stepNum;
        console.log('📍 showStep called:', stepNum);
        const step = this.getStepContent(stepNum);
        console.log('📋 Step content:', step.title);

        document.getElementById('tutorialIcon').textContent = step.icon;
        document.getElementById('tutorialStepTitle').textContent = step.title;
        
        if (step.isConsentScreen) {
            const lang = currentLanguage || 'en';
            let policyHTML = '';
            let termsHTML = '';
            let privacyLabel = '';
            let termsLabel = '';
            
            if (lang === 'de') {
                policyHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. Datenerfassung:</strong> Wir sammeln Workouts, Gewohnheiten, Stimmung, Finanzen, Tracker-Daten.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Speicherung:</strong> Alle Daten lokal auf DEINEM Gerät (localStorage). KEINE Daten auf unseren Servern.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Deine Rechte:</strong> Du kannst deine Daten jederzeit löschen oder exportieren.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. Nicht gesammelt:</strong> Kein Standort, Kontaktdaten, Kreditkarten, Biometrie.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Dritte:</strong> Wir teilen keine Daten. Nur Analytik wenn aktiviert.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Cookies:</strong> Nur Session-Cookies, kannst jederzeit löschen.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>7. Kontakt:</strong> glockenhammer3301+privacy@gmail.com</p>
                `;
                termsHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. Lizenz:</strong> Nur persönliche, nicht-kommerzielle Nutzung auf deinen Geräten.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Einschränkungen:</strong> KEIN Hacking, Modifizieren oder kommerzielle Nutzung.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Deine Inhalte:</strong> Deine Daten gehören dir. Nicht illegal verwenden.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. Verfügbarkeit:</strong> App as-is. Keine Garantie. Wir können ändern/beenden.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Haftung:</strong> NICHT haftbar für Datenverlust oder Störungen.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Zahlungen:</strong> Nicht rückerstattbar. Auto-Renew. Jederzeit kündbar.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>7. Eigentumsrechte:</strong> Wir besitzen Code/Logo. Du darfst nicht kopieren.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>8. Beendigung:</strong> Wir können Zugang entziehen bei Verstößen.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>9. Kontakt:</strong> glockenhammer3301+support@gmail.com</p>
                `;
                privacyLabel = 'Ich habe die Datenschutzerklärung gelesen und akzeptiert';
                termsLabel = 'Ich habe die Nutzungsbedingungen gelesen und akzeptiert';
            } else if (lang === 'ru') {
                policyHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. Сбор данных:</strong> Мы собираем тренировки, привычки, настроение, финансы.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Хранение:</strong> Все данные локально на ВАШЕМ устройстве (localStorage). БЕЗ данных на серверах.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Ваши права:</strong> Вы можете удалить или экспортировать данные в любое время.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. Не собираем:</strong> Нет местоположения, контактов, кредитных карт, биометрии.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Третьи лица:</strong> Мы не делимся данными. Только аналитика если включена.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Куки:</strong> Только сессионные, можно удалить в любое время.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>7. Контакт:</strong> glockenhammer3301+privacy@gmail.com</p>
                `;
                termsHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. Лицензия:</strong> Только личное, некоммерческое использование.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Ограничения:</strong> БЕЗ хакинга, модификации или коммерческого использования.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Ваш контент:</strong> Ваши данные - ваши. Не используйте незаконно.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. Доступность:</strong> Приложение as-is. Нет гарантий. Можем изменить.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Ответственность:</strong> НЕ несем ответственность за потерю данных.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Платежи:</strong> Не возвратны. Авто-продление. Отмена в любое время.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>7. ИС:</strong> Мы владеем кодом. Вы не можете копировать.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>8. Прекращение:</strong> Можем заблокировать при нарушениях.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>9. Контакт:</strong> glockenhammer3301+support@gmail.com</p>
                `;
                privacyLabel = 'Я прочитал и принимаю Политику конфиденциальности';
                termsLabel = 'Я прочитал и принимаю Условия использования';
            } else if (lang === 'es') {
                policyHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. Recopilación:</strong> Recopilamos entrenamientos, hábitos, estado de ánimo, finanzas.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Almacenamiento:</strong> Todos los datos localmente en TU dispositivo (localStorage). SIN datos en servidores.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Tus derechos:</strong> Puedes eliminar o exportar tus datos en cualquier momento.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. No recopilado:</strong> Sin ubicación, contactos, tarjetas, biometría.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Terceros:</strong> No compartimos datos. Solo analítica si está habilitada.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Cookies:</strong> Solo de sesión, puedes eliminar en cualquier momento.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>7. Contacto:</strong> glockenhammer3301+privacy@gmail.com</p>
                `;
                termsHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. Licencia:</strong> Solo uso personal, no comercial.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Restricciones:</strong> SIN hacking, modificación o uso comercial.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Tu contenido:</strong> Tus datos son tuyos. No uses ilegalmente.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. Disponibilidad:</strong> App as-is. Sin garantías. Podemos cambiar.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Responsabilidad:</strong> NO responsables por pérdida de datos.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Pagos:</strong> No reembolsables. Auto-renovación. Cancelar en cualquier momento.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>7. PI:</strong> Somos propietarios del código. No puedes copiar.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>8. Terminación:</strong> Podemos bloquear por violaciones.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>9. Contacto:</strong> glockenhammer3301+support@gmail.com</p>
                `;
                privacyLabel = 'He leído y acepto la Política de privacidad';
                termsLabel = 'He leído y acepto los Términos de servicio';
            } else {
                policyHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. Data Collection:</strong> We collect workouts, habits, mood, finances, tracker data.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Storage:</strong> All data stored LOCALLY on YOUR device (localStorage). NO data on our servers.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Your Rights:</strong> You can delete or export your data anytime.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. Data NOT Collected:</strong> No location, contact data, credit cards, biometrics.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Third Parties:</strong> We don't share data. Only analytics if you enable it.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Cookies:</strong> Session cookies only, you can delete anytime.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>7. Contact:</strong> glockenhammer3301+privacy@gmail.com</p>
                `;
                termsHTML = `
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>1. License:</strong> Personal, non-commercial use only on devices you own.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>2. Restrictions:</strong> NO hacking, modifying, reverse-engineering, or commercial use.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>3. Your Content:</strong> Your data is yours. Don't use for illegal/harmful purposes.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>4. Availability:</strong> App provided "as-is". No guarantee of availability. We can modify/terminate.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>5. Liability:</strong> NOT liable for data loss, service interruption, or damages.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>6. Payments:</strong> Non-refundable. Auto-renew. Cancel anytime.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>7. Intellectual Property:</strong> We own code/logo. You can't copy/use it.</p>
                    <p style="margin: 0 0 4px 0; line-height: 1.3;"><strong>8. Termination:</strong> We can end your access if you violate terms.</p>
                    <p style="margin: 0; line-height: 1.3;"><strong>9. Contact:</strong> glockenhammer3301+support@gmail.com</p>
                `;
                privacyLabel = 'I have read and accept the Privacy Policy';
                termsLabel = 'I have read and accept the Terms of Service';
            }
            
            document.getElementById('tutorialStepDesc').innerHTML = `
                <div style="margin-top: 8px; font-size: 9px; color: #b0b0c0; max-height: 200px; overflow-y: auto; padding-right: 4px;">
                    <div style="background: #0f1929; padding: 8px; border-radius: 6px; margin-bottom: 8px; border: 1px solid #2a3f5f;">
                        <strong style="color: #00d4ff; display: block; margin-bottom: 6px;">🔒 PRIVACY POLICY</strong>
                        ${policyHTML}
                    </div>
                    <div style="background: #0f1929; padding: 8px; border-radius: 6px; margin-bottom: 10px; border: 1px solid #2a3f5f;">
                        <strong style="color: #00d4ff; display: block; margin-bottom: 6px;">⚖️ TERMS OF SERVICE</strong>
                        ${termsHTML}
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
                        <label style="display: flex; gap: 8px; align-items: flex-start; cursor: pointer;">
                            <input type="checkbox" id="tutorialPrivacy" style="margin-top: 2px; width: 14px; height: 14px; accent-color: #00d4ff; cursor: pointer; flex-shrink: 0;" onchange="tutorialSystem.updateConsentButton()">
                            <span style="line-height: 1.3;">${privacyLabel}</span>
                        </label>
                        <label style="display: flex; gap: 8px; align-items: flex-start; cursor: pointer;">
                            <input type="checkbox" id="tutorialTerms" style="margin-top: 2px; width: 14px; height: 14px; accent-color: #00d4ff; cursor: pointer; flex-shrink: 0;" onchange="tutorialSystem.updateConsentButton()">
                            <span style="line-height: 1.3;">${termsLabel}</span>
                        </label>
                    </div>
                </div>
            `;
        } else if (step.isLanguageSelect) {
            document.getElementById('tutorialStepDesc').innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 15px;">
                    <button class="tutorial-language-btn" onclick="tutorialSystem.selectLanguage('en')">
                        <span style="font-size: 40px; line-height: 1;">🇬🇧</span>
                        <span>English</span>
                    </button>
                    <button class="tutorial-language-btn" onclick="tutorialSystem.selectLanguage('de')">
                        <span style="font-size: 40px; line-height: 1;">🇩🇪</span>
                        <span>Deutsch</span>
                    </button>
                    <button class="tutorial-language-btn" onclick="tutorialSystem.selectLanguage('ru')">
                        <span style="font-size: 40px; line-height: 1;">🇷🇺</span>
                        <span>Русский</span>
                    </button>
                    <button class="tutorial-language-btn" onclick="tutorialSystem.selectLanguage('es')">
                        <span style="font-size: 40px; line-height: 1;">🇪🇸</span>
                        <span>Español</span>
                    </button>
                </div>
            `;
        } else {
            document.getElementById('tutorialStepDesc').textContent = step.desc;
            this.animateStatBar(stepNum);
        }
        
        document.getElementById('tutorialStepCounter').textContent = `${stepNum + 1}/10`;

        const progress = ((stepNum + 1) / 10) * 100;
        document.getElementById('tutorialProgressFill').style.width = progress + '%';

        const prevBtn = document.getElementById('tutorialPrevBtn');
        if (prevBtn) {
            prevBtn.style.display = (stepNum === 0 || step.isLanguageSelect || step.isConsentScreen) ? 'none' : 'block';
            prevBtn.textContent = t('back');
        }

        const skipBtn = document.getElementById('tutorialSkipBtn');
        if (skipBtn) skipBtn.style.display = (step.isConsentScreen || step.isLanguageSelect) ? 'none' : 'block';
        if (skipBtn) skipBtn.textContent = t('skip');

        const nextBtn = document.getElementById('tutorialNextBtn');
        if (nextBtn) {
            nextBtn.onclick = null;
            
            if (step.isConsentScreen) {
                nextBtn.style.display = 'block';
                nextBtn.disabled = true;
                nextBtn.textContent = 'Accept & Continue';
                nextBtn.onclick = () => this.acceptConsent();
            } else if (step.isLanguageSelect) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'block';
                nextBtn.disabled = false;
                const isLast = stepNum === 9;
                nextBtn.textContent = isLast ? t('done') : t('continue');
                nextBtn.classList.toggle('tutorial-btn-finish', isLast);
                nextBtn.onclick = () => this.nextStep();
            }
        }

        this.highlightElement(step.highlight);
    }

    acceptConsent() {
        const privacyChecked = document.getElementById('tutorialPrivacy')?.checked;
        const termsChecked = document.getElementById('tutorialTerms')?.checked;
        
        console.log('✅ acceptConsent called. Privacy:', privacyChecked, 'Terms:', termsChecked);
        
        if (privacyChecked && termsChecked) {
            console.log('✅ Beide Checkboxen akzeptiert - gehe zu nächstem Step');
            this.nextStep();
        } else {
            console.log('❌ Checkboxes not both checked');
        }
    }

    updateConsentButton() {
        const privacyChecked = document.getElementById('tutorialPrivacy')?.checked;
        const termsChecked = document.getElementById('tutorialTerms')?.checked;
        const nextBtn = document.getElementById('tutorialNextBtn');
        
        if (nextBtn) {
            if (privacyChecked && termsChecked) {
                nextBtn.disabled = false;
                nextBtn.style.opacity = '1';
            } else {
                nextBtn.disabled = true;
                nextBtn.style.opacity = '0.5';
            }
        }
    }

    highlightElement(selector) {
        const highlight = document.getElementById('tutorialHighlight');
        if (!highlight) return;

        if (!selector) {
            highlight.style.display = 'none';
            return;
        }

        const element = document.querySelector(selector);
        if (!element) {
            highlight.style.display = 'none';
            return;
        }

        const rect = element.getBoundingClientRect();
        highlight.style.display = 'block';
        highlight.style.top = (rect.top - 10) + 'px';
        highlight.style.left = (rect.left - 10) + 'px';
        highlight.style.width = (rect.width + 20) + 'px';
        highlight.style.height = (rect.height + 20) + 'px';
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (end - start) * progress;
            element.textContent = current.toFixed(1);
            
            if (progress < 1) {
                const frameId = requestAnimationFrame(animate);
                this.animationFrameIds.push(frameId);
            } else {
                element.textContent = end.toFixed(1);
            }
        };
        
        const frameId = requestAnimationFrame(animate);
        this.animationFrameIds.push(frameId);
    }

    animateStatBar(stepNum) {
        const statMap = {
            2: 'strength',
            3: 'stamina',
            4: 'habits',
            5: 'addictions',
            6: 'finances'
        };
        
        const statName = statMap[stepNum];
        if (!statName) return;
        
        const statIds = {
            'strength': 'strengthValue',
            'stamina': 'staminaValue', 
            'habits': 'habitsValue',
            'addictions': 'addictionsValue',
            'finances': 'financesValue'
        };
        
        Object.entries(statMap).forEach(([step, stat]) => {
            if (stat !== statName) {
                const valueId = statIds[stat];
                const value = document.getElementById(valueId);
                const barId = stat + 'Bar';
                const bar = document.getElementById(barId);
                
                if (value && this.originalStats[stat]) {
                    const currentValue = parseFloat(value.textContent);
                    const originalValue = parseFloat(this.originalStats[stat].value);
                    
                    if (Math.abs(currentValue - originalValue) > 0.1) {
                        if (bar) {
                            bar.style.transition = 'width 1.5s ease-in-out';
                            bar.style.width = this.originalStats[stat].barWidth;
                        }
                        this.animateNumber(value, currentValue, originalValue, 1500);
                    }
                }
            }
        });
        
        const currentValueId = statIds[statName];
        const valueElement = document.getElementById(currentValueId);
        const barId = statName + 'Bar';
        const bar = document.getElementById(barId);
        
        if (bar && valueElement) {
            const currentValue = parseFloat(valueElement.textContent) || 0;
            const targetValue = 10.0;
            
            bar.style.transition = 'width 3s ease-in-out';
            bar.style.width = '100%';
            
            this.animateNumber(valueElement, currentValue, targetValue, 3000);
        }
    }

    selectLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        if (typeof updateAllTexts === 'function') updateAllTexts();
        if (typeof updateSelectOptions === 'function') updateSelectOptions();
        if (typeof translatePage === 'function') translatePage(lang);
        
        this.nextStep();
    }

    nextStep() {
        this.animationFrameIds.forEach(frameId => {
            cancelAnimationFrame(frameId);
        });
        this.animationFrameIds = [];
        
        const statIds = {
            'strength': 'strengthValue',
            'stamina': 'staminaValue', 
            'habits': 'habitsValue',
            'addictions': 'addictionsValue',
            'finances': 'financesValue'
        };
        
        Object.entries(statIds).forEach(([stat, valueId]) => {
            const value = document.getElementById(valueId);
            const barId = stat + 'Bar';
            const bar = document.getElementById(barId);
            
            if (value && this.originalStats[stat]) {
                const currentValue = parseFloat(value.textContent);
                const originalValue = parseFloat(this.originalStats[stat].value);
                
                if (Math.abs(currentValue - originalValue) > 0.1) {
                    if (bar) {
                        bar.style.transition = 'width 1.5s ease-in-out';
                        bar.style.width = this.originalStats[stat].barWidth;
                    }
                    this.animateNumber(value, currentValue, originalValue, 1500);
                }
            }
        });
        
        if (this.currentStep < 9) {
            this.currentStep++;
            this.showStep(this.currentStep);
        } else {
            this.finish();
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
        }
    }

    skip() {
        this.animationFrameIds.forEach(frameId => {
            cancelAnimationFrame(frameId);
        });
        this.animationFrameIds = [];
        
        const stats = ['strength', 'stamina', 'habits', 'addictions', 'finances'];
        stats.forEach(stat => {
            const element = document.querySelector(`[data-stat="${stat}"]`);
            if (element) {
                const bar = element.querySelector('.stat-fill');
                const value = element.querySelector('.stat-value');
                if (bar) {
                    bar.style.transition = 'none !important';
                    bar.style.width = this.originalStats[stat]?.barWidth || '0%';
                }
                if (value && this.originalStats[stat]) {
                    value.textContent = this.originalStats[stat].value;
                }
            }
        });
        
        setTimeout(() => {
            this.restoreOriginalStats();
            this.finish();
        }, 50);
    }

    finish() {
        console.log('🏁 Tutorial finishing - speichere Flags SOFORT');
        
        // Speichere ZUERST - bevor irgendwas anderes passiert
        localStorage.setItem('tutorialShown', 'true');
        localStorage.setItem('lifetracker_consent_v1', 'accepted');
        console.log('✅ Beide Flags gespeichert:', {
            tutorialShown: localStorage.getItem('tutorialShown'),
            consent: localStorage.getItem('lifetracker_consent_v1')
        });
        
        const overlay = document.getElementById('tutorialOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            setTimeout(() => overlay.remove(), 300);
        }

        this.animationFrameIds.forEach(frameId => {
            cancelAnimationFrame(frameId);
        });
        this.animationFrameIds = [];
        
        this.restoreOriginalStats();
        this.isRunning = false;
    }

    restoreOriginalStats() {
        const statIds = {
            'strength': 'strengthValue',
            'stamina': 'staminaValue', 
            'habits': 'habitsValue',
            'addictions': 'addictionsValue',
            'finances': 'financesValue'
        };
        
        Object.entries(statIds).forEach(([stat, valueId]) => {
            const value = document.getElementById(valueId);
            const barId = stat + 'Bar';
            const bar = document.getElementById(barId);
            
            if (this.originalStats[stat]) {
                if (bar) {
                    bar.style.cssText = `width: ${this.originalStats[stat].barWidth} !important; transition: none !important;`;
                }
                if (value) {
                    value.textContent = this.originalStats[stat].value;
                }
            } else {
                if (bar) {
                    bar.style.cssText = 'width: 0% !important; transition: none !important;';
                }
                if (value) {
                    value.textContent = '0.0';
                }
            }
        });
    }
}

function createTutorialButton() {
    if (document.getElementById('tutorialHeaderBtn')) return;

    const globeBtn = document.querySelector('[id*="language"], [id*="globe"], [class*="language"]');
    
    if (globeBtn && globeBtn.parentElement) {
        const tutorialBtn = document.createElement('button');
        tutorialBtn.id = 'tutorialHeaderBtn';
        tutorialBtn.className = 'tutorial-header-btn';
        tutorialBtn.innerHTML = '❓';
        tutorialBtn.title = 'Tutorial';

        tutorialBtn.addEventListener('click', () => {
            if (typeof tutorialSystem !== 'undefined') {
                const consentGiven = localStorage.getItem('lifetracker_consent_v1');
                console.log('🔘 Tutorial Button clicked. Consent:', consentGiven);
                // Wenn Consent vorhanden, skip direkt zu Step 2 (Strength)
                tutorialSystem.currentStep = consentGiven ? 2 : 0;
                console.log('➡️ Starting tutorial at step:', tutorialSystem.currentStep);
                tutorialSystem.start();
            }
        });

        globeBtn.parentElement.insertBefore(tutorialBtn, globeBtn);
    }
}

let tutorialSystem = null;

function initTutorial() {
    tutorialSystem = new TutorialSystem();
    createTutorialButton();
}

// Sofort initialisieren, nicht auf DOMContentLoaded warten
console.log('🎓 Initialisiere Tutorial System...');
setTimeout(() => {
    initTutorial();
}, 100);

window.startTutorial = function() {
    if (tutorialSystem) tutorialSystem.start();
};

window.skipTutorial = function() {
    if (tutorialSystem) tutorialSystem.skip();
};

window.resetTutorial = function() {
    localStorage.removeItem('tutorialShown');
    localStorage.removeItem('lifetracker_consent_v1');
    location.reload();
};



console.log('✅ Tutorial System loaded');
/**
 * FoodBooks - 요리 모드 페이지
 */

const CookingModePage = {
    // 현재 상태
    recipe: null,
    currentStep: 0,
    wakeLock: null,
    timer: {
        intervalId: null,
        seconds: 0,
        isRunning: false,
        totalSeconds: 0
    },

    /**
     * 페이지 렌더링
     */
    async render(recipeId) {
        if (!recipeId) {
            return this.renderError('레시피를 찾을 수 없습니다');
        }

        try {
            this.recipe = await db.getRecipe(recipeId);

            if (!this.recipe) {
                return this.renderError('레시피를 찾을 수 없습니다');
            }

            if (!this.recipe.steps || this.recipe.steps.length === 0) {
                return this.renderError('조리 순서가 없는 레시피입니다');
            }

            // 상태 초기화
            this.currentStep = 0;
            this.resetTimer();

            return this.renderCookingMode();
        } catch (error) {
            console.error('Failed to load recipe:', error);
            return this.renderError('레시피를 불러올 수 없습니다');
        }
    },

    /**
     * 요리 모드 렌더링
     */
    renderCookingMode() {
        const steps = this.recipe.steps;
        const step = steps[this.currentStep];
        const stepText = typeof step === 'object' ? (step.text || '') : step;
        const extractedTime = Utils.extractTimeFromText(stepText);

        return `
            <div class="cooking-mode-page">
                <!-- 헤더 -->
                <div class="cooking-header">
                    <button class="cooking-close-btn" id="exitCookingMode" aria-label="요리 모드 종료">
                        <span class="icon">×</span>
                    </button>
                    <h2 class="cooking-title">${Utils.escapeHtml(this.recipe.title)}</h2>
                    <div class="cooking-progress-text">
                        ${this.currentStep + 1} / ${steps.length}
                    </div>
                </div>

                <!-- 진행률 바 -->
                <div class="cooking-progress-bar">
                    <div class="cooking-progress-fill"
                         style="width: ${((this.currentStep + 1) / steps.length) * 100}%">
                    </div>
                </div>

                <!-- 단계 내용 -->
                <div class="cooking-content">
                    <div class="step-number">STEP ${this.currentStep + 1}</div>
                    <div class="step-text">${Utils.escapeHtml(stepText)}</div>

                    ${extractedTime ? `
                        <div class="step-time-hint">
                            <span class="time-icon">⏱️</span>
                            <span>약 ${extractedTime}분 소요</span>
                        </div>
                    ` : ''}
                </div>

                <!-- 타이머 섹션 -->
                <div class="timer-section">
                    <div class="timer-display" id="timerDisplay">
                        ${Utils.formatTimer(this.timer.seconds)}
                    </div>

                    <div class="timer-controls">
                        ${extractedTime ? `
                            <button class="timer-preset-btn" data-minutes="${extractedTime}">
                                ${extractedTime}분 설정
                            </button>
                        ` : ''}

                        <div class="timer-main-controls">
                            <button class="timer-btn" id="timerSubtractBtn" aria-label="30초 감소">
                                <span>-30s</span>
                            </button>
                            <button class="timer-btn timer-btn-primary" id="timerToggleBtn">
                                ${this.timer.isRunning ? '일시정지' : '시작'}
                            </button>
                            <button class="timer-btn" id="timerAddBtn" aria-label="30초 추가">
                                <span>+30s</span>
                            </button>
                        </div>

                        <button class="timer-reset-btn" id="timerResetBtn">
                            타이머 초기화
                        </button>
                    </div>
                </div>

                <!-- 네비게이션 -->
                <div class="cooking-navigation">
                    <button class="nav-btn nav-btn-prev" id="prevStepBtn"
                            ${this.currentStep === 0 ? 'disabled' : ''}>
                        <span class="nav-arrow">‹</span>
                        <span class="nav-text">이전</span>
                    </button>

                    <div class="step-dots">
                        ${steps.map((_, index) => `
                            <span class="step-dot ${index === this.currentStep ? 'active' : ''}
                                         ${index < this.currentStep ? 'completed' : ''}"
                                  data-step="${index}">
                            </span>
                        `).join('')}
                    </div>

                    <button class="nav-btn nav-btn-next" id="nextStepBtn"
                            ${this.currentStep === steps.length - 1 ? 'disabled' : ''}>
                        <span class="nav-text">
                            ${this.currentStep === steps.length - 1 ? '완료' : '다음'}
                        </span>
                        <span class="nav-arrow">›</span>
                    </button>
                </div>

                <!-- 완료 버튼 (마지막 단계) -->
                ${this.currentStep === steps.length - 1 ? `
                    <div class="cooking-complete-section">
                        <button class="btn btn-primary btn-large" id="completeCookingBtn">
                            요리 완료!
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    },

    /**
     * 에러 상태 렌더링
     */
    renderError(message) {
        return `
            <div class="cooking-mode-page">
                <div class="cooking-error">
                    <span class="error-icon">😔</span>
                    <h3>${message}</h3>
                    <button class="btn btn-primary" id="goBackBtn">
                        돌아가기
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * 이벤트 바인딩
     */
    init() {
        // 에러 상태의 돌아가기 버튼
        const goBackBtn = document.getElementById('goBackBtn');
        if (goBackBtn) {
            goBackBtn.addEventListener('click', () => {
                App.navigateTo('recipes');
            });
            return;
        }

        // 화면 꺼짐 방지 활성화
        this.enableWakeLock();

        // 요리 모드 종료
        const exitBtn = document.getElementById('exitCookingMode');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => this.exitCookingMode());
        }

        // 이전/다음 단계
        const prevBtn = document.getElementById('prevStepBtn');
        const nextBtn = document.getElementById('nextStepBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.goToStep(this.currentStep - 1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.goToStep(this.currentStep + 1));
        }

        // 단계 점 클릭
        document.querySelectorAll('.step-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                const step = parseInt(dot.dataset.step);
                this.goToStep(step);
            });
        });

        // 타이머 컨트롤
        this.initTimerControls();

        // 요리 완료 버튼
        const completeBtn = document.getElementById('completeCookingBtn');
        if (completeBtn) {
            completeBtn.addEventListener('click', () => this.completeCooking());
        }

        // 키보드 네비게이션
        this.initKeyboardNavigation();

        // 스와이프 제스처 (터치 기기)
        this.initSwipeGesture();
    },

    /**
     * 타이머 컨트롤 초기화
     */
    initTimerControls() {
        // 타이머 시작/일시정지
        const toggleBtn = document.getElementById('timerToggleBtn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTimer());
        }

        // 타이머 리셋
        const resetBtn = document.getElementById('timerResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetTimer());
        }

        // 30초 추가
        const addBtn = document.getElementById('timerAddBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.adjustTimer(30));
        }

        // 30초 감소
        const subtractBtn = document.getElementById('timerSubtractBtn');
        if (subtractBtn) {
            subtractBtn.addEventListener('click', () => this.adjustTimer(-30));
        }

        // 프리셋 버튼
        document.querySelectorAll('.timer-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const minutes = parseInt(btn.dataset.minutes);
                this.setTimer(minutes * 60);
            });
        });
    },

    /**
     * 키보드 네비게이션 초기화
     */
    initKeyboardNavigation() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    },

    /**
     * 키보드 이벤트 처리
     */
    handleKeyDown(e) {
        if (!this.recipe) return;

        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.goToStep(this.currentStep - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.goToStep(this.currentStep + 1);
                break;
            case ' ':
                e.preventDefault();
                this.toggleTimer();
                break;
            case 'Escape':
                e.preventDefault();
                this.exitCookingMode();
                break;
        }
    },

    /**
     * 스와이프 제스처 초기화
     */
    initSwipeGesture() {
        const content = document.querySelector('.cooking-content');
        if (!content) return;

        let startX = 0;
        let startY = 0;

        content.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        content.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            // 수평 스와이프가 수직보다 클 때만 처리
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // 왼쪽으로 스와이프 -> 다음 단계
                    this.goToStep(this.currentStep + 1);
                } else {
                    // 오른쪽으로 스와이프 -> 이전 단계
                    this.goToStep(this.currentStep - 1);
                }
            }
        }, { passive: true });
    },

    /**
     * 단계 이동
     */
    goToStep(step) {
        if (!this.recipe || !this.recipe.steps) return;

        const totalSteps = this.recipe.steps.length;

        if (step < 0 || step >= totalSteps) return;

        this.currentStep = step;
        this.resetTimer();

        // 페이지 다시 렌더링
        const mainContent = document.getElementById('mainContent');
        if (mainContent) {
            mainContent.innerHTML = this.renderCookingMode();
            this.init();
        }
    },

    /**
     * 타이머 설정
     */
    setTimer(seconds) {
        this.timer.seconds = seconds;
        this.timer.totalSeconds = seconds;
        this.updateTimerDisplay();
    },

    /**
     * 타이머 토글
     */
    toggleTimer() {
        if (this.timer.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    },

    /**
     * 타이머 시작
     */
    startTimer() {
        if (this.timer.seconds <= 0) return;

        this.timer.isRunning = true;
        this.timer.intervalId = setInterval(() => {
            this.timer.seconds--;

            if (this.timer.seconds <= 0) {
                this.timer.seconds = 0;
                this.timerComplete();
            }

            this.updateTimerDisplay();
        }, 1000);

        this.updateToggleButton();
    },

    /**
     * 타이머 일시정지
     */
    pauseTimer() {
        this.timer.isRunning = false;
        if (this.timer.intervalId) {
            clearInterval(this.timer.intervalId);
            this.timer.intervalId = null;
        }
        this.updateToggleButton();
    },

    /**
     * 타이머 리셋
     */
    resetTimer() {
        this.pauseTimer();
        this.timer.seconds = 0;
        this.timer.totalSeconds = 0;
        this.updateTimerDisplay();
    },

    /**
     * 타이머 조정
     */
    adjustTimer(seconds) {
        this.timer.seconds = Math.max(0, this.timer.seconds + seconds);
        if (this.timer.seconds > this.timer.totalSeconds) {
            this.timer.totalSeconds = this.timer.seconds;
        }
        this.updateTimerDisplay();
    },

    /**
     * 타이머 완료
     */
    timerComplete() {
        this.pauseTimer();

        // 알림음 (Web Audio API 사용)
        this.playAlertSound();

        // 진동 (지원 시)
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }

        Utils.showToast('타이머 완료!', 'success');
    },

    /**
     * 알림음 재생
     */
    playAlertSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 880; // A5
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio not supported');
        }
    },

    /**
     * 타이머 디스플레이 업데이트
     */
    updateTimerDisplay() {
        const display = document.getElementById('timerDisplay');
        if (display) {
            display.textContent = Utils.formatTimer(this.timer.seconds);
        }
    },

    /**
     * 토글 버튼 상태 업데이트
     */
    updateToggleButton() {
        const btn = document.getElementById('timerToggleBtn');
        if (btn) {
            btn.textContent = this.timer.isRunning ? '일시정지' : '시작';
        }
    },

    /**
     * 화면 꺼짐 방지 활성화
     */
    async enableWakeLock() {
        if ('wakeLock' in navigator) {
            try {
                this.wakeLock = await navigator.wakeLock.request('screen');

                // 페이지 가시성 변경 시 재활성화
                document.addEventListener('visibilitychange', async () => {
                    if (this.wakeLock !== null && document.visibilityState === 'visible') {
                        try {
                            this.wakeLock = await navigator.wakeLock.request('screen');
                        } catch (err) {
                            console.log('Wake Lock re-request failed:', err);
                        }
                    }
                });

            } catch (err) {
                console.log('Wake Lock not available:', err);
            }
        }
    },

    /**
     * 화면 꺼짐 방지 해제
     */
    async disableWakeLock() {
        if (this.wakeLock) {
            try {
                await this.wakeLock.release();
                this.wakeLock = null;
            } catch (err) {
                console.log('Wake Lock release failed:', err);
            }
        }
    },

    /**
     * 요리 모드 종료
     */
    exitCookingMode() {
        const confirmed = confirm('요리 모드를 종료하시겠습니까?');
        if (!confirmed) return;

        const recipeId = this.recipe?.id;
        this.cleanup();
        if (recipeId) {
            App.navigateTo('recipe-detail', { id: recipeId });
        } else {
            App.navigateTo('recipes');
        }
    },

    /**
     * 요리 완료
     */
    async completeCooking() {
        const recipeId = this.recipe?.id;

        try {
            // 조리 횟수 업데이트
            if (recipeId) {
                await db.updateRecipe(recipeId, {
                    cookCount: (this.recipe.cookCount || 0) + 1,
                    lastCooked: new Date().toISOString()
                });
            }

            Utils.showToast('요리 완료! 맛있게 드세요!', 'success');

        } catch (error) {
            console.error('Failed to update cook count:', error);
        }

        this.cleanup();
        if (recipeId) {
            App.navigateTo('recipe-detail', { id: recipeId });
        } else {
            App.navigateTo('recipes');
        }
    },

    /**
     * 정리 (리소스 해제)
     */
    cleanup() {
        // 타이머 정리
        if (this.timer.intervalId) {
            clearInterval(this.timer.intervalId);
            this.timer.intervalId = null;
        }

        // Wake Lock 해제
        this.disableWakeLock();

        // 키보드 이벤트 제거
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));

        // 상태 초기화
        this.recipe = null;
        this.currentStep = 0;
        this.timer = {
            intervalId: null,
            seconds: 0,
            isRunning: false,
            totalSeconds: 0
        };
    }
};

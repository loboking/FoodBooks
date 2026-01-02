/**
 * FoodBooks - 설정 페이지
 */

const SettingsPage = {
    /**
     * 페이지 렌더링
     */
    render() {
        return `
            <div class="settings-page">
                <div class="page-header">
                    <h2 class="page-title">설정</h2>
                </div>

                <!-- 데이터 관리 섹션 -->
                <section class="settings-section">
                    <h3 class="section-title">데이터 관리</h3>

                    <div class="settings-group">
                        <div class="setting-item" id="seedDataBtn">
                            <div class="setting-info">
                                <span class="setting-icon">📚</span>
                                <div class="setting-text">
                                    <span class="setting-label">샘플 레시피 추가</span>
                                    <span class="setting-desc">21개의 실제 요리 레시피 추가하기</span>
                                </div>
                            </div>
                            <span class="setting-arrow">›</span>
                        </div>

                        <div class="setting-item" id="exportDataBtn">
                            <div class="setting-info">
                                <span class="setting-icon">📤</span>
                                <div class="setting-text">
                                    <span class="setting-label">데이터 백업</span>
                                    <span class="setting-desc">레시피와 쇼핑리스트를 JSON 파일로 내보내기</span>
                                </div>
                            </div>
                            <span class="setting-arrow">›</span>
                        </div>

                        <div class="setting-item" id="importDataBtn">
                            <div class="setting-info">
                                <span class="setting-icon">📥</span>
                                <div class="setting-text">
                                    <span class="setting-label">데이터 복원</span>
                                    <span class="setting-desc">백업 파일에서 데이터 가져오기</span>
                                </div>
                            </div>
                            <span class="setting-arrow">›</span>
                            <input type="file"
                                   id="importFileInput"
                                   accept=".json"
                                   style="display: none;">
                        </div>

                        <div class="setting-item danger" id="clearAllDataBtn">
                            <div class="setting-info">
                                <span class="setting-icon">🗑️</span>
                                <div class="setting-text">
                                    <span class="setting-label">모든 데이터 삭제</span>
                                    <span class="setting-desc">모든 레시피와 데이터를 영구 삭제</span>
                                </div>
                            </div>
                            <span class="setting-arrow">›</span>
                        </div>
                    </div>
                </section>

                <!-- 앱 정보 섹션 -->
                <section class="settings-section">
                    <h3 class="section-title">앱 정보</h3>

                    <div class="settings-group">
                        <div class="setting-item readonly">
                            <div class="setting-info">
                                <span class="setting-icon">📱</span>
                                <div class="setting-text">
                                    <span class="setting-label">앱 이름</span>
                                    <span class="setting-desc">FoodBooks - 나만의 레시피북</span>
                                </div>
                            </div>
                        </div>

                        <div class="setting-item readonly">
                            <div class="setting-info">
                                <span class="setting-icon">🔢</span>
                                <div class="setting-text">
                                    <span class="setting-label">버전</span>
                                    <span class="setting-desc">1.0.0</span>
                                </div>
                            </div>
                        </div>

                        <div class="setting-item readonly">
                            <div class="setting-info">
                                <span class="setting-icon">💾</span>
                                <div class="setting-text">
                                    <span class="setting-label">저장소</span>
                                    <span class="setting-desc">IndexedDB (로컬 저장)</span>
                                </div>
                            </div>
                        </div>

                        <div class="setting-item readonly" id="statsItem">
                            <div class="setting-info">
                                <span class="setting-icon">📊</span>
                                <div class="setting-text">
                                    <span class="setting-label">통계</span>
                                    <span class="setting-desc" id="statsDesc">로딩 중...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 도움말 섹션 -->
                <section class="settings-section">
                    <h3 class="section-title">도움말</h3>

                    <div class="settings-group">
                        <div class="setting-item" id="howToUseBtn">
                            <div class="setting-info">
                                <span class="setting-icon">❓</span>
                                <div class="setting-text">
                                    <span class="setting-label">사용 방법</span>
                                    <span class="setting-desc">앱 사용법 안내</span>
                                </div>
                            </div>
                            <span class="setting-arrow">›</span>
                        </div>
                    </div>
                </section>

                <!-- 저작권 정보 -->
                <footer class="settings-footer">
                    <p class="copyright">Made with love for home cooks</p>
                    <p class="copyright">FoodBooks &copy; 2025</p>
                </footer>
            </div>
        `;
    },

    /**
     * 이벤트 바인딩
     */
    init() {
        // 통계 로드
        this.loadStats();

        // 샘플 레시피 추가
        const seedBtn = document.getElementById('seedDataBtn');
        if (seedBtn) {
            seedBtn.addEventListener('click', () => this.handleSeedData());
        }

        // 데이터 백업
        const exportBtn = document.getElementById('exportDataBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.handleExport());
        }

        // 데이터 복원
        const importBtn = document.getElementById('importDataBtn');
        const importFileInput = document.getElementById('importFileInput');
        if (importBtn && importFileInput) {
            importBtn.addEventListener('click', () => importFileInput.click());
            importFileInput.addEventListener('change', (e) => this.handleImport(e));
        }

        // 모든 데이터 삭제
        const clearBtn = document.getElementById('clearAllDataBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.handleClearAll());
        }

        // 사용 방법
        const howToUseBtn = document.getElementById('howToUseBtn');
        if (howToUseBtn) {
            howToUseBtn.addEventListener('click', () => this.showHowToUse());
        }
    },

    /**
     * 샘플 레시피 추가
     */
    async handleSeedData() {
        const confirmed = confirm('21개의 샘플 레시피를 추가하시겠습니까?');
        if (!confirmed) return;

        try {
            await SeedData.seed();
            setTimeout(() => {
                App.navigateTo('recipes');
            }, 1000);
        } catch (error) {
            console.error('Failed to seed data:', error);
            Utils.showToast('레시피 추가에 실패했습니다', 'error');
        }
    },

    /**
     * 통계 로드
     */
    async loadStats() {
        try {
            const recipes = await db.getAllRecipes();
            const shoppingList = await db.getShoppingList();
            const favorites = recipes.filter(r => r.isFavorite).length;

            const statsDesc = document.getElementById('statsDesc');
            if (statsDesc) {
                statsDesc.textContent = `레시피 ${recipes.length}개, 즐겨찾기 ${favorites}개, 장보기 ${shoppingList.length}개`;
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
            const statsDesc = document.getElementById('statsDesc');
            if (statsDesc) {
                statsDesc.textContent = '통계를 불러올 수 없습니다';
            }
        }
    },

    /**
     * 데이터 내보내기
     */
    async handleExport() {
        try {
            const data = await db.exportData();
            const filename = `foodbooks_backup_${new Date().toISOString().split('T')[0]}.json`;
            Utils.downloadJson(data, filename);
            Utils.showToast('백업 파일이 다운로드되었습니다', 'success');
        } catch (error) {
            console.error('Failed to export data:', error);
            Utils.showToast('백업에 실패했습니다', 'error');
        }
    },

    /**
     * 데이터 가져오기
     */
    async handleImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        // 파일 유형 확인
        if (!file.name.endsWith('.json')) {
            Utils.showToast('JSON 파일만 가져올 수 있습니다', 'error');
            return;
        }

        const confirmed = confirm(
            '기존 데이터가 모두 삭제되고 백업 파일의 데이터로 대체됩니다.\n계속하시겠습니까?'
        );
        if (!confirmed) {
            event.target.value = '';
            return;
        }

        try {
            const content = await Utils.readFile(file);
            const data = JSON.parse(content);

            // 데이터 유효성 검사
            if (!this.validateBackupData(data)) {
                Utils.showToast('유효하지 않은 백업 파일입니다', 'error');
                return;
            }

            await db.importData(data);
            Utils.showToast('데이터가 복원되었습니다', 'success');

            // 페이지 새로고침
            setTimeout(() => {
                App.navigateTo('settings');
            }, 1000);

        } catch (error) {
            console.error('Failed to import data:', error);
            Utils.showToast('데이터 복원에 실패했습니다', 'error');
        } finally {
            event.target.value = '';
        }
    },

    /**
     * 백업 데이터 유효성 검사
     */
    validateBackupData(data) {
        if (!data || typeof data !== 'object') {
            return false;
        }

        // 필수 필드 확인
        if (!Array.isArray(data.recipes)) {
            return false;
        }

        // 레시피 구조 검사 (샘플)
        if (data.recipes.length > 0) {
            const sample = data.recipes[0];
            if (!sample.id || !sample.title) {
                return false;
            }
        }

        return true;
    },

    /**
     * 모든 데이터 삭제
     */
    async handleClearAll() {
        const firstConfirm = confirm(
            '정말로 모든 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.'
        );
        if (!firstConfirm) return;

        const secondConfirm = confirm(
            '마지막 확인입니다.\n모든 레시피와 데이터가 영구적으로 삭제됩니다.\n정말 삭제하시겠습니까?'
        );
        if (!secondConfirm) return;

        try {
            await db.clearAllData();
            Utils.showToast('모든 데이터가 삭제되었습니다', 'success');

            // 홈으로 이동
            setTimeout(() => {
                App.navigateTo('home');
            }, 1000);

        } catch (error) {
            console.error('Failed to clear all data:', error);
            Utils.showToast('데이터 삭제에 실패했습니다', 'error');
        }
    },

    /**
     * 사용 방법 표시
     */
    showHowToUse() {
        const modal = document.getElementById('modalContainer');
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal how-to-use-modal">
                    <div class="modal-header">
                        <h3>사용 방법</h3>
                        <button class="modal-close" id="closeHowToUseModal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="help-section">
                            <h4>레시피 추가하기</h4>
                            <p>하단의 "작성" 탭을 눌러 새 레시피를 추가하세요. 제목, 재료, 조리 순서를 입력할 수 있습니다.</p>
                        </div>

                        <div class="help-section">
                            <h4>레시피 검색하기</h4>
                            <p>헤더의 검색 버튼을 눌러 레시피를 검색하세요. 제목, 재료, 태그로 검색할 수 있습니다.</p>
                        </div>

                        <div class="help-section">
                            <h4>장보기 목록</h4>
                            <p>레시피 상세 페이지에서 "장보기 목록에 추가"를 누르면 재료가 자동으로 추가됩니다. 여러 레시피의 재료가 통합되어 표시됩니다.</p>
                        </div>

                        <div class="help-section">
                            <h4>요리 모드</h4>
                            <p>레시피 상세 페이지에서 "요리 시작"을 누르면 단계별로 큰 글씨로 표시됩니다. 화면이 자동으로 꺼지지 않습니다.</p>
                        </div>

                        <div class="help-section">
                            <h4>데이터 백업</h4>
                            <p>설정에서 데이터를 JSON 파일로 백업하고 복원할 수 있습니다. 기기를 바꿀 때 유용합니다.</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary" id="closeHelpBtn">확인</button>
                    </div>
                </div>
            </div>
        `;
        modal.classList.remove('hidden');

        // 닫기 버튼 이벤트
        document.getElementById('closeHowToUseModal').addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.innerHTML = '';
        });

        document.getElementById('closeHelpBtn').addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.innerHTML = '';
        });

        // 오버레이 클릭으로 닫기
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                modal.classList.add('hidden');
                modal.innerHTML = '';
            }
        });
    }
};

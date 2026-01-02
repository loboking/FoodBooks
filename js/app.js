/**
 * FoodBooks - 메인 애플리케이션
 */

const App = {
    currentPage: 'home',
    currentParams: {},
    history: [],

    /**
     * 앱 초기화
     */
    async init() {
        try {
            // 데이터베이스 초기화
            await db.init();
            console.log('FoodBooks DB initialized');

            // 레시피가 없으면 샘플 데이터 자동 추가
            const recipes = await db.getAllRecipes();
            if (recipes.length === 0 && typeof SeedData !== 'undefined') {
                console.log('No recipes found. Adding sample recipes...');
                await SeedData.seed();
            }

            // 네비게이션 이벤트 바인딩
            this.bindNavigation();

            // 초기 페이지 로드
            this.navigateTo('home');

            console.log('FoodBooks App initialized');
        } catch (error) {
            console.error('App initialization failed:', error);
            Utils.showToast('앱 초기화 실패', 'error');
        }
    },

    /**
     * 네비게이션 이벤트 바인딩
     */
    bindNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.navigateTo(page);
            });
        });
    },

    /**
     * 페이지 이동
     */
    async navigateTo(page, params = {}) {
        // 히스토리에 현재 페이지 저장
        if (this.currentPage !== page || JSON.stringify(this.currentParams) !== JSON.stringify(params)) {
            this.history.push({ page: this.currentPage, params: this.currentParams });
        }

        this.currentPage = page;
        this.currentParams = params;

        // 네비게이션 활성화 상태 업데이트
        this.updateNavigation(page);

        // 헤더 업데이트
        this.updateHeader(page, params);

        // 페이지 렌더링
        await this.renderPage(page, params);
    },

    /**
     * 뒤로 가기
     */
    async goBack() {
        if (this.history.length > 0) {
            const prev = this.history.pop();
            this.currentPage = prev.page;
            this.currentParams = prev.params;
            this.updateNavigation(prev.page);
            this.updateHeader(prev.page, prev.params);
            await this.renderPage(prev.page, prev.params);
        } else {
            this.navigateTo('home');
        }
    },

    /**
     * 네비게이션 활성화 상태 업데이트
     */
    updateNavigation(page) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const itemPage = item.dataset.page;
            // 일부 페이지는 특정 네비게이션 아이템과 연결
            const isActive = itemPage === page ||
                (itemPage === 'recipes' && ['recipe-detail', 'cooking-mode'].includes(page)) ||
                (itemPage === 'create' && page === 'recipe-form');
            item.classList.toggle('active', isActive);
        });
    },

    /**
     * 헤더 업데이트
     */
    updateHeader(page, params) {
        const header = document.querySelector('.header');
        const logo = header.querySelector('.logo');
        const actions = header.querySelector('.header-actions');

        // 기본 상태로 리셋
        logo.textContent = 'FoodBooks';
        logo.style.cursor = 'default';
        logo.onclick = null;

        // 페이지별 헤더 설정
        const pageConfigs = {
            'home': {
                title: 'FoodBooks',
                showSearch: true
            },
            'recipes': {
                title: '레시피',
                showSearch: true
            },
            'create': {
                title: '새 레시피',
                showBack: true
            },
            'recipe-detail': {
                title: '레시피',
                showBack: true
            },
            'recipe-form': {
                title: params.id ? '레시피 수정' : '새 레시피',
                showBack: true
            },
            'shopping': {
                title: '쇼핑리스트',
                showSearch: false
            },
            'settings': {
                title: '설정',
                showSearch: false
            },
            'cooking-mode': {
                title: '',
                hide: true
            }
        };

        const config = pageConfigs[page] || { title: 'FoodBooks', showSearch: true };

        if (config.hide) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
            logo.textContent = config.title;

            if (config.showBack) {
                logo.innerHTML = `<span style="cursor: pointer;">←</span>`;
                logo.style.cursor = 'pointer';
                logo.onclick = () => this.goBack();
            }

        }
    },

    /**
     * 페이지 렌더링
     */
    async renderPage(page, params) {
        const mainContent = document.getElementById('mainContent');

        // 로딩 표시
        mainContent.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        try {
            let html = '';
            let pageModule = null;

            switch (page) {
                case 'home':
                    pageModule = HomePage;
                    html = await HomePage.render();
                    break;
                case 'recipes':
                    pageModule = RecipesPage;
                    html = await RecipesPage.render(params);
                    break;
                case 'create':
                    pageModule = RecipeFormPage;
                    html = await RecipeFormPage.render();
                    break;
                case 'recipe-detail':
                    pageModule = RecipeDetailPage;
                    html = await RecipeDetailPage.render(params.id);
                    break;
                case 'recipe-form':
                    pageModule = RecipeFormPage;
                    html = await RecipeFormPage.render(params.id);
                    break;
                case 'shopping':
                    pageModule = ShoppingPage;
                    html = await ShoppingPage.render();
                    break;
                case 'settings':
                    pageModule = SettingsPage;
                    html = await SettingsPage.render();
                    break;
                case 'cooking-mode':
                    pageModule = CookingModePage;
                    html = await CookingModePage.render(params.id);
                    break;
                default:
                    html = '<div class="empty-state"><p>페이지를 찾을 수 없습니다.</p></div>';
            }

            mainContent.innerHTML = html;

            // 페이지 초기화 (이벤트 바인딩 등)
            if (pageModule && typeof pageModule.init === 'function') {
                await pageModule.init(params);
            }

            // 레시피 상세 조회 시 최근 본 레시피에 추가
            if (page === 'recipe-detail' && params.id) {
                this.addToRecentRecipes(params.id);
            }

        } catch (error) {
            console.error('Page render error:', error);
            mainContent.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">❌</div>
                    <div class="empty-state-title">오류 발생</div>
                    <div class="empty-state-text">${error.message}</div>
                    <button class="btn btn-primary" onclick="App.navigateTo('home')">홈으로</button>
                </div>
            `;
        }
    },

    /**
     * 최근 본 레시피에 추가
     */
    async addToRecentRecipes(recipeId) {
        try {
            const recipe = await db.getRecipe(recipeId);
            if (!recipe) return;

            let recent = JSON.parse(localStorage.getItem('recentRecipes') || '[]');

            // 이미 있으면 제거
            recent = recent.filter(r => r.id !== recipeId);

            // 맨 앞에 추가 (필요한 정보만 저장)
            recent.unshift({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                prepTime: recipe.prepTime,
                cookTime: recipe.cookTime,
                difficulty: recipe.difficulty,
                isFavorite: recipe.isFavorite
            });

            // 최대 10개 유지
            recent = recent.slice(0, 10);

            localStorage.setItem('recentRecipes', JSON.stringify(recent));
        } catch (error) {
            console.error('Failed to save recent recipes:', error);
        }
    },

    /**
     * 최근 본 레시피 가져오기
     */
    getRecentRecipes() {
        try {
            return JSON.parse(localStorage.getItem('recentRecipes') || '[]');
        } catch {
            return [];
        }
    },

    /**
     * 모달 열기
     */
    showModal(content) {
        const container = document.getElementById('modalContainer');
        container.innerHTML = content;
        container.classList.remove('hidden');

        // 배경 클릭 시 닫기
        container.addEventListener('click', (e) => {
            if (e.target === container) {
                this.hideModal();
            }
        });

        // ESC 키로 닫기
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    },

    /**
     * 모달 닫기
     */
    hideModal() {
        const container = document.getElementById('modalContainer');
        container.classList.add('hidden');
        container.innerHTML = '';
    },

    /**
     * 확인 다이얼로그
     */
    async confirm(title, message) {
        return new Promise((resolve) => {
            const html = `
                <div class="modal">
                    <div class="modal-header">
                        <h3 class="modal-title">${title}</h3>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="modalCancel">취소</button>
                        <button class="btn btn-danger" id="modalConfirm">확인</button>
                    </div>
                </div>
            `;

            this.showModal(html);

            document.getElementById('modalCancel').onclick = () => {
                this.hideModal();
                resolve(false);
            };

            document.getElementById('modalConfirm').onclick = () => {
                this.hideModal();
                resolve(true);
            };
        });
    },

    /**
     * 하단 네비게이션 표시/숨김
     */
    toggleBottomNav(show) {
        const nav = document.querySelector('.bottom-nav');
        if (nav) {
            nav.classList.toggle('hidden', !show);
        }
    }
};

// 앱 시작
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

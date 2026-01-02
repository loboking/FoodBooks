/**
 * FoodBooks - 홈 페이지
 */

const HomePage = {
    /**
     * 홈 화면 HTML 렌더링
     */
    async render() {
        const recentRecipes = this.getRecentRecipes();
        const favoriteRecipes = await db.getFavoriteRecipes();
        const categories = Utils.getDefaultCategories();

        return `
            <div class="home-page">
                <!-- 환영 섹션 -->
                <section class="welcome-section">
                    <h2 class="welcome-title">안녕하세요!</h2>
                    <p class="welcome-subtitle">오늘은 무엇을 만들어볼까요?</p>
                </section>

                <!-- 빠른 검색 -->
                <section class="quick-search-section">
                    <div class="search-box" id="homeSearchBox">
                        <span class="search-icon">🔍</span>
                        <input type="text"
                               id="homeSearchInput"
                               class="search-input"
                               placeholder="레시피 검색..."
                               readonly>
                    </div>
                </section>

                <!-- 카테고리 빠른 링크 -->
                <section class="category-section">
                    <h3 class="section-title">카테고리</h3>
                    <div class="category-grid">
                        ${categories.map(cat => `
                            <button class="category-card" data-category="${cat.id}">
                                <span class="category-icon">${cat.icon}</span>
                                <span class="category-name">${cat.name}</span>
                            </button>
                        `).join('')}
                    </div>
                </section>

                <!-- 즐겨찾기 레시피 -->
                ${favoriteRecipes.length > 0 ? `
                    <section class="favorites-section">
                        <div class="section-header">
                            <h3 class="section-title">즐겨찾기</h3>
                            <button class="view-all-btn" data-action="viewAllFavorites">
                                전체보기
                            </button>
                        </div>
                        <div class="recipe-scroll-container">
                            <div class="recipe-scroll">
                                ${favoriteRecipes.slice(0, 10).map(recipe => this.renderRecipeCard(recipe)).join('')}
                            </div>
                        </div>
                    </section>
                ` : ''}

                <!-- 최근 본 레시피 -->
                ${recentRecipes.length > 0 ? `
                    <section class="recent-section">
                        <div class="section-header">
                            <h3 class="section-title">최근 본 레시피</h3>
                            <button class="clear-btn" data-action="clearRecent">
                                지우기
                            </button>
                        </div>
                        <div class="recipe-scroll-container">
                            <div class="recipe-scroll">
                                ${recentRecipes.map(recipe => this.renderRecipeCard(recipe)).join('')}
                            </div>
                        </div>
                    </section>
                ` : ''}

                <!-- 빠른 시작 (레시피가 없을 때) -->
                ${favoriteRecipes.length === 0 && recentRecipes.length === 0 ? `
                    <section class="empty-section">
                        <div class="empty-content">
                            <span class="empty-icon">📖</span>
                            <h3 class="empty-title">레시피를 추가해보세요!</h3>
                            <p class="empty-description">
                                나만의 레시피를 작성하고 관리해보세요.
                            </p>
                            <button class="primary-btn" id="startCreateBtn">
                                첫 레시피 작성하기
                            </button>
                        </div>
                    </section>
                ` : ''}

                <!-- 빠른 액션 버튼 -->
                <section class="quick-actions-section">
                    <h3 class="section-title">빠른 메뉴</h3>
                    <div class="quick-actions-grid">
                        <button class="quick-action-card" data-action="createRecipe">
                            <span class="action-icon">✏️</span>
                            <span class="action-label">레시피 작성</span>
                        </button>
                        <button class="quick-action-card" data-action="viewShopping">
                            <span class="action-icon">🛒</span>
                            <span class="action-label">장보기 목록</span>
                        </button>
                        <button class="quick-action-card" data-action="randomRecipe">
                            <span class="action-icon">🎲</span>
                            <span class="action-label">랜덤 레시피</span>
                        </button>
                        <button class="quick-action-card" data-action="viewAll">
                            <span class="action-icon">📚</span>
                            <span class="action-label">전체 레시피</span>
                        </button>
                    </div>
                </section>
            </div>
        `;
    },

    /**
     * 레시피 카드 렌더링
     */
    renderRecipeCard(recipe) {
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const timeDisplay = Utils.formatTime(totalTime);

        return `
            <div class="recipe-card-small" data-recipe-id="${recipe.id}">
                <div class="recipe-card-image">
                    ${recipe.image
                        ? `<img src="${recipe.image}" alt="${Utils.escapeHtml(recipe.title)}">`
                        : `<div class="recipe-placeholder">🍳</div>`
                    }
                    ${recipe.isFavorite ? '<span class="favorite-badge">❤️</span>' : ''}
                </div>
                <div class="recipe-card-info">
                    <h4 class="recipe-card-title">${Utils.escapeHtml(recipe.title)}</h4>
                    <div class="recipe-card-meta">
                        ${timeDisplay !== '-' ? `<span class="meta-item">⏱️ ${timeDisplay}</span>` : ''}
                        ${recipe.difficulty ? `<span class="meta-item">${this.getDifficultyIcon(recipe.difficulty)}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * 난이도 아이콘 반환
     */
    getDifficultyIcon(difficulty) {
        const icons = {
            easy: '🟢',
            medium: '🟡',
            hard: '🔴'
        };
        return icons[difficulty] || '';
    },

    /**
     * localStorage에서 최근 본 레시피 가져오기
     */
    getRecentRecipes() {
        try {
            const recent = localStorage.getItem('recentRecipes');
            return recent ? JSON.parse(recent) : [];
        } catch (e) {
            console.error('최근 본 레시피 로드 실패:', e);
            return [];
        }
    },

    /**
     * 최근 본 레시피에 추가
     */
    addToRecentRecipes(recipe) {
        try {
            let recent = this.getRecentRecipes();

            // 이미 있으면 제거
            recent = recent.filter(r => r.id !== recipe.id);

            // 맨 앞에 추가
            recent.unshift({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
                prepTime: recipe.prepTime,
                cookTime: recipe.cookTime,
                difficulty: recipe.difficulty,
                isFavorite: recipe.isFavorite
            });

            // 최대 20개 유지
            recent = recent.slice(0, 20);

            localStorage.setItem('recentRecipes', JSON.stringify(recent));
        } catch (e) {
            console.error('최근 본 레시피 저장 실패:', e);
        }
    },

    /**
     * 최근 본 레시피 목록 지우기
     */
    clearRecentRecipes() {
        localStorage.removeItem('recentRecipes');
        Utils.showToast('최근 본 레시피가 삭제되었습니다.', 'success');
    },

    /**
     * 이벤트 바인딩
     */
    init() {
        // 검색 박스 클릭 - 레시피 페이지로 이동하면서 검색 모드 활성화
        const searchBox = document.getElementById('homeSearchBox');
        if (searchBox) {
            searchBox.addEventListener('click', () => {
                App.navigateTo('recipes', { focusSearch: true });
            });
        }

        // 카테고리 클릭
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                App.navigateTo('recipes', { category });
            });
        });

        // 레시피 카드 클릭
        document.querySelectorAll('.recipe-card-small').forEach(card => {
            card.addEventListener('click', (e) => {
                const recipeId = e.currentTarget.dataset.recipeId;
                App.navigateTo('recipe-detail', { id: recipeId });
            });
        });

        // 빠른 액션 버튼
        document.querySelectorAll('.quick-action-card').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleQuickAction(action);
            });
        });

        // 전체보기 버튼 (즐겨찾기)
        const viewAllFavoritesBtn = document.querySelector('[data-action="viewAllFavorites"]');
        if (viewAllFavoritesBtn) {
            viewAllFavoritesBtn.addEventListener('click', () => {
                App.navigateTo('recipes', { filter: 'favorites' });
            });
        }

        // 최근 본 레시피 지우기
        const clearRecentBtn = document.querySelector('[data-action="clearRecent"]');
        if (clearRecentBtn) {
            clearRecentBtn.addEventListener('click', () => {
                this.clearRecentRecipes();
                App.navigateTo('home'); // 페이지 새로고침
            });
        }

        // 첫 레시피 작성 버튼
        const startCreateBtn = document.getElementById('startCreateBtn');
        if (startCreateBtn) {
            startCreateBtn.addEventListener('click', () => {
                App.navigateTo('create');
            });
        }
    },

    /**
     * 빠른 액션 처리
     */
    async handleQuickAction(action) {
        switch (action) {
            case 'createRecipe':
                App.navigateTo('create');
                break;
            case 'viewShopping':
                App.navigateTo('shopping');
                break;
            case 'randomRecipe':
                await this.showRandomRecipe();
                break;
            case 'viewAll':
                App.navigateTo('recipes');
                break;
        }
    },

    /**
     * 랜덤 레시피 보기
     */
    async showRandomRecipe() {
        try {
            const recipes = await db.getAllRecipes();
            if (recipes.length === 0) {
                Utils.showToast('레시피가 없습니다. 먼저 레시피를 추가해주세요.', 'warning');
                return;
            }

            const randomIndex = Math.floor(Math.random() * recipes.length);
            const randomRecipe = recipes[randomIndex];

            App.navigateTo('recipe-detail', { id: randomRecipe.id });
        } catch (e) {
            console.error('랜덤 레시피 로드 실패:', e);
            Utils.showToast('랜덤 레시피를 불러오는데 실패했습니다.', 'error');
        }
    }
};

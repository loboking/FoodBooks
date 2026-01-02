/**
 * FoodBooks - 레시피 목록 페이지
 */

const RecipesPage = {
    // 현재 필터 상태
    currentFilters: {
        query: '',
        category: null,
        subcategory: null,
        tags: [],
        difficulty: null,
        sortBy: 'newest'
    },

    // 페이지 파라미터
    params: {},

    /**
     * 레시피 목록 화면 HTML 렌더링
     */
    async render(params = {}) {
        this.params = params;

        // 필터 초기화 후 파라미터 적용
        this.currentFilters = {
            query: '',
            category: params.category || null,
            subcategory: params.subcategory || null,
            tags: [],
            difficulty: null,
            favoritesOnly: params.filter === 'favorites',
            sortBy: 'newest'
        };

        const categories = Utils.getDefaultCategories();
        const tags = Utils.getDefaultTags();
        const recipes = await this.getFilteredRecipes();

        return `
            <div class="recipes-page">
                <!-- 검색 바 -->
                <section class="search-section">
                    <div class="search-bar">
                        <input type="text"
                               id="recipeSearchInput"
                               class="search-input"
                               placeholder="레시피, 재료 검색..."
                               value="${Utils.escapeHtml(this.currentFilters.query)}">
                        <button id="searchBtn" class="search-btn">검색</button>
                    </div>
                </section>

                <!-- 필터 섹션 -->
                <section class="filter-section">
                    <!-- 카테고리 필터 -->
                    <div class="filter-scroll">
                        <button class="filter-chip ${!this.currentFilters.category ? 'active' : ''}"
                                data-filter-type="category"
                                data-value="">
                            전체
                        </button>
                        ${categories.map(cat => `
                            <button class="filter-chip ${this.currentFilters.category === cat.id ? 'active' : ''}"
                                    data-filter-type="category"
                                    data-value="${cat.id}">
                                ${cat.icon} ${cat.name}
                            </button>
                        `).join('')}
                    </div>

                    <!-- 서브카테고리 필터 (카테고리 선택 시 표시) -->
                    <div id="subcategoryFilter" class="filter-scroll subcategory-filter ${this.currentFilters.category ? '' : 'hidden'}">
                        ${this.renderSubcategoryChips()}
                    </div>

                    <!-- 추가 필터 토글 -->
                    <div class="filter-actions">
                        <button id="moreFiltersBtn" class="filter-toggle-btn">
                            <span>필터</span>
                            <span class="filter-count ${this.getActiveFilterCount() > 0 ? '' : 'hidden'}">
                                ${this.getActiveFilterCount()}
                            </span>
                            <span class="toggle-icon">▼</span>
                        </button>
                        <button id="sortBtn" class="sort-btn">
                            <span>정렬: ${this.getSortLabel()}</span>
                        </button>
                    </div>

                    <!-- 확장 필터 패널 -->
                    <div id="filterPanel" class="filter-panel hidden">
                        <!-- 난이도 필터 -->
                        <div class="filter-group">
                            <h4 class="filter-group-title">난이도</h4>
                            <div class="filter-options">
                                <button class="filter-option ${!this.currentFilters.difficulty ? 'active' : ''}"
                                        data-filter-type="difficulty" data-value="">
                                    전체
                                </button>
                                <button class="filter-option ${this.currentFilters.difficulty === 'easy' ? 'active' : ''}"
                                        data-filter-type="difficulty" data-value="easy">
                                    🟢 쉬움
                                </button>
                                <button class="filter-option ${this.currentFilters.difficulty === 'medium' ? 'active' : ''}"
                                        data-filter-type="difficulty" data-value="medium">
                                    🟡 보통
                                </button>
                                <button class="filter-option ${this.currentFilters.difficulty === 'hard' ? 'active' : ''}"
                                        data-filter-type="difficulty" data-value="hard">
                                    🔴 어려움
                                </button>
                            </div>
                        </div>

                        <!-- 태그 필터 -->
                        <div class="filter-group">
                            <h4 class="filter-group-title">태그</h4>
                            <div class="filter-tags">
                                ${tags.map(tag => `
                                    <button class="tag-chip ${this.currentFilters.tags.includes(tag) ? 'active' : ''}"
                                            data-filter-type="tag" data-value="${tag}">
                                        #${tag}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <!-- 즐겨찾기 필터 -->
                        <div class="filter-group">
                            <label class="filter-checkbox">
                                <input type="checkbox"
                                       id="favoritesOnlyCheckbox"
                                       ${this.currentFilters.favoritesOnly ? 'checked' : ''}>
                                <span>❤️ 즐겨찾기만 보기</span>
                            </label>
                        </div>

                        <!-- 필터 초기화 -->
                        <button id="resetFiltersBtn" class="reset-filters-btn">
                            필터 초기화
                        </button>
                    </div>
                </section>

                <!-- 정렬 메뉴 (드롭다운) -->
                <div id="sortMenu" class="sort-menu hidden">
                    <button class="sort-option ${this.currentFilters.sortBy === 'newest' ? 'active' : ''}" data-sort="newest">
                        최신순
                    </button>
                    <button class="sort-option ${this.currentFilters.sortBy === 'oldest' ? 'active' : ''}" data-sort="oldest">
                        오래된순
                    </button>
                    <button class="sort-option ${this.currentFilters.sortBy === 'name' ? 'active' : ''}" data-sort="name">
                        이름순
                    </button>
                    <button class="sort-option ${this.currentFilters.sortBy === 'rating' ? 'active' : ''}" data-sort="rating">
                        평점순
                    </button>
                    <button class="sort-option ${this.currentFilters.sortBy === 'cookCount' ? 'active' : ''}" data-sort="cookCount">
                        요리 횟수순
                    </button>
                </div>

                <!-- 레시피 목록 -->
                <section class="recipes-list-section">
                    <div class="recipes-header">
                        <span class="recipes-count">${recipes.length}개의 레시피</span>
                    </div>

                    ${recipes.length > 0 ? `
                        <div class="recipe-grid" id="recipeGrid">
                            ${recipes.map(recipe => this.renderRecipeCard(recipe)).join('')}
                        </div>
                    ` : `
                        <div class="empty-recipes">
                            <span class="empty-icon">🍽️</span>
                            <h3 class="empty-title">레시피가 없습니다</h3>
                            <p class="empty-description">
                                ${this.currentFilters.query
                                    ? '검색 조건에 맞는 레시피가 없습니다.'
                                    : '첫 번째 레시피를 추가해보세요!'}
                            </p>
                            ${!this.currentFilters.query ? `
                                <button class="primary-btn" id="addFirstRecipeBtn">
                                    레시피 추가하기
                                </button>
                            ` : ''}
                        </div>
                    `}
                </section>

                <!-- 플로팅 추가 버튼 -->
                <button id="floatingAddBtn" class="floating-add-btn" aria-label="레시피 추가">
                    ＋
                </button>
            </div>
        `;
    },

    /**
     * 레시피 카드 렌더링
     */
    renderRecipeCard(recipe) {
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const timeDisplay = Utils.formatTime(totalTime);
        const category = Utils.getDefaultCategories().find(c => c.id === recipe.category);

        return `
            <div class="recipe-card" data-recipe-id="${recipe.id}">
                <div class="recipe-card-image">
                    ${recipe.image
                        ? `<img src="${recipe.image}" alt="${Utils.escapeHtml(recipe.title)}" loading="lazy">`
                        : `<div class="recipe-placeholder-large">🍳</div>`
                    }
                    <button class="favorite-btn ${recipe.isFavorite ? 'active' : ''}"
                            data-recipe-id="${recipe.id}"
                            data-action="toggleFavorite">
                        ${recipe.isFavorite ? '❤️' : '🤍'}
                    </button>
                    ${category ? `<span class="category-badge">${category.icon}</span>` : ''}
                </div>
                <div class="recipe-card-content">
                    <h3 class="recipe-title">${Utils.escapeHtml(recipe.title)}</h3>
                    ${recipe.description ? `
                        <p class="recipe-description">${Utils.escapeHtml(recipe.description.substring(0, 50))}${recipe.description.length > 50 ? '...' : ''}</p>
                    ` : ''}
                    <div class="recipe-meta">
                        ${timeDisplay !== '-' ? `
                            <span class="meta-item">
                                <span class="meta-icon">⏱️</span>
                                <span>${timeDisplay}</span>
                            </span>
                        ` : ''}
                        ${recipe.difficulty ? `
                            <span class="meta-item">
                                <span class="meta-icon">${this.getDifficultyIcon(recipe.difficulty)}</span>
                                <span>${Utils.getDifficultyLabel(recipe.difficulty)}</span>
                            </span>
                        ` : ''}
                        ${recipe.servings ? `
                            <span class="meta-item">
                                <span class="meta-icon">👥</span>
                                <span>${recipe.servings}인분</span>
                            </span>
                        ` : ''}
                    </div>
                    ${recipe.tags && recipe.tags.length > 0 ? `
                        <div class="recipe-tags">
                            ${recipe.tags.slice(0, 3).map(tag => `
                                <span class="recipe-tag">#${Utils.escapeHtml(tag)}</span>
                            `).join('')}
                            ${recipe.tags.length > 3 ? `<span class="recipe-tag-more">+${recipe.tags.length - 3}</span>` : ''}
                        </div>
                    ` : ''}
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
     * 서브카테고리 칩 렌더링
     */
    renderSubcategoryChips() {
        if (!this.currentFilters.category) return '';

        const subcategories = Utils.getSubcategories(this.currentFilters.category);
        if (subcategories.length === 0) return '';

        return `
            <button class="filter-chip subcategory-chip ${!this.currentFilters.subcategory ? 'active' : ''}"
                    data-filter-type="subcategory"
                    data-value="">
                전체
            </button>
            ${subcategories.map(sub => `
                <button class="filter-chip subcategory-chip ${this.currentFilters.subcategory === sub.id ? 'active' : ''}"
                        data-filter-type="subcategory"
                        data-value="${sub.id}">
                    ${sub.icon} ${sub.name}
                </button>
            `).join('')}
        `;
    },

    /**
     * 정렬 라벨 반환
     */
    getSortLabel() {
        const labels = {
            newest: '최신순',
            oldest: '오래된순',
            name: '이름순',
            rating: '평점순',
            cookCount: '요리 횟수순'
        };
        return labels[this.currentFilters.sortBy] || '최신순';
    },

    /**
     * 활성 필터 개수 반환
     */
    getActiveFilterCount() {
        let count = 0;
        if (this.currentFilters.difficulty) count++;
        if (this.currentFilters.tags.length > 0) count += this.currentFilters.tags.length;
        if (this.currentFilters.favoritesOnly) count++;
        return count;
    },

    /**
     * 필터된 레시피 목록 가져오기
     */
    async getFilteredRecipes() {
        try {
            let recipes;

            if (this.currentFilters.favoritesOnly) {
                recipes = await db.getFavoriteRecipes();
            } else if (this.currentFilters.query || this.currentFilters.category ||
                       this.currentFilters.tags.length > 0 || this.currentFilters.difficulty) {
                recipes = await db.searchRecipes(this.currentFilters.query, {
                    category: this.currentFilters.category,
                    tags: this.currentFilters.tags,
                    difficulty: this.currentFilters.difficulty
                });
            } else {
                recipes = await db.getAllRecipes();
            }

            // 서브카테고리 필터링
            if (this.currentFilters.subcategory) {
                recipes = recipes.filter(recipe =>
                    recipe.subcategory === this.currentFilters.subcategory
                );
            }

            // 정렬
            recipes = this.sortRecipes(recipes);

            return recipes;
        } catch (e) {
            console.error('레시피 목록 로드 실패:', e);
            return [];
        }
    },

    /**
     * 레시피 정렬
     */
    sortRecipes(recipes) {
        const sorted = [...recipes];

        switch (this.currentFilters.sortBy) {
            case 'newest':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'name':
                sorted.sort((a, b) => a.title.localeCompare(b.title, 'ko'));
                break;
            case 'rating':
                sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                break;
            case 'cookCount':
                sorted.sort((a, b) => (b.cookCount || 0) - (a.cookCount || 0));
                break;
        }

        return sorted;
    },

    /**
     * 이벤트 바인딩
     */
    init() {
        // 검색 입력
        const searchInput = document.getElementById('recipeSearchInput');
        if (searchInput) {
            // 검색에 포커스해야 하는 경우
            if (this.params.focusSearch) {
                searchInput.focus();
            }

            // Enter 키로 검색
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.currentFilters.query = searchInput.value;
                    this.refreshRecipeList();
                }
            });
        }

        // 검색 버튼 클릭
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchInput = document.getElementById('recipeSearchInput');
                if (searchInput) {
                    this.currentFilters.query = searchInput.value;
                    this.refreshRecipeList();
                }
            });
        }

        // 카테고리 필터 칩
        document.querySelectorAll('[data-filter-type="category"]').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const value = e.currentTarget.dataset.value;
                this.currentFilters.category = value || null;
                this.currentFilters.subcategory = null; // 카테고리 변경 시 서브카테고리 초기화
                this.updateFilterUI();
                this.updateSubcategoryFilter();
                this.refreshRecipeList();
            });
        });

        // 서브카테고리 필터 칩
        this.bindSubcategoryEvents();

        // 추가 필터 토글
        const moreFiltersBtn = document.getElementById('moreFiltersBtn');
        const filterPanel = document.getElementById('filterPanel');
        if (moreFiltersBtn && filterPanel) {
            moreFiltersBtn.addEventListener('click', () => {
                filterPanel.classList.toggle('hidden');
                moreFiltersBtn.classList.toggle('active');
            });
        }

        // 난이도 필터
        document.querySelectorAll('[data-filter-type="difficulty"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const value = e.currentTarget.dataset.value;
                this.currentFilters.difficulty = value || null;
                this.updateFilterUI();
                this.refreshRecipeList();
            });
        });

        // 태그 필터
        document.querySelectorAll('[data-filter-type="tag"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tag = e.currentTarget.dataset.value;
                const index = this.currentFilters.tags.indexOf(tag);

                if (index > -1) {
                    this.currentFilters.tags.splice(index, 1);
                } else {
                    this.currentFilters.tags.push(tag);
                }

                this.updateFilterUI();
                this.refreshRecipeList();
            });
        });

        // 즐겨찾기 필터
        const favoritesCheckbox = document.getElementById('favoritesOnlyCheckbox');
        if (favoritesCheckbox) {
            favoritesCheckbox.addEventListener('change', (e) => {
                this.currentFilters.favoritesOnly = e.target.checked;
                this.refreshRecipeList();
            });
        }

        // 필터 초기화
        const resetFiltersBtn = document.getElementById('resetFiltersBtn');
        if (resetFiltersBtn) {
            resetFiltersBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        // 정렬 버튼
        const sortBtn = document.getElementById('sortBtn');
        const sortMenu = document.getElementById('sortMenu');
        if (sortBtn && sortMenu) {
            sortBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                sortMenu.classList.toggle('hidden');
            });

            // 외부 클릭 시 메뉴 닫기
            document.addEventListener('click', () => {
                sortMenu.classList.add('hidden');
            });

            // 정렬 옵션
            document.querySelectorAll('.sort-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const sortBy = e.currentTarget.dataset.sort;
                    this.currentFilters.sortBy = sortBy;
                    this.updateSortUI();
                    this.refreshRecipeList();
                    sortMenu.classList.add('hidden');
                });
            });
        }

        // 레시피 카드 클릭
        this.bindRecipeCardEvents();

        // 플로팅 추가 버튼
        const floatingAddBtn = document.getElementById('floatingAddBtn');
        if (floatingAddBtn) {
            floatingAddBtn.addEventListener('click', () => {
                App.navigateTo('create');
            });
        }

        // 첫 레시피 추가 버튼
        const addFirstRecipeBtn = document.getElementById('addFirstRecipeBtn');
        if (addFirstRecipeBtn) {
            addFirstRecipeBtn.addEventListener('click', () => {
                App.navigateTo('create');
            });
        }
    },

    /**
     * 서브카테고리 이벤트 바인딩
     */
    bindSubcategoryEvents() {
        document.querySelectorAll('[data-filter-type="subcategory"]').forEach(chip => {
            chip.addEventListener('click', (e) => {
                const value = e.currentTarget.dataset.value;
                this.currentFilters.subcategory = value || null;
                this.updateSubcategoryUI();
                this.refreshRecipeList();
            });
        });
    },

    /**
     * 서브카테고리 필터 영역 업데이트
     */
    updateSubcategoryFilter() {
        const subcategoryFilter = document.getElementById('subcategoryFilter');
        if (!subcategoryFilter) return;

        if (this.currentFilters.category) {
            subcategoryFilter.innerHTML = this.renderSubcategoryChips();
            subcategoryFilter.classList.remove('hidden');
            this.bindSubcategoryEvents();
        } else {
            subcategoryFilter.classList.add('hidden');
            subcategoryFilter.innerHTML = '';
        }
    },

    /**
     * 서브카테고리 UI 업데이트
     */
    updateSubcategoryUI() {
        document.querySelectorAll('[data-filter-type="subcategory"]').forEach(chip => {
            const value = chip.dataset.value;
            chip.classList.toggle('active',
                (!value && !this.currentFilters.subcategory) ||
                (value === this.currentFilters.subcategory)
            );
        });
    },

    /**
     * 레시피 카드 이벤트 바인딩
     */
    bindRecipeCardEvents() {
        // 레시피 카드 클릭
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // 즐겨찾기 버튼 클릭 제외
                if (e.target.closest('.favorite-btn')) return;

                const recipeId = card.dataset.recipeId;
                App.navigateTo('recipe-detail', { id: recipeId });
            });
        });

        // 즐겨찾기 토글
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.stopPropagation();
                const recipeId = btn.dataset.recipeId;
                await this.toggleFavorite(recipeId, btn);
            });
        });
    },

    /**
     * 즐겨찾기 토글
     */
    async toggleFavorite(recipeId, btn) {
        try {
            const updatedRecipe = await db.toggleFavorite(recipeId);

            // UI 업데이트
            btn.classList.toggle('active');
            btn.textContent = updatedRecipe.isFavorite ? '❤️' : '🤍';

            Utils.showToast(
                updatedRecipe.isFavorite ? '즐겨찾기에 추가되었습니다.' : '즐겨찾기가 해제되었습니다.',
                'success'
            );

            // 즐겨찾기 필터 활성화 상태면 목록 새로고침
            if (this.currentFilters.favoritesOnly) {
                this.refreshRecipeList();
            }
        } catch (e) {
            console.error('즐겨찾기 토글 실패:', e);
            Utils.showToast('오류가 발생했습니다.', 'error');
        }
    },

    /**
     * 필터 UI 업데이트
     */
    updateFilterUI() {
        // 카테고리 필터
        document.querySelectorAll('[data-filter-type="category"]').forEach(chip => {
            const value = chip.dataset.value;
            chip.classList.toggle('active',
                (!value && !this.currentFilters.category) ||
                (value === this.currentFilters.category)
            );
        });

        // 난이도 필터
        document.querySelectorAll('[data-filter-type="difficulty"]').forEach(btn => {
            const value = btn.dataset.value;
            btn.classList.toggle('active',
                (!value && !this.currentFilters.difficulty) ||
                (value === this.currentFilters.difficulty)
            );
        });

        // 태그 필터
        document.querySelectorAll('[data-filter-type="tag"]').forEach(btn => {
            const tag = btn.dataset.value;
            btn.classList.toggle('active', this.currentFilters.tags.includes(tag));
        });

        // 필터 카운트
        const filterCount = document.querySelector('.filter-count');
        if (filterCount) {
            const count = this.getActiveFilterCount();
            filterCount.textContent = count;
            filterCount.classList.toggle('hidden', count === 0);
        }
    },

    /**
     * 정렬 UI 업데이트
     */
    updateSortUI() {
        // 정렬 버튼 텍스트
        const sortBtn = document.getElementById('sortBtn');
        if (sortBtn) {
            sortBtn.innerHTML = `<span>정렬: ${this.getSortLabel()}</span>`;
        }

        // 정렬 옵션 active 상태
        document.querySelectorAll('.sort-option').forEach(option => {
            option.classList.toggle('active', option.dataset.sort === this.currentFilters.sortBy);
        });
    },

    /**
     * 레시피 목록 새로고침
     */
    async refreshRecipeList() {
        const recipes = await this.getFilteredRecipes();
        const recipeGrid = document.getElementById('recipeGrid');
        const recipesSection = document.querySelector('.recipes-list-section');

        if (!recipesSection) return;

        // 레시피 개수 업데이트
        const countEl = document.querySelector('.recipes-count');
        if (countEl) {
            countEl.textContent = `${recipes.length}개의 레시피`;
        }

        // 그리드 업데이트
        if (recipes.length > 0) {
            if (recipeGrid) {
                recipeGrid.innerHTML = recipes.map(recipe => this.renderRecipeCard(recipe)).join('');
            } else {
                // 빈 상태에서 레시피가 생긴 경우
                recipesSection.innerHTML = `
                    <div class="recipes-header">
                        <span class="recipes-count">${recipes.length}개의 레시피</span>
                    </div>
                    <div class="recipe-grid" id="recipeGrid">
                        ${recipes.map(recipe => this.renderRecipeCard(recipe)).join('')}
                    </div>
                `;
            }
        } else {
            recipesSection.innerHTML = `
                <div class="recipes-header">
                    <span class="recipes-count">0개의 레시피</span>
                </div>
                <div class="empty-recipes">
                    <span class="empty-icon">🍽️</span>
                    <h3 class="empty-title">레시피가 없습니다</h3>
                    <p class="empty-description">
                        ${this.currentFilters.query
                            ? '검색 조건에 맞는 레시피가 없습니다.'
                            : '첫 번째 레시피를 추가해보세요!'}
                    </p>
                    ${!this.currentFilters.query ? `
                        <button class="primary-btn" id="addFirstRecipeBtn">
                            레시피 추가하기
                        </button>
                    ` : ''}
                </div>
            `;

            // 첫 레시피 추가 버튼 이벤트 재바인딩
            const addFirstRecipeBtn = document.getElementById('addFirstRecipeBtn');
            if (addFirstRecipeBtn) {
                addFirstRecipeBtn.addEventListener('click', () => {
                    App.navigateTo('create');
                });
            }
        }

        // 이벤트 재바인딩
        this.bindRecipeCardEvents();
    },

    /**
     * 필터 초기화
     */
    resetFilters() {
        this.currentFilters = {
            query: '',
            category: null,
            subcategory: null,
            tags: [],
            difficulty: null,
            favoritesOnly: false,
            sortBy: 'newest'
        };

        // 검색 입력 초기화
        const searchInput = document.getElementById('recipeSearchInput');
        if (searchInput) {
            searchInput.value = '';
        }

        // 즐겨찾기 체크박스 초기화
        const favoritesCheckbox = document.getElementById('favoritesOnlyCheckbox');
        if (favoritesCheckbox) {
            favoritesCheckbox.checked = false;
        }

        this.updateFilterUI();
        this.updateSortUI();
        this.updateSubcategoryFilter();
        this.refreshRecipeList();

        Utils.showToast('필터가 초기화되었습니다.', 'success');
    }
};

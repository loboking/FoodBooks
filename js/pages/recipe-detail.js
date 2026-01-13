/**
 * FoodBooks - 레시피 상세 페이지
 */

const RecipeDetailPage = {
    recipe: null,
    currentServings: 1,
    originalServings: 1,

    /**
     * 페이지 렌더링
     * @param {string} recipeId - 레시피 ID
     * @returns {string} HTML 문자열
     */
    async render(recipeId) {
        if (!recipeId) {
            return this.renderError('레시피를 찾을 수 없습니다.');
        }

        try {
            this.recipe = await db.getRecipe(recipeId);
            if (!this.recipe) {
                return this.renderError('레시피를 찾을 수 없습니다.');
            }

            this.originalServings = this.recipe.servings || 1;
            this.currentServings = this.originalServings;

            return this.renderRecipe();
        } catch (error) {
            console.error('레시피 로드 실패:', error);
            return this.renderError('레시피를 불러오는데 실패했습니다.');
        }
    },

    // 기본 플레이스홀더 이미지 URL
    DEFAULT_IMAGE: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=800',

    /**
     * 레시피 상세 HTML 렌더링
     */
    renderRecipe() {
        const recipe = this.recipe;
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const categories = Utils.getDefaultCategories();
        const category = categories.find(c => c.id === recipe.category);
        const isDefaultImage = !recipe.image || recipe.image === this.DEFAULT_IMAGE;
        const searchTerm = encodeURIComponent(recipe.title);

        return `
            <div class="recipe-detail" data-recipe-id="${recipe.id}">
                <!-- 레시피 이미지 -->
                <div class="recipe-image-container" style="position: relative;">
                    ${recipe.image
                        ? `<img src="${recipe.image}" alt="${Utils.escapeHtml(recipe.title)}" class="recipe-detail-image" id="recipeImage">`
                        : `<div class="recipe-detail-image" style="background-color: var(--background-color); display: flex; align-items: center; justify-content: center; font-size: 4rem;">🍽️</div>`
                    }
                    ${isDefaultImage ? `
                        <div class="image-search-overlay" id="imageSearchOverlay" style="
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            background: linear-gradient(transparent, rgba(0,0,0,0.8));
                            padding: 20px 16px 16px;
                            cursor: pointer;
                        ">
                            <div style="color: white; text-align: center;">
                                <div style="font-size: 24px; margin-bottom: 4px;">📷</div>
                                <div style="font-size: 14px;">이미지를 찾으려면 탭하세요</div>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- 이미지 검색 모달 (숨김) -->
                <div id="imageSearchModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.9); z-index: 1000; padding: 20px;">
                    <div style="max-width: 400px; margin: 50px auto; background: white; border-radius: 16px; overflow: hidden;">
                        <div style="padding: 20px; text-align: center; border-bottom: 1px solid #eee;">
                            <h3 style="margin: 0 0 8px;">🔍 "${Utils.escapeHtml(recipe.title)}" 이미지 검색</h3>
                            <p style="color: #666; font-size: 14px; margin: 0;">아래 사이트에서 이미지를 찾아보세요</p>
                        </div>
                        <div style="padding: 16px;">
                            <a href="https://unsplash.com/s/photos/${searchTerm}" target="_blank" rel="noopener"
                               style="display: block; padding: 16px; margin-bottom: 8px; background: #111; color: white; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
                                📸 Unsplash에서 검색
                            </a>
                            <a href="https://pixabay.com/images/search/${searchTerm}/" target="_blank" rel="noopener"
                               style="display: block; padding: 16px; margin-bottom: 8px; background: #00ab6c; color: white; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
                                🖼️ Pixabay에서 검색
                            </a>
                            <a href="https://www.pexels.com/search/${searchTerm}/" target="_blank" rel="noopener"
                               style="display: block; padding: 16px; margin-bottom: 8px; background: #05a081; color: white; text-decoration: none; border-radius: 8px; text-align: center; font-weight: 600;">
                                🌅 Pexels에서 검색
                            </a>
                        </div>
                        <div style="padding: 16px; border-top: 1px solid #eee;">
                            <button id="closeImageSearch" style="width: 100%; padding: 14px; background: #f5f5f5; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
                                닫기
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 헤더 정보 -->
                <div class="recipe-detail-header">
                    <h1 class="recipe-detail-title" style="text-align: center; margin-bottom: 12px;">${Utils.escapeHtml(recipe.title)}</h1>
                    <div style="text-align: center; margin-bottom: 16px;">
                        <button class="icon-btn" id="favoriteBtn" aria-label="즐겨찾기">
                            <span class="icon">${recipe.isFavorite ? '❤️' : '🤍'}</span>
                        </button>
                    </div>

                    ${recipe.description ? `<p class="recipe-detail-desc mb-16" style="color: var(--text-secondary);">${Utils.escapeHtml(recipe.description)}</p>` : ''}

                    <!-- 메타 정보 -->
                    <div class="recipe-detail-meta">
                        ${category ? `
                            <div class="recipe-detail-meta-item">
                                <span>${category.icon}</span>
                                <span>${category.name}</span>
                            </div>
                        ` : ''}
                        <div class="recipe-detail-meta-item">
                            <span>⏱️</span>
                            <span>${Utils.formatTime(totalTime)}</span>
                        </div>
                        <div class="recipe-detail-meta-item">
                            <span>📊</span>
                            <span>${Utils.getDifficultyLabel(recipe.difficulty)}</span>
                        </div>
                        <div class="recipe-detail-meta-item">
                            <span>👥</span>
                            <span>${recipe.servings || 1}인분</span>
                        </div>
                        ${recipe.averageRating && recipe.averageRating > 0 ? `
                            <div class="recipe-detail-meta-item">
                                <span>⭐</span>
                                <span>${recipe.averageRating} (${recipe.reviewCount || 0})</span>
                            </div>
                        ` : ''}
                    </div>

                    <!-- 태그 -->
                    ${recipe.tags && recipe.tags.length > 0 ? `
                        <div class="recipe-card-tags" style="margin-top: 12px;">
                            ${recipe.tags.map(tag => `<span class="tag">${Utils.escapeHtml(tag)}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>

                <!-- 액션 버튼들 -->
                <div class="recipe-actions mb-24" style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn btn-primary" id="cookingModeBtn">
                        <span>👨‍🍳</span> 요리 모드
                    </button>
                    <button class="btn btn-secondary" id="addToShoppingBtn">
                        <span>🛒</span> 장보기 추가
                    </button>
                    <button class="btn btn-secondary" id="editBtn">
                        <span>✏️</span> 수정
                    </button>
                    <button class="btn btn-secondary" id="deleteBtn" style="color: var(--danger-color);">
                        <span>🗑️</span> 삭제
                    </button>
                </div>

                <!-- 인분 조절 -->
                <div class="recipe-ingredients">
                    <div class="flex-between mb-16">
                        <h3>재료</h3>
                        <div class="servings-control">
                            <button class="servings-btn" id="decreaseServings">-</button>
                            <span class="servings-value" id="servingsValue">${this.currentServings}인분</span>
                            <button class="servings-btn" id="increaseServings">+</button>
                        </div>
                    </div>

                    <!-- 재료 목록 -->
                    <ul class="ingredient-list" id="ingredientList">
                        ${this.renderIngredients()}
                    </ul>
                </div>

                <!-- 조리 단계 -->
                <div class="recipe-steps">
                    <h3 class="section-title">조리 순서</h3>
                    ${this.renderSteps()}
                </div>

                <!-- 리뷰 섹션 -->
                <div class="recipe-reviews-section">
                    <div class="flex-between mb-16">
                        <h3 class="section-title">리뷰</h3>
                        <button class="btn btn-small" id="writeReviewBtn">후기 작성</button>
                    </div>
                    <div id="reviewListContainer">리뷰를 불러오는 중...</div>
                </div>

                <!-- 맛집 추천 -->
                ${this.renderRestaurants()}

                <!-- 추가 정보 -->
                <div class="recipe-extra-info" style="color: var(--text-muted); font-size: 0.875rem; margin-top: 24px;">
                    <p>작성일: ${Utils.formatDate(recipe.createdAt)}</p>
                    ${recipe.updatedAt !== recipe.createdAt ? `<p>수정일: ${Utils.formatDate(recipe.updatedAt)}</p>` : ''}
                    ${recipe.cookCount > 0 ? `<p>요리 횟수: ${recipe.cookCount}회</p>` : ''}
                    ${recipe.lastCooked ? `<p>마지막 요리: ${Utils.formatRelativeTime(recipe.lastCooked)}</p>` : ''}
                </div>
            </div>
        `;
    },

    /**
     * 재료 목록 렌더링
     */
    renderIngredients() {
        const ingredients = this.recipe.ingredients || [];
        if (ingredients.length === 0) {
            return '<li class="ingredient-item" style="color: var(--text-muted);">등록된 재료가 없습니다.</li>';
        }

        const ingredientCategories = Utils.getIngredientCategories();
        const grouped = {};

        // 카테고리별 그룹핑
        ingredients.forEach(ing => {
            const category = ing.category || 'other';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(ing);
        });

        let html = '';
        ingredientCategories.forEach(cat => {
            if (grouped[cat.id] && grouped[cat.id].length > 0) {
                html += `<li class="shopping-category">${cat.icon} ${cat.name}</li>`;
                grouped[cat.id].forEach(ing => {
                    const amount = this.calculateAmount(ing.amount);
                    html += `
                        <li class="ingredient-item">
                            <span class="ingredient-name">${Utils.escapeHtml(ing.name)}</span>
                            <span class="ingredient-amount">${amount}${ing.unit || ''}</span>
                        </li>
                    `;
                });
            }
        });

        return html || '<li class="ingredient-item" style="color: var(--text-muted);">등록된 재료가 없습니다.</li>';
    },

    /**
     * 인분에 따른 재료량 계산
     */
    calculateAmount(amount) {
        if (!amount) return '';
        const calculated = Utils.calculateIngredientAmount(
            parseFloat(amount),
            this.originalServings,
            this.currentServings
        );
        // 소수점 2자리까지 표시, 정수면 정수로
        return Number.isInteger(calculated) ? calculated : calculated.toFixed(2).replace(/\.?0+$/, '');
    },

    /**
     * 조리 단계 렌더링
     */
    renderSteps() {
        const steps = this.recipe.steps || [];
        if (steps.length === 0) {
            return '<p style="color: var(--text-muted);">등록된 조리 순서가 없습니다.</p>';
        }

        return steps.map((step, index) => `
            <div class="step-item">
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <p>${Utils.escapeHtml(step.text || step)}</p>
                    ${step.image ? `<img src="${step.image}" alt="단계 ${index + 1}" class="step-image">` : ''}
                    ${step.timer ? `
                        <div style="margin-top: 8px;">
                            <span class="tag">⏱️ ${step.timer}분</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    },

    /**
     * 맛집 추천 섹션 렌더링
     */
    renderRestaurants() {
        const restaurants = this.recipe.famousRestaurants || [];
        if (restaurants.length === 0) {
            return '';
        }

        const recipeName = this.recipe.title;
        const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(recipeName + ' 맛집')}`;
        const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(recipeName + ' 맛집')}`;

        return `
            <div class="restaurant-section">
                <h3 class="section-title">🏪 이 음식 맛집</h3>
                <p class="restaurant-subtitle">직접 만들기 어렵다면, 유명 맛집에서 맛보세요!</p>

                <div class="restaurant-list">
                    ${restaurants.map(r => `
                        <div class="restaurant-item">
                            <div class="restaurant-info">
                                <span class="restaurant-name">${Utils.escapeHtml(r.name)}</span>
                                <span class="restaurant-location">📍 ${Utils.escapeHtml(r.location)}</span>
                            </div>
                            <a href="https://map.kakao.com/link/search/${encodeURIComponent(r.searchKeyword)}"
                               target="_blank"
                               class="restaurant-link"
                               rel="noopener noreferrer">
                                지도 보기 →
                            </a>
                        </div>
                    `).join('')}
                </div>

                <div class="restaurant-more-links">
                    <a href="${kakaoMapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        🗺️ 카카오맵에서 더 찾기
                    </a>
                    <a href="${naverMapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        🗺️ 네이버맵에서 더 찾기
                    </a>
                </div>
            </div>
        `;
    },

    /**
     * 에러 화면 렌더링
     */
    renderError(message) {
        return `
            <div class="empty-state">
                <div class="empty-state-icon">❌</div>
                <h2 class="empty-state-title">${Utils.escapeHtml(message)}</h2>
                <button class="btn btn-primary" id="backBtn">
                    홈으로 돌아가기
                </button>
            </div>
        `;
    },

    /**
     * 이벤트 바인딩
     */
    async init() {
        // 리뷰 로드
        if (this.recipe) {
            await this.loadReviews();
        }

        // 리뷰 모달 추가
        const reviewModalHtml = Components.ReviewModal({
            id: 'recipeReviewModal',
            recipeTitle: this.recipe?.title || '',
            onSubmit: 'RecipeDetailPage.submitReview'
        });
        document.body.insertAdjacentHTML('beforeend', reviewModalHtml);

        // 후기 작성 버튼
        const writeReviewBtn = document.getElementById('writeReviewBtn');
        if (writeReviewBtn) {
            writeReviewBtn.addEventListener('click', () => {
                Components.openModal('recipeReviewModal');
            });
        }

        // 뒤로가기
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                App.goBack();
            });
        }

        // 이미지 검색 오버레이 클릭
        const imageSearchOverlay = document.getElementById('imageSearchOverlay');
        const imageSearchModal = document.getElementById('imageSearchModal');
        const closeImageSearch = document.getElementById('closeImageSearch');

        if (imageSearchOverlay && imageSearchModal) {
            imageSearchOverlay.addEventListener('click', () => {
                imageSearchModal.style.display = 'block';
            });
        }

        if (closeImageSearch && imageSearchModal) {
            closeImageSearch.addEventListener('click', () => {
                imageSearchModal.style.display = 'none';
            });
            // 모달 배경 클릭 시 닫기
            imageSearchModal.addEventListener('click', (e) => {
                if (e.target === imageSearchModal) {
                    imageSearchModal.style.display = 'none';
                }
            });
        }

        // 즐겨찾기 토글
        const favoriteBtn = document.getElementById('favoriteBtn');
        if (favoriteBtn) {
            favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        }

        // 요리 모드
        const cookingModeBtn = document.getElementById('cookingModeBtn');
        if (cookingModeBtn) {
            cookingModeBtn.addEventListener('click', () => {
                if (this.recipe) {
                    App.navigateTo('cooking-mode', { id: this.recipe.id });
                }
            });
        }

        // 장보기 추가
        const addToShoppingBtn = document.getElementById('addToShoppingBtn');
        if (addToShoppingBtn) {
            addToShoppingBtn.addEventListener('click', () => this.addToShoppingList());
        }

        // 수정
        const editBtn = document.getElementById('editBtn');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                if (this.recipe) {
                    App.navigateTo('recipe-form', { id: this.recipe.id });
                }
            });
        }

        // 삭제
        const deleteBtn = document.getElementById('deleteBtn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.confirmDelete());
        }

        // 인분 조절
        const decreaseBtn = document.getElementById('decreaseServings');
        const increaseBtn = document.getElementById('increaseServings');

        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => this.adjustServings(-1));
        }
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => this.adjustServings(1));
        }
    },

    /**
     * 즐겨찾기 토글
     */
    async toggleFavorite() {
        if (!this.recipe) return;

        try {
            const updated = await db.toggleFavorite(this.recipe.id);
            this.recipe = updated;

            const favoriteBtn = document.getElementById('favoriteBtn');
            if (favoriteBtn) {
                favoriteBtn.querySelector('.icon').textContent = updated.isFavorite ? '❤️' : '🤍';
            }

            Utils.showToast(
                updated.isFavorite ? '즐겨찾기에 추가되었습니다.' : '즐겨찾기에서 제거되었습니다.',
                'success'
            );
        } catch (error) {
            console.error('즐겨찾기 토글 실패:', error);
            Utils.showToast('즐겨찾기 변경에 실패했습니다.', 'error');
        }
    },

    /**
     * 인분 조절
     */
    adjustServings(delta) {
        const newServings = this.currentServings + delta;
        if (newServings < 1 || newServings > 99) return;

        this.currentServings = newServings;

        // UI 업데이트
        const servingsValue = document.getElementById('servingsValue');
        if (servingsValue) {
            servingsValue.textContent = `${this.currentServings}인분`;
        }

        const ingredientList = document.getElementById('ingredientList');
        if (ingredientList) {
            ingredientList.innerHTML = this.renderIngredients();
        }
    },

    /**
     * 장보기 리스트에 추가
     */
    async addToShoppingList() {
        if (!this.recipe) return;

        try {
            await db.addToShoppingList(this.recipe.id, this.currentServings);
            Utils.showToast('장보기 리스트에 추가되었습니다.', 'success');
        } catch (error) {
            console.error('장보기 추가 실패:', error);
            Utils.showToast('장보기 리스트 추가에 실패했습니다.', 'error');
        }
    },

    /**
     * 삭제 확인
     */
    confirmDelete() {
        if (!this.recipe) return;

        const modalContainer = document.getElementById('modalContainer');
        if (!modalContainer) return;

        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">레시피 삭제</h3>
                </div>
                <div class="modal-body">
                    <p>"${Utils.escapeHtml(this.recipe.title)}" 레시피를 삭제하시겠습니까?</p>
                    <p style="color: var(--danger-color); margin-top: 8px; font-size: 0.875rem;">
                        이 작업은 되돌릴 수 없습니다.
                    </p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" id="cancelDeleteBtn">취소</button>
                    <button class="btn btn-danger" id="confirmDeleteBtn">삭제</button>
                </div>
            </div>
        `;
        modalContainer.classList.remove('hidden');

        // 모달 이벤트 바인딩
        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            modalContainer.classList.add('hidden');
        });

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.deleteRecipe();
        });

        // 배경 클릭시 닫기
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) {
                modalContainer.classList.add('hidden');
            }
        });
    },

    /**
     * 레시피 삭제
     */
    async deleteRecipe() {
        if (!this.recipe) return;

        try {
            await db.deleteRecipe(this.recipe.id);

            const modalContainer = document.getElementById('modalContainer');
            if (modalContainer) {
                modalContainer.classList.add('hidden');
            }

            Utils.showToast('레시피가 삭제되었습니다.', 'success');
            App.navigateTo('recipes');
        } catch (error) {
            console.error('레시피 삭제 실패:', error);
            Utils.showToast('레시피 삭제에 실패했습니다.', 'error');
        }
    },

    /**
     * 리뷰 로드
     */
    async loadReviews() {
        if (!this.recipe) return;

        try {
            const reviews = await db.getReviews(this.recipe.id);
            const reviewListContainer = document.getElementById('reviewListContainer');
            if (reviewListContainer) {
                reviewListContainer.innerHTML = Components.ReviewList({
                    reviews: reviews,
                    emptyMessage: '아직 후기가 없습니다. 첫 번째 후기를 작성해보세요!'
                });
            }
        } catch (error) {
            console.error('리뷰 로드 실패:', error);
            const reviewListContainer = document.getElementById('reviewListContainer');
            if (reviewListContainer) {
                reviewListContainer.innerHTML = '<p style="color: var(--text-muted);">리뷰를 불러오는데 실패했습니다.</p>';
            }
        }
    },

    /**
     * 리뷰 제출
     */
    async submitReview(data) {
        if (!this.recipe) return;

        try {
            await db.addReview(
                this.recipe.id,
                data.rating,
                data.review,
                data.author
            );

            Components.closeModal('recipeReviewModal');
            Utils.showToast('리뷰가 저장되었습니다.', 'success');

            // 레시피 정보 갱신
            this.recipe = await db.getRecipe(this.recipe.id);

            // 리뷰 목록 갱신
            await this.loadReviews();

            // 레시피 상세 페이지 갱신 (별점 표시 업데이트)
            App.navigateTo('recipe-detail', { id: this.recipe.id });
        } catch (error) {
            console.error('리뷰 저장 실패:', error);
            Utils.showToast('리뷰 저장에 실패했습니다.', 'error');
        }
    }
};

/**
 * FoodBooks - 쇼핑리스트 페이지
 */

const ShoppingPage = {
    // 체크된 재료 목록 (세션 중 유지)
    checkedItems: new Set(),

    /**
     * 페이지 렌더링
     */
    async render() {
        const shoppingList = await db.getShoppingList();

        if (shoppingList.length === 0) {
            return this.renderEmptyState();
        }

        const mergedIngredients = this.mergeIngredients(shoppingList);
        const groupedIngredients = this.groupByCategory(mergedIngredients);

        return `
            <div class="shopping-page">
                <div class="page-header">
                    <h2 class="page-title">장보기 목록</h2>
                    <div class="header-actions">
                        <button id="copyListBtn" class="icon-btn" title="복사">
                            <span class="icon">📋</span>
                        </button>
                        <button id="shareListBtn" class="icon-btn" title="공유">
                            <span class="icon">📤</span>
                        </button>
                        <button id="clearListBtn" class="icon-btn" title="초기화">
                            <span class="icon">🗑️</span>
                        </button>
                    </div>
                </div>

                <!-- 선택된 레시피 목록 -->
                <section class="selected-recipes">
                    <h3 class="section-title">선택된 레시피 (${shoppingList.length})</h3>
                    <div class="recipe-chips">
                        ${shoppingList.map(item => `
                            <div class="recipe-chip" data-id="${item.id}">
                                <span class="chip-text">${Utils.escapeHtml(item.recipeTitle)}</span>
                                <span class="chip-servings">${item.servings}인분</span>
                                <button class="chip-remove" data-id="${item.id}" aria-label="삭제">×</button>
                            </div>
                        `).join('')}
                    </div>
                </section>

                <!-- 재료 목록 -->
                <section class="ingredients-list">
                    <div class="list-header">
                        <h3 class="section-title">재료 목록</h3>
                        <span class="checked-count" id="checkedCount">
                            ${this.checkedItems.size}/${mergedIngredients.length} 완료
                        </span>
                    </div>

                    ${this.renderCategoryGroups(groupedIngredients)}
                </section>

                <!-- 진행률 바 -->
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progressBar"
                         style="width: ${(this.checkedItems.size / mergedIngredients.length) * 100}%">
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * 빈 상태 렌더링
     */
    renderEmptyState() {
        return `
            <div class="shopping-page">
                <div class="page-header">
                    <h2 class="page-title">장보기 목록</h2>
                </div>
                <div class="empty-state">
                    <span class="empty-icon">🛒</span>
                    <h3>장보기 목록이 비어있어요</h3>
                    <p>레시피 상세 페이지에서 "장보기 목록에 추가"를 눌러보세요</p>
                    <button class="btn btn-primary" id="goToRecipesBtn">
                        레시피 둘러보기
                    </button>
                </div>
            </div>
        `;
    },

    /**
     * 카테고리 그룹 렌더링
     */
    renderCategoryGroups(groupedIngredients) {
        const categories = Utils.getIngredientCategories();
        let html = '';

        categories.forEach(category => {
            const ingredients = groupedIngredients[category.id];
            if (ingredients && ingredients.length > 0) {
                html += `
                    <div class="ingredient-category">
                        <div class="category-header">
                            <span class="category-icon">${category.icon}</span>
                            <span class="category-name">${category.name}</span>
                            <span class="category-count">${ingredients.length}</span>
                        </div>
                        <ul class="ingredient-items">
                            ${ingredients.map(ing => this.renderIngredientItem(ing)).join('')}
                        </ul>
                    </div>
                `;
            }
        });

        return html;
    },

    /**
     * 개별 재료 아이템 렌더링
     */
    renderIngredientItem(ingredient) {
        const itemId = this.getIngredientId(ingredient);
        const isChecked = this.checkedItems.has(itemId);

        return `
            <li class="ingredient-item ${isChecked ? 'checked' : ''}" data-item-id="${itemId}">
                <label class="checkbox-label">
                    <input type="checkbox"
                           class="ingredient-checkbox"
                           data-item-id="${itemId}"
                           ${isChecked ? 'checked' : ''}>
                    <span class="checkmark"></span>
                    <span class="ingredient-name">${Utils.escapeHtml(ingredient.name)}</span>
                    <span class="ingredient-amount">
                        ${ingredient.amount ? `${ingredient.amount}${ingredient.unit || ''}` : '적당량'}
                    </span>
                </label>
                ${ingredient.recipes && ingredient.recipes.length > 1 ?
                    `<span class="ingredient-sources" title="${ingredient.recipes.join(', ')}">
                        (${ingredient.recipes.length}개 레시피)
                    </span>` : ''
                }
            </li>
        `;
    },

    /**
     * 재료 통합
     */
    mergeIngredients(shoppingList) {
        const merged = {};

        shoppingList.forEach(item => {
            const ratio = item.servings / item.originalServings;

            item.ingredients.forEach(ing => {
                const key = `${ing.name.toLowerCase()}_${ing.unit || ''}`;
                const ingAmount = ing.amount ? parseFloat(ing.amount) : null;

                if (merged[key]) {
                    // 기존 재료에 수량 추가
                    if (ingAmount && merged[key].amount) {
                        merged[key].amount += ingAmount * ratio;
                    }
                    // 레시피 출처 추가
                    if (!merged[key].recipes.includes(item.recipeTitle)) {
                        merged[key].recipes.push(item.recipeTitle);
                    }
                } else {
                    merged[key] = {
                        name: ing.name,
                        amount: ingAmount ? ingAmount * ratio : null,
                        unit: ing.unit || '',
                        category: ing.category || 'other',
                        recipes: [item.recipeTitle]
                    };
                }
            });
        });

        // 수량 반올림 처리
        Object.values(merged).forEach(ing => {
            if (ing.amount) {
                ing.amount = Math.round(ing.amount * 10) / 10;
            }
        });

        return Object.values(merged);
    },

    /**
     * 카테고리별 그룹핑
     */
    groupByCategory(ingredients) {
        const grouped = {};

        ingredients.forEach(ing => {
            const category = ing.category || 'other';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(ing);
        });

        // 각 카테고리 내 정렬 (이름순)
        Object.keys(grouped).forEach(cat => {
            grouped[cat].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        });

        return grouped;
    },

    /**
     * 재료 고유 ID 생성
     */
    getIngredientId(ingredient) {
        return `${ingredient.name.toLowerCase()}_${ingredient.unit || ''}`;
    },

    /**
     * 이벤트 바인딩
     */
    init() {
        // 빈 상태에서 레시피 보기 버튼
        const goToRecipesBtn = document.getElementById('goToRecipesBtn');
        if (goToRecipesBtn) {
            goToRecipesBtn.addEventListener('click', () => {
                App.navigateTo('recipes');
            });
            return; // 빈 상태면 여기서 종료
        }

        // 복사 버튼
        const copyBtn = document.getElementById('copyListBtn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.handleCopy());
        }

        // 공유 버튼
        const shareBtn = document.getElementById('shareListBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.handleShare());
        }

        // 초기화 버튼
        const clearBtn = document.getElementById('clearListBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.handleClear());
        }

        // 레시피 칩 삭제 버튼
        document.querySelectorAll('.chip-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleRemoveRecipe(btn.dataset.id);
            });
        });

        // 체크박스 이벤트
        document.querySelectorAll('.ingredient-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleCheckboxChange(e.target);
            });
        });
    },

    /**
     * 체크박스 상태 변경 처리
     */
    handleCheckboxChange(checkbox) {
        const itemId = checkbox.dataset.itemId;
        const listItem = checkbox.closest('.ingredient-item');

        if (checkbox.checked) {
            this.checkedItems.add(itemId);
            listItem.classList.add('checked');
        } else {
            this.checkedItems.delete(itemId);
            listItem.classList.remove('checked');
        }

        this.updateProgress();
    },

    /**
     * 진행률 업데이트
     */
    async updateProgress() {
        const shoppingList = await db.getShoppingList();
        const mergedIngredients = this.mergeIngredients(shoppingList);
        const total = mergedIngredients.length;
        const checked = this.checkedItems.size;
        const percentage = total > 0 ? (checked / total) * 100 : 0;

        const countEl = document.getElementById('checkedCount');
        if (countEl) {
            countEl.textContent = `${checked}/${total} 완료`;
        }

        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    },

    /**
     * 목록 복사
     */
    async handleCopy() {
        const shoppingList = await db.getShoppingList();
        const mergedIngredients = this.mergeIngredients(shoppingList);
        const text = Utils.generateShoppingListText(mergedIngredients);

        const success = await Utils.copyToClipboard(text);
        if (success) {
            Utils.showToast('클립보드에 복사되었습니다', 'success');
        } else {
            Utils.showToast('복사에 실패했습니다', 'error');
        }
    },

    /**
     * 목록 공유
     */
    async handleShare() {
        const shoppingList = await db.getShoppingList();
        const mergedIngredients = this.mergeIngredients(shoppingList);
        const text = Utils.generateShoppingListText(mergedIngredients);

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'FoodBooks 장보기 목록',
                    text: text
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    Utils.showToast('공유에 실패했습니다', 'error');
                }
            }
        } else {
            // 공유 API 미지원 시 복사로 대체
            await this.handleCopy();
        }
    },

    /**
     * 목록 초기화
     */
    async handleClear() {
        const confirmed = confirm('장보기 목록을 모두 삭제하시겠습니까?');
        if (!confirmed) return;

        try {
            await db.clearShoppingList();
            this.checkedItems.clear();
            Utils.showToast('장보기 목록이 초기화되었습니다', 'success');
            App.navigateTo('shopping');
        } catch (error) {
            console.error('Failed to clear shopping list:', error);
            Utils.showToast('초기화에 실패했습니다', 'error');
        }
    },

    /**
     * 레시피 삭제
     */
    async handleRemoveRecipe(id) {
        try {
            await db.removeFromShoppingList(id);
            Utils.showToast('레시피가 제거되었습니다', 'success');
            App.navigateTo('shopping');
        } catch (error) {
            console.error('Failed to remove recipe:', error);
            Utils.showToast('삭제에 실패했습니다', 'error');
        }
    }
};

/**
 * FoodBooks - 레시피 작성/수정 폼 페이지
 */

const RecipeFormPage = {
    recipe: null,
    isEditMode: false,
    ingredients: [],
    steps: [],
    selectedTags: [],
    mainImage: null,

    /**
     * 페이지 렌더링
     * @param {string} recipeId - 수정 시 레시피 ID
     * @returns {string} HTML 문자열
     */
    async render(recipeId) {
        this.isEditMode = !!recipeId;
        this.recipe = null;
        this.ingredients = [{ name: '', amount: '', unit: 'g', category: 'other' }];
        this.steps = [{ text: '', image: null }];
        this.selectedTags = [];
        this.mainImage = null;

        if (this.isEditMode) {
            try {
                this.recipe = await db.getRecipe(recipeId);
                if (!this.recipe) {
                    return this.renderError('레시피를 찾을 수 없습니다.');
                }
                // 기존 데이터로 초기화
                this.ingredients = this.recipe.ingredients?.length > 0
                    ? [...this.recipe.ingredients]
                    : [{ name: '', amount: '', unit: 'g', category: 'other' }];
                this.steps = this.recipe.steps?.length > 0
                    ? this.recipe.steps.map(s => typeof s === 'string' ? { text: s, image: null } : { ...s })
                    : [{ text: '', image: null }];
                this.selectedTags = this.recipe.tags || [];
                this.mainImage = this.recipe.image || null;
            } catch (error) {
                console.error('레시피 로드 실패:', error);
                return this.renderError('레시피를 불러오는데 실패했습니다.');
            }
        }

        return this.renderForm();
    },

    /**
     * 폼 HTML 렌더링
     */
    renderForm() {
        const categories = Utils.getDefaultCategories();
        const tags = Utils.getDefaultTags();
        const ingredientCategories = Utils.getIngredientCategories();
        const recipe = this.recipe || {};

        return `
            <div class="recipe-form">
                <!-- 헤더 -->
                <div class="flex-between mb-24">
                    <h2 style="font-size: 1.5rem; font-weight: 700;">
                        ${this.isEditMode ? '레시피 수정' : '새 레시피 작성'}
                    </h2>
                    <button class="icon-btn" id="cancelFormBtn" aria-label="취소">
                        <span class="icon">✕</span>
                    </button>
                </div>

                <form id="recipeForm">
                    <!-- 메인 이미지 -->
                    <div class="form-group">
                        <label class="form-label">대표 이미지</label>
                        <div class="image-upload" id="mainImageUpload">
                            ${this.mainImage
                                ? `<img src="${this.mainImage}" alt="대표 이미지" class="image-upload-preview">
                                   <button type="button" class="image-upload-remove" id="removeMainImage">✕</button>`
                                : `<span class="image-upload-icon">📷</span>
                                   <span class="image-upload-text">클릭하여 이미지 추가</span>`
                            }
                            <input type="file" id="mainImageInput" accept="image/*">
                        </div>
                    </div>

                    <!-- 기본 정보 -->
                    <div class="form-group">
                        <label class="form-label" for="recipeTitle">제목 *</label>
                        <input type="text" id="recipeTitle" class="form-input"
                               placeholder="레시피 이름을 입력하세요"
                               value="${Utils.escapeHtml(recipe.title || '')}" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="recipeDescription">설명</label>
                        <textarea id="recipeDescription" class="form-input form-textarea"
                                  placeholder="레시피에 대한 간단한 설명을 입력하세요">${Utils.escapeHtml(recipe.description || '')}</textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="recipeCategory">카테고리</label>
                        <select id="recipeCategory" class="form-input">
                            ${categories.map(cat => `
                                <option value="${cat.id}" ${recipe.category === cat.id ? 'selected' : ''}>
                                    ${cat.icon} ${cat.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;">
                        <div class="form-group">
                            <label class="form-label" for="recipeDifficulty">난이도</label>
                            <select id="recipeDifficulty" class="form-input">
                                <option value="easy" ${recipe.difficulty === 'easy' ? 'selected' : ''}>쉬움</option>
                                <option value="medium" ${recipe.difficulty === 'medium' ? 'selected' : ''}>보통</option>
                                <option value="hard" ${recipe.difficulty === 'hard' ? 'selected' : ''}>어려움</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="recipePrepTime">준비시간(분)</label>
                            <input type="number" id="recipePrepTime" class="form-input"
                                   min="0" placeholder="0"
                                   value="${recipe.prepTime || ''}">
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="recipeCookTime">조리시간(분)</label>
                            <input type="number" id="recipeCookTime" class="form-input"
                                   min="0" placeholder="0"
                                   value="${recipe.cookTime || ''}">
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" for="recipeServings">인분</label>
                        <input type="number" id="recipeServings" class="form-input"
                               min="1" max="99" placeholder="1"
                               value="${recipe.servings || 1}" style="max-width: 100px;">
                    </div>

                    <!-- 재료 입력 -->
                    <div class="form-group">
                        <label class="form-label">재료</label>
                        <div class="dynamic-list" id="ingredientsList">
                            ${this.renderIngredientInputs(ingredientCategories)}
                        </div>
                        <button type="button" class="btn-add-item" id="addIngredientBtn">
                            <span>+</span> 재료 추가
                        </button>
                    </div>

                    <!-- 조리 단계 입력 -->
                    <div class="form-group">
                        <label class="form-label">조리 순서</label>
                        <div class="dynamic-list" id="stepsList">
                            ${this.renderStepInputs()}
                        </div>
                        <button type="button" class="btn-add-item" id="addStepBtn">
                            <span>+</span> 단계 추가
                        </button>
                    </div>

                    <!-- 태그 선택 -->
                    <div class="form-group">
                        <label class="form-label">태그</label>
                        <div class="filter-chips" id="tagsList">
                            ${tags.map(tag => `
                                <button type="button" class="chip ${this.selectedTags.includes(tag) ? 'active' : ''}"
                                        data-tag="${Utils.escapeHtml(tag)}">
                                    ${Utils.escapeHtml(tag)}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- 버튼 -->
                    <div class="form-actions" style="display: flex; gap: 12px; margin-top: 24px;">
                        <button type="button" class="btn btn-secondary" id="cancelBtn" style="flex: 1;">
                            취소
                        </button>
                        <button type="submit" class="btn btn-primary" style="flex: 2;">
                            ${this.isEditMode ? '수정 완료' : '레시피 저장'}
                        </button>
                    </div>
                </form>
            </div>
        `;
    },

    /**
     * 재료 입력 필드 렌더링
     */
    renderIngredientInputs(ingredientCategories) {
        if (!ingredientCategories) {
            ingredientCategories = Utils.getIngredientCategories();
        }

        return this.ingredients.map((ing, index) => `
            <div class="dynamic-list-item ingredient-row" data-index="${index}">
                <input type="text" class="form-input ing-name" placeholder="재료명"
                       value="${Utils.escapeHtml(ing.name || '')}" style="flex: 2;">
                <input type="text" class="form-input ing-amount" placeholder="양"
                       value="${Utils.escapeHtml(String(ing.amount || ''))}" style="flex: 1; max-width: 80px;">
                <select class="form-input ing-unit" style="flex: 1; max-width: 80px;">
                    <option value="g" ${ing.unit === 'g' ? 'selected' : ''}>g</option>
                    <option value="kg" ${ing.unit === 'kg' ? 'selected' : ''}>kg</option>
                    <option value="ml" ${ing.unit === 'ml' ? 'selected' : ''}>ml</option>
                    <option value="L" ${ing.unit === 'L' ? 'selected' : ''}>L</option>
                    <option value="개" ${ing.unit === '개' ? 'selected' : ''}>개</option>
                    <option value="장" ${ing.unit === '장' ? 'selected' : ''}>장</option>
                    <option value="줌" ${ing.unit === '줌' ? 'selected' : ''}>줌</option>
                    <option value="큰술" ${ing.unit === '큰술' ? 'selected' : ''}>큰술</option>
                    <option value="작은술" ${ing.unit === '작은술' ? 'selected' : ''}>작은술</option>
                    <option value="컵" ${ing.unit === '컵' ? 'selected' : ''}>컵</option>
                    <option value="조금" ${ing.unit === '조금' ? 'selected' : ''}>조금</option>
                    <option value="" ${!ing.unit ? 'selected' : ''}>(없음)</option>
                </select>
                <select class="form-input ing-category" style="flex: 1; max-width: 100px;">
                    ${ingredientCategories.map(cat => `
                        <option value="${cat.id}" ${ing.category === cat.id ? 'selected' : ''}>
                            ${cat.icon} ${cat.name}
                        </option>
                    `).join('')}
                </select>
                <button type="button" class="btn-remove remove-ingredient-btn" ${this.ingredients.length <= 1 ? 'disabled' : ''}>
                    🗑️
                </button>
            </div>
        `).join('');
    },

    /**
     * 조리 단계 입력 필드 렌더링
     */
    renderStepInputs() {
        return this.steps.map((step, index) => `
            <div class="dynamic-list-item step-row" data-index="${index}" draggable="true" style="flex-direction: column; gap: 8px;">
                <div style="display: flex; gap: 8px; width: 100%; align-items: flex-start;">
                    <div class="step-drag-handle" style="cursor: move; padding: 8px;">☰</div>
                    <div class="step-number">${index + 1}</div>
                    <textarea class="form-input step-text" placeholder="조리 방법을 입력하세요"
                              style="flex: 1; min-height: 80px;">${Utils.escapeHtml(step.text || '')}</textarea>
                    <button type="button" class="btn-remove remove-step-btn" ${this.steps.length <= 1 ? 'disabled' : ''}>
                        🗑️
                    </button>
                </div>
                <div class="step-image-section" style="display: flex; gap: 8px; margin-left: 40px;">
                    <div class="image-upload step-image-upload" style="height: 100px; flex: 1;" data-index="${index}">
                        ${step.image
                            ? `<img src="${step.image}" alt="단계 ${index + 1}" class="image-upload-preview">
                               <button type="button" class="image-upload-remove remove-step-image">✕</button>`
                            : `<span class="image-upload-icon" style="font-size: 1.5rem;">📷</span>
                               <span class="image-upload-text" style="font-size: 0.75rem;">단계 이미지 (선택)</span>`
                        }
                        <input type="file" class="step-image-input" accept="image/*">
                    </div>
                </div>
            </div>
        `).join('');
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
    init() {
        // 취소 버튼
        const cancelFormBtn = document.getElementById('cancelFormBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const backBtn = document.getElementById('backBtn');

        if (cancelFormBtn) {
            cancelFormBtn.addEventListener('click', () => this.handleCancel());
        }
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.handleCancel());
        }
        if (backBtn) {
            backBtn.addEventListener('click', () => App.navigateTo('home'));
        }

        // 폼 제출
        const form = document.getElementById('recipeForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        // 메인 이미지 업로드
        this.initMainImageUpload();

        // 재료 관련 이벤트
        this.initIngredientEvents();

        // 조리 단계 관련 이벤트
        this.initStepEvents();

        // 태그 선택 이벤트
        this.initTagEvents();
    },

    /**
     * 메인 이미지 업로드 초기화
     */
    initMainImageUpload() {
        const uploadArea = document.getElementById('mainImageUpload');
        const input = document.getElementById('mainImageInput');
        const removeBtn = document.getElementById('removeMainImage');

        if (uploadArea && input) {
            uploadArea.addEventListener('click', (e) => {
                if (e.target.id !== 'removeMainImage' && !e.target.closest('#removeMainImage')) {
                    input.click();
                }
            });

            input.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (file) {
                    try {
                        this.mainImage = await Utils.imageToBase64(file);
                        this.updateMainImagePreview();
                    } catch (error) {
                        console.error('이미지 업로드 실패:', error);
                        Utils.showToast('이미지 업로드에 실패했습니다.', 'error');
                    }
                }
            });
        }

        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.mainImage = null;
                this.updateMainImagePreview();
            });
        }
    },

    /**
     * 메인 이미지 프리뷰 업데이트
     */
    updateMainImagePreview() {
        const uploadArea = document.getElementById('mainImageUpload');
        if (!uploadArea) return;

        if (this.mainImage) {
            uploadArea.innerHTML = `
                <img src="${this.mainImage}" alt="대표 이미지" class="image-upload-preview">
                <button type="button" class="image-upload-remove" id="removeMainImage">✕</button>
                <input type="file" id="mainImageInput" accept="image/*">
            `;
        } else {
            uploadArea.innerHTML = `
                <span class="image-upload-icon">📷</span>
                <span class="image-upload-text">클릭하여 이미지 추가</span>
                <input type="file" id="mainImageInput" accept="image/*">
            `;
        }

        // 이벤트 재바인딩
        this.initMainImageUpload();
    },

    /**
     * 재료 관련 이벤트 초기화
     */
    initIngredientEvents() {
        const addBtn = document.getElementById('addIngredientBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addIngredient());
        }

        // 삭제 버튼 이벤트 (이벤트 위임)
        const ingredientsList = document.getElementById('ingredientsList');
        if (ingredientsList) {
            ingredientsList.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-ingredient-btn') ||
                    e.target.closest('.remove-ingredient-btn')) {
                    const row = e.target.closest('.ingredient-row');
                    const index = parseInt(row.dataset.index);
                    this.removeIngredient(index);
                }
            });

            // 입력값 변경 추적
            ingredientsList.addEventListener('input', (e) => {
                this.syncIngredients();
            });
            ingredientsList.addEventListener('change', (e) => {
                this.syncIngredients();
            });
        }
    },

    /**
     * 재료 추가
     */
    addIngredient() {
        this.syncIngredients();
        this.ingredients.push({ name: '', amount: '', unit: 'g', category: 'other' });
        this.refreshIngredientsList();
    },

    /**
     * 재료 제거
     */
    removeIngredient(index) {
        if (this.ingredients.length <= 1) return;
        this.syncIngredients();
        this.ingredients.splice(index, 1);
        this.refreshIngredientsList();
    },

    /**
     * 재료 목록 새로고침
     */
    refreshIngredientsList() {
        const ingredientsList = document.getElementById('ingredientsList');
        if (ingredientsList) {
            ingredientsList.innerHTML = this.renderIngredientInputs();
            // 삭제 버튼 상태 업데이트
            const removeButtons = ingredientsList.querySelectorAll('.remove-ingredient-btn');
            removeButtons.forEach(btn => {
                btn.disabled = this.ingredients.length <= 1;
            });
        }
    },

    /**
     * 재료 입력값 동기화
     */
    syncIngredients() {
        const rows = document.querySelectorAll('.ingredient-row');
        this.ingredients = Array.from(rows).map(row => ({
            name: row.querySelector('.ing-name')?.value || '',
            amount: row.querySelector('.ing-amount')?.value || '',
            unit: row.querySelector('.ing-unit')?.value || '',
            category: row.querySelector('.ing-category')?.value || 'other'
        }));
    },

    /**
     * 조리 단계 관련 이벤트 초기화
     */
    initStepEvents() {
        const addBtn = document.getElementById('addStepBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.addStep());
        }

        // 이벤트 위임
        const stepsList = document.getElementById('stepsList');
        if (stepsList) {
            // 삭제 버튼
            stepsList.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-step-btn') ||
                    e.target.closest('.remove-step-btn')) {
                    const row = e.target.closest('.step-row');
                    const index = parseInt(row.dataset.index);
                    this.removeStep(index);
                }

                // 단계 이미지 삭제
                if (e.target.classList.contains('remove-step-image') ||
                    e.target.closest('.remove-step-image')) {
                    const uploadArea = e.target.closest('.step-image-upload');
                    const index = parseInt(uploadArea.dataset.index);
                    this.removeStepImage(index);
                }

                // 단계 이미지 업로드 영역 클릭
                if (e.target.closest('.step-image-upload') &&
                    !e.target.classList.contains('remove-step-image') &&
                    !e.target.closest('.remove-step-image')) {
                    const uploadArea = e.target.closest('.step-image-upload');
                    const input = uploadArea.querySelector('.step-image-input');
                    if (input) input.click();
                }
            });

            // 이미지 변경
            stepsList.addEventListener('change', async (e) => {
                if (e.target.classList.contains('step-image-input')) {
                    const file = e.target.files[0];
                    const uploadArea = e.target.closest('.step-image-upload');
                    const index = parseInt(uploadArea.dataset.index);
                    if (file) {
                        await this.uploadStepImage(index, file);
                    }
                }
            });

            // 텍스트 입력 추적
            stepsList.addEventListener('input', (e) => {
                if (e.target.classList.contains('step-text')) {
                    this.syncSteps();
                }
            });

            // 드래그앤드롭 이벤트 초기화
            this.initDragAndDrop(stepsList);
        }
    },

    /**
     * 드래그앤드롭 초기화
     */
    initDragAndDrop(stepsList) {
        let draggedItem = null;

        stepsList.addEventListener('dragstart', (e) => {
            draggedItem = e.target.closest('.step-row');
            if (draggedItem) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', draggedItem.innerHTML);
                draggedItem.style.opacity = '0.4';
            }
        });

        stepsList.addEventListener('dragend', (e) => {
            if (draggedItem) {
                draggedItem.style.opacity = '1';
                draggedItem = null;
            }
        });

        stepsList.addEventListener('dragover', (e) => {
            e.preventDefault();
            const targetItem = e.target.closest('.step-row');
            if (targetItem && targetItem !== draggedItem) {
                const rect = targetItem.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;

                if (e.clientY < midY) {
                    targetItem.parentNode.insertBefore(draggedItem, targetItem);
                } else {
                    targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
                }
            }
        });

        stepsList.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedItem) {
                this.syncStepsOrder();
            }
        });
    },

    /**
     * 드래그앤드롭 후 단계 순서 동기화
     */
    syncStepsOrder() {
        const rows = document.querySelectorAll('.step-row');
        const newSteps = [];
        rows.forEach((row, index) => {
            const oldIndex = parseInt(row.dataset.index);
            if (this.steps[oldIndex]) {
                newSteps.push(this.steps[oldIndex]);
            }
        });

        this.steps = newSteps;
        this.refreshStepsList();
    },

    /**
     * 조리 단계 추가
     */
    addStep() {
        this.syncSteps();
        this.steps.push({ text: '', image: null });
        this.refreshStepsList();
    },

    /**
     * 조리 단계 제거
     */
    removeStep(index) {
        if (this.steps.length <= 1) return;
        this.syncSteps();
        this.steps.splice(index, 1);
        this.refreshStepsList();
    },

    /**
     * 조리 단계 목록 새로고침
     */
    refreshStepsList() {
        const stepsList = document.getElementById('stepsList');
        if (stepsList) {
            stepsList.innerHTML = this.renderStepInputs();
        }
    },

    /**
     * 조리 단계 입력값 동기화
     */
    syncSteps() {
        const rows = document.querySelectorAll('.step-row');
        rows.forEach((row, index) => {
            const text = row.querySelector('.step-text')?.value || '';
            if (this.steps[index]) {
                this.steps[index].text = text;
            }
        });
    },

    /**
     * 단계 이미지 업로드
     */
    async uploadStepImage(index, file) {
        try {
            const base64 = await Utils.imageToBase64(file, 600);
            this.syncSteps();
            if (this.steps[index]) {
                this.steps[index].image = base64;
            }
            this.refreshStepsList();
        } catch (error) {
            console.error('단계 이미지 업로드 실패:', error);
            Utils.showToast('이미지 업로드에 실패했습니다.', 'error');
        }
    },

    /**
     * 단계 이미지 제거
     */
    removeStepImage(index) {
        this.syncSteps();
        if (this.steps[index]) {
            this.steps[index].image = null;
        }
        this.refreshStepsList();
    },

    /**
     * 태그 선택 이벤트 초기화
     */
    initTagEvents() {
        const tagsList = document.getElementById('tagsList');
        if (tagsList) {
            tagsList.addEventListener('click', (e) => {
                const chip = e.target.closest('.chip');
                if (chip) {
                    const tag = chip.dataset.tag;
                    this.toggleTag(tag, chip);
                }
            });
        }
    },

    /**
     * 태그 토글
     */
    toggleTag(tag, element) {
        const index = this.selectedTags.indexOf(tag);
        if (index > -1) {
            this.selectedTags.splice(index, 1);
            element.classList.remove('active');
        } else {
            this.selectedTags.push(tag);
            element.classList.add('active');
        }
    },

    /**
     * 취소 처리
     */
    handleCancel() {
        if (this.isEditMode && this.recipe) {
            App.navigateTo('recipe-detail', { id: this.recipe.id });
        } else {
            App.navigateTo('recipes');
        }
    },

    /**
     * 폼 제출 처리
     */
    async handleSubmit(e) {
        e.preventDefault();

        // 입력값 동기화
        this.syncIngredients();
        this.syncSteps();

        // 폼 데이터 수집
        const title = document.getElementById('recipeTitle')?.value?.trim();
        const description = document.getElementById('recipeDescription')?.value?.trim();
        const category = document.getElementById('recipeCategory')?.value;
        const difficulty = document.getElementById('recipeDifficulty')?.value;
        const prepTime = parseInt(document.getElementById('recipePrepTime')?.value) || 0;
        const cookTime = parseInt(document.getElementById('recipeCookTime')?.value) || 0;
        const servings = parseInt(document.getElementById('recipeServings')?.value) || 1;

        // 유효성 검사
        if (!title) {
            Utils.showToast('레시피 제목을 입력해주세요.', 'error');
            document.getElementById('recipeTitle')?.focus();
            return;
        }
        if (title.length < 2) {
            Utils.showToast('레시피 제목은 2자 이상이어야 합니다.', 'error');
            document.getElementById('recipeTitle')?.focus();
            return;
        }

        if (!this.mainImage) {
            Utils.showToast('레시피 대표 이미지를 추가해주세요.', 'error');
            // Optionally, scroll to the image upload section or highlight it
            document.getElementById('mainImageUpload')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // 빈 재료/단계 필터링
        const ingredients = this.ingredients.filter(ing => ing.name.trim());
        const steps = this.steps.filter(step => step.text.trim());

        const recipeData = {
            title,
            description,
            category,
            difficulty,
            prepTime,
            cookTime,
            servings,
            image: this.mainImage,
            ingredients,
            steps,
            tags: this.selectedTags
        };

        try {
            let savedRecipe;
            if (this.isEditMode && this.recipe) {
                savedRecipe = await db.updateRecipe(this.recipe.id, recipeData);
                Utils.showToast('레시피가 수정되었습니다.', 'success');
            } else {
                savedRecipe = await db.addRecipe(recipeData);
                Utils.showToast('레시피가 저장되었습니다.', 'success');
            }

            App.navigateTo('recipe-detail', { id: savedRecipe.id });
        } catch (error) {
            console.error('레시피 저장 실패:', error);
            Utils.showToast('레시피 저장에 실패했습니다.', 'error');
        }
    }
};

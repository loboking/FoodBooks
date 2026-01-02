/**
 * FoodBooks - 재사용 가능한 UI 컴포넌트
 */

const Components = {
    /**
     * 레시피 카드 컴포넌트
     * @param {Object} recipe - 레시피 데이터
     * @param {Object} options - 옵션 (onClick, showFavorite 등)
     * @returns {string} HTML 문자열
     */
    RecipeCard(recipe, options = {}) {
        const {
            onClick = null,
            showFavorite = true,
            showMeta = true
        } = options;

        const defaultImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23f5f5f5" width="100" height="100"/%3E%3Ctext x="50" y="55" text-anchor="middle" fill="%23999" font-size="24"%3E%F0%9F%8D%BD%EF%B8%8F%3C/text%3E%3C/svg%3E';
        const image = recipe.image || defaultImage;
        const title = Utils.escapeHtml(recipe.title || '제목 없음');
        const category = Utils.getDefaultCategories().find(c => c.id === recipe.category);
        const categoryName = category ? category.name : '';
        const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
        const timeDisplay = Utils.formatTime(totalTime);
        const difficulty = Utils.getDifficultyLabel(recipe.difficulty);
        const tags = recipe.tags || [];
        const favoriteIcon = recipe.isFavorite ? '&#10084;' : '&#9825;';
        const favoriteClass = recipe.isFavorite ? 'tag-primary' : '';
        const dataId = recipe.id ? `data-recipe-id="${recipe.id}"` : '';
        const onClickAttr = onClick ? `onclick="${onClick}"` : '';

        let metaHtml = '';
        if (showMeta) {
            metaHtml = `
                <div class="recipe-card-meta">
                    ${categoryName ? `<span>${categoryName}</span>` : ''}
                    ${categoryName && timeDisplay !== '-' ? ' · ' : ''}
                    ${timeDisplay !== '-' ? `<span>${timeDisplay}</span>` : ''}
                    ${difficulty ? ` · <span>${difficulty}</span>` : ''}
                </div>
            `;
        }

        let tagsHtml = '';
        if (tags.length > 0) {
            const visibleTags = tags.slice(0, 3);
            const remainingCount = tags.length - 3;
            tagsHtml = `
                <div class="recipe-card-tags">
                    ${visibleTags.map(tag => `<span class="tag">${Utils.escapeHtml(tag)}</span>`).join('')}
                    ${remainingCount > 0 ? `<span class="tag">+${remainingCount}</span>` : ''}
                </div>
            `;
        }

        let favoriteHtml = '';
        if (showFavorite) {
            favoriteHtml = `<span class="tag ${favoriteClass}" style="position: absolute; top: 8px; right: 8px;">${favoriteIcon}</span>`;
        }

        return `
            <div class="recipe-card" ${dataId} ${onClickAttr} style="position: relative;">
                <img class="recipe-card-image" src="${image}" alt="${title}" onerror="this.src='${defaultImage}'">
                <div class="recipe-card-content">
                    <h3 class="recipe-card-title">${title}</h3>
                    ${metaHtml}
                    ${tagsHtml}
                </div>
                ${favoriteHtml}
            </div>
        `;
    },

    /**
     * 모달 다이얼로그 컴포넌트
     * @param {Object} options - 모달 옵션
     * @returns {string} HTML 문자열
     */
    Modal(options = {}) {
        const {
            id = 'modal',
            title = '',
            content = '',
            showClose = true,
            showCancel = true,
            showConfirm = true,
            cancelText = '취소',
            confirmText = '확인',
            confirmClass = 'btn-primary',
            onCancel = null,
            onConfirm = null,
            hidden = true
        } = options;

        const hiddenClass = hidden ? 'hidden' : '';
        const closeButton = showClose ? `
            <button class="icon-btn modal-close" onclick="Components.closeModal('${id}')">
                &#10005;
            </button>
        ` : '';

        const cancelButton = showCancel ? `
            <button class="btn btn-secondary" ${onCancel ? `onclick="${onCancel}"` : `onclick="Components.closeModal('${id}')"`}>
                ${cancelText}
            </button>
        ` : '';

        const confirmButton = showConfirm ? `
            <button class="btn ${confirmClass}" ${onConfirm ? `onclick="${onConfirm}"` : ''}>
                ${confirmText}
            </button>
        ` : '';

        const hasFooter = showCancel || showConfirm;

        return `
            <div id="${id}" class="modal-container ${hiddenClass}" onclick="Components.handleModalBackdropClick(event, '${id}')">
                <div class="modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2 class="modal-title">${title}</h2>
                        ${closeButton}
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${hasFooter ? `
                        <div class="modal-footer">
                            ${cancelButton}
                            ${confirmButton}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    },

    /**
     * 모달 열기
     * @param {string} modalId - 모달 ID
     */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
        }
    },

    /**
     * 모달 닫기
     * @param {string} modalId - 모달 ID
     */
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    },

    /**
     * 모달 배경 클릭 핸들러
     * @param {Event} event - 클릭 이벤트
     * @param {string} modalId - 모달 ID
     */
    handleModalBackdropClick(event, modalId) {
        if (event.target.classList.contains('modal-container')) {
            this.closeModal(modalId);
        }
    },

    /**
     * 이미지 업로드 컴포넌트
     * @param {Object} options - 옵션
     * @returns {string} HTML 문자열
     */
    ImageUpload(options = {}) {
        const {
            id = 'imageUpload',
            name = 'image',
            previewUrl = '',
            placeholder = '이미지를 업로드하세요',
            accept = 'image/*',
            onChange = null
        } = options;

        const hasPreview = !!previewUrl;
        const previewHtml = hasPreview ? `
            <img class="image-upload-preview" src="${previewUrl}" alt="미리보기">
            <button type="button" class="image-upload-remove" onclick="Components.removeImage('${id}')">
                &#10005;
            </button>
        ` : '';

        const placeholderHtml = !hasPreview ? `
            <span class="image-upload-icon">&#128247;</span>
            <span class="image-upload-text">${placeholder}</span>
        ` : '';

        const onChangeAttr = onChange ? `onchange="${onChange}"` : '';

        return `
            <div id="${id}" class="image-upload" onclick="document.getElementById('${id}-input').click()">
                ${placeholderHtml}
                ${previewHtml}
                <input type="file" id="${id}-input" name="${name}" accept="${accept}" ${onChangeAttr}>
            </div>
        `;
    },

    /**
     * 이미지 업로드 미리보기 업데이트
     * @param {string} uploadId - 업로드 컴포넌트 ID
     * @param {string} imageUrl - 이미지 URL (Base64 또는 URL)
     */
    updateImagePreview(uploadId, imageUrl) {
        const container = document.getElementById(uploadId);
        if (!container) return;

        // 기존 내용 제거
        container.innerHTML = `
            <img class="image-upload-preview" src="${imageUrl}" alt="미리보기">
            <button type="button" class="image-upload-remove" onclick="event.stopPropagation(); Components.removeImage('${uploadId}')">
                &#10005;
            </button>
            <input type="file" id="${uploadId}-input" name="image" accept="image/*">
        `;
    },

    /**
     * 이미지 삭제
     * @param {string} uploadId - 업로드 컴포넌트 ID
     */
    removeImage(uploadId) {
        const container = document.getElementById(uploadId);
        if (!container) return;

        container.innerHTML = `
            <span class="image-upload-icon">&#128247;</span>
            <span class="image-upload-text">이미지를 업로드하세요</span>
            <input type="file" id="${uploadId}-input" name="image" accept="image/*">
        `;

        // 커스텀 이벤트 발생
        container.dispatchEvent(new CustomEvent('imageRemoved', { bubbles: true }));
    },

    /**
     * 동적 리스트 입력 컴포넌트
     * @param {Object} options - 옵션
     * @returns {string} HTML 문자열
     */
    DynamicList(options = {}) {
        const {
            id = 'dynamicList',
            items = [],
            placeholder = '항목을 입력하세요',
            addButtonText = '추가',
            itemTemplate = null,
            showIndex = false,
            minItems = 0,
            maxItems = Infinity
        } = options;

        const itemsHtml = items.map((item, index) => {
            if (itemTemplate) {
                return itemTemplate(item, index, id);
            }
            return this._renderDynamicListItem(id, item, index, placeholder, showIndex, items.length <= minItems);
        }).join('');

        const canAdd = items.length < maxItems;

        return `
            <div id="${id}" class="dynamic-list" data-min-items="${minItems}" data-max-items="${maxItems}">
                <div class="dynamic-list-items">
                    ${itemsHtml}
                </div>
                ${canAdd ? `
                    <button type="button" class="btn-add-item" onclick="Components.addDynamicListItem('${id}', '${placeholder}', ${showIndex})">
                        <span>+</span> ${addButtonText}
                    </button>
                ` : ''}
            </div>
        `;
    },

    /**
     * 동적 리스트 아이템 렌더링 (내부 함수)
     */
    _renderDynamicListItem(listId, value, index, placeholder, showIndex, disableRemove) {
        const indexHtml = showIndex ? `<span class="step-number">${index + 1}</span>` : '';
        const removeDisabled = disableRemove ? 'disabled' : '';
        const escapedValue = Utils.escapeHtml(value || '');

        return `
            <div class="dynamic-list-item" data-index="${index}">
                ${indexHtml}
                <input type="text" class="form-input" value="${escapedValue}" placeholder="${placeholder}"
                    onchange="Components.updateDynamicListItem('${listId}', ${index}, this.value)">
                <button type="button" class="btn-remove icon-btn" ${removeDisabled}
                    onclick="Components.removeDynamicListItem('${listId}', ${index})">
                    &#10005;
                </button>
            </div>
        `;
    },

    /**
     * 동적 리스트에 아이템 추가
     * @param {string} listId - 리스트 ID
     * @param {string} placeholder - 플레이스홀더
     * @param {boolean} showIndex - 인덱스 표시 여부
     */
    addDynamicListItem(listId, placeholder, showIndex) {
        const container = document.getElementById(listId);
        if (!container) return;

        const itemsContainer = container.querySelector('.dynamic-list-items');
        const maxItems = parseInt(container.dataset.maxItems) || Infinity;
        const currentItems = itemsContainer.querySelectorAll('.dynamic-list-item');

        if (currentItems.length >= maxItems) return;

        const newIndex = currentItems.length;
        const minItems = parseInt(container.dataset.minItems) || 0;
        const disableRemove = currentItems.length + 1 <= minItems;

        const itemHtml = this._renderDynamicListItem(listId, '', newIndex, placeholder, showIndex, disableRemove);
        itemsContainer.insertAdjacentHTML('beforeend', itemHtml);

        // 새 입력 필드에 포커스
        const newInput = itemsContainer.lastElementChild.querySelector('input');
        if (newInput) newInput.focus();

        // 최대 개수에 도달하면 추가 버튼 숨기기
        if (currentItems.length + 1 >= maxItems) {
            const addBtn = container.querySelector('.btn-add-item');
            if (addBtn) addBtn.style.display = 'none';
        }

        // 커스텀 이벤트 발생
        container.dispatchEvent(new CustomEvent('itemAdded', { bubbles: true, detail: { index: newIndex } }));
    },

    /**
     * 동적 리스트 아이템 삭제
     * @param {string} listId - 리스트 ID
     * @param {number} index - 삭제할 인덱스
     */
    removeDynamicListItem(listId, index) {
        const container = document.getElementById(listId);
        if (!container) return;

        const itemsContainer = container.querySelector('.dynamic-list-items');
        const minItems = parseInt(container.dataset.minItems) || 0;
        const items = itemsContainer.querySelectorAll('.dynamic-list-item');

        if (items.length <= minItems) return;

        const itemToRemove = itemsContainer.querySelector(`[data-index="${index}"]`);
        if (itemToRemove) {
            itemToRemove.remove();
            this._reindexDynamicList(listId);
        }

        // 추가 버튼 다시 표시
        const maxItems = parseInt(container.dataset.maxItems) || Infinity;
        if (items.length - 1 < maxItems) {
            const addBtn = container.querySelector('.btn-add-item');
            if (addBtn) addBtn.style.display = '';
        }

        // 커스텀 이벤트 발생
        container.dispatchEvent(new CustomEvent('itemRemoved', { bubbles: true, detail: { index } }));
    },

    /**
     * 동적 리스트 아이템 업데이트
     * @param {string} listId - 리스트 ID
     * @param {number} index - 업데이트할 인덱스
     * @param {string} value - 새 값
     */
    updateDynamicListItem(listId, index, value) {
        const container = document.getElementById(listId);
        if (!container) return;

        // 커스텀 이벤트 발생
        container.dispatchEvent(new CustomEvent('itemUpdated', { bubbles: true, detail: { index, value } }));
    },

    /**
     * 동적 리스트 재인덱싱 (내부 함수)
     */
    _reindexDynamicList(listId) {
        const container = document.getElementById(listId);
        if (!container) return;

        const items = container.querySelectorAll('.dynamic-list-item');
        items.forEach((item, newIndex) => {
            item.dataset.index = newIndex;
            const stepNumber = item.querySelector('.step-number');
            if (stepNumber) {
                stepNumber.textContent = newIndex + 1;
            }
            const input = item.querySelector('input');
            if (input) {
                input.setAttribute('onchange', `Components.updateDynamicListItem('${listId}', ${newIndex}, this.value)`);
            }
            const removeBtn = item.querySelector('.btn-remove');
            if (removeBtn) {
                removeBtn.setAttribute('onclick', `Components.removeDynamicListItem('${listId}', ${newIndex})`);
            }
        });
    },

    /**
     * 동적 리스트의 모든 값 가져오기
     * @param {string} listId - 리스트 ID
     * @returns {string[]} 값 배열
     */
    getDynamicListValues(listId) {
        const container = document.getElementById(listId);
        if (!container) return [];

        const inputs = container.querySelectorAll('.dynamic-list-item input');
        return Array.from(inputs).map(input => input.value.trim()).filter(v => v);
    },

    /**
     * 필터 칩 컴포넌트
     * @param {Object} options - 옵션
     * @returns {string} HTML 문자열
     */
    FilterChips(options = {}) {
        const {
            id = 'filterChips',
            items = [],
            selectedItems = [],
            multiSelect = true,
            showAll = true,
            allText = '전체',
            onChange = null
        } = options;

        const isAllSelected = selectedItems.length === 0;

        let chipsHtml = '';
        if (showAll) {
            chipsHtml += `
                <button type="button" class="chip ${isAllSelected ? 'active' : ''}"
                    data-value=""
                    onclick="Components.handleChipClick('${id}', '', ${multiSelect})">
                    ${allText}
                </button>
            `;
        }

        chipsHtml += items.map(item => {
            const value = typeof item === 'object' ? item.id : item;
            const label = typeof item === 'object' ? (item.icon ? `${item.icon} ${item.name}` : item.name) : item;
            const isSelected = selectedItems.includes(value);

            return `
                <button type="button" class="chip ${isSelected ? 'active' : ''}"
                    data-value="${value}"
                    onclick="Components.handleChipClick('${id}', '${value}', ${multiSelect})">
                    ${label}
                </button>
            `;
        }).join('');

        const onChangeAttr = onChange ? `data-onchange="${onChange}"` : '';

        return `
            <div id="${id}" class="filter-chips" ${onChangeAttr}>
                ${chipsHtml}
            </div>
        `;
    },

    /**
     * 칩 클릭 핸들러
     * @param {string} containerId - 컨테이너 ID
     * @param {string} value - 선택된 값
     * @param {boolean} multiSelect - 다중 선택 여부
     */
    handleChipClick(containerId, value, multiSelect) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const chips = container.querySelectorAll('.chip');
        const clickedChip = container.querySelector(`[data-value="${value}"]`);

        if (!value) {
            // "전체" 선택 시 모든 선택 해제
            chips.forEach(chip => chip.classList.remove('active'));
            clickedChip.classList.add('active');
        } else if (multiSelect) {
            // 다중 선택 모드
            const allChip = container.querySelector('[data-value=""]');
            if (allChip) allChip.classList.remove('active');
            clickedChip.classList.toggle('active');

            // 선택된 항목이 없으면 "전체" 선택
            const activeChips = container.querySelectorAll('.chip.active[data-value]:not([data-value=""])');
            if (activeChips.length === 0 && allChip) {
                allChip.classList.add('active');
            }
        } else {
            // 단일 선택 모드
            chips.forEach(chip => chip.classList.remove('active'));
            clickedChip.classList.add('active');
        }

        // 커스텀 이벤트 발생
        const selectedValues = this.getSelectedChips(containerId);
        container.dispatchEvent(new CustomEvent('filterChange', {
            bubbles: true,
            detail: { values: selectedValues, lastClicked: value }
        }));

        // onChange 콜백 실행
        const onChange = container.dataset.onchange;
        if (onChange && typeof window[onChange] === 'function') {
            window[onChange](selectedValues);
        }
    },

    /**
     * 선택된 칩 값 가져오기
     * @param {string} containerId - 컨테이너 ID
     * @returns {string[]} 선택된 값 배열
     */
    getSelectedChips(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return [];

        const activeChips = container.querySelectorAll('.chip.active[data-value]:not([data-value=""])');
        return Array.from(activeChips).map(chip => chip.dataset.value);
    },

    /**
     * 인분 조절 컴포넌트
     * @param {Object} options - 옵션
     * @returns {string} HTML 문자열
     */
    ServingsControl(options = {}) {
        const {
            id = 'servingsControl',
            value = 1,
            min = 1,
            max = 20,
            unit = '인분',
            onChange = null
        } = options;

        const onChangeAttr = onChange ? `data-onchange="${onChange}"` : '';

        return `
            <div id="${id}" class="servings-control" data-min="${min}" data-max="${max}" ${onChangeAttr}>
                <button type="button" class="servings-btn" onclick="Components.decrementServings('${id}')">
                    &#8722;
                </button>
                <span class="servings-value" data-value="${value}">${value}${unit}</span>
                <button type="button" class="servings-btn" onclick="Components.incrementServings('${id}')">
                    &#43;
                </button>
            </div>
        `;
    },

    /**
     * 인분 증가
     * @param {string} controlId - 컨트롤 ID
     */
    incrementServings(controlId) {
        const container = document.getElementById(controlId);
        if (!container) return;

        const valueSpan = container.querySelector('.servings-value');
        const max = parseInt(container.dataset.max) || 20;
        let currentValue = parseInt(valueSpan.dataset.value) || 1;

        if (currentValue < max) {
            currentValue++;
            this._updateServingsDisplay(container, valueSpan, currentValue);
        }
    },

    /**
     * 인분 감소
     * @param {string} controlId - 컨트롤 ID
     */
    decrementServings(controlId) {
        const container = document.getElementById(controlId);
        if (!container) return;

        const valueSpan = container.querySelector('.servings-value');
        const min = parseInt(container.dataset.min) || 1;
        let currentValue = parseInt(valueSpan.dataset.value) || 1;

        if (currentValue > min) {
            currentValue--;
            this._updateServingsDisplay(container, valueSpan, currentValue);
        }
    },

    /**
     * 인분 표시 업데이트 (내부 함수)
     */
    _updateServingsDisplay(container, valueSpan, newValue) {
        const unitMatch = valueSpan.textContent.match(/\d+(.+)/);
        const unit = unitMatch ? unitMatch[1] : '인분';

        valueSpan.dataset.value = newValue;
        valueSpan.textContent = `${newValue}${unit}`;

        // 커스텀 이벤트 발생
        container.dispatchEvent(new CustomEvent('servingsChange', {
            bubbles: true,
            detail: { value: newValue }
        }));

        // onChange 콜백 실행
        const onChange = container.dataset.onchange;
        if (onChange && typeof window[onChange] === 'function') {
            window[onChange](newValue);
        }
    },

    /**
     * 현재 인분 값 가져오기
     * @param {string} controlId - 컨트롤 ID
     * @returns {number} 현재 인분 값
     */
    getServingsValue(controlId) {
        const container = document.getElementById(controlId);
        if (!container) return 1;

        const valueSpan = container.querySelector('.servings-value');
        return parseInt(valueSpan.dataset.value) || 1;
    },

    /**
     * 검색바 컴포넌트
     * @param {Object} options - 옵션
     * @returns {string} HTML 문자열
     */
    SearchBar(options = {}) {
        const {
            id = 'searchBar',
            placeholder = '검색어를 입력하세요',
            value = '',
            onInput = null,
            onSearch = null,
            debounceMs = 300
        } = options;

        const escapedValue = Utils.escapeHtml(value);
        const onInputAttr = onInput ? `data-oninput="${onInput}"` : '';
        const onSearchAttr = onSearch ? `data-onsearch="${onSearch}"` : '';

        return `
            <div id="${id}" class="search-bar" ${onInputAttr} ${onSearchAttr} data-debounce="${debounceMs}">
                <span class="search-icon">&#128269;</span>
                <input type="search" class="search-input"
                    placeholder="${placeholder}"
                    value="${escapedValue}"
                    oninput="Components.handleSearchInput('${id}', this.value)"
                    onkeydown="Components.handleSearchKeydown(event, '${id}')">
            </div>
        `;
    },

    /**
     * 검색 입력 핸들러
     * @param {string} searchId - 검색바 ID
     * @param {string} value - 입력값
     */
    handleSearchInput(searchId, value) {
        const container = document.getElementById(searchId);
        if (!container) return;

        const debounceMs = parseInt(container.dataset.debounce) || 300;

        // 기존 타이머 취소
        if (container._debounceTimer) {
            clearTimeout(container._debounceTimer);
        }

        // 디바운스 적용
        container._debounceTimer = setTimeout(() => {
            // 커스텀 이벤트 발생
            container.dispatchEvent(new CustomEvent('searchInput', {
                bubbles: true,
                detail: { value }
            }));

            // onInput 콜백 실행
            const onInput = container.dataset.oninput;
            if (onInput && typeof window[onInput] === 'function') {
                window[onInput](value);
            }
        }, debounceMs);
    },

    /**
     * 검색 키보드 핸들러
     * @param {Event} event - 키보드 이벤트
     * @param {string} searchId - 검색바 ID
     */
    handleSearchKeydown(event, searchId) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const container = document.getElementById(searchId);
            if (!container) return;

            const value = event.target.value;

            // 커스텀 이벤트 발생
            container.dispatchEvent(new CustomEvent('searchSubmit', {
                bubbles: true,
                detail: { value }
            }));

            // onSearch 콜백 실행
            const onSearch = container.dataset.onsearch;
            if (onSearch && typeof window[onSearch] === 'function') {
                window[onSearch](value);
            }
        }
    },

    /**
     * 검색 값 가져오기
     * @param {string} searchId - 검색바 ID
     * @returns {string} 검색 값
     */
    getSearchValue(searchId) {
        const container = document.getElementById(searchId);
        if (!container) return '';

        const input = container.querySelector('.search-input');
        return input ? input.value : '';
    },

    /**
     * 검색 값 설정
     * @param {string} searchId - 검색바 ID
     * @param {string} value - 설정할 값
     */
    setSearchValue(searchId, value) {
        const container = document.getElementById(searchId);
        if (!container) return;

        const input = container.querySelector('.search-input');
        if (input) input.value = value;
    },

    /**
     * 빈 상태 표시 컴포넌트
     * @param {Object} options - 옵션
     * @returns {string} HTML 문자열
     */
    EmptyState(options = {}) {
        const {
            icon = '&#128203;',
            title = '항목이 없습니다',
            description = '',
            actionText = '',
            onAction = null
        } = options;

        let actionHtml = '';
        if (actionText) {
            const onClickAttr = onAction ? `onclick="${onAction}"` : '';
            actionHtml = `
                <button class="btn btn-primary" ${onClickAttr}>
                    ${actionText}
                </button>
            `;
        }

        return `
            <div class="empty-state">
                <div class="empty-state-icon">${icon}</div>
                <h3 class="empty-state-title">${title}</h3>
                ${description ? `<p class="empty-state-text">${description}</p>` : ''}
                ${actionHtml}
            </div>
        `;
    },

    /**
     * 확인 모달 표시 (편의 함수)
     * @param {Object} options - 옵션
     * @returns {Promise<boolean>} 확인 여부
     */
    confirm(options = {}) {
        const {
            title = '확인',
            message = '계속하시겠습니까?',
            confirmText = '확인',
            cancelText = '취소',
            confirmClass = 'btn-primary'
        } = options;

        return new Promise((resolve) => {
            const modalId = 'confirmModal_' + Date.now();

            const modalHtml = this.Modal({
                id: modalId,
                title,
                content: `<p>${message}</p>`,
                confirmText,
                cancelText,
                confirmClass,
                hidden: false,
                onCancel: `Components._resolveConfirm('${modalId}', false)`,
                onConfirm: `Components._resolveConfirm('${modalId}', true)`
            });

            // 모달을 body에 추가
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = modalHtml;
            document.body.appendChild(tempDiv.firstElementChild);

            // resolve 함수 저장
            window['_confirmResolve_' + modalId] = resolve;
        });
    },

    /**
     * 확인 모달 결과 처리 (내부 함수)
     */
    _resolveConfirm(modalId, result) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.remove();
        }

        const resolve = window['_confirmResolve_' + modalId];
        if (resolve) {
            resolve(result);
            delete window['_confirmResolve_' + modalId];
        }
    },

    /**
     * 로딩 스피너 컴포넌트
     * @returns {string} HTML 문자열
     */
    Loading() {
        return `
            <div class="loading">
                <div class="spinner"></div>
            </div>
        `;
    },

    /**
     * 토스트 메시지 표시 (Utils.showToast 래핑)
     * @param {string} message - 메시지
     * @param {string} type - 타입 (default, success, error)
     */
    showToast(message, type = 'default') {
        Utils.showToast(message, type);
    }
};

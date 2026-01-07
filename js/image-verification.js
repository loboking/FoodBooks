        // 전역 변수 선언
        let foods = [];
        const duplicates = new Set();
        const mismatchedFoods = new Set();
        // 명백히 불일치하는 조합 (다른 종류의 음식) - 기존의 mismatchedPairs 유지
        const mismatchedPairs = [
            { foods: ['짜장면', '미역국'], reason: '짜장면에 미역국 이미지 사용' },
            { foods: ['탕수육', '불고기'], reason: '탕수육에 불고기 이미지 사용' },
            { foods: ['팟타이', '김치찌개'], reason: '팟타이에 김치찌개 이미지 사용' },
            { foods: ['김밥', '제육볶음'], reason: '김밥에 제육볶음 이미지 사용' },
            { foods: ['나시고랭', '계란말이'], reason: '나시고랭에 계란말이 이미지 사용' },
            { foods: ['토마토 미트소스 파스타', '계란말이'], reason: '파스타에 계란말이 이미지 사용' },
            { foods: ['동파육', '오징어볶음'], reason: '동파육에 오징어볶음 이미지 사용' },
            { foods: ['쫄면', '돈코츠 라멘'], reason: '쫄면에 라멘 이미지 사용' },
            { foods: ['참치김밥', '비빔밥'], reason: '참치김밥에 비빔밥 이미지 사용' },
            { foods: ['볶음밥', '계란말이'], reason: '볶음밥에 계란말이 이미지 사용' }
        ];

        // 이미지 검색 함수 (Unsplash Source API 사용)
        async function searchImages(query, count = 5) {
            const images = [];
            for (let i = 0; i < count; i++) {
                const seed = Math.random().toString(36).substring(7); // 무작위성 추가
                images.push({
                    url: `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}&sig=${seed}`,
                    source: 'Unsplash'
                });
            }
            return images;
        }

        // 검색 결과 표시
        function displaySearchResults(imageUrls) {
            searchResults.innerHTML = ''; // Clear previous results
            imageUrls.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Search result image';
                img.dataset.url = url; // Store the URL for later selection
                searchResults.appendChild(img);
            });
        }

        // Modal elements
        const verificationModal = document.getElementById('verificationModal');
        const closeButton = verificationModal.querySelector('.close-button');
        const modalCurrentImage = document.getElementById('modalCurrentImage');
        const modalCurrentTitle = document.getElementById('modalCurrentTitle');
        const imageSearchInput = document.getElementById('imageSearchInput');
        const imageSearchButton = document.getElementById('imageSearchButton');
        const searchResults = document.getElementById('searchResults');
        const modalSaveButton = document.getElementById('modalSaveButton');
        const modalCancelButton = document.getElementById('modalCancelButton');

        let currentFoodId = null; // To keep track of which food item is being verified

        // 파일 업로드 요소 (optional - may not exist in all versions)
        const imageFileInput = document.getElementById('imageFileInput');
        const pixabayLink = document.getElementById('pixabayLink');
        const pexelsLink = document.getElementById('pexelsLink');
        const unsplashLink = document.getElementById('unsplashLink');

        let selectedFileUrl = null;
        let selectedFileName = null;

        function openModal(foodId) {
            currentFoodId = foodId;
            const food = foods.find(f => f.id === foodId);
            if (!food) return;

            modalCurrentImage.src = food.image;
            modalCurrentImage.alt = food.title;
            modalCurrentTitle.textContent = `현재 이미지: ${food.title}`;
            imageSearchInput.value = food.title;

            // 검색 링크 업데이트 (if elements exist)
            if (pixabayLink && pexelsLink && unsplashLink) {
                const searchTerm = encodeURIComponent(food.title);
                pixabayLink.href = `https://pixabay.com/images/search/${searchTerm}/`;
                pexelsLink.href = `https://www.pexels.com/search/${searchTerm}/`;
                unsplashLink.href = `https://unsplash.com/s/photos/${searchTerm.replace(/%20/g, '-')}`;
            }

            // 파일 입력 초기화 (if element exists)
            if (imageFileInput) {
                imageFileInput.value = '';
                selectedFileUrl = null;
                selectedFileName = null;
            }

            searchResults.innerHTML = '';
            verificationModal.style.display = 'flex';
        }

        // 파일 선택 처리 (if element exists)
        if (imageFileInput) {
            imageFileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (!file) return;

                selectedFileName = file.name;
                const localPath = 'images/' + selectedFileName;

                // 미리보기 생성
                const reader = new FileReader();
                reader.onload = function(event) {
                    selectedFileUrl = localPath;

                    // 검색 결과에 미리보기 추가
                    searchResults.innerHTML = `
                        <div style="text-align: center; padding: 20px;">
                            <img src="${event.target.result}" alt="선택된 파일" class="selected" data-url="${localPath}" style="max-width: 200px; border: 3px solid #27ae60; border-radius: 8px;">
                            <p style="margin-top: 10px; font-weight: bold; color: #27ae60;">파일 선택됨: ${selectedFileName}</p>
                            <p style="font-size: 12px; color: #666;">경로: ${localPath}</p>
                            <p style="font-size: 11px; color: #e74c3c; margin-top: 5px;">⚠️ 이 파일을 images 폴더에 복사해주세요!</p>
                        </div>
                    `;
                };
                reader.readAsDataURL(file);
            });
        }

        function closeModal() {
            verificationModal.style.display = 'none';
            currentFoodId = null;
        }

        // 이미지 수락 함수
        async function acceptAutoDetectedImage(foodId) {
            const food = foods.find(f => f.id === foodId);
            if (food && food.autoDetectedImageUrl) {
                await db.updateRecipe(foodId, {
                    image: food.autoDetectedImageUrl,
                    imageVerified: true,
                    autoDetectedImageUrl: null, // 초기화
                    autoDetectConfidence: 0    // 초기화
                });
                Utils.showToast(`${food.title}의 AI 추천 이미지가 수락되었습니다.`, 'success');
                foods = await db.getAllRecipes(); // 데이터 갱신
                renderAllCards(); // UI 갱신
            }
        }

        // 이미지 거부 함수
        async function rejectAutoDetectedImage(foodId) {
            const food = foods.find(f => f.id === foodId);
            if (food) {
                await db.updateRecipe(foodId, {
                    imageVerified: false, // AI 추천 거부이므로 false 유지 (수동 검증 필요)
                    autoDetectedImageUrl: null, // 초기화
                    autoDetectConfidence: 0    // 초기화
                });
                Utils.showToast(`${food.title}의 AI 추천 이미지가 거부되었습니다.`, 'info');
                foods = await db.getAllRecipes(); // 데이터 갱신
                renderAllCards(); // UI 갱신
            }
        }

        // 통계 업데이트
        function updateStats() {
            const totalFoods = foods.length;
            const verifiedImages = foods.filter(food => food.imageVerified).length;
            const needsVerification = foods.filter(food => !food.imageVerified && (food.autoDetectedImageUrl || duplicates.has(food.id) || mismatchedFoods.has(food.id))).length;

            document.getElementById('total').textContent = totalFoods;
            document.getElementById('verifiedCount').textContent = verifiedImages;
            document.getElementById('needsVerificationCount').textContent = needsVerification;
            document.getElementById('duplicateCount').textContent = duplicates.size;
            document.getElementById('mismatchCount').textContent = mismatchedFoods.size;
        }

        // 카드 렌더링 함수
        function renderCard(food) {
            const isDuplicate = duplicates.has(food.id);
            const isMismatch = mismatchedFoods.has(food.id);
            const isVerified = food.imageVerified;

            let badges = '';
            if (isDuplicate) badges += '<span class="card-badge badge-duplicate">중복</span>';
            if (isMismatch) badges += '<span class="card-badge badge-mismatch">불일치 의심</span>';
            if (food.autoDetectedImageUrl && !isVerified) badges += `<span class="card-badge badge-auto-suggest">AI 추천 (${food.autoDetectConfidence}%)</span>`;
            if (isVerified) badges += '<span class="card-badge badge-verified">검증됨</span>';

            let duplicateInfo = '';
            if (isDuplicate) { // 중복 그룹 정보 표시
                const duplicateGroup = foods.filter(f => f.image === food.image && f.id !== food.id);
                if (duplicateGroup.length > 0) {
                    const others = duplicateGroup.map(f => f.title).join(', ');
                    duplicateInfo = `<div class="duplicate-group">동일 이미지: ${others}</div>`;
                }
            }

            // 새로운 자동 감지 이미지 섹션 추가
            let autoDetectSection = '';
            if (food.autoDetectedImageUrl && !isVerified) { // 검증되지 않은 경우에만 추천 표시
                autoDetectSection = `
                    <div class="auto-detect-section">
                        <h4>AI 추천 이미지 (신뢰도: ${food.autoDetectConfidence}%)</h4>
                        <img src="${food.autoDetectedImageUrl}" alt="${food.title} 추천 이미지" class="auto-detected-image" loading="lazy">
                        <div class="auto-detect-actions">
                            <button class="action-button accept-auto" data-id="${food.id}">이 이미지 수락</button>
                            <button class="action-button reject-auto" data-id="${food.id}">이 이미지 거부</button>
                        </div>
                    </div>
                `;
            }

            return `
                <div class="card ${isDuplicate ? 'duplicate' : ''} ${isMismatch ? 'mismatch' : ''} ${isVerified ? 'verified' : ''} ${food.autoDetectedImageUrl && !isVerified ? 'auto-suggested' : ''}" data-id="${food.id}">
                    <img src="${food.image}" alt="${food.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Error'">
                    <div class="card-body">
                        <div class="card-title">${food.title}</div>
                        <div class="card-description">${food.description || 'N/A'}</div>
                        ${badges}
                        ${duplicateInfo}
                        ${autoDetectSection}
                        <div class="image-url">현재 URL: ${food.image}</div>
                        ${(isDuplicate || isMismatch || (food.autoDetectedImageUrl && !isVerified)) ? `<button class="verify-button" data-id="${food.id}">이미지 검증 / 수동 선택</button>` : (isVerified ? '' : `<button class="verify-button" data-id="${food.id}">이미지 검증 / 수동 선택</button>`)}
                    </div>
                </div>
            `;
        }

        // 모든 카드를 렌더링하는 함수
        function renderAllCards() {
            const grid = document.getElementById('grid');
            grid.innerHTML = ''; // 기존 카드 모두 삭제

            // 중복 및 불일치 재분석 (foods 배열이 업데이트되었을 수 있으므로)
            const imageMap = {};
            duplicates.clear();
            mismatchedFoods.clear();

            foods.forEach((food) => { // food에 id가 추가되었으므로 idx 대신 id를 사용
                const imageId = food.image.split('/').pop().split('?')[0]; // URL에서 파일명 부분만 추출
                if (!imageMap[imageId]) {
                    imageMap[imageId] = [];
                }
                imageMap[imageId].push({ id: food.id, title: food.title });
            });

            Object.keys(imageMap).forEach(imageId => {
                if (imageMap[imageId].length > 1) {
                    imageMap[imageId].forEach(foodInMap => {
                        duplicates.add(foodInMap.id);
                    });
                }
            });

            // 불일치 의심 항목 확인 (하드코딩된 mismatchedPairs는 임시로 사용)
            // 실제 구현에서는 AI/규칙 기반으로 더 동적으로 판단해야 함
            mismatchedPairs.forEach(pair => {
                foods.forEach(food => {
                    const foodName = food.title;
                    if (pair.foods.includes(foodName)) {
                        mismatchedFoods.add(food.id);
                    }
                });
            });

            foods.forEach(food => {
                grid.innerHTML += renderCard(food);
            });
            updateStats();
        }

        const grid = document.getElementById('grid'); // grid는 여기에 선언되어야 함

        // '이미지 검증' 버튼 및 자동 감지 액션 버튼 클릭 이벤트 처리
        grid.addEventListener('click', async (event) => {
            if (event.target.classList.contains('verify-button')) {
                const foodId = event.target.dataset.id;
                openModal(foodId);
            } else if (event.target.classList.contains('accept-auto')) {
                const foodId = event.target.dataset.id;
                await acceptAutoDetectedImage(foodId);
            } else if (event.target.classList.contains('reject-auto')) {
                const foodId = event.target.dataset.id;
                await rejectAutoDetectedImage(foodId);
            }
        });

        // 모달 닫기 버튼 이벤트
        closeButton.addEventListener('click', closeModal);

        // 모달 취소 버튼 이벤트
        modalCancelButton.addEventListener('click', closeModal);

        // 모달 외부 클릭 시 닫기
        window.addEventListener('click', (event) => {
            if (event.target === verificationModal) {
                closeModal();
            }
        });

        // 이미지 검색 버튼 클릭 이벤트
        imageSearchButton.addEventListener('click', async () => {
            const query = imageSearchInput.value;
            if (query) {
                const images = await searchImages(query);
                displaySearchResults(images.map(img => img.url)); // URL만 추출하여 전달
            }
        });

        // 검색 결과 이미지 선택 이벤트
        searchResults.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                const currentlySelected = searchResults.querySelector('.selected');
                if (currentlySelected) {
                    currentlySelected.classList.remove('selected');
                }
                event.target.classList.add('selected');
            }
        });

        // 모달 저장 버튼 이벤트
        modalSaveButton.addEventListener('click', async () => { // async 추가
            const selectedImage = searchResults.querySelector('img.selected');
            if (selectedImage && currentFoodId) { // currentFoodId 확인
                const newImageUrl = selectedImage.dataset.url || selectedImage.src; // dataset.url이 없으면 src 사용
                if (foods.find(f => f.id === currentFoodId)) {
                    await db.updateRecipe(currentFoodId, { // db.updateRecipe 사용
                        image: newImageUrl,
                        imageVerified: true,
                        autoDetectedImageUrl: null, // 수동 선택했으므로 자동 감지 정보 초기화
                        autoDetectConfidence: 0
                    });
                    Utils.showToast(`${foods.find(f => f.id === currentFoodId).title} 이미지가 업데이트 및 검증되었습니다.`, 'success');
                    foods = await db.getAllRecipes(); // 데이터 갱신
                    renderAllCards(); // UI 갱신
                }
            } else if (currentFoodId) { // 이미지를 선택하지 않고 저장 버튼을 누른 경우
                await db.updateRecipe(currentFoodId, {
                    imageVerified: true // 수동으로 검증했다고 표시 (이미지 변경 없음)
                });
                Utils.showToast(`${foods.find(f => f.id === currentFoodId).title} 이미지가 수동 검증되었습니다.`, 'info');
                foods = await db.getAllRecipes(); // 데이터 갱신
                renderAllCards(); // UI 갱신
            }
            closeModal();
        });

        // 초기화 함수 (모든 로직을 담을)
        async function init() {
            // 데이터베이스 초기화 및 레시피 데이터 가져오기
            await db.init();
            foods = await db.getAllRecipes();

            // 모든 레시피의 현재 이미지 URL을 후보 목록에 포함
            const existingImageUrls = foods.map(food => food.image).filter(url => url);

            // 일반적인 음식 이미지를 위한 광범위한 검색 (자동 감지를 위한 후보 풀 생성)
            const genericImageCandidates = await searchImages("food cuisine", 10); // 10개의 일반 이미지 후보
            const genericImageUrls = genericImageCandidates.map(img => img.url);

            // 모든 후보 이미지 URL 결합
            const allCandidateImageUrls = [...new Set([...existingImageUrls, ...genericImageUrls])];

            // Utils가 정의되었는지 확인
            if (typeof Utils === 'undefined') {
                console.error("Utils 객체를 찾을 수 없습니다. js/utils.js가 올바르게 로드되었는지 확인하세요.");
                return;
            }

            // 자동 매칭 로직 적용
            const autoMatches = Utils.findMatchingImages(foods, allCandidateImageUrls.map(img => img.url || img));

            // 자동 매칭 결과를 데이터베이스에 저장
            for (const match of autoMatches) {
                const recipeToUpdate = foods.find(f => f.id === match.recipeId);
                if (recipeToUpdate) {
                    if (!recipeToUpdate.autoDetectedImageUrl || match.confidence > (recipeToUpdate.autoDetectConfidence || 0) || match.matchedImageUrl !== recipeToUpdate.autoDetectedImageUrl) {
                         await db.updateRecipe(match.recipeId, {
                            autoDetectedImageUrl: match.matchedImageUrl,
                            autoDetectConfidence: match.confidence
                        });
                    }
                }
            }
            // 업데이트된 레시피 데이터 다시 로드 (UI 갱신을 위해)
            foods = await db.getAllRecipes();

            // UI 렌더링 시작
            renderAllCards();
        }

        // 페이지 로드 시 초기화 함수 실행
        init();

        // seed-data.js에서 레시피 데이터 가져오기
        const foods = SeedData.recipes;

        // 중복 이미지 및 불일치 의심 항목 분석
        const imageMap = {};
        const duplicates = new Set();

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

        foods.forEach((food, idx) => {
            const imageId = food.image.split('/').pop().split('?')[0];
            if (!imageMap[imageId]) {
                imageMap[imageId] = [];
            }
            imageMap[imageId].push({ title: food.title, image: food.image, line: food.line, idx });
        });

        Object.keys(imageMap).forEach(imageId => {
            if (imageMap[imageId].length > 1) {
                imageMap[imageId].forEach(food => {
                    duplicates.add(food.idx);
                });
            }
        });

        // 불일치 의심 항목 확인
        const mismatchedFoods = new Set();
        mismatchedPairs.forEach(pair => {
            foods.forEach((food, idx) => {
                // foods 객체가 image 속성만 가지고 있다면 image 필드를 비교하고,
                // title 속성을 가지고 있다면 title 필드를 비교
                const foodName = food.title;
                if (pair.foods.includes(foodName)) {
                    mismatchedFoods.add(idx);
                }
            });
        });

        // 통계 업데이트
        document.getElementById('total').textContent = foods.length;
        document.getElementById('duplicateCount').textContent = duplicates.size;
        document.getElementById('mismatchCount').textContent = mismatchedFoods.size;

        // 카드 렌더링
        const grid = document.getElementById('grid');

        foods.forEach((food, idx) => {
            const isDuplicate = duplicates.has(idx);
            const isMismatch = mismatchedFoods.has(idx);
            const imageId = food.image.split('/').pop().split('?')[0];
            const duplicateGroup = imageMap[imageId];

            const card = document.createElement('div');
            card.className = `card ${isDuplicate ? 'duplicate' : ''} ${isMismatch ? 'mismatch' : ''}`;
            card.dataset.type = isDuplicate ? 'duplicate' : (isMismatch ? 'mismatch' : 'normal');

            let badges = '';
            if (isDuplicate) badges += '<span class="card-badge badge-duplicate">중복</span>';
            if (isMismatch) badges += '<span class="card-badge badge-mismatch">불일치 의심</span>';

            let duplicateInfo = '';
            if (isDuplicate && duplicateGroup.length > 1) {
                const others = duplicateGroup.filter(f => f.idx !== idx).map(f => f.title).join(', ');
                duplicateInfo = `<div class="duplicate-group">동일 이미지: ${others}</div>`;
            }

            card.innerHTML = `
                <img src="${food.image}" alt="${food.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Error'">
                <div class="card-body">
                    <div class="card-title">${food.title}</div>
                    <div class="card-line">Description: ${food.description || 'N/A'}</div>
                    ${badges}
                    ${duplicateInfo}
                    <div class="image-url">${food.image}</div>
                    ${(isDuplicate || isMismatch) ? `<button class="verify-button" data-idx="${idx}">이미지 검증</button>` : ''}
                </div>
            `;

            grid.appendChild(card);
        });

        // 필터 기능
        function filterCards(type) {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (type === 'all') {
                    card.classList.remove('hidden');
                } else if (type === 'duplicate') {
                    card.classList.toggle('hidden', card.dataset.type !== 'duplicate');
                } else if (type === 'mismatch') {
                    card.classList.toggle('hidden', !card.classList.contains('mismatch'));
                }
            });
        }

        // Mock image search function (replace with actual API call later)
        async function searchImages(query) {
            console.log(`Searching for images with query: ${query}`);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Dummy image results (replace with actual API results)
            const dummyImages = [
                `https://via.placeholder.com/150/FF0000/FFFFFF?text=${query}+1`,
                `https://via.placeholder.com/150/00FF00/000000?text=${query}+2`,
                `https://via.placeholder.com/150/0000FF/FFFFFF?text=${query}+3`,
                `https://via.placeholder.com/150/FFFF00/000000?text=${query}+4`,
                `https://via.placeholder.com/150/FF00FF/FFFFFF?text=${query}+5`,
                `https://via.placeholder.com/150/00FFFF/000000?text=${query}+6`,
            ];
            return dummyImages;
        }

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

        let currentFoodIdx = -1; // To keep track of which food item is being verified

        // 파일 업로드 요소
        const imageFileInput = document.getElementById('imageFileInput');
        const pixabayLink = document.getElementById('pixabayLink');
        const pexelsLink = document.getElementById('pexelsLink');
        const unsplashLink = document.getElementById('unsplashLink');

        let selectedFileUrl = null;
        let selectedFileName = null;

        function openModal(foodIdx) {
            currentFoodIdx = foodIdx;
            const food = foods[foodIdx];

            modalCurrentImage.src = food.image;
            modalCurrentImage.alt = food.title;
            modalCurrentTitle.textContent = `현재 이미지: ${food.title}`;
            imageSearchInput.value = food.title; // Pre-fill search input with food title

            // 검색 링크 업데이트
            const searchTerm = encodeURIComponent(food.title);
            pixabayLink.href = `https://pixabay.com/images/search/${searchTerm}/`;
            pexelsLink.href = `https://www.pexels.com/search/${searchTerm}/`;
            unsplashLink.href = `https://unsplash.com/s/photos/${searchTerm.replace(/%20/g, '-')}`;

            // 파일 입력 초기화
            imageFileInput.value = '';
            selectedFileUrl = null;
            selectedFileName = null;

            searchResults.innerHTML = ''; // Clear previous search results
            verificationModal.style.display = 'flex'; // Use flex to center the modal
        }

        // 파일 선택 처리
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

        function closeModal() {
            verificationModal.style.display = 'none';
            currentFoodIdx = -1;
        }

        // '이미지 검증' 버튼 클릭 이벤트 처리
        grid.addEventListener('click', (event) => {
            if (event.target.classList.contains('verify-button')) {
                const foodIdx = parseInt(event.target.dataset.idx);
                openModal(foodIdx);
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
                displaySearchResults(images);
            }
        });

        // 검색 결과 이미지 선택 이벤트
        searchResults.addEventListener('click', (event) => {
            if (event.target.tagName === 'IMG') {
                // Remove 'selected' class from previously selected images
                const currentlySelected = searchResults.querySelector('.selected');
                if (currentlySelected) {
                    currentlySelected.classList.remove('selected');
                }
                // Add 'selected' class to the clicked image
                event.target.classList.add('selected');
                // You can store the selected image URL in a variable here if needed
            }
        });

        // 모달 저장 버튼 이벤트
        modalSaveButton.addEventListener('click', () => {
            const selectedImage = searchResults.querySelector('img.selected');
            if (selectedImage) {
                const newImageUrl = selectedImage.dataset.url;
                if (currentFoodIdx !== -1 && foods[currentFoodIdx]) {
                    // Update the data
                    foods[currentFoodIdx].image = newImageUrl;

                    // Update the card in the main grid
                    const cardToUpdate = grid.querySelector(`.card:nth-child(${currentFoodIdx + 1})`);
                    if (cardToUpdate) {
                        cardToUpdate.querySelector('img').src = newImageUrl;
                        cardToUpdate.querySelector('.image-url').textContent = newImageUrl;
                        // Optionally, remove duplicate/mismatch badges if fixed
                        // cardToUpdate.classList.remove('duplicate', 'mismatch');
                        // cardToUpdate.dataset.type = 'normal';
                        // cardToUpdate.querySelector('.card-badge.badge-duplicate')?.remove();
                        // cardToUpdate.querySelector('.card-badge.badge-mismatch')?.remove();
                    }
                    console.log(`Food item ${foods[currentFoodIdx].title} updated with new image: ${newImageUrl}`);
                }
            }
            closeModal();
        });
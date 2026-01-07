/**
 * FoodBooks - 유틸리티 함수
 */

const Utils = {
    /**
     * 토스트 메시지 표시
     */
    showToast(message, type = 'default') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    /**
     * 시간 포맷 (분 → 시간/분)
     */
    formatTime(minutes) {
        if (!minutes) return '-';
        if (minutes < 60) return `${minutes}분`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}시간 ${mins}분` : `${hours}시간`;
    },

    /**
     * 날짜 포맷
     */
    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    /**
     * 상대적 시간 표시 (예: "3일 전")
     */
    formatRelativeTime(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) return this.formatDate(dateString);
        if (days > 0) return `${days}일 전`;
        if (hours > 0) return `${hours}시간 전`;
        if (minutes > 0) return `${minutes}분 전`;
        return '방금 전';
    },

    /**
     * 이미지를 Base64로 변환
     */
    async imageToBase64(file, maxWidth = 800) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // 리사이즈
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    resolve(canvas.toDataURL('image/jpeg', 0.8));
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    /**
     * 난이도 라벨
     */
    getDifficultyLabel(difficulty) {
        const labels = {
            easy: '쉬움',
            medium: '보통',
            hard: '어려움'
        };
        return labels[difficulty] || difficulty;
    },

    /**
     * 기본 카테고리 목록
     */
    getDefaultCategories() {
        return [
            { id: 'korean', name: '한식', icon: '🍚', country: '한국' },
            { id: 'chinese', name: '중식', icon: '🍜', country: '중국' },
            { id: 'japanese', name: '일식', icon: '🍣', country: '일본' },
            { id: 'western', name: '양식', icon: '🍝', country: '서양' },
            { id: 'southeast_asian', name: '동남아', icon: '🥢', country: '동남아시아' },
            { id: 'indian', name: '인도식', icon: '🍛', country: '인도' },
            { id: 'mexican', name: '멕시코', icon: '🌮', country: '멕시코' },
            { id: 'bunsik', name: '분식', icon: '🍢', country: '한국' },
            { id: 'dessert', name: '디저트', icon: '🍰', country: null },
            { id: 'drink', name: '음료', icon: '🥤', country: null },
            { id: 'other', name: '기타', icon: '🍽️', country: null }
        ];
    },

    /**
     * 카테고리별 서브카테고리 목록
     */
    getSubcategories(categoryId) {
        const subcategories = {
            korean: [
                { id: '찌개/국', name: '찌개/국', icon: '🍲' },
                { id: '볶음/구이', name: '볶음/구이', icon: '🍳' },
                { id: '밥/면', name: '밥/면', icon: '🍚' },
                { id: '반찬', name: '반찬', icon: '🥗' },
                { id: '전/부침', name: '전/부침', icon: '🥞' },
                { id: '찜', name: '찜', icon: '🫕' },
                { id: '무침', name: '무침', icon: '🥬' }
            ],
            chinese: [
                { id: '면/밥', name: '면/밥', icon: '🍜' },
                { id: '튀김', name: '튀김', icon: '🍤' },
                { id: '볶음', name: '볶음', icon: '🥘' },
                { id: '딤섬', name: '딤섬', icon: '🥟' },
                { id: '찜', name: '찜', icon: '🫕' }
            ],
            japanese: [
                { id: '튀김', name: '튀김', icon: '🍤' },
                { id: '덮밥', name: '덮밥', icon: '🍛' },
                { id: '면', name: '면', icon: '🍜' },
                { id: '초밥', name: '초밥', icon: '🍣' },
                { id: '구이', name: '구이', icon: '🍢' }
            ],
            western: [
                { id: '파스타', name: '파스타', icon: '🍝' },
                { id: '스테이크', name: '스테이크', icon: '🥩' },
                { id: '밥', name: '밥', icon: '🍚' },
                { id: '샐러드', name: '샐러드', icon: '🥗' },
                { id: '수프', name: '수프', icon: '🍲' },
                { id: '피자', name: '피자', icon: '🍕' },
                { id: '버거', name: '버거', icon: '🍔' }
            ],
            southeast_asian: [
                { id: '면', name: '면', icon: '🍜' },
                { id: '밥', name: '밥', icon: '🍚' },
                { id: '볶음', name: '볶음', icon: '🥘' },
                { id: '국물', name: '국물', icon: '🍲' }
            ],
            indian: [
                { id: '카레', name: '카레', icon: '🍛' },
                { id: '빵', name: '빵', icon: '🫓' },
                { id: '밥', name: '밥', icon: '🍚' },
                { id: '탄두리', name: '탄두리', icon: '🍗' }
            ],
            mexican: [
                { id: '타코', name: '타코', icon: '🌮' },
                { id: '부리토', name: '부리토', icon: '🌯' },
                { id: '나초', name: '나초', icon: '🧀' },
                { id: '밥', name: '밥', icon: '🍚' }
            ],
            bunsik: [
                { id: '떡볶이', name: '떡볶이', icon: '🍢' },
                { id: '튀김', name: '튀김', icon: '🍤' },
                { id: '김밥', name: '김밥', icon: '🍙' },
                { id: '면', name: '면', icon: '🍜' }
            ],
            dessert: [
                { id: '빵', name: '빵', icon: '🥐' },
                { id: '케이크', name: '케이크', icon: '🍰' },
                { id: '과일', name: '과일', icon: '🍓' },
                { id: '아이스크림', name: '아이스크림', icon: '🍦' }
            ],
            drink: [
                { id: '스무디', name: '스무디', icon: '🥤' },
                { id: '주스', name: '주스', icon: '🧃' },
                { id: '커피', name: '커피', icon: '☕' },
                { id: '차', name: '차', icon: '🍵' }
            ],
            other: [
                { id: '간식', name: '간식', icon: '🍿' },
                { id: '소스', name: '소스', icon: '🫙' }
            ]
        };
        return subcategories[categoryId] || [];
    },

    /**
     * 기본 태그 목록
     */
    getDefaultTags() {
        return [
            '간단', '매운', '달콤', '건강', '다이어트',
            '채식', '아침', '점심', '저녁', '야식',
            '손님상', '도시락', '일품요리', '반찬', '국물'
        ];
    },

    /**
     * 재료 카테고리 목록
     */
    getIngredientCategories() {
        return [
            { id: 'vegetables', name: '채소', icon: '🥬' },
            { id: 'meat', name: '육류', icon: '🥩' },
            { id: 'seafood', name: '해산물', icon: '🐟' },
            { id: 'dairy', name: '유제품', icon: '🧈' },
            { id: 'grain', name: '곡류', icon: '🌾' },
            { id: 'seasoning', name: '양념', icon: '🧂' },
            { id: 'other', name: '기타', icon: '📦' }
        ];
    },

    /**
     * 단위 변환
     */
    convertUnit(amount, fromUnit, toUnit) {
        const conversions = {
            // 무게
            'g_kg': 0.001,
            'kg_g': 1000,
            'g_oz': 0.03527,
            'oz_g': 28.35,
            // 부피
            'ml_l': 0.001,
            'l_ml': 1000,
            'ml_cup': 0.00423,
            'cup_ml': 236.59,
            'tbsp_ml': 15,
            'ml_tbsp': 0.0667,
            'tsp_ml': 5,
            'ml_tsp': 0.2
        };

        const key = `${fromUnit}_${toUnit}`;
        if (conversions[key]) {
            return amount * conversions[key];
        }
        return amount;
    },

    /**
     * 인분에 따른 재료량 계산
     */
    calculateIngredientAmount(amount, originalServings, newServings) {
        if (!amount || !originalServings || !newServings) return amount;
        return (amount * newServings) / originalServings;
    },

    /**
     * 타이머 포맷 (초 → MM:SS)
     */
    formatTimer(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * 텍스트에서 시간 추출 (예: "10분간 끓인다" → 10)
     */
    extractTimeFromText(text) {
        const match = text.match(/(\d+)\s*(분|시간)/);
        if (match) {
            const value = parseInt(match[1]);
            const unit = match[2];
            return unit === '시간' ? value * 60 : value;
        }
        return null;
    },

    /**
     * 디바운스 함수
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * HTML 이스케이프
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * JSON 파일 다운로드
     */
    downloadJson(data, filename) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    /**
     * 파일 읽기
     */
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    },

    /**
     * 클립보드에 복사
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            // 폴백: 구형 방식
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        }
    },

    /**
     * 쇼핑리스트 텍스트 생성
     */
    generateShoppingListText(items) {
        let text = '🛒 쇼핑리스트\n';
        text += '─'.repeat(20) + '\n\n';

        // 카테고리별 그룹핑
        const categories = this.getIngredientCategories();
        const grouped = {};

        items.forEach(item => {
            const category = item.category || 'other';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(item);
        });

        categories.forEach(cat => {
            if (grouped[cat.id] && grouped[cat.id].length > 0) {
                text += `${cat.icon} ${cat.name}\n`;
                grouped[cat.id].forEach(item => {
                    text += `  ☐ ${item.name} ${item.amount}${item.unit}\n`;
                });
                text += '\n';
            }
        });

        text += '─'.repeat(20) + '\n';
        text += 'FoodBooks에서 생성됨';

        return text;
    },

    /**
     * 레시피와 이미지 URL 자동 매칭
     * @param {Array<Object>} recipes - 레시피 목록 (각 레시피는 'title'과 'id'를 가짐)
     * @param {Array<string>} candidateImageUrls - 검증할 이미지 URL 목록
     * @returns {Array<Object>} 매칭된 레시피-이미지 쌍 목록 (recipeId, recipeTitle, matchedImageUrl, confidence)
     */
    findMatchingImages(recipes, candidateImageUrls) {
        const matches = [];

        recipes.forEach(recipe => {
            const recipeTitleLower = recipe.title.toLowerCase().replace(/\s/g, ''); // 공백 제거
            const recipeId = recipe.id; // 레시피 ID

            let bestMatchUrl = null;
            let maxScore = 0; // 매칭 점수

            candidateImageUrls.forEach(imageUrl => {
                const imageUrlLower = imageUrl.toLowerCase();
                let currentScore = 0;

                // 1. URL에 레시피 제목이 포함되어 있는지 확인 (단어 단위 또는 부분 문자열)
                if (imageUrlLower.includes(recipeTitleLower)) {
                    currentScore += 10; // 높은 점수
                } else {
                    // 제목의 키워드를 분리하여 매칭 시도 (예: "김치찌개" -> "김치", "찌개")
                    const keywords = recipeTitleLower.split(/[\s_-]+/);
                    keywords.forEach(keyword => {
                        if (keyword.length > 1 && imageUrlLower.includes(keyword)) {
                            currentScore += 2;
                        }
                    });
                }


                // 2. URL에 레시피 ID가 포함되어 있는지 확인 (정확한 ID 매칭)
                // 현재 seed-data의 이미지 URL은 범용 Unsplash 링크라 ID 매칭은 어려울 수 있음.
                // 만약 이미지 URL 규칙이 '.../recipe_<ID>.jpg' 형태라면 유용
                if (recipeId && imageUrlLower.includes(recipeId.toLowerCase())) {
                    currentScore += 5; // ID 매칭은 제목만큼 중요하지 않을 수 있음, 또는 높은 점수 부여 가능
                }

                if (currentScore > maxScore) {
                    maxScore = currentScore;
                    bestMatchUrl = imageUrl;
                }
            });

            if (bestMatchUrl && maxScore > 0) { // 최소한의 매칭 점수가 있을 때만 추가
                matches.push({
                    recipeId: recipe.id,
                    recipeTitle: recipe.title,
                    currentImageUrl: recipe.image, // 기존 이미지 URL
                    matchedImageUrl: bestMatchUrl,
                    confidence: maxScore,
                    verified: recipe.imageVerified // 기존 imageVerified 상태
                });
            }
        });
        return matches;
    }
};

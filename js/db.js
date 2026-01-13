/**
 * FoodBooks - IndexedDB 데이터베이스 관리
 */

const DB_NAME = 'FoodBooksDB';
const DB_VERSION = 3;

class FoodBooksDB {
    constructor() {
        this.db = null;
    }

    /**
     * 데이터베이스 초기화
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // 레시피 저장소
                if (!db.objectStoreNames.contains('recipes')) {
                    const recipeStore = db.createObjectStore('recipes', { keyPath: 'id' });
                    recipeStore.createIndex('title', 'title', { unique: false });
                    recipeStore.createIndex('category', 'category', { unique: false });
                    recipeStore.createIndex('createdAt', 'createdAt', { unique: false });
                    recipeStore.createIndex('isFavorite', 'isFavorite', { unique: false });
                    recipeStore.createIndex('isVerified', 'isVerified', { unique: false });
                    recipeStore.createIndex('imageVerified', 'imageVerified', { unique: false });
                    // 새로운 필드에 대한 인덱스 추가
                    recipeStore.createIndex('autoDetectedImageUrl', 'autoDetectedImageUrl', { unique: false });
                    recipeStore.createIndex('autoDetectConfidence', 'autoDetectConfidence', { unique: false });
                } else {
                    // 기존 저장소에 새로운 인덱스를 추가하는 경우
                    const recipeStore = event.target.transaction.objectStore('recipes');
                    if (!recipeStore.indexNames.contains('autoDetectedImageUrl')) {
                        recipeStore.createIndex('autoDetectedImageUrl', 'autoDetectedImageUrl', { unique: false });
                    }
                    if (!recipeStore.indexNames.contains('autoDetectConfidence')) {
                        recipeStore.createIndex('autoDetectConfidence', 'autoDetectConfidence', { unique: false });
                    }
                }

                // 쇼핑리스트 저장소
                if (!db.objectStoreNames.contains('shoppingList')) {
                    const shoppingStore = db.createObjectStore('shoppingList', { keyPath: 'id' });
                    shoppingStore.createIndex('recipeId', 'recipeId', { unique: false });
                }

                // 설정 저장소
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }

                // 카테고리 저장소
                if (!db.objectStoreNames.contains('categories')) {
                    db.createObjectStore('categories', { keyPath: 'id' });
                }

                // 리뷰 저장소 (새로 추가)
                if (!db.objectStoreNames.contains('reviews')) {
                    const reviewStore = db.createObjectStore('reviews', { keyPath: 'id' });
                    reviewStore.createIndex('recipeId', 'recipeId', { unique: false });
                    reviewStore.createIndex('createdAt', 'createdAt', { unique: false });
                } else {
                    // 기존 스토어에 새로운 인덱스 추가
                    const reviewStore = event.target.transaction.objectStore('reviews');
                    if (!reviewStore.indexNames.contains('recipeId')) {
                        reviewStore.createIndex('recipeId', 'recipeId', { unique: false });
                    }
                    if (!reviewStore.indexNames.contains('createdAt')) {
                        reviewStore.createIndex('createdAt', 'createdAt', { unique: false });
                    }
                }

                // recipes 스토어에 새로운 인덱스 추가 (별점 관련)
                const recipeStore = event.target.transaction.objectStore('recipes');
                if (!recipeStore.indexNames.contains('averageRating')) {
                    recipeStore.createIndex('averageRating', 'averageRating', { unique: false });
                }
            };
        });
    }

    /**
     * 레시피 추가
     */
    async addRecipe(recipe) {
        const id = this.generateId();
        const now = new Date().toISOString();
        const newRecipe = {
            id,
            ...recipe,
            createdAt: now,
            updatedAt: now,
            isFavorite: false,
            rating: 0,
            cookCount: 0,
            lastCooked: null,
            isVerified: false,
            imageVerified: false,
            autoDetectedImageUrl: null, // New field
            autoDetectConfidence: 0    // New field
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['recipes'], 'readwrite');
            const store = transaction.objectStore('recipes');
            const request = store.add(newRecipe);

            request.onsuccess = () => resolve(newRecipe);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 레시피 수정
     */
    async updateRecipe(id, updates) {
        const recipe = await this.getRecipe(id);
        if (!recipe) {
            throw new Error('Recipe not found');
        }

        const updatedRecipe = {
            ...recipe,
            ...updates,
            updatedAt: new Date().toISOString()
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['recipes'], 'readwrite');
            const store = transaction.objectStore('recipes');
            const request = store.put(updatedRecipe);

            request.onsuccess = () => resolve(updatedRecipe);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 레시피 삭제
     */
    async deleteRecipe(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['recipes'], 'readwrite');
            const store = transaction.objectStore('recipes');
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 레시피 조회 (단일)
     */
    async getRecipe(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['recipes'], 'readonly');
            const store = transaction.objectStore('recipes');
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 모든 레시피 조회
     */
    async getAllRecipes() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['recipes'], 'readonly');
            const store = transaction.objectStore('recipes');
            const request = store.getAll();

            request.onsuccess = () => {
                const recipes = request.result || [];
                // 최신순 정렬
                recipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                resolve(recipes);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 즐겨찾기 레시피 조회
     */
    async getFavoriteRecipes() {
        const recipes = await this.getAllRecipes();
        return recipes.filter(recipe => recipe.isFavorite);
    }

    /**
     * 카테고리별 레시피 조회
     */
    async getRecipesByCategory(category) {
        const recipes = await this.getAllRecipes();
        return recipes.filter(recipe => recipe.category === category);
    }

    /**
     * 레시피 검색
     */
    async searchRecipes(query, filters = {}) {
        const recipes = await this.getAllRecipes();
        const lowerQuery = query.toLowerCase();

        return recipes.filter(recipe => {
            // 텍스트 검색
            const matchesQuery = !query ||
                recipe.title.toLowerCase().includes(lowerQuery) ||
                recipe.description?.toLowerCase().includes(lowerQuery) ||
                recipe.ingredients?.some(ing => ing.name.toLowerCase().includes(lowerQuery)) ||
                recipe.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));

            // 카테고리 필터
            const matchesCategory = !filters.category || recipe.category === filters.category;

            // 태그 필터
            const matchesTags = !filters.tags?.length ||
                filters.tags.some(tag => recipe.tags?.includes(tag));

            // 난이도 필터
            const matchesDifficulty = !filters.difficulty || recipe.difficulty === filters.difficulty;

            // 시간 필터
            const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
            const matchesTime = !filters.maxTime || totalTime <= filters.maxTime;

            return matchesQuery && matchesCategory && matchesTags && matchesDifficulty && matchesTime;
        });
    }

    /**
     * 즐겨찾기 토글
     */
    async toggleFavorite(id) {
        const recipe = await this.getRecipe(id);
        if (!recipe) {
            throw new Error('Recipe not found');
        }
        return this.updateRecipe(id, { isFavorite: !recipe.isFavorite });
    }

    /**
     * 쇼핑리스트에 레시피 추가
     */
    async addToShoppingList(recipeId, servings) {
        const recipe = await this.getRecipe(recipeId);
        if (!recipe) {
            throw new Error('Recipe not found');
        }

        const id = this.generateId();
        const item = {
            id,
            recipeId,
            recipeTitle: recipe.title,
            servings,
            originalServings: recipe.servings || 1,
            ingredients: recipe.ingredients || [],
            addedAt: new Date().toISOString()
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['shoppingList'], 'readwrite');
            const store = transaction.objectStore('shoppingList');
            const request = store.add(item);

            request.onsuccess = () => resolve(item);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 쇼핑리스트 조회
     */
    async getShoppingList() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['shoppingList'], 'readonly');
            const store = transaction.objectStore('shoppingList');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 쇼핑리스트 항목 삭제
     */
    async removeFromShoppingList(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['shoppingList'], 'readwrite');
            const store = transaction.objectStore('shoppingList');
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 쇼핑리스트 비우기
     */
    async clearShoppingList() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['shoppingList'], 'readwrite');
            const store = transaction.objectStore('shoppingList');
            const request = store.clear();

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 설정 저장
     */
    async setSetting(key, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readwrite');
            const store = transaction.objectStore('settings');
            const request = store.put({ key, value });

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 설정 조회
     */
    async getSetting(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['settings'], 'readonly');
            const store = transaction.objectStore('settings');
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result?.value);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 모든 데이터 내보내기 (백업)
     */
    async exportData() {
        const recipes = await this.getAllRecipes();
        const shoppingList = await this.getShoppingList();

        return {
            version: DB_VERSION,
            exportedAt: new Date().toISOString(),
            recipes,
            shoppingList
        };
    }

    /**
     * 데이터 가져오기 (복원)
     */
    async importData(data) {
        // 기존 데이터 삭제
        await this.clearAllData();

        // 레시피 복원
        if (data.recipes && Array.isArray(data.recipes)) {
            for (const recipe of data.recipes) {
                await new Promise((resolve, reject) => {
                    const transaction = this.db.transaction(['recipes'], 'readwrite');
                    const store = transaction.objectStore('recipes');
                    const request = store.add(recipe);
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject(request.error);
                });
            }
        }

        // 쇼핑리스트 복원
        if (data.shoppingList && Array.isArray(data.shoppingList)) {
            for (const item of data.shoppingList) {
                await new Promise((resolve, reject) => {
                    const transaction = this.db.transaction(['shoppingList'], 'readwrite');
                    const store = transaction.objectStore('shoppingList');
                    const request = store.add(item);
                    request.onsuccess = () => resolve();
                    request.onerror = () => reject(request.error);
                });
            }
        }

        return true;
    }

    /**
     * 모든 데이터 삭제
     */
    async clearAllData() {
        const stores = ['recipes', 'shoppingList'];

        for (const storeName of stores) {
            await new Promise((resolve, reject) => {
                const transaction = this.db.transaction([storeName], 'readwrite');
                const store = transaction.objectStore(storeName);
                const request = store.clear();
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }

        return true;
    }

    /**
     * 고유 ID 생성
     */
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    /**
     * 리뷰 추가
     */
    async addReview(recipeId, rating, reviewText, author = '익명') {
        const id = this.generateId();
        const newReview = {
            id,
            recipeId,
            rating: parseInt(rating),
            review: reviewText,
            author,
            createdAt: new Date().toISOString()
        };

        const result = new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['reviews'], 'readwrite');
            const store = transaction.objectStore('reviews');
            const request = store.add(newReview);

            request.onsuccess = () => resolve(newReview);
            request.onerror = () => reject(request.error);
        });

        // 리뷰 추가 후 레시피의 평균 별점 업데이트
        await this.updateRecipeRating(recipeId);
        return result;
    }

    /**
     * 레시피별 리뷰 조회
     */
    async getReviews(recipeId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['reviews'], 'readonly');
            const store = transaction.objectStore('reviews');
            const index = store.index('recipeId');
            const request = index.getAll(IDBKeyRange.only(recipeId));

            request.onsuccess = () => {
                const reviews = request.result || [];
                reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                resolve(reviews);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 모든 리뷰 조회
     */
    async getAllReviews() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['reviews'], 'readonly');
            const store = transaction.objectStore('reviews');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 리뷰 삭제
     */
    async deleteReview(reviewId) {
        const review = await this.getReview(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }

        await new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['reviews'], 'readwrite');
            const store = transaction.objectStore('reviews');
            const request = store.delete(reviewId);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });

        // 리뷰 삭제 후 레시피의 평균 별점 업데이트
        await this.updateRecipeRating(review.recipeId);
        return true;
    }

    /**
     * 단일 리뷰 조회
     */
    async getReview(reviewId) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['reviews'], 'readonly');
            const store = transaction.objectStore('reviews');
            const request = store.get(reviewId);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * 레시피의 평균 별점 계산 및 업데이트
     */
    async updateRecipeRating(recipeId) {
        const reviews = await this.getReviews(recipeId);

        if (reviews.length === 0) {
            await this.updateRecipe(recipeId, {
                averageRating: 0,
                reviewCount: 0
            });
            return { averageRating: 0, count: 0 };
        }

        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = Math.round((sum / reviews.length) * 10) / 10;

        await this.updateRecipe(recipeId, {
            averageRating,
            reviewCount: reviews.length
        });

        return { averageRating, count: reviews.length };
    }

    /**
     * 평균 별점으로 정렬된 레시피 조회
     */
    async getRecipesByRating(minRating = 0) {
        const recipes = await this.getAllRecipes();
        return recipes.filter(recipe =>
            recipe.averageRating && recipe.averageRating >= minRating
        ).sort((a, b) => b.averageRating - a.averageRating);
    }

    /**
     * 모든 재료명 반환 (자동완성용)
     */
    async getAllIngredientNames() {
        const recipes = await this.getAllRecipes();
        const ingredientNames = new Set();

        recipes.forEach(recipe => {
            (recipe.ingredients || []).forEach(ing => {
                if (ing.name && ing.name.trim()) {
                    ingredientNames.add(ing.name.trim().toLowerCase());
                }
            });
        });

        return Array.from(ingredientNames).sort();
    }

    /**
     * 재료 기반 레시피 검색 (스마트 검색)
     */
    async searchByIngredients(searchIngredients) {
        const recipes = await this.getAllRecipes();
        const searchIngredientsLower = searchIngredients.map(ing => ing.toLowerCase());

        return recipes.map(recipe => {
            const recipeIngredients = (recipe.ingredients || []).map(ing => ing.name.toLowerCase());
            const matchedIngredients = recipeIngredients.filter(ing =>
                searchIngredientsLower.some(searchIng => ing.includes(searchIng) || searchIng.includes(ing))
            );

            const totalIngredients = recipeIngredients.length;
            const matchedCount = matchedIngredients.length;
            const matchRate = totalIngredients > 0 ? (matchedCount / totalIngredients) * 100 : 0;

            return {
                ...recipe,
                matchRate: Math.round(matchRate),
                matchedCount,
                totalIngredients
            };
        }).filter(recipe => recipe.matchRate > 0)
          .sort((a, b) => b.matchRate - a.matchRate);
    }
}

// 전역 데이터베이스 인스턴스
const db = new FoodBooksDB();

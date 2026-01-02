/**
 * FoodBooks Community - 레시피 게시판
 */

const Community = {
    posts: [],
    filteredPosts: [],
    comments: {}, // 댓글 저장 { postId: [comments] }
    reports: {},  // 신고 저장 { postId: count }
    favorites: [], // 즐겨찾기 목록
    myNickname: '', // 내 닉네임 (내 레시피 필터용)
    currentCategory: 'all',
    currentSort: 'latest',
    searchQuery: '',
    REPORT_THRESHOLD: 5, // 신고 5회 이상이면 숨김

    // 카테고리 한글명
    categories: {
        korean: '한식',
        chinese: '중식',
        japanese: '일식',
        western: '양식',
        dessert: '디저트',
        other: '기타'
    },

    /**
     * 초기화
     */
    async init() {
        // Firebase가 준비될 때까지 대기
        if (!window.firebaseReady) {
            console.log('Waiting for Firebase...');
            return;
        }

        await this.loadPosts();
        this.setupRealtimeListener();
        this.render();
        console.log('Community initialized with Firebase');
    },

    /**
     * 실시간 리스너 설정 (다른 사용자의 변경사항 반영)
     */
    setupRealtimeListener() {
        if (!window.firebaseDB) return;

        const recipesRef = window.firebaseCollection(window.firebaseDB, 'recipes');
        const q = window.firebaseQuery(recipesRef, window.firebaseOrderBy('createdAt', 'desc'));

        window.firebaseOnSnapshot(q, (snapshot) => {
            this.posts = [];
            snapshot.forEach((doc) => {
                this.posts.push({ id: doc.id, ...doc.data() });
            });
            this.applyFilters();
            console.log('Realtime update:', this.posts.length, 'recipes');
        });
    },

    /**
     * Firebase에서 게시물 로드
     */
    async loadPosts() {
        // 신고 로드 (로컬)
        const savedReports = localStorage.getItem('community_reports');
        if (savedReports) this.reports = JSON.parse(savedReports);

        // 내 닉네임 로드 (로컬)
        this.myNickname = localStorage.getItem('community_nickname') || '';

        // Firebase에서 게시물 로드
        if (window.firebaseDB) {
            try {
                const recipesRef = window.firebaseCollection(window.firebaseDB, 'recipes');
                const q = window.firebaseQuery(recipesRef, window.firebaseOrderBy('createdAt', 'desc'));
                const snapshot = await window.firebaseGetDocs(q);

                this.posts = [];
                snapshot.forEach((doc) => {
                    this.posts.push({ id: doc.id, ...doc.data() });
                });

                // 첫 실행시 샘플 데이터 추가
                if (this.posts.length === 0) {
                    await this.addSampleData();
                }

                console.log('Loaded', this.posts.length, 'recipes from Firebase');
            } catch (error) {
                console.error('Firebase load error:', error);
                this.showToast('데이터 로드 실패', 'error');
            }
        }

        this.filteredPosts = [...this.posts];
    },

    /**
     * 샘플 데이터 추가
     */
    async addSampleData() {
        const samples = [
            {
                title: '초간단 계란볶음밥',
                category: 'korean',
                image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800',
                description: '냉장고 털이용 초간단 볶음밥! 5분이면 뚝딱 만들 수 있어요.',
                ingredients: '- 밥 1공기\n- 계란 2개\n- 대파 약간\n- 간장 1큰술\n- 참기름 약간',
                steps: '1. 팬에 기름을 두르고 계란을 스크램블합니다\n2. 밥을 넣고 함께 볶아주세요\n3. 간장으로 간을 하고 대파를 넣습니다\n4. 참기름을 둘러 마무리!',
                author: '요리초보',
                createdAt: Date.now() - 86400000,
                views: 156,
                likes: 23,
                comments: []
            },
            {
                title: '매콤달콤 떡볶이',
                category: 'korean',
                image: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=800',
                description: '분식집 떡볶이 그 맛! 집에서도 쉽게 만들 수 있어요.',
                ingredients: '- 떡볶이떡 300g\n- 어묵 2장\n- 고추장 2큰술\n- 고춧가루 1큰술\n- 설탕 1큰술\n- 대파 1대',
                steps: '1. 냄비에 물 2컵을 끓입니다\n2. 고추장, 고춧가루, 설탕을 넣어 양념장을 만듭니다\n3. 떡과 어묵을 넣고 중불에서 끓여주세요\n4. 떡이 부드러워지면 대파를 넣고 완성!',
                author: '분식러버',
                createdAt: Date.now() - 172800000,
                views: 289,
                likes: 45,
                comments: []
            },
            {
                title: '크림파스타 황금레시피',
                category: 'western',
                image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=800',
                description: '레스토랑 부럽지 않은 진한 크림파스타',
                ingredients: '- 파스타면 200g\n- 생크림 200ml\n- 베이컨 100g\n- 양파 1/2개\n- 마늘 3쪽\n- 파마산치즈 적당량',
                steps: '1. 파스타를 삶아주세요 (알덴테)\n2. 팬에 베이컨과 마늘을 볶습니다\n3. 생크림을 넣고 약불에서 졸여주세요\n4. 삶은 파스타를 넣고 버무립니다\n5. 파마산치즈를 뿌려 완성!',
                author: '파스타장인',
                createdAt: Date.now() - 259200000,
                views: 412,
                likes: 67,
                comments: []
            }
        ];

        for (const sample of samples) {
            await this.addToFirebase(sample);
        }
    },

    /**
     * Firebase에 게시물 추가
     */
    async addToFirebase(post) {
        if (!window.firebaseDB) return null;
        try {
            const docRef = await window.firebaseAddDoc(
                window.firebaseCollection(window.firebaseDB, 'recipes'),
                post
            );
            return docRef.id;
        } catch (error) {
            console.error('Firebase add error:', error);
            return null;
        }
    },

    /**
     * Firebase 게시물 업데이트
     */
    async updateFirebase(postId, data) {
        if (!window.firebaseDB) return;
        try {
            const docRef = window.firebaseDoc(window.firebaseDB, 'recipes', postId);
            await window.firebaseUpdateDoc(docRef, data);
        } catch (error) {
            console.error('Firebase update error:', error);
        }
    },

    /**
     * 더 이상 로컬 저장 안함 (Firebase 사용)
     */
    savePosts() {
        // Firebase에 자동 저장됨
    },

    /**
     * 게시물 렌더링
     */
    render() {
        const postList = document.getElementById('postList');
        const emptyState = document.getElementById('emptyState');
        const postCount = document.getElementById('postCount');

        postCount.textContent = this.filteredPosts.length;

        if (this.filteredPosts.length === 0) {
            postList.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        postList.innerHTML = this.filteredPosts.map(post => this.renderPostCard(post)).join('');
    },

    /**
     * 게시물 카드 HTML
     */
    renderPostCard(post) {
        const date = new Date(post.createdAt);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        const defaultImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800';

        return `
            <article class="post-card" onclick="Community.openDetail(${post.id})">
                <img class="post-image" src="${post.image || defaultImage}" alt="${post.title}"
                     onerror="this.src='${defaultImage}'">
                <div class="post-content">
                    <span class="post-category">${this.categories[post.category] || post.category}</span>
                    <h3 class="post-title">${post.title}</h3>
                    <p class="post-description">${post.description}</p>
                    <div class="post-meta">
                        <div class="post-author">
                            <span>👤</span>
                            <span>${post.author || '익명'}</span>
                        </div>
                        <div class="post-stats">
                            <span>👁 ${post.views || 0}</span>
                            <span>❤️ ${post.likes || 0}</span>
                        </div>
                    </div>
                </div>
            </article>
        `;
    },

    /**
     * 카테고리 필터
     */
    filterByCategory(category) {
        this.currentCategory = category;

        // 태그 활성화 상태 변경
        document.querySelectorAll('.tag').forEach(tag => {
            tag.classList.toggle('active', tag.dataset.category === category);
        });

        this.applyFilters();
    },

    /**
     * 검색
     */
    search(query) {
        this.searchQuery = query.toLowerCase();
        this.applyFilters();
    },

    /**
     * 정렬
     */
    sort(sortBy) {
        this.currentSort = sortBy;
        this.applyFilters();
    },

    /**
     * 필터/정렬 적용
     */
    applyFilters() {
        // 카테고리 필터 + 신고 필터
        this.filteredPosts = this.posts.filter(post => {
            // 신고 횟수가 임계값 이상이면 숨김
            if ((this.reports[post.id] || 0) >= this.REPORT_THRESHOLD) {
                return false;
            }

            // 즐겨찾기 필터
            if (this.currentCategory === 'favorites') {
                return this.favorites.includes(post.id);
            }

            // 내 레시피 필터
            if (this.currentCategory === 'myrecipes') {
                return this.myNickname && post.author === this.myNickname;
            }

            // 일반 카테고리 필터
            if (this.currentCategory !== 'all' && post.category !== this.currentCategory) {
                return false;
            }
            if (this.searchQuery && !post.title.toLowerCase().includes(this.searchQuery) &&
                !post.description.toLowerCase().includes(this.searchQuery)) {
                return false;
            }
            return true;
        });

        // 정렬
        this.filteredPosts.sort((a, b) => {
            switch (this.currentSort) {
                case 'popular':
                    return (b.likes || 0) - (a.likes || 0);
                case 'views':
                    return (b.views || 0) - (a.views || 0);
                case 'latest':
                default:
                    return b.createdAt - a.createdAt;
            }
        });

        this.render();
    },

    /**
     * 글쓰기 모달 열기
     */
    openWriteModal() {
        document.getElementById('writeModal').classList.remove('hidden');
        document.getElementById('recipeForm').reset();
    },

    /**
     * 글쓰기 모달 닫기
     */
    closeWriteModal() {
        document.getElementById('writeModal').classList.add('hidden');
    },

    /**
     * 레시피 등록
     */
    async submitRecipe(event) {
        event.preventDefault();

        const authorName = document.getElementById('authorName').value.trim() || '익명';

        const newPost = {
            title: document.getElementById('recipeTitle').value.trim(),
            category: document.getElementById('recipeCategory').value,
            image: document.getElementById('recipeImage').value.trim(),
            description: document.getElementById('recipeDescription').value.trim(),
            ingredients: document.getElementById('recipeIngredients').value.trim(),
            steps: document.getElementById('recipeSteps').value.trim(),
            author: authorName,
            createdAt: Date.now(),
            views: 0,
            likes: 0,
            comments: []
        };

        // 닉네임 저장 (로컬)
        if (authorName !== '익명') {
            this.myNickname = authorName;
            localStorage.setItem('community_nickname', authorName);
        }

        // Firebase에 저장
        const docId = await this.addToFirebase(newPost);
        if (docId) {
            this.closeWriteModal();
            this.showToast('레시피가 등록되었습니다!', 'success');
        } else {
            this.showToast('등록 실패. 다시 시도해주세요.', 'error');
        }
    },

    /**
     * 상세보기 열기
     */
    openDetail(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        // 조회수 증가
        post.views = (post.views || 0) + 1;
        this.savePosts();

        const modal = document.getElementById('detailModal');
        const titleEl = document.getElementById('detailTitle');
        const contentEl = document.getElementById('detailContent');

        titleEl.textContent = post.title;

        const defaultImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800';
        const ingredientsList = post.ingredients.split('\n').map(i => `<li>${i.replace(/^-\s*/, '')}</li>`).join('');
        const stepsList = post.steps.split('\n').map(s => `<li>${s.replace(/^\d+\.\s*/, '')}</li>`).join('');

        const commentsHtml = this.renderComments(postId);
        const reportCount = this.reports[postId] || 0;
        const isReported = this.hasReported(postId);

        contentEl.innerHTML = `
            <img class="detail-image" src="${post.image || defaultImage}" alt="${post.title}"
                 onerror="this.src='${defaultImage}'">

            <div class="detail-meta">
                <span>👤 ${post.author || '익명'}</span>
                <span>📅 ${new Date(post.createdAt).toLocaleDateString()}</span>
                <span>👁 ${post.views}</span>
                <span>❤️ ${post.likes}</span>
            </div>

            <div class="detail-section">
                <h3>소개</h3>
                <p>${post.description}</p>
            </div>

            <div class="detail-section">
                <h3>재료</h3>
                <ul>${ingredientsList}</ul>
            </div>

            <div class="detail-section">
                <h3>조리 방법</h3>
                <ul class="detail-steps">${stepsList}</ul>
            </div>

            <div class="detail-actions">
                <button class="action-btn ${this.isLiked(postId) ? 'liked' : ''}" onclick="Community.toggleLike(${postId})">
                    ❤️ 좋아요 ${post.likes}
                </button>
                <button class="action-btn" onclick="Community.sharePost(${postId})">
                    📤 공유하기
                </button>
                <button class="action-btn ${isReported ? 'reported' : ''}" onclick="Community.reportPost(${postId})" ${isReported ? 'disabled' : ''}>
                    🚨 ${isReported ? '신고완료' : '오류신고'} ${reportCount > 0 ? '(' + reportCount + ')' : ''}
                </button>
            </div>

            <div class="save-to-app">
                <button class="btn-save-app" onclick="Community.saveToApp(${postId})">
                    📱 내 레시피에 저장 (앱으로 이동)
                </button>
            </div>

            <!-- 댓글 섹션 -->
            <div class="comments-section">
                <h3>💬 댓글 <span class="comment-count">${(post.comments || []).length}</span></h3>

                <div class="comment-form">
                    <input type="text" id="commentAuthor" placeholder="닉네임" maxlength="20">
                    <textarea id="commentText" placeholder="댓글을 입력하세요..." rows="2" maxlength="500"></textarea>
                    <button class="btn-primary" onclick="Community.addComment(${postId})">댓글 작성</button>
                </div>

                <div class="comment-list" id="commentList">
                    ${commentsHtml}
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    },

    /**
     * 상세보기 닫기
     */
    closeDetailModal() {
        document.getElementById('detailModal').classList.add('hidden');
        this.render(); // 조회수 업데이트 반영
    },

    /**
     * 좋아요 토글
     */
    async toggleLike(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        const likedPosts = this.getLikedPosts();
        const index = likedPosts.indexOf(postId);

        if (index > -1) {
            likedPosts.splice(index, 1);
            post.likes = Math.max(0, (post.likes || 0) - 1);
        } else {
            likedPosts.push(postId);
            post.likes = (post.likes || 0) + 1;
        }

        localStorage.setItem('liked_posts', JSON.stringify(likedPosts));

        // Firebase 업데이트
        await this.updateFirebase(postId, { likes: post.likes });
        this.openDetail(postId);
    },

    /**
     * 좋아요 여부 확인
     */
    isLiked(postId) {
        return this.getLikedPosts().includes(postId);
    },

    /**
     * 좋아요한 게시물 목록
     */
    getLikedPosts() {
        const saved = localStorage.getItem('liked_posts');
        return saved ? JSON.parse(saved) : [];
    },

    /**
     * 공유하기
     */
    sharePost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        if (navigator.share) {
            navigator.share({
                title: post.title,
                text: post.description,
                url: window.location.href
            });
        } else {
            // 클립보드 복사
            navigator.clipboard.writeText(`${post.title}\n${post.description}\n${window.location.href}`);
            this.showToast('링크가 복사되었습니다!', 'success');
        }
    },

    /**
     * 토스트 메시지
     */
    showToast(message, type = '') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    },

    // ========== 댓글 기능 ==========

    /**
     * 댓글 렌더링
     */
    renderComments(postId) {
        const post = this.posts.find(p => p.id === postId);
        const comments = post?.comments || [];
        if (comments.length === 0) {
            return '<p class="no-comments">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>';
        }

        return comments.map(comment => `
            <div class="comment-item">
                <div class="comment-header">
                    <span class="comment-author">👤 ${comment.author || '익명'}</span>
                    <span class="comment-date">${new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p class="comment-text">${this.escapeHtml(comment.text)}</p>
            </div>
        `).join('');
    },

    /**
     * 댓글 추가
     */
    async addComment(postId) {
        const authorInput = document.getElementById('commentAuthor');
        const textInput = document.getElementById('commentText');

        const text = textInput.value.trim();
        if (!text) {
            this.showToast('댓글 내용을 입력해주세요', 'error');
            return;
        }

        const comment = {
            id: Date.now(),
            author: authorInput.value.trim() || '익명',
            text: text,
            createdAt: Date.now()
        };

        // 게시물의 comments 배열에 추가
        const post = this.posts.find(p => p.id === postId);
        if (post) {
            if (!post.comments) post.comments = [];
            post.comments.unshift(comment);

            // Firebase 업데이트
            await this.updateFirebase(postId, { comments: post.comments });
        }

        // 입력 필드 초기화
        textInput.value = '';

        // 댓글 목록 새로고침
        document.getElementById('commentList').innerHTML = this.renderComments(postId);
        document.querySelector('.comment-count').textContent = (post.comments || []).length;

        this.showToast('댓글이 등록되었습니다!', 'success');
    },

    /**
     * 댓글 저장
     */
    saveComments() {
        localStorage.setItem('community_comments', JSON.stringify(this.comments));
    },

    // ========== 신고 기능 ==========

    /**
     * 게시물 신고
     */
    reportPost(postId) {
        if (this.hasReported(postId)) {
            this.showToast('이미 신고한 게시물입니다', 'error');
            return;
        }

        // 신고 횟수 증가
        this.reports[postId] = (this.reports[postId] || 0) + 1;
        this.saveReports();

        // 신고 기록 저장
        const reportedPosts = this.getReportedPosts();
        reportedPosts.push(postId);
        localStorage.setItem('reported_posts', JSON.stringify(reportedPosts));

        const reportCount = this.reports[postId];

        if (reportCount >= this.REPORT_THRESHOLD) {
            this.showToast('신고가 누적되어 게시물이 숨김 처리됩니다', 'success');
            this.closeDetailModal();
        } else {
            this.showToast(`신고되었습니다 (${reportCount}/${this.REPORT_THRESHOLD})`, 'success');
            this.openDetail(postId); // 새로고침
        }
    },

    /**
     * 신고 여부 확인
     */
    hasReported(postId) {
        return this.getReportedPosts().includes(postId);
    },

    /**
     * 신고한 게시물 목록
     */
    getReportedPosts() {
        const saved = localStorage.getItem('reported_posts');
        return saved ? JSON.parse(saved) : [];
    },

    /**
     * 신고 저장
     */
    saveReports() {
        localStorage.setItem('community_reports', JSON.stringify(this.reports));
    },

    // ========== 즐겨찾기 기능 ==========

    /**
     * 즐겨찾기 여부 확인
     */
    isFavorite(postId) {
        return this.favorites.includes(postId);
    },

    /**
     * 즐겨찾기 토글
     */
    toggleFavorite(postId) {
        const index = this.favorites.indexOf(postId);
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.showToast('즐겨찾기에서 제거되었습니다', 'success');
        } else {
            this.favorites.push(postId);
            this.showToast('즐겨찾기에 추가되었습니다!', 'success');
        }
        this.saveFavorites();
        this.openDetail(postId); // 새로고침
    },

    /**
     * 즐겨찾기 저장
     */
    saveFavorites() {
        localStorage.setItem('community_favorites', JSON.stringify(this.favorites));
    },

    /**
     * HTML 이스케이프 (XSS 방지)
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    // ========== 앱 연동 (딥링크) ==========

    /**
     * 앱으로 레시피 저장
     */
    saveToApp(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        // 레시피 데이터를 앱으로 전달할 형식으로 변환
        const recipeData = {
            title: post.title,
            description: post.description,
            category: this.mapCategory(post.category),
            image: post.image || '',
            ingredients: this.parseIngredients(post.ingredients),
            steps: this.parseSteps(post.steps),
            source: 'community',
            sourceAuthor: post.author || '익명'
        };

        // Base64로 인코딩 (URL 안전)
        const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(recipeData))));

        // 딥링크 URL
        const deepLink = `foodbooks://add-recipe?data=${encoded}`;

        // 앱 열기 시도
        this.openAppWithFallback(deepLink, recipeData);
    },

    /**
     * 앱 열기 (폴백 포함)
     */
    openAppWithFallback(deepLink, recipeData) {
        const startTime = Date.now();
        let appOpened = false;

        // 앱 열기 시도
        window.location.href = deepLink;

        // 2초 후 앱이 안 열렸으면 폴백
        setTimeout(() => {
            if (Date.now() - startTime < 2500 && !document.hidden) {
                // 앱이 설치되지 않은 경우
                this.showAppInstallPrompt(recipeData);
            }
        }, 2000);
    },

    /**
     * 앱 미설치시 안내
     */
    showAppInstallPrompt(recipeData) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);

        let message = '📱 FoodBooks 앱이 설치되어 있지 않습니다.\n\n';

        if (isIOS) {
            message += '앱스토어에서 FoodBooks를 설치하시겠습니까?';
            if (confirm(message)) {
                // TODO: 실제 앱스토어 URL로 변경
                window.location.href = 'https://apps.apple.com/app/foodbooks';
            }
        } else if (isAndroid) {
            message += '플레이스토어에서 FoodBooks를 설치하시겠습니까?';
            if (confirm(message)) {
                // TODO: 실제 플레이스토어 URL로 변경
                window.location.href = 'https://play.google.com/store/apps/details?id=com.foodbooks.app';
            }
        } else {
            // 데스크톱: 클립보드에 복사
            message = '이 레시피를 클립보드에 복사할까요?\n(모바일 앱에서 붙여넣기로 추가 가능)';
            if (confirm(message)) {
                this.copyRecipeToClipboard(recipeData);
            }
        }
    },

    /**
     * 레시피 클립보드 복사
     */
    copyRecipeToClipboard(recipeData) {
        const text = `[FoodBooks 레시피]\n\n` +
            `📌 ${recipeData.title}\n\n` +
            `📝 ${recipeData.description}\n\n` +
            `🥗 재료:\n${recipeData.ingredients.map(i => `- ${i.name} ${i.amount}${i.unit}`).join('\n')}\n\n` +
            `👨‍🍳 조리법:\n${recipeData.steps.map((s, i) => `${i+1}. ${s.text}`).join('\n')}`;

        navigator.clipboard.writeText(text).then(() => {
            this.showToast('레시피가 클립보드에 복사되었습니다!', 'success');
        });
    },

    /**
     * 카테고리 매핑
     */
    mapCategory(category) {
        const map = {
            korean: 'korean',
            chinese: 'chinese',
            japanese: 'japanese',
            western: 'western',
            dessert: 'dessert',
            other: 'other'
        };
        return map[category] || 'other';
    },

    /**
     * 재료 문자열 파싱
     */
    parseIngredients(text) {
        return text.split('\n').filter(line => line.trim()).map(line => {
            const cleaned = line.replace(/^-\s*/, '').trim();
            // 간단한 파싱: "재료명 양단위" 형태
            const match = cleaned.match(/^(.+?)\s+(\d+\S*)$/);
            if (match) {
                return { name: match[1], amount: match[2], unit: '', category: 'other' };
            }
            return { name: cleaned, amount: '', unit: '', category: 'other' };
        });
    },

    /**
     * 조리법 문자열 파싱
     */
    parseSteps(text) {
        return text.split('\n').filter(line => line.trim()).map(line => {
            const cleaned = line.replace(/^\d+\.\s*/, '').trim();
            return { text: cleaned };
        });
    }
};

// 페이지 로드시 초기화
document.addEventListener('DOMContentLoaded', () => Community.init());

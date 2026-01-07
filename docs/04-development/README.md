# Development Guide

FoodBooks 개발 가이드입니다.

## 개발 환경 설정

### 필수 도구
- 코드 에디터 (VS Code, WebStorm 등)
- 웹 브라우저 (Chrome DevTools 권장)
- Git

### 권장 VS Code 확장
- Live Server
- ES6 Code Snippets
- JavaScript (ES6) code snippets

## 프로젝트 구조 이해

### 파일 구조
```
js/
├── app.js           # 라우팅 & 상태 관리
├── db.js            # IndexedDB 관리
├── utils.js         # 유틸리티 함수
├── components.js    # UI 컴포넌트
├── community.js     # 커뮤니티 로직
├── image-verification.js # 이미지 검증
├── seed-data.js     # 샘플 데이터
└── pages/           # 페이지 모듈
    ├── home.js
    ├── recipes.js
    ├── recipe-detail.js
    ├── recipe-form.js
    ├── shopping.js
    ├── cooking-mode.js
    └── settings.js
```

### 로드 순서
index.html에서 스크립트 로드 순서:
```html
<script src="js/utils.js"></script>
<script src="js/db.js"></script>
<script src="js/components.js"></script>
<script src="js/pages/*.js"></script>
<script src="js/app.js"></script>
```

## 코드 컨벤션

### 네이밍
- **변수/함수**: camelCase (`getUserRecipes`, `recipeList`)
- **상수**: UPPER_SNAKE_CASE (`MAX_RECIPES`, `API_KEY`)
- **클래스/객체**: PascalCase (`App`, `HomePage`, `RecipeCard`)

### 파일 구조
각 페이지 모듈 (pages/*.js):
```javascript
const PageName = {
  init() {
    // 초기화 로직
    this.render()
    this.bindEvents()
  },

  render() {
    // HTML 렌더링
  },

  bindEvents() {
    // 이벤트 바인딩
  },

  // 기타 메서드
}
```

### 주석
```javascript
// 단일 라인 주석

/**
 * 다중 라인 주석 (함수 설명)
 * @param {string} title - 레시피 제목
 * @param {number} servings - 인원 수
 * @returns {Promise<Object>} 레시피 객체
 */
async function getRecipe(title, servings) {
  // ...
}
```

## 새 페이지 추가

### 1. 페이지 파일 생성
`js/pages/my-page.js`:
```javascript
const MyPage = {
  init() {
    this.render()
    this.bindEvents()
  },

  render() {
    const content = document.getElementById('mainContent')
    content.innerHTML = `
      <div class="my-page">
        <h2>My Page</h2>
        <!-- 콘텐츠 -->
      </div>
    `
  },

  bindEvents() {
    document.querySelector('.my-button').addEventListener('click', () => {
      // 이벤트 처리
    })
  }
}
```

### 2. index.html에 스크립트 추가
```html
<script src="js/pages/my-page.js"></script>
```

### 3. app.js에 라우트 추가
```javascript
renderPage() {
  const pages = {
    home: HomePage,
    recipes: RecipesPage,
    'my-page': MyPage,  // 추가
    // ...
  }

  const page = pages[this.currentPage]
  if (page) {
    page.init()
  }
}
```

### 4. 네비게이션 버튼 추가 (선택사항)
```html
<button class="nav-item" data-page="my-page">
  <span class="nav-icon">🔖</span>
  <span class="nav-label">My</span>
</button>
```

## 새 컴포넌트 추가

### 1. components.js에 추가
```javascript
const Components = {
  MyComponent({ title, description }) {
    return `
      <div class="my-component">
        <h3>${Utils.escapeHtml(title)}</h3>
        <p>${Utils.escapeHtml(description)}</p>
      </div>
    `
  }
}
```

### 2. 사용
```javascript
const html = Components.MyComponent({
  title: '제목',
  description: '설명'
})
document.getElementById('container').innerHTML = html
```

## IndexedDB 작업

### 새 Object Store 추가
`db.js`의 `initDB()`:
```javascript
const objectStoreNames = [
  'recipes',
  'shoppingList',
  'settings',
  'categories',
  'myNewStore'  // 추가
]

if (!db.objectStoreNames.contains('myNewStore')) {
  const store = db.createObjectStore('myNewStore', {
    keyPath: 'id',
    autoIncrement: true
  })
  store.createIndex('indexName', 'field', { unique: false })
}
```

### CRUD 메서드 추가
```javascript
async addMyItem(item) {
  const db = await this.initDB()
  const tx = db.transaction(['myNewStore'], 'readwrite')
  const store = tx.objectStore('myNewStore')
  const id = await store.add(item)
  return id
}

async getMyItem(id) {
  const db = await this.initDB()
  const tx = db.transaction(['myNewStore'], 'readonly')
  const store = tx.objectStore('myNewStore')
  return await store.get(id)
}
```

## 이벤트 처리

### 인라인 이벤트
```html
<button onclick="App.navigateTo('home')">홈</button>
```

### 이벤트 리스너
```javascript
document.querySelector('.button').addEventListener('click', () => {
  // 처리
})
```

### 이벤트 위임
```javascript
document.addEventListener('click', (e) => {
  if (e.target.matches('.recipe-card')) {
    const id = e.target.dataset.recipeId
    App.navigateTo('recipe-detail', { id })
  }
})
```

## 스타일링

### CSS 변수 사용
`css/styles.css`:
```css
:root {
  --primary-color: #ff6b35;
  --text-color: #333333;
  --bg-color: #f5f5f5;
}

.my-element {
  color: var(--primary-color);
  background: var(--bg-color);
}
```

### 모바일-first 디자인
```css
/* 기본 (모바일) */
.container {
  width: 100%;
}

/* 태블릿 이상 */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }
}
```

## 유틸리티 함수

### 자주 사용하는 함수

#### XSS 방지
```javascript
const safe = Utils.escapeHtml(userInput)
```

#### 시간 포맷
```javascript
const formatted = Utils.formatTime(120) // "2시간 0분"
```

#### 날짜 포맷
```javascript
const date = Utils.formatDate(Date.now()) // "2026-01-07"
```

#### 이미지 리사이즈
```javascript
const base64 = await Utils.imageToBase64(file) // 800px로 리사이즈
```

## 디버깅

### 브라우저 개발자 도구

**Console**:
```javascript
console.log('디버그:', variable)
console.error('에러:', error)
console.table(array) // 배열을 테이블로 표시
```

**Application**:
- IndexedDB: 데이터 확인
- Local Storage: localStorage 내용
- Session Storage: sessionStorage 내용

**Network**:
- API 요청 확인 (Pexels, Firebase)
- 응답 상태 코드
- 요청/응답 헤더

### 일반적인 오류

#### IndexedDB 에러
```javascript
// 증상: 데이터가 저장되지 않음
// 원인: 프라이빗 모드 또는 쿠키 차단
// 해결: 일반 모드로 전환
```

#### Firebase 연결 오류
```javascript
// 증상: 커뮤니티 게시물이 로드되지 않음
// 원인: Firebase 설정 오류
// 해결: .firebaserc 및 firebase.json 확인
```

#### CORS 에러
```javascript
// 증상: Pexels API 호출 실패
// 원인: CORS 정책
// 해결: API 키 및 헤더 확인
```

## 테스트

### 수동 테스트

**레시피 CRUD**:
1. 레시피 추가
2. 레시피 목록 확인
3. 레시피 수정
4. 레시피 삭제
5. IndexedDB 확인

**검색 & 필터**:
1. 텍스트 검색
2. 카테고리 필터
3. 태그 필터
4. 정렬 변경

**쇼핑리스트**:
1. 레시피에서 추가
2. 인원 조정
3. 체크 기능
4. 삭제

### 테스트 데이터

샘플 데이터 로드:
```javascript
// 설정 > 샘플 데이터 로드
// 35개 레시피 자동 추가
```

## 성능 최적화

### 이미지 최적화
```javascript
// 800px로 리사이즈
const resized = await Utils.imageToBase64(file)
```

### IndexedDB 인덱싱
```javascript
// 자주 검색하는 필드에 인덱스 추가
store.createIndex('category', 'category', { unique: false })
```

### 이벤트 위임
```javascript
// 개별 리스너 대신 위임 사용
document.addEventListener('click', handleClick)
```

## 보안 Best Practices

### 입력 검증
```javascript
// XSS 방지
const safe = Utils.escapeHtml(input)

// 빈 값 체크
if (!title.trim()) {
  showToast('제목을 입력해주세요')
  return
}
```

### API 키 보호
```javascript
// ❌ 하드코딩 (현재 상태)
const API_KEY = 'WJdYLaL...'

// ✅ 환경 변수 (권장)
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
```

## Git 워크플로우

### 브랜치 전략
```bash
# 기능 개발
git checkout -b feature/my-feature
git commit -m "feat: Add my feature"
git push origin feature/my-feature

# 버그 수정
git checkout -b fix/bug-description
git commit -m "fix: Fix bug description"
```

### 커밋 메시지
```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
test: 테스트 추가
chore: 빌드/설정 변경
```

## 다음 단계

- [아키텍처](../02-architecture/README.md) - 시스템 구조 이해
- [API 문서](../03-api/README.md) - 데이터 스키마
- [배포 가이드](../05-deployment/README.md) - 프로덕션 배포

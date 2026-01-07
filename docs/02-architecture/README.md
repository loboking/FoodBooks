# Architecture

FoodBooks 시스템 아키텍처 문서입니다.

## 시스템 개요

FoodBooks는 **클라이언트 사이드 중심 SPA (Single Page Application)**로 설계되었습니다. IndexedDB로 오프라인 지원을 제공하며, Firebase Realtime Database로 커뮤니티 기능을 구현합니다.

## 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────┐
│                   브라우저 (Client)                    │
├─────────────────────────────────────────────────────┤
│  UI Layer                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │  index.html  │  │ components.js │  │ pages/*.js│ │
│  │  (SPA Shell) │  │  (UI 컴포넌트) │  │ (페이지)   │ │
│  └──────────────┘  └──────────────┘  └───────────┘ │
│                          ▲                           │
│                          │                           │
│  Application Layer       │                           │
│  ┌──────────────────────┴────────────────────────┐  │
│  │         app.js (라우팅 & 상태 관리)            │  │
│  └───────────────────────┬────────────────────────┘ │
│                          │                           │
│  Data Layer              │                           │
│  ┌──────────────┐  ┌────┴─────┐  ┌──────────────┐  │
│  │ IndexedDB    │  │  db.js   │  │ localStorage │  │
│  │ (레시피,      │  │ (CRUD)   │  │ (설정, 신고)  │  │
│  │  쇼핑리스트)  │  └──────────┘  └──────────────┘  │
│  └──────────────┘                                   │
└─────────────────────────────────────────────────────┘
                          │
                          │ HTTP/WebSocket
                          ▼
┌─────────────────────────────────────────────────────┐
│                External Services                     │
├─────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌─────────────────────────┐ │
│  │ Firebase         │  │ Pexels API              │ │
│  │ - Realtime DB    │  │ - 이미지 검색            │ │
│  │ - Hosting        │  │ - 음식 사진 제공         │ │
│  └──────────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

## 주요 컴포넌트

### 1. UI Layer

#### index.html (SPA Shell)
- 단일 HTML 진입점
- 하단 네비게이션 (5개 탭)
- 동적 콘텐츠 영역 (#mainContent)

#### components.js
- 재사용 가능한 UI 컴포넌트
- RecipeCard: 레시피 카드
- Modal: 다이얼로그
- 기타 공통 요소

#### pages/*.js
- 페이지별 모듈
- `init()` 메서드로 초기화
- 이벤트 바인딩 포함

### 2. Application Layer

#### app.js - 라우팅 & 상태 관리

**라우팅**:
```javascript
navigateTo(page, params)
  ↓
updateNavigation()  // 네비게이션 활성화
updateHeader()      // 헤더 업데이트
renderPage()        // 페이지 렌더링
  ↓
PageModule.init()   // 페이지 초기화
```

**상태 관리**:
```javascript
App = {
  currentPage: 'home',      // 현재 페이지
  history: [],              // 페이지 히스토리
  currentParams: {},        // 페이지 파라미터
  navigateTo(page, params), // 페이지 전환
  goBack()                  // 뒤로 가기
}
```

### 3. Data Layer

#### IndexedDB (db.js)

**데이터베이스**: FoodBooksDB (v2)

**Object Stores**:
- `recipes`: 레시피 정보
  - 인덱스: category, subcategory, difficulty, isFavorite, prepTime, cookTime, servings, tags, createdAt, updatedAt, isVerified, imageVerified
- `shoppingList`: 쇼핑리스트 항목
- `settings`: 사용자 설정
- `categories`: 카테고리 정보

**주요 메서드**:
```javascript
// CRUD
addRecipe(recipe)
getRecipe(id)
updateRecipe(id, updates)
deleteRecipe(id)
getAllRecipes()

// 검색 & 필터
searchRecipes(query, filters)
getRecipesByCategory(category)
getFavoriteRecipes()

// 쇼핑리스트
addToShoppingList(recipeId, servings)
getShoppingList()
updateShoppingItem(id, checked)
deleteShoppingItem(id)

// 데이터 관리
exportData()
importData(data)
```

#### localStorage

**저장 항목**:
- `recentRecipes`: 최근 본 레시피 (최대 10개)
- `community_nickname`: 커뮤니티 닉네임
- `community_favorites`: 즐겨찾기한 게시물
- `community_reports`: 신고한 게시물

## 데이터 흐름

### 레시피 생성 플로우

```
사용자 입력 (recipe-form.js)
  ↓
폼 데이터 수집
  ↓
db.addRecipe(recipe)
  ↓
IndexedDB 저장
  ↓
navigateTo('recipe-detail', {id})
  ↓
상세 페이지 표시
```

### 검색 플로우

```
검색어 입력 (recipes.js)
  ↓
filters = { query, category, tags, difficulty, time }
  ↓
db.searchRecipes(query, filters)
  ↓
IndexedDB 쿼리 (인덱스 활용)
  ↓
필터링 & 정렬
  ↓
RecipeCard 렌더링
```

### 커뮤니티 플로우

```
게시물 작성 (community.js)
  ↓
Community.createPost(post)
  ↓
Firebase Realtime DB 저장
  ↓
실시간 리스너 트리거
  ↓
다른 사용자 화면에 즉시 반영
```

## 라우팅 메커니즘

### URL 기반 라우팅 (없음)
- 현재 해시 기반 라우팅 미사용
- 상태 기반 페이지 전환

### 상태 기반 라우팅

```javascript
// 페이지 전환
App.navigateTo('recipe-detail', { id: 123 })

// 내부 동작
1. 히스토리에 현재 페이지 추가
2. currentPage, currentParams 업데이트
3. 네비게이션 업데이트
4. 헤더 업데이트
5. 페이지 렌더링
```

## 상태 관리 전략

### 전역 상태 (App 객체)
- currentPage: 현재 페이지
- history: 페이지 히스토리
- currentParams: 페이지 파라미터

### 로컬 상태 (localStorage)
- 최근 본 레시피
- 커뮤니티 설정 (닉네임, 신고, 즐겨찾기)

### 영구 상태 (IndexedDB)
- 레시피 데이터
- 쇼핑리스트
- 사용자 설정

### 서버 상태 (Firebase)
- 커뮤니티 게시물
- 실시간 동기화

## 이벤트 처리

### 인라인 이벤트
```html
<button onclick="App.navigateTo('home')">홈으로</button>
```

### 이벤트 위임
```javascript
document.addEventListener('click', (e) => {
  if (e.target.matches('.recipe-card')) {
    // 레시피 카드 클릭 처리
  }
})
```

### 커스텀 data-* 속성
```html
<button data-page="recipes">레시피</button>
<button data-recipe-id="123">상세보기</button>
```

## 보안 고려사항

### XSS 방지
```javascript
// utils.js
escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
```

### API 키 관리
- **현재**: 하드코딩 (보안 취약)
- **권장**: 환경 변수 또는 서버 프록시

### 입력 검증
- 기본적 검증 (빈 값, 타입)
- 추가 검증 필요 (길이, 형식)

## 성능 최적화

### IndexedDB 인덱싱
- 13개 인덱스로 빠른 쿼리
- 복합 검색 지원

### 이미지 최적화
- 800px 리사이즈 (utils.imageToBase64)
- Base64 인코딩 (로컬 저장)

### 캐싱
- Firebase Hosting: 1년 캐시 (CSS, JS)
- 로컬 스토리지: 최근 본 레시피

## 확장성 고려사항

### 현재 제약
- 클라이언트 사이드 전용 (서버 없음)
- IndexedDB 용량 제한 (~50MB)
- 대규모 데이터셋 처리 어려움

### 확장 방향
- 백엔드 API 추가 (Node.js/Express, FastAPI)
- 클라우드 스토리지 (Firebase Storage, S3)
- CDN 활용 (이미지, 정적 자산)
- 서버 사이드 렌더링 (Next.js)

## 아키텍처 결정 기록 (ADR)

### ADR-001: 프레임워크 없는 순수 JS 선택
- **결정**: React/Vue 대신 Vanilla JS
- **이유**: 빠른 프로토타이핑, 의존성 최소화
- **트레이드오프**: 코드 복잡도 증가, 타입 안전성 부족

### ADR-002: IndexedDB 사용
- **결정**: LocalStorage 대신 IndexedDB
- **이유**: 대용량 데이터, 인덱싱, 오프라인 지원
- **트레이드오프**: API 복잡성

### ADR-003: Firebase Realtime DB
- **결정**: REST API 대신 Firebase
- **이유**: 실시간 동기화, 관리 편의성
- **트레이드오프**: 벤더 종속성

## 다음 단계

- [프로젝트 분석](./project-analysis.md) - 상세 분석
- [API 문서](../03-api/README.md) - 데이터 스키마
- [개발 가이드](../04-development/README.md) - 기능 추가

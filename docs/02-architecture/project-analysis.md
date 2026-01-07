# FoodBooks 프로젝트 분석

*자동 생성: 2026-01-07*

## 프로젝트 타입

**HTML/CSS/JavaScript (Vanilla)** - 프레임워크 없는 순수 웹 애플리케이션

## 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+)
- **로컬 저장소**: IndexedDB
- **실시간 DB**: Firebase Realtime Database
- **호스팅**: Firebase Hosting
- **이미지 검색**: Pexels API
- **빌드**: 없음 (번들러 미사용)

## 프로젝트 구조

```
FoodBooks/
├── index.html              # 메인 SPA 진입점
├── community.html          # 커뮤니티 게시판
├── image-collector.html    # 이미지 수집 도구
├── image-verification.html # 이미지 검증 도구
├── firebase.json           # Firebase 호스팅 설정
├── js/                     # 11,430 라인
│   ├── app.js             # 라우팅 & 전역 상태 (372줄)
│   ├── db.js              # IndexedDB 관리 (416줄)
│   ├── utils.js           # 유틸리티 (462줄)
│   ├── components.js      # UI 컴포넌트 (869줄)
│   ├── community.js       # 커뮤니티 로직 (842줄)
│   ├── image-verification.js # 이미지 검증 (610줄)
│   ├── seed-data.js       # 샘플 데이터 (4,118줄)
│   └── pages/             # 페이지 모듈
│       ├── home.js        # 홈 (315줄)
│       ├── recipes.js     # 레시피 목록 (782줄)
│       ├── recipe-detail.js # 상세 (552줄)
│       ├── recipe-form.js # 작성/수정 (700줄)
│       ├── shopping.js    # 쇼핑리스트 (384줄)
│       ├── cooking-mode.js # 요리 모드 (603줄)
│       └── settings.js    # 설정 (405줄)
└── css/                    # 68KB
    ├── styles.css         # 메인 스타일 (42KB)
    ├── community.css      # 커뮤니티 (12.7KB)
    └── image-verification.css # 검증 도구 (7.5KB)
```

## 주요 기능

### 1. 레시피 관리
- CRUD 작업 (생성, 읽기, 수정, 삭제)
- 카테고리별 분류 (11개 + 서브카테고리)
- 태그 시스템 (20개 기본 태그)
- 즐겨찾기 기능
- 난이도 설정 (쉬움/보통/어려움)
- 조리 시간/준비 시간 기록
- 재료 관리 (카테고리별)
- 조리 단계별 가이드

### 2. 검색 & 필터
- 텍스트 검색 (제목, 설명, 재료)
- 카테고리 필터
- 태그 필터
- 난이도 필터
- 조리 시간 필터
- 정렬 (최신순, 이름순, 난이도순, 시간순)

### 3. 커뮤니티
- Firebase 기반 실시간 게시판
- 게시물 CRUD
- 댓글 기능
- 신고 시스템 (5회 이상 자동 숨김)
- 닉네임 설정 (로컬 저장)
- 즐겨찾기 (로컬 저장)
- 검색 & 필터
- 페이지네이션

### 4. 요리 모드
- 전체 화면 단계별 가이드
- 타이머 기능
- 단계 완료 체크
- 재료 확인

### 5. 쇼핑리스트
- 레시피별 재료 추가
- 인원 조정 (자동 재료량 계산)
- 체크 기능
- 통합 관리

### 6. 이미지 관리
- Pexels API 검색
- 음식명 자동 영어 변환 (100+ 매핑)
- 중복 이미지 감지
- 제목-이미지 불일치 감지
- 파일 업로드 지원
- 이미지 확대 보기

### 7. 데이터 관리
- 데이터 백업 (JSON Export)
- 데이터 복원 (JSON Import)
- 데이터 초기화
- 샘플 데이터 로드 (35개 레시피)

## 아키텍처 패턴

### SPA (Single Page Application)
- `index.html` 단일 진입점
- JavaScript 동적 렌더링
- 클라이언트 사이드 라우팅

### 라우팅
```javascript
navigateTo(page, params)
  ↓
updateNavigation() // 네비게이션 활성화
updateHeader()     // 헤더 업데이트
renderPage()       // 페이지 렌더링
  ↓
PageModule.init()  // 이벤트 바인딩
```

### 상태 관리
- **전역**: `App` 객체 (currentPage, history, params)
- **로컬**: localStorage (최근 본 레시피, 신고, 닉네임)
- **클라이언트 DB**: IndexedDB (레시피, 쇼핑리스트, 설정)
- **서버 DB**: Firebase Realtime (커뮤니티)

### 데이터 흐름
```
UI 입력
  ↓
이벤트 핸들러
  ↓
db.js (CRUD)
  ↓
Components.js (렌더링)
  ↓
화면 업데이트
```

## IndexedDB 스키마

### recipes
- **키**: id (자동 증가)
- **인덱스**:
  - category, subcategory, difficulty, isFavorite
  - prepTime, cookTime, servings
  - tags, createdAt, updatedAt
  - isVerified, imageVerified (신규)
- **필드**: title, description, image, ingredients[], steps[], tags[], 등

### shoppingList
- **키**: id
- **필드**: recipeId, ingredients[], servings, addedAt

### settings
- **키**: name
- **필드**: value

### categories
- **키**: id
- **필드**: name, icon, subcategories[]

## Firebase 연동

### Realtime Database
- **컬렉션**: recipes
- **구조**:
  ```json
  {
    "recipes": {
      "recipeId": {
        "title": "...",
        "author": "...",
        "content": "...",
        "comments": [...],
        "createdAt": timestamp
      }
    }
  }
  ```

### 실시간 리스너
```javascript
setupRealtimeListener() // 다른 사용자 변경사항 반영
```

## 코드 품질

### 강점
- 기능 충실 (CRUD, 검색, 커뮤니티, 이미지 검증)
- 모바일 친화적 (반응형 디자인)
- 오프라인 지원 (IndexedDB)
- 실시간 동기화 (Firebase)
- 빠른 로딩 (번들러 없음)

### 개선 기회
- **모듈화**: ES6 modules로 전환 (현재 전역 변수 다수)
- **타입 안전성**: TypeScript 도입
- **테스트**: 단위/E2E 테스트 추가
- **빌드**: Vite/Webpack으로 최적화
- **보안**: API 키 환경변수화 (현재 노출)
- **성능**: 이미지 CDN, 가상 스크롤
- **접근성**: ARIA, 키보드 네비게이션
- **린팅**: ESLint, Prettier 설정

## 파일 크기

- **전체**: ~1.5MB
- **JS**: 496KB (seed-data 제외 시 ~350KB)
- **CSS**: 68KB
- **총 라인 수**: ~12,000줄

## 성능 고려사항

### 잘 구현된 부분
- IndexedDB 인덱싱 (13개)
- 이미지 리사이징 (800px)
- XSS 방지 (escapeHtml)
- Firebase 캐싱 (1년)

### 개선 가능 부분
- 대규모 데이터셋 처리 (가상 스크롤)
- 이미지 최적화 (WebP, lazy loading)
- 코드 분할 (동적 import)
- 서비스 워커 (PWA)

## 보안 분석

### 위험 요소
- **API 키 노출**: Pexels API 키가 코드에 하드코딩
- **입력 검증**: 기본적 XSS 방지만 적용
- **CORS**: API 호출 시 정책 미명확

### 권장 사항
- 환경 변수로 API 키 이동
- 입력 검증 강화
- Content Security Policy 추가

## 의존성

### 외부 서비스
- Firebase Hosting
- Firebase Realtime Database
- Pexels API

### 라이브러리
- 없음 (순수 Vanilla JS)

## 다음 단계 제안

1. **단기** (1-2주)
   - package.json 추가
   - ESLint/Prettier 설정
   - API 키 환경변수화
   - 기본 테스트 추가

2. **중기** (1-2개월)
   - TypeScript 마이그레이션
   - Vite 빌드 도구 도입
   - 단위 테스트 커버리지 50%
   - PWA 전환 (서비스 워커)

3. **장기** (3-6개월)
   - React/Vue 전환 고려
   - 백엔드 API 분리
   - CI/CD 파이프라인
   - E2E 테스트 자동화

## 결론

FoodBooks는 **프로토타입/MVP로서는 매우 성공적**입니다. 핵심 기능이 완성되어 있고, 사용자 경험도 우수합니다. 하지만 **장기 유지보수와 확장성**을 위해 단계적 현대화가 필요합니다.

현재 상태: ⭐⭐⭐⭐☆ (4/5)
- 기능: ⭐⭐⭐⭐⭐
- 코드 품질: ⭐⭐⭐☆☆
- 문서화: ⭐⭐☆☆☆ (이 문서 추가 후 ⭐⭐⭐⭐☆)
- 테스트: ⭐☆☆☆☆
- 확장성: ⭐⭐⭐☆☆

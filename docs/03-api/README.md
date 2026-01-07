# API Documentation

FoodBooks의 데이터베이스 스키마 및 외부 API 연동 문서입니다.

## IndexedDB Schema

### Database: FoodBooksDB (v2)

#### Object Store: recipes

레시피 정보를 저장합니다.

**키**: `id` (자동 증가)

**인덱스**:
- `category`: 카테고리 (한식, 중식, 일식 등)
- `subcategory`: 서브카테고리
- `difficulty`: 난이도 (easy, medium, hard)
- `isFavorite`: 즐겨찾기 여부
- `prepTime`: 준비 시간 (분)
- `cookTime`: 조리 시간 (분)
- `servings`: 인원 수
- `tags`: 태그 배열
- `createdAt`: 생성 시간
- `updatedAt`: 수정 시간
- `isVerified`: 검증 여부
- `imageVerified`: 이미지 검증 여부
- `autoDetectedImageUrl`: 자동 감지 이미지 URL (신규)
- `autoDetectConfidence`: 자동 감지 신뢰도 (신규)

**스키마**:
```javascript
{
  id: number,              // 자동 생성
  title: string,           // 레시피 제목
  description: string,     // 설명
  category: string,        // 카테고리
  subcategory: string,     // 서브카테고리
  difficulty: string,      // easy | medium | hard
  prepTime: number,        // 준비 시간 (분)
  cookTime: number,        // 조리 시간 (분)
  servings: number,        // 인원 수
  image: string,           // Base64 또는 URL
  ingredients: [           // 재료 배열
    {
      name: string,        // 재료명
      amount: number,      // 양
      unit: string,        // 단위 (g, ml, 개 등)
      category: string     // 재료 카테고리
    }
  ],
  steps: [                 // 조리 단계
    {
      order: number,       // 순서
      description: string  // 설명
    }
  ],
  tags: string[],          // 태그
  isFavorite: boolean,     // 즐겨찾기
  famousRestaurants: string[], // 유명 맛집
  createdAt: timestamp,    // 생성 시간
  updatedAt: timestamp,    // 수정 시간
  isVerified: boolean,     // 검증 여부
  imageVerified: boolean,  // 이미지 검증 여부
  autoDetectedImageUrl: string,     // 자동 감지 이미지
  autoDetectConfidence: number      // 신뢰도 (0-1)
}
```

#### Object Store: shoppingList

쇼핑리스트 항목을 저장합니다.

**키**: `id` (자동 생성)

**스키마**:
```javascript
{
  id: number,              // 자동 생성
  recipeId: number,        // 레시피 ID
  recipeTitle: string,     // 레시피 제목
  ingredients: [           // 재료 배열
    {
      name: string,
      amount: number,
      unit: string,
      checked: boolean     // 체크 여부
    }
  ],
  servings: number,        // 인원 수
  addedAt: timestamp       // 추가 시간
}
```

#### Object Store: settings

사용자 설정을 저장합니다.

**키**: `name` (설정 이름)

**스키마**:
```javascript
{
  name: string,            // 설정 이름
  value: any               // 설정 값
}
```

**예시**:
- `theme`: 'light' | 'dark'
- `language`: 'ko' | 'en'
- `defaultServings`: number

#### Object Store: categories

카테고리 정보를 저장합니다.

**키**: `id` (자동 생성)

**스키마**:
```javascript
{
  id: number,
  name: string,            // 카테고리명
  icon: string,            // 이모지 아이콘
  subcategories: [         // 서브카테고리
    {
      name: string,
      description: string
    }
  ]
}
```

## IndexedDB API (db.js)

### 레시피 CRUD

#### addRecipe(recipe)
```javascript
const recipe = {
  title: '김치찌개',
  category: '한식',
  difficulty: 'easy',
  prepTime: 10,
  cookTime: 20,
  servings: 2,
  ingredients: [...],
  steps: [...],
  tags: ['#한식', '#간편요리']
}

const id = await db.addRecipe(recipe)
```

#### getRecipe(id)
```javascript
const recipe = await db.getRecipe(123)
```

#### updateRecipe(id, updates)
```javascript
await db.updateRecipe(123, {
  title: '김치찌개 (업데이트)',
  cookTime: 25
})
```

#### deleteRecipe(id)
```javascript
await db.deleteRecipe(123)
```

#### getAllRecipes()
```javascript
const recipes = await db.getAllRecipes()
```

### 검색 & 필터

#### searchRecipes(query, filters)
```javascript
const results = await db.searchRecipes('김치', {
  category: '한식',
  difficulty: 'easy',
  tags: ['#간편요리'],
  maxCookTime: 30
})
```

#### getRecipesByCategory(category)
```javascript
const koreanFood = await db.getRecipesByCategory('한식')
```

#### getFavoriteRecipes()
```javascript
const favorites = await db.getFavoriteRecipes()
```

#### toggleFavorite(id)
```javascript
await db.toggleFavorite(123)
```

### 쇼핑리스트

#### addToShoppingList(recipeId, servings)
```javascript
await db.addToShoppingList(123, 4) // 4인분
```

#### getShoppingList()
```javascript
const list = await db.getShoppingList()
```

#### updateShoppingItem(id, checked)
```javascript
await db.updateShoppingItem(456, true) // 체크
```

#### deleteShoppingItem(id)
```javascript
await db.deleteShoppingItem(456)
```

### 데이터 관리

#### exportData()
```javascript
const data = await db.exportData()
// JSON 파일로 다운로드
```

#### importData(data)
```javascript
const file = event.target.files[0]
const text = await file.text()
const data = JSON.parse(text)
await db.importData(data)
```

## Firebase Realtime Database

### 커뮤니티 게시물

**경로**: `/recipes`

**스키마**:
```json
{
  "recipes": {
    "recipeId1": {
      "title": "김치찌개 레시피",
      "author": "요리왕",
      "content": "레시피 내용...",
      "category": "한식",
      "images": ["url1", "url2"],
      "likes": 15,
      "views": 120,
      "comments": [
        {
          "author": "댓글작성자",
          "content": "맛있어 보여요!",
          "createdAt": 1234567890
        }
      ],
      "createdAt": 1234567890,
      "updatedAt": 1234567890
    }
  }
}
```

### Firebase API (community.js)

#### Community.createPost(post)
```javascript
const post = {
  title: '김치찌개 레시피',
  author: '요리왕',
  content: '...',
  category: '한식'
}

await Community.createPost(post)
```

#### Community.getPosts(filters)
```javascript
const posts = await Community.getPosts({
  category: '한식',
  limit: 20,
  orderBy: 'createdAt'
})
```

#### Community.updatePost(id, updates)
```javascript
await Community.updatePost('recipeId1', {
  title: '업데이트된 제목'
})
```

#### Community.deletePost(id)
```javascript
await Community.deletePost('recipeId1')
```

#### Community.addComment(postId, comment)
```javascript
await Community.addComment('recipeId1', {
  author: '댓글작성자',
  content: '맛있어 보여요!'
})
```

#### Community.reportPost(postId)
```javascript
await Community.reportPost('recipeId1')
// 로컬 스토리지에 신고 기록 저장
// 5회 이상 신고 시 자동 숨김
```

## Pexels API

### 이미지 검색

**Endpoint**: `https://api.pexels.com/v1/search`

**API 키**: `WJdYLaLMxokly9sPiHieF3...YCZ6mpwts4RGe34KcnfxnJXW`

**요청**:
```javascript
const response = await fetch(
  `https://api.pexels.com/v1/search?query=${food}&per_page=20&page=1`,
  {
    headers: {
      Authorization: API_KEY
    }
  }
)
```

**응답**:
```json
{
  "photos": [
    {
      "id": 123456,
      "url": "...",
      "src": {
        "original": "https://...",
        "large": "https://...",
        "medium": "https://...",
        "small": "https://..."
      },
      "photographer": "...",
      "photographer_url": "..."
    }
  ],
  "total_results": 500,
  "page": 1,
  "per_page": 20
}
```

### 음식명 영어 매핑

**image-verification.js**에 100+개 음식명 매핑:

```javascript
const foodNameMap = {
  '김치찌개': 'kimchi stew',
  '된장찌개': 'soybean paste stew',
  '비빔밥': 'bibimbap',
  '불고기': 'bulgogi',
  ...
}
```

### 이미지 검증 API

#### ImageVerification.searchImages(foodName)
```javascript
const images = await ImageVerification.searchImages('김치찌개')
// 자동으로 영어로 변환되어 검색
```

#### ImageVerification.detectDuplicates(imageUrl)
```javascript
const isDuplicate = ImageVerification.detectDuplicates(url)
// true/false 반환
```

#### ImageVerification.verifyImageMatch(title, imageUrl)
```javascript
const isMatch = ImageVerification.verifyImageMatch(
  '김치찌개',
  'https://...'
)
// 제목과 이미지 일치 여부 확인
```

## localStorage

### 저장 항목

```javascript
// 최근 본 레시피 (최대 10개)
localStorage.setItem('recentRecipes', JSON.stringify([123, 456, 789]))

// 커뮤니티 닉네임
localStorage.setItem('community_nickname', '요리왕')

// 커뮤니티 즐겨찾기
localStorage.setItem('community_favorites', JSON.stringify(['recipeId1', 'recipeId2']))

// 신고한 게시물
localStorage.setItem('community_reports', JSON.stringify(['recipeId3']))
```

## 에러 처리

### IndexedDB 에러
```javascript
try {
  await db.addRecipe(recipe)
} catch (error) {
  console.error('레시피 저장 실패:', error)
  showToast('레시피 저장에 실패했습니다.')
}
```

### Firebase 에러
```javascript
try {
  await Community.createPost(post)
} catch (error) {
  console.error('게시물 작성 실패:', error)
  showToast('네트워크 연결을 확인해주세요.')
}
```

### Pexels API 에러
```javascript
try {
  const images = await ImageVerification.searchImages(food)
} catch (error) {
  console.error('이미지 검색 실패:', error)
  showToast('이미지 검색에 실패했습니다.')
}
```

## 보안 고려사항

### API 키 보호
- **현재 상태**: 하드코딩 (보안 취약)
- **권장 사항**: 환경 변수 또는 서버 프록시 사용

### CORS 정책
- Pexels API: CORS 허용
- Firebase: CORS 설정 필요

### 입력 검증
```javascript
// XSS 방지
const sanitized = Utils.escapeHtml(userInput)
```

## 다음 단계

- [아키텍처](../02-architecture/README.md) - 시스템 구조
- [개발 가이드](../04-development/README.md) - API 활용

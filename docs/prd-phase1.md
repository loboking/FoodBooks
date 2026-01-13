# FoodBooks Phase 1 PRD
# 알림 기능, 레시피 평가, 다중 이미지 지원

---

## 1. 개요

### 1.1 프로젝트 목적
FoodBooks 레시피 관리 애플리케이션의 핵심 사용자 경험을 강화하기 위해 다음 3가지 기능을 구현:
1. 알림 기능 (Notification API)
2. 레시피 평가 시스템 (별점, 후기)
3. 다중 이미지 지원 (단계별 사진)

### 1.2 대상 사용자
- 요리 초보: 타이머 알림 필요
- 레시피 공유 사용자: 평점/후기 참고 필요
- 디테일 중시 사용자: 단계별 조리 과정 사진 필요

---

## 2. 기능 상세

### 2.1 알림 기능 (Notification API)

#### 2.1.1 기능 설명
- 요리 모드 타이머 종료 시 시스템 알림 표시
- 백그라운드에서도 알림 수신 가능
- 알림 클릭 시 앱으로 복귀

#### 2.1.2 사용자 시나리오
1. 사용자가 요리 모드로 진입
2. 타이머 설정 후 시작
3. 화면 꺼진 상태 또는 다른 앱 사용 중
4. 타이머 완료 시 시스템 알림 표시
5. 알림 클릭 → 요리 모드 화면으로 복귀

#### 2.1.3 기술 요건
- Web Notifications API 사용
- 권한 요청 (Notification.requestPermission)
- 서비스 워커 등록 (백그라운드 지원)
- FCM (Firebase Cloud Messaging) 선택적 고려

#### 2.1.4 UI/UX 요건
- 알림 내용: "FoodBooks - 타이머 완료!", "요리 완료!"
- 알림 아이콘: 앱 아이콘 사용
- 알림 클릭 시 해당 레시피 상세 페이지로 이동

#### 2.1.5 데이터베이스 스키마 변경
없음 (새 필드 불필요)

#### 2.1.6 API 변경
없음 (프론트엔드 내부 처리)

---

### 2.2 레시피 평가 시스템 (별점, 후기)

#### 2.2.1 기능 설명
- 레시피별 별점 평가 (1~5점)
- 텍스트 후기 작성
- 별점/후기 리스트 표시
- 평균 별점 자동 계산

#### 2.2.2 사용자 시나리오
1. 사용자가 레시피 상세 페이지 진입
2. "요리 완료" 후 별점/후기 작성 모달 표시
3. 별점 선택 (1~5) 및 후기 텍스트 입력
4. 저장 → 레시피 상세에 평균 별점/후기 리스트 표시
5. 다른 사용자의 후기도 표시 (로컬 데이터베이스)

#### 2.2.3 기술 요건
- IndexedDB reviews 스토어 생성
- 별점 계산 로직 (평균, 개수)
- 별점 컴포넌트 (별 아이콘 UI)

#### 2.2.4 UI/UX 요건
- 별점: ⭐⭐⭐⭐⭐ 호버/클릭 인터랙션
- 후기 입력: 텍스트 영역 (최대 500자)
- 후기 리스트: 최신순 정렬, 작성자/날짜 표시
- 평균 별점: 레시피 카드 및 상세 페이지에 표시

#### 2.2.5 데이터베이스 스키마 변경

**새로운 objectStore: reviews**
```javascript
{
  id: string,           // 고유 ID
  recipeId: string,     // 레시피 ID (외래 키)
  rating: number,       // 1~5 정수
  review: string,       // 후기 텍스트
  author: string,       // 작성자 (선택)
  createdAt: string,     // ISO 8601
}
```

**recipes objectStore에 추가 필드:**
```javascript
{
  averageRating: number,    // 평균 별점 (0~5)
  reviewCount: number,     // 후기 개수
}
```

#### 2.2.6 API 변경
- db.js에 새로운 메서드 추가:
  - `addReview(recipeId, rating, review, author)`
  - `getReviews(recipeId)`
  - `calculateAverageRating(recipeId)`
  - `updateRecipeRating(recipeId, averageRating, count)`

---

### 2.3 다중 이미지 지원 (단계별 사진)

#### 2.3.1 기능 설명
- 레시피 조리 순서별 이미지 추가
- 단계별 이미지 표시 (상세, 요리 모드)
- 이미지 드래그앤드롭 순서 변경

#### 2.3.2 사용자 시나리오
1. 사용자가 레시피 작성/수정 페이지 진입
2. 각 조리 단계별 이미지 추가 버튼
3. 이미지 선택 (로컬 파일 또는 Pexels API)
4. 이미지 순서 변경 (드래그앤드롭)
5. 저장 → 상세 페이지에서 단계별 이미지 표시
6. 요리 모드에서 현재 단계 이미지 표시

#### 2.3.3 기술 요건
- 레시피 스키마 변경: `steps` 필드 구조 변경
- 이미지 업로드 (Base64 또는 Firebase Storage)
- 드래그앤드롭 정렬 (HTML5 Drag & Drop API)

#### 2.3.4 UI/UX 요건
- 단계별 이미지 미리보기
- 이미지 추가/삭제 버튼
- 순서 변경 핸들 (≡)
- 요리 모드에서 현재 단계 이미지 확대 가능

#### 2.3.5 데이터베이스 스키마 변경

**기존 steps 필드 구조 변경:**
```javascript
// 기존
steps: ['단계1 텍스트', '단계2 텍스트']

// 변경 후
steps: [
  {
    id: string,           // 단계 ID (드래그앤드롭용)
    text: string,         // 단계 설명
    image: string|null,   // 이미지 URL (선택)
    time: number|null     // 추정 시간 (분)
  }
]
```

#### 2.3.6 API 변경
- db.js에 마이그레이션 로직 필요:
  - 기존 steps 데이터를 새로운 구조로 변환
  - `migrateStepsToNewFormat()` 메서드

---

## 3. 데이터베이스 마이그레이션

### 3.1 IndexedDB 버전 업그레이드
- 현재 버전: 2
- 새로운 버전: 3

### 3.2 마이그레이션 스크립트

```javascript
// db.js의 onupgradeneeded 핸들러에 추가
request.onupgradeneeded = (event) => {
    const db = event.target.result;

    // reviews 스토어 생성
    if (!db.objectStoreNames.contains('reviews')) {
        const reviewStore = db.createObjectStore('reviews', { keyPath: 'id' });
        reviewStore.createIndex('recipeId', 'recipeId', { unique: false });
        reviewStore.createIndex('createdAt', 'createdAt', { unique: false });
    }

    // recipes 스토어 인덱스 추가
    const recipeStore = event.target.transaction.objectStore('recipes');
    if (!recipeStore.indexNames.contains('averageRating')) {
        recipeStore.createIndex('averageRating', 'averageRating', { unique: false });
    }

    // 기존 steps 데이터 마이그레이션
    if (event.oldVersion < 3) {
        migrateStepsToNewFormat(db);
    }
};

async function migrateStepsToNewFormat(db) {
    const recipes = await getAllRecipes();
    for (const recipe of recipes) {
        if (recipe.steps && Array.isArray(recipe.steps)) {
            const newSteps = recipe.steps.map((step, index) => {
                // 기존 텍스트 형식 → 객체 형식 변환
                if (typeof step === 'string') {
                    return {
                        id: `step_${index}`,
                        text: step,
                        image: null,
                        time: Utils.extractTimeFromText(step)
                    };
                }
                // 이미 객체 형식이면 그대로 사용
                return {
                    id: step.id || `step_${index}`,
                    text: step.text || '',
                    image: step.image || null,
                    time: step.time || null
                };
            });
            await updateRecipe(recipe.id, { steps: newSteps });
        }
    }
}
```

---

## 4. 구현 우선순위

### 4.1 Task 순서
1. **Task 1: 레시피 평가 시스템** (가장 독립적, 영향력 큼)
2. **Task 2: 알림 기능** (요리 모드 연동 필요)
3. **Task 3: 다중 이미지 지원** (데이터 마이그레이션 필요)

### 4.2 각 Task 예상 소요 시간
- Task 1: 4-6시간
- Task 2: 3-4시간
- Task 3: 6-8시간

---

## 5. 테스트 계획

### 5.1 단위 테스트
- 별점 계산 로직
- 평균 별점 업데이트
- 마이그레이션 스크립트
- 알림 권한 요청

### 5.2 통합 테스트
- 요리 완료 → 알림 → 별점 작성 → 저장 → 상세 표시
- 레시피 작성 → 단계별 이미지 추가 → 저장 → 상세 표시
- 기존 데이터 마이그레이션 → 단계별 이미지 확인

### 5.3 사용자 테스트 시나리오
1. **시나리오 A: 완전한 요리 사이클**
   - 레시피 선택 → 요리 모드 → 타이머 설정 → 알림 수신 → 별점 작성

2. **시나리오 B: 레시피 작성 및 수정**
   - 새 레시피 작성 → 단계별 이미지 추가 → 저장 → 상세 확인 → 수정

3. **시나리오 C: 마이그레이션 확인**
   - 기존 레시피 로드 → 단계 구조 확인 → 별점 작성 → 데이터 저장

---

## 6. 리스크 및 완화 방안

### 6.1 알림 기능
- **리스크**: 브라우저 권한 거부
- **완화**: 권한 거부 시 대체 수단 (비프음, 진동) 제공

### 6.2 레시피 평가
- **리스크**: 기존 레시피 데이터 호환성
- **완화**: 마이그레이션 스크립트 철저 테스트

### 6.3 다중 이미지
- **리스크**: 이미지 저장소 용량 문제 (Base64)
- **완화**: 이미지 리사이징 (800px), Firebase Storage 검토

---

## 7. 성공 지표

### 7.1 기술적 지표
- 알림 수신율 90% 이상
- 별점 계산 정확도 100%
- 마이그레이션 데이터 손실 0

### 7.2 사용자 경험 지표
- 별점 작성 완료율 50% 이상
- 알림 클릭률 70% 이상
- 다중 이미지 사용률 30% 이상

---

## 8. 향후 확장 가능성

### 8.1 알림
- 식단 알림
- 재료 유통기한 알림

### 8.2 평가 시스템
- 사진 후기
- 평가 필터 (최신, 높은 별점)

### 8.3 다중 이미지
- GIF/비디오 지원
- 이미지 AI 태그 추천

---

## 9. 참고 문헌

- [Web Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [HTML5 Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

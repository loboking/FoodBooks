# Operations Guide

FoodBooks 운영 및 모니터링 가이드입니다.

## 모니터링

### Firebase Console

#### Hosting 사용량
1. Firebase Console > Hosting
2. 사용량 탭 확인
   - 스토리지 사용량
   - 트래픽 (GB/월)
   - 요청 수

#### Realtime Database
1. Firebase Console > Realtime Database
2. 데이터 탭: 실시간 데이터 확인
3. 사용량 탭:
   - 다운로드 (GB/월)
   - 동시 연결 수
   - 스토리지 사용량

### 브라우저 개발자 도구

#### 성능 모니터링
1. F12 > Performance 탭
2. 녹화 시작 후 페이지 조작
3. 분석:
   - 렌더링 시간
   - JavaScript 실행 시간
   - 네트워크 요청 시간

#### 네트워크 모니터링
1. F12 > Network 탭
2. 확인 항목:
   - API 응답 시간
   - 이미지 로드 시간
   - 실패한 요청

#### 콘솔 로그
1. F12 > Console 탭
2. 에러 메시지 확인
3. 경고 메시지 확인

## 일상 운영

### 커뮤니티 관리

#### 신고된 게시물 확인
- 로컬 스토리지의 `community_reports` 확인
- 5회 이상 신고 시 자동 숨김
- 필요 시 Firebase Console에서 수동 삭제

#### 스팸 방지
```javascript
// community.js
// 1분에 3개 이상 게시물 작성 방지
const rateLimiter = {
  posts: [],
  isAllowed() {
    const now = Date.now()
    this.posts = this.posts.filter(t => now - t < 60000)
    if (this.posts.length >= 3) {
      return false
    }
    this.posts.push(now)
    return true
  }
}
```

### 데이터 백업

#### IndexedDB 백업
```javascript
// 설정 페이지에서 수동 백업
const data = await db.exportData()
// JSON 파일 다운로드
```

#### Firebase 백업
```bash
# Firebase Console > Realtime Database > 백업
# 자동 백업 설정 (유료 플랜)
```

### 데이터 정리

#### 오래된 쇼핑리스트 삭제
```javascript
// 7일 이전 항목 삭제
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000
const now = Date.now()

db.getAllShoppingItems().then(items => {
  items.forEach(item => {
    if (now - item.addedAt > SEVEN_DAYS) {
      db.deleteShoppingItem(item.id)
    }
  })
})
```

## 성능 최적화

### IndexedDB 최적화

#### 인덱스 활용
```javascript
// ❌ 전체 스캔
const recipes = await db.getAllRecipes()
const korean = recipes.filter(r => r.category === '한식')

// ✅ 인덱스 활용
const korean = await db.getRecipesByCategory('한식')
```

#### 트랜잭션 배치
```javascript
// ❌ 개별 트랜잭션
for (const recipe of recipes) {
  await db.addRecipe(recipe)
}

// ✅ 단일 트랜잭션
const db = await db.initDB()
const tx = db.transaction(['recipes'], 'readwrite')
const store = tx.objectStore('recipes')
for (const recipe of recipes) {
  store.add(recipe)
}
await tx.complete
```

### 이미지 최적화

#### 이미지 크기 제한
```javascript
// utils.js에서 800px로 리사이즈
imageToBase64(file, maxWidth = 800)
```

#### CDN 사용 (권장)
```javascript
// Pexels 이미지 URL 직접 사용 (Base64 대신)
recipe.image = pexelsImageUrl // CDN 활용
```

### 네트워크 최적화

#### 캐싱
```json
// firebase.json
{
  "headers": [
    {
      "source": "**/*.@(js|css)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=31536000"
        }
      ]
    }
  ]
}
```

## 트러블슈팅

### 일반적인 문제

#### 1. IndexedDB 오류

**증상**: 레시피가 저장되지 않음

**원인**:
- 프라이빗 모드
- 쿠키 차단
- 스토리지 용량 초과

**해결**:
1. 일반 모드로 전환
2. 브라우저 설정에서 쿠키 허용
3. 불필요한 데이터 삭제

#### 2. Firebase 연결 오류

**증상**: 커뮤니티 게시물 로드 실패

**원인**:
- 네트워크 연결 끊김
- Firebase 규칙 오류
- API 키 만료

**해결**:
1. 네트워크 연결 확인
2. Firebase Console > Realtime Database > 규칙 확인
3. Firebase 프로젝트 상태 확인

#### 3. 이미지 검색 실패

**증상**: Pexels 이미지 검색 결과 없음

**원인**:
- API 할당량 초과
- CORS 오류
- API 키 오류

**해결**:
1. Pexels 대시보드에서 할당량 확인
2. 브라우저 콘솔에서 CORS 에러 확인
3. API 키 갱신

#### 4. 느린 로딩

**증상**: 페이지 로딩이 느림

**원인**:
- 대량의 레시피 데이터
- 큰 이미지 파일
- 네트워크 지연

**해결**:
1. 페이지네이션 구현
2. 이미지 CDN 활용
3. 가상 스크롤 도입

### 에러 로그 분석

#### 브라우저 콘솔
```javascript
// 에러 패턴 분석
console.error('IndexedDB 에러:', error)
console.warn('API 할당량 경고')
```

#### Firebase Console
1. Realtime Database > 규칙 탭
2. 거부된 요청 확인

## 보안 운영

### API 키 관리

#### 정기 갱신
1. Pexels API 키 3개월마다 갱신
2. Firebase API 키 확인

#### 노출 모니터링
```bash
# GitHub에 API 키 노출 확인
git log -p | grep -i "api.key"
```

### 신고 시스템

#### 자동 숨김
```javascript
// 5회 이상 신고 시 자동 숨김
const reports = JSON.parse(localStorage.getItem('community_reports') || '[]')
if (reports.filter(r => r === postId).length >= 5) {
  // 게시물 숨김
}
```

## 사용자 지원

### 자주 묻는 질문 (FAQ)

#### Q: 레시피가 저장되지 않아요
A: 프라이빗 모드가 아닌지 확인하고, 브라우저 쿠키 설정을 확인해주세요.

#### Q: 이미지 검색이 안 돼요
A: 네트워크 연결을 확인하고, 음식명을 한글 또는 영어로 입력해주세요.

#### Q: 커뮤니티 게시물이 안 보여요
A: Firebase 연결 상태를 확인하고, 페이지를 새로고침해주세요.

### 피드백 수집

#### GitHub Issues
사용자 피드백을 GitHub Issues로 수집

#### 개선 사항 우선순위
1. 버그 수정
2. 성능 개선
3. 새 기능 추가

## 업데이트 계획

### 정기 업데이트
- **주간**: 버그 수정, 소소한 개선
- **월간**: 새 기능 추가, 성능 최적화
- **분기**: 대규모 리팩토링, 아키텍처 개선

### 배포 전략
1. 로컬 테스트
2. 스테이징 환경 배포 (향후)
3. 프로덕션 배포
4. 모니터링

## 용량 관리

### IndexedDB 용량
- 브라우저별 제한: ~50MB
- 정기적 데이터 정리 권장

### Firebase 무료 플랜 한도
- Hosting: 10GB/월
- Realtime DB: 1GB 스토리지, 10GB/월 다운로드
- 100 동시 연결

### 용량 초과 시
1. 유료 플랜 전환 고려
2. 데이터 아카이빙
3. CDN 활용

## 다음 단계

- [참조 문서](../07-reference/README.md) - 기술 스택 및 용어집
- [배포 가이드](../05-deployment/README.md) - 배포 프로세스

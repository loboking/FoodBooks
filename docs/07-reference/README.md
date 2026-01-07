# Reference

FoodBooks 기술 스택 및 참조 문서입니다.

## 기술 스택

### 프론트엔드

#### HTML5
- 시맨틱 태그 활용
- 모바일 viewport 설정

#### CSS3
- CSS Variables (테마)
- Flexbox & Grid
- 미디어 쿼리 (반응형)
- 애니메이션 & 트랜지션

#### JavaScript (ES6+)
- Arrow Functions
- Async/Await
- Destructuring
- Template Literals
- Modules (향후 도입 예정)

### 데이터베이스

#### IndexedDB
- **버전**: v2
- **Object Stores**: recipes, shoppingList, settings, categories
- **인덱싱**: 13개 인덱스
- **용량**: ~50MB (브라우저별 다름)

#### Firebase Realtime Database
- NoSQL JSON 데이터베이스
- 실시간 동기화
- 오프라인 지원

### 외부 서비스

#### Firebase Hosting
- **URL**: https://foodbooks-community.web.app
- **SSL**: 자동 인증서
- **CDN**: 글로벌 배포
- **캐싱**: 1년 (CSS, JS)

#### Pexels API
- **Endpoint**: https://api.pexels.com/v1
- **Rate Limit**: 200 requests/hour (무료 플랜)
- **이미지**: 무료 고품질 사진

## 카테고리 & 태그

### 카테고리 (11개)
- 한식 (Korean)
- 중식 (Chinese)
- 일식 (Japanese)
- 양식 (Western)
- 디저트 (Dessert)
- 베이킹 (Baking)
- 샐러드 (Salad)
- 스프 (Soup)
- 음료 (Beverage)
- 밑반찬 (Side Dish)
- 기타 (Others)

### 태그 (20개)
- #간편요리 (Easy)
- #다이어트 (Diet)
- #채식 (Vegetarian)
- #비건 (Vegan)
- #글루텐프리 (Gluten-free)
- #저칼로리 (Low-calorie)
- #고단백 (High-protein)
- #파티 (Party)
- #손님접대 (Guests)
- #아이간식 (Kids)
- #도시락 (Lunchbox)
- #야식 (Late-night)
- #술안주 (Snack)
- #간식 (Snack)
- #브런치 (Brunch)
- #캠핑 (Camping)
- #일식 (Japanese)
- #중식 (Chinese)
- #양식 (Western)
- #퓨전 (Fusion)

### 난이도
- **easy**: 쉬움 (30분 이내, 기본 재료)
- **medium**: 보통 (1시간 이내, 중간 난이도)
- **hard**: 어려움 (1시간 이상, 고급 기술)

## 재료 단위

### 고체
- g (그램)
- kg (킬로그램)
- 개 (개수)
- 쪽 (마늘, 생강)
- 줌 (파, 채소)
- 컵 (cup, 200ml)
- 큰술 (15ml)
- 작은술 (5ml)

### 액체
- ml (밀리리터)
- L (리터)
- 컵 (200ml)
- 큰술 (15ml)
- 작은술 (5ml)

### 특수
- 약간 (소량)
- 적당량
- 조금

## 음식명 영어 매핑 (100+개)

### 한식
- 김치찌개: kimchi stew
- 된장찌개: soybean paste stew
- 비빔밥: bibimbap
- 불고기: bulgogi
- 떡볶이: tteokbokki
- 삼겹살: samgyeopsal
- 냉면: naengmyeon
- 잡채: japchae
- 김밥: kimbap

### 중식
- 짜장면: jajangmyeon
- 짬뽕: jjamppong
- 탕수육: sweet and sour pork
- 마파두부: mapo tofu
- 깐풍기: gan pung gi
- 군만두: fried dumplings

### 일식
- 초밥: sushi
- 라멘: ramen
- 우동: udon
- 돈카츠: tonkatsu
- 규동: gyudon
- 오야코동: oyakodon

### 양식
- 파스타: pasta
- 피자: pizza
- 스테이크: steak
- 샐러드: salad
- 햄버거: hamburger
- 샌드위치: sandwich

## 브라우저 지원

### 데스크톱
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### 모바일
- Chrome (Android) ✅
- Safari (iOS 14+) ✅
- Samsung Internet ✅

### 필수 기능
- IndexedDB ✅
- ES6+ ✅
- CSS Variables ✅
- Flexbox ✅

## API 엔드포인트

### IndexedDB (로컬)
```
indexedDB://FoodBooksDB/recipes
indexedDB://FoodBooksDB/shoppingList
indexedDB://FoodBooksDB/settings
indexedDB://FoodBooksDB/categories
```

### Firebase Realtime Database
```
https://foodbooks-community.firebaseio.com/recipes
```

### Pexels API
```
GET https://api.pexels.com/v1/search?query={food}&per_page=20
Headers:
  Authorization: {API_KEY}
```

## 성능 메트릭

### 목표
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

### 현재 (예상)
- FCP: ~1.2s
- LCP: ~2.0s
- TTI: ~3.0s
- CLS: ~0.05

## 파일 크기

### JavaScript
- app.js: ~15KB
- db.js: ~18KB
- utils.js: ~12KB
- components.js: ~25KB
- pages/*.js: ~100KB
- seed-data.js: ~150KB
- **총**: ~320KB (압축 전)

### CSS
- styles.css: ~42KB
- community.css: ~13KB
- image-verification.css: ~8KB
- **총**: ~63KB

### 전체
- HTML: ~10KB
- JS: ~320KB
- CSS: ~63KB
- **총**: ~393KB (이미지 제외)

## 의존성

### 프로덕션
없음 (순수 Vanilla JS)

### 개발 (향후)
- ESLint: 린팅
- Prettier: 포맷팅
- Vite: 빌드 도구
- TypeScript: 타입 안전성

## 용어집

### SPA
Single Page Application - 단일 페이지로 구성된 웹 애플리케이션

### IndexedDB
브라우저 내장 NoSQL 데이터베이스

### Firebase
Google의 모바일/웹 개발 플랫폼

### Pexels
무료 스톡 사진 제공 서비스

### CRUD
Create, Read, Update, Delete - 데이터 기본 작업

### XSS
Cross-Site Scripting - 웹 보안 취약점

### CORS
Cross-Origin Resource Sharing - 교차 출처 리소스 공유

### CDN
Content Delivery Network - 콘텐츠 전송 네트워크

### PWA
Progressive Web App - 네이티브 앱 같은 웹 앱

## 라이선스

MIT License

Copyright (c) 2026 FoodBooks

## 외부 리소스

### 문서
- [MDN Web Docs](https://developer.mozilla.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Pexels API Docs](https://www.pexels.com/api/documentation/)

### 튜토리얼
- [IndexedDB Guide](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

### 도구
- [Can I Use](https://caniuse.com/) - 브라우저 호환성
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Firebase Console](https://console.firebase.google.com/)

## 버전 히스토리

### v1.0.0 (2026-01-07)
- 초기 릴리스
- 레시피 CRUD 기능
- IndexedDB 저장소
- Firebase 커뮤니티
- Pexels 이미지 검색
- 문서화 완료

## 기여자

- Claude Code (개발 지원)
- Gemini (분석 및 제안)

## 연락처

GitHub Issues를 통해 문의해주세요.

---

마지막 업데이트: 2026-01-07

# FoodBooks

> 나만의 레시피북 - 레시피 관리 및 공유 웹 애플리케이션

## 개요

FoodBooks는 개인 레시피를 관리하고 커뮤니티와 공유할 수 있는 웹 애플리케이션입니다. 오프라인 지원, 실시간 커뮤니티, 스마트 이미지 검색 기능을 제공합니다.

## 주요 기능

### 📚 레시피 관리
- 레시피 생성, 수정, 삭제
- 카테고리별 분류 (한식, 중식, 일식, 양식 등)
- 태그 시스템 (#간편요리, #다이어트, #파티 등)
- 즐겨찾기 기능
- 난이도 및 조리 시간 설정

### 🔍 검색 & 필터
- 텍스트 검색 (제목, 설명, 재료)
- 다중 필터 (카테고리, 태그, 난이도, 시간)
- 정렬 옵션 (최신순, 이름순, 난이도순)

### 👥 커뮤니티
- 실시간 게시판 (Firebase Realtime Database)
- 댓글 및 신고 기능
- 닉네임 설정
- 레시피 공유

### 🍳 요리 모드
- 전체 화면 단계별 가이드
- 타이머 기능
- 단계별 체크

### 🛒 쇼핑리스트
- 레시피별 재료 자동 추가
- 인원 조정 (자동 재료량 계산)
- 체크리스트 관리

### 🖼️ 이미지 관리
- Pexels API 기반 이미지 검색
- 음식명 자동 영어 변환
- 이미지 검증 도구
- 중복 이미지 감지

## 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+)
- **로컬 저장소**: IndexedDB
- **실시간 DB**: Firebase Realtime Database
- **호스팅**: Firebase Hosting
- **이미지 검색**: Pexels API
- **언어**: 한국어

## 시작하기

### 필수 요구사항

- Node.js 14+ (Firebase CLI 사용 시)
- 웹 브라우저 (Chrome, Firefox, Safari 등)
- Firebase 프로젝트 (커뮤니티 기능 사용 시)

### 설치

1. 저장소 클론
```bash
git clone <repository-url>
cd FoodBooks
```

2. Firebase CLI 설치 (선택사항)
```bash
npm install -g firebase-tools
```

3. Firebase 로그인
```bash
firebase login
```

### 실행

#### 로컬 개발 서버

**방법 1: Firebase CLI**
```bash
npm run serve
# 또는
firebase serve
```

**방법 2: 간단한 HTTP 서버**
```bash
python -m http.server 8000
# 또는
npx serve
```

브라우저에서 `http://localhost:5000` (Firebase) 또는 `http://localhost:8000` 접속

### 배포

```bash
npm run deploy
# 또는
firebase deploy
```

## 프로젝트 구조

```
FoodBooks/
├── index.html              # 메인 애플리케이션
├── community.html          # 커뮤니티 게시판
├── image-collector.html    # 이미지 수집 도구
├── image-verification.html # 이미지 검증 도구
├── firebase.json           # Firebase 설정
├── package.json            # npm 스크립트
├── CLAUDE.md               # 프로젝트 가이드
├── js/
│   ├── app.js             # 라우팅 & 상태 관리
│   ├── db.js              # IndexedDB 관리
│   ├── utils.js           # 유틸리티 함수
│   ├── components.js      # UI 컴포넌트
│   ├── community.js       # 커뮤니티 로직
│   ├── image-verification.js # 이미지 검증
│   ├── seed-data.js       # 샘플 데이터
│   └── pages/             # 페이지 모듈
│       ├── home.js
│       ├── recipes.js
│       ├── recipe-detail.js
│       ├── recipe-form.js
│       ├── shopping.js
│       ├── cooking-mode.js
│       └── settings.js
├── css/
│   ├── styles.css
│   ├── community.css
│   └── image-verification.css
└── docs/                   # 문서
    ├── 01-getting-started/
    ├── 02-architecture/
    ├── 03-api/
    ├── 04-development/
    ├── 05-deployment/
    ├── 06-operations/
    └── 07-reference/
```

## 문서

- [전체 문서](./docs/README.md)
- [시작 가이드](./docs/01-getting-started/README.md)
- [아키텍처](./docs/02-architecture/README.md)
- [프로젝트 분석](./docs/02-architecture/project-analysis.md)
- [API 문서](./docs/03-api/README.md)
- [개발 가이드](./docs/04-development/README.md)
- [배포 가이드](./docs/05-deployment/README.md)

## 사용 방법

### 레시피 추가

1. 하단 네비게이션에서 **레시피** 탭 선택
2. **+** 버튼 클릭
3. 레시피 정보 입력 (제목, 카테고리, 재료, 조리 단계 등)
4. **저장** 버튼 클릭

### 이미지 검색

1. 레시피 작성 중 **이미지 검색** 버튼 클릭
2. 음식명 입력 (자동으로 영어로 변환됨)
3. 검색 결과에서 이미지 선택

### 커뮤니티 공유

1. `community.html` 페이지 접속
2. 닉네임 설정
3. 레시피 게시물 작성
4. 다른 사용자의 레시피 확인 및 댓글

### 데이터 백업

1. **설정** 탭 선택
2. **데이터 내보내기** 버튼 클릭
3. JSON 파일 다운로드

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

IndexedDB를 지원하는 모든 모던 브라우저에서 작동합니다.

## 라이선스

MIT License

## 기여

Issue 및 Pull Request를 환영합니다!

### 개발 가이드라인

1. 코드 스타일 준수
2. 의미 있는 커밋 메시지
3. 기능 추가 시 문서 업데이트

## 문의

프로젝트 관련 문의는 Issue를 통해 제출해주세요.

## 감사의 말

- [Pexels](https://www.pexels.com) - 무료 이미지 제공
- [Firebase](https://firebase.google.com) - 호스팅 및 데이터베이스 제공

---

⭐ 이 프로젝트가 유용하다면 Star를 눌러주세요!

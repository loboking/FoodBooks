# Deployment Guide

FoodBooks 배포 가이드입니다.

## Firebase Hosting 배포

### 사전 준비

#### 1. Firebase CLI 설치
```bash
npm install -g firebase-tools
```

#### 2. Firebase 로그인
```bash
firebase login
```

#### 3. 프로젝트 확인
```bash
firebase projects:list
```

현재 프로젝트: `foodbooks-community`

### 배포 프로세스

#### 1. 로컬 테스트
```bash
npm run serve
# 또는
firebase serve
```

`http://localhost:5000`에서 확인

#### 2. 배포
```bash
npm run deploy
# 또는
firebase deploy
```

#### 3. 특정 타겟만 배포
```bash
# 호스팅만
firebase deploy --only hosting

# 데이터베이스 규칙만
firebase deploy --only database
```

### Firebase 설정

#### firebase.json
```json
{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
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
}
```

#### .firebaserc
```json
{
  "projects": {
    "default": "foodbooks-community"
  }
}
```

## 환경 변수 설정

### Pexels API 키

**현재 상태**: 하드코딩 (js/image-verification.js)

**권장 방법**: 환경 변수

#### .env 파일 생성
```bash
VITE_PEXELS_API_KEY=your-api-key-here
```

#### .gitignore 추가
```
.env
.env.local
```

#### 코드 수정
```javascript
// ❌ 현재
const API_KEY = 'WJdYLaLMxokly9sPiHieF3...'

// ✅ 권장
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY
```

## 빌드 최적화 (향후)

### Vite 도입

#### 1. 설치
```bash
npm init -y
npm install -D vite
```

#### 2. vite.config.js
```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
})
```

#### 3. package.json 스크립트
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### 4. 배포
```bash
npm run build
firebase deploy
```

## CI/CD 파이프라인 (향후)

### GitHub Actions

#### .github/workflows/deploy.yml
```yaml
name: Deploy to Firebase

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_PEXELS_API_KEY: ${{ secrets.PEXELS_API_KEY }}

      - name: Deploy to Firebase
        uses: w9jds/firebase-action@master
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

#### GitHub Secrets 설정
1. GitHub Repository > Settings > Secrets
2. `PEXELS_API_KEY` 추가
3. `FIREBASE_TOKEN` 추가
   ```bash
   firebase login:ci
   # 생성된 토큰을 GitHub Secrets에 추가
   ```

## 배포 체크리스트

### 배포 전
- [ ] 로컬 테스트 완료
- [ ] API 키 환경 변수 확인
- [ ] .gitignore에 민감 정보 제외
- [ ] Firebase 프로젝트 설정 확인
- [ ] IndexedDB 마이그레이션 필요 여부 확인

### 배포 중
- [ ] `firebase deploy` 실행
- [ ] 배포 로그 확인
- [ ] 에러 없이 완료되었는지 확인

### 배포 후
- [ ] 프로덕션 URL 접속 확인
- [ ] 주요 기능 테스트 (CRUD, 검색, 커뮤니티)
- [ ] 브라우저 콘솔 에러 확인
- [ ] 모바일 반응형 확인
- [ ] IndexedDB 동작 확인
- [ ] Firebase Realtime DB 연결 확인

## 롤백

### 이전 버전으로 롤백
```bash
# 배포 히스토리 확인
firebase hosting:channel:list

# 특정 버전으로 롤백
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL_ID TARGET_SITE_ID:live
```

## 도메인 설정

### 커스텀 도메인 연결

1. Firebase Console > Hosting > 도메인 추가
2. 도메인 이름 입력 (예: `foodbooks.example.com`)
3. DNS 레코드 추가
   - Type: A
   - Name: @
   - Value: Firebase 제공 IP 주소
4. SSL 인증서 자동 발급 대기

## 성능 모니터링

### Firebase Performance Monitoring

#### 1. SDK 추가
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-performance.js"></script>
```

#### 2. 초기화
```javascript
const perf = firebase.performance()
```

#### 3. 커스텀 트레이스
```javascript
const trace = perf.trace('recipe_load')
trace.start()
// 레시피 로드 로직
trace.stop()
```

### Google Analytics

#### 1. Firebase Console에서 Analytics 활성화
#### 2. SDK 추가
```html
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js"></script>
```

#### 3. 이벤트 로깅
```javascript
const analytics = firebase.analytics()
analytics.logEvent('recipe_created', {
  category: '한식'
})
```

## 에러 추적

### Sentry 통합 (선택사항)

#### 1. 계정 생성 및 프로젝트 생성
```bash
npm install --save @sentry/browser
```

#### 2. 초기화
```javascript
Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: 'production'
})
```

#### 3. 에러 캡처
```javascript
try {
  // 코드
} catch (error) {
  Sentry.captureException(error)
}
```

## 보안 설정

### Firebase Security Rules

#### Realtime Database 규칙
```json
{
  "rules": {
    "recipes": {
      ".read": true,
      ".write": true,
      "$recipeId": {
        ".validate": "newData.hasChildren(['title', 'author', 'content'])"
      }
    }
  }
}
```

#### 배포
```bash
firebase deploy --only database
```

### HTTPS 강제
Firebase Hosting은 기본적으로 HTTPS를 강제합니다.

### Content Security Policy (CSP)

#### firebase.json에 추가
```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; img-src 'self' https://images.pexels.com; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
          }
        ]
      }
    ]
  }
}
```

## 트러블슈팅

### 배포 실패

**증상**: `Error: HTTP Error: 403`

**해결**:
```bash
firebase login --reauth
firebase use foodbooks-community
firebase deploy
```

### IndexedDB 초기화 필요

**증상**: 스키마 변경 후 에러

**해결**:
1. 개발자 도구 > Application > IndexedDB
2. FoodBooksDB 삭제
3. 페이지 새로고침

### Firebase 연결 오류

**증상**: 커뮤니티 게시물 로드 실패

**해결**:
1. Firebase Console에서 Realtime Database 규칙 확인
2. 네트워크 연결 확인
3. API 키 확인

## 다음 단계

- [운영 가이드](../06-operations/README.md) - 운영 및 모니터링
- [아키텍처](../02-architecture/README.md) - 시스템 구조

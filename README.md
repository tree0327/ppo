# Creative Developer Portfolio Website

창의성과 기술의 만남으로 새로운 경험을 만드는 프론트엔드 개발자 포트폴리오 웹사이트입니다.

## 🚀 프로젝트 개요

이 프로젝트는 Next.js에서 정적 HTML/CSS/JavaScript로 변환된 포트폴리오 웹사이트입니다. SCSS를 활용한 컴포넌트 기반 아키텍처와 웹 표준, 접근성, 반응형 디자인을 모두 고려하여 제작되었습니다.

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업과 웹 접근성 준수
- **SCSS**: 컴포넌트 기반 스타일링과 변수 관리
- **JavaScript (ES6+)**: 인터랙티브 기능과 애니메이션
- **CSS Grid & Flexbox**: 현대적인 레이아웃 시스템
- **GSAP**: 고성능 애니메이션 라이브러리
- **AOS**: 스크롤 기반 애니메이션
- **Bootstrap**: UI 컴포넌트 프레임워크 (커스터마이징됨)

## 📁 프로젝트 구조

```
design/
├── index.html              # 메인 HTML 파일
├── style.css              # 컴파일된 CSS 파일
├── style.css.map          # CSS 소스맵
├── package.json           # 프로젝트 설정 및 스크립트
├── README.md              # 프로젝트 문서
├── img/                   # 이미지 및 SVG 파일들
│   ├── profile.jpg        # 프로필 이미지
│   ├── project1.jpg       # 프로젝트 이미지
│   ├── svg-gradients.svg  # SVG 그라디언트 정의
│   └── progress-ring.svg  # 프로그레스 링 SVG
├── js/                    # JavaScript 파일들
│   └── main.js           # 메인 JavaScript 로직
└── scss/                  # SCSS 소스 파일들
    ├── style.scss         # 메인 SCSS 파일 (imports)
    ├── abstracts/         # 추상화 레이어
    │   ├── _variables.scss # 색상, 폰트, 간격 변수
    │   └── _mixins.scss   # 재사용 가능한 믹스인
    ├── common/            # 공통 스타일
    │   ├── _base.scss     # 기본 스타일 및 리셋
    │   ├── _components.scss # 재사용 가능한 컴포넌트
    │   └── _layout.scss   # 레이아웃 관련 스타일
    └── pages/             # 페이지별 스타일
        ├── _hero.scss     # Hero 섹션 스타일
        ├── _about.scss    # About 섹션 스타일
        ├── _projects.scss # Projects 섹션 스타일
        ├── _process.scss  # Process 섹션 스타일
        ├── _skills.scss   # Skills 섹션 스타일
        ├── _contact.scss  # Contact 섹션 스타일
        └── _footer.scss   # Footer 섹션 스타일
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: #D4B996 (베이지)
- **Secondary**: #A67B5B (다크 베이지)
- **Background**: #F5E6D3 (라이트 베이지)
- **Text**: #4A3C2C (다크 브라운)

### 타이포그래피
- **Primary Font**: Space Grotesk (현대적이고 가독성 좋은 폰트)
- **Monospace Font**: JetBrains Mono (코드 블록용)

### 컴포넌트
- **버튼**: `.btn`, `.btn-primary`, `.btn-outline`, `.btn-secondary`
- **카드**: `.card`, `.card-info`, `.card-form`
- **그리드**: `.grid-2-cols`, `.grid-3-cols`, `.grid-4-cols`
- **폼**: `.form-input`, `.form-textarea`, `.form-label`

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. SCSS 컴파일
```bash
# CSS 빌드
npm run build:css

# SCSS 감시 모드 (개발 시)
npm run watch:css

# 개발 서버 실행
npm run dev
```

### 3. 브라우저에서 확인
`index.html` 파일을 브라우저에서 열어 확인하세요.

## 📱 반응형 디자인

- **Mobile**: 767px 이하
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px 이상

모든 섹션이 다양한 화면 크기에 최적화되어 있습니다.

## ♿ 웹 접근성

- **ARIA 속성**: `aria-label`, `aria-describedby`, `role` 등
- **키보드 네비게이션**: 모든 인터랙티브 요소에 키보드 접근 지원
- **스크린 리더**: 시맨틱 마크업과 적절한 레이블링
- **고대비 모드**: `prefers-contrast: high` 미디어 쿼리 지원
- **모션 감소**: `prefers-reduced-motion: reduce` 지원

## 🎭 애니메이션

- **GSAP**: 고성능 애니메이션과 ScrollTrigger
- **AOS**: 스크롤 기반 요소 애니메이션
- **CSS Transitions**: 부드러운 상태 변화
- **Hover Effects**: 인터랙티브한 사용자 경험

## 🔧 커스터마이징

### 색상 변경
`scss/abstracts/_variables.scss`에서 CSS 변수를 수정하세요:

```scss
:root {
  --bs-primary: #D4B996;    // 메인 색상
  --bs-secondary: #A67B5B;  // 보조 색상
  // ... 기타 색상들
}
```

### 컴포넌트 스타일 수정
각 섹션별 SCSS 파일에서 해당 스타일을 수정할 수 있습니다.

## 📝 코딩 컨벤션

### 클래스 네이밍
- **BEM 방법론**: `block-element-modifier`
- **케밥 케이스**: `kebab-case` 사용
- **의미있는 이름**: 기능과 역할을 명확히 표현

### SCSS 구조
- **변수**: `scss/abstracts/_variables.scss`
- **믹스인**: `scss/abstracts/_mixins.scss`
- **컴포넌트**: `scss/common/_components.scss`
- **섹션별**: `scss/pages/_*.scss`

## 🗂️ 파일 관리

### .sass-cache 폴더
`.sass-cache` 폴더는 SCSS 컴파일 시 자동으로 생성되는 임시 파일들을 저장하는 폴더입니다. 이 폴더는:

- **용도**: SCSS 컴파일 성능 향상을 위한 캐시 파일 저장
- **위치**: 프로젝트 루트 디렉토리
- **내용**: 컴파일된 SCSS의 중간 결과물들
- **삭제 가능**: 언제든지 안전하게 삭제 가능 (재컴파일 시 자동 생성)

**주의사항**: 
- `.sass-cache` 폴더는 Git에 커밋하지 마세요
- 개발 완료 후 삭제해도 됩니다
- SCSS 파일 수정 시 자동으로 재생성됩니다

### Gitignore 설정
```gitignore
# SCSS 캐시
.sass-cache/
*.css.map

# 의존성
node_modules/

# 환경 설정
.env
.env.local
```

## 🐛 문제 해결

### SCSS 컴파일 오류
```bash
# 캐시 삭제 후 재컴파일
rm -rf .sass-cache/
npm run build:css
```

### 스타일이 적용되지 않는 경우
1. `style.css` 파일이 최신 상태인지 확인
2. 브라우저 캐시 삭제
3. CSS 파일 경로 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Made with ❤️ by Creative Developer**

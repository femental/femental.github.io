# femental.github.io

개발자 포트폴리오. 순수 HTML/CSS 하나로 **웹 페이지**와 **PDF**를 같이 만들어요.

- 웹: https://femental.github.io/
- PDF: https://femental.github.io/portfolio.pdf

## 파일 구조

| 파일 | 역할 |
| --- | --- |
| `index.html` | 내용 전부 (여기만 고치면 웹·PDF 둘 다 바뀌어요) |
| `style.css` | 화면용 스타일 (다크 모드 포함) |
| `print.css` | PDF용 스타일 (A4, 여백, 페이지 나눔) |
| `scripts/build-pdf.mjs` | Playwright로 `index.html` → `portfolio.pdf` |
| `.github/workflows/deploy.yml` | push하면 PDF 생성 + Pages 배포 |

## 로컬에서 PDF 만들기

```bash
npm install
PDF_BROWSER=msedge npm run pdf   # PC에 있는 Edge 사용 (chrome도 가능)
```

브라우저를 따로 받으려면 `npx playwright install chromium` 후 `npm run pdf`.

## 배포

1. 저장소 Settings → Pages → Source를 **GitHub Actions**로 설정
2. `main`에 push하면 자동으로 PDF를 만들고 배포해요

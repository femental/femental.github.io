// index.html → portfolio.pdf
//
// 사용법:
//   npm run pdf                        # Playwright가 받은 Chromium 사용
//   PDF_BROWSER=msedge npm run pdf      # PC에 설치된 Edge 사용 (chrome도 가능)
//
// 출력 경로는 PDF_OUT 환경 변수로 바꿀 수 있어요 (기본: ./portfolio.pdf)

import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = pathToFileURL(path.join(root, "index.html")).href;
const output = path.resolve(root, process.env.PDF_OUT ?? "portfolio.pdf");
const channel = process.env.PDF_BROWSER || undefined;

const browser = await chromium.launch(channel ? { channel } : {});
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  await page.goto(input, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);   // 웹폰트 로드 대기

  await page.pdf({
    path: output,
    preferCSSPageSize: true,   // print.css의 @page (A4, 여백) 사용
    printBackground: true,
    tagged: true,              // 접근성/텍스트 추출용 구조 정보
    outline: true,             // 제목 기반 책갈피
  });
  console.log(`PDF saved: ${path.relative(root, output)}`);
} finally {
  await browser.close();
}

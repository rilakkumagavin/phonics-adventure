# Phonics Adventure 專案交接與架構紀錄

最後更新：2026-07-21

本文件是換電腦、交接給其他工程師，或開始新的 Codex Session 時的主要入口。
開始修改前仍須先閱讀根目錄的 `AGENTS.md`，其規範優先於本文件。

## 1. 專案位置

- GitHub repository：<https://github.com/rilakkumagavin/phonics-adventure>
- 正式網站：<https://rilakkumagavin.github.io/phonics-adventure/>
- 主要分支：`main`
- 部署方式：GitHub Actions + GitHub Pages
- 部署 workflow：`.github/workflows/deploy-pages.yml`
- 正式站 base path：`/phonics-adventure/`

`main` 每次 push 都會執行型別檢查、lint、測試、建置與 Pages 部署。

## 2. 產品方向

### 核心目標

1. 強化自然發音與拼讀能力。
2. 讓孩子願意反覆聽、說、讀。
3. 採取小步驟、短時間、可重複的學習流程。
4. 參考 Google Read Along 的逐字閱讀節奏，但目前不做 AI 語音辨識。
5. 所有學習進度只儲存在目前瀏覽器，不建立帳號、後端或正式資料庫。

### 目標裝置

- iPad Safari
- Android 平板 Chrome
- 桌上型與筆記型電腦
- 滑鼠、鍵盤與觸控操作

### 教學原則

- 先播放標準音，再讓孩子跟讀。
- 提供錄音與回放，讓孩子自行比較，不判定發音正確或錯誤。
- 拼讀活動依序開放音段，再播放整字或完整句子。
- 答錯時提供重播、慢速、圖片或線索，不只顯示錯誤。
- 學生畫面避免 `phoneme`、`schema`、`localStorage` 等工程術語。

## 3. 目前完成範圍

### 字母課程

- A–Z 課程資料、核心單字、圖片與音訊。
- 字母音、單字音訊、短句、聽說讀活動。
- 聽音選圖、字母圖片配對、錄音回放與聲音分類。
- A–Z 本機進度與每日複習資料。

### 二年級

1. 短母音：a、e、i、o、u。
2. 字族：`-at`、`-an`、`-ap`、`-ox`、`-en`。
3. 子音組合：sh、ch、th、wh。
4. 子音連音：fr、dr、st、mp、tr。
5. Magic E：a_e、i_e、o_e、u_e。
6. 可拼讀短句與逐字播放。

### 三年級

1. 母音組合：ai、ay、ee、ea、oa、ow。
2. R 控制母音：ar、or、er、ir、ur。
3. 雙母音：oi、oy、ou、ow。
4. 進階子音組合：tch、dge、ph、ng。
5. 複合字與雙音節單字。
6. 短文流暢閱讀與逐字播放。

目前網站不包含 AI 語音辨識、發音評分、登入、雲端同步或錄音上傳。

## 4. 技術選型

| 項目 | 選擇                             | 原因                               |
| ---- | -------------------------------- | ---------------------------------- |
| 前端 | React 19                         | 適合重用課程與遊戲元件             |
| 語言 | TypeScript 5                     | 約束課程、活動、資產與進度格式     |
| 建置 | Vite 7                           | 開發啟動快，靜態部署簡單           |
| 路由 | React Router 7                   | 支援首頁、地圖、課程、遊戲與完成頁 |
| 樣式 | CSS Modules + 全域 tokens        | 元件隔離並維持共用視覺規則         |
| 狀態 | React 內建 state                 | MVP 不需要 Redux、Zustand          |
| 儲存 | `localStorage`                   | 無後端、資料量小、可版本化         |
| 音訊 | HTML Audio API                   | 播放、慢速與防止重疊               |
| 錄音 | `getUserMedia` + `MediaRecorder` | 只在記憶體暫存並回放               |
| 測試 | Vitest + Testing Library         | 課程資料、元件、進度與流程測試     |
| 品質 | ESLint + Prettier + TypeScript   | lint、格式與型別檢查               |
| 部署 | GitHub Pages                     | 靜態網站與自動化部署               |

沒有後端、API server、資料庫、登入服務或第三方 AI API。

## 5. 目錄架構

```text
.
├─ .github/workflows/       GitHub Pages 自動部署
├─ docs/
│  ├─ acceptance/           音訊、裝置與 MVP 驗收紀錄
│  └─ assets/               圖片與音訊規格、manifest
├─ public/assets/
│  ├─ audio/
│  │  ├─ courses/a-z/       A–Z 字母、單字與句子音訊
│  │  ├─ grade2/            二年級音段、單字與句子
│  │  └─ grade3/            三年級單字、音段與閱讀音訊
│  └─ images/
│     ├─ courses/a-z/       A–Z 正式圖片
│     ├─ grade2/            二年級課程圖片
│     ├─ grade3/            三年級課程圖片
│     └─ shared/            共用干擾圖
├─ scripts/                 Phase 12 驗收與音訊檢查腳本
├─ src/
│  ├─ app/                  App 外框與路由
│  ├─ assets/               部署 base path 資產網址處理
│  ├─ audio/                音訊播放與錄音 hooks
│  ├─ components/           共用版面與 UI 元件
│  ├─ courses/              A–Z 課程資料與 repository
│  ├─ curriculum/           二、三年級課程與 repository
│  ├─ pages/                各路由頁面
│  ├─ progress/             三套本機進度格式
│  ├─ review/               每日複習排程
│  ├─ styles/               全域樣式與 design tokens
│  ├─ test/                 測試環境設定
│  └─ types/                課程、活動與資產型別
├─ AGENTS.md                AI 工程代理最高層級規範
├─ README.md                產品背景與原始 Roadmap
├─ package.json             指令與依賴
└─ vite.config.ts           Vite、Vitest 與部署 base path
```

## 6. 頁面與路由

路由集中在 `src/app/router.tsx`。

| 路徑                            | 頁面                    | 責任                     |
| ------------------------------- | ----------------------- | ------------------------ |
| `/`                             | `HomePage`              | 目前進度與下一課入口     |
| `/map`                          | `LearningMapPage`       | A–Z 字母地圖             |
| `/today`                        | `TodayTaskPage`         | 每日複習與新內容         |
| `/lesson/:letterId`             | `LessonPage`            | 字母核心單字的聽、說、讀 |
| `/game/:gameId`                 | `GamePage`              | 共用遊戲容器             |
| `/grade/2`                      | `GradeTwoMapPage`       | 二年級單元與課程狀態     |
| `/grade/2/lesson/:lessonSlug`   | `ShortVowelLessonPage`  | 二年級逐音與合音         |
| `/grade/2/sentence/:lessonSlug` | `DecodableSentencePage` | 二年級逐字短句           |
| `/grade/3`                      | `GradeThreeMapPage`     | 三年級單元與課程狀態     |
| `/grade/3/lesson/:lessonSlug`   | `ShortVowelLessonPage`  | 三年級逐音、音節與整字   |
| `/grade/3/read/:lessonSlug`     | `DecodableSentencePage` | 三年級逐字與整句閱讀     |
| `/complete`                     | `CompletePage`          | 任務完成與進度寫入       |
| `/progress`                     | `ProgressPage`          | A–Z、二年級與三年級摘要  |

`createBrowserRouter` 使用 `import.meta.env.BASE_URL` 作為 basename。不要把
`/phonics-adventure/` 寫死在 React 路由中。

## 7. 資料流

### A–Z

```text
src/courses/data/a.ts ... z.ts
        ↓
courseIndex.ts / courseRepository.ts
        ↓
LessonPage / GamePage / LearningMapPage
        ↓
useAudioPlayer / useVoiceRecorder
        ↓
learningProgress.ts + dailyReview.ts
```

### 二、三年級

```text
src/curriculum/grade2*.ts / grade3*.ts
        ↓
gradeTwoLessonRepository.ts / gradeThreeLessonRepository.ts
        ↓
GradeTwoMapPage / GradeThreeMapPage
        ↓
ShortVowelLessonPage / DecodableSentencePage
        ↓
gradeTwoProgress.ts / gradeThreeProgress.ts
```

課程文字、音段、圖片與音訊路徑必須留在資料檔，不要寫死在頁面元件。
頁面只負責呈現、互動與呼叫 repository／progress API。

## 8. 課程與資產設計

### A–Z 課程

- 正式型別：`src/types/course.ts`
- 活動型別：`src/types/activity.ts`
- 資產型別：`src/types/asset.ts`
- 資料：`src/courses/data/`
- 查詢入口：`src/courses/courseRepository.ts`
- 驗證：`src/courses/validateCourse.ts`

### 二、三年級課程

- 通用拼讀型別：`src/curriculum/phonicsLesson.ts`
- 通用建立工具：`src/curriculum/createBlendingLesson.ts`
- 逐句閱讀型別：`src/curriculum/decodableSentence.ts`
- 年級地圖定義：`src/curriculum/grade2.ts`、`grade3.ts`

### 資產規則

- 瀏覽器公開路徑維持 `/assets/...`。
- 實體檔案放在 `public/assets/...`。
- 圖片使用 WebP；音訊主要使用 WAV，少數音段另有 OGG。
- manifest 與人工驗收資料放在 `docs/assets/`。
- 頁面和播放器必須使用 `src/assets/resolveAssetUrl.ts`，讓 GitHub Pages
  自動加上 `/phonics-adventure/`。
- 不要把 `src` 改成完整 GitHub Pages 網址。

## 9. 音訊與錄音

### 播放

`src/audio/useAudioPlayer.ts` 負責：

- 同一時間只播放一段音訊。
- 播放與慢速播放。
- loading、playing、idle、error 狀態。
- 切換音訊時停止上一段。
- 元件離開時清理音訊。
- 透過 `resolveAssetUrl` 處理本機與 GitHub Pages 路徑。

行動裝置不能自動播放，所有播放必須由孩子點擊後開始。

### 錄音

`src/audio/useVoiceRecorder.ts` 使用：

- `navigator.mediaDevices.getUserMedia({ audio: true })`
- `MediaRecorder`
- 記憶體中的 Blob URL

錄音不會上傳、不會長期儲存，離開頁面時應停止 stream 並清除 Blob URL。
麥克風拒絕或瀏覽器不支援時，主要聽讀流程仍須可用。

目前不做語音辨識或 AI 發音評分，也不得宣稱能判斷孩子發音正確性。

## 10. 本機進度

進度使用三個互不覆蓋的 version 1 storage key：

| 範圍   | storage key                              | 實作                    |
| ------ | ---------------------------------------- | ----------------------- |
| A–Z    | `phonics-adventure.learning-progress.v1` | `learningProgress.ts`   |
| 二年級 | `phonics-adventure.grade-2-progress.v1`  | `gradeTwoProgress.ts`   |
| 三年級 | `phonics-adventure.grade-3-progress.v1`  | `gradeThreeProgress.ts` |

資料會記錄：

- 課程完成狀態與完成日期。
- 最近練習日期。
- 各單字與各音段練習次數。
- 整字或合音播放次數。
- A–Z 的聽、說、讀熟練度與答對／答錯次數。
- 每日複習日期。

讀取時會驗證格式；損壞或不相容資料會安全退回空進度。
修改格式時必須新增版本與 migration，不能直接改 version 1 的語意。

### 換電腦時的進度注意事項

GitHub 只保存程式碼與正式課程資產，不會保存任何孩子的瀏覽器進度。
不同網域、瀏覽器與裝置也各有獨立的 `localStorage`。

在舊電腦的正式網站開啟瀏覽器開發者工具 Console，可產生備份：

```js
copy(
  JSON.stringify({
    letters: localStorage.getItem('phonics-adventure.learning-progress.v1'),
    grade2: localStorage.getItem('phonics-adventure.grade-2-progress.v1'),
    grade3: localStorage.getItem('phonics-adventure.grade-3-progress.v1'),
  }),
);
```

將得到的 JSON 安全保存。要在新電腦恢復時，先把內容指定給 `backup`，再執行：

```js
const keys = {
  letters: 'phonics-adventure.learning-progress.v1',
  grade2: 'phonics-adventure.grade-2-progress.v1',
  grade3: 'phonics-adventure.grade-3-progress.v1',
};

Object.entries(keys).forEach(([name, key]) => {
  if (backup[name]) localStorage.setItem(key, backup[name]);
});

location.reload();
```

備份內容屬於學習紀錄，不應提交到 GitHub。未來若需要一般使用者也能操作，
應另開單一 Task 建立「匯出／匯入進度」介面。

## 11. 樣式與互動設計

- 共用色彩、間距與尺寸放在 `src/styles/tokens.css`。
- 全域 reset 與基本排版放在 `src/styles/global.css`。
- 頁面與元件使用同目錄的 `*.module.css`。
- 觸控按鈕需足夠大，不依賴 hover。
- 平板橫向、直向與桌面都要可操作。
- 介面文字保持短、清楚、兒童友善。
- 答錯不使用只有紅叉的懲罰式回饋。
- 避免大型 UI 元件庫與不必要的狀態管理套件。

## 12. 新電腦開發步驟

### 必要工具

- Git
- Node.js 22 LTS
- npm
- GitHub 帳號；只有要 push 或管理 Pages 時才需要 GitHub CLI

### Clone 與啟動

```powershell
git clone https://github.com/rilakkumagavin/phonics-adventure.git
cd phonics-adventure
npm ci
npm.cmd run dev
```

開啟：

```text
http://127.0.0.1:5173/
```

在 macOS 或 Linux 可使用 `npm run dev`。PowerShell 文件使用 `npm.cmd`，
是為了避免本機 execution policy 阻擋 `npm.ps1`。

### 開始工作前

```powershell
git status
git pull --ff-only
npm ci
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test -- --run
```

永遠先讀 `AGENTS.md`、本文件與這次任務涉及的程式碼。

## 13. 品質與驗收

常用指令：

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test -- --run
npm.cmd run build
npm.cmd run format:check
```

目前完整測試基準為：

- 74 個 test files
- 417 個 tests

新增課程時至少驗證：

1. 資料型別與 repository 查詢。
2. 圖片、音訊檔案存在。
3. 音段依序開放與整字播放。
4. 完成後本機進度正確寫入。
5. 不覆蓋其他年級或 A–Z 的進度。
6. 重新整理後可繼續第一個未完成單字。
7. GitHub Pages base path 下圖片與音訊可載入。

人工驗收文件位於：

- `docs/acceptance/audio-listening-results.md`
- `docs/acceptance/device-and-workflow-results.md`
- `docs/acceptance/phase-12a-mvp-acceptance-checklist.md`

## 14. 部署流程

1. 修改完成後執行完整品質指令。
2. 確認 `git diff` 只包含本次 Scope。
3. commit 並 push 到 `main`。
4. `.github/workflows/deploy-pages.yml` 自動執行。
5. workflow 使用 `VITE_BASE_PATH=/phonics-adventure/` 建置。
6. `dist/index.html` 複製為 `dist/404.html`，讓深層 SPA 路由可直接開啟。
7. 到 GitHub Actions 確認 build 與 deploy 都成功。
8. 人工開啟正式首頁、深層課程頁並播放一段音訊。

不要手動提交 `dist/`；它由 workflow 產生。

## 15. 已知限制與風險

- 學習進度只存在單一瀏覽器，沒有自動跨裝置同步。
- 清除網站資料、無痕模式或瀏覽器重設會失去進度。
- 錄音格式與權限流程依 Safari／Chrome 版本而異。
- 行動裝置音訊必須由使用者操作後播放。
- GitHub Pages 是子路徑部署，所有公開資產都必須經 `resolveAssetUrl`。
- 正式 bundle 超過 Vite 500 kB 警告門檻；目前可用，後續可用路由 lazy loading
  降低初始下載量，但不應混入內容 Task。
- `ph` 的 `/f/` 人工聽驗曾被記錄為音量較低，修改前應重新人工比較來源。
- iPad Safari 與 Android Chrome 的完整實機錄音驗收仍應持續保留。
- 課程元件可以重用，但不要為不同語音規則建立過度通用的抽象。

## 16. 開發規則

- 每次只處理一個可驗收目標。
- 不因「順便整理」而大規模重構。
- 不覆蓋或刪除既有本機進度。
- 不上傳學生錄音或個人資料。
- 不加入登入、後端、資料庫或 AI 辨識，除非使用者明確拍板。
- 課程內容與元件行為分離。
- 新增正式音訊後要同步 manifest 並人工聽驗。
- 修改共用進度或課程型別時，測試範圍必須涵蓋所有使用者。

## 17. 下一個 Session 開場指令

可將以下內容交給下一個 Codex Session：

```text
請先閱讀根目錄 AGENTS.md、README.md 與 docs/PROJECT_HANDOFF.md。
目前正式站是 https://rilakkumagavin.github.io/phonics-adventure/，
repository 是 https://github.com/rilakkumagavin/phonics-adventure。

先執行 git status、git pull --ff-only、npm ci，再執行 typecheck、lint、
npm test -- --run。不要修改既有 localStorage key 或課程資料格式，除非本次
Task 明確要求。請先盤點本次任務影響範圍、Non-scope 與驗證方式，再開始修改。
```

## 18. Handoff 摘要

### 已完成

- React + TypeScript + Vite 網站。
- A–Z、二年級與三年級課程。
- 圖片、音訊、逐音、合音、逐字閱讀、錄音與回放。
- 三套互不覆蓋的本機進度。
- GitHub repository、GitHub Pages 與自動部署。

### 尚未完成

- AI 語音辨識與發音評分。
- 帳號、雲端進度同步與後端。
- 一般使用者可操作的進度匯出／匯入介面。
- 所有裝置版本的持續實機回歸測試。
- bundle lazy loading。

### 重要決策

- 發音功能只播放與錄音，不做辨識。
- 學習紀錄只存在本機。
- 課程資料與 UI 分離。
- 不建立大型狀態管理層。
- 正式部署使用 GitHub Pages 子路徑。

### 禁止任意修改

- `localStorage` storage key 與 version 1 資料語意。
- `AGENTS.md` 的安全與 Scope 規範。
- GitHub Pages base path 與 `resolveAssetUrl` 流程。
- 學生錄音不上傳的隱私邊界。

# Phase 12A MVP 人工驗收清單

更新日期：2026-07-05

## 問題層級

- 主要層級：驗收與部署判斷
- 次要層級：任務交接、產品判斷

## 目前狀態

Phase 12 的可自動驗收項目已完成：

- A～F 課程皆使用正式課程資料與圖片。
- A～F 共 34 個正式活動可由課程頁進入。
- 五種遊戲可依 `letterId` 與 `activityId` 載入課程活動。
- 36 個單字與句子候選 WAV 已接入課程。
- 本機學習進度、每日複習與完成頁已整合。
- 首頁、學習地圖、今日任務與進度頁皆讀取正式資料。

目前仍不能宣告 Phase 12 完成，因為下列項目需要人耳或實機證據：

1. 36 個候選 WAV 的人工聆聽驗收。
2. A `/æ/`、B `/b/`、C `/k/`、D `/d/`、E `/ɛ/`、F `/f/` 的人耳確認。
3. iPad Safari 與 Android Chrome 的麥克風實機驗收。
4. 完整人工操作驗收。

## Scope

本文件只記錄：

- 現有自動驗收證據。
- 人工聆聽步驟。
- 桌機與平板人工操作步驟。
- 真機麥克風驗收步驟。
- 尚未完成的內容與風險。

## Non-scope

- 不新增或修改程式碼。
- 不產生或替換音訊。
- 不使用字母名稱取代字母音。
- 不新增後端、登入、資料庫或外部 API。
- 不上傳學生錄音或學習紀錄。
- 不部署、不 push main。
- 不擴大到 G～Z。

## 自動驗收證據

Phase 12 可自動驗證項目可用下列指令一次執行：

```powershell
npm.cmd run phase12:auto-checks
```

此指令會執行格式檢查、lint、型別檢查、測試、建置、音訊 dry run 與外部證據狀態盤點。
也會執行實機測試伺服器 dry run，確認可列出供 iPad Safari 與 Android Chrome 使用的 LAN 測試網址。
外部證據盤點只列出人耳與實機缺口，不會把未測項目視為通過。

若需要給自動化工具讀取，可使用 JSON 摘要：

```powershell
npm.cmd run --silent phase12:auto-checks:json
```

開始人耳或實機驗收前，可先執行：

```powershell
npm.cmd run phase12:manual-ready
```

此指令會整理目前外部證據缺口、音訊人工聆聽結果檔狀態、音訊 manifest
是否可安全同步、實機驗收未測統計、iPad/Android 裝置資訊缺口、錄音 MIME 類型缺口與建議驗收順序。
若需要給自動化工具讀取，可使用：

```powershell
npm.cmd run --silent phase12:manual-ready:json
```

Phase 12 外部證據可用下列指令檢查：

```powershell
npm.cmd run phase12:evidence:status
```

等同於：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-phase12-evidence.ps1 -AllowIncomplete
```

若需要給自動化工具讀取，可使用 JSON 輸出：

```powershell
npm.cmd run phase12:evidence:json
```

等同於：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-phase12-evidence.ps1 -Json -AllowIncomplete
```

實機與人工流程表可用下列指令單獨檢查：

```powershell
npm.cmd run phase12:device-form:status
```

正式收斂時使用：

```powershell
npm.cmd run phase12:device-form
```

此檢查會要求表格狀態、iPad/Android 裝置資訊與錄音 MIME 類型都有實際填寫。

未加 `-AllowIncomplete` 時，若仍缺人耳、實機或人工流程證據，指令會以失敗碼結束，
用來避免誤宣告 MVP 整合驗收完成。
正式外部證據閘門也會檢查實機表完整性，包括 iPad/Android 裝置資訊與錄音 MIME 類型是否已填寫。

正式閘門可執行：

```powershell
npm.cmd run phase12:evidence
```

| 驗收項目                                        | 狀態 | 證據                                                                    |
| ----------------------------------------------- | ---- | ----------------------------------------------------------------------- |
| A～F 正式課程存在                               | 通過 | `src/courses/data/a.ts`～`f.ts`、`src/courses/courseRepository.test.ts` |
| 每課都有聽、說、讀活動                          | 通過 | `src/acceptance/mvpAcceptance.test.ts`                                  |
| 34 個活動路由有效                               | 通過 | `src/acceptance/mvpAcceptance.test.ts`                                  |
| 五種遊戲可載入正式活動                          | 通過 | `src/pages/GamePage/GamePage.test.tsx`                                  |
| 40 張課程圖片可用                               | 通過 | `src/acceptance/imageAssets.test.ts`                                    |
| 36 個候選 WAV 技術格式有效                      | 通過 | `src/acceptance/audioAssets.test.ts`                                    |
| A～F 六個獨立字母音皆已接入且未使用字母名稱替代 | 通過 | `src/acceptance/audioAssets.test.ts`                                    |
| 音訊錯誤與取消狀態可處理                        | 通過 | `src/audio/useAudioPlayer.test.tsx`                                     |
| 錄音權限與生命週期可處理                        | 通過 | `src/audio/useVoiceRecorder.test.tsx`                                   |
| 進度可儲存並拒絕損壞資料                        | 通過 | `src/progress/learningProgress.test.ts`                                 |
| 每日任務可產生且不重複                          | 通過 | `src/review/dailyReview.test.ts`                                        |
| 11 路由 × 2 視窗無溢出或破圖                    | 通過 | 2026-07-05 in-app Chromium 響應式矩陣                                   |

上述證據只能證明程式與資產的技術狀態，不能取代人耳音質判斷或實體裝置相容性驗收。

## 1. 候選音訊人工聆聽

逐一聆聽 `public/assets/audio/courses/a/` 到 `f/` 的 36 個 WAV。

每個檔案記錄：

- 發音是否符合美式英語目標。
- 單字重音是否自然。
- 句子語調是否自然。
- 開頭與結尾是否被截斷。
- 是否有爆音、雜訊、靜音過長或音量突變。
- 一般播放是否清楚。
- 網站慢速播放是否仍可理解。
- 結果：`通過`、`需重錄` 或 `需人工確認`。

課程 manifest 位於 `docs/assets/a-audio-manifest.json` 到
`docs/assets/f-audio-manifest.json`。全部檔案通過前，不得把
`reviewStatus` 改成已驗收。

人耳結果已完整寫入 `docs/acceptance/audio-listening-session.json` 後，先執行：

```powershell
npm.cmd run phase12:audio:sync-manifests:dry-run
```

若 dry run 顯示可同步，再執行：

```powershell
npm.cmd run phase12:audio:sync-manifests
```

此同步指令只會在 42 個音訊 ID 全部存在、全部唯一且結果全部為 `通過` 時更新 manifest；
若仍缺人耳結果、需重錄或需確認，指令會阻擋並保留 manifest 不變。

## 2. 獨立字母音來源

A 的 `/æ/`、B 的 `/b/`、C 的 `/k/`、D 的 `/d/`、E 的 `/ɛ/` 與
F 的 `/f/` 已使用具明確授權與來源頁的正式音訊。正式來源均符合：

- 是短而清楚的目標音，不附加字母名稱。
- 子音避免加入明顯的額外母音。
- 具有可確認的使用授權，或由專業人員自行錄製。
- 經人耳確認後才接入課程。

## 3. 網站人工操作

實際結果可記錄於 `docs/acceptance/device-and-workflow-results.md`。

啟動：

```powershell
npm.cmd run dev
```

桌機可使用：

```text
http://127.0.0.1:5173/
```

若要用 iPad Safari 或 Android Chrome 實機測試，請先取得同一 Wi-Fi / LAN 可連線的網址：

```powershell
npm.cmd run phase12:device-server:dry-run
```

正式啟動供平板連線的本機測試站：

```powershell
npm.cmd run phase12:device-server
```

平板請使用腳本列出的 `http://<LAN-IP>:5173/`。不要在平板上使用
`127.0.0.1`，因為那會指向平板本身，不是這台開發電腦。

依序驗收：

1. 開啟 `/`，確認今日入口、下一個字母與進度摘要合理。
2. 由導覽列切換首頁、今日任務、學習地圖與我的進度。
3. 在 `/map` 逐一進入 `/lesson/a` 到 `/lesson/f`。
4. 每課確認大小寫字母、3 個核心單字、句子圖片與聽說讀活動。
5. 每課至少完成一個聽力、一個口說及一個閱讀活動。
6. 確認五種遊戲都有答錯提示、重試與完成流程。
7. 完成三種能力後，確認該字母才標記完成。
8. 重新整理 `/progress`，確認計數與日期仍保留。
9. 開啟 `/today`，確認任務連結有效且完成後顯示「今天已完成」。
10. 再練同一活動，確認完成次數會再次累計。

預期：

- 不出現空白頁、未處理錯誤或錯誤課程內容。
- 正式單字與句子音訊可播放；字母音顯示友善待補訊息。
- 音訊切換時不重疊。
- 錄音不會上傳或長期保存。

## 4. 麥克風權限拒絕

1. 在瀏覽器拒絕麥克風權限。
2. 進入任一 `record-and-playback` 活動。
3. 點選開始錄音。

預期：

- 顯示「麥克風沒有開啟，還是可以先聽原音練習。」
- 頁面與其他學習功能仍可使用。
- 不產生空白錄音或未處理錯誤。

## 5. iPad Safari 實機

實際結果可記錄於 `docs/acceptance/device-and-workflow-results.md`。

至少使用一台支援 `MediaRecorder` 的目標 iPad 驗收：

1. 直向與橫向各開啟首頁、課程頁、今日任務、進度頁與五種遊戲。
2. 確認沒有水平捲動、文字重疊或無法觸控的主要控制。
3. 由使用者點擊播放音訊，確認一般與慢速播放。
4. 第一次允許麥克風，錄製至少 2 秒後停止並回放。
5. 重新錄音，確認舊錄音不再播放。
6. 離開錄音頁，確認瀏覽器不再顯示麥克風使用中。
7. 再次以拒絕權限流程驗收。

記錄 iPad 型號、iPadOS 版本、Safari 版本、錄音 MIME 類型與結果。

## 6. Android Chrome 實機

實際結果可記錄於 `docs/acceptance/device-and-workflow-results.md`。

至少使用一台目標 Android 平板驗收與 iPad 相同流程，另記錄：

- 裝置型號。
- Android 版本。
- Chrome 版本。
- 錄音 MIME 類型。
- 停止錄音後是否可立即回放。

## 7. 清除與損壞資料

在不保留重要進度的測試裝置上：

1. 完成活動後重新整理，確認進度保留。
2. 使用瀏覽器開發工具移除 `phonics-adventure-progress`。
3. 重新整理，確認網站以空白進度正常啟動。
4. 將該鍵改成無效 JSON 後重新整理。

預期：

- 網站不崩潰。
- 損壞資料被安全重設。
- 不會把進度傳送到外部服務。

## 驗收完成條件

Phase 12 只能在下列條件全部有證據後完成：

- 36 個候選 WAV 皆有人耳結果，需重錄項目已替換並重驗。
- 六個可靠字母音已接入並通過人耳確認。
- iPad Safari 麥克風允許與拒絕流程皆通過。
- Android Chrome 麥克風允許與拒絕流程皆通過。
- A～F 聽、說、讀與每日複習人工流程通過。
- 自動測試、lint、型別檢查、建置與格式檢查仍通過。

## 主要風險

- 系統 TTS 通過格式檢查，不代表適合兒童模仿。
- Safari 與 Chrome 可能產生不同錄音格式。
- 行動裝置音訊播放必須由使用者手勢啟動。
- `localStorage` 只屬於目前瀏覽器與裝置，清除網站資料會失去進度。
- 字母音的人耳結果若不自然，需替換後重新驗收。

## 尚未完成

- 36 個候選 WAV 的人耳結果。
- A～F 六個正式字母音的人耳確認。
- iPad Safari 實機紀錄。
- Android Chrome 實機紀錄。
- 完整人工操作紀錄。

## 下一個單一 Task

> 使用耳機逐一聆聽 36 個候選 WAV，回報每個檔案為「通過」或「需重錄」。

在取得這份外部證據前，不修改音訊 manifest 的人工驗收狀態。

## 給下一個 Session 的指令

請先閱讀 `AGENTS.md`、`README.md`、本文件與
`docs/assets/*-audio-manifest.json`。若使用者提供 36 個候選 WAV 的人工聆聽結果，
只更新對應 manifest 狀態並處理明確需重錄的檔案；不得用字母名稱替代字母音，
不得宣稱未做的 iPad 或 Android 實機驗收已通過，也不得擴大到 G～Z。

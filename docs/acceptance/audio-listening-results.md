# A～F 音訊人工聆聽紀錄

更新日期：2026-07-06

## 使用方式

可使用本機驗收工具依序播放並記錄：

```powershell
npm.cmd run phase12:audio:review
```

等同於：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/review-audio.ps1
```

工具會在每個音訊播放後接受：

- `Enter`：通過。
- `R`：需重錄。
- `?`：需確認。
- `P`：重播。
- `Q`：儲存目前進度並離開。

結果會寫入 `docs/acceptance/audio-listening-session.json`，再次執行時會從未完成項目接續。也可以不使用工具，直接依下表人工記錄。

1. 使用耳機，在網站課程頁或驗收工具依序播放每個音訊。
2. 一般速度與慢速各聽一次。
3. 將「結果」填為 `通過`、`需重錄` 或 `需確認`。
4. 發現問題時，在備註寫明錯音、雜音、截斷、音量或語調問題。
5. 全部完成前，不得修改各 manifest 的 `reviewStatus`。

42 個音訊全部都有結果且全部為 `通過` 後，先執行 dry run：

```powershell
npm.cmd run phase12:audio:sync-manifests:dry-run
```

確認可同步後，再正式更新 `docs/assets/*-audio-manifest.json` 的人耳驗收狀態：

```powershell
npm.cmd run phase12:audio:sync-manifests
```

若仍有缺漏、需重錄或需確認，正式同步會失敗且不修改 manifest。

判斷重點：

- 字母音不得播放字母名稱或完整單字、句子。
- B、C、D、F 子音不得附加明顯母音。
- 單字發音與美式英語目標一致。
- 句子重音與語調適合兒童模仿。
- 開頭、結尾沒有截斷、爆音、雜訊或過長靜音。

## A

| 類型   | 內容                    | 檔案                                                     | 結果 | 備註 |
| ------ | ----------------------- | -------------------------------------------------------- | ---- | ---- |
| 字母音 | `/æ/`                   | `public/assets/audio/courses/a/letter-sound.wav`         |      |      |
| 單字   | `apple`                 | `public/assets/audio/courses/a/apple.wav`                |      |      |
| 單字   | `ant`                   | `public/assets/audio/courses/a/ant.wav`                  |      |      |
| 單字   | `alligator`             | `public/assets/audio/courses/a/alligator.wav`            |      |      |
| 句子   | `An apple.`             | `public/assets/audio/courses/a/an-apple.wav`             |      |      |
| 句子   | `I see an ant.`         | `public/assets/audio/courses/a/i-see-an-ant.wav`         |      |      |
| 句子   | `The alligator is big.` | `public/assets/audio/courses/a/the-alligator-is-big.wav` |      |      |

## B

| 類型   | 內容               | 檔案                                                | 結果 | 備註 |
| ------ | ------------------ | --------------------------------------------------- | ---- | ---- |
| 字母音 | `/b/`              | `public/assets/audio/courses/b/letter-sound.wav`    |      |      |
| 單字   | `ball`             | `public/assets/audio/courses/b/ball.wav`            |      |      |
| 單字   | `bat`              | `public/assets/audio/courses/b/bat.wav`             |      |      |
| 單字   | `bus`              | `public/assets/audio/courses/b/bus.wav`             |      |      |
| 句子   | `a ball.`          | `public/assets/audio/courses/b/a-ball.wav`          |      |      |
| 句子   | `The bat is big.`  | `public/assets/audio/courses/b/the-bat-is-big.wav`  |      |      |
| 句子   | `The bus is blue.` | `public/assets/audio/courses/b/the-bus-is-blue.wav` |      |      |

## C

| 類型   | 內容                | 檔案                                                 | 結果 | 備註 |
| ------ | ------------------- | ---------------------------------------------------- | ---- | ---- |
| 字母音 | `/k/`               | `public/assets/audio/courses/c/letter-sound.wav`     |      |      |
| 單字   | `cat`               | `public/assets/audio/courses/c/cat.wav`              |      |      |
| 單字   | `cap`               | `public/assets/audio/courses/c/cap.wav`              |      |      |
| 單字   | `cup`               | `public/assets/audio/courses/c/cup.wav`              |      |      |
| 句子   | `A cat.`            | `public/assets/audio/courses/c/a-cat.wav`            |      |      |
| 句子   | `The cap is red.`   | `public/assets/audio/courses/c/the-cap-is-red.wav`   |      |      |
| 句子   | `The cup is clean.` | `public/assets/audio/courses/c/the-cup-is-clean.wav` |      |      |

## D

| 類型   | 內容                  | 檔案                                                   | 結果 | 備註 |
| ------ | --------------------- | ------------------------------------------------------ | ---- | ---- |
| 字母音 | `/d/`                 | `public/assets/audio/courses/d/letter-sound.wav`       |      |      |
| 單字   | `dog`                 | `public/assets/audio/courses/d/dog.wav`                |      |      |
| 單字   | `duck`                | `public/assets/audio/courses/d/duck.wav`               |      |      |
| 單字   | `drum`                | `public/assets/audio/courses/d/drum.wav`               |      |      |
| 句子   | `A dog.`              | `public/assets/audio/courses/d/a-dog.wav`              |      |      |
| 句子   | `The duck is yellow.` | `public/assets/audio/courses/d/the-duck-is-yellow.wav` |      |      |
| 句子   | `The drum is big.`    | `public/assets/audio/courses/d/the-drum-is-big.wav`    |      |      |

## E

| 類型   | 內容                   | 檔案                                                    | 結果 | 備註 |
| ------ | ---------------------- | ------------------------------------------------------- | ---- | ---- |
| 字母音 | `/ɛ/`                  | `public/assets/audio/courses/e/letter-sound.wav`        |      |      |
| 單字   | `egg`                  | `public/assets/audio/courses/e/egg.wav`                 |      |      |
| 單字   | `elephant`             | `public/assets/audio/courses/e/elephant.wav`            |      |      |
| 單字   | `elbow`                | `public/assets/audio/courses/e/elbow.wav`               |      |      |
| 句子   | `An egg.`              | `public/assets/audio/courses/e/an-egg.wav`              |      |      |
| 句子   | `The elephant is big.` | `public/assets/audio/courses/e/the-elephant-is-big.wav` |      |      |
| 句子   | `Touch your elbow.`    | `public/assets/audio/courses/e/touch-your-elbow.wav`    |      |      |

## F

| 類型   | 內容                 | 檔案                                                  | 結果 | 備註 |
| ------ | -------------------- | ----------------------------------------------------- | ---- | ---- |
| 字母音 | `/f/`                | `public/assets/audio/courses/f/letter-sound.wav`      |      |      |
| 單字   | `fish`               | `public/assets/audio/courses/f/fish.wav`              |      |      |
| 單字   | `fan`                | `public/assets/audio/courses/f/fan.wav`               |      |      |
| 單字   | `frog`               | `public/assets/audio/courses/f/frog.wav`              |      |      |
| 句子   | `A fish.`            | `public/assets/audio/courses/f/a-fish.wav`            |      |      |
| 句子   | `The fan is fast.`   | `public/assets/audio/courses/f/the-fan-is-fast.wav`   |      |      |
| 句子   | `The frog can jump.` | `public/assets/audio/courses/f/the-frog-can-jump.wav` |      |      |

## 課程結果

| 課程 | 7 個音訊皆完成 | 需重錄數 | 驗收者 | 日期 |
| ---- | -------------- | -------- | ------ | ---- |
| A    |                |          |        |      |
| B    |                |          |        |      |
| C    |                |          |        |      |
| D    |                |          |        |      |
| E    |                |          |        |      |
| F    |                |          |        |      |

## 完成條件

- 42 個音訊都有明確結果。
- 所有「需重錄」項目完成替換並再次驗收。
- 每課 7 個音訊全部通過後，才可將對應 manifest 的 `reviewStatus` 更新為已驗收。
- 本表只處理音訊；iPad Safari、Android Chrome 與完整人工流程仍需另外留下實機證據。

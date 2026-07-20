# D 圖片資產規格

## 目的

本文件定義 D 字母課程在 Phase 4D 後續要補上的圖片資產。
目前只先建立命名、比例、alt 與驗收方向，不生成圖片。

## 範圍

- 核心單字圖：`dog`、`duck`、`drum`
- 句子情境圖：`A dog.`、`The duck is yellow.`、`The drum is big.`
- 干擾圖暫不新增正式資產，先沿用 shared 規格或 placeholder

## 視覺方向

- 兒童友善
- 單一主體清楚
- 背景簡單
- 不出現文字
- 不做過度寫實或複雜場景
- `drum` 圖片應以鼓為主體，不加入人物或舞台

## 尺寸

### 核心單字圖

- 比例：`1:1`
- 建議尺寸：`1024x1024`
- 格式：`WebP`

### 句子情境圖

- 比例：`4:3`
- 建議尺寸：`1200x900`
- 格式：`WebP`

## 命名規則

```text
public/assets/images/courses/d/
  d-dog-core.webp
  d-duck-core.webp
  d-drum-core.webp
  d-sentence-a-dog.webp
  d-sentence-yellow-duck.webp
  d-sentence-big-drum.webp
```

## Alt 原則

- 用繁體中文
- 描述主體，不寫教學說明
- 保持簡短，可讓 `LessonPage` 直接使用

## Non-scope

- 本次不生成圖片
- 本次不建立 WebP 檔
- 本次不更新 `public/assets/images/courses/d/`
- 本次不延伸到 E～F

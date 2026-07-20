import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterQCourse = createFocusedLetterCourse({
  letter: 'Q',
  phoneticHint: '/kw/',
  soundLabel: 'QU 的合音',
  title: 'Q 和 U 的 /kw/ 合音',
  description: 'Q 常和 U 一起，在 quill、quilt、quail 開頭發出 /kw/。',
  studentHint: '先短短發出 /k/，立刻把嘴唇收圓接上 /w/。',
  teacherNote: '本課教常見 qu 組合，不把 Q 當成單獨固定音。',
  mouthPosition: '舌頭後方先抬起再放開，接著嘴唇快速收圓。',
  airflowHint: '短促氣流先放出，再平順接到圓唇音。',
  commonMistakes: [
    '不要只念字母名稱 Q。',
    '不要漏掉 /w/，把 qu 念成只有 /k/。',
    '兩個聲音要連在一起，不加額外母音。',
  ],
  stage: 'Phase 4Q',
  words: [
    {
      word: 'quill',
      meaningZhTW: '羽毛筆',
      imageAlt: '一支有藍色羽毛與金色筆尖的羽毛筆',
      actionHint: '假裝拿著羽毛筆寫字，再念 quill。',
      sceneHint: '單一藍色羽毛筆斜放，羽毛與筆尖完整。',
      tags: ['object', 'writing'],
      sentence: {
        text: 'A blue quill.',
        audioFilename: 'a-blue-quill.wav',
        teachingHintZhTW: '看見羽毛筆，聽聽 quill 開頭的 QU 聲。',
        imageAlt: '一支藍色羽毛筆的句子圖片',
      },
    },
    {
      word: 'quilt',
      meaningZhTW: '拼布被',
      imageAlt: '一條由紅藍綠黃布塊組成的拼布被',
      actionHint: '雙手抱住肩膀像蓋被子，再念 quilt。',
      sceneHint: '單一摺好的彩色拼布被置中。',
      tags: ['object', 'home'],
      sentence: {
        text: 'The quilt is soft.',
        audioFilename: 'the-quilt-is-soft.wav',
        teachingHintZhTW: '摸摸柔軟的拼布被，跟著讀 quilt。',
        imageAlt: '一條彩色拼布被的句子圖片',
      },
    },
    {
      word: 'quail',
      meaningZhTW: '鵪鶉',
      imageAlt: '一隻有斑點羽毛的棕色鵪鶉',
      actionHint: '雙手放在身旁像小翅膀，再念 quail。',
      sceneHint: '單一棕色鵪鶉全身入鏡，腳與羽毛清楚。',
      tags: ['animal', 'bird'],
      sentence: {
        text: 'A small quail.',
        audioFilename: 'a-small-quail.wav',
        teachingHintZhTW: '看見小鵪鶉，跟著讀 quail。',
        imageAlt: '一隻棕色鵪鶉的句子圖片',
      },
    },
  ],
});

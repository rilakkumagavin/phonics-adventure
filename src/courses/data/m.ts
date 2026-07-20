import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterMCourse = createFocusedLetterCourse({
  letter: 'M',
  phoneticHint: '/m/',
  soundLabel: 'M 的閉嘴鼻音',
  title: 'M 的閉嘴鼻音',
  description: 'M 在 mouse、moon、map 開頭發出雙唇閉合的 /m/ 聲。',
  studentHint: '雙唇輕輕閉起來，讓聲音從鼻子出來。',
  teacherNote: '讓孩子感受嘴唇與鼻腔震動，不加中文「摸」的尾音。',
  mouthPosition: '雙唇自然閉合，舌頭與下巴保持放鬆。',
  airflowHint: '聲帶震動，氣流從鼻腔通過。',
  commonMistakes: [
    '不要念成字母名稱 M。',
    '不要在 /m/ 後面加上「摸」的母音。',
    '聲音可以稍微延續，但不要變成完整音節。',
  ],
  stage: 'Phase 4M',
  words: [
    {
      word: 'mouse',
      meaningZhTW: '老鼠',
      imageAlt: '一隻表情友善的淺灰色小老鼠',
      actionHint: '雙手放在胸前像小爪子，再念 mouse。',
      sceneHint: '單一小老鼠全身入鏡，耳朵、腳與尾巴完整。',
      tags: ['animal', 'easy-to-recognize'],
      sentence: {
        text: 'A mouse.',
        audioFilename: 'a-mouse.wav',
        teachingHintZhTW: '看見小老鼠，聽聽 mouse 開頭的 M 聲。',
        imageAlt: '一隻淺灰色小老鼠的句子圖片',
      },
    },
    {
      word: 'moon',
      meaningZhTW: '月亮',
      imageAlt: '夜空中一彎明亮的黃色月亮',
      actionHint: '雙手彎成月牙形，再念 moon。',
      sceneHint: '單一黃色彎月置中，背景只有少量小星星。',
      tags: ['nature', 'sky'],
      sentence: {
        text: 'The moon is bright.',
        audioFilename: 'the-moon-is-bright.wav',
        teachingHintZhTW: '看見明亮月亮，跟著讀 moon。',
        imageAlt: '一彎明亮月亮的句子圖片',
      },
    },
    {
      word: 'map',
      meaningZhTW: '地圖',
      imageAlt: '一張有道路、河流與公園圖案的摺疊地圖',
      actionHint: '雙手向左右打開像攤開地圖，再念 map。',
      sceneHint: '單一地圖完整入鏡，不含任何文字標籤。',
      tags: ['object', 'travel'],
      sentence: {
        text: 'The map is open.',
        audioFilename: 'the-map-is-open.wav',
        teachingHintZhTW: '攤開地圖，跟著讀 map。',
        imageAlt: '一張攤開的地圖句子圖片',
      },
    },
  ],
});

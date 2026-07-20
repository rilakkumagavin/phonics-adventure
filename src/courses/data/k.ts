import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterKCourse = createFocusedLetterCourse({
  letter: 'K',
  phoneticHint: '/k/',
  soundLabel: 'K 的清脆聲音',
  title: 'K 的清脆聲音',
  description: 'K 在 kite、key、kangaroo 開頭發出清脆的 /k/ 聲。',
  studentHint: '舌頭後面輕輕抬起，再快速放開一小口氣。',
  teacherNote: 'K 與本課 C 的主要聲音相同，重點是聲音與不同字形的連結。',
  mouthPosition: '嘴巴自然打開，舌頭後方抬起靠近上顎後方。',
  airflowHint: '先短暫擋住氣流，再快速放開，不震動聲帶。',
  commonMistakes: [
    '不要念成字母名稱 K。',
    '不要在 /k/ 後面加上長母音。',
    'kangaroo 較長，只先注意開頭的 K 聲。',
  ],
  stage: 'Phase 4K',
  words: [
    {
      word: 'kite',
      meaningZhTW: '風箏',
      imageAlt: '一個紅黃藍綠四色的菱形風箏',
      actionHint: '一手向上、一手拉線，做出放風箏的動作，再念 kite。',
      sceneHint: '單一菱形風箏置中，尾巴與蝴蝶結完整。',
      tags: ['object', 'outdoor'],
      sentence: {
        text: 'A kite.',
        audioFilename: 'a-kite.wav',
        teachingHintZhTW: '看見風箏，聽聽 kite 開頭的 K 聲。',
        imageAlt: '一個彩色風箏的句子圖片',
      },
    },
    {
      word: 'key',
      meaningZhTW: '鑰匙',
      imageAlt: '一把有圓形握把的金色鑰匙',
      actionHint: '手腕輕輕轉動像在開鎖，再念 key。',
      sceneHint: '單一金色鑰匙完整入鏡，握把與齒部清楚。',
      tags: ['object', 'easy-to-recognize'],
      sentence: {
        text: 'The key is gold.',
        audioFilename: 'the-key-is-gold.wav',
        teachingHintZhTW: '看見金色鑰匙，跟著讀 key。',
        imageAlt: '一把金色鑰匙的句子圖片',
      },
    },
    {
      word: 'kangaroo',
      meaningZhTW: '袋鼠',
      imageAlt: '一隻表情友善的金棕色小袋鼠',
      actionHint: '雙腳輕輕彎曲像要跳，再慢慢念 kangaroo。',
      sceneHint: '單一小袋鼠全身入鏡，長耳朵、大腳與尾巴完整。',
      tags: ['animal', 'longer-word'],
      difficulty: 2,
      sentence: {
        text: 'The kangaroo can jump.',
        audioFilename: 'the-kangaroo-can-jump.wav',
        teachingHintZhTW: 'kangaroo 較長，先抓住開頭 K 聲再跟讀。',
        imageAlt: '一隻準備跳躍的小袋鼠句子圖片',
      },
    },
  ],
});

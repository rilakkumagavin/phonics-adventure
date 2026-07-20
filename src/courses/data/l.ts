import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterLCourse = createFocusedLetterCourse({
  letter: 'L',
  phoneticHint: '/l/',
  soundLabel: 'L 的舌尖聲音',
  title: 'L 的舌尖聲音',
  description: 'L 在 lemon、leaf、lamp 開頭發出舌尖輕碰的 /l/ 聲。',
  studentHint: '舌尖輕輕碰上排牙齒後面，再讓聲音從兩旁出來。',
  teacherNote: '保持 /l/ 清楚，不要用中文「ㄌ」加母音替代。',
  mouthPosition: '嘴巴微開，舌尖碰上齒齦，嘴唇保持放鬆。',
  airflowHint: '聲帶輕輕震動，氣流從舌頭兩側通過。',
  commonMistakes: [
    '不要念成字母名稱 L。',
    '不要在 /l/ 前後加上多餘母音。',
    'lemon 有兩個音節，先注意開頭 L 聲。',
  ],
  stage: 'Phase 4L',
  words: [
    {
      word: 'lemon',
      meaningZhTW: '檸檬',
      imageAlt: '一顆帶著綠葉的鮮黃色檸檬',
      actionHint: '手指在臉旁比出酸酸的表情，再慢慢念 lemon。',
      sceneHint: '單一完整黃檸檬置中，綠葉與果皮清楚。',
      tags: ['food', 'two-syllables'],
      difficulty: 2,
      sentence: {
        text: 'A lemon.',
        audioFilename: 'a-lemon.wav',
        teachingHintZhTW: '看見黃檸檬，聽聽 lemon 開頭的 L 聲。',
        imageAlt: '一顆黃色檸檬的句子圖片',
      },
    },
    {
      word: 'leaf',
      meaningZhTW: '葉子',
      imageAlt: '一片有清楚葉脈的綠色葉子',
      actionHint: '手掌輕輕搖擺像葉子，再念 leaf。',
      sceneHint: '單一綠葉置中，短梗與中央葉脈清楚。',
      tags: ['nature', 'easy-to-recognize'],
      sentence: {
        text: 'The leaf is green.',
        audioFilename: 'the-leaf-is-green.wav',
        teachingHintZhTW: '看見綠葉，跟著讀 leaf。',
        imageAlt: '一片綠色葉子的句子圖片',
      },
    },
    {
      word: 'lamp',
      meaningZhTW: '燈',
      imageAlt: '一盞有藍綠色底座與黃色燈罩的桌燈',
      actionHint: '手指向上輕點像打開燈，再念 lamp。',
      sceneHint: '單一桌燈完整入鏡，底座與燈罩輪廓清楚。',
      tags: ['object', 'home'],
      sentence: {
        text: 'The lamp is on.',
        audioFilename: 'the-lamp-is-on.wav',
        teachingHintZhTW: '看見亮起的燈，跟著讀 lamp。',
        imageAlt: '一盞亮著暖光的桌燈句子圖片',
      },
    },
  ],
});

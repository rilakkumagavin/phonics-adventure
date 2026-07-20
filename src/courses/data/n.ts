import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterNCourse = createFocusedLetterCourse({
  letter: 'N',
  phoneticHint: '/n/',
  soundLabel: 'N 的鼻音',
  title: 'N 的鼻音',
  description: 'N 在 nest、nose、net 開頭發出舌尖抬起的 /n/ 聲。',
  studentHint: '舌尖輕碰上排牙齒後方，讓聲音從鼻子出來。',
  teacherNote: '提醒孩子不要在 /n/ 後加上中文「呢」的母音。',
  mouthPosition: '嘴巴微開，舌尖輕碰上排牙齒後方。',
  airflowHint: '聲帶震動，氣流從鼻腔通過。',
  commonMistakes: [
    '不要念成字母名稱 N。',
    '不要在 /n/ 後面加上「呢」的母音。',
    '舌尖要抬起，不要只用嘴唇發聲。',
  ],
  stage: 'Phase 4N',
  words: [
    {
      word: 'nest',
      meaningZhTW: '鳥巢',
      imageAlt: '一個用細枝編成的棕色鳥巢',
      actionHint: '雙手彎成小碗的形狀，再念 nest。',
      sceneHint: '單一空鳥巢置中，編織細節清楚。',
      tags: ['nature', 'home'],
      sentence: {
        text: 'A nest.',
        audioFilename: 'a-nest.wav',
        teachingHintZhTW: '看見鳥巢，聽聽 nest 開頭的 N 聲。',
        imageAlt: '一個棕色鳥巢的句子圖片',
      },
    },
    {
      word: 'nose',
      meaningZhTW: '鼻子',
      imageAlt: '一個簡單友善的人類鼻子圖示',
      actionHint: '用手輕輕指向自己的鼻子，再念 nose。',
      sceneHint: '單一鼻子正面置中，不出現完整臉孔。',
      tags: ['body', 'easy-to-recognize'],
      sentence: {
        text: 'Touch your nose.',
        audioFilename: 'touch-your-nose.wav',
        teachingHintZhTW: '指指鼻子，跟著讀 nose。',
        imageAlt: '一個簡單鼻子的句子圖片',
      },
    },
    {
      word: 'net',
      meaningZhTW: '網子',
      imageAlt: '一支有藍綠色圓框與木柄的網子',
      actionHint: '雙手做出撈東西的動作，再念 net。',
      sceneHint: '單一手持網完整入鏡，不出現人物或動物。',
      tags: ['object', 'outdoor'],
      sentence: {
        text: 'The net is blue.',
        audioFilename: 'the-net-is-blue.wav',
        teachingHintZhTW: '看見藍色網子，跟著讀 net。',
        imageAlt: '一支藍綠色網子的句子圖片',
      },
    },
  ],
});

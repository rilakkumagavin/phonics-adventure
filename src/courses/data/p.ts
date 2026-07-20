import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterPCourse = createFocusedLetterCourse({
  letter: 'P',
  phoneticHint: '/p/',
  soundLabel: 'P 的送氣聲',
  title: 'P 的送氣聲',
  description: 'P 在 pig、pen、pizza 開頭發出雙唇放開的 /p/ 聲。',
  studentHint: '雙唇先閉起來，再快速放開一小口氣。',
  teacherNote: '可把手掌放在嘴前感受氣流，避免加上「噗」的母音。',
  mouthPosition: '雙唇閉合後快速放開，舌頭保持放鬆。',
  airflowHint: '短促氣流從嘴巴衝出，聲帶不先震動。',
  commonMistakes: [
    '不要念成字母名稱 P。',
    '不要在 /p/ 後面加上「噗」的母音。',
    '要有短促氣流，但不要拖長。',
  ],
  stage: 'Phase 4P',
  words: [
    {
      word: 'pig',
      meaningZhTW: '豬',
      imageAlt: '一隻表情開心的粉紅色小豬',
      actionHint: '用手指輕碰鼻子像豬鼻，再念 pig。',
      sceneHint: '單一粉紅小豬全身入鏡，捲尾巴清楚。',
      tags: ['animal', 'farm'],
      sentence: {
        text: 'A pink pig.',
        audioFilename: 'a-pink-pig.wav',
        teachingHintZhTW: '看見粉紅小豬，聽聽 pig 開頭的 P 聲。',
        imageAlt: '一隻粉紅色小豬的句子圖片',
      },
    },
    {
      word: 'pen',
      meaningZhTW: '筆',
      imageAlt: '一支完整的藍色原子筆',
      actionHint: '假裝拿筆在空中寫字，再念 pen。',
      sceneHint: '單一藍色原子筆斜放，筆尖與筆蓋完整。',
      tags: ['object', 'school'],
      sentence: {
        text: 'The pen is blue.',
        audioFilename: 'the-pen-is-blue.wav',
        teachingHintZhTW: '看看藍色的筆，跟著讀 pen。',
        imageAlt: '一支藍色原子筆的句子圖片',
      },
    },
    {
      word: 'pizza',
      meaningZhTW: '披薩',
      imageAlt: '一個有起司與彩色甜椒的圓形披薩',
      actionHint: '雙手比出大圓形，再念 pizza。',
      sceneHint: '單一完整圓披薩置中，配料清楚。',
      tags: ['food', 'shape'],
      sentence: {
        text: 'The pizza is round.',
        audioFilename: 'the-pizza-is-round.wav',
        teachingHintZhTW: '看見圓圓的披薩，跟著讀 pizza。',
        imageAlt: '一個圓形披薩的句子圖片',
      },
    },
  ],
});

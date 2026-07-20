import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterJCourse = createFocusedLetterCourse({
  letter: 'J',
  phoneticHint: '/dʒ/',
  soundLabel: 'J 的彈跳聲',
  title: 'J 的彈跳聲',
  description: 'J 在 jam、jet、jellyfish 開頭發出短短的 /dʒ/ 聲。',
  studentHint: '牙齒靠近，舌頭前方先擋住氣流，再快速放開。',
  teacherNote: '保持 /dʒ/ 短促，不要念成字母名稱 J 或加上額外母音。',
  mouthPosition: '嘴唇微微向前，舌頭前方靠近上顎。',
  airflowHint: '先短暫擋住氣流，再帶著聲帶震動快速放開。',
  commonMistakes: [
    '不要念成字母名稱 J。',
    '不要在聲音後面加上長母音。',
    'jellyfish 較長，只先注意開頭的 J 聲。',
  ],
  stage: 'Phase 4J',
  words: [
    {
      word: 'jam',
      meaningZhTW: '果醬',
      imageAlt: '一罐裝著紅色草莓果醬的玻璃罐',
      actionHint: '雙手做出捧著小罐子的動作，再念 jam。',
      sceneHint: '單一果醬罐置中，紅色果醬與格紋蓋子清楚。',
      tags: ['food', 'easy-to-recognize'],
      sentence: {
        text: 'Red jam.',
        audioFilename: 'red-jam.wav',
        teachingHintZhTW: '看見紅色果醬，跟著讀 jam。',
        imageAlt: '一罐紅色果醬的句子圖片',
      },
    },
    {
      word: 'jet',
      meaningZhTW: '噴射機',
      imageAlt: '一架白色與藍綠色的小型噴射機',
      actionHint: '雙手張開像機翼，再念 jet。',
      sceneHint: '單一噴射機完整入鏡，機翼、機尾與引擎清楚。',
      tags: ['vehicle', 'easy-to-recognize'],
      sentence: {
        text: 'The jet is fast.',
        audioFilename: 'the-jet-is-fast.wav',
        teachingHintZhTW: '雙手像飛機一樣向前移動，跟著讀 jet。',
        imageAlt: '一架快速飛行噴射機的句子圖片',
      },
    },
    {
      word: 'jellyfish',
      meaningZhTW: '水母',
      imageAlt: '一隻表情友善的淡紫色小水母',
      actionHint: '手指向下輕輕擺動像觸手，再慢慢念 jellyfish。',
      sceneHint: '單一淡紫色水母置中，圓傘與觸手完整。',
      tags: ['animal', 'longer-word'],
      difficulty: 2,
      sentence: {
        text: 'The jellyfish can swim.',
        audioFilename: 'the-jellyfish-can-swim.wav',
        teachingHintZhTW: 'jellyfish 較長，先抓住開頭 J 聲再跟讀。',
        imageAlt: '一隻淡紫色水母游泳的句子圖片',
      },
    },
  ],
});

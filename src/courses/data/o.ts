import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterOCourse = createFocusedLetterCourse({
  letter: 'O',
  phoneticHint: '/ɑ/',
  soundLabel: 'O 的短母音',
  title: 'O 的短母音',
  description: 'O 在 octopus、ox、olive 開頭發出美式短母音 /ɑ/。',
  studentHint: '嘴巴張開，舌頭放低，短短地發出聲音。',
  teacherNote: '本課採美式發音；不同英語口音的 O 音可能略有差異。',
  mouthPosition: '嘴巴自然張開，嘴唇不要噘起，舌頭放低。',
  airflowHint: '氣流順暢通過，聲帶持續震動。',
  commonMistakes: [
    '不要念成字母名稱 O。',
    '聲音要短，不要拉成長音。',
    '嘴唇不要過度噘起。',
  ],
  stage: 'Phase 4O',
  words: [
    {
      word: 'octopus',
      meaningZhTW: '章魚',
      imageAlt: '一隻表情友善的紫色章魚',
      actionHint: '手指向外擺動像章魚手臂，再念 octopus。',
      sceneHint: '單一紫色章魚置中，身體與手臂完整清楚。',
      tags: ['animal', 'ocean'],
      sentence: {
        text: 'An octopus.',
        audioFilename: 'an-octopus.wav',
        teachingHintZhTW: '看見章魚，聽聽 octopus 開頭的 O 聲。',
        imageAlt: '一隻紫色章魚的句子圖片',
      },
    },
    {
      word: 'ox',
      meaningZhTW: '公牛',
      imageAlt: '一隻有彎角的友善棕色公牛',
      actionHint: '雙手放到頭旁邊比出牛角，再念 ox。',
      sceneHint: '單一棕色公牛全身入鏡，四肢與兩隻角清楚。',
      tags: ['animal', 'farm'],
      sentence: {
        text: 'An ox.',
        audioFilename: 'an-ox.wav',
        teachingHintZhTW: '看見公牛，跟著讀 ox。',
        imageAlt: '一隻棕色公牛的句子圖片',
      },
    },
    {
      word: 'olive',
      meaningZhTW: '橄欖',
      imageAlt: '三顆帶有綠葉的綠色橄欖',
      actionHint: '用手指比出小小圓形，再念 olive。',
      sceneHint: '三顆綠色橄欖置中，其中一顆帶有葉子。',
      tags: ['food', 'plant'],
      sentence: {
        text: 'The olive is green.',
        audioFilename: 'the-olive-is-green.wav',
        teachingHintZhTW: '看看綠色橄欖，跟著讀 olive。',
        imageAlt: '三顆綠色橄欖的句子圖片',
      },
    },
  ],
});

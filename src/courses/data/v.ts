import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterVCourse = createFocusedLetterCourse({
  letter: 'V', phoneticHint: '/v/', soundLabel: 'V 的震動氣流聲', title: 'V 的震動氣流聲',
  description: 'V 在 van、vase、violin 開頭發出有聲的 /v/。',
  studentHint: '上排牙齒輕碰下唇，讓喉嚨一邊震動一邊送氣。',
  teacherNote: '可摸喉嚨比較 V 的震動與 F 的無聲氣流。', mouthPosition: '上齒輕碰下唇。',
  airflowHint: '聲帶震動，氣流持續從唇齒間通過。',
  commonMistakes: ['不要念成字母名稱 V。', '不要把 /v/ 念成 /f/。', '不要加上額外母音。'],
  stage: 'Phase 4V',
  words: [
    { word: 'van', meaningZhTW: '廂型車', imageAlt: '一輛藍綠色小廂型車', actionHint: '雙手握方向盤，再念 van。', sceneHint: '單一車輛完整入鏡。', tags: ['vehicle'], sentence: { text: 'A blue van.', audioFilename: 'a-blue-van.wav', teachingHintZhTW: '聽聽 van 開頭的 V 聲。', imageAlt: '藍色廂型車的句子圖片' } },
    { word: 'vase', meaningZhTW: '花瓶', imageAlt: '一個藍色陶瓷花瓶', actionHint: '雙手比出花瓶形狀，再念 vase。', sceneHint: '單一空花瓶置中。', tags: ['object'], sentence: { text: 'The vase is blue.', audioFilename: 'the-vase-is-blue.wav', teachingHintZhTW: '跟著讀 vase。', imageAlt: '藍色花瓶的句子圖片' } },
    { word: 'violin', meaningZhTW: '小提琴', imageAlt: '一把棕色小提琴與琴弓', actionHint: '假裝拉琴，再念 violin。', sceneHint: '小提琴與琴弓完整入鏡。', tags: ['music'], sentence: { text: 'A violin.', audioFilename: 'a-violin.wav', teachingHintZhTW: '跟著讀 violin。', imageAlt: '小提琴的句子圖片' } },
  ],
});

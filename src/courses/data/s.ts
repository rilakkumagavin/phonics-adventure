import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterSCourse = createFocusedLetterCourse({
  letter: 'S', phoneticHint: '/s/', soundLabel: 'S 的氣流聲', title: 'S 的氣流聲',
  description: 'S 在 sun、sock、seal 開頭發出持續的 /s/ 聲。',
  studentHint: '牙齒靠近，讓氣流從舌頭中央細細通過。',
  teacherNote: '保持無聲氣流，不加「絲」的尾音。', mouthPosition: '舌尖靠近上排牙齒後方但不接觸。',
  airflowHint: '聲帶不震動，氣流持續從中央通過。',
  commonMistakes: ['不要念成字母名稱 S。', '不要加上中文母音。', '不要把聲音變成 /z/。'],
  stage: 'Phase 4S',
  words: [
    { word: 'sun', meaningZhTW: '太陽', imageAlt: '一個有清楚光芒的黃色太陽', actionHint: '雙手向外張開像陽光，再念 sun。', sceneHint: '單一太陽置中。', tags: ['nature'], sentence: { text: 'The sun is bright.', audioFilename: 'the-sun-is-bright.wav', teachingHintZhTW: '聽聽 sun 開頭的 S 聲。', imageAlt: '黃色太陽的句子圖片' } },
    { word: 'sock', meaningZhTW: '襪子', imageAlt: '一隻紅色短襪', actionHint: '指指腳踝，再念 sock。', sceneHint: '單一紅襪完整入鏡。', tags: ['clothing'], sentence: { text: 'A red sock.', audioFilename: 'a-red-sock.wav', teachingHintZhTW: '跟著讀 sock。', imageAlt: '紅色襪子的句子圖片' } },
    { word: 'seal', meaningZhTW: '海豹', imageAlt: '一隻友善的灰色小海豹', actionHint: '雙手在身旁拍動像鰭，再念 seal。', sceneHint: '單一海豹全身入鏡。', tags: ['animal'], sentence: { text: 'A small seal.', audioFilename: 'a-small-seal.wav', teachingHintZhTW: '跟著讀 seal。', imageAlt: '灰色小海豹的句子圖片' } },
  ],
});

import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterUCourse = createFocusedLetterCourse({
  letter: 'U', phoneticHint: '/ʌ/', soundLabel: 'U 的短母音', title: 'U 的短母音',
  description: 'U 在 umbrella、up、uncle 開頭發出短母音 /ʌ/。',
  studentHint: '嘴巴放鬆微開，舌頭放在中央，短短發聲。',
  teacherNote: '聲音要短且放鬆，不念成字母名稱 U。', mouthPosition: '嘴唇放鬆，舌頭低而居中。',
  airflowHint: '聲帶震動，氣流平順通過。',
  commonMistakes: ['不要念成字母名稱 U。', '不要拉成長音。', '下巴不要過度用力。'],
  stage: 'Phase 4U',
  words: [
    { word: 'umbrella', meaningZhTW: '雨傘', imageAlt: '一把打開的彩虹雨傘', actionHint: '雙手在頭上撐開，再念 umbrella。', sceneHint: '單一雨傘完整入鏡。', tags: ['object'], sentence: { text: 'An umbrella.', audioFilename: 'an-umbrella.wav', teachingHintZhTW: '聽聽 umbrella 開頭的 U 聲。', imageAlt: '彩虹雨傘的句子圖片' } },
    { word: 'up', meaningZhTW: '向上', imageAlt: '一個指向上方的藍綠色箭頭', actionHint: '手指向上，再念 up。', sceneHint: '單一向上箭頭置中。', tags: ['direction'], sentence: { text: 'Look up.', audioFilename: 'look-up.wav', teachingHintZhTW: '向上看，跟著讀 up。', imageAlt: '向上箭頭的句子圖片' } },
    { word: 'uncle', meaningZhTW: '叔叔或舅舅', imageAlt: '一位穿綠衣揮手的友善成年男子', actionHint: '揮揮手，再念 uncle。', sceneHint: '單一成人全身入鏡。', tags: ['family'], sentence: { text: 'My uncle waves.', audioFilename: 'my-uncle-waves.wav', teachingHintZhTW: '跟著讀 uncle。', imageAlt: '一位揮手男子的句子圖片' } },
  ],
});

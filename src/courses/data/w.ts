import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterWCourse = createFocusedLetterCourse({
  letter: 'W', phoneticHint: '/w/', soundLabel: 'W 的圓唇音', title: 'W 的圓唇音',
  description: 'W 在 whale、web、wagon 開頭常發出 /w/。',
  studentHint: '嘴唇先收圓，再快速張開接到後面的母音。',
  teacherNote: '本課採常見美式 whale 發音；部分口音會區分 wh。', mouthPosition: '雙唇收圓後快速放開。',
  airflowHint: '聲帶震動，氣流平順通過。',
  commonMistakes: ['不要念成字母名稱 W。', '不要把 /w/ 念成 /v/。', '不要加上額外母音。'],
  stage: 'Phase 4W',
  words: [
    { word: 'whale', meaningZhTW: '鯨魚', imageAlt: '一隻友善的藍色鯨魚', actionHint: '雙臂向外擺動像魚鰭，再念 whale。', sceneHint: '單一鯨魚全身入鏡。', tags: ['animal'], sentence: { text: 'A blue whale.', audioFilename: 'a-blue-whale.wav', teachingHintZhTW: '聽聽 whale 開頭的 W 聲。', imageAlt: '藍色鯨魚的句子圖片' } },
    { word: 'web', meaningZhTW: '蜘蛛網', imageAlt: '一張白色蜘蛛網', actionHint: '手指交錯比出網子，再念 web。', sceneHint: '單一蜘蛛網置中。', tags: ['nature'], sentence: { text: 'A spider web.', audioFilename: 'a-spider-web.wav', teachingHintZhTW: '跟著讀 web。', imageAlt: '蜘蛛網的句子圖片' } },
    { word: 'wagon', meaningZhTW: '手拉車', imageAlt: '一輛紅色四輪手拉車', actionHint: '假裝拉著把手，再念 wagon。', sceneHint: '單一紅色手拉車完整入鏡。', tags: ['vehicle'], sentence: { text: 'A red wagon.', audioFilename: 'a-red-wagon.wav', teachingHintZhTW: '跟著讀 wagon。', imageAlt: '紅色手拉車的句子圖片' } },
  ],
});

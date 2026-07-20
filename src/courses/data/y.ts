import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterYCourse = createFocusedLetterCourse({
  letter: 'Y', phoneticHint: '/j/', soundLabel: 'Y 的滑音', title: 'Y 的滑音',
  description: 'Y 在 yarn、yak、yo-yo 開頭發出快速滑動的 /j/。',
  studentHint: '舌頭前方抬高但不碰上顎，快速滑到後面的母音。',
  teacherNote: '這個 IPA /j/ 是英語 yes 的開頭音，不是字母 J 的音。', mouthPosition: '舌頭前方靠近硬顎，嘴唇放鬆。',
  airflowHint: '聲帶震動，氣流平順通過狹窄空間。',
  commonMistakes: ['不要念成字母名稱 Y。', '不要和字母 J 的音混淆。', '滑音要短而連續。'],
  stage: 'Phase 4Y',
  words: [
    { word: 'yarn', meaningZhTW: '毛線', imageAlt: '一球紅色毛線', actionHint: '雙手假裝繞毛線，再念 yarn。', sceneHint: '單一毛線球置中。', tags: ['object'], sentence: { text: 'Red yarn.', audioFilename: 'red-yarn.wav', teachingHintZhTW: '聽聽 yarn 開頭的 Y 聲。', imageAlt: '紅色毛線球的句子圖片' } },
    { word: 'yak', meaningZhTW: '犛牛', imageAlt: '一隻友善的棕色長毛犛牛', actionHint: '雙手比出彎角，再念 yak。', sceneHint: '單一犛牛全身入鏡。', tags: ['animal'], sentence: { text: 'A brown yak.', audioFilename: 'a-brown-yak.wav', teachingHintZhTW: '跟著讀 yak。', imageAlt: '棕色犛牛的句子圖片' } },
    { word: 'yo-yo', meaningZhTW: '溜溜球', imageAlt: '一個藍色與黃色的溜溜球', actionHint: '手掌上下移動，再念 yo-yo。', sceneHint: '單一溜溜球與短繩完整入鏡。', tags: ['toy'], sentence: { text: 'A blue yo-yo.', audioFilename: 'a-blue-yo-yo.wav', teachingHintZhTW: '跟著讀 yo-yo。', imageAlt: '藍色溜溜球的句子圖片' } },
  ],
});

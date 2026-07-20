import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterZCourse = createFocusedLetterCourse({
  letter: 'Z', phoneticHint: '/z/', soundLabel: 'Z 的震動細流聲', title: 'Z 的震動細流聲',
  description: 'Z 在 zebra、zipper、zoo 開頭發出有聲的 /z/。',
  studentHint: '牙齒靠近，讓細氣流通過，同時感覺喉嚨震動。',
  teacherNote: '可與 S 比較：口型相近，但 Z 有聲帶震動。', mouthPosition: '舌尖靠近齒齦但不接觸。',
  airflowHint: '聲帶震動，氣流持續從舌頭中央通過。',
  commonMistakes: ['不要念成字母名稱 Z。', '不要把 /z/ 念成無聲 /s/。', '不要加上額外母音。'],
  stage: 'Phase 4Z',
  words: [
    { word: 'zebra', meaningZhTW: '斑馬', imageAlt: '一隻友善的黑白斑馬', actionHint: '雙手在身前畫條紋，再念 zebra。', sceneHint: '單一斑馬全身入鏡。', tags: ['animal'], sentence: { text: 'A zebra.', audioFilename: 'a-zebra.wav', teachingHintZhTW: '聽聽 zebra 開頭的 Z 聲。', imageAlt: '黑白斑馬的句子圖片' } },
    { word: 'zipper', meaningZhTW: '拉鍊', imageAlt: '一條有銀色拉片的藍色拉鍊', actionHint: '手指做拉上拉鍊的動作，再念 zipper。', sceneHint: '單一拉鍊完整入鏡。', tags: ['object'], sentence: { text: 'A blue zipper.', audioFilename: 'a-blue-zipper.wav', teachingHintZhTW: '跟著讀 zipper。', imageAlt: '藍色拉鍊的句子圖片' } },
    { word: 'zoo', meaningZhTW: '動物園', imageAlt: '一座有綠色拱門的動物園入口', actionHint: '雙手張開像大門，再念 zoo。', sceneHint: '單一入口大門置中且沒有文字。', tags: ['place'], sentence: { text: 'The zoo is open.', audioFilename: 'the-zoo-is-open.wav', teachingHintZhTW: '跟著讀 zoo。', imageAlt: '動物園入口的句子圖片' } },
  ],
});

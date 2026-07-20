import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterTCourse = createFocusedLetterCourse({
  letter: 'T', phoneticHint: '/t/', soundLabel: 'T 的短促氣音', title: 'T 的短促氣音',
  description: 'T 在 tiger、top、tent 開頭發出短促的 /t/ 聲。',
  studentHint: '舌尖先碰上排牙齒後方，再快速放開。',
  teacherNote: '保持短促送氣，不加中文「特」的母音。', mouthPosition: '舌尖輕碰齒齦後快速放開。',
  airflowHint: '短促氣流從嘴巴放出，聲帶不先震動。',
  commonMistakes: ['不要念成字母名稱 T。', '不要加上「特」的母音。', '不要把 /t/ 拖長。'],
  stage: 'Phase 4T',
  words: [
    { word: 'tiger', meaningZhTW: '老虎', imageAlt: '一隻友善的橘色小老虎', actionHint: '雙手做出小爪子，再念 tiger。', sceneHint: '單一小老虎全身入鏡。', tags: ['animal'], sentence: { text: 'A tiger.', audioFilename: 'a-tiger.wav', teachingHintZhTW: '聽聽 tiger 開頭的 T 聲。', imageAlt: '一隻小老虎的句子圖片' } },
    { word: 'top', meaningZhTW: '陀螺', imageAlt: '一個紅藍黃色的玩具陀螺', actionHint: '手指畫圈像陀螺旋轉，再念 top。', sceneHint: '單一彩色陀螺置中。', tags: ['toy'], sentence: { text: 'The top spins.', audioFilename: 'the-top-spins.wav', teachingHintZhTW: '跟著讀 top。', imageAlt: '彩色陀螺的句子圖片' } },
    { word: 'tent', meaningZhTW: '帳篷', imageAlt: '一頂藍綠色與橘色的帳篷', actionHint: '雙手在頭上比出三角形，再念 tent。', sceneHint: '單一帳篷完整入鏡。', tags: ['outdoor'], sentence: { text: 'The tent is open.', audioFilename: 'the-tent-is-open.wav', teachingHintZhTW: '跟著讀 tent。', imageAlt: '一頂帳篷的句子圖片' } },
  ],
});

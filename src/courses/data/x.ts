import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterXCourse = createFocusedLetterCourse({
  letter: 'X', phoneticHint: '/ks/', soundLabel: 'X 的雙聲音', title: 'X 的 /ks/ 雙聲音',
  description: 'X 在 fox、box、six 字尾常發出連在一起的 /k/ 和 /s/。',
  studentHint: '先短短發出 /k/，馬上接著送出 /s/ 的細氣流。',
  teacherNote: '本課刻意使用字尾 X；不要把它誤教成這些單字的字首音。', mouthPosition: '舌頭後方先放開，再讓氣流從舌頭中央通過。',
  airflowHint: '先短促送氣，再接持續的無聲氣流。',
  commonMistakes: ['不要念成字母名稱 X。', '不要漏掉 /k/ 或 /s/。', '兩個聲音中間不要加母音。'],
  stage: 'Phase 4X',
  words: [
    { word: 'fox', meaningZhTW: '狐狸', imageAlt: '一隻友善的橘色狐狸', actionHint: '手指指向字尾，再念 fox。', sceneHint: '單一狐狸全身入鏡。', tags: ['animal', 'final-sound'], sentence: { text: 'A red fox.', audioFilename: 'a-red-fox.wav', teachingHintZhTW: '聽聽 fox 字尾的 X 聲。', imageAlt: '橘色狐狸的句子圖片' } },
    { word: 'box', meaningZhTW: '盒子', imageAlt: '一個有蓋的紅色盒子', actionHint: '雙手比出方盒形狀，再念 box。', sceneHint: '單一紅盒置中。', tags: ['object', 'final-sound'], sentence: { text: 'A red box.', audioFilename: 'a-red-box.wav', teachingHintZhTW: '聽聽 box 字尾的 X 聲。', imageAlt: '紅色盒子的句子圖片' } },
    { word: 'six', meaningZhTW: '六', imageAlt: '六個排列清楚的彩色積木', actionHint: '伸出六根手指，再念 six。', sceneHint: '六個積木排成兩列。', tags: ['number', 'final-sound'], sentence: { text: 'Six blocks.', audioFilename: 'six-blocks.wav', teachingHintZhTW: '聽聽 six 字尾的 X 聲。', imageAlt: '六個彩色積木的句子圖片' } },
  ],
});

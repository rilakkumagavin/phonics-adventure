import { createFocusedLetterCourse } from '../createFocusedLetterCourse';

export const letterRCourse = createFocusedLetterCourse({
  letter: 'R',
  phoneticHint: '/r/',
  soundLabel: 'R 的捲舌音',
  title: 'R 的捲舌音',
  description: 'R 在 rabbit、robot、rain 開頭發出美式 /r/ 聲。',
  studentHint: '嘴唇微圓，舌頭往後收，但不要碰到上顎。',
  teacherNote: '避免用中文「ㄖ」代替，也不要讓舌尖顫動。',
  mouthPosition: '舌頭向後收並懸空，嘴唇微微收圓。',
  airflowHint: '聲帶震動，氣流從舌頭中央平順通過。',
  commonMistakes: ['不要念成字母名稱 R。', '舌尖不要碰上顎。', '不要在後面加母音。'],
  stage: 'Phase 4R',
  words: [
    { word: 'rabbit', meaningZhTW: '兔子', imageAlt: '一隻友善的白兔', actionHint: '雙手放在頭上比長耳朵，再念 rabbit。', sceneHint: '單一白兔全身入鏡。', tags: ['animal'], sentence: { text: 'A white rabbit.', audioFilename: 'a-white-rabbit.wav', teachingHintZhTW: '聽聽 rabbit 開頭的 R 聲。', imageAlt: '一隻白兔的句子圖片' } },
    { word: 'robot', meaningZhTW: '機器人', imageAlt: '一個藍銀色玩具機器人', actionHint: '手臂彎曲像機器人，再念 robot。', sceneHint: '單一機器人全身入鏡。', tags: ['toy'], sentence: { text: 'The robot is blue.', audioFilename: 'the-robot-is-blue.wav', teachingHintZhTW: '跟著讀 robot。', imageAlt: '一個藍色機器人的句子圖片' } },
    { word: 'rain', meaningZhTW: '雨', imageAlt: '一朵藍色雨雲與雨滴', actionHint: '手指向下輕點像下雨，再念 rain。', sceneHint: '單一雨雲與清楚雨滴。', tags: ['weather'], sentence: { text: 'Rain falls.', audioFilename: 'rain-falls.wav', teachingHintZhTW: '跟著讀 rain。', imageAlt: '藍色雨雲的句子圖片' } },
  ],
});

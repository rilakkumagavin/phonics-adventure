import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { CourseActivity, HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'g-letter-sound';

function imageAsset(id: string, src: string, alt: string): ImageAssetRef {
  return { id, src, alt, status: 'ready' };
}

function audioAsset(
  id: string,
  src: string,
  transcript: string,
  kind: AudioAssetRef['kind'],
): AudioAssetRef {
  return {
    id,
    src,
    transcript,
    kind,
    status: 'ready',
    playbackRateOptions: [1, 0.75],
  };
}

const letterSoundAudio = audioAsset(
  'g-letter-sound-audio',
  '/assets/audio/courses/g/letter-sound.wav',
  '/g/',
  'letter',
);

const images = {
  goat: imageAsset(
    'g-goat-image',
    '/assets/images/courses/g/g-goat-core.webp',
    '一隻友善的白色小山羊站在簡單背景前',
  ),
  gift: imageAsset(
    'g-gift-image',
    '/assets/images/courses/g/g-gift-core.webp',
    '一個綁著紅色蝴蝶結的藍綠色禮物盒',
  ),
  gorilla: imageAsset(
    'g-gorilla-image',
    '/assets/images/courses/g/g-gorilla-core.webp',
    '一隻表情友善的幼年大猩猩坐在簡單背景前',
  ),
};

const audios = {
  goat: audioAsset(
    'g-goat-audio',
    '/assets/audio/courses/g/goat.wav',
    'goat',
    'word',
  ),
  gift: audioAsset(
    'g-gift-audio',
    '/assets/audio/courses/g/gift.wav',
    'gift',
    'word',
  ),
  gorilla: audioAsset(
    'g-gorilla-audio',
    '/assets/audio/courses/g/gorilla.wav',
    'gorilla',
    'word',
  ),
};

const hintSteps: HintStep[] = [
  { type: 'replay-audio', studentText: '再聽一次。' },
  { type: 'slow-audio', studentText: '慢慢聽開頭短短的 G 聲。' },
  { type: 'show-image', studentText: '看看圖片提示。' },
  { type: 'show-mouth-hint', studentText: '舌頭後面輕輕抬起，再快速放開。' },
  { type: 'reveal-answer', studentText: '一起看答案，再聽一次。' },
];

const words: CourseWord[] = [
  {
    id: 'g-goat',
    word: 'goat',
    displayWord: 'goat',
    meaningZhTW: '山羊',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.goat,
    audio: audios.goat,
    actionHint: '用手指在頭頂比出小角，再念 goat。',
    sceneHint: '單一白色小山羊全身入鏡，角與四隻蹄清楚。',
    tags: ['letter-g', 'core-word', 'animal', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['g-sentence-goat'],
  },
  {
    id: 'g-gift',
    word: 'gift',
    displayWord: 'gift',
    meaningZhTW: '禮物',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.gift,
    audio: audios.gift,
    actionHint: '雙手做出捧著禮物的動作，再念 gift。',
    sceneHint: '單一禮物盒，盒身與蝴蝶結輪廓清楚。',
    tags: ['letter-g', 'core-word', 'object', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['g-sentence-gift'],
  },
  {
    id: 'g-gorilla',
    word: 'gorilla',
    displayWord: 'gorilla',
    meaningZhTW: '大猩猩',
    soundTargetIds: [soundTargetId],
    difficulty: 2,
    image: images.gorilla,
    audio: audios.gorilla,
    actionHint: '雙手輕放胸前，再慢慢念 gorilla。',
    sceneHint: '友善幼年大猩猩全身入鏡，不露牙、不做威嚇姿勢。',
    tags: ['letter-g', 'core-word', 'animal', 'longer-word'],
    isCore: true,
    sentenceIds: ['g-sentence-gorilla'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'g-sentence-goat',
    text: 'A goat.',
    teachingHintZhTW: '先聽 goat 開頭的硬 G 聲，再讀完整短句。',
    audio: audioAsset(
      'g-sentence-goat-audio',
      '/assets/audio/courses/g/a-goat.wav',
      'A goat.',
      'sentence',
    ),
    wordIds: ['g-goat'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'g-sentence-goat-image',
      images.goat.src,
      '一隻白色小山羊的句子圖片',
    ),
    highlightWords: [{ wordId: 'g-goat', text: 'goat' }],
  },
  {
    id: 'g-sentence-gift',
    text: 'The gift is red.',
    teachingHintZhTW: '看見紅色蝴蝶結，跟著讀 gift。',
    audio: audioAsset(
      'g-sentence-gift-audio',
      '/assets/audio/courses/g/the-gift-is-red.wav',
      'The gift is red.',
      'sentence',
    ),
    wordIds: ['g-gift'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'g-sentence-gift-image',
      images.gift.src,
      '一個有紅色蝴蝶結的禮物盒句子圖片',
    ),
    highlightWords: [{ wordId: 'g-gift', text: 'gift' }],
  },
  {
    id: 'g-sentence-gorilla',
    text: 'The gorilla is big.',
    teachingHintZhTW: 'gorilla 較長，只要求聽辨開頭與跟讀。',
    audio: audioAsset(
      'g-sentence-gorilla-audio',
      '/assets/audio/courses/g/the-gorilla-is-big.wav',
      'The gorilla is big.',
      'sentence',
    ),
    wordIds: ['g-gorilla'],
    difficulty: 2,
    isCore: true,
    image: imageAsset(
      'g-sentence-gorilla-image',
      images.gorilla.src,
      '一隻友善大猩猩的句子圖片',
    ),
    highlightWords: [{ wordId: 'g-gorilla', text: 'gorilla' }],
  },
];

const activities: CourseActivity[] = [
  {
    id: 'g-listen-word-picture-01',
    type: 'listen-and-choose',
    title: '聽 G 的聲音',
    studentInstruction: '聽聽看，再找到正確的圖片。',
    skills: ['listening'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-g'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptAudio: audios.goat,
    choices: words.map((word, index) => ({
      id: `g-listen-word-picture-${word.word}`,
      wordId: word.id,
      image: word.image,
      isCorrect: index === 0,
    })),
  },
  {
    id: 'g-record-and-playback-01',
    type: 'record-and-playback',
    title: '跟著念 G',
    studentInstruction: '先聽原音，再念 G 的聲音和三個單字。',
    skills: ['speaking'],
    difficulty: 1,
    hintSteps,
    completion: { attemptsRequired: 1, allowSkip: true },
    targetLetterIds: ['letter-g'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: ['g-sentence-goat'],
    canAppearInDailyReview: true,
    modelAudio: letterSoundAudio,
    recordingPrompt: '念 G 的聲音，再念 goat、gift、gorilla。',
  },
  {
    id: 'g-read-word-picture-01',
    type: 'read-and-choose',
    title: '看字讀 G',
    studentInstruction: '看看單字，再選出它的意思。',
    skills: ['reading'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 1, allowSkip: false },
    targetLetterIds: ['letter-g'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptText: 'goat',
    choices: [
      { id: 'g-read-goat', text: '一隻山羊', isCorrect: true },
      { id: 'g-read-gift', text: '一個禮物', isCorrect: false },
      { id: 'g-read-gorilla', text: '一隻大猩猩', isCorrect: false },
    ],
  },
];

export const letterGCourse: LetterCourse = {
  id: 'letter-g',
  version: 1,
  letter: {
    uppercase: 'G',
    lowercase: 'g',
    name: 'G',
    primarySound: {
      id: soundTargetId,
      label: 'G 的短短後舌音',
      type: 'letter-sound',
      grapheme: 'G/g',
      phoneticHint: '/g/',
      description: 'G 在 goat、gift、gorilla 開頭發出短短的硬 G 聲。',
    },
    pronunciationGuide: {
      studentHint: '舌頭後面輕輕抬起，擋住氣流，再快速放開。',
      teacherNote: '本課只教硬 G /g/，不加入 giraffe 等軟 G 單字。',
      mouthPosition: '嘴巴自然打開，舌頭後方抬起靠近上顎後方。',
      airflowHint: '先短暫擋住氣流，再快速放開，喉嚨會輕輕震動。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '不要念成字母名稱 G。',
        '不要在聲音後面加上長長的母音。',
        'gorilla 只先注意開頭的硬 G 聲。',
      ],
    },
  },
  title: 'G 的短短後舌音',
  subtitle: '聽見 G，找到 goat、gift、gorilla',
  learningObjectives: [
    {
      id: 'g-objective-letter',
      skill: 'reading',
      description: '認出大寫 G 與小寫 g。',
    },
    {
      id: 'g-objective-sound',
      skill: 'listening',
      description: '聽辨 G 的硬 G 聲。',
    },
    {
      id: 'g-objective-repeat',
      skill: 'speaking',
      description: '跟著原音練習 G 聲與三個核心單字。',
    },
    {
      id: 'g-objective-read',
      skill: 'reading',
      description: '看見 goat、gift、gorilla 時嘗試讀出來。',
    },
  ],
  words,
  sentences,
  activities,
  reviewVariants: [
    {
      id: 'g-review-goat-listen-01',
      targetContentId: 'g-goat',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['g-gift', 'g-gorilla'],
      suggestedIntervalDays: 1,
      priorityHint: '隔天先重新連結 goat 的聲音與圖片。',
    },
    {
      id: 'g-review-gift-read-01',
      targetContentId: 'g-gift',
      activityType: 'read-and-choose',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['g-goat', 'g-gorilla'],
      suggestedIntervalDays: 3,
      priorityHint: '看見 gift 時先找開頭的 G。',
    },
    {
      id: 'g-review-gorilla-repeat-01',
      targetContentId: 'g-gorilla',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 2,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '再聽 gorilla，跟著念一次，不做發音評分。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-07-18',
    updatedAt: '2026-07-18',
    stage: 'Phase 4G',
    estimatedMinutes: 6,
    sourceNote: 'G 課程只聚焦硬 G /g/，核心圖片與音訊已建立。',
    contentVersion: 1,
    tags: ['letter-g', 'hard-g', 'listening', 'speaking', 'reading'],
  },
};

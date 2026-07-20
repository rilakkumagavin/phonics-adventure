import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { CourseActivity, HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'e-letter-sound';

function imageAsset(
  id: string,
  src: string,
  alt: string,
  status: ImageAssetRef['status'] = 'placeholder',
): ImageAssetRef {
  const asset: ImageAssetRef = {
    id,
    src,
    alt,
    status,
  };

  if (status === 'placeholder') {
    asset.placeholder = '正式圖片將於 E 課程圖片階段補上。';
  }

  return asset;
}

function audioAsset(
  id: string,
  src: string,
  transcript: string,
  kind: AudioAssetRef['kind'],
  status: AudioAssetRef['status'] = 'placeholder',
): AudioAssetRef {
  return {
    id,
    src,
    kind,
    transcript,
    status,
    playbackRateOptions: [1, 0.75],
  };
}

const letterSoundAudio = audioAsset(
  'e-letter-sound-audio',
  '/assets/audio/courses/e/letter-sound.wav',
  '/ɛ/',
  'letter',
  'ready',
);

const images = {
  egg: imageAsset(
    'e-egg-image',
    '/assets/images/courses/e/e-egg-core.webp',
    '一顆白色雞蛋放在簡單背景前',
    'ready',
  ),
  elephant: imageAsset(
    'e-elephant-image',
    '/assets/images/courses/e/e-elephant-core.webp',
    '一隻友善的小象站在簡單背景前',
    'ready',
  ),
  elbow: imageAsset(
    'e-elbow-image',
    '/assets/images/courses/e/e-elbow-core.webp',
    '一個彎曲手臂的手肘部位',
    'ready',
  ),
};

const audios = {
  egg: audioAsset(
    'e-egg-audio',
    '/assets/audio/courses/e/egg.wav',
    'egg',
    'word',
    'ready',
  ),
  elephant: audioAsset(
    'e-elephant-audio',
    '/assets/audio/courses/e/elephant.wav',
    'elephant',
    'word',
    'ready',
  ),
  elbow: audioAsset(
    'e-elbow-audio',
    '/assets/audio/courses/e/elbow.wav',
    'elbow',
    'word',
    'ready',
  ),
};

const hintSteps: HintStep[] = [
  { type: 'replay-audio', studentText: '再聽一次。' },
  { type: 'slow-audio', studentText: '慢慢聽開頭短短的 E 聲。' },
  { type: 'show-image', studentText: '看看圖片提示。' },
  { type: 'reduce-options', studentText: '先留下兩個選項再找找看。' },
  { type: 'show-partial-answer', studentText: '注意單字最前面的 E。' },
  { type: 'reveal-answer', studentText: '一起看答案，再聽一次。' },
];

const words: CourseWord[] = [
  {
    id: 'e-egg',
    word: 'egg',
    displayWord: 'egg',
    meaningZhTW: '蛋',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.egg,
    audio: audios.egg,
    actionHint: '雙手輕輕捧成蛋的形狀，再念 egg。',
    sceneHint: '單顆完整雞蛋置中，輪廓清楚，不加入其他食物。',
    tags: ['letter-e', 'core-word', 'food', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['e-sentence-egg'],
  },
  {
    id: 'e-elephant',
    word: 'elephant',
    displayWord: 'elephant',
    meaningZhTW: '大象',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.elephant,
    audio: audios.elephant,
    actionHint: '手臂向前伸成象鼻，再念 elephant。',
    sceneHint: '友善的小象全身入鏡，象鼻與大耳朵清楚可辨。',
    tags: ['letter-e', 'core-word', 'animal', 'action-friendly'],
    isCore: true,
    sentenceIds: ['e-sentence-elephant'],
  },
  {
    id: 'e-elbow',
    word: 'elbow',
    displayWord: 'elbow',
    meaningZhTW: '手肘',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.elbow,
    audio: audios.elbow,
    actionHint: '彎起手臂，輕碰自己的手肘，再念 elbow。',
    sceneHint: '以彎曲手臂凸顯手肘位置，不使用醫療圖示或文字標籤。',
    tags: ['letter-e', 'core-word', 'body', 'action-friendly'],
    isCore: true,
    sentenceIds: ['e-sentence-elbow'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'e-sentence-egg',
    text: 'An egg.',
    teachingHintZhTW: '先聽 egg 開頭短短的 E 聲，再讀完整短句。',
    audio: audioAsset(
      'e-sentence-egg-audio',
      '/assets/audio/courses/e/an-egg.wav',
      'An egg.',
      'sentence',
      'ready',
    ),
    wordIds: ['e-egg'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'e-sentence-egg-image',
      '/assets/images/courses/e/e-sentence-an-egg.webp',
      '一顆雞蛋放在簡單桌面上的句子圖片',
      'ready',
    ),
    highlightWords: [{ wordId: 'e-egg', text: 'egg' }],
  },
  {
    id: 'e-sentence-elephant',
    text: 'The elephant is big.',
    teachingHintZhTW: '用大象的大小幫助理解句意，聚焦 elephant 的開頭聲。',
    audio: audioAsset(
      'e-sentence-elephant-audio',
      '/assets/audio/courses/e/the-elephant-is-big.wav',
      'The elephant is big.',
      'sentence',
      'ready',
    ),
    wordIds: ['e-elephant'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'e-sentence-elephant-image',
      '/assets/images/courses/e/e-sentence-big-elephant.webp',
      '一隻體型較大的友善大象在簡單背景前',
      'ready',
    ),
    highlightWords: [{ wordId: 'e-elephant', text: 'elephant' }],
  },
  {
    id: 'e-sentence-elbow',
    text: 'Touch your elbow.',
    teachingHintZhTW: '一邊輕碰手肘一邊讀句子，建立聲音與身體部位的連結。',
    audio: audioAsset(
      'e-sentence-elbow-audio',
      '/assets/audio/courses/e/touch-your-elbow.wav',
      'Touch your elbow.',
      'sentence',
      'ready',
    ),
    wordIds: ['e-elbow'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'e-sentence-elbow-image',
      '/assets/images/courses/e/e-sentence-touch-elbow.webp',
      '一位兒童輕輕碰著自己手肘的句子圖片',
      'ready',
    ),
    highlightWords: [{ wordId: 'e-elbow', text: 'elbow' }],
  },
];

const activities: CourseActivity[] = [
  {
    id: 'e-listen-word-picture-01',
    type: 'listen-and-choose',
    title: '聽聲音找圖片',
    studentInstruction: '聽聽看，再找到正確的圖片。',
    skills: ['listening'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-e'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptAudio: audios.egg,
    choices: words.map((word, index) => ({
      id: `e-listen-word-picture-${word.word}`,
      wordId: word.id,
      image: word.image,
      isCorrect: index === 0,
    })),
  },
  {
    id: 'e-letter-image-match-01',
    type: 'letter-image-match',
    title: '字母和圖片配對',
    studentInstruction: '看見 E 或 e，再找到聲音朋友。',
    skills: ['reading'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-e'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    pairs: words.map((word, index) => ({
      id: `e-letter-image-match-${word.word}`,
      letter: index === 1 ? 'e' : 'E',
      wordId: word.id,
      image: word.image,
    })),
  },
  {
    id: 'e-record-and-playback-01',
    type: 'record-and-playback',
    title: '跟著念念看',
    studentInstruction: '先聽原音，再錄下自己的聲音。',
    skills: ['speaking'],
    difficulty: 1,
    hintSteps,
    completion: { attemptsRequired: 1, allowSkip: true },
    targetLetterIds: ['letter-e'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: ['e-sentence-elbow'],
    canAppearInDailyReview: true,
    modelAudio: letterSoundAudio,
    recordingPrompt: '念 E 的短短聲音，再念 egg、elephant、elbow。',
  },
  {
    id: 'e-sound-sort-01',
    type: 'sound-sort',
    title: '聲音分一分',
    studentInstruction: '把有短 E 開頭聲的圖片放在一起。',
    skills: ['listening'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-e'],
    soundTargetIds: [soundTargetId, 'other-starting-sounds'],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    groups: [
      { id: 'e-sound-sort-e', soundTargetId, label: '短 E 開頭聲' },
      {
        id: 'e-sound-sort-other',
        soundTargetId: 'other-starting-sounds',
        label: '其他聲音',
      },
    ],
    items: words.map((word) => ({
      id: `e-sound-sort-${word.word}`,
      wordId: word.id,
      targetGroupId: 'e-sound-sort-e',
      image: word.image,
    })),
  },
  {
    id: 'e-read-word-picture-01',
    type: 'read-and-choose',
    title: '看字讀一讀',
    studentInstruction: '看看單字，再選出它的意思。',
    skills: ['reading'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 1, allowSkip: false },
    targetLetterIds: ['letter-e'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptText: 'egg',
    choices: [
      { id: 'e-read-egg', text: '一顆蛋', isCorrect: true },
      { id: 'e-read-elephant', text: '一隻大象', isCorrect: false },
      { id: 'e-read-elbow', text: '一個手肘', isCorrect: false },
    ],
  },
];

export const letterECourse: LetterCourse = {
  id: 'letter-e',
  version: 2,
  letter: {
    uppercase: 'E',
    lowercase: 'e',
    name: 'E',
    primarySound: {
      id: soundTargetId,
      label: 'E 的短短聲音',
      type: 'short-vowel',
      grapheme: 'E/e',
      phoneticHint: '/ɛ/',
      description: 'E 在 egg、elephant、elbow 開頭有短短的 /ɛ/ 聲。',
    },
    pronunciationGuide: {
      studentHint: '嘴巴微微張開，短短念出 E 的聲音。',
      teacherNote: '本課只練習三個核心單字的開頭短 E 聲，不延伸其他 E 發音規則。',
      mouthPosition: '嘴唇放鬆，嘴巴微張，下巴不用刻意用力。',
      airflowHint: '聲音短而清楚，不要拖長，也不要加上字母名稱的尾音。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '不要把短 E 聲念成字母名稱 E。',
        '不要在短音後面加上額外的尾音。',
        'elephant 與 elbow 先只注意第一個音節的開頭聲。',
      ],
    },
  },
  title: 'E 的短短聲音',
  subtitle: '聽見 E，找到 egg、elephant、elbow',
  learningObjectives: [
    {
      id: 'e-objective-uppercase-lowercase',
      skill: 'reading',
      description: '認出大寫 E 與小寫 e。',
    },
    {
      id: 'e-objective-letter-sound',
      skill: 'listening',
      description: '聽辨 E 的短母音。',
    },
    {
      id: 'e-objective-initial-sound',
      skill: 'listening',
      description: '聽出 egg、elephant、elbow 開頭的短 E 聲。',
    },
    {
      id: 'e-objective-repeat',
      skill: 'speaking',
      description: '跟著原音練習短 E 聲與核心單字。',
    },
    {
      id: 'e-objective-read-words',
      skill: 'reading',
      description: '看見 egg、elephant、elbow 時嘗試讀出來。',
    },
  ],
  words,
  sentences,
  activities,
  reviewVariants: [
    {
      id: 'e-review-egg-listen-picture-01',
      targetContentId: 'e-egg',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['e-elephant', 'e-elbow'],
      suggestedIntervalDays: 1,
      priorityHint: '隔天先複習 egg，重新連結短 E 聲與圖片。',
    },
    {
      id: 'e-review-elephant-letter-image-01',
      targetContentId: 'e-elephant',
      activityType: 'letter-image-match',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['letter-d', 'letter-f'],
      suggestedIntervalDays: 3,
      priorityHint: '用不同大小寫 E 配對 elephant 圖片。',
    },
    {
      id: 'e-review-elbow-repeat-01',
      targetContentId: 'e-sentence-elbow',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: false,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '做動作並跟讀 Touch your elbow.，不做發音評分。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    stage: 'Phase 4E',
    estimatedMinutes: 8,
    sourceNote: '以 A～D 已確認的課程結構建立 E 初稿，待圖片與音訊逐批驗收。',
    contentVersion: 2,
    tags: ['letter-e', 'short-vowel', 'listening', 'speaking', 'reading'],
  },
};

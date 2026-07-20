import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { CourseActivity, HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'f-letter-sound';

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
    asset.placeholder = '正式圖片將於 F 課程圖片階段補上。';
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
    transcript,
    kind,
    status,
    playbackRateOptions: [1, 0.75],
  };
}

const letterSoundAudio = audioAsset(
  'f-letter-sound-audio',
  '/assets/audio/courses/f/letter-sound.wav',
  '/f/',
  'letter',
  'ready',
);

const images = {
  fish: imageAsset(
    'f-fish-image',
    '/assets/images/courses/f/f-fish-core.webp',
    '一條友善的小魚在簡單水藍背景前',
    'ready',
  ),
  fan: imageAsset(
    'f-fan-image',
    '/assets/images/courses/f/f-fan-core.webp',
    '一台有三片扇葉的桌上型電風扇',
    'ready',
  ),
  frog: imageAsset(
    'f-frog-image',
    '/assets/images/courses/f/f-frog-core.webp',
    '一隻友善的綠色青蛙蹲在簡單背景前',
    'ready',
  ),
};

const audios = {
  fish: audioAsset(
    'f-fish-audio',
    '/assets/audio/courses/f/fish.wav',
    'fish',
    'word',
    'ready',
  ),
  fan: audioAsset(
    'f-fan-audio',
    '/assets/audio/courses/f/fan.wav',
    'fan',
    'word',
    'ready',
  ),
  frog: audioAsset(
    'f-frog-audio',
    '/assets/audio/courses/f/frog.wav',
    'frog',
    'word',
    'ready',
  ),
};

const hintSteps: HintStep[] = [
  { type: 'replay-audio', studentText: '再聽一次。' },
  { type: 'slow-audio', studentText: '慢慢聽開頭輕輕送氣的 F 聲。' },
  { type: 'show-image', studentText: '看看圖片提示。' },
  { type: 'show-mouth-hint', studentText: '上排牙齒輕碰下唇，再送出氣流。' },
  { type: 'reduce-options', studentText: '先留下兩個選項再找找看。' },
  { type: 'show-partial-answer', studentText: '注意單字最前面的 F。' },
  { type: 'reveal-answer', studentText: '一起看答案，再聽一次。' },
];

const words: CourseWord[] = [
  {
    id: 'f-fish',
    word: 'fish',
    displayWord: 'fish',
    meaningZhTW: '魚',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.fish,
    audio: audios.fish,
    actionHint: '雙手合起來左右游動，再念 fish。',
    sceneHint: '單一側面小魚，魚鰭與尾巴完整，背景不加入其他海洋動物。',
    tags: ['letter-f', 'core-word', 'animal', 'action-friendly'],
    isCore: true,
    sentenceIds: ['f-sentence-fish'],
  },
  {
    id: 'f-fan',
    word: 'fan',
    displayWord: 'fan',
    meaningZhTW: '風扇',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.fan,
    audio: audios.fan,
    actionHint: '手掌在臉旁輕輕搧風，再念 fan。',
    sceneHint: '桌上型風扇正面入鏡，護網與三片扇葉清楚，保持關閉狀態。',
    tags: ['letter-f', 'core-word', 'object', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['f-sentence-fan'],
  },
  {
    id: 'f-frog',
    word: 'frog',
    displayWord: 'frog',
    meaningZhTW: '青蛙',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.frog,
    audio: audios.frog,
    actionHint: '雙手放低做準備跳躍的動作，再念 frog。',
    sceneHint: '友善綠色青蛙全身入鏡，眼睛與後腿清楚，不使用寫實黏液質感。',
    tags: ['letter-f', 'core-word', 'animal', 'action-friendly'],
    isCore: true,
    sentenceIds: ['f-sentence-frog'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'f-sentence-fish',
    text: 'A fish.',
    teachingHintZhTW: '先聽 fish 開頭的 F 聲，再讀完整短句。',
    audio: audioAsset(
      'f-sentence-fish-audio',
      '/assets/audio/courses/f/a-fish.wav',
      'A fish.',
      'sentence',
      'ready',
    ),
    wordIds: ['f-fish'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'f-sentence-fish-image',
      '/assets/images/courses/f/f-sentence-a-fish.webp',
      '一條小魚在清澈水中游動的句子圖片',
      'ready',
    ),
    highlightWords: [{ wordId: 'f-fish', text: 'fish' }],
  },
  {
    id: 'f-sentence-fan',
    text: 'The fan is fast.',
    teachingHintZhTW: '用轉動的扇葉理解 fast，並留意 fan 與 fast 的開頭聲。',
    audio: audioAsset(
      'f-sentence-fan-audio',
      '/assets/audio/courses/f/the-fan-is-fast.wav',
      'The fan is fast.',
      'sentence',
      'ready',
    ),
    wordIds: ['f-fan'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'f-sentence-fan-image',
      '/assets/images/courses/f/f-sentence-fast-fan.webp',
      '一台桌上型電風扇快速轉動的句子圖片',
      'ready',
    ),
    highlightWords: [{ wordId: 'f-fan', text: 'fan' }],
  },
  {
    id: 'f-sentence-frog',
    text: 'The frog can jump.',
    teachingHintZhTW: '搭配青蛙跳躍動作理解句意，再讀 frog。',
    audio: audioAsset(
      'f-sentence-frog-audio',
      '/assets/audio/courses/f/the-frog-can-jump.wav',
      'The frog can jump.',
      'sentence',
      'ready',
    ),
    wordIds: ['f-frog'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'f-sentence-frog-image',
      '/assets/images/courses/f/f-sentence-jumping-frog.webp',
      '一隻綠色青蛙正在草地上跳躍的句子圖片',
      'ready',
    ),
    highlightWords: [{ wordId: 'f-frog', text: 'frog' }],
  },
];

const activities: CourseActivity[] = [
  {
    id: 'f-listen-word-picture-01',
    type: 'listen-and-choose',
    title: '聽聲音找圖片',
    studentInstruction: '聽聽看，再找到正確的圖片。',
    skills: ['listening'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-f'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptAudio: audios.fish,
    choices: words.map((word, index) => ({
      id: `f-listen-word-picture-${word.word}`,
      wordId: word.id,
      image: word.image,
      isCorrect: index === 0,
    })),
  },
  {
    id: 'f-letter-image-match-01',
    type: 'letter-image-match',
    title: '字母和圖片配對',
    studentInstruction: '看見 F 或 f，再找到聲音朋友。',
    skills: ['reading'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-f'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    pairs: words.map((word, index) => ({
      id: `f-letter-image-match-${word.word}`,
      letter: index === 1 ? 'f' : 'F',
      wordId: word.id,
      image: word.image,
    })),
  },
  {
    id: 'f-record-and-playback-01',
    type: 'record-and-playback',
    title: '跟著念念看',
    studentInstruction: '先聽原音，再錄下自己的聲音。',
    skills: ['speaking'],
    difficulty: 1,
    hintSteps,
    completion: { attemptsRequired: 1, allowSkip: true },
    targetLetterIds: ['letter-f'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: ['f-sentence-frog'],
    canAppearInDailyReview: true,
    modelAudio: letterSoundAudio,
    recordingPrompt: '念 F 的聲音，再念 fish、fan、frog。',
  },
  {
    id: 'f-sound-sort-01',
    type: 'sound-sort',
    title: '聲音分一分',
    studentInstruction: '把有 F 開頭聲的圖片放在一起。',
    skills: ['listening'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-f'],
    soundTargetIds: [soundTargetId, 'other-starting-sounds'],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    groups: [
      { id: 'f-sound-sort-f', soundTargetId, label: 'F 開頭聲' },
      {
        id: 'f-sound-sort-other',
        soundTargetId: 'other-starting-sounds',
        label: '其他聲音',
      },
    ],
    items: words.map((word) => ({
      id: `f-sound-sort-${word.word}`,
      wordId: word.id,
      targetGroupId: 'f-sound-sort-f',
      image: word.image,
    })),
  },
  {
    id: 'f-read-word-picture-01',
    type: 'read-and-choose',
    title: '看字讀一讀',
    studentInstruction: '看看單字，再選出它的意思。',
    skills: ['reading'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 1, allowSkip: false },
    targetLetterIds: ['letter-f'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptText: 'fish',
    choices: [
      { id: 'f-read-fish', text: '一條魚', isCorrect: true },
      { id: 'f-read-fan', text: '一台風扇', isCorrect: false },
      { id: 'f-read-frog', text: '一隻青蛙', isCorrect: false },
    ],
  },
];

export const letterFCourse: LetterCourse = {
  id: 'letter-f',
  version: 2,
  letter: {
    uppercase: 'F',
    lowercase: 'f',
    name: 'F',
    primarySound: {
      id: soundTargetId,
      label: 'F 的輕輕送氣聲',
      type: 'letter-sound',
      grapheme: 'F/f',
      phoneticHint: '/f/',
      description: 'F 在 fish、fan、frog 開頭有輕輕摩擦送氣的 /f/ 聲。',
    },
    pronunciationGuide: {
      studentHint: '上排牙齒輕碰下唇，讓氣流輕輕通過。',
      teacherNote: '本課只建立 F 開頭聲辨識，不使用中文諧音代替原音。',
      mouthPosition: '上排牙齒輕碰下唇，嘴唇與下巴保持放鬆。',
      airflowHint: '持續送出細細氣流，喉嚨不需要震動。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '不要把 F 聲念成字母名稱 F。',
        '不要讓上下嘴唇完全閉起來變成其他聲音。',
        'frog 開頭先聽見 F，再自然接上後面的聲音。',
      ],
    },
  },
  title: 'F 的輕輕送氣聲',
  subtitle: '聽見 F，找到 fish、fan、frog',
  learningObjectives: [
    {
      id: 'f-objective-uppercase-lowercase',
      skill: 'reading',
      description: '認出大寫 F 與小寫 f。',
    },
    {
      id: 'f-objective-letter-sound',
      skill: 'listening',
      description: '聽辨 F 的輕輕送氣聲。',
    },
    {
      id: 'f-objective-initial-sound',
      skill: 'listening',
      description: '聽出 fish、fan、frog 開頭的 F 聲。',
    },
    {
      id: 'f-objective-repeat',
      skill: 'speaking',
      description: '跟著原音練習 F 聲與核心單字。',
    },
    {
      id: 'f-objective-read-words',
      skill: 'reading',
      description: '看見 fish、fan、frog 時嘗試讀出來。',
    },
  ],
  words,
  sentences,
  activities,
  reviewVariants: [
    {
      id: 'f-review-fish-listen-picture-01',
      targetContentId: 'f-fish',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['f-fan', 'f-frog'],
      suggestedIntervalDays: 1,
      priorityHint: '隔天先複習 fish，重新連結 F 聲與圖片。',
    },
    {
      id: 'f-review-fan-letter-image-01',
      targetContentId: 'f-fan',
      activityType: 'letter-image-match',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['letter-e', 'letter-d'],
      suggestedIntervalDays: 3,
      priorityHint: '用不同大小寫 F 配對 fan 圖片。',
    },
    {
      id: 'f-review-frog-repeat-01',
      targetContentId: 'f-sentence-frog',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: false,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '做跳躍動作並跟讀 The frog can jump.，不做發音評分。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-07-03',
    updatedAt: '2026-07-03',
    stage: 'Phase 4F',
    estimatedMinutes: 8,
    sourceNote: '以 A～E 已確認的課程結構建立 F 初稿，待圖片與音訊逐批驗收。',
    contentVersion: 2,
    tags: ['letter-f', 'initial-sound', 'listening', 'speaking', 'reading'],
  },
};

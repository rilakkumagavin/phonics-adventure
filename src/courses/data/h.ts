import type { CourseActivity, HintStep } from '../../types/activity';
import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'h-letter-sound';

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
  'h-letter-sound-audio',
  '/assets/audio/courses/h/letter-sound.wav',
  '/h/',
  'letter',
);

const images = {
  hat: imageAsset(
    'h-hat-image',
    '/assets/images/courses/h/h-hat-core.webp',
    '一頂有藍綠色縫線的紅色帽子',
  ),
  hen: imageAsset(
    'h-hen-image',
    '/assets/images/courses/h/h-hen-core.webp',
    '一隻表情友善的金棕色母雞站在簡單背景前',
  ),
  hippo: imageAsset(
    'h-hippo-image',
    '/assets/images/courses/h/h-hippo-core.webp',
    '一隻表情友善的灰藍色小河馬站在簡單背景前',
  ),
};

const audios = {
  hat: audioAsset('h-hat-audio', '/assets/audio/courses/h/hat.wav', 'hat', 'word'),
  hen: audioAsset('h-hen-audio', '/assets/audio/courses/h/hen.wav', 'hen', 'word'),
  hippo: audioAsset(
    'h-hippo-audio',
    '/assets/audio/courses/h/hippo.wav',
    'hippo',
    'word',
  ),
};

const hintSteps: HintStep[] = [
  { type: 'replay-audio', studentText: '再聽一次。' },
  { type: 'slow-audio', studentText: '慢慢聽開頭輕輕的 H 聲。' },
  { type: 'show-image', studentText: '看看圖片提示。' },
  { type: 'show-mouth-hint', studentText: '嘴巴自然打開，像在手心輕輕哈氣。' },
  { type: 'reveal-answer', studentText: '一起看答案，再聽一次。' },
];

const words: CourseWord[] = [
  {
    id: 'h-hat',
    word: 'hat',
    displayWord: 'hat',
    meaningZhTW: '帽子',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.hat,
    audio: audios.hat,
    actionHint: '輕輕摸摸頭頂，再念 hat。',
    sceneHint: '單一紅色帽子置中，帽簷與帽身輪廓清楚。',
    tags: ['letter-h', 'core-word', 'object', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['h-sentence-hat'],
  },
  {
    id: 'h-hen',
    word: 'hen',
    displayWord: 'hen',
    meaningZhTW: '母雞',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: images.hen,
    audio: audios.hen,
    actionHint: '手臂輕輕收在身旁像翅膀，再念 hen。',
    sceneHint: '單一金棕色母雞全身入鏡，雞冠、翅膀與腳清楚。',
    tags: ['letter-h', 'core-word', 'animal', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['h-sentence-hen'],
  },
  {
    id: 'h-hippo',
    word: 'hippo',
    displayWord: 'hippo',
    meaningZhTW: '河馬',
    soundTargetIds: [soundTargetId],
    difficulty: 2,
    image: images.hippo,
    audio: audios.hippo,
    actionHint: '雙手比出圓圓的大身體，再慢慢念 hippo。',
    sceneHint: '友善小河馬全身入鏡，嘴巴閉合，不露大牙。',
    tags: ['letter-h', 'core-word', 'animal', 'two-syllables'],
    isCore: true,
    sentenceIds: ['h-sentence-hippo'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'h-sentence-hat',
    text: 'A hat.',
    teachingHintZhTW: '先聽 hat 開頭輕輕的 H 聲，再讀完整短句。',
    audio: audioAsset(
      'h-sentence-hat-audio',
      '/assets/audio/courses/h/a-hat.wav',
      'A hat.',
      'sentence',
    ),
    wordIds: ['h-hat'],
    difficulty: 1,
    isCore: true,
    image: imageAsset('h-sentence-hat-image', images.hat.src, '一頂紅色帽子的句子圖片'),
    highlightWords: [{ wordId: 'h-hat', text: 'hat' }],
  },
  {
    id: 'h-sentence-hen',
    text: 'The hen is red.',
    teachingHintZhTW: '看見母雞紅色的雞冠，跟著讀 hen。',
    audio: audioAsset(
      'h-sentence-hen-audio',
      '/assets/audio/courses/h/the-hen-is-red.wav',
      'The hen is red.',
      'sentence',
    ),
    wordIds: ['h-hen'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'h-sentence-hen-image',
      images.hen.src,
      '一隻有紅色雞冠的母雞句子圖片',
    ),
    highlightWords: [{ wordId: 'h-hen', text: 'hen' }],
  },
  {
    id: 'h-sentence-hippo',
    text: 'The hippo is big.',
    teachingHintZhTW: 'hippo 有兩個音節，先注意開頭輕輕的 H 聲。',
    audio: audioAsset(
      'h-sentence-hippo-audio',
      '/assets/audio/courses/h/the-hippo-is-big.wav',
      'The hippo is big.',
      'sentence',
    ),
    wordIds: ['h-hippo'],
    difficulty: 2,
    isCore: true,
    image: imageAsset(
      'h-sentence-hippo-image',
      images.hippo.src,
      '一隻圓圓小河馬的句子圖片',
    ),
    highlightWords: [{ wordId: 'h-hippo', text: 'hippo' }],
  },
];

const activities: CourseActivity[] = [
  {
    id: 'h-listen-word-picture-01',
    type: 'listen-and-choose',
    title: '聽 H 的聲音',
    studentInstruction: '聽聽看，再找到正確的圖片。',
    skills: ['listening'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 3, allowSkip: false },
    targetLetterIds: ['letter-h'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptAudio: audios.hat,
    choices: words.map((word, index) => ({
      id: `h-listen-word-picture-${word.word}`,
      wordId: word.id,
      image: word.image,
      isCorrect: index === 0,
    })),
  },
  {
    id: 'h-record-and-playback-01',
    type: 'record-and-playback',
    title: '跟著念 H',
    studentInstruction: '先聽原音，再念 H 的聲音和三個單字。',
    skills: ['speaking'],
    difficulty: 1,
    hintSteps,
    completion: { attemptsRequired: 1, allowSkip: true },
    targetLetterIds: ['letter-h'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: ['h-sentence-hat'],
    canAppearInDailyReview: true,
    modelAudio: letterSoundAudio,
    recordingPrompt: '念 H 的聲音，再念 hat、hen、hippo。',
  },
  {
    id: 'h-read-word-picture-01',
    type: 'read-and-choose',
    title: '看字讀 H',
    studentInstruction: '看看單字，再選出它的意思。',
    skills: ['reading'],
    difficulty: 1,
    hintSteps,
    completion: { correctRequired: 1, allowSkip: false },
    targetLetterIds: ['letter-h'],
    soundTargetIds: [soundTargetId],
    wordIds: words.map((word) => word.id),
    sentenceIds: [],
    canAppearInDailyReview: true,
    promptText: 'hat',
    choices: [
      { id: 'h-read-hat', text: '一頂帽子', isCorrect: true },
      { id: 'h-read-hen', text: '一隻母雞', isCorrect: false },
      { id: 'h-read-hippo', text: '一隻河馬', isCorrect: false },
    ],
  },
];

export const letterHCourse: LetterCourse = {
  id: 'letter-h',
  version: 1,
  letter: {
    uppercase: 'H',
    lowercase: 'h',
    name: 'H',
    primarySound: {
      id: soundTargetId,
      label: 'H 的輕輕吐氣聲',
      type: 'letter-sound',
      grapheme: 'H/h',
      phoneticHint: '/h/',
      description: 'H 在 hat、hen、hippo 開頭發出輕輕的吐氣聲。',
    },
    pronunciationGuide: {
      studentHint: '嘴巴自然打開，像在手心輕輕哈一口氣。',
      teacherNote: 'H /h/ 是無聲的氣流，不要教成中文「喝」或字母名稱。',
      mouthPosition: '嘴巴自然打開，舌頭與嘴唇保持放鬆。',
      airflowHint: '讓氣流從喉嚨順順送出，不需要震動聲帶。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '不要念成字母名稱 H。',
        '不要加上中文「喝」的尾音。',
        'hippo 先注意第一個音節開頭的 H 聲。',
      ],
    },
  },
  title: 'H 的輕輕吐氣聲',
  subtitle: '聽見 H，找到 hat、hen、hippo',
  learningObjectives: [
    { id: 'h-objective-letter', skill: 'reading', description: '認出大寫 H 與小寫 h。' },
    { id: 'h-objective-sound', skill: 'listening', description: '聽辨 H 的輕輕吐氣聲。' },
    {
      id: 'h-objective-repeat',
      skill: 'speaking',
      description: '跟著原音練習 H 聲與三個核心單字。',
    },
    {
      id: 'h-objective-read',
      skill: 'reading',
      description: '看見 hat、hen、hippo 時嘗試讀出來。',
    },
  ],
  words,
  sentences,
  activities,
  reviewVariants: [
    {
      id: 'h-review-hat-listen-01',
      targetContentId: 'h-hat',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['h-hen', 'h-hippo'],
      suggestedIntervalDays: 1,
      priorityHint: '隔天先重新連結 hat 的聲音與圖片。',
    },
    {
      id: 'h-review-hen-read-01',
      targetContentId: 'h-hen',
      activityType: 'read-and-choose',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['h-hat', 'h-hippo'],
      suggestedIntervalDays: 3,
      priorityHint: '看見 hen 時先找開頭的 H。',
    },
    {
      id: 'h-review-hippo-repeat-01',
      targetContentId: 'h-hippo',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 2,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '再聽 hippo，跟著念一次，不做發音評分。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-07-18',
    updatedAt: '2026-07-18',
    stage: 'Phase 4H',
    estimatedMinutes: 6,
    sourceNote: 'H 課程聚焦 /h/，核心圖片與音訊已建立。',
    contentVersion: 1,
    tags: ['letter-h', 'voiceless-h', 'listening', 'speaking', 'reading'],
  },
};

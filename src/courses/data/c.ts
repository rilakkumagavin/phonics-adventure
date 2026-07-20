import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'c-letter-sound';

function imageAsset(
  id: string,
  src: string,
  alt: string,
  placeholder: string,
  status: ImageAssetRef['status'] = 'placeholder',
): ImageAssetRef {
  const asset: ImageAssetRef = {
    id,
    src,
    alt,
    status,
  };

  if (placeholder) {
    asset.placeholder = placeholder;
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
  'c-letter-sound-audio',
  '/assets/audio/courses/c/letter-sound.wav',
  '/k/',
  'letter',
  'ready',
);

const catImage = imageAsset(
  'c-cat-image',
  '/assets/images/courses/c/c-cat-core.webp',
  '一隻坐著看向前方的小貓',
  '',
  'ready',
);

const capImage = imageAsset(
  'c-cap-image',
  '/assets/images/courses/c/c-cap-core.webp',
  '一頂紅色帽子放在簡單背景前',
  '',
  'ready',
);

const cupImage = imageAsset(
  'c-cup-image',
  '/assets/images/courses/c/c-cup-core.webp',
  '一個簡單乾淨的杯子',
  '',
  'ready',
);

const dogDistractorImage = imageAsset(
  'c-distractor-dog-image',
  '/assets/images/shared/shared-dog-core.webp',
  '一隻小狗站在簡單背景前',
  '',
  'ready',
);

const ballDistractorImage = imageAsset(
  'c-distractor-ball-image',
  '/assets/images/shared/shared-ball-core.webp',
  '一顆彩色球放在簡單背景前',
  '',
  'ready',
);

const fishDistractorImage = imageAsset(
  'c-distractor-fish-image',
  '/assets/images/shared/shared-fish-core.webp',
  '一條魚放在簡單背景前',
  '',
  'ready',
);

const catAudio = audioAsset(
  'c-cat-audio',
  '/assets/audio/courses/c/cat.wav',
  'cat',
  'word',
  'ready',
);

const capAudio = audioAsset(
  'c-cap-audio',
  '/assets/audio/courses/c/cap.wav',
  'cap',
  'word',
  'ready',
);

const cupAudio = audioAsset(
  'c-cup-audio',
  '/assets/audio/courses/c/cup.wav',
  'cup',
  'word',
  'ready',
);

const hintSteps: HintStep[] = [
  {
    type: 'replay-audio',
    studentText: '再聽一次。',
  },
  {
    type: 'slow-audio',
    studentText: '慢慢聽，找一找 C 的聲音。',
  },
  {
    type: 'show-image',
    studentText: '看看圖片提示。',
  },
  {
    type: 'show-mouth-hint',
    studentText: '嘴巴微微打開，試著說出 C 的開頭聲音。',
  },
  {
    type: 'reduce-options',
    studentText: '先拿掉一個不對的選項。',
  },
  {
    type: 'show-partial-answer',
    studentText: '答案會從 C 開頭。',
  },
  {
    type: 'reveal-answer',
    studentText: '我們一起看看答案。',
  },
];

const words: CourseWord[] = [
  {
    id: 'c-cat',
    word: 'cat',
    displayWord: 'cat',
    meaningZhTW: '貓',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: catImage,
    audio: catAudio,
    actionHint: '想像小貓坐著看著你，輕輕說出 cat。',
    sceneHint: '看到小貓時，先找前面的 C 聲音。',
    tags: ['letter-c', 'core-word', 'animal', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['c-sentence-cat'],
  },
  {
    id: 'c-cap',
    word: 'cap',
    displayWord: 'cap',
    meaningZhTW: '帽子',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: capImage,
    audio: capAudio,
    actionHint: '想像把帽子戴上，再念出 cap。',
    sceneHint: '看到帽子時，先聽見前面的 C 聲音。',
    tags: ['letter-c', 'core-word', 'daily-life', 'shape-contrast'],
    isCore: true,
    sentenceIds: ['c-sentence-cap'],
  },
  {
    id: 'c-cup',
    word: 'cup',
    displayWord: 'cup',
    meaningZhTW: '杯子',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: cupImage,
    audio: cupAudio,
    actionHint: '想像拿起杯子喝一口，再念出 cup。',
    sceneHint: '杯子短短的單字很適合練習 C 的開頭聲音。',
    tags: ['letter-c', 'core-word', 'daily-life', 'easy-to-repeat'],
    isCore: true,
    sentenceIds: ['c-sentence-cup'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'c-sentence-cat',
    text: 'A cat.',
    teachingHintZhTW: '先聽 cat 的開頭，再跟著念短句。',
    audio: audioAsset(
      'c-sentence-cat-audio',
      '/assets/audio/courses/c/a-cat.wav',
      'A cat.',
      'sentence',
      'ready',
    ),
    wordIds: ['c-cat'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'c-sentence-cat-image',
      '/assets/images/courses/c/c-sentence-a-cat.webp',
      '一隻小貓在簡單地面上的句子圖片',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'c-cat', text: 'cat' }],
  },
  {
    id: 'c-sentence-cap',
    text: 'The cap is red.',
    teachingHintZhTW: '一邊看帽子，一邊找出 cap 的 C 聲音。',
    audio: audioAsset(
      'c-sentence-cap-audio',
      '/assets/audio/courses/c/the-cap-is-red.wav',
      'The cap is red.',
      'sentence',
      'ready',
    ),
    wordIds: ['c-cap'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'c-sentence-cap-image',
      '/assets/images/courses/c/c-sentence-red-cap.webp',
      '一頂紅色帽子在簡單背景前的句子圖片',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'c-cap', text: 'cap' }],
  },
  {
    id: 'c-sentence-cup',
    text: 'The cup is clean.',
    teachingHintZhTW: '聽聽 cup 和 clean 的開頭，兩個都有 C 的聲音。',
    audio: audioAsset(
      'c-sentence-cup-audio',
      '/assets/audio/courses/c/the-cup-is-clean.wav',
      'The cup is clean.',
      'sentence',
      'ready',
    ),
    wordIds: ['c-cup'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'c-sentence-cup-image',
      '/assets/images/courses/c/c-sentence-clean-cup.webp',
      '一個乾淨杯子放在簡單背景前的句子圖片',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'c-cup', text: 'cup' }],
  },
];

export const letterCCourse: LetterCourse = {
  id: 'letter-c',
  version: 2,
  letter: {
    uppercase: 'C',
    lowercase: 'c',
    name: 'C',
    primarySound: {
      id: soundTargetId,
      label: 'C 的清脆聲音',
      type: 'letter-sound',
      grapheme: 'C/c',
      phoneticHint: '/k/',
      description: 'C 在 cat、cap、cup 前面會發出清楚的 /k/ 聲音。',
    },
    pronunciationGuide: {
      studentHint: '先聽 C 的聲音，再跟著慢慢念。',
      teacherNote:
        '本階段先聚焦 C 在 cat、cap、cup 這類單字中的 /k/ 音，不延伸 soft c。',
      mouthPosition: '嘴巴微微打開，舌頭放鬆，讓聲音清楚往前出來。',
      airflowHint: '短短送氣，不要拖太長。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '把 C 念成字母名稱 C。',
        '把開頭聲音拖太長，沒有保留短促的 /k/ 感覺。',
        '看到 cup 時忽略前面的 C，只記住後面的母音。',
      ],
    },
  },
  title: 'C 的清脆聲音',
  subtitle: '聽見 C，找到 cat、cap、cup',
  learningObjectives: [
    {
      id: 'c-objective-uppercase-lowercase',
      skill: 'reading',
      description: '認得大寫 C 和小寫 c。',
    },
    {
      id: 'c-objective-letter-sound',
      skill: 'listening',
      description: '聽出 C 的開頭聲音。',
    },
    {
      id: 'c-objective-initial-sound',
      skill: 'listening',
      description: '能從 cat、cap、cup 找到 C 的聲音。',
    },
    {
      id: 'c-objective-repeat',
      skill: 'speaking',
      description: '跟著念出 C 的聲音與核心單字。',
    },
    {
      id: 'c-objective-read-words',
      skill: 'reading',
      description: '看見 cat、cap、cup 時能嘗試讀出來。',
    },
  ],
  words,
  sentences,
  activities: [
    {
      id: 'c-listen-word-picture-01',
      type: 'listen-and-choose',
      title: '聽音找圖片',
      studentInstruction: '聽聽看，找出剛剛聽到的單字。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-c'],
      soundTargetIds: [soundTargetId],
      wordIds: ['c-cat', 'c-cap', 'c-cup'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: catAudio,
      choices: [
        {
          id: 'c-listen-word-picture-cat',
          wordId: 'c-cat',
          image: catImage,
          isCorrect: true,
        },
        {
          id: 'c-listen-word-picture-cap',
          wordId: 'c-cap',
          image: capImage,
          isCorrect: false,
        },
        {
          id: 'c-listen-word-picture-cup',
          wordId: 'c-cup',
          image: cupImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'c-listen-initial-sound-02',
      type: 'listen-and-choose',
      title: '找到 C 的開頭聲音',
      studentInstruction: '聽見 C 的聲音後，找出對的圖片。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 1,
        allowSkip: false,
      },
      targetLetterIds: ['letter-c'],
      soundTargetIds: [soundTargetId],
      wordIds: ['c-cat', 'c-cap', 'c-cup'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: letterSoundAudio,
      choices: [
        {
          id: 'c-initial-sound-cat',
          wordId: 'c-cat',
          image: catImage,
          isCorrect: true,
        },
        {
          id: 'c-initial-sound-dog',
          wordId: 'c-distractor-dog',
          image: dogDistractorImage,
          isCorrect: false,
        },
        {
          id: 'c-initial-sound-ball',
          wordId: 'c-distractor-ball',
          image: ballDistractorImage,
          isCorrect: false,
        },
        {
          id: 'c-initial-sound-fish',
          wordId: 'c-distractor-fish',
          image: fishDistractorImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'c-letter-image-match-01',
      type: 'letter-image-match',
      title: '字母和圖片配對',
      studentInstruction: '看看 C 和 c，找出對應的圖片。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-c'],
      soundTargetIds: [soundTargetId],
      wordIds: ['c-cat', 'c-cap', 'c-cup'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      pairs: [
        {
          id: 'c-letter-image-match-cat',
          letter: 'C',
          wordId: 'c-cat',
          image: catImage,
        },
        {
          id: 'c-letter-image-match-cap',
          letter: 'c',
          wordId: 'c-cap',
          image: capImage,
        },
        {
          id: 'c-letter-image-match-cup',
          letter: 'C',
          wordId: 'c-cup',
          image: cupImage,
        },
      ],
    },
    {
      id: 'c-record-and-playback-01',
      type: 'record-and-playback',
      title: '跟著念念看',
      studentInstruction: '先聽，再錄下自己的聲音，比較看看。',
      skills: ['speaking'],
      difficulty: 1,
      hintSteps: [
        {
          type: 'replay-audio',
          studentText: '再聽一次原音。',
        },
        {
          type: 'show-mouth-hint',
          studentText: '先說出短短的 C 開頭聲音。',
        },
        {
          type: 'reveal-answer',
          studentText: '可以再試一次。',
        },
      ],
      completion: {
        attemptsRequired: 1,
        allowSkip: true,
      },
      targetLetterIds: ['letter-c'],
      soundTargetIds: [soundTargetId],
      wordIds: ['c-cat', 'c-cup'],
      sentenceIds: ['c-sentence-cup'],
      canAppearInDailyReview: true,
      modelAudio: letterSoundAudio,
      recordingPrompt: '先說 C，再念 cat、cup，最後念 The cup is clean.',
    },
    {
      id: 'c-sound-sort-01',
      type: 'sound-sort',
      title: '聲音分類',
      studentInstruction: '把有 C 開頭聲音的放在一起。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 6,
        allowSkip: false,
      },
      targetLetterIds: ['letter-c'],
      soundTargetIds: [soundTargetId, 'other-starting-sounds'],
      wordIds: ['c-cat', 'c-cap', 'c-cup'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      groups: [
        {
          id: 'c-sound-sort-c',
          soundTargetId,
          label: 'C 的聲音',
        },
        {
          id: 'c-sound-sort-other',
          soundTargetId: 'other-starting-sounds',
          label: '其他聲音',
        },
      ],
      items: [
        {
          id: 'c-sound-sort-cat',
          wordId: 'c-cat',
          targetGroupId: 'c-sound-sort-c',
          image: catImage,
        },
        {
          id: 'c-sound-sort-cap',
          wordId: 'c-cap',
          targetGroupId: 'c-sound-sort-c',
          image: capImage,
        },
        {
          id: 'c-sound-sort-cup',
          wordId: 'c-cup',
          targetGroupId: 'c-sound-sort-c',
          image: cupImage,
        },
        {
          id: 'c-sound-sort-dog',
          wordId: 'c-distractor-dog',
          targetGroupId: 'c-sound-sort-other',
          image: dogDistractorImage,
        },
        {
          id: 'c-sound-sort-ball',
          wordId: 'c-distractor-ball',
          targetGroupId: 'c-sound-sort-other',
          image: ballDistractorImage,
        },
        {
          id: 'c-sound-sort-fish',
          wordId: 'c-distractor-fish',
          targetGroupId: 'c-sound-sort-other',
          image: fishDistractorImage,
        },
      ],
    },
    {
      id: 'c-read-word-picture-01',
      type: 'read-and-choose',
      title: '看字讀讀看',
      studentInstruction: '看見單字時，找出對應的意思。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-c'],
      soundTargetIds: [soundTargetId],
      wordIds: ['c-cat', 'c-cap', 'c-cup'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptText: 'cat',
      choices: [
        {
          id: 'c-read-word-picture-cat',
          text: '一隻小貓',
          isCorrect: true,
        },
        {
          id: 'c-read-word-picture-cap',
          text: '一頂帽子',
          isCorrect: false,
        },
        {
          id: 'c-read-word-picture-cup',
          text: '一個杯子',
          isCorrect: false,
        },
      ],
    },
  ],
  reviewVariants: [
    {
      id: 'c-review-cat-listen-picture-01',
      targetContentId: 'c-cat',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['c-cap', 'c-cup'],
      suggestedIntervalDays: 1,
      priorityHint: '第一次完成後，先用 cat 複習 C 的開頭聲音。',
    },
    {
      id: 'c-review-cap-image-letter-01',
      targetContentId: 'c-cap',
      activityType: 'letter-image-match',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['letter-b', 'letter-d'],
      suggestedIntervalDays: 3,
      priorityHint: '把 C 和 c 跟帽子圖片重新配對，幫助穩定辨識。',
    },
    {
      id: 'c-review-cup-repeat-01',
      targetContentId: 'c-sentence-cup',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: false,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '跟讀 The cup is clean.，練習連續兩個 C 開頭聲音。',
    },
    {
      id: 'c-review-sound-sort-01',
      targetContentId: 'c-cat',
      activityType: 'sound-sort',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['c-distractor-dog', 'c-distractor-ball', 'c-distractor-fish'],
      suggestedIntervalDays: 7,
      priorityHint: '把 C 開頭和其他開頭聲音分開，強化聽辨。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    stage: 'Phase 4C',
    estimatedMinutes: 8,
    sourceNote:
      '沿用 A、B 正式課程草稿結構，先建立 C 的內容與資產規格，正式圖與音訊稍後補上。',
    contentVersion: 2,
    tags: ['letter-c', 'initial-sound', 'listening', 'speaking', 'reading'],
  },
};

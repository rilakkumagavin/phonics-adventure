import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'd-letter-sound';

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
  'd-letter-sound-audio',
  '/assets/audio/courses/d/letter-sound.wav',
  '/d/',
  'letter',
  'ready',
);

const dogImage = imageAsset(
  'd-dog-image',
  '/assets/images/courses/d/d-dog-core.webp',
  '一隻坐著看向前方的小狗',
  '',
  'ready',
);

const duckImage = imageAsset(
  'd-duck-image',
  '/assets/images/courses/d/d-duck-core.webp',
  '一隻黃色小鴨站在簡單背景前',
  '',
  'ready',
);

const drumImage = imageAsset(
  'd-drum-image',
  '/assets/images/courses/d/d-drum-core.webp',
  '一個簡單清楚的小鼓',
  '',
  'ready',
);

const catDistractorImage = imageAsset(
  'd-distractor-cat-image',
  '/assets/images/shared/shared-cat-core.webp',
  '一隻小貓站在簡單背景前',
  '',
  'ready',
);

const ballDistractorImage = imageAsset(
  'd-distractor-ball-image',
  '/assets/images/shared/shared-ball-core.webp',
  '一顆彩色球放在簡單背景前',
  '',
  'ready',
);

const fishDistractorImage = imageAsset(
  'd-distractor-fish-image',
  '/assets/images/shared/shared-fish-core.webp',
  '一條魚放在簡單背景前',
  '',
  'ready',
);

const dogAudio = audioAsset(
  'd-dog-audio',
  '/assets/audio/courses/d/dog.wav',
  'dog',
  'word',
  'ready',
);

const duckAudio = audioAsset(
  'd-duck-audio',
  '/assets/audio/courses/d/duck.wav',
  'duck',
  'word',
  'ready',
);

const drumAudio = audioAsset(
  'd-drum-audio',
  '/assets/audio/courses/d/drum.wav',
  'drum',
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
    studentText: '慢慢聽，找一找 D 的開頭聲音。',
  },
  {
    type: 'show-image',
    studentText: '看看圖片提示。',
  },
  {
    type: 'show-mouth-hint',
    studentText: '舌尖輕輕碰一下上排牙齒後面，再放開說出 D 的聲音。',
  },
  {
    type: 'reduce-options',
    studentText: '先拿掉一個不對的選項。',
  },
  {
    type: 'show-partial-answer',
    studentText: '答案會從 D 開頭。',
  },
  {
    type: 'reveal-answer',
    studentText: '我們一起看看答案。',
  },
];

const words: CourseWord[] = [
  {
    id: 'd-dog',
    word: 'dog',
    displayWord: 'dog',
    meaningZhTW: '狗',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: dogImage,
    audio: dogAudio,
    actionHint: '想像小狗坐在前面，再短短念出 dog。',
    sceneHint: '小狗主體要清楚，不加入太多玩具或背景。',
    tags: ['letter-d', 'core-word', 'animal', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['d-sentence-dog'],
  },
  {
    id: 'd-duck',
    word: 'duck',
    displayWord: 'duck',
    meaningZhTW: '鴨子',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: duckImage,
    audio: duckAudio,
    actionHint: '想像小鴨搖搖走路，再念出 duck。',
    sceneHint: '小鴨用黃色、側面或三分之二角度，讓外型容易辨識。',
    tags: ['letter-d', 'core-word', 'animal', 'shape-contrast'],
    isCore: true,
    sentenceIds: ['d-sentence-duck'],
  },
  {
    id: 'd-drum',
    word: 'drum',
    displayWord: 'drum',
    meaningZhTW: '鼓',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: drumImage,
    audio: drumAudio,
    actionHint: '雙手輕輕敲一下看不見的小鼓，再念出 drum。',
    sceneHint: '鼓要比鼓棒更醒目，避免加入舞台或人物。',
    tags: ['letter-d', 'core-word', 'music', 'action-friendly'],
    isCore: true,
    sentenceIds: ['d-sentence-drum'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'd-sentence-dog',
    text: 'A dog.',
    teachingHintZhTW: '先用短句聽見 dog 的 D 開頭聲音。',
    audio: audioAsset(
      'd-sentence-dog-audio',
      '/assets/audio/courses/d/a-dog.wav',
      'A dog.',
      'sentence',
      'ready',
    ),
    wordIds: ['d-dog'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'd-sentence-dog-image',
      '/assets/images/courses/d/d-sentence-a-dog.webp',
      '一隻小狗在簡單地面上的句子圖片',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'd-dog', text: 'dog' }],
  },
  {
    id: 'd-sentence-duck',
    text: 'The duck is yellow.',
    teachingHintZhTW: '用黃色小鴨幫助辨識 duck，但重點仍是 D 的開頭聲音。',
    audio: audioAsset(
      'd-sentence-duck-audio',
      '/assets/audio/courses/d/the-duck-is-yellow.wav',
      'The duck is yellow.',
      'sentence',
      'ready',
    ),
    wordIds: ['d-duck'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'd-sentence-duck-image',
      '/assets/images/courses/d/d-sentence-yellow-duck.webp',
      '一隻黃色小鴨在簡單背景前的句子圖片',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'd-duck', text: 'duck' }],
  },
  {
    id: 'd-sentence-drum',
    text: 'The drum is big.',
    teachingHintZhTW: '一邊看鼓，一邊練習 drum 的開頭聲音。',
    audio: audioAsset(
      'd-sentence-drum-audio',
      '/assets/audio/courses/d/the-drum-is-big.wav',
      'The drum is big.',
      'sentence',
      'ready',
    ),
    wordIds: ['d-drum'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'd-sentence-drum-image',
      '/assets/images/courses/d/d-sentence-big-drum.webp',
      '一個較大的小鼓放在簡單背景前的句子圖片',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'd-drum', text: 'drum' }],
  },
];

export const letterDCourse: LetterCourse = {
  id: 'letter-d',
  version: 2,
  letter: {
    uppercase: 'D',
    lowercase: 'd',
    name: 'D',
    primarySound: {
      id: soundTargetId,
      label: 'D 的短短聲音',
      type: 'letter-sound',
      grapheme: 'D/d',
      phoneticHint: '/d/',
      description: 'D 在 dog、duck、drum 前面會發出短短、清楚的 /d/ 聲音。',
    },
    pronunciationGuide: {
      studentHint: '先聽 D 的聲音，再短短跟著念。',
      teacherNote: '本階段聚焦 D 的開頭子音，不延伸到結尾音或子音群規則。',
      mouthPosition: '舌尖輕輕碰上排牙齒後方，再快速放開。',
      airflowHint: '聲音短而清楚，不拖長，也不要加上多餘母音。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '不要把 D 念成字母名稱 dee。',
        '不要在 D 後面多加很長的母音。',
        '看到 drum 時先抓住開頭 D 的聲音，不急著解釋 dr 子音群。',
      ],
    },
  },
  title: 'D 的短短聲音',
  subtitle: '聽見 D，找到 dog、duck、drum',
  learningObjectives: [
    {
      id: 'd-objective-uppercase-lowercase',
      skill: 'reading',
      description: '認得大寫 D 和小寫 d。',
    },
    {
      id: 'd-objective-letter-sound',
      skill: 'listening',
      description: '聽出 D 的開頭聲音。',
    },
    {
      id: 'd-objective-initial-sound',
      skill: 'listening',
      description: '能從 dog、duck、drum 找到 D 的聲音。',
    },
    {
      id: 'd-objective-repeat',
      skill: 'speaking',
      description: '跟著念出 D 的聲音與核心單字。',
    },
    {
      id: 'd-objective-read-words',
      skill: 'reading',
      description: '看見 dog、duck、drum 時能嘗試讀出來。',
    },
  ],
  words,
  sentences,
  activities: [
    {
      id: 'd-listen-word-picture-01',
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
      targetLetterIds: ['letter-d'],
      soundTargetIds: [soundTargetId],
      wordIds: ['d-dog', 'd-duck', 'd-drum'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: dogAudio,
      choices: [
        {
          id: 'd-listen-word-picture-dog',
          wordId: 'd-dog',
          image: dogImage,
          isCorrect: true,
        },
        {
          id: 'd-listen-word-picture-duck',
          wordId: 'd-duck',
          image: duckImage,
          isCorrect: false,
        },
        {
          id: 'd-listen-word-picture-drum',
          wordId: 'd-drum',
          image: drumImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'd-listen-initial-sound-02',
      type: 'listen-and-choose',
      title: '找到 D 的開頭聲音',
      studentInstruction: '聽見 D 的聲音後，找出對的圖片。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 1,
        allowSkip: false,
      },
      targetLetterIds: ['letter-d'],
      soundTargetIds: [soundTargetId],
      wordIds: ['d-dog', 'd-duck', 'd-drum'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: letterSoundAudio,
      choices: [
        {
          id: 'd-initial-sound-dog',
          wordId: 'd-dog',
          image: dogImage,
          isCorrect: true,
        },
        {
          id: 'd-initial-sound-cat',
          wordId: 'd-distractor-cat',
          image: catDistractorImage,
          isCorrect: false,
        },
        {
          id: 'd-initial-sound-ball',
          wordId: 'd-distractor-ball',
          image: ballDistractorImage,
          isCorrect: false,
        },
        {
          id: 'd-initial-sound-fish',
          wordId: 'd-distractor-fish',
          image: fishDistractorImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'd-letter-image-match-01',
      type: 'letter-image-match',
      title: '字母和圖片配對',
      studentInstruction: '看看 D 和 d，找出對應的圖片。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-d'],
      soundTargetIds: [soundTargetId],
      wordIds: ['d-dog', 'd-duck', 'd-drum'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      pairs: [
        {
          id: 'd-letter-image-match-dog',
          letter: 'D',
          wordId: 'd-dog',
          image: dogImage,
        },
        {
          id: 'd-letter-image-match-duck',
          letter: 'd',
          wordId: 'd-duck',
          image: duckImage,
        },
        {
          id: 'd-letter-image-match-drum',
          letter: 'D',
          wordId: 'd-drum',
          image: drumImage,
        },
      ],
    },
    {
      id: 'd-record-and-playback-01',
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
          studentText: '舌尖輕輕碰一下，再短短說出 D 的聲音。',
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
      targetLetterIds: ['letter-d'],
      soundTargetIds: [soundTargetId],
      wordIds: ['d-dog', 'd-duck'],
      sentenceIds: ['d-sentence-duck'],
      canAppearInDailyReview: true,
      modelAudio: letterSoundAudio,
      recordingPrompt: '先說 D，再念 dog、duck，最後念 The duck is yellow.',
    },
    {
      id: 'd-sound-sort-01',
      type: 'sound-sort',
      title: '聲音分類',
      studentInstruction: '把有 D 開頭聲音的放在一起。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 6,
        allowSkip: false,
      },
      targetLetterIds: ['letter-d'],
      soundTargetIds: [soundTargetId, 'other-starting-sounds'],
      wordIds: ['d-dog', 'd-duck', 'd-drum'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      groups: [
        {
          id: 'd-sound-sort-d',
          soundTargetId,
          label: 'D 的聲音',
        },
        {
          id: 'd-sound-sort-other',
          soundTargetId: 'other-starting-sounds',
          label: '其他聲音',
        },
      ],
      items: [
        {
          id: 'd-sound-sort-dog',
          wordId: 'd-dog',
          targetGroupId: 'd-sound-sort-d',
          image: dogImage,
        },
        {
          id: 'd-sound-sort-duck',
          wordId: 'd-duck',
          targetGroupId: 'd-sound-sort-d',
          image: duckImage,
        },
        {
          id: 'd-sound-sort-drum',
          wordId: 'd-drum',
          targetGroupId: 'd-sound-sort-d',
          image: drumImage,
        },
        {
          id: 'd-sound-sort-cat',
          wordId: 'd-distractor-cat',
          targetGroupId: 'd-sound-sort-other',
          image: catDistractorImage,
        },
        {
          id: 'd-sound-sort-ball',
          wordId: 'd-distractor-ball',
          targetGroupId: 'd-sound-sort-other',
          image: ballDistractorImage,
        },
        {
          id: 'd-sound-sort-fish',
          wordId: 'd-distractor-fish',
          targetGroupId: 'd-sound-sort-other',
          image: fishDistractorImage,
        },
      ],
    },
    {
      id: 'd-read-word-picture-01',
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
      targetLetterIds: ['letter-d'],
      soundTargetIds: [soundTargetId],
      wordIds: ['d-dog', 'd-duck', 'd-drum'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptText: 'dog',
      choices: [
        {
          id: 'd-read-word-picture-dog',
          text: '一隻小狗',
          isCorrect: true,
        },
        {
          id: 'd-read-word-picture-duck',
          text: '一隻小鴨',
          isCorrect: false,
        },
        {
          id: 'd-read-word-picture-drum',
          text: '一個小鼓',
          isCorrect: false,
        },
      ],
    },
  ],
  reviewVariants: [
    {
      id: 'd-review-dog-listen-picture-01',
      targetContentId: 'd-dog',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['d-duck', 'd-drum'],
      suggestedIntervalDays: 1,
      priorityHint: '第一次完成後，先用 dog 複習 D 的開頭聲音。',
    },
    {
      id: 'd-review-duck-image-letter-01',
      targetContentId: 'd-duck',
      activityType: 'letter-image-match',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['letter-c', 'letter-e'],
      suggestedIntervalDays: 3,
      priorityHint: '把 D 和 d 跟小鴨圖片重新配對，幫助穩定辨識。',
    },
    {
      id: 'd-review-drum-repeat-01',
      targetContentId: 'd-sentence-drum',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: false,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '跟讀 The drum is big.，練習 D 開頭聲音與短句節奏。',
    },
    {
      id: 'd-review-sound-sort-01',
      targetContentId: 'd-dog',
      activityType: 'sound-sort',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['d-distractor-cat', 'd-distractor-ball', 'd-distractor-fish'],
      suggestedIntervalDays: 7,
      priorityHint: '把 D 開頭和其他開頭聲音分開，強化聽辨。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    stage: 'Phase 4D',
    estimatedMinutes: 8,
    sourceNote:
      '沿用 A、B、C 正式課程草稿結構，先建立 D 的內容與資產規格，正式圖與音訊稍後補上。',
    contentVersion: 2,
    tags: ['letter-d', 'initial-sound', 'listening', 'speaking', 'reading'],
  },
};

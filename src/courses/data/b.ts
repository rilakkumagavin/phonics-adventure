import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'b-letter-sound';

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
  'b-letter-sound-audio',
  '/assets/audio/courses/b/letter-sound.wav',
  '/b/',
  'letter',
  'ready',
);

const ballImage = imageAsset(
  'b-ball-image',
  '/assets/images/courses/b/b-ball-core.webp',
  '一顆適合兒童辨識的彩色球',
  '',
  'ready',
);

const batImage = imageAsset(
  'b-bat-image',
  '/assets/images/courses/b/b-bat-core.webp',
  '一支木製球棒放在簡單背景前',
  '',
  'ready',
);

const busImage = imageAsset(
  'b-bus-image',
  '/assets/images/courses/b/b-bus-core.webp',
  '一台側面清楚可見的藍色公車',
  '',
  'ready',
);

const catDistractorImage = imageAsset(
  'b-distractor-cat-image',
  '/assets/images/shared/shared-cat-core.webp',
  '一隻友善的小貓',
  '',
  'ready',
);

const dogDistractorImage = imageAsset(
  'b-distractor-dog-image',
  '/assets/images/shared/shared-dog-core.webp',
  '一隻友善的小狗',
  '',
  'ready',
);

const fishDistractorImage = imageAsset(
  'b-distractor-fish-image',
  '/assets/images/shared/shared-fish-core.webp',
  '一條友善的小魚',
  '',
  'ready',
);

const ballAudio = audioAsset(
  'b-ball-audio',
  '/assets/audio/courses/b/ball.wav',
  'ball',
  'word',
  'ready',
);

const batAudio = audioAsset(
  'b-bat-audio',
  '/assets/audio/courses/b/bat.wav',
  'bat',
  'word',
  'ready',
);

const busAudio = audioAsset(
  'b-bus-audio',
  '/assets/audio/courses/b/bus.wav',
  'bus',
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
    studentText: '慢慢聽，注意嘴唇先閉起來。',
  },
  {
    type: 'show-image',
    studentText: '看看哪一張圖片最像。',
  },
  {
    type: 'show-mouth-hint',
    studentText: '雙唇先碰一下，再輕輕送出 B 的聲音。',
  },
  {
    type: 'reduce-options',
    studentText: '先拿掉一張開頭聲音不一樣的圖片。',
  },
  {
    type: 'show-partial-answer',
    studentText: '答案的單字是 B 開頭。',
  },
  {
    type: 'reveal-answer',
    studentText: '一起看看答案。',
  },
];

const words: CourseWord[] = [
  {
    id: 'b-ball',
    word: 'ball',
    displayWord: 'ball',
    meaningZhTW: '球',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: ballImage,
    audio: ballAudio,
    actionHint: '雙手抱成圓圓的球，再輕輕往前丟。',
    sceneHint: '球要大而清楚，適合在小卡片中一眼看出來。',
    tags: ['letter-b', 'core-word', 'sports', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['b-sentence-ball'],
  },
  {
    id: 'b-bat',
    word: 'bat',
    displayWord: 'bat',
    meaningZhTW: '球棒',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: batImage,
    audio: batAudio,
    actionHint: '雙手握著看不見的球棒，輕輕揮一下。',
    sceneHint: '主體只放球棒，不加入球員或球場，避免分心。',
    tags: ['letter-b', 'core-word', 'sports', 'shape-contrast'],
    isCore: true,
    sentenceIds: ['b-sentence-bat'],
  },
  {
    id: 'b-bus',
    word: 'bus',
    displayWord: 'bus',
    meaningZhTW: '公車',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: busImage,
    audio: busAudio,
    actionHint: '雙手當方向盤，假裝坐著公車往前開。',
    sceneHint: '公車用側面或三分之二角度，車身清楚、輪子可見。',
    tags: ['letter-b', 'core-word', 'vehicle', 'daily-life'],
    isCore: true,
    sentenceIds: ['b-sentence-bus'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'b-sentence-ball',
    text: 'a ball.',
    teachingHintZhTW: '先用最短句跟讀，重點放在聽見 B 的開頭聲音。',
    audio: audioAsset(
      'b-sentence-ball-audio',
      '/assets/audio/courses/b/a-ball.wav',
      'a ball.',
      'sentence',
      'ready',
    ),
    wordIds: ['b-ball'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'b-sentence-ball-image',
      '/assets/images/courses/b/b-sentence-a-ball.webp',
      '一顆球放在簡單地面上',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'b-ball', text: 'ball' }],
  },
  {
    id: 'b-sentence-bat',
    text: 'The bat is big.',
    teachingHintZhTW: '這裡的 bat 指球棒，不延伸到蝙蝠的另一個意思。',
    audio: audioAsset(
      'b-sentence-bat-audio',
      '/assets/audio/courses/b/the-bat-is-big.wav',
      'The bat is big.',
      'sentence',
      'ready',
    ),
    wordIds: ['b-bat'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'b-sentence-bat-image',
      '/assets/images/courses/b/b-sentence-big-bat.webp',
      '一支較大的球棒放在簡單背景前',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'b-bat', text: 'bat' }],
  },
  {
    id: 'b-sentence-bus',
    text: 'The bus is blue.',
    teachingHintZhTW: '用顏色幫助記憶 bus，但不把顏色教學當作本課重點。',
    audio: audioAsset(
      'b-sentence-bus-audio',
      '/assets/audio/courses/b/the-bus-is-blue.wav',
      'The bus is blue.',
      'sentence',
      'ready',
    ),
    wordIds: ['b-bus'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'b-sentence-bus-image',
      '/assets/images/courses/b/b-sentence-blue-bus.webp',
      '一台藍色公車停在簡單街道旁',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'b-bus', text: 'bus' }],
  },
];

export const letterBCourse: LetterCourse = {
  id: 'letter-b',
  version: 2,
  letter: {
    uppercase: 'B',
    lowercase: 'b',
    name: 'B',
    primarySound: {
      id: soundTargetId,
      label: 'B 的子音聲音',
      type: 'letter-sound',
      grapheme: 'B/b',
      phoneticHint: '/b/',
      description: 'B 常見的聲音是雙唇先閉起來，再輕輕送出短短的 b 聲音。',
    },
    pronunciationGuide: {
      studentHint: '雙唇先碰一下，再輕輕發出 B 的聲音。',
      teacherNote: '本課聚焦 B 的開頭子音，不延伸到 blend、雙寫子音或更多拼讀規則。',
      mouthPosition: '上下嘴唇先閉合，再快速打開出聲。',
      airflowHint: '聲音短而清楚，不拖長，也不要加上多餘母音。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '不要把 B 念成字母名稱 bee。',
        '不要在 B 後面多加一個ㄅㄨ的聲音。',
        '先閉嘴唇，再出聲。',
      ],
    },
  },
  title: 'B 的碰碰聲音',
  subtitle: '聽見 B，找到 ball、bat、bus',
  learningObjectives: [
    {
      id: 'b-objective-uppercase-lowercase',
      skill: 'reading',
      description: '認識大寫 B 與小寫 b。',
    },
    {
      id: 'b-objective-letter-sound',
      skill: 'listening',
      description: '聽辨 B 的主要子音聲音。',
    },
    {
      id: 'b-objective-initial-sound',
      skill: 'listening',
      description: '聽出 ball、bat、bus 開頭的 B 聲音。',
    },
    {
      id: 'b-objective-repeat',
      skill: 'speaking',
      description: '跟讀 B 的聲音、核心單字與短句。',
    },
    {
      id: 'b-objective-read-words',
      skill: 'reading',
      description: '看見核心單字時，能連結 B 的開頭聲音與圖片。',
    },
  ],
  words,
  sentences,
  activities: [
    {
      id: 'b-listen-word-picture-01',
      type: 'listen-and-choose',
      title: '聽聲音選圖片',
      studentInstruction: '聽單字，選出正確的圖片。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-b'],
      soundTargetIds: [soundTargetId],
      wordIds: ['b-ball', 'b-bat', 'b-bus'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: ballAudio,
      choices: [
        {
          id: 'b-listen-word-picture-ball',
          wordId: 'b-ball',
          image: ballImage,
          isCorrect: true,
        },
        {
          id: 'b-listen-word-picture-bat',
          wordId: 'b-bat',
          image: batImage,
          isCorrect: false,
        },
        {
          id: 'b-listen-word-picture-bus',
          wordId: 'b-bus',
          image: busImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'b-listen-initial-sound-02',
      type: 'listen-and-choose',
      title: '找出 B 開頭的聲音',
      studentInstruction: '聽 B 的聲音，找出 B 開頭的圖片。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 1,
        allowSkip: false,
      },
      targetLetterIds: ['letter-b'],
      soundTargetIds: [soundTargetId],
      wordIds: ['b-ball', 'b-bat', 'b-bus'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: letterSoundAudio,
      choices: [
        {
          id: 'b-initial-sound-ball',
          wordId: 'b-ball',
          image: ballImage,
          isCorrect: true,
        },
        {
          id: 'b-initial-sound-cat',
          wordId: 'b-distractor-cat',
          image: catDistractorImage,
          isCorrect: false,
        },
        {
          id: 'b-initial-sound-dog',
          wordId: 'b-distractor-dog',
          image: dogDistractorImage,
          isCorrect: false,
        },
        {
          id: 'b-initial-sound-fish',
          wordId: 'b-distractor-fish',
          image: fishDistractorImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'b-letter-image-match-01',
      type: 'letter-image-match',
      title: '字母與圖片配對',
      studentInstruction: '看見 B 或 b，選出和 B 聲音連在一起的圖片。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-b'],
      soundTargetIds: [soundTargetId],
      wordIds: ['b-ball', 'b-bat', 'b-bus'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      pairs: [
        {
          id: 'b-letter-image-match-ball',
          letter: 'B',
          wordId: 'b-ball',
          image: ballImage,
        },
        {
          id: 'b-letter-image-match-bat',
          letter: 'b',
          wordId: 'b-bat',
          image: batImage,
        },
        {
          id: 'b-letter-image-match-bus',
          letter: 'B',
          wordId: 'b-bus',
          image: busImage,
        },
      ],
    },
    {
      id: 'b-record-and-playback-01',
      type: 'record-and-playback',
      title: '聽、念、回放',
      studentInstruction: '先聽原音，再跟著念。錄音只是讓你聽聽自己的聲音。',
      skills: ['speaking'],
      difficulty: 1,
      hintSteps: [
        {
          type: 'replay-audio',
          studentText: '再聽一次原音。',
        },
        {
          type: 'show-mouth-hint',
          studentText: '雙唇先碰一下，再輕輕發出 B 的聲音。',
        },
        {
          type: 'reveal-answer',
          studentText: '再跟著老師念一次。',
        },
      ],
      completion: {
        attemptsRequired: 1,
        allowSkip: true,
      },
      targetLetterIds: ['letter-b'],
      soundTargetIds: [soundTargetId],
      wordIds: ['b-ball', 'b-bus'],
      sentenceIds: ['b-sentence-bus'],
      canAppearInDailyReview: true,
      modelAudio: letterSoundAudio,
      recordingPrompt: '聽 B 的聲音，再念 ball、bus 和 The bus is blue.',
    },
    {
      id: 'b-sound-sort-01',
      type: 'sound-sort',
      title: '聲音分類',
      studentInstruction: '把 B 開頭的圖片放到 B 的聲音朋友裡。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 6,
        allowSkip: false,
      },
      targetLetterIds: ['letter-b'],
      soundTargetIds: [soundTargetId, 'other-starting-sounds'],
      wordIds: ['b-ball', 'b-bat', 'b-bus'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      groups: [
        {
          id: 'b-sound-sort-b',
          soundTargetId,
          label: 'B 的碰碰聲音',
        },
        {
          id: 'b-sound-sort-other',
          soundTargetId: 'other-starting-sounds',
          label: '其他聲音',
        },
      ],
      items: [
        {
          id: 'b-sound-sort-ball',
          wordId: 'b-ball',
          targetGroupId: 'b-sound-sort-b',
          image: ballImage,
        },
        {
          id: 'b-sound-sort-bat',
          wordId: 'b-bat',
          targetGroupId: 'b-sound-sort-b',
          image: batImage,
        },
        {
          id: 'b-sound-sort-bus',
          wordId: 'b-bus',
          targetGroupId: 'b-sound-sort-b',
          image: busImage,
        },
        {
          id: 'b-sound-sort-cat',
          wordId: 'b-distractor-cat',
          targetGroupId: 'b-sound-sort-other',
          image: catDistractorImage,
        },
        {
          id: 'b-sound-sort-dog',
          wordId: 'b-distractor-dog',
          targetGroupId: 'b-sound-sort-other',
          image: dogDistractorImage,
        },
        {
          id: 'b-sound-sort-fish',
          wordId: 'b-distractor-fish',
          targetGroupId: 'b-sound-sort-other',
          image: fishDistractorImage,
        },
      ],
    },
    {
      id: 'b-read-word-picture-01',
      type: 'read-and-choose',
      title: '看字選圖',
      studentInstruction: '看英文單字，選出對應的圖片。這不是拼字測驗。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-b'],
      soundTargetIds: [soundTargetId],
      wordIds: ['b-ball', 'b-bat', 'b-bus'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptText: 'ball',
      choices: [
        {
          id: 'b-read-word-picture-ball',
          text: '一顆球',
          isCorrect: true,
        },
        {
          id: 'b-read-word-picture-bat',
          text: '一支球棒',
          isCorrect: false,
        },
        {
          id: 'b-read-word-picture-bus',
          text: '一台公車',
          isCorrect: false,
        },
      ],
    },
  ],
  reviewVariants: [
    {
      id: 'b-review-ball-listen-picture-01',
      targetContentId: 'b-ball',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['b-bat', 'b-bus'],
      suggestedIntervalDays: 1,
      priorityHint: '第一次完成後隔日複習，圖片位置可以更換。',
    },
    {
      id: 'b-review-bat-image-letter-01',
      targetContentId: 'b-bat',
      activityType: 'letter-image-match',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['letter-a', 'letter-c'],
      suggestedIntervalDays: 3,
      priorityHint: '看圖片選 A、B、C，練習把球棒和 B 連起來。',
    },
    {
      id: 'b-review-bus-repeat-01',
      targetContentId: 'b-sentence-bus',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: false,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '跟讀 The bus is blue.，只做自我比較，不做自動評分。',
    },
    {
      id: 'b-review-sound-sort-01',
      targetContentId: 'b-ball',
      activityType: 'sound-sort',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['b-distractor-cat', 'b-distractor-dog', 'b-distractor-fish'],
      suggestedIntervalDays: 7,
      priorityHint: '把 B 開頭與非 B 開頭圖片分到不同聲音朋友。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    stage: 'Phase 4B',
    estimatedMinutes: 8,
    sourceNote: '依 A 課正式內容結構延伸，單字與句子仍需教學審查與圖片、音訊資產補齊。',
    contentVersion: 2,
    tags: ['letter-b', 'initial-sound', 'listening', 'speaking', 'reading'],
  },
};

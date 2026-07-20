import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

const soundTargetId = 'a-short-sound';

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
  'a-short-sound-audio',
  '/assets/audio/courses/a/letter-sound.wav',
  '/æ/',
  'letter',
  'ready',
);

const appleImage = imageAsset(
  'a-apple-image',
  '/assets/images/courses/a/a-apple-core.webp',
  '一顆帶著綠葉的紅蘋果',
  '',
  'ready',
);

const antImage = imageAsset(
  'a-ant-image',
  '/assets/images/courses/a/a-ant-core.webp',
  '一隻正在搬食物的小螞蟻',
  '',
  'ready',
);

const alligatorImage = imageAsset(
  'a-alligator-image',
  '/assets/images/courses/a/a-alligator-core.webp',
  '一隻張開嘴巴的友善短吻鱷',
  '',
  'ready',
);

const ballDistractorImage = imageAsset(
  'a-distractor-ball-image',
  '/assets/images/shared/shared-ball-core.webp',
  '一顆彩色球',
  '',
  'ready',
);

const catDistractorImage = imageAsset(
  'a-distractor-cat-image',
  '/assets/images/shared/shared-cat-core.webp',
  '一隻友善的小貓',
  '',
  'ready',
);

const dogDistractorImage = imageAsset(
  'a-distractor-dog-image',
  '/assets/images/shared/shared-dog-core.webp',
  '一隻友善的小狗',
  '',
  'ready',
);

const appleAudio = audioAsset(
  'a-apple-audio',
  '/assets/audio/courses/a/apple.wav',
  'apple',
  'word',
  'ready',
);

const antAudio = audioAsset(
  'a-ant-audio',
  '/assets/audio/courses/a/ant.wav',
  'ant',
  'word',
  'ready',
);

const alligatorAudio = audioAsset(
  'a-alligator-audio',
  '/assets/audio/courses/a/alligator.wav',
  'alligator',
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
    studentText: '慢慢聽，注意開頭的聲音。',
  },
  {
    type: 'show-image',
    studentText: '看看哪一張圖片最像。',
  },
  {
    type: 'show-mouth-hint',
    studentText: '嘴巴張開，發出短短的 A 聲音。',
  },
  {
    type: 'reduce-options',
    studentText: '先拿掉一個不一樣的選項。',
  },
  {
    type: 'show-partial-answer',
    studentText: '答案的單字是 A 開頭。',
  },
  {
    type: 'reveal-answer',
    studentText: '一起看看答案。',
  },
];

const words: CourseWord[] = [
  {
    id: 'a-apple',
    word: 'apple',
    displayWord: 'apple',
    meaningZhTW: '蘋果',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: appleImage,
    audio: appleAudio,
    actionHint: '假裝拿起蘋果咬一口。',
    sceneHint: '果園或水果攤，一顆紅蘋果放在籃子裡。',
    tags: ['letter-a', 'core-word', 'food', 'easy-to-recognize'],
    isCore: true,
    sentenceIds: ['a-sentence-apple'],
  },
  {
    id: 'a-ant',
    word: 'ant',
    displayWord: 'ant',
    meaningZhTW: '螞蟻',
    soundTargetIds: [soundTargetId],
    difficulty: 1,
    image: antImage,
    audio: antAudio,
    actionHint: '用手指做出小螞蟻慢慢爬的動作。',
    sceneHint: '螞蟻正在搬一小塊食物，畫面要能看出小小的 ant。',
    tags: ['letter-a', 'core-word', 'animal', 'initial-sound'],
    isCore: true,
    sentenceIds: ['a-sentence-ant'],
  },
  {
    id: 'a-alligator',
    word: 'alligator',
    displayWord: 'alligator',
    meaningZhTW: '短吻鱷',
    soundTargetIds: [soundTargetId],
    difficulty: 2,
    image: alligatorImage,
    audio: alligatorAudio,
    actionHint: '雙手張開合起來，模仿短吻鱷的大嘴巴。',
    sceneHint: '河邊或沼澤中的短吻鱷，嘴巴張開但畫面不恐怖。',
    tags: ['letter-a', 'core-word', 'animal', 'longer-word', 'listen-and-repeat'],
    isCore: true,
    sentenceIds: ['a-sentence-alligator'],
  },
];

const sentences: CourseSentence[] = [
  {
    id: 'a-sentence-apple',
    text: 'An apple.',
    teachingHintZhTW: '短句只用來跟讀與配圖，不把冠詞文法當作本課重點。',
    audio: audioAsset(
      'a-sentence-apple-audio',
      '/assets/audio/courses/a/an-apple.wav',
      'An apple.',
      'sentence',
      'ready',
    ),
    wordIds: ['a-apple'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'a-sentence-apple-image',
      '/assets/images/courses/a/a-sentence-an-apple.webp',
      '一顆紅蘋果放在簡單桌面上',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'a-apple', text: 'apple' }],
  },
  {
    id: 'a-sentence-ant',
    text: 'I see an ant.',
    teachingHintZhTW: '引導學生看圖跟讀，不延伸完整文法說明。',
    audio: audioAsset(
      'a-sentence-ant-audio',
      '/assets/audio/courses/a/i-see-an-ant.wav',
      'I see an ant.',
      'sentence',
      'ready',
    ),
    wordIds: ['a-ant'],
    difficulty: 1,
    isCore: true,
    image: imageAsset(
      'a-sentence-ant-image',
      '/assets/images/courses/a/a-sentence-see-ant.webp',
      '一位兒童蹲下觀察正在搬食物的小螞蟻',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'a-ant', text: 'ant' }],
  },
  {
    id: 'a-sentence-alligator',
    text: 'The alligator is big.',
    teachingHintZhTW: 'alligator 較長，只要求聽辨與跟讀，不要求拼寫。',
    audio: audioAsset(
      'a-sentence-alligator-audio',
      '/assets/audio/courses/a/the-alligator-is-big.wav',
      'The alligator is big.',
      'sentence',
      'ready',
    ),
    wordIds: ['a-alligator'],
    difficulty: 2,
    isCore: true,
    image: imageAsset(
      'a-sentence-alligator-image',
      '/assets/images/courses/a/a-sentence-big-alligator.webp',
      '一隻體型較大的友善短吻鱷在河岸邊',
      '',
      'ready',
    ),
    highlightWords: [{ wordId: 'a-alligator', text: 'alligator' }],
  },
];

export const letterACourse: LetterCourse = {
  id: 'letter-a',
  version: 2,
  letter: {
    uppercase: 'A',
    lowercase: 'a',
    name: 'A',
    primarySound: {
      id: soundTargetId,
      label: 'A 的短母音',
      type: 'letter-sound',
      grapheme: 'A/a',
      phoneticHint: '/æ/',
      description: 'A 在 apple、ant、alligator 開頭常見的短母音聲音。',
    },
    pronunciationGuide: {
      studentHint: '嘴巴張開，發出短短的 A 聲音。',
      teacherNote:
        '本課聚焦短母音 A，不教長母音 A、a_e、ai、ay，也不要求學生記完整音標系統。',
      mouthPosition: '嘴巴自然張開，下顎微微往下，聲音短而清楚。',
      airflowHint: '自然出聲，不刻意拖長。',
      avoidZhuyinApproximation: true,
      commonMistakes: [
        '不要念成字母名稱 A。',
        '不要把聲音拖太長。',
        '不要用中文諧音取代原音。',
      ],
    },
  },
  title: 'A 的短短聲音',
  subtitle: '聽見 A，找到 apple、ant、alligator',
  learningObjectives: [
    {
      id: 'a-objective-uppercase-lowercase',
      skill: 'reading',
      description: '認識大寫 A 與小寫 a。',
    },
    {
      id: 'a-objective-short-sound',
      skill: 'listening',
      description: '聽辨 A 的主要短母音。',
    },
    {
      id: 'a-objective-initial-sound',
      skill: 'listening',
      description: '聽出 apple、ant、alligator 開頭的 A 聲音。',
    },
    {
      id: 'a-objective-repeat',
      skill: 'speaking',
      description: '跟讀 A 的聲音、核心單字與一個短句。',
    },
    {
      id: 'a-objective-read-words',
      skill: 'reading',
      description: '看見核心單字時，能連結圖片與開頭聲音。',
    },
  ],
  words,
  sentences,
  activities: [
    {
      id: 'a-listen-word-picture-01',
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
      targetLetterIds: ['letter-a'],
      soundTargetIds: [soundTargetId],
      wordIds: ['a-apple', 'a-ant', 'a-alligator'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: appleAudio,
      choices: [
        {
          id: 'a-listen-word-picture-apple',
          wordId: 'a-apple',
          image: appleImage,
          isCorrect: true,
        },
        {
          id: 'a-listen-word-picture-ant',
          wordId: 'a-ant',
          image: antImage,
          isCorrect: false,
        },
        {
          id: 'a-listen-word-picture-alligator',
          wordId: 'a-alligator',
          image: alligatorImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'a-listen-initial-sound-02',
      type: 'listen-and-choose',
      title: '找出 A 開頭的聲音',
      studentInstruction: '聽 A 的短短聲音，找出 A 開頭的圖片。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 1,
        allowSkip: false,
      },
      targetLetterIds: ['letter-a'],
      soundTargetIds: [soundTargetId],
      wordIds: ['a-apple', 'a-ant', 'a-alligator'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: letterSoundAudio,
      choices: [
        {
          id: 'a-initial-sound-apple',
          wordId: 'a-apple',
          image: appleImage,
          isCorrect: true,
        },
        {
          id: 'a-initial-sound-ball',
          wordId: 'a-distractor-ball',
          image: ballDistractorImage,
          isCorrect: false,
        },
        {
          id: 'a-initial-sound-cat',
          wordId: 'a-distractor-cat',
          image: catDistractorImage,
          isCorrect: false,
        },
        {
          id: 'a-initial-sound-dog',
          wordId: 'a-distractor-dog',
          image: dogDistractorImage,
          isCorrect: false,
        },
      ],
    },
    {
      id: 'a-letter-image-match-01',
      type: 'letter-image-match',
      title: '字母與圖片配對',
      studentInstruction: '看見 A 或 a，選出和 A 聲音連在一起的圖片。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 3,
        allowSkip: false,
      },
      targetLetterIds: ['letter-a'],
      soundTargetIds: [soundTargetId],
      wordIds: ['a-apple', 'a-ant', 'a-alligator'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      pairs: [
        {
          id: 'a-letter-image-match-apple',
          letter: 'A',
          wordId: 'a-apple',
          image: appleImage,
        },
        {
          id: 'a-letter-image-match-ant',
          letter: 'a',
          wordId: 'a-ant',
          image: antImage,
        },
        {
          id: 'a-letter-image-match-alligator',
          letter: 'A',
          wordId: 'a-alligator',
          image: alligatorImage,
        },
      ],
    },
    {
      id: 'a-record-and-playback-01',
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
          studentText: '嘴巴張開，發出短短的 A 聲音。',
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
      targetLetterIds: ['letter-a'],
      soundTargetIds: [soundTargetId],
      wordIds: ['a-apple', 'a-ant'],
      sentenceIds: ['a-sentence-ant'],
      canAppearInDailyReview: true,
      modelAudio: letterSoundAudio,
      recordingPrompt: '聽 A 的聲音，再念 apple、ant 和 I see an ant.',
    },
    {
      id: 'a-sound-sort-01',
      type: 'sound-sort',
      title: '聲音分類',
      studentInstruction: '把 A 開頭的圖片放到 A 的聲音朋友裡。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: {
        correctRequired: 6,
        allowSkip: false,
      },
      targetLetterIds: ['letter-a'],
      soundTargetIds: [soundTargetId, 'other-starting-sounds'],
      wordIds: ['a-apple', 'a-ant', 'a-alligator'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      groups: [
        {
          id: 'a-sound-sort-a',
          soundTargetId,
          label: 'A 的短短聲音',
        },
        {
          id: 'a-sound-sort-other',
          soundTargetId: 'other-starting-sounds',
          label: '其他聲音',
        },
      ],
      items: [
        {
          id: 'a-sound-sort-apple',
          wordId: 'a-apple',
          targetGroupId: 'a-sound-sort-a',
          image: appleImage,
        },
        {
          id: 'a-sound-sort-ant',
          wordId: 'a-ant',
          targetGroupId: 'a-sound-sort-a',
          image: antImage,
        },
        {
          id: 'a-sound-sort-alligator',
          wordId: 'a-alligator',
          targetGroupId: 'a-sound-sort-a',
          image: alligatorImage,
        },
        {
          id: 'a-sound-sort-ball',
          wordId: 'a-distractor-ball',
          targetGroupId: 'a-sound-sort-other',
          image: ballDistractorImage,
        },
        {
          id: 'a-sound-sort-cat',
          wordId: 'a-distractor-cat',
          targetGroupId: 'a-sound-sort-other',
          image: catDistractorImage,
        },
        {
          id: 'a-sound-sort-dog',
          wordId: 'a-distractor-dog',
          targetGroupId: 'a-sound-sort-other',
          image: dogDistractorImage,
        },
      ],
    },
    {
      id: 'a-read-word-picture-01',
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
      targetLetterIds: ['letter-a'],
      soundTargetIds: [soundTargetId],
      wordIds: ['a-apple', 'a-ant', 'a-alligator'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptText: 'apple',
      choices: [
        {
          id: 'a-read-word-picture-apple',
          text: '一顆紅蘋果',
          isCorrect: true,
        },
        {
          id: 'a-read-word-picture-ant',
          text: '一隻小螞蟻',
          isCorrect: false,
        },
        {
          id: 'a-read-word-picture-alligator',
          text: '一隻短吻鱷',
          isCorrect: false,
        },
      ],
    },
  ],
  reviewVariants: [
    {
      id: 'a-review-apple-listen-picture-01',
      targetContentId: 'a-apple',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: ['a-ant', 'a-alligator'],
      suggestedIntervalDays: 1,
      priorityHint: '第一次完成後隔日複習，圖片位置可更換。',
    },
    {
      id: 'a-review-ant-image-letter-01',
      targetContentId: 'a-ant',
      activityType: 'letter-image-match',
      skills: ['reading'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['letter-b', 'letter-c'],
      suggestedIntervalDays: 3,
      priorityHint: '看圖片選 A、B、C，練習連結圖片與字母。',
    },
    {
      id: 'a-review-initial-sound-01',
      targetContentId: 'a-apple',
      activityType: 'listen-and-choose',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['a-distractor-ball', 'a-distractor-cat', 'a-ant'],
      suggestedIntervalDays: 3,
      priorityHint: '播放 apple、ball、ant 等，判斷是否為 A 開頭。',
    },
    {
      id: 'a-review-sentence-repeat-01',
      targetContentId: 'a-sentence-ant',
      activityType: 'record-and-playback',
      skills: ['speaking'],
      difficulty: 1,
      requiresAudio: true,
      requiresImage: false,
      usesNewContext: false,
      suggestedIntervalDays: 7,
      priorityHint: '跟讀 I see an ant.，只做自我比較，不做自動評分。',
    },
    {
      id: 'a-review-sound-sort-01',
      targetContentId: 'a-apple',
      activityType: 'sound-sort',
      skills: ['listening'],
      difficulty: 1,
      requiresAudio: false,
      requiresImage: true,
      usesNewContext: true,
      distractorIds: ['a-distractor-ball', 'a-distractor-cat', 'a-distractor-dog'],
      suggestedIntervalDays: 7,
      priorityHint: '把 A 開頭與非 A 開頭圖片分到不同聲音朋友。',
    },
  ],
  metadata: {
    status: 'draft',
    createdAt: '2026-06-30',
    updatedAt: '2026-06-30',
    stage: 'Phase 4A',
    estimatedMinutes: 8,
    sourceNote: '依自然發音影片系列與本專案教學原則設計；仍需正式教學審查。',
    contentVersion: 2,
    tags: ['letter-a', 'initial-sound', 'listening', 'speaking', 'reading'],
  },
};

import type { AudioAssetRef, ImageAssetRef } from '../../types/asset';
import type { HintStep } from '../../types/activity';
import type { CourseSentence, CourseWord, LetterCourse } from '../../types/course';

interface LetterCourseSeed {
  id: string;
  uppercase: string;
  lowercase: string;
  name: string;
  words: Array<{
    word: string;
    meaningZhTW: string;
  }>;
}

const placeholderHintSteps: HintStep[] = [
  {
    type: 'replay-audio',
    studentText: '再聽一次。',
  },
  {
    type: 'slow-audio',
    studentText: '慢慢聽。',
  },
  {
    type: 'show-image',
    studentText: '看看圖片提示。',
  },
  {
    type: 'reveal-answer',
    studentText: '最後再看答案。',
  },
];

function createImageAsset(id: string, alt: string): ImageAssetRef {
  return {
    id,
    src: '',
    alt,
    status: 'placeholder',
    placeholder: '正式圖片將於後續課程內容階段補上。',
  };
}

function createAudioAsset(
  id: string,
  transcript: string,
  kind: AudioAssetRef['kind'],
): AudioAssetRef {
  return {
    id,
    src: '',
    kind,
    transcript,
    status: 'placeholder',
    playbackRateOptions: [1, 0.75],
  };
}

export function createLetterCourse(seed: LetterCourseSeed): LetterCourse {
  const soundTargetId = `${seed.lowercase}-primary-sound`;
  const courseId = seed.id;
  const words: CourseWord[] = seed.words.map((wordSeed) => {
    const wordId = `${seed.lowercase}-${wordSeed.word}`;

    return {
      id: wordId,
      word: wordSeed.word,
      displayWord: wordSeed.word,
      meaningZhTW: wordSeed.meaningZhTW,
      soundTargetIds: [soundTargetId],
      difficulty: 1,
      image: createImageAsset(`${wordId}-image`, `${wordSeed.word} 圖片佔位`),
      audio: createAudioAsset(`${wordId}-audio`, wordSeed.word, 'word'),
      actionHint: '動作與情境需於正式內容設計階段確認。',
      sceneHint: '圖片情境需依教學影片與辨識度確認。',
      tags: [seed.lowercase, 'core-word', 'placeholder'],
      isCore: true,
      sentenceIds: [`${seed.lowercase}-sentence-01`],
    };
  });

  const sentences: CourseSentence[] = [
    {
      id: `${seed.lowercase}-sentence-01`,
      text: `This is a ${seed.words[0].word}.`,
      teachingHintZhTW: '正式短句需於後續課程設計確認。',
      audio: createAudioAsset(
        `${seed.lowercase}-sentence-01-audio`,
        `This is a ${seed.words[0].word}.`,
        'sentence',
      ),
      wordIds: [words[0].id],
      difficulty: 1,
      isCore: true,
      image: createImageAsset(
        `${seed.lowercase}-sentence-01-image`,
        `${seed.uppercase} 句子情境圖片佔位`,
      ),
      highlightWords: [
        {
          wordId: words[0].id,
          text: seed.words[0].word,
        },
      ],
    },
  ];

  return {
    id: courseId,
    version: 1,
    letter: {
      uppercase: seed.uppercase,
      lowercase: seed.lowercase,
      name: seed.name,
      primarySound: {
        id: soundTargetId,
        label: `${seed.uppercase} 的主要字母音`,
        type: 'letter-sound',
        grapheme: seed.uppercase,
        phoneticHint: '正式發音表示需於後續內容階段確認。',
        description: `${seed.uppercase} 字母音的初學者練習目標。`,
      },
      pronunciationGuide: {
        studentHint: '聽原音，跟著短短念一次。',
        teacherNote: '此處為骨架提示，正式發音說明需依教學設計補齊。',
        mouthPosition: '嘴型提示待補。',
        airflowHint: '氣流提示待補。',
        avoidZhuyinApproximation: true,
        commonMistakes: ['不要用中文諧音取代英語原音。'],
      },
    },
    title: `${seed.uppercase} 字母聲音課程`,
    subtitle: 'Phase 3 正式課程資料骨架',
    learningObjectives: [
      {
        id: `${seed.lowercase}-objective-listening`,
        skill: 'listening',
        description: `聽辨 ${seed.uppercase} 的主要字母音。`,
      },
      {
        id: `${seed.lowercase}-objective-speaking`,
        skill: 'speaking',
        description: `跟讀 ${seed.uppercase} 的主要字母音與核心單字。`,
      },
      {
        id: `${seed.lowercase}-objective-reading`,
        skill: 'reading',
        description: `看見 ${seed.uppercase}/${seed.lowercase} 與核心單字時建立聲音連結。`,
      },
    ],
    words,
    sentences,
    activities: [
      {
        id: `${seed.lowercase}-listen-initial-sound-01`,
        type: 'listen-and-choose',
        title: `聽 ${seed.uppercase} 的聲音`,
        studentInstruction: '聽聲音，找出正確的圖片。',
        skills: ['listening'],
        difficulty: 1,
        hintSteps: placeholderHintSteps,
        completion: {
          correctRequired: 1,
          allowSkip: false,
        },
        targetLetterIds: [courseId],
        soundTargetIds: [soundTargetId],
        wordIds: words.map((word) => word.id),
        sentenceIds: [],
        canAppearInDailyReview: true,
        promptAudio: createAudioAsset(
          `${seed.lowercase}-letter-sound-audio`,
          seed.uppercase,
          'letter',
        ),
        choices: words.map((word, index) => ({
          id: `${word.id}-choice`,
          wordId: word.id,
          image: word.image,
          isCorrect: index === 0,
        })),
      },
      {
        id: `${seed.lowercase}-record-and-playback-01`,
        type: 'record-and-playback',
        title: `跟讀 ${seed.uppercase} 的聲音`,
        studentInstruction: '先聽原音，再錄下自己的聲音。',
        skills: ['speaking'],
        difficulty: 1,
        hintSteps: placeholderHintSteps,
        completion: {
          attemptsRequired: 1,
          allowSkip: true,
        },
        targetLetterIds: [courseId],
        soundTargetIds: [soundTargetId],
        wordIds: [words[0].id],
        sentenceIds: [],
        canAppearInDailyReview: true,
        modelAudio: words[0].audio,
        recordingPrompt: `跟著念 ${words[0].word}。`,
      },
      {
        id: `${seed.lowercase}-read-and-choose-01`,
        type: 'read-and-choose',
        title: `看字找 ${seed.uppercase} 的朋友`,
        studentInstruction: '看見單字，選出剛剛練習過的聲音朋友。',
        skills: ['reading'],
        difficulty: 1,
        hintSteps: placeholderHintSteps,
        completion: {
          correctRequired: 1,
          allowSkip: false,
        },
        targetLetterIds: [courseId],
        soundTargetIds: [soundTargetId],
        wordIds: [words[0].id],
        sentenceIds: [sentences[0].id],
        canAppearInDailyReview: true,
        promptText: words[0].displayWord,
        choices: [
          {
            id: `${seed.lowercase}-read-choice-correct`,
            text: seed.uppercase,
            isCorrect: true,
          },
          {
            id: `${seed.lowercase}-read-choice-distractor-01`,
            text: '其他聲音',
            isCorrect: false,
          },
        ],
      },
    ],
    reviewVariants: [
      {
        id: `${seed.lowercase}-review-${seed.words[0].word}-01`,
        targetContentId: words[0].id,
        activityType: 'listen-and-choose',
        skills: ['listening'],
        difficulty: 1,
        requiresAudio: true,
        requiresImage: true,
        usesNewContext: false,
        distractorIds: words.slice(1).map((word) => word.id),
        suggestedIntervalDays: 1,
        priorityHint: '第一次完成後隔日複習。',
      },
    ],
    metadata: {
      status: 'placeholder',
      createdAt: '2026-06-30',
      updatedAt: '2026-06-30',
      stage: 'Phase 3',
      estimatedMinutes: 8,
      sourceNote: '暫定單字，後續仍需依影片與教學設計確認。',
      contentVersion: 1,
      tags: [seed.lowercase, 'a-f-mvp', 'course-skeleton'],
    },
  };
}

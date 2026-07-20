import type { CourseActivity, HintStep } from '../types/activity';
import type { AudioAssetRef, ImageAssetRef } from '../types/asset';
import type { CourseSentence, CourseWord, LetterCourse } from '../types/course';

interface FocusedSentenceConfig {
  audioFilename: string;
  imageAlt: string;
  teachingHintZhTW: string;
  text: string;
}

interface FocusedWordConfig {
  actionHint: string;
  difficulty?: 1 | 2 | 3;
  imageAlt: string;
  meaningZhTW: string;
  sceneHint: string;
  sentence: FocusedSentenceConfig;
  tags: string[];
  word: string;
}

interface FocusedLetterCourseConfig {
  airflowHint: string;
  commonMistakes: string[];
  description: string;
  estimatedMinutes?: number;
  letter: string;
  mouthPosition: string;
  phoneticHint: string;
  soundLabel: string;
  stage: string;
  studentHint: string;
  teacherNote: string;
  title: string;
  words: [FocusedWordConfig, FocusedWordConfig, FocusedWordConfig];
}

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

export function createFocusedLetterCourse(
  config: FocusedLetterCourseConfig,
): LetterCourse {
  const lowercase = config.letter.toLowerCase();
  const uppercase = config.letter.toUpperCase();
  const courseId = `letter-${lowercase}`;
  const soundTargetId = `${lowercase}-letter-sound`;
  const letterSoundAudio = audioAsset(
    `${lowercase}-letter-sound-audio`,
    `/assets/audio/courses/${lowercase}/letter-sound.wav`,
    config.phoneticHint,
    'letter',
  );
  const hintSteps: HintStep[] = [
    { type: 'replay-audio', studentText: '再聽一次。' },
    { type: 'slow-audio', studentText: `慢慢聽這個字裡的 ${uppercase} 聲。` },
    { type: 'show-image', studentText: '看看圖片提示。' },
    { type: 'show-mouth-hint', studentText: config.studentHint },
    { type: 'reveal-answer', studentText: '一起看答案，再聽一次。' },
  ];
  const words: CourseWord[] = config.words.map((entry) => {
    const wordId = `${lowercase}-${entry.word}`;

    return {
      id: wordId,
      word: entry.word,
      displayWord: entry.word,
      meaningZhTW: entry.meaningZhTW,
      soundTargetIds: [soundTargetId],
      difficulty: entry.difficulty ?? 1,
      image: imageAsset(
        `${wordId}-image`,
        `/assets/images/courses/${lowercase}/${lowercase}-${entry.word}-core.webp`,
        entry.imageAlt,
      ),
      audio: audioAsset(
        `${wordId}-audio`,
        `/assets/audio/courses/${lowercase}/${entry.word}.wav`,
        entry.word,
        'word',
      ),
      actionHint: entry.actionHint,
      sceneHint: entry.sceneHint,
      tags: [`letter-${lowercase}`, 'core-word', ...entry.tags],
      isCore: true,
      sentenceIds: [`${lowercase}-sentence-${entry.word}`],
    };
  });
  const sentences: CourseSentence[] = config.words.map((entry, index) => {
    const word = words[index];
    const sentenceId = `${lowercase}-sentence-${entry.word}`;

    return {
      id: sentenceId,
      text: entry.sentence.text,
      teachingHintZhTW: entry.sentence.teachingHintZhTW,
      audio: audioAsset(
        `${sentenceId}-audio`,
        `/assets/audio/courses/${lowercase}/${entry.sentence.audioFilename}`,
        entry.sentence.text,
        'sentence',
      ),
      wordIds: [word.id],
      difficulty: entry.difficulty ?? 1,
      isCore: true,
      image: imageAsset(
        `${sentenceId}-image`,
        word.image.src,
        entry.sentence.imageAlt,
      ),
      highlightWords: [{ wordId: word.id, text: entry.word }],
    };
  });
  const activities: CourseActivity[] = [
    {
      id: `${lowercase}-listen-word-picture-01`,
      type: 'listen-and-choose',
      title: `聽 ${uppercase} 的聲音`,
      studentInstruction: '聽聽看，再找到正確的圖片。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps,
      completion: { correctRequired: 3, allowSkip: false },
      targetLetterIds: [courseId],
      soundTargetIds: [soundTargetId],
      wordIds: words.map((word) => word.id),
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptAudio: words[0].audio,
      choices: words.map((word, index) => ({
        id: `${lowercase}-listen-${word.word}`,
        wordId: word.id,
        image: word.image,
        isCorrect: index === 0,
      })),
    },
    {
      id: `${lowercase}-record-and-playback-01`,
      type: 'record-and-playback',
      title: `跟著念 ${uppercase}`,
      studentInstruction: `先聽原音，再念 ${uppercase} 的聲音和三個單字。`,
      skills: ['speaking'],
      difficulty: 1,
      hintSteps,
      completion: { attemptsRequired: 1, allowSkip: true },
      targetLetterIds: [courseId],
      soundTargetIds: [soundTargetId],
      wordIds: words.map((word) => word.id),
      sentenceIds: [sentences[0].id],
      canAppearInDailyReview: true,
      modelAudio: letterSoundAudio,
      recordingPrompt: `念 ${uppercase} 的聲音，再念 ${words
        .map((word) => word.displayWord)
        .join('、')}。`,
    },
    {
      id: `${lowercase}-read-word-picture-01`,
      type: 'read-and-choose',
      title: `看字讀 ${uppercase}`,
      studentInstruction: '看看單字，再選出它的意思。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps,
      completion: { correctRequired: 1, allowSkip: false },
      targetLetterIds: [courseId],
      soundTargetIds: [soundTargetId],
      wordIds: words.map((word) => word.id),
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptText: words[0].displayWord,
      choices: words.map((word, index) => ({
        id: `${lowercase}-read-${word.word}`,
        text: word.meaningZhTW,
        isCorrect: index === 0,
      })),
    },
  ];

  return {
    id: courseId,
    version: 1,
    letter: {
      uppercase,
      lowercase,
      name: uppercase,
      primarySound: {
        id: soundTargetId,
        label: config.soundLabel,
        type: 'letter-sound',
        grapheme: `${uppercase}/${lowercase}`,
        phoneticHint: config.phoneticHint,
        description: config.description,
      },
      pronunciationGuide: {
        studentHint: config.studentHint,
        teacherNote: config.teacherNote,
        mouthPosition: config.mouthPosition,
        airflowHint: config.airflowHint,
        avoidZhuyinApproximation: true,
        commonMistakes: config.commonMistakes,
      },
    },
    title: config.title,
    subtitle: `聽見 ${uppercase}，找到 ${words
      .map((word) => word.displayWord)
      .join('、')}`,
    learningObjectives: [
      {
        id: `${lowercase}-objective-letter`,
        skill: 'reading',
        description: `認出大寫 ${uppercase} 與小寫 ${lowercase}。`,
      },
      {
        id: `${lowercase}-objective-sound`,
        skill: 'listening',
        description: `聽辨 ${uppercase} 的主要字母音。`,
      },
      {
        id: `${lowercase}-objective-repeat`,
        skill: 'speaking',
        description: `跟著原音練習 ${uppercase} 聲與三個核心單字。`,
      },
      {
        id: `${lowercase}-objective-read`,
        skill: 'reading',
        description: `看見三個核心單字時嘗試讀出來。`,
      },
    ],
    words,
    sentences,
    activities,
    reviewVariants: words.map((word, index) => ({
      id: `${lowercase}-review-${word.word}-0${index + 1}`,
      targetContentId: word.id,
      activityType:
        index === 0
          ? 'listen-and-choose'
          : index === 1
            ? 'read-and-choose'
            : 'record-and-playback',
      skills: [index === 0 ? 'listening' : index === 1 ? 'reading' : 'speaking'],
      difficulty: word.difficulty,
      requiresAudio: index !== 1,
      requiresImage: true,
      usesNewContext: false,
      distractorIds: words.filter((candidate) => candidate.id !== word.id).map(
        (candidate) => candidate.id,
      ),
      suggestedIntervalDays: [1, 3, 7][index],
      priorityHint:
        index === 2
          ? `再聽 ${word.displayWord}，跟著念一次，不做發音評分。`
          : `重新連結 ${word.displayWord} 的字形、聲音與圖片。`,
    })),
    metadata: {
      status: 'draft',
      createdAt: '2026-07-18',
      updatedAt: '2026-07-18',
      stage: config.stage,
      estimatedMinutes: config.estimatedMinutes ?? 6,
      sourceNote: `${uppercase} 課程聚焦 ${config.phoneticHint}，核心圖片與音訊已建立。`,
      contentVersion: 1,
      tags: [`letter-${lowercase}`, 'listening', 'speaking', 'reading'],
    },
  };
}

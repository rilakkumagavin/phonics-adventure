import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { resolveAssetUrl } from '../../assets/resolveAssetUrl';
import { useAudioPlayer } from '../../audio/useAudioPlayer';
import {
  getGradeTwoBlendingLesson,
  getGradeTwoLessonPath,
  getNextGradeTwoBlendingLesson,
} from '../../curriculum/gradeTwoLessonRepository';
import {
  getGradeThreeBlendingLesson,
  getGradeThreeLessonPath,
  getNextGradeThreeBlendingLesson,
} from '../../curriculum/gradeThreeLessonRepository';
import type { BlendingLesson } from '../../curriculum/phonicsLesson';
import {
  completeGradeThreeLesson,
  isGradeThreeWordPracticeComplete,
  loadGradeThreeProgress,
  recordGradeThreeBlendPractice,
  recordGradeThreeSegmentPractice,
} from '../../progress/gradeThreeProgress';
import {
  completeGradeTwoLesson,
  isGradeTwoWordPracticeComplete,
  loadGradeTwoProgress,
  recordGradeTwoBlendPractice,
  recordGradeTwoSegmentPractice,
} from '../../progress/gradeTwoProgress';
import styles from './ShortVowelLessonPage.module.css';

interface InitialLessonState {
  wordIndex: number;
  nextSegmentIndex: number;
  blendAttempted: boolean;
  notice: string;
}

interface LessonWordProgress {
  wordId: string;
  segmentPracticeCounts: Record<string, number>;
  blendPlayCount: number;
  lastPracticedDate: string | null;
}

interface LessonProgress {
  completed: boolean;
  words: Record<string, LessonWordProgress>;
}

interface LessonRuntime {
  mapPath: string;
  mapLabel: string;
  getLesson: (slugOrId: string) => BlendingLesson | undefined;
  getNextLesson: (lesson: BlendingLesson) => BlendingLesson | undefined;
  getLessonPath: (lesson: BlendingLesson) => string;
  loadProgress: () => {
    lessons: Record<string, LessonProgress>;
  };
  isWordPracticeComplete: (
    wordProgress: LessonWordProgress | undefined,
    requiredSegmentIds: readonly string[],
  ) => boolean;
  recordSegmentPractice: (input: {
    lessonId: string;
    wordId: string;
    segmentId: string;
  }) => unknown;
  recordBlendPractice: (input: { lessonId: string; wordId: string }) => unknown;
  completeLesson: (input: { lessonId: string }) => unknown;
}

const gradeTwoRuntime: LessonRuntime = {
  mapPath: '/grade/2',
  mapLabel: '二年級',
  getLesson: getGradeTwoBlendingLesson,
  getNextLesson: getNextGradeTwoBlendingLesson,
  getLessonPath: getGradeTwoLessonPath,
  loadProgress: loadGradeTwoProgress,
  isWordPracticeComplete: isGradeTwoWordPracticeComplete,
  recordSegmentPractice: recordGradeTwoSegmentPractice,
  recordBlendPractice: recordGradeTwoBlendPractice,
  completeLesson: completeGradeTwoLesson,
};

const gradeThreeRuntime: LessonRuntime = {
  mapPath: '/grade/3',
  mapLabel: '三年級',
  getLesson: getGradeThreeBlendingLesson,
  getNextLesson: getNextGradeThreeBlendingLesson,
  getLessonPath: getGradeThreeLessonPath,
  loadProgress: loadGradeThreeProgress,
  isWordPracticeComplete: isGradeThreeWordPracticeComplete,
  recordSegmentPractice: recordGradeThreeSegmentPractice,
  recordBlendPractice: recordGradeThreeBlendPractice,
  completeLesson: completeGradeThreeLesson,
};

function getInitialLessonState(
  lesson: BlendingLesson,
  runtime: LessonRuntime,
): InitialLessonState {
  const progress = runtime.loadProgress();
  const lessonProgress = progress.lessons[lesson.id];
  const practiceUnit = lesson.practiceMode === 'syllable' ? '小段' : '聲音';
  const defaultState = {
    wordIndex: 0,
    nextSegmentIndex: 0,
    blendAttempted: false,
    notice:
      lesson.practiceMode === 'syllable'
        ? '從左邊開始，一小段、一小段慢慢聽。'
        : '從左邊開始，一個音、一個音慢慢聽。',
  };

  if (!lessonProgress || lessonProgress.completed) {
    return defaultState;
  }

  const firstIncompleteWordIndex = lesson.words.findIndex(
    (word) =>
      !runtime.isWordPracticeComplete(
        lessonProgress.words[word.id],
        word.segments.map((segment) => segment.id),
      ),
  );

  if (firstIncompleteWordIndex >= 0) {
    const word = lesson.words[firstIncompleteWordIndex];
    const wordProgress = lessonProgress.words[word.id];
    const firstUnpracticedSegmentIndex = word.segments.findIndex(
      (segment) => (wordProgress?.segmentPracticeCounts[segment.id] ?? 0) === 0,
    );
    const nextSegmentIndex =
      firstUnpracticedSegmentIndex >= 0
        ? firstUnpracticedSegmentIndex
        : word.segments.length;

    return {
      ...defaultState,
      wordIndex: firstIncompleteWordIndex,
      nextSegmentIndex,
      notice:
        nextSegmentIndex === word.segments.length
          ? `${word.word} 的${practiceUnit}都聽過了，接著把它們合起來。`
          : nextSegmentIndex === 0
            ? firstIncompleteWordIndex === 0
              ? defaultState.notice
              : lesson.practiceMode === 'syllable'
                ? `從 ${word.word} 繼續，一小段、一小段慢慢聽。`
                : `從 ${word.word} 繼續，一個音、一個音慢慢聽。`
            : `從 ${word.word} 的下一個${practiceUnit}繼續。`,
    };
  }

  const lastWord = lesson.words.at(-1);

  return {
    wordIndex: lesson.words.length - 1,
    nextSegmentIndex: lastWord?.segments.length ?? 0,
    blendAttempted: true,
    notice: `這一課的 ${lesson.words.length} 個字都練過了，按下完成。`,
  };
}

interface ShortVowelLessonContentProps {
  lesson: BlendingLesson;
  runtime: LessonRuntime;
}

function ShortVowelLessonContent({ lesson, runtime }: ShortVowelLessonContentProps) {
  const [initialState] = useState(() => getInitialLessonState(lesson, runtime));
  const [wordIndex, setWordIndex] = useState(initialState.wordIndex);
  const [nextSegmentIndex, setNextSegmentIndex] = useState(
    initialState.nextSegmentIndex,
  );
  const [blendAttempted, setBlendAttempted] = useState(initialState.blendAttempted);
  const [isComplete, setIsComplete] = useState(false);
  const [notice, setNotice] = useState(initialState.notice);
  const { playAudio, state: audioState, stopAudio } = useAudioPlayer();
  const word = lesson.words[wordIndex];
  const segmentsPerWord = word.segments.length;
  const previousSteps = lesson.words
    .slice(0, wordIndex)
    .reduce((total, previousWord) => total + previousWord.segments.length + 1, 0);
  const completedSteps = previousSteps + nextSegmentIndex + (blendAttempted ? 1 : 0);
  const totalSteps = lesson.words.reduce(
    (total, lessonWord) => total + lessonWord.segments.length + 1,
    0,
  );
  const progress = Math.round((completedSteps / totalSteps) * 100);
  const nextLesson = runtime.getNextLesson(lesson);
  const isSyllablePractice = lesson.practiceMode === 'syllable';
  const unitLabel = isSyllablePractice ? '小段' : '聲音';

  async function playSegment(segmentIndex: number) {
    const segment = word.segments[segmentIndex];

    if (segment.isSilent) {
      setNotice(segment.hint ?? '字尾 e 不發音，它會讓前面的母音念長音。');

      if (segmentIndex === nextSegmentIndex) {
        setNextSegmentIndex(Math.min(nextSegmentIndex + 1, segmentsPerWord));
      }

      runtime.recordSegmentPractice({
        lessonId: lesson.id,
        wordId: word.id,
        segmentId: segment.id,
      });
      return;
    }

    if (!segment.audio) {
      setNotice('這個聲音暫時無法播放，請稍後再試。');
      return;
    }

    const result = await playAudio(segment.audio, {
      label: `${segment.grapheme} ${segment.soundLabel}`,
    });

    if (result.status !== 'cancelled') {
      setNotice(result.message);
    }

    if (result.played && segmentIndex === nextSegmentIndex) {
      const newNextIndex = Math.min(nextSegmentIndex + 1, segmentsPerWord);
      setNextSegmentIndex(newNextIndex);

      if (newNextIndex === segmentsPerWord) {
        setNotice(`${segmentsPerWord} 個${unitLabel}都聽到了，現在把它們合起來。`);
      }
    }

    if (result.played) {
      runtime.recordSegmentPractice({
        lessonId: lesson.id,
        wordId: word.id,
        segmentId: segment.id,
      });
    }
  }

  async function playBlendedWord() {
    const result = await playAudio(word.audio, {
      label: word.word,
    });

    if (result.status !== 'cancelled') {
      setNotice(result.message);
    }

    if (result.played) {
      setBlendAttempted(true);
      runtime.recordBlendPractice({
        lessonId: lesson.id,
        wordId: word.id,
      });
    }
  }

  function goToNextWord() {
    stopAudio();

    if (wordIndex < lesson.words.length - 1) {
      setWordIndex((current) => current + 1);
      setNextSegmentIndex(0);
      setBlendAttempted(false);
      setNotice(
        isSyllablePractice
          ? '從左邊開始，一小段、一小段慢慢聽。'
          : '從左邊開始，一個音、一個音慢慢聽。',
      );
      return;
    }

    runtime.completeLesson({ lessonId: lesson.id });
    setIsComplete(true);
  }

  if (isComplete) {
    return (
      <div className={styles.complete}>
        <p className={styles.eyebrow}>第 {lesson.order} 課完成</p>
        <h2>{isSyllablePractice ? '你把小段合成長字了！' : '你把聲音合成單字了！'}</h2>
        <p className={styles.completedWords}>
          {lesson.words.map((lessonWord) => lessonWord.word).join(' · ')}
        </p>
        <Link
          className={styles.primaryAction}
          to={nextLesson ? runtime.getLessonPath(nextLesson) : runtime.mapPath}
        >
          {nextLesson ? `下一課：${nextLesson.title}` : `回到${runtime.mapLabel}地圖`}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            {lesson.unitLabel} · 第 {lesson.order} 課
          </p>
          <h2>{lesson.title}</h2>
          <p>{lesson.subtitle}</p>
        </div>
        <Link className={styles.secondaryAction} to={runtime.mapPath}>
          回到{runtime.mapLabel}地圖
        </Link>
      </header>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label={`${lesson.title}課程進度`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <section className={styles.lessonOverview} aria-label="課程概覽">
        <div>
          <span>練習重點</span>
          <strong>{lesson.vowelGrapheme}</strong>
          <small>{lesson.vowelSoundLabel}</small>
        </div>
        <div>
          <span>練習方式</span>
          <strong>{isSyllablePractice ? '音節拆讀' : '音素拼讀'}</strong>
          <small>{lesson.words.length} 個單字</small>
        </div>
        <div>
          <span>預估時間</span>
          <strong>{lesson.estimatedMinutes} 分鐘</strong>
          <small>{nextLesson ? `下一課 ${nextLesson.title}` : '單元最後一課'}</small>
        </div>
      </section>

      <ol className={styles.wordPath} aria-label="單字練習路徑">
        {lesson.words.map((lessonWord, index) => (
          <li
            className={
              index < wordIndex
                ? styles.wordPathCompleted
                : index === wordIndex
                  ? styles.wordPathCurrent
                  : undefined
            }
            key={lessonWord.id}
          >
            <strong>{index + 1}. {lessonWord.word}</strong>
          </li>
        ))}
      </ol>

      <main className={styles.lesson}>
        <div className={styles.wordMeta}>
          <span>
            第 {wordIndex + 1} 個字，共 {lesson.words.length} 個
          </span>
          <strong>{word.meaningZhTW}</strong>
        </div>

        <div className={styles.wordStage}>
          <img src={resolveAssetUrl(word.image.src)} alt={word.image.alt} />
          <div className={styles.practice}>
            <div
              className={styles.segmentRow}
              data-segment-count={segmentsPerWord}
              aria-label={`${word.word} ${isSyllablePractice ? '分段拆讀' : '逐音拼讀'}`}
            >
              {word.segments.map((segment, segmentIndex) => {
                const isLocked = segmentIndex > nextSegmentIndex;
                const isCompleted = segmentIndex < nextSegmentIndex;

                return (
                  <button
                    type="button"
                    className={`${styles.segmentButton} ${
                      isCompleted ? styles.segmentCompleted : ''
                    }`}
                    key={segment.id}
                    disabled={isLocked || audioState.status === 'loading'}
                    aria-label={
                      segment.isSilent
                        ? `查看 ${segment.grapheme} 的提示`
                        : `播放 ${segment.grapheme} 的${isSyllablePractice ? '小段' : '聲音'}`
                    }
                    onClick={() => void playSegment(segmentIndex)}
                  >
                    <span>{segment.grapheme}</span>
                    <small>{segment.isSilent ? '不發音' : segment.soundLabel}</small>
                  </button>
                );
              })}
            </div>

            <div className={styles.blendLine} aria-hidden="true">
              <span />
              <strong>{word.word}</strong>
              <span />
            </div>

            <p className={styles.notice} role="status">
              {notice}
            </p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.blendButton}
                disabled={
                  nextSegmentIndex < segmentsPerWord || audioState.status === 'loading'
                }
                onClick={() => void playBlendedWord()}
              >
                合起來聽：{word.word}
              </button>
              {blendAttempted ? (
                <button
                  type="button"
                  className={styles.primaryAction}
                  onClick={goToNextWord}
                >
                  {wordIndex === lesson.words.length - 1
                    ? `完成第 ${lesson.order} 課`
                    : '下一個字'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface ShortVowelLessonPageProps {
  grade?: 2 | 3;
}

export function ShortVowelLessonPage({ grade = 2 }: ShortVowelLessonPageProps) {
  const runtime = grade === 3 ? gradeThreeRuntime : gradeTwoRuntime;
  const { lessonSlug = grade === 3 ? 'ai-ay' : 'short-a' } = useParams();
  const lesson = runtime.getLesson(lessonSlug);

  if (!lesson) {
    return (
      <div className={styles.complete}>
        <p className={styles.eyebrow}>找不到這一課</p>
        <h2>這個拼讀課程還沒有準備好。</h2>
        <Link className={styles.primaryAction} to={runtime.mapPath}>
          回到{runtime.mapLabel}地圖
        </Link>
      </div>
    );
  }

  return <ShortVowelLessonContent key={lesson.id} lesson={lesson} runtime={runtime} />;
}

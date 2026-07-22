import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { resolveAssetUrl } from '../../assets/resolveAssetUrl';
import { useAudioPlayer } from '../../audio/useAudioPlayer';
import { useVoiceRecorder } from '../../audio/useVoiceRecorder';
import type { DecodableSentenceLesson } from '../../curriculum/decodableSentence';
import {
  getGradeTwoSentenceLesson,
  getGradeTwoSentenceLessonPath,
  getNextGradeTwoSentenceLesson,
} from '../../curriculum/gradeTwoSentenceRepository';
import {
  getGradeThreeReadingLesson,
  getGradeThreeReadingLessonPath,
  getNextGradeThreeReadingLesson,
} from '../../curriculum/grade3ReadingFluency';
import {
  completeGradeTwoLesson,
  loadGradeTwoProgress,
  recordGradeTwoBlendPractice,
  recordGradeTwoSegmentPractice,
} from '../../progress/gradeTwoProgress';
import {
  completeGradeThreeLesson,
  loadGradeThreeProgress,
  recordGradeThreeBlendPractice,
  recordGradeThreeSegmentPractice,
} from '../../progress/gradeThreeProgress';
import styles from './DecodableSentencePage.module.css';

type SupportedGrade = 2 | 3;

interface InitialSentenceState {
  nextTokenIndex: number;
  sentencePlayed: boolean;
  notice: string;
}

function getInitialSentenceState(
  lesson: DecodableSentenceLesson,
  grade: SupportedGrade,
): InitialSentenceState {
  const progress =
    grade === 3 ? loadGradeThreeProgress() : loadGradeTwoProgress();
  const lessonProgress = progress.lessons[lesson.id];
  const wordProgress = lessonProgress?.words[lesson.practiceWordId];

  if (lessonProgress?.completed) {
    return {
      nextTokenIndex: 0,
      sentencePlayed: false,
      notice: '從左邊開始，點一個字、聽一個字。',
    };
  }
  const firstUnpracticedToken = lesson.tokens.findIndex(
    (token) => (wordProgress?.segmentPracticeCounts[token.id] ?? 0) === 0,
  );

  if (firstUnpracticedToken >= 0) {
    return {
      nextTokenIndex: firstUnpracticedToken,
      sentencePlayed: false,
      notice:
        firstUnpracticedToken === 0
          ? '從左邊開始，點一個字、聽一個字。'
          : '從亮起來的字繼續讀。',
    };
  }

  return {
    nextTokenIndex: lesson.tokens.length,
    sentencePlayed: (wordProgress?.blendPlayCount ?? 0) > 0,
    notice:
      (wordProgress?.blendPlayCount ?? 0) > 0
        ? '整句已經聽過了，也可以錄下自己的聲音。'
        : '每個字都聽過了，現在把整句連起來。',
  };
}

function recorderLabel(status: ReturnType<typeof useVoiceRecorder>['state']['status']) {
  if (status === 'requesting') {
    return '正在開啟麥克風';
  }

  if (status === 'recording') {
    return '停止錄音';
  }

  return '錄下我讀的句子';
}

interface SentenceLessonContentProps {
  lesson: DecodableSentenceLesson;
  grade: SupportedGrade;
}

function SentenceLessonContent({ lesson, grade }: SentenceLessonContentProps) {
  const [initialState] = useState(() => getInitialSentenceState(lesson, grade));
  const [nextTokenIndex, setNextTokenIndex] = useState(
    initialState.nextTokenIndex,
  );
  const [sentencePlayed, setSentencePlayed] = useState(
    initialState.sentencePlayed,
  );
  const [isComplete, setIsComplete] = useState(false);
  const [notice, setNotice] = useState(initialState.notice);
  const { playAudio, state: audioState, stopAudio } = useAudioPlayer();
  const recorder = useVoiceRecorder();
  const nextLesson =
    grade === 3
      ? getNextGradeThreeReadingLesson(lesson)
      : getNextGradeTwoSentenceLesson(lesson);
  const mapPath = `/grade/${grade}`;
  const allTokensPracticed = nextTokenIndex >= lesson.tokens.length;
  const completedSteps = nextTokenIndex + (sentencePlayed ? 1 : 0);
  const totalSteps = lesson.tokens.length + 1;
  const progress = Math.round((completedSteps / totalSteps) * 100);

  async function playToken(tokenIndex: number) {
    const token = lesson.tokens[tokenIndex];
    const result = await playAudio(token.audio, { label: token.text });

    if (result.status !== 'cancelled') {
      setNotice(result.message);
    }

    if (result.played) {
      const recordSegment =
        grade === 3
          ? recordGradeThreeSegmentPractice
          : recordGradeTwoSegmentPractice;

      recordSegment({
        lessonId: lesson.id,
        wordId: lesson.practiceWordId,
        segmentId: token.id,
      });

      if (tokenIndex === nextTokenIndex) {
        const nextIndex = Math.min(tokenIndex + 1, lesson.tokens.length);
        setNextTokenIndex(nextIndex);

        if (nextIndex === lesson.tokens.length) {
          setNotice('每個字都聽過了，現在把整句連起來。');
        }
      }
    }
  }

  async function playSentence() {
    const result = await playAudio(lesson.audio, {
      label: lesson.sentence,
    });

    if (result.status !== 'cancelled') {
      setNotice(result.message);
    }

    if (result.played) {
      setSentencePlayed(true);
      const recordBlend =
        grade === 3
          ? recordGradeThreeBlendPractice
          : recordGradeTwoBlendPractice;

      recordBlend({
        lessonId: lesson.id,
        wordId: lesson.practiceWordId,
      });
    }
  }

  function toggleRecording() {
    stopAudio();

    if (recorder.state.status === 'recording') {
      recorder.stopRecording();
      return;
    }

    void recorder.startRecording();
  }

  function finishLesson() {
    const completeLesson =
      grade === 3 ? completeGradeThreeLesson : completeGradeTwoLesson;

    completeLesson({ lessonId: lesson.id });
    setIsComplete(true);
  }

  if (isComplete) {
    return (
      <div className={styles.complete}>
        <p className={styles.eyebrow}>第 {lesson.order} 課完成</p>
        <h2>你讀完一整句了！</h2>
        <p className={styles.completedSentence}>{lesson.sentence}</p>
        <Link
          className={styles.primaryAction}
          to={
            nextLesson
              ? grade === 3
                ? getGradeThreeReadingLessonPath(nextLesson)
                : getGradeTwoSentenceLessonPath(nextLesson)
              : mapPath
          }
        >
          {nextLesson
            ? `下一課：${nextLesson.title}`
            : `完成${grade === 3 ? '三' : '二'}年級，回到地圖`}
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
        <Link className={styles.secondaryAction} to={mapPath}>
          回到{grade === 3 ? '三' : '二'}年級地圖
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

      <section className={styles.readingOverview} aria-label="閱讀概覽">
        <div>
          <span>閱讀目標</span>
          <strong>{lesson.title}</strong>
          <small>{lesson.tokens.length} 個詞</small>
        </div>
        <div>
          <span>練習句子</span>
          <strong>{lesson.sentence}</strong>
          <small>{lesson.meaningZhTW}</small>
        </div>
        <div>
          <span>預估時間</span>
          <strong>{lesson.estimatedMinutes} 分鐘</strong>
          <small>{nextLesson ? `下一篇 ${nextLesson.title}` : '單元最後一篇'}</small>
        </div>
      </section>

      <ol className={styles.tokenPath} aria-label="逐詞閱讀路徑">
        {lesson.tokens.map((token, tokenIndex) => (
          <li
            className={
              tokenIndex < nextTokenIndex
                ? styles.tokenPathCompleted
                : tokenIndex === nextTokenIndex
                  ? styles.tokenPathCurrent
                  : undefined
            }
            key={token.id}
          >
            <strong>{tokenIndex + 1}. {token.text}</strong>
          </li>
        ))}
      </ol>

      <section className={styles.lesson}>
        <img
          className={styles.scene}
          src={resolveAssetUrl(lesson.image.src)}
          alt={lesson.image.alt}
        />
        <section className={styles.reading}>
          <p className={styles.meaning}>{lesson.meaningZhTW}</p>
          <div className={styles.tokens} aria-label={`${lesson.sentence} 逐字閱讀`}>
            {lesson.tokens.map((token, tokenIndex) => {
              const isLocked = tokenIndex > nextTokenIndex;
              const isCompleted = tokenIndex < nextTokenIndex;

              return (
                <button
                  type="button"
                  className={`${styles.tokenButton} ${
                    isCompleted ? styles.tokenCompleted : ''
                  }`}
                  key={token.id}
                  disabled={isLocked || audioState.status === 'loading'}
                  aria-label={`播放 ${token.text}`}
                  onClick={() => void playToken(tokenIndex)}
                >
                  {token.text}
                </button>
              );
            })}
          </div>

          <p className={styles.notice} role="status">
            {recorder.state.errorMessage ?? notice}
          </p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.sentenceButton}
              disabled={!allTokensPracticed || audioState.status === 'loading'}
              onClick={() => void playSentence()}
            >
              聽整句
            </button>
            {sentencePlayed ? (
              <button
                type="button"
                className={styles.recordButton}
                disabled={recorder.state.status === 'requesting'}
                onClick={toggleRecording}
              >
                {recorderLabel(recorder.state.status)}
              </button>
            ) : null}
            {recorder.state.audioUrl ? (
              <>
                <button
                  type="button"
                  className={styles.secondaryAction}
                  onClick={() => void recorder.playRecording()}
                >
                  聽聽我的聲音
                </button>
                <button
                  type="button"
                  className={styles.secondaryAction}
                  onClick={recorder.resetRecording}
                >
                  重新錄音
                </button>
              </>
            ) : null}
            {sentencePlayed ? (
              <button
                type="button"
                className={styles.primaryAction}
                onClick={finishLesson}
              >
                完成第 {lesson.order} 課
              </button>
            ) : null}
          </div>
        </section>
      </section>
    </div>
  );
}

interface DecodableSentencePageProps {
  grade?: SupportedGrade;
}

export function DecodableSentencePage({
  grade = 2,
}: DecodableSentencePageProps) {
  const { lessonSlug = 'cat-on-mat' } = useParams();
  const lesson =
    grade === 3
      ? getGradeThreeReadingLesson(lessonSlug)
      : getGradeTwoSentenceLesson(lessonSlug);
  const mapPath = `/grade/${grade}`;

  if (!lesson) {
    return (
      <div className={styles.complete}>
        <p className={styles.eyebrow}>找不到這一課</p>
        <h2>這個短句課程還沒有準備好。</h2>
        <Link className={styles.primaryAction} to={mapPath}>
          回到{grade === 3 ? '三' : '二'}年級地圖
        </Link>
      </div>
    );
  }

  return <SentenceLessonContent key={lesson.id} lesson={lesson} grade={grade} />;
}

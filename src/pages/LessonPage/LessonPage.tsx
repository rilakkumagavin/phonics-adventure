import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAudioPlayer } from '../../audio/useAudioPlayer';
import { useVoiceRecorder } from '../../audio/useVoiceRecorder';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { getCourseByLetter } from '../../courses/courseRepository';
import { validateCourse } from '../../courses/validateCourse';
import { recordLearningActivity } from '../../progress/learningProgress';
import type { LearningSkill } from '../../types/activity';
import type { LetterCourse } from '../../types/course';
import styles from './LessonPage.module.css';

type LessonStep = 0 | 1 | 2;

const stepLabels = ['聽一聽', '跟著念', '看字讀'] as const;

function LessonUnavailable() {
  return (
    <div>
      <PageHeader
        title="找不到這個字母課程"
        description="這個字母課程目前還沒有準備好，請先回到學習地圖。"
      >
        <Link className={styles.secondaryAction} to="/map">
          返回學習地圖
        </Link>
      </PageHeader>
    </div>
  );
}

function saveLessonProgress(course: LetterCourse) {
  const skills: Array<Extract<LearningSkill, 'listening' | 'speaking' | 'reading'>> = [
    'listening',
    'speaking',
    'reading',
  ];
  const completedAt = new Date();

  skills.forEach((skill) => {
    const activity = course.activities.find((candidate) =>
      candidate.skills.includes(skill),
    );

    if (activity) {
      recordLearningActivity({
        activityId: activity.id,
        letterId: course.letter.lowercase,
        skill,
        completedAt,
      });
    }
  });
}

function FocusedLetterLesson({ course }: { course: LetterCourse }) {
  const coreWords = course.words.filter((word) => word.isCore).slice(0, 3);
  const [wordIndex, setWordIndex] = useState(0);
  const [step, setStep] = useState<LessonStep>(0);
  const [audioAttempted, setAudioAttempted] = useState(false);
  const [notice, setNotice] = useState('點一下聲音按鈕，聽聽這個字。');
  const [isComplete, setIsComplete] = useState(false);
  const { playAudio, state: audioState, stopAudio } = useAudioPlayer();
  const recorder = useVoiceRecorder();
  const word = coreWords[wordIndex];
  const completedUnits = wordIndex * stepLabels.length + step;
  const totalUnits = coreWords.length * stepLabels.length;
  const progress = Math.round((completedUnits / totalUnits) * 100);
  const isRecording = recorder.state.status === 'recording';
  const recorderIsBusy = isRecording || recorder.state.status === 'requesting';

  async function handleWordAudio(playbackRate = 1) {
    const result = await playAudio(word.audio, {
      label: word.displayWord,
      playbackRate,
    });

    if (result.status !== 'cancelled') {
      setAudioAttempted(true);
      setNotice(result.message);
    }
  }

  function moveToStep(nextStep: LessonStep) {
    stopAudio();
    setStep(nextStep);

    if (nextStep === 1) {
      setNotice('先聽正確發音，再跟著念一次。錄音只用來聽自己的聲音。');
    } else {
      setNotice('先自己讀讀看。需要幫忙時，再按一次聲音。');
    }
  }

  function moveToNextWord() {
    stopAudio();
    recorder.resetRecording();

    if (wordIndex < coreWords.length - 1) {
      setWordIndex((current) => current + 1);
      setStep(0);
      setAudioAttempted(false);
      setNotice('點一下聲音按鈕，聽聽這個字。');
      return;
    }

    saveLessonProgress(course);
    setIsComplete(true);
  }

  async function handleStartRecording() {
    await recorder.startRecording();
  }

  if (isComplete) {
    return (
      <div className={styles.complete}>
        <p className={styles.eyebrow}>今天的任務完成了</p>
        <div className={styles.completeLetter} aria-hidden="true">
          {course.letter.uppercase}
        </div>
        <h2>你聽過、念過，也讀過三個字了！</h2>
        <p>
          {coreWords.map((item) => item.displayWord).join('、')}
        </p>
        <Link className={styles.primaryAction} to="/map">
          選下一個字母
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.lessonHeader}>
        <Link className={styles.backLink} to="/map">
          返回字母地圖
        </Link>
        <div className={styles.lessonTitle}>
          <span className={styles.letterMark}>
            {course.letter.uppercase}
            <small>{course.letter.lowercase}</small>
          </span>
          <div>
            <p className={styles.eyebrow}>一次一個字，慢慢來</p>
            <h2>{course.title}</h2>
          </div>
        </div>
      </header>

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-label={`${course.letter.uppercase} 課程進度`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <span style={{ width: `${progress}%` }} />
      </div>

      <ol className={styles.steps} aria-label="聽說讀步驟">
        {stepLabels.map((label, index) => (
          <li
            key={label}
            className={index === step ? styles.currentStep : undefined}
            aria-current={index === step ? 'step' : undefined}
          >
            <span>{index + 1}</span>
            {label}
          </li>
        ))}
      </ol>

      <main className={styles.practice} aria-live="polite">
        <div className={styles.wordCount}>
          第 {wordIndex + 1} 個字，共 {coreWords.length} 個
        </div>

        <div className={styles.wordStage}>
          <div className={styles.imageFrame}>
            <img src={word.image.src} alt={word.image.alt} />
          </div>
          <div className={styles.wordText}>
            <p className={styles.englishWord}>{word.displayWord}</p>
            <p className={styles.meaning}>{word.meaningZhTW}</p>
            <p className={styles.soundFocus}>
              聽聽這個字裡的 <strong>{course.letter.uppercase}</strong> 聲音
            </p>
          </div>
        </div>

        <p className={styles.notice} role="status">
          {recorder.state.errorMessage ?? notice}
        </p>

        {step === 0 ? (
          <div className={styles.stepActions}>
            <button
              type="button"
              className={styles.listenButton}
              disabled={audioState.status === 'loading'}
              onClick={() => void handleWordAudio()}
            >
              {audioState.status === 'playing'
                ? '正在播放'
                : `聽發音：${word.displayWord}`}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={audioState.status === 'loading'}
              onClick={() => void handleWordAudio(0.75)}
            >
              慢速發音
            </button>
            {audioAttempted ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => moveToStep(1)}
              >
                我聽到了
              </button>
            ) : null}
          </div>
        ) : null}

        {step === 1 ? (
          <div className={styles.stepActions}>
            <button
              type="button"
              className={styles.listenButton}
              disabled={audioState.status === 'loading'}
              onClick={() => void handleWordAudio()}
            >
              {audioState.status === 'playing' ? '正在播放' : '再聽正確發音'}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={audioState.status === 'loading'}
              onClick={() => void handleWordAudio(0.75)}
            >
              慢速發音
            </button>
            {!isRecording ? (
              <button
                type="button"
                className={styles.recordButton}
                disabled={recorderIsBusy}
                onClick={() => void handleStartRecording()}
              >
                {recorder.state.status === 'requesting'
                  ? '正在開啟麥克風'
                  : '錄下我的聲音'}
              </button>
            ) : (
              <button
                type="button"
                className={styles.stopButton}
                onClick={recorder.stopRecording}
              >
                停止錄音
              </button>
            )}
            {recorder.state.audioUrl ? (
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={recorder.state.status === 'playing'}
                onClick={() => void recorder.playRecording()}
              >
                聽我的聲音
              </button>
            ) : null}
            <button
              type="button"
              className={styles.nextButton}
              disabled={isRecording}
              onClick={() => moveToStep(2)}
            >
              我念好了
            </button>
            <p className={styles.privacyNote}>
              不做語音辨識或發音評分；錄音不會上傳。
            </p>
          </div>
        ) : null}

        {step === 2 ? (
          <div className={styles.stepActions}>
            <button
              type="button"
              className={styles.secondaryButton}
              disabled={audioState.status === 'loading'}
              onClick={() => void handleWordAudio()}
            >
              需要幫忙，聽正確發音
            </button>
            <button
              type="button"
              className={styles.nextButton}
              onClick={moveToNextWord}
            >
              {wordIndex === coreWords.length - 1 ? '完成這一課' : '我讀好了，下一個字'}
            </button>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export function LessonPage() {
  const { letterId } = useParams();
  const normalizedLetterId = letterId?.toLowerCase();
  const course = normalizedLetterId ? getCourseByLetter(normalizedLetterId) : undefined;

  if (!course) {
    return <LessonUnavailable />;
  }

  const validation = validateCourse(course);

  if (!validation.valid) {
    if (import.meta.env.DEV) {
      console.warn(
        `${course.letter.uppercase} course is not ready for display.`,
        validation.errors,
      );
    }

    return <LessonUnavailable />;
  }

  return <FocusedLetterLesson key={course.id} course={course} />;
}

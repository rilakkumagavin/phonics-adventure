import { Link } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { gradeTwoCurriculum } from '../../curriculum/grade2';
import {
  getGradeTwoBlendingLesson,
  getGradeTwoLessonPath,
} from '../../curriculum/gradeTwoLessonRepository';
import {
  getGradeTwoSentenceLesson,
  getGradeTwoSentenceLessonPath,
} from '../../curriculum/gradeTwoSentenceRepository';
import {
  loadGradeTwoProgress,
} from '../../progress/gradeTwoProgress';
import styles from './GradeTwoMapPage.module.css';

type AvailableLessonState = 'not-started' | 'practicing' | 'completed';

function getAvailableLessonState(
  lessonIds: readonly string[],
  progress: ReturnType<typeof loadGradeTwoProgress>,
): AvailableLessonState {
  const lessonProgress = lessonIds
    .map((lessonId) => progress.lessons[lessonId])
    .filter((lesson) => lesson !== undefined);

  if (lessonProgress.length === 0) {
    return 'not-started';
  }

  return lessonIds.length > 0 &&
    lessonIds.every((lessonId) => progress.lessons[lessonId]?.completed)
    ? 'completed'
    : 'practicing';
}

function getStateLabel(state: AvailableLessonState) {
  if (state === 'completed') {
    return '已完成';
  }

  if (state === 'practicing') {
    return '練習中';
  }

  return '尚未開始';
}

function getActionLabel(state: AvailableLessonState) {
  if (state === 'completed') {
    return '再練一次';
  }

  if (state === 'practicing') {
    return '繼續練習';
  }

  return '開始第一課';
}

export function GradeTwoMapPage() {
  const progress = loadGradeTwoProgress();
  const isUnitCompleted = (unitId: string) => {
    const unit = gradeTwoCurriculum.units.find(
      (candidate) => candidate.id === unitId,
    );

    return Boolean(
      unit &&
        unit.lessonIds.length > 0 &&
        unit.lessonIds.every(
          (lessonId) => progress.lessons[lessonId]?.completed,
        ),
    );
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title={gradeTwoCurriculum.title}
        description={gradeTwoCurriculum.description}
      >
        <Link className={styles.secondaryAction} to="/map">
          回到字母課程
        </Link>
      </PageHeader>

      <section className={styles.sequence} aria-label="二年級學習單元">
        {gradeTwoCurriculum.units.map((unit) => {
          const lessonState = getAvailableLessonState(unit.lessonIds, progress);
          const isUnlocked = unit.prerequisiteUnitIds.every(isUnitCompleted);
          const latestPracticeDate = unit.lessonIds
            .map((lessonId) => progress.lessons[lessonId]?.lastPracticedDate)
            .filter((date): date is string => Boolean(date))
            .sort()
            .at(-1);
          const completedLessonCount = unit.lessonIds.filter(
            (lessonId) => progress.lessons[lessonId]?.completed,
          ).length;
          const nextLessonId =
            unit.lessonIds.find(
              (lessonId) => !progress.lessons[lessonId]?.completed,
            ) ?? unit.lessonIds[0];
          const nextLesson = nextLessonId
            ? getGradeTwoBlendingLesson(nextLessonId)
            : undefined;
          const nextSentenceLesson = nextLessonId
            ? getGradeTwoSentenceLesson(nextLessonId)
            : undefined;
          const actionPath = nextLesson
            ? getGradeTwoLessonPath(nextLesson)
            : nextSentenceLesson
              ? getGradeTwoSentenceLessonPath(nextSentenceLesson)
              : unit.entryPath;
          const unitClassName = `${styles.unit} ${
            lessonState === 'completed'
              ? styles.unitCompleted
              : lessonState === 'practicing'
                ? styles.unitPracticing
                : ''
          }`;

          return (
          <article className={unitClassName} key={unit.id}>
            <div className={styles.unitNumber} aria-hidden="true">
              {unit.order}
            </div>
            <div className={styles.unitContent}>
              <div className={styles.unitHeading}>
                <div>
                  <p className={styles.eyebrow}>第 {unit.order} 單元</p>
                  <h3>{unit.title}</h3>
                </div>
                <span
                  className={`${styles.status} ${
                    !isUnlocked
                      ? styles.statusLocked
                      : styles[`status-${lessonState}`]
                  }`}
                >
                  {!isUnlocked
                    ? '完成上一單元後開啟'
                    : getStateLabel(lessonState)}
                </span>
              </div>
              <p className={styles.subtitle}>{unit.subtitle}</p>
              <ul className={styles.goals} aria-label={`${unit.title}學習目標`}>
                {unit.learningGoals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
              <p className={styles.lessonCount}>
                已完成 {completedLessonCount} / {unit.lessonIds.length} 課
              </p>
              <p className={styles.lastPractice}>
                最近練習：
                {latestPracticeDate ?? '尚無紀錄'}
              </p>
              {actionPath && isUnlocked ? (
                <Link className={styles.primaryAction} to={actionPath}>
                  {getActionLabel(lessonState)}
                </Link>
              ) : null}
            </div>
          </article>
          );
        })}
      </section>
    </div>
  );
}

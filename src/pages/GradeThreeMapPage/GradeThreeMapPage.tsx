import { Link } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { gradeThreeCurriculum } from '../../curriculum/grade3';
import {
  getGradeThreeBlendingLesson,
  getGradeThreeLessonPath,
} from '../../curriculum/gradeThreeLessonRepository';
import {
  getGradeThreeReadingLesson,
  getGradeThreeReadingLessonPath,
} from '../../curriculum/grade3ReadingFluency';
import { loadGradeThreeProgress } from '../../progress/gradeThreeProgress';
import styles from './GradeThreeMapPage.module.css';

function getLessonTitle(lessonId: string) {
  return (
    getGradeThreeBlendingLesson(lessonId)?.title ??
    getGradeThreeReadingLesson(lessonId)?.title ??
    lessonId
  );
}

export function GradeThreeMapPage() {
  const progress = loadGradeThreeProgress();

  return (
    <div className={styles.page}>
      <PageHeader
        title={gradeThreeCurriculum.title}
        description={gradeThreeCurriculum.description}
      >
        <Link className={styles.secondaryAction} to="/grade/2">
          回到二年級
        </Link>
      </PageHeader>

      <section className={styles.sequence} aria-label="三年級自然發音學習順序">
        {gradeThreeCurriculum.units.map((unit) => {
          const prerequisitesComplete = unit.prerequisiteUnitIds.every(
            (prerequisiteId) => {
              const prerequisiteUnit = gradeThreeCurriculum.units.find(
                (candidate) => candidate.id === prerequisiteId,
              );

              return (
                prerequisiteUnit !== undefined &&
                prerequisiteUnit.lessonIds.length > 0 &&
                prerequisiteUnit.lessonIds.every(
                  (lessonId) => progress.lessons[lessonId]?.completed,
                )
              );
            },
          );
          const isLocked = !prerequisitesComplete;
          const lessonProgress = unit.lessonIds
            .map((lessonId) => progress.lessons[lessonId])
            .filter((lesson) => lesson !== undefined);
          const isCompleted =
            unit.lessonIds.length > 0 &&
            unit.lessonIds.every((lessonId) => progress.lessons[lessonId]?.completed);
          const isPracticing = lessonProgress.length > 0 && !isCompleted;
          const nextLessonId =
            unit.lessonIds.find((lessonId) => !progress.lessons[lessonId]?.completed) ??
            unit.lessonIds[0];
          const nextLesson = nextLessonId
            ? getGradeThreeBlendingLesson(nextLessonId)
            : undefined;
          const nextReadingLesson = nextLessonId
            ? getGradeThreeReadingLesson(nextLessonId)
            : undefined;
          const actionPath = isLocked
            ? undefined
            : nextLesson
              ? getGradeThreeLessonPath(nextLesson)
              : nextReadingLesson
                ? getGradeThreeReadingLessonPath(nextReadingLesson)
              : 'entryPath' in unit
                ? unit.entryPath
                : undefined;
          const completedLessonCount = unit.lessonIds.filter(
            (lessonId) => progress.lessons[lessonId]?.completed,
          ).length;
          const completionPercent =
            unit.lessonIds.length > 0
              ? Math.round((completedLessonCount / unit.lessonIds.length) * 100)
              : 0;
          const unitClassName = `${styles.unit} ${
            isLocked
              ? styles.unitLocked
              : isCompleted
                ? styles.unitCompleted
                : isPracticing
                  ? styles.unitPracticing
                  : styles.unitReady
          }`;
          const latestPracticeDate = lessonProgress
            .map((lesson) => lesson.lastPracticedDate)
            .filter((date): date is string => Boolean(date))
            .sort()
            .at(-1);

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
                      isLocked
                        ? styles.statusLocked
                        : isCompleted
                          ? styles.statusCompleted
                          : isPracticing
                            ? styles.statusPracticing
                            : styles.statusReady
                    }`}
                  >
                    {isLocked
                      ? '先完成上一單元'
                      : isCompleted
                        ? '已完成'
                        : isPracticing
                          ? '練習中'
                          : '可以開始'}
                  </span>
                </div>
                <p className={styles.subtitle}>{unit.subtitle}</p>
                <ul className={styles.goals} aria-label={`${unit.title}學習目標`}>
                  {unit.learningGoals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
                <div
                  className={styles.unitProgress}
                  role="progressbar"
                  aria-label={`${unit.title} progress`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={completionPercent}
                >
                  <span style={{ width: `${completionPercent}%` }} />
                </div>
                <div className={styles.lessonNodes} aria-hidden="true">
                  {unit.lessonIds.map((lessonId) => {
                    const lessonCompleted = progress.lessons[lessonId]?.completed;
                    const isNextLesson = !isLocked && lessonId === nextLessonId;

                    return (
                      <span
                        className={`${styles.lessonNode} ${
                          lessonCompleted
                            ? styles.lessonNodeCompleted
                            : isNextLesson
                              ? styles.lessonNodeCurrent
                              : ''
                        }`}
                        key={lessonId}
                        title={getLessonTitle(lessonId)}
                      />
                    );
                  })}
                </div>
                <p className={styles.lessonCount}>
                  已完成 {completedLessonCount} / {unit.lessonIds.length} 課
                </p>
                <p className={styles.lastPractice}>
                  最近練習：{latestPracticeDate ?? '還沒有紀錄'}
                </p>
                {nextLessonId && !isLocked ? (
                  <p className={styles.nextLesson}>
                    <span>{isCompleted ? '複習' : '下一課'}</span>
                    {getLessonTitle(nextLessonId)}
                  </p>
                ) : null}
                {actionPath ? (
                  <Link className={styles.primaryAction} to={actionPath}>
                    {isCompleted
                      ? '再練一次'
                      : isPracticing
                        ? '繼續練習'
                        : '開始第一課'}
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

import { useMemo } from 'react';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { gradeThreeCurriculum } from '../../curriculum/grade3';
import { loadGradeThreeProgress } from '../../progress/gradeThreeProgress';
import {
  formatProgressDate,
  getLearningProgressSummary,
  loadLearningProgress,
} from '../../progress/learningProgress';
import styles from './ProgressPage.module.css';

export function ProgressPage() {
  const summary = useMemo(() => getLearningProgressSummary(loadLearningProgress()), []);
  const gradeThreeProgress = useMemo(() => loadGradeThreeProgress(), []);
  const gradeThreeUnits = gradeThreeCurriculum.units.map((unit) => {
    const completedLessons = unit.lessonIds.filter(
      (lessonId) => gradeThreeProgress.lessons[lessonId]?.completed,
    ).length;
    const completionPercent =
      unit.lessonIds.length > 0
        ? Math.round((completedLessons / unit.lessonIds.length) * 100)
        : 0;
    const latestPracticeDate =
      unit.lessonIds
        .map((lessonId) => gradeThreeProgress.lessons[lessonId]?.lastPracticedDate)
        .filter((date): date is string => Boolean(date))
        .sort()
        .at(-1) ?? null;

    return {
      completedLessons,
      completionPercent,
      latestPracticeDate,
      unit,
    };
  });

  return (
    <div className={styles.page}>
      <PageHeader title="我的進度" description="以下進度只儲存在目前這台裝置。" />

      <section className={styles.summary} aria-label="進度摘要">
        <p>
          已完成字母：{summary.completedLetters}／{summary.totalLetters}
        </p>
        <p>答對次數：{summary.correctCount}</p>
        <p>答錯次數：{summary.wrongCount}</p>
        <p>最近複習日期：{formatProgressDate(summary.lastReviewDate)}</p>
        <p>下次複習日期：{formatProgressDate(summary.nextReviewDate)}</p>
      </section>

      <section className={styles.progressList} aria-label="能力進度">
        <ProgressBar label="聽力熟練度" value={summary.listening} />
        <ProgressBar label="口說熟練度" value={summary.speaking} />
        <ProgressBar label="閱讀熟練度" value={summary.reading} />
      </section>
      <section className={styles.gradeThree} aria-label="三年級單元進度">
        <div className={styles.sectionHeading}>
          <p>三年級</p>
          <h2>自然拼讀單元進度</h2>
        </div>
        <div className={styles.unitList}>
          {gradeThreeUnits.map(
            ({ completedLessons, completionPercent, latestPracticeDate, unit }) => (
              <article className={styles.unit} key={unit.id}>
                <div className={styles.unitHeading}>
                  <div>
                    <p>第 {unit.order} 單元</p>
                    <h3>{unit.title}</h3>
                  </div>
                  <strong>{completionPercent}%</strong>
                </div>
                <div
                  className={styles.unitProgress}
                  role="progressbar"
                  aria-label={`${unit.title} 三年級進度`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={completionPercent}
                >
                  <span style={{ width: `${completionPercent}%` }} />
                </div>
                <p>
                  已完成 {completedLessons} / {unit.lessonIds.length} 課
                </p>
                <p>最近練習：{formatProgressDate(latestPracticeDate)}</p>
              </article>
            ),
          )}
        </div>
      </section>
    </div>
  );
}

import { useMemo } from 'react';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import {
  formatProgressDate,
  getLearningProgressSummary,
  loadLearningProgress,
} from '../../progress/learningProgress';
import styles from './ProgressPage.module.css';

export function ProgressPage() {
  const summary = useMemo(() => getLearningProgressSummary(loadLearningProgress()), []);

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
    </div>
  );
}

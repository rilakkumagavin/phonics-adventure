import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { getCourseByLetter } from '../../courses/courseRepository';
import {
  getLearningProgressSummary,
  loadLearningProgress,
  recordLearningActivityWithResult,
} from '../../progress/learningProgress';
import type { LearningSkill } from '../../types/activity';
import styles from './CompletePage.module.css';

type TrackedSkill = Extract<LearningSkill, 'listening' | 'speaking' | 'reading'>;

function isTrackedSkill(value: string | null): value is TrackedSkill {
  return value === 'listening' || value === 'speaking' || value === 'reading';
}

function parseMistakeCount(value: string | null) {
  if (!value || !/^\d+$/.test(value)) {
    return 0;
  }

  return Math.min(99, Number(value));
}

export function CompletePage() {
  const [searchParams] = useSearchParams();
  const activityId = searchParams.get('activityId');
  const letterId = searchParams.get('letterId')?.toLowerCase();
  const skill = searchParams.get('skill');
  const trackedSkill = isTrackedSkill(skill) ? skill : null;
  const mistakeCount = parseMistakeCount(searchParams.get('mistakes'));
  const completion = useMemo(() => {
    if (!activityId || !letterId || !trackedSkill) {
      return null;
    }

    const course = getCourseByLetter(letterId);
    const activity = course?.activities.find((item) => item.id === activityId);

    if (!course || !activity?.skills.includes(trackedSkill)) {
      return null;
    }

    return { activityId, letterId, trackedSkill };
  }, [activityId, letterId, trackedSkill]);
  const [summary, setSummary] = useState(() =>
    getLearningProgressSummary(loadLearningProgress()),
  );
  const [wasSaved, setWasSaved] = useState(true);
  const recordedCompletionRef = useRef<string | null>(null);

  useEffect(() => {
    if (!completion) {
      return;
    }

    const completionKey = [
      completion.activityId,
      completion.letterId,
      completion.trackedSkill,
      mistakeCount,
    ].join(':');

    if (recordedCompletionRef.current === completionKey) {
      return;
    }

    recordedCompletionRef.current = completionKey;

    const result = recordLearningActivityWithResult({
      activityId: completion.activityId,
      letterId: completion.letterId,
      skill: completion.trackedSkill,
      mistakeCount,
    });

    setSummary(getLearningProgressSummary(result.progress));
    setWasSaved(result.saved);
  }, [completion, mistakeCount]);

  const skillLabel = useMemo(() => {
    if (completion?.trackedSkill === 'speaking') {
      return '口說';
    }

    if (completion?.trackedSkill === 'reading') {
      return '閱讀';
    }

    return '聽力';
  }, [completion]);

  if (!completion) {
    return (
      <div className={styles.page}>
        <PageHeader
          title="無法記錄這次練習"
          description="這個完成連結不完整，請回到課程或今日任務再試一次。"
        />

        <div className={styles.actions}>
          <Link className={styles.secondaryAction} to="/today">
            回到今日任務
          </Link>
          <Link className={styles.primaryAction} to="/map">
            返回學習地圖
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="今天的任務完成了"
        description={
          wasSaved
            ? '已把這次練習記在目前裝置。'
            : '這次練習完成了，但目前裝置無法儲存進度。'
        }
      />

      <section className={styles.result} aria-label="任務完成結果">
        <p className={styles.stars}>獲得 3 顆星星</p>
        {!wasSaved ? (
          <p className={styles.storageWarning} role="status">
            你仍可繼續學習，稍後可以再試一次。
          </p>
        ) : null}
        <p>這次練習：{skillLabel}</p>
        {mistakeCount > 0 ? <p>再試一次：{mistakeCount} 次</p> : null}
        <p>
          已完成字母：{summary.completedLetters}／{summary.totalLetters}
        </p>
      </section>

      <div className={styles.actions}>
        <Link className={styles.secondaryAction} to="/today">
          回到今日任務
        </Link>
        <Link className={styles.primaryAction} to="/map">
          查看學習地圖
        </Link>
      </div>
    </div>
  );
}

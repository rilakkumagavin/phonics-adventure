import { Link } from 'react-router-dom';
import { useMemo } from 'react';

import { PageHeader } from '../../components/PageHeader/PageHeader';
import { PlaceholderCard } from '../../components/PlaceholderCard/PlaceholderCard';
import { getAllCourses } from '../../courses/courseRepository';
import { loadLearningProgress } from '../../progress/learningProgress';
import { toLocalDateKey } from '../../progress/localDate';
import { generateDailyReviewPlan } from '../../review/dailyReview';
import styles from './TodayTaskPage.module.css';

function getKindLabel(kind: string) {
  if (kind === 'due-review') {
    return '到期複習';
  }

  if (kind === 'weak-skill') {
    return '加強練習';
  }

  return '新內容';
}

export function TodayTaskPage() {
  const progress = useMemo(() => loadLearningProgress(), []);
  const todayKey = toLocalDateKey(new Date());
  const plan = useMemo(
    () => generateDailyReviewPlan(progress, getAllCourses()),
    [progress],
  );
  const isTaskCompleted = (activityId: string) =>
    progress.activityCompletions[activityId] === todayKey;
  const nextTask =
    plan.tasks.find((task) => !isTaskCompleted(task.activityId)) ?? plan.tasks[0];
  const completedTaskCount = plan.tasks.filter((task) =>
    isTaskCompleted(task.activityId),
  ).length;
  const headerActionLabel =
    completedTaskCount === plan.tasks.length && plan.tasks.length > 0
      ? '再練一個任務'
      : completedTaskCount > 0
        ? '繼續今日任務'
        : '開始第一個任務';

  return (
    <div className={styles.page}>
      <PageHeader
        title="今日任務"
        description="依照目前裝置的學習進度，安排今天的小任務。"
      >
        <Link className={styles.primaryAction} to={nextTask?.href ?? '/lesson/a'}>
          {headerActionLabel}
        </Link>
      </PageHeader>

      <section className={styles.summary} aria-label="任務摘要">
        <PlaceholderCard
          title="預計時間"
          description={`${plan.estimatedMinutes}分鐘`}
        />
        <PlaceholderCard title="到期複習" description={`${plan.dueReviewCount}項`} />
        <PlaceholderCard title="加強練習" description={`${plan.weakSkillCount}項`} />
        <PlaceholderCard title="新內容" description={`${plan.newContentCount}項`} />
      </section>

      <section className={styles.taskList} aria-labelledby="task-list-title">
        <h2 id="task-list-title">任務清單</h2>
        <ol>
          {plan.tasks.map((task) => {
            const isCompleted = isTaskCompleted(task.activityId);

            return (
              <li key={task.id} className={styles.taskItem}>
                <div>
                  <div className={styles.taskMeta}>
                    <span className={styles.taskKind}>{getKindLabel(task.kind)}</span>
                    {isCompleted ? (
                      <span className={styles.completedStatus}>今天已完成</span>
                    ) : null}
                  </div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                </div>
                <Link className={styles.taskAction} to={task.href}>
                  {isCompleted ? '再練一次' : task.actionLabel}
                </Link>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}

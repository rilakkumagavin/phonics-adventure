import { beforeEach, describe, expect, it } from 'vitest';

import { getAllCourses } from '../courses/courseRepository';
import {
  createEmptyLearningProgress,
  recordLearningActivity,
} from '../progress/learningProgress';
import { generateDailyReviewPlan } from './dailyReview';

describe('generateDailyReviewPlan', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('沒有進度時產生新內容任務', () => {
    const plan = generateDailyReviewPlan(
      createEmptyLearningProgress(),
      getAllCourses(),
      new Date('2026-07-01T10:00:00.000Z'),
    );

    expect(plan.tasks.length).toBeGreaterThan(0);
    expect(plan.newContentCount).toBeGreaterThanOrEqual(1);
    expect(plan.tasks[0].href).toBe(
      '/game/listen-and-choose?letterId=a&activityId=a-listen-word-picture-01',
    );
    expect(plan.estimatedMinutes).toBeGreaterThanOrEqual(5);
  });

  it('優先產生到期複習，再補弱項與新內容', () => {
    recordLearningActivity({
      activityId: 'a-listen-initial-sound-02',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    recordLearningActivity({
      activityId: 'a-letter-image-match-01',
      letterId: 'a',
      skill: 'reading',
      completedAt: new Date('2026-07-01T10:05:00.000Z'),
    });

    const progress = recordLearningActivity({
      activityId: 'a-record-and-playback-01',
      letterId: 'a',
      skill: 'speaking',
      completedAt: new Date('2026-07-01T10:10:00.000Z'),
    });
    const plan = generateDailyReviewPlan(
      progress,
      getAllCourses(),
      new Date('2026-07-02T10:00:00.000Z'),
    );

    expect(plan.tasks).toHaveLength(4);
    expect(plan.dueReviewCount).toBe(2);
    expect(plan.weakSkillCount).toBe(1);
    expect(plan.newContentCount).toBe(1);
    expect(plan.tasks[0].kind).toBe('due-review');
    expect(plan.tasks.find((task) => task.kind === 'new-content')?.href).toBe(
      '/game/listen-and-choose?letterId=b&activityId=b-listen-word-picture-01',
    );
    expect(new Set(plan.tasks.map((task) => task.href)).size).toBe(plan.tasks.length);
  });

  it('未到期時仍提供弱項與新內容', () => {
    const progress = recordLearningActivity({
      activityId: 'a-sound-sort-01',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    const plan = generateDailyReviewPlan(
      progress,
      getAllCourses(),
      new Date('2026-07-01T12:00:00.000Z'),
    );

    expect(plan.dueReviewCount).toBe(0);
    expect(plan.weakSkillCount).toBeGreaterThanOrEqual(1);
    expect(plan.newContentCount).toBeGreaterThanOrEqual(1);
  });

  it('B 的到期複習保留字母與活動識別碼', () => {
    const progress = recordLearningActivity({
      activityId: 'b-letter-image-match-01',
      letterId: 'b',
      skill: 'reading',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    const plan = generateDailyReviewPlan(
      progress,
      getAllCourses(),
      new Date('2026-07-02T10:00:00.000Z'),
    );
    const readingReview = plan.tasks.find(
      (task) => task.kind === 'due-review' && task.skill === 'reading',
    );

    expect(readingReview?.href).toBe(
      '/game/letter-image-match?letterId=b&activityId=b-letter-image-match-01',
    );
  });

  it('以裝置本地午夜判斷隔日複習是否到期', () => {
    const progress = recordLearningActivity({
      activityId: 'c-read-word-picture-01',
      letterId: 'c',
      skill: 'reading',
      completedAt: new Date(2026, 6, 1, 23, 30),
    });
    const beforeMidnight = generateDailyReviewPlan(
      progress,
      getAllCourses(),
      new Date(2026, 6, 1, 23, 59),
    );
    const afterMidnight = generateDailyReviewPlan(
      progress,
      getAllCourses(),
      new Date(2026, 6, 2, 0, 1),
    );

    expect(beforeMidnight.dueReviewCount).toBe(0);
    expect(afterMidnight.dueReviewCount).toBeGreaterThanOrEqual(1);
  });
});

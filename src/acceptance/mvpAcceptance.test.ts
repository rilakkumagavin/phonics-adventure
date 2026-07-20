import { describe, expect, it } from 'vitest';

import { getAllCourses } from '../courses/courseRepository';
import { validateCourses } from '../courses/validateCourse';
import { createEmptyLearningProgress } from '../progress/learningProgress';
import { generateDailyReviewPlan } from '../review/dailyReview';

describe('phonics course acceptance', () => {
  it('課程從 A 起連續建立，且每課都有聽說讀活動', () => {
    const courses = getAllCourses();
    const letters = courses.map((course) => course.letter.uppercase);
    const expectedLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      .slice(0, courses.length)
      .split('');

    expect(letters).toEqual(expectedLetters);

    for (const course of courses) {
      expect(course.words.filter((word) => word.isCore)).toHaveLength(3);
      expect(
        course.activities.some((activity) => activity.skills.includes('listening')),
      ).toBe(true);
      expect(
        course.activities.some((activity) => activity.skills.includes('speaking')),
      ).toBe(true);
      expect(
        course.activities.some((activity) => activity.skills.includes('reading')),
      ).toBe(true);
    }
  });

  it('正式課程資料沒有阻擋顯示的驗證錯誤', () => {
    expect(validateCourses(getAllCourses()).valid).toBe(true);
  });

  it('每課都包含最小聽說讀活動資料', () => {
    for (const course of getAllCourses()) {
      expect(course.activities.map((activity) => activity.type)).toEqual(
        expect.arrayContaining([
          'listen-and-choose',
          'record-and-playback',
          'read-and-choose',
        ]),
      );
    }
  });

  it('每日複習可從已建立課程產生任務', () => {
    const plan = generateDailyReviewPlan(
      createEmptyLearningProgress(),
      getAllCourses(),
    );

    expect(plan.tasks.length).toBeGreaterThan(0);
    expect(plan.tasks.length).toBeLessThanOrEqual(4);
  });
});

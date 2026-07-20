import { describe, expect, it } from 'vitest';

import {
  getGradeThreeReadingLesson,
  getGradeThreeReadingLessonPath,
  getNextGradeThreeReadingLesson,
  gradeThreeReadingFluencyLessons,
} from './grade3ReadingFluency';

describe('gradeThreeReadingFluencyLessons', () => {
  it('建立五課由單句進展到短文的逐字閱讀資料', () => {
    expect(gradeThreeReadingFluencyLessons).toHaveLength(5);
    expect(gradeThreeReadingFluencyLessons.map((lesson) => lesson.order)).toEqual([
      1, 2, 3, 4, 5,
    ]);
    expect(gradeThreeReadingFluencyLessons.at(-1)?.sentence).toContain(
      'The rain stops.',
    );
    expect(
      gradeThreeReadingFluencyLessons.every(
        (lesson) =>
          lesson.unitId === 'grade-3-reading-fluency' &&
          lesson.status === 'ready' &&
          lesson.tokens.length >= 5,
      ),
    ).toBe(true);
  });

  it('每個字與整句都有可播放的正式 WAV', () => {
    for (const lesson of gradeThreeReadingFluencyLessons) {
      expect(lesson.audio.src).toMatch(
        /^\/assets\/audio\/grade3\/reading-fluency\/.+\.wav$/,
      );
      expect(lesson.audio.status).toBe('ready');
      expect(lesson.image.status).toBe('ready');

      for (const token of lesson.tokens) {
        expect(token.audio.src).toMatch(
          /^\/assets\/audio\/grade3\/reading-fluency\/words\/[a-z]+\.wav$/,
        );
        expect(token.audio.status).toBe('ready');
      }
    }
  });

  it('可依 slug 或 id 查詢並取得順序與路徑', () => {
    const firstLesson = gradeThreeReadingFluencyLessons[0];
    const secondLesson = gradeThreeReadingFluencyLessons[1];

    expect(getGradeThreeReadingLesson('TRAIN-IN-RAIN')).toBe(firstLesson);
    expect(getGradeThreeReadingLesson(firstLesson.id)).toBe(firstLesson);
    expect(getNextGradeThreeReadingLesson(firstLesson)).toBe(secondLesson);
    expect(getGradeThreeReadingLessonPath(firstLesson)).toBe(
      '/grade/3/read/train-in-rain',
    );
  });
});

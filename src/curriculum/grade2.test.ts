import { describe, expect, it } from 'vitest';

import { getCurriculumUnit } from './curriculum';
import { gradeTwoCurriculum } from './grade2';

describe('gradeTwoCurriculum', () => {
  it('依拼讀難度提供六個不重複的單元', () => {
    expect(gradeTwoCurriculum.grade).toBe(2);
    expect(gradeTwoCurriculum.units).toHaveLength(6);
    expect(gradeTwoCurriculum.units.map((unit) => unit.order)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
    expect(new Set(gradeTwoCurriculum.units.map((unit) => unit.id)).size).toBe(6);
    expect(new Set(gradeTwoCurriculum.units.map((unit) => unit.slug)).size).toBe(6);
  });

  it('每個單元都包含聽說讀目標，六個單元皆可使用', () => {
    for (const unit of gradeTwoCurriculum.units) {
      expect(unit.skills).toEqual(['listening', 'speaking', 'reading']);
      expect(unit.learningGoals.length).toBeGreaterThanOrEqual(3);
      expect(unit.estimatedLessons).toBeGreaterThan(0);
    }

    expect(gradeTwoCurriculum.units[0].status).toBe('ready');
    expect(gradeTwoCurriculum.units[0].entryPath).toBe(
      '/grade/2/lesson/short-a',
    );
    expect(gradeTwoCurriculum.units[0].lessonIds).toHaveLength(5);
    expect(gradeTwoCurriculum.units[0].firstLessonId).toBe(
      'grade-2-short-a-lesson-01',
    );
    expect(
      gradeTwoCurriculum.units.slice(0, 5).every((unit) => unit.status === 'ready'),
    ).toBe(true);
    expect(gradeTwoCurriculum.units[1].lessonIds).toHaveLength(5);
    expect(gradeTwoCurriculum.units[2].lessonIds).toHaveLength(4);
    expect(gradeTwoCurriculum.units[3].lessonIds).toHaveLength(5);
    expect(gradeTwoCurriculum.units[4].lessonIds).toHaveLength(4);
    expect(gradeTwoCurriculum.units[5].lessonIds).toHaveLength(5);
    expect(gradeTwoCurriculum.units[5].status).toBe('ready');
    expect(gradeTwoCurriculum.units[5].entryPath).toBe(
      '/grade/2/sentence/cat-on-mat',
    );
  });

  it('可以用 id 或 slug 找到單元', () => {
    expect(
      getCurriculumUnit(gradeTwoCurriculum, 'grade-2-short-vowels')?.slug,
    ).toBe('short-vowels');
    expect(getCurriculumUnit(gradeTwoCurriculum, 'MAGIC-E')?.id).toBe(
      'grade-2-magic-e',
    );
  });
});

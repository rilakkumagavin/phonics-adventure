import { describe, expect, it } from 'vitest';

import type { LetterCourse } from '../types/course';
import { courses } from './courseIndex';
import { validateCourse, validateCourses } from './validateCourse';

function cloneCourse(course: LetterCourse): LetterCourse {
  return structuredClone(course) as LetterCourse;
}

describe('validateCourse', () => {
  it('A 到 F 正式課程全部通過基本驗證', () => {
    const result = validateCourses(courses);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('重複單字 ID 會被偵測', () => {
    const course = cloneCourse(courses[0]);
    course.words[1] = {
      ...course.words[1],
      id: course.words[0].id,
    };

    const result = validateCourse(course);

    expect(result.valid).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain('duplicate-word-id');
  });

  it('缺少核心能力活動會被偵測', () => {
    const course = cloneCourse(courses[0]);
    course.activities = course.activities.filter(
      (activity) => !activity.skills.includes('speaking'),
    );

    const result = validateCourse(course);

    expect(result.valid).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain(
      'missing-required-skill-activity',
    );
  });

  it('引用不存在的單字或句子會被偵測', () => {
    const course = cloneCourse(courses[0]);
    course.activities[0] = {
      ...course.activities[0],
      wordIds: ['missing-word'],
      sentenceIds: ['missing-sentence'],
    };

    const result = validateCourse(course);

    expect(result.valid).toBe(false);
    expect(result.errors.map((error) => error.code)).toEqual(
      expect.arrayContaining([
        'unknown-activity-word-reference',
        'unknown-activity-sentence-reference',
      ]),
    );
  });

  it('缺少資產參照會產生錯誤', () => {
    const course = cloneCourse(courses[0]);
    course.words[0] = {
      ...course.words[0],
      image: {
        ...course.words[0].image,
        id: '',
      },
    };

    const result = validateCourse(course);

    expect(result.valid).toBe(false);
    expect(result.errors.map((error) => error.code)).toContain(
      'missing-word-image-asset',
    );
  });

  it('placeholder 資產不會被誤判為正式 ready', () => {
    const course = structuredClone(courses[5]);
    course.words.forEach((word) => {
      word.audio.status = 'placeholder';
    });
    const result = validateCourse(course);

    expect(course.metadata.status).not.toBe('ready');
    expect(course.words.some((word) => word.image.status === 'placeholder')).toBe(
      false,
    );
    expect(course.words.every((word) => word.audio.status === 'placeholder')).toBe(
      true,
    );
    expect(
      course.sentences.every((sentence) => sentence.image?.status === 'ready'),
    ).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.warnings.map((warning) => warning.code)).toContain(
      'placeholder-word-asset',
    );
  });
});

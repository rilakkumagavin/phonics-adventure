import { describe, expect, it } from 'vitest';

import {
  getAllCourses,
  getAvailableCourseIds,
  getCourseById,
  getCourseByLetter,
} from './courseRepository';

describe('courseRepository', () => {
  it('可取得連續建立的課程', () => {
    const courses = getAllCourses();
    const expectedLetters = Array.from(
      { length: courses.length },
      (_, index) => String.fromCharCode(65 + index),
    );

    expect(courses.map((course) => course.letter.uppercase)).toEqual(expectedLetters);
  });

  it('可依 ID 取得 A 課程', () => {
    expect(getCourseById('letter-a')?.letter.uppercase).toBe('A');
  });

  it('可依字母取得 B 課程', () => {
    expect(getCourseByLetter('B')?.id).toBe('letter-b');
    expect(getCourseByLetter('b')?.id).toBe('letter-b');
  });

  it('不存在的 ID 回傳 undefined', () => {
    expect(getCourseById('letter-aa')).toBeUndefined();
  });

  it('查詢不修改原始課程陣列', () => {
    const firstRead = getAllCourses();
    const originalLength = firstRead.length;
    firstRead.pop();

    expect(firstRead).toHaveLength(originalLength - 1);
    expect(getAllCourses()).toHaveLength(originalLength);
    expect(getAvailableCourseIds()).toEqual(
      getAllCourses().map((course) => course.id),
    );
  });
});

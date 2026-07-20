import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterRCourse } from './r';

describe('letterRCourse', () => {
  it('提供 R 的核心內容', () => {
    expect(letterRCourse.words.map((word) => word.displayWord)).toEqual(['rabbit', 'robot', 'rain']);
    expect(validateCourse(letterRCourse).valid).toBe(true);
  });
});

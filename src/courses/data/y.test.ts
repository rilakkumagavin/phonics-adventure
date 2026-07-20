import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterYCourse } from './y';
describe('letterYCourse', () => { it('提供 Y 的核心內容', () => {
  expect(letterYCourse.words.map((word) => word.displayWord)).toEqual(['yarn', 'yak', 'yo-yo']);
  expect(validateCourse(letterYCourse).valid).toBe(true);
}); });

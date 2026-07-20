import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterTCourse } from './t';
describe('letterTCourse', () => { it('提供 T 的核心內容', () => {
  expect(letterTCourse.words.map((word) => word.displayWord)).toEqual(['tiger', 'top', 'tent']);
  expect(validateCourse(letterTCourse).valid).toBe(true);
}); });

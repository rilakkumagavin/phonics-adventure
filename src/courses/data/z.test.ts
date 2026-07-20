import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterZCourse } from './z';
describe('letterZCourse', () => { it('提供 Z 的核心內容', () => {
  expect(letterZCourse.words.map((word) => word.displayWord)).toEqual(['zebra', 'zipper', 'zoo']);
  expect(validateCourse(letterZCourse).valid).toBe(true);
}); });

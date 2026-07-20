import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterUCourse } from './u';
describe('letterUCourse', () => { it('提供 U 的核心內容', () => {
  expect(letterUCourse.words.map((word) => word.displayWord)).toEqual(['umbrella', 'up', 'uncle']);
  expect(validateCourse(letterUCourse).valid).toBe(true);
}); });

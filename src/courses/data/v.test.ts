import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterVCourse } from './v';
describe('letterVCourse', () => { it('提供 V 的核心內容', () => {
  expect(letterVCourse.words.map((word) => word.displayWord)).toEqual(['van', 'vase', 'violin']);
  expect(validateCourse(letterVCourse).valid).toBe(true);
}); });

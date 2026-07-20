import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterSCourse } from './s';
describe('letterSCourse', () => { it('提供 S 的核心內容', () => {
  expect(letterSCourse.words.map((word) => word.displayWord)).toEqual(['sun', 'sock', 'seal']);
  expect(validateCourse(letterSCourse).valid).toBe(true);
}); });

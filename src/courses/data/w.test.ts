import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterWCourse } from './w';
describe('letterWCourse', () => { it('提供 W 的核心內容', () => {
  expect(letterWCourse.words.map((word) => word.displayWord)).toEqual(['whale', 'web', 'wagon']);
  expect(validateCourse(letterWCourse).valid).toBe(true);
}); });

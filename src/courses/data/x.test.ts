import { describe, expect, it } from 'vitest';
import { validateCourse } from '../validateCourse';
import { letterXCourse } from './x';
describe('letterXCourse', () => { it('提供 X 字尾的核心內容', () => {
  expect(letterXCourse.words.map((word) => word.displayWord)).toEqual(['fox', 'box', 'six']);
  expect(letterXCourse.letter.primarySound.phoneticHint).toBe('/ks/');
  expect(validateCourse(letterXCourse).valid).toBe(true);
}); });

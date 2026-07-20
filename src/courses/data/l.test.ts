import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterLCourse } from './l';

describe('letterLCourse', () => {
  it('提供 L 的三個核心單字與 /l/ 聲', () => {
    expect(letterLCourse.words.map((word) => word.displayWord)).toEqual([
      'lemon',
      'leaf',
      'lamp',
    ]);
    expect(letterLCourse.letter.primarySound.phoneticHint).toBe('/l/');
    expect(validateCourse(letterLCourse).valid).toBe(true);
  });
});

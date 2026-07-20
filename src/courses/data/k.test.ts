import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterKCourse } from './k';

describe('letterKCourse', () => {
  it('提供 K 的三個核心單字與 /k/ 聲', () => {
    expect(letterKCourse.words.map((word) => word.displayWord)).toEqual([
      'kite',
      'key',
      'kangaroo',
    ]);
    expect(letterKCourse.letter.primarySound.phoneticHint).toBe('/k/');
    expect(validateCourse(letterKCourse).valid).toBe(true);
  });
});

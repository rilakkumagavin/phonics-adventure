import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterMCourse } from './m';

describe('letterMCourse', () => {
  it('提供 M 的三個核心單字與 /m/ 聲', () => {
    expect(letterMCourse.words.map((word) => word.displayWord)).toEqual([
      'mouse',
      'moon',
      'map',
    ]);
    expect(letterMCourse.letter.primarySound.phoneticHint).toBe('/m/');
    expect(validateCourse(letterMCourse).valid).toBe(true);
  });
});

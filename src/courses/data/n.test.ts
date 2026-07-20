import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterNCourse } from './n';

describe('letterNCourse', () => {
  it('提供 N 的三個核心單字與 /n/ 聲', () => {
    expect(letterNCourse.words.map((word) => word.displayWord)).toEqual([
      'nest',
      'nose',
      'net',
    ]);
    expect(letterNCourse.letter.primarySound.phoneticHint).toBe('/n/');
    expect(validateCourse(letterNCourse).valid).toBe(true);
  });
});

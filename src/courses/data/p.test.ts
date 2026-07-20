import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterPCourse } from './p';

describe('letterPCourse', () => {
  it('提供 P 的三個核心單字與 /p/ 聲', () => {
    expect(letterPCourse.words.map((word) => word.displayWord)).toEqual([
      'pig',
      'pen',
      'pizza',
    ]);
    expect(letterPCourse.letter.primarySound.phoneticHint).toBe('/p/');
    expect(validateCourse(letterPCourse).valid).toBe(true);
  });
});

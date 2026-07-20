import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterQCourse } from './q';

describe('letterQCourse', () => {
  it('提供 Q 的三個核心單字與 /kw/ 合音', () => {
    expect(letterQCourse.words.map((word) => word.displayWord)).toEqual([
      'quill',
      'quilt',
      'quail',
    ]);
    expect(letterQCourse.letter.primarySound.phoneticHint).toBe('/kw/');
    expect(validateCourse(letterQCourse).valid).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterOCourse } from './o';

describe('letterOCourse', () => {
  it('提供 O 的三個核心單字與短母音', () => {
    expect(letterOCourse.words.map((word) => word.displayWord)).toEqual([
      'octopus',
      'ox',
      'olive',
    ]);
    expect(letterOCourse.letter.primarySound.phoneticHint).toBe('/ɑ/');
    expect(validateCourse(letterOCourse).valid).toBe(true);
  });
});

import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterJCourse } from './j';

describe('letterJCourse', () => {
  it('提供 J 的三個核心單字與 /dʒ/ 聲', () => {
    expect(letterJCourse.words.map((word) => word.displayWord)).toEqual([
      'jam',
      'jet',
      'jellyfish',
    ]);
    expect(letterJCourse.letter.primarySound.phoneticHint).toBe('/dʒ/');
  });

  it('核心資產可使用且課程通過驗證', () => {
    expect(letterJCourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterJCourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );
    expect(
      letterJCourse.sentences.every(
        (sentence) =>
          sentence.image?.status === 'ready' && sentence.audio.status === 'ready',
      ),
    ).toBe(true);
    expect(validateCourse(letterJCourse).valid).toBe(true);
  });
});

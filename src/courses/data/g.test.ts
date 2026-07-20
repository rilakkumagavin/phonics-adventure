import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterGCourse } from './g';

describe('letterGCourse', () => {
  it('提供 G 的三個硬 G 核心單字', () => {
    expect(letterGCourse.words.map((word) => word.displayWord)).toEqual([
      'goat',
      'gift',
      'gorilla',
    ]);
    expect(letterGCourse.letter.primarySound.phoneticHint).toBe('/g/');
    expect(letterGCourse.subtitle).toBe('聽見 G，找到 goat、gift、gorilla');
  });

  it('所有核心圖片與單字短句音訊皆可使用', () => {
    expect(letterGCourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterGCourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );
    expect(
      letterGCourse.sentences.every(
        (sentence) =>
          sentence.image?.status === 'ready' && sentence.audio.status === 'ready',
      ),
    ).toBe(true);
  });

  it('涵蓋聽說讀且通過課程驗證', () => {
    expect(letterGCourse.activities.map((activity) => activity.skills[0])).toEqual([
      'listening',
      'speaking',
      'reading',
    ]);
    expect(validateCourse(letterGCourse).valid).toBe(true);
  });
});

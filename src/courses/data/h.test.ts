import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterHCourse } from './h';

describe('letterHCourse', () => {
  it('提供 H 的三個核心單字', () => {
    expect(letterHCourse.words.map((word) => word.displayWord)).toEqual([
      'hat',
      'hen',
      'hippo',
    ]);
    expect(letterHCourse.letter.primarySound.phoneticHint).toBe('/h/');
    expect(letterHCourse.subtitle).toBe('聽見 H，找到 hat、hen、hippo');
  });

  it('所有核心圖片與單字短句音訊皆可使用', () => {
    expect(letterHCourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterHCourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );
    expect(
      letterHCourse.sentences.every(
        (sentence) =>
          sentence.image?.status === 'ready' && sentence.audio.status === 'ready',
      ),
    ).toBe(true);
  });

  it('涵蓋聽說讀且通過課程驗證', () => {
    expect(letterHCourse.activities.map((activity) => activity.skills[0])).toEqual([
      'listening',
      'speaking',
      'reading',
    ]);
    expect(validateCourse(letterHCourse).valid).toBe(true);
  });
});

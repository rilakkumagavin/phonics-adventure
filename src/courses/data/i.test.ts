import { describe, expect, it } from 'vitest';

import { validateCourse } from '../validateCourse';
import { letterICourse } from './i';

describe('letterICourse', () => {
  it('提供 I 的三個短母音核心單字', () => {
    expect(letterICourse.words.map((word) => word.displayWord)).toEqual([
      'igloo',
      'insect',
      'ink',
    ]);
    expect(letterICourse.letter.primarySound.phoneticHint).toBe('/ɪ/');
  });

  it('所有核心圖片與單字短句音訊皆可使用', () => {
    expect(letterICourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterICourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );
    expect(
      letterICourse.sentences.every(
        (sentence) =>
          sentence.image?.status === 'ready' && sentence.audio.status === 'ready',
      ),
    ).toBe(true);
  });

  it('涵蓋聽說讀且通過課程驗證', () => {
    expect(letterICourse.activities.map((activity) => activity.skills[0])).toEqual([
      'listening',
      'speaking',
      'reading',
    ]);
    expect(validateCourse(letterICourse).valid).toBe(true);
  });
});

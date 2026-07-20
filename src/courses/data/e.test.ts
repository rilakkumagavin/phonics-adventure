import { describe, expect, it } from 'vitest';

import { letterECourse } from './e';

describe('letterECourse', () => {
  it('提供 E 正式課程的基本資料', () => {
    expect(letterECourse.id).toBe('letter-e');
    expect(letterECourse.version).toBe(2);
    expect(letterECourse.title).toBe('E 的短短聲音');
    expect(letterECourse.subtitle).toBe('聽見 E，找到 egg、elephant、elbow');
    expect(letterECourse.metadata.status).toBe('draft');
    expect(letterECourse.metadata.stage).toBe('Phase 4E');
  });

  it('包含三個核心單字與三個短句', () => {
    expect(letterECourse.words.map((word) => word.displayWord)).toEqual([
      'egg',
      'elephant',
      'elbow',
    ]);
    expect(letterECourse.sentences.map((sentence) => sentence.text)).toEqual([
      'An egg.',
      'The elephant is big.',
      'Touch your elbow.',
    ]);
  });

  it('正式圖片與候選音訊皆可使用', () => {
    expect(letterECourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterECourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );

    for (const sentence of letterECourse.sentences) {
      expect(sentence.image?.status).toBe('ready');
      expect(sentence.audio.status).toBe('ready');
    }
  });

  it('涵蓋 E 課程所需的 MVP 活動種類', () => {
    expect(letterECourse.activities.map((activity) => activity.type)).toEqual(
      expect.arrayContaining([
        'listen-and-choose',
        'letter-image-match',
        'record-and-playback',
        'sound-sort',
        'read-and-choose',
      ]),
    );
  });
});

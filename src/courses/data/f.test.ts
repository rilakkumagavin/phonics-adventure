import { describe, expect, it } from 'vitest';

import { letterFCourse } from './f';

describe('letterFCourse', () => {
  it('提供 F 正式課程的基本資料', () => {
    expect(letterFCourse.id).toBe('letter-f');
    expect(letterFCourse.version).toBe(2);
    expect(letterFCourse.title).toBe('F 的輕輕送氣聲');
    expect(letterFCourse.subtitle).toBe('聽見 F，找到 fish、fan、frog');
    expect(letterFCourse.metadata.status).toBe('draft');
    expect(letterFCourse.metadata.stage).toBe('Phase 4F');
  });

  it('包含三個核心單字與三個短句', () => {
    expect(letterFCourse.words.map((word) => word.displayWord)).toEqual([
      'fish',
      'fan',
      'frog',
    ]);
    expect(letterFCourse.sentences.map((sentence) => sentence.text)).toEqual([
      'A fish.',
      'The fan is fast.',
      'The frog can jump.',
    ]);
  });

  it('正式圖片與候選音訊皆可使用', () => {
    expect(letterFCourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterFCourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );

    for (const sentence of letterFCourse.sentences) {
      expect(sentence.image?.status).toBe('ready');
      expect(sentence.audio.status).toBe('ready');
    }
  });

  it('涵蓋 F 課程所需的 MVP 活動種類', () => {
    expect(letterFCourse.activities.map((activity) => activity.type)).toEqual(
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

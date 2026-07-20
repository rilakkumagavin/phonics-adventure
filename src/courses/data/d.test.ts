import { describe, expect, it } from 'vitest';

import { letterDCourse } from './d';

describe('letterDCourse', () => {
  it('建立 D 正式課程草稿資料', () => {
    expect(letterDCourse.id).toBe('letter-d');
    expect(letterDCourse.version).toBe(2);
    expect(letterDCourse.title).toBe('D 的短短聲音');
    expect(letterDCourse.subtitle).toBe('聽見 D，找到 dog、duck、drum');
    expect(letterDCourse.metadata.status).toBe('draft');
    expect(letterDCourse.metadata.stage).toBe('Phase 4D');
  });

  it('包含 dog、duck、drum 與三個核心句子', () => {
    expect(letterDCourse.words.map((word) => word.displayWord)).toEqual([
      'dog',
      'duck',
      'drum',
    ]);
    expect(letterDCourse.sentences.map((sentence) => sentence.text)).toEqual([
      'A dog.',
      'The duck is yellow.',
      'The drum is big.',
    ]);
  });

  it('正式圖片與候選音訊皆可使用', () => {
    expect(letterDCourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterDCourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );

    for (const sentence of letterDCourse.sentences) {
      expect(sentence.image?.status).toBe('ready');
      expect(sentence.audio.status).toBe('ready');
    }
  });

  it('活動型別維持 MVP 所需覆蓋', () => {
    expect(letterDCourse.activities.map((activity) => activity.type)).toEqual(
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

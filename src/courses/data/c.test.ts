import { describe, expect, it } from 'vitest';

import { letterCCourse } from './c';

describe('letterCCourse', () => {
  it('建立 C 正式課程草稿資料', () => {
    expect(letterCCourse.id).toBe('letter-c');
    expect(letterCCourse.version).toBe(2);
    expect(letterCCourse.title).toBe('C 的清脆聲音');
    expect(letterCCourse.subtitle).toBe('聽見 C，找到 cat、cap、cup');
    expect(letterCCourse.metadata.status).toBe('draft');
    expect(letterCCourse.metadata.stage).toBe('Phase 4C');
  });

  it('包含 cat、cap、cup 與三個核心句子', () => {
    expect(letterCCourse.words.map((word) => word.displayWord)).toEqual([
      'cat',
      'cap',
      'cup',
    ]);
    expect(letterCCourse.sentences.map((sentence) => sentence.text)).toEqual([
      'A cat.',
      'The cap is red.',
      'The cup is clean.',
    ]);
  });

  it('正式圖片與候選音訊皆可使用', () => {
    expect(letterCCourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterCCourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );

    for (const sentence of letterCCourse.sentences) {
      expect(sentence.image?.status).toBe('ready');
      expect(sentence.audio.status).toBe('ready');
    }
  });

  it('活動型別維持 MVP 所需覆蓋', () => {
    expect(letterCCourse.activities.map((activity) => activity.type)).toEqual(
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

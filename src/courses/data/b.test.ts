import { describe, expect, it } from 'vitest';

import { letterBCourse } from './b';

describe('letterBCourse', () => {
  it('建立 B 課正式內容草案', () => {
    expect(letterBCourse.id).toBe('letter-b');
    expect(letterBCourse.version).toBe(2);
    expect(letterBCourse.title).toBe('B 的碰碰聲音');
    expect(letterBCourse.subtitle).toBe('聽見 B，找到 ball、bat、bus');
    expect(letterBCourse.metadata.status).toBe('draft');
    expect(letterBCourse.metadata.stage).toBe('Phase 4B');
  });

  it('保留 ball、bat、bus 三個核心單字與對應短句', () => {
    expect(letterBCourse.words.map((word) => word.displayWord)).toEqual([
      'ball',
      'bat',
      'bus',
    ]);
    expect(letterBCourse.sentences.map((sentence) => sentence.text)).toEqual([
      'a ball.',
      'The bat is big.',
      'The bus is blue.',
    ]);
  });

  it('正式圖片與候選音訊皆可使用', () => {
    expect(letterBCourse.words[0].image.src).toBe(
      '/assets/images/courses/b/b-ball-core.webp',
    );
    expect(letterBCourse.words[1].image.src).toBe(
      '/assets/images/courses/b/b-bat-core.webp',
    );
    expect(letterBCourse.words[2].image.src).toBe(
      '/assets/images/courses/b/b-bus-core.webp',
    );

    expect(letterBCourse.words.every((word) => word.image.status === 'ready')).toBe(
      true,
    );
    expect(letterBCourse.words.every((word) => word.audio.status === 'ready')).toBe(
      true,
    );

    for (const sentence of letterBCourse.sentences) {
      expect(sentence.image?.status).toBe('ready');
      expect(sentence.audio.status).toBe('ready');
    }
  });

  it('包含 B 課正式規劃的主要活動型別', () => {
    expect(letterBCourse.activities.map((activity) => activity.type)).toEqual(
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

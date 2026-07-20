import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { gradeTwoShortALesson } from './grade2ShortA';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

function publicAssetExists(src: string) {
  return existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));
}

describe('gradeTwoShortALesson', () => {
  it('使用 cat、map、fan 三個 CVC 單字', () => {
    expect(gradeTwoShortALesson.words.map((word) => word.word)).toEqual([
      'cat',
      'map',
      'fan',
    ]);
    expect(
      gradeTwoShortALesson.words.every(
        (word) => word.pattern === 'CVC' && word.segments.length === 3,
      ),
    ).toBe(true);
  });

  it('每個單字中央都是短母音 a /æ/', () => {
    for (const word of gradeTwoShortALesson.words) {
      expect(word.segments[1].grapheme).toBe('a');
      expect(word.segments[1].soundLabel).toBe('/æ/');
      expect(word.segments[1].audio?.src).toBe(
        gradeTwoPhonemeAudio.shortA,
      );
    }
  });

  it('cat 的 c 與 t 使用二年級兒童友善音段', () => {
    const cat = gradeTwoShortALesson.words[0];

    expect(cat.segments[0].audio?.src).toBe(
      gradeTwoPhonemeAudio.hardC,
    );
    expect(cat.segments[2].audio?.src).toBe(
      gradeTwoPhonemeAudio.tSound,
    );
    expect(publicAssetExists(gradeTwoPhonemeAudio.hardC)).toBe(true);
    expect(publicAssetExists(gradeTwoPhonemeAudio.tSound)).toBe(true);
  });

  it('所有圖片、音段與整字音訊皆引用現有正式資產', () => {
    for (const word of gradeTwoShortALesson.words) {
      expect(word.image.status).toBe('ready');
      expect(word.audio.status).toBe('ready');
      expect(publicAssetExists(word.image.src)).toBe(true);
      expect(publicAssetExists(word.audio.src)).toBe(true);

      for (const segment of word.segments) {
        expect(segment.audio).toBeDefined();
        expect(segment.audio?.kind).toBe('phoneme');
        expect(segment.audio?.status).toBe('ready');
        expect(publicAssetExists(segment.audio?.src ?? '')).toBe(true);
      }
    }
  });
});

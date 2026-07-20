import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { gradeTwoConsonantBlendLessons } from './grade2ConsonantBlends';

function assetExists(src: string) {
  return existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));
}

describe('二年級子音連音課程', () => {
  it('提供 fr、dr、st、mp、tr 五課與十個單字', () => {
    expect(
      gradeTwoConsonantBlendLessons.map((lesson) => lesson.vowelGrapheme),
    ).toEqual(['fr', 'dr', 'st', 'mp', 'tr']);
    expect(
      gradeTwoConsonantBlendLessons.flatMap((lesson) => lesson.words),
    ).toHaveLength(10);
  });

  it('每個連音都保留成兩個相鄰音段', () => {
    for (const lesson of gradeTwoConsonantBlendLessons) {
      const [first, second] = lesson.vowelGrapheme;

      expect(
        lesson.words.every((word) => {
          const graphemes = word.segments.map((segment) => segment.grapheme);

          return graphemes.some(
            (grapheme, index) =>
              grapheme === first && graphemes[index + 1] === second,
          );
        }),
      ).toBe(true);
    }
  });

  it('每個單字都有可用的圖片、音段與整字音訊', () => {
    for (const lesson of gradeTwoConsonantBlendLessons) {
      for (const word of lesson.words) {
        expect(assetExists(word.image.src), word.image.src).toBe(true);
        expect(assetExists(word.audio.src), word.audio.src).toBe(true);
        expect(
          word.segments.every(
            (segment) => segment.audio && assetExists(segment.audio.src),
          ),
        ).toBe(true);
      }
    }
  });
});

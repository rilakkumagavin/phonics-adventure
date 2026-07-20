import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { gradeTwoDigraphLessons } from './grade2Digraphs';

function assetExists(src: string) {
  return existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));
}

describe('二年級子音組合課程', () => {
  it('提供 sh、ch、th、wh 四課與八個單字', () => {
    expect(gradeTwoDigraphLessons.map((lesson) => lesson.vowelGrapheme)).toEqual([
      'sh',
      'ch',
      'th',
      'wh',
    ]);
    expect(gradeTwoDigraphLessons.flatMap((lesson) => lesson.words)).toHaveLength(
      8,
    );
  });

  it('每個單字都包含該課的雙字母音段', () => {
    for (const lesson of gradeTwoDigraphLessons) {
      expect(
        lesson.words.every((word) =>
          word.segments.some(
            (segment) => segment.grapheme === lesson.vowelGrapheme,
          ),
        ),
      ).toBe(true);
    }
  });

  it('每個單字都有可用的圖片、音段與整字音訊', () => {
    for (const lesson of gradeTwoDigraphLessons) {
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

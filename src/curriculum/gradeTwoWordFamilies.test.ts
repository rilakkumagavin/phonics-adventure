import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { gradeTwoWordFamilyLessons } from './grade2WordFamilies';

function assetExists(src: string) {
  return existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));
}

describe('二年級字族課程', () => {
  it('提供五個字族與十一個可拼讀單字', () => {
    expect(gradeTwoWordFamilyLessons.map((lesson) => lesson.vowelGrapheme)).toEqual(
      ['-at', '-an', '-ap', '-ox', '-en'],
    );
    expect(
      gradeTwoWordFamilyLessons.flatMap((lesson) => lesson.words),
    ).toHaveLength(11);
  });

  it('每課單字都有相同字尾', () => {
    for (const lesson of gradeTwoWordFamilyLessons) {
      const ending = lesson.vowelGrapheme.slice(1);

      expect(lesson.words.length).toBeGreaterThanOrEqual(2);
      expect(lesson.words.every((word) => word.word.endsWith(ending))).toBe(true);
    }
  });

  it('每個單字都有正式圖片、音段與整字音訊', () => {
    for (const lesson of gradeTwoWordFamilyLessons) {
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

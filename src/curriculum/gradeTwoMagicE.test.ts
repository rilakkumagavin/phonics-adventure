import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { gradeTwoMagicELessons } from './grade2MagicE';

function assetExists(src: string) {
  return existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));
}

describe('二年級 Magic E 課程', () => {
  it('提供 a_e、i_e、o_e、u_e 四課與八個單字', () => {
    expect(gradeTwoMagicELessons.map((lesson) => lesson.vowelGrapheme)).toEqual([
      'a_e',
      'i_e',
      'o_e',
      'u_e',
    ]);
    expect(gradeTwoMagicELessons.flatMap((lesson) => lesson.words)).toHaveLength(
      8,
    );
  });

  it('每個單字最後都有不發音且沒有假音訊的 e', () => {
    for (const lesson of gradeTwoMagicELessons) {
      for (const word of lesson.words) {
        const finalSegment = word.segments.at(-1);

        expect(finalSegment?.grapheme).toBe('e');
        expect(finalSegment?.isSilent).toBe(true);
        expect(finalSegment?.audio).toBeUndefined();
      }
    }
  });

  it('每個單字都有圖片、長母音與整字音訊', () => {
    for (const lesson of gradeTwoMagicELessons) {
      for (const word of lesson.words) {
        expect(assetExists(word.image.src), word.image.src).toBe(true);
        expect(assetExists(word.audio.src), word.audio.src).toBe(true);

        for (const segment of word.segments.filter(
          (candidate) => !candidate.isSilent,
        )) {
          expect(segment.audio).toBeDefined();
          expect(assetExists(segment.audio?.src ?? '')).toBe(true);
        }
      }
    }
  });
});

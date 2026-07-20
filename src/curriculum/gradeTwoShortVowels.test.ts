import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  getGradeTwoBlendingLesson,
  getGradeTwoUnitLessons,
  gradeTwoBlendingLessons,
} from './gradeTwoLessonRepository';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

function assetExists(src: string) {
  return existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));
}

describe('二年級短母音課程', () => {
  const shortVowelLessons = getGradeTwoUnitLessons('grade-2-short-vowels');

  it('依序提供 a、e、i、o、u 五課與十五個單字', () => {
    expect(shortVowelLessons.map((lesson) => lesson.vowelGrapheme)).toEqual([
      'a',
      'e',
      'i',
      'o',
      'u',
    ]);
    expect(shortVowelLessons.flatMap((lesson) => lesson.words)).toHaveLength(
      15,
    );
  });

  it('每個單字都有至少三個音段與正式圖片、音段、整字音訊', () => {
    for (const lesson of shortVowelLessons) {
      for (const word of lesson.words) {
        expect(word.segments.length).toBeGreaterThanOrEqual(3);
        expect(assetExists(word.image.src), word.image.src).toBe(true);
        expect(assetExists(word.audio.src), word.audio.src).toBe(true);

        for (const segment of word.segments) {
          expect(segment.audio).toBeDefined();
          expect(assetExists(segment.audio?.src ?? '')).toBe(true);
        }
      }
    }
  });

  it('可由 slug 或 id 查找課程', () => {
    expect(getGradeTwoBlendingLesson('short-e')?.vowelGrapheme).toBe('e');
    expect(
      getGradeTwoBlendingLesson('grade-2-short-u-lesson-05')?.vowelGrapheme,
    ).toBe('u');
  });

  it('二年級所有短母音 a 音段使用獨立的 /æ/ 音檔', () => {
    const shortASegments = gradeTwoBlendingLessons.flatMap((lesson) =>
      lesson.words.flatMap((word) =>
        word.segments.filter(
          (segment) =>
            segment.grapheme === 'a' && segment.soundLabel === '/æ/',
        ),
      ),
    );

    expect(shortASegments.length).toBeGreaterThan(3);
    expect(
      shortASegments.every(
        (segment) => segment.audio?.src === gradeTwoPhonemeAudio.shortA,
      ),
    ).toBe(true);
    expect(assetExists(gradeTwoPhonemeAudio.shortA)).toBe(true);
  });

  it('二年級所有 hard c 與 t 音段使用兒童友善音檔', () => {
    const allSegments = gradeTwoBlendingLessons.flatMap((lesson) =>
      lesson.words.flatMap((word) => word.segments),
    );
    const hardCSegments = allSegments.filter(
      (segment) =>
        segment.grapheme === 'c' && segment.soundLabel === '/k/',
    );
    const tSegments = allSegments.filter(
      (segment) =>
        segment.grapheme === 't' && segment.soundLabel === '/t/',
    );

    expect(hardCSegments.length).toBeGreaterThan(0);
    expect(tSegments.length).toBeGreaterThan(0);
    expect(
      hardCSegments.every(
        (segment) => segment.audio?.src === gradeTwoPhonemeAudio.hardC,
      ),
    ).toBe(true);
    expect(
      tSegments.every(
        (segment) => segment.audio?.src === gradeTwoPhonemeAudio.tSound,
      ),
    ).toBe(true);
    expect(assetExists(gradeTwoPhonemeAudio.hardC)).toBe(true);
    expect(assetExists(gradeTwoPhonemeAudio.tSound)).toBe(true);
  });
});

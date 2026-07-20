import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  getGradeThreeBlendingLesson,
  getGradeThreeLessonPath,
  getGradeThreeUnitLessons,
  getNextGradeThreeBlendingLesson,
} from './gradeThreeLessonRepository';
import {
  gradeThreeAdvancedConsonantLessons,
  gradeThreeDgeLesson,
  gradeThreeNgLesson,
  gradeThreePhLesson,
  gradeThreeTchLesson,
} from './grade3AdvancedConsonants';

function publicAssetPath(src: string) {
  return resolve(process.cwd(), 'public', src.replace(/^\//, ''));
}

describe('gradeThreeTchLesson', () => {
  it('把 catch、hatch、patch 的 tch 視為同一個 /tʃ/ 聲音單位', () => {
    expect(gradeThreeTchLesson.words.map((word) => word.word)).toEqual([
      'catch',
      'hatch',
      'patch',
    ]);
    expect(
      gradeThreeTchLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['c', 'a', 'tch'],
      ['h', 'a', 'tch'],
      ['p', 'a', 'tch'],
    ]);

    const tchSegments = gradeThreeTchLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'tch'),
    );

    expect(tchSegments.every((segment) => segment.soundLabel === '/tʃ/')).toBe(true);
    expect(new Set(tchSegments.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade3/advanced-consonants/tch-sound.wav']),
    );
  });

  it('把 badge、bridge、fudge 的 dge 視為同一個 /dʒ/ 聲音單位', () => {
    expect(gradeThreeDgeLesson.words.map((word) => word.word)).toEqual([
      'badge',
      'bridge',
      'fudge',
    ]);
    expect(
      gradeThreeDgeLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['b', 'a', 'dge'],
      ['b', 'r', 'i', 'dge'],
      ['f', 'u', 'dge'],
    ]);

    const dgeSegments = gradeThreeDgeLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'dge'),
    );

    expect(dgeSegments.every((segment) => segment.soundLabel === '/dʒ/')).toBe(true);
  });

  it('把 phone、graph、photo 的 ph 視為同一個 /f/ 聲音單位', () => {
    expect(gradeThreePhLesson.words.map((word) => word.word)).toEqual([
      'phone',
      'graph',
      'photo',
    ]);
    expect(
      gradeThreePhLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['ph', 'o', 'n', 'e'],
      ['g', 'r', 'a', 'ph'],
      ['ph', 'o', 't', 'o'],
    ]);

    const phSegments = gradeThreePhLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'ph'),
    );

    expect(phSegments).toHaveLength(3);
    expect(phSegments.every((segment) => segment.soundLabel === '/f/')).toBe(true);
  });

  it('把 ring、king、wing 的 ng 視為同一個 /ŋ/ 聲音單位', () => {
    expect(gradeThreeNgLesson.words.map((word) => word.word)).toEqual([
      'ring',
      'king',
      'wing',
    ]);
    expect(
      gradeThreeNgLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['r', 'i', 'ng'],
      ['k', 'i', 'ng'],
      ['w', 'i', 'ng'],
    ]);

    const ngSegments = gradeThreeNgLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'ng'),
    );

    expect(ngSegments).toHaveLength(3);
    expect(ngSegments.every((segment) => segment.soundLabel === '/ŋ/')).toBe(true);
    expect(new Set(ngSegments.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade3/advanced-consonants/ng-sound.wav']),
    );
  });

  it('圖片、整字與子音組合音訊都是正式可載入資產', () => {
    const sources = [
      ...gradeThreeAdvancedConsonantLessons.flatMap((lesson) =>
        lesson.words.map((word) => word.image.src),
      ),
      ...gradeThreeAdvancedConsonantLessons.flatMap((lesson) =>
        lesson.words.map((word) => word.audio.src),
      ),
      ...gradeThreeAdvancedConsonantLessons.flatMap((lesson) =>
        lesson.words.flatMap((word) =>
          word.segments.flatMap((segment) =>
            ['tch', 'dge', 'ph', 'ng'].includes(segment.grapheme) && segment.audio
              ? [segment.audio.src]
              : [],
          ),
        ),
      ),
    ];

    for (const source of sources) {
      const asset = readFileSync(publicAssetPath(source));

      expect(asset.subarray(0, 4).toString('ascii')).toBe('RIFF');
      expect(['WEBP', 'WAVE']).toContain(asset.subarray(8, 12).toString('ascii'));
      expect(asset.length).toBeGreaterThan(10_000);
    }
  });

  it('由三年級 repository 依序提供 tch、dge、ph 與 ng', () => {
    expect(gradeThreeAdvancedConsonantLessons).toEqual([
      gradeThreeTchLesson,
      gradeThreeDgeLesson,
      gradeThreePhLesson,
      gradeThreeNgLesson,
    ]);
    expect(getGradeThreeBlendingLesson('TCH')).toBe(gradeThreeTchLesson);
    expect(getGradeThreeBlendingLesson('DGE')).toBe(gradeThreeDgeLesson);
    expect(getGradeThreeBlendingLesson('PH')).toBe(gradeThreePhLesson);
    expect(getGradeThreeBlendingLesson('NG')).toBe(gradeThreeNgLesson);
    expect(getGradeThreeUnitLessons('grade-3-advanced-consonants')).toEqual([
      gradeThreeTchLesson,
      gradeThreeDgeLesson,
      gradeThreePhLesson,
      gradeThreeNgLesson,
    ]);
    expect(getNextGradeThreeBlendingLesson(gradeThreeTchLesson)).toBe(
      gradeThreeDgeLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeDgeLesson)).toBe(
      gradeThreePhLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreePhLesson)).toBe(
      gradeThreeNgLesson,
    );
    expect(getGradeThreeLessonPath(gradeThreeTchLesson)).toBe('/grade/3/lesson/tch');
    expect(getGradeThreeLessonPath(gradeThreeDgeLesson)).toBe('/grade/3/lesson/dge');
    expect(getGradeThreeLessonPath(gradeThreePhLesson)).toBe('/grade/3/lesson/ph');
    expect(getGradeThreeLessonPath(gradeThreeNgLesson)).toBe('/grade/3/lesson/ng');
  });
});

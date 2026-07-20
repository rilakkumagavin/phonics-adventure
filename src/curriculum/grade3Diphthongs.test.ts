import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  getNextGradeThreeBlendingLesson,
  getGradeThreeBlendingLesson,
  getGradeThreeLessonPath,
  getGradeThreeUnitLessons,
} from './gradeThreeLessonRepository';
import {
  gradeThreeDiphthongLessons,
  gradeThreeOiLesson,
  gradeThreeOuLesson,
  gradeThreeOwLesson,
  gradeThreeOyLesson,
} from './grade3Diphthongs';

function publicAssetPath(src: string) {
  return resolve(process.cwd(), 'public', src.replace(/^\//, ''));
}

it('把 coin、soil、boil 的 oi 視為同一個 /ɔɪ/ 聲音單位', () => {
  expect(gradeThreeOiLesson.words.map((word) => word.word)).toEqual([
    'coin',
    'soil',
    'boil',
  ]);
  expect(
    gradeThreeOiLesson.words.map((word) =>
      word.segments.map((segment) => segment.grapheme),
    ),
  ).toEqual([
    ['c', 'oi', 'n'],
    ['s', 'oi', 'l'],
    ['b', 'oi', 'l'],
  ]);

  const oiSegments = gradeThreeOiLesson.words.flatMap((word) =>
    word.segments.filter((segment) => segment.grapheme === 'oi'),
  );

  expect(oiSegments.every((segment) => segment.soundLabel === '/ɔɪ/')).toBe(true);
  expect(new Set(oiSegments.map((segment) => segment.audio?.src))).toEqual(
    new Set(['/assets/audio/grade3/diphthongs/oi-sound.wav']),
  );
});

it('把 boy、toy、joy 的 oy 視為同一個 /ɔɪ/ 聲音單位', () => {
  expect(gradeThreeOyLesson.words.map((word) => word.word)).toEqual([
    'boy',
    'toy',
    'joy',
  ]);
  expect(
    gradeThreeOyLesson.words.map((word) =>
      word.segments.map((segment) => segment.grapheme),
    ),
  ).toEqual([
    ['b', 'oy'],
    ['t', 'oy'],
    ['j', 'oy'],
  ]);

  const oySegments = gradeThreeOyLesson.words.flatMap((word) =>
    word.segments.filter((segment) => segment.grapheme === 'oy'),
  );

  expect(oySegments.every((segment) => segment.soundLabel === '/ɔɪ/')).toBe(true);
  expect(new Set(oySegments.map((segment) => segment.audio?.src))).toEqual(
    new Set(['/assets/audio/grade3/diphthongs/oy-sound.wav']),
  );
});

it('把 cloud、house、mouth 的 ou 視為同一個 /aʊ/ 聲音單位', () => {
  expect(gradeThreeOuLesson.words.map((word) => word.word)).toEqual([
    'cloud',
    'house',
    'mouth',
  ]);
  expect(
    gradeThreeOuLesson.words.map((word) =>
      word.segments.map((segment) => segment.grapheme),
    ),
  ).toEqual([
    ['c', 'l', 'ou', 'd'],
    ['h', 'ou', 's', 'e'],
    ['m', 'ou', 'th'],
  ]);

  const ouSegments = gradeThreeOuLesson.words.flatMap((word) =>
    word.segments.filter((segment) => segment.grapheme === 'ou'),
  );

  expect(ouSegments.every((segment) => segment.soundLabel === '/aʊ/')).toBe(true);
  expect(new Set(ouSegments.map((segment) => segment.audio?.src))).toEqual(
    new Set(['/assets/audio/grade3/diphthongs/ou-sound.wav']),
  );
  expect(gradeThreeOuLesson.words[1].segments[3]).toMatchObject({
    grapheme: 'e',
    isSilent: true,
  });
});

it('把 cow、clown、town 的 ow 視為同一個 /aʊ/ 聲音單位', () => {
  expect(gradeThreeOwLesson.words.map((word) => word.word)).toEqual([
    'cow',
    'clown',
    'town',
  ]);
  expect(
    gradeThreeOwLesson.words.map((word) =>
      word.segments.map((segment) => segment.grapheme),
    ),
  ).toEqual([
    ['c', 'ow'],
    ['c', 'l', 'ow', 'n'],
    ['t', 'ow', 'n'],
  ]);

  const owSegments = gradeThreeOwLesson.words.flatMap((word) =>
    word.segments.filter((segment) => segment.grapheme === 'ow'),
  );

  expect(owSegments.every((segment) => segment.soundLabel === '/aʊ/')).toBe(true);
  expect(new Set(owSegments.map((segment) => segment.audio?.src))).toEqual(
    new Set(['/assets/audio/grade3/diphthongs/ow-sound.wav']),
  );
});

it('雙母音課程的圖片與音訊都是正式可載入資產', () => {
  const assets = [
    ...gradeThreeDiphthongLessons.flatMap((lesson) =>
      lesson.words.map((word) => word.image.src),
    ),
    ...gradeThreeDiphthongLessons.flatMap((lesson) =>
      lesson.words.map((word) => word.audio.src),
    ),
    ...gradeThreeDiphthongLessons.flatMap((lesson) =>
      lesson.words.flatMap((word) =>
        word.segments.flatMap((segment) =>
          ['oi', 'oy', 'ou', 'ow'].includes(segment.grapheme) && segment.audio
            ? [segment.audio.src]
            : [],
        ),
      ),
    ),
  ];

  for (const source of assets) {
    const asset = readFileSync(publicAssetPath(source));

    expect(asset.subarray(0, 4).toString('ascii')).toBe('RIFF');
    expect(['WEBP', 'WAVE']).toContain(asset.subarray(8, 12).toString('ascii'));
    expect(asset.length).toBeGreaterThan(10_000);
  }
});

describe('gradeThreeDiphthongLessons repository', () => {
  it('提供第三單元第一課入口', () => {
    expect(gradeThreeDiphthongLessons).toEqual([
      gradeThreeOiLesson,
      gradeThreeOyLesson,
      gradeThreeOuLesson,
      gradeThreeOwLesson,
    ]);
    expect(getGradeThreeBlendingLesson('OI')).toBe(gradeThreeOiLesson);
    expect(getGradeThreeBlendingLesson('OY')).toBe(gradeThreeOyLesson);
    expect(getGradeThreeBlendingLesson('OU')).toBe(gradeThreeOuLesson);
    expect(getGradeThreeBlendingLesson('OW-DIPHTHONG')).toBe(gradeThreeOwLesson);
    expect(getGradeThreeUnitLessons('grade-3-diphthongs')).toEqual([
      gradeThreeOiLesson,
      gradeThreeOyLesson,
      gradeThreeOuLesson,
      gradeThreeOwLesson,
    ]);
    expect(getNextGradeThreeBlendingLesson(gradeThreeOiLesson)).toBe(
      gradeThreeOyLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeOyLesson)).toBe(
      gradeThreeOuLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeOuLesson)).toBe(
      gradeThreeOwLesson,
    );
    expect(getGradeThreeLessonPath(gradeThreeOiLesson)).toBe('/grade/3/lesson/oi');
    expect(getGradeThreeLessonPath(gradeThreeOyLesson)).toBe('/grade/3/lesson/oy');
    expect(getGradeThreeLessonPath(gradeThreeOuLesson)).toBe('/grade/3/lesson/ou');
    expect(getGradeThreeLessonPath(gradeThreeOwLesson)).toBe(
      '/grade/3/lesson/ow-diphthong',
    );
  });
});

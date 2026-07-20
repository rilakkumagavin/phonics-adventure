import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  getGradeThreeBlendingLesson,
  getGradeThreeLessonPath,
  getGradeThreeUnitLessons,
} from './gradeThreeLessonRepository';
import {
  gradeThreeClosedSyllablesLesson,
  gradeThreeCompoundWordsLesson,
  gradeThreeFamiliarChunksLesson,
  gradeThreeMultisyllableLessons,
  gradeThreeMultisyllableChallengeLesson,
  gradeThreeOpenFirstSyllableLesson,
} from './grade3MultisyllableWords';

function publicAssetPath(src: string) {
  return resolve(process.cwd(), 'public', src.replace(/^\//, ''));
}

describe('gradeThreeCompoundWordsLesson', () => {
  it('把三個複合字各拆成兩個可播放的小字', () => {
    expect(gradeThreeCompoundWordsLesson.practiceMode).toBe('syllable');
    expect(gradeThreeCompoundWordsLesson.words.map((word) => word.word)).toEqual([
      'sunset',
      'cupcake',
      'raincoat',
    ]);
    expect(
      gradeThreeCompoundWordsLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['sun', 'set'],
      ['cup', 'cake'],
      ['rain', 'coat'],
    ]);
    expect(
      gradeThreeCompoundWordsLesson.words.every((word) => word.pattern === 'compound'),
    ).toBe(true);
  });

  it('圖片、小字與整字音訊都是正式可載入資產', () => {
    const sources = gradeThreeMultisyllableLessons.flatMap((lesson) =>
      lesson.words.flatMap((word) => [
        word.image.src,
        word.audio.src,
        ...word.segments.flatMap((segment) =>
          segment.audio ? [segment.audio.src] : [],
        ),
      ]),
    );

    for (const source of sources) {
      const asset = readFileSync(publicAssetPath(source));

      expect(asset.subarray(0, 4).toString('ascii')).toBe('RIFF');
      expect(['WEBP', 'WAVE']).toContain(asset.subarray(8, 12).toString('ascii'));
      expect(asset.length).toBeGreaterThan(10_000);
    }
  });

  it('把 rabbit、picnic、magnet 各拆成兩個閉音節', () => {
    expect(gradeThreeClosedSyllablesLesson.words.map((word) => word.word)).toEqual([
      'rabbit',
      'picnic',
      'magnet',
    ]);
    expect(
      gradeThreeClosedSyllablesLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['rab', 'bit'],
      ['pic', 'nic'],
      ['mag', 'net'],
    ]);
    expect(
      gradeThreeClosedSyllablesLesson.words.every(
        (word) => word.pattern === 'two-syllable',
      ),
    ).toBe(true);
  });

  it('把 tiger、robot、paper 的第一段顯示為開音節', () => {
    expect(gradeThreeOpenFirstSyllableLesson.words.map((word) => word.word)).toEqual([
      'tiger',
      'robot',
      'paper',
    ]);
    expect(
      gradeThreeOpenFirstSyllableLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['ti', 'ger'],
      ['ro', 'bot'],
      ['pa', 'per'],
    ]);
    expect(
      gradeThreeOpenFirstSyllableLesson.words.map(
        (word) => word.segments[0].soundLabel,
      ),
    ).toEqual(['/taɪ/', '/roʊ/', '/peɪ/']);
  });

  it('把 rainbow、seaside、daylight 拆成熟悉的母音組合小段', () => {
    expect(gradeThreeFamiliarChunksLesson.words.map((word) => word.word)).toEqual([
      'rainbow',
      'seaside',
      'daylight',
    ]);
    expect(
      gradeThreeFamiliarChunksLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['rain', 'bow'],
      ['sea', 'side'],
      ['day', 'light'],
    ]);
  });

  it('用 sunset、rabbit、rainbow 混合複習三種拆讀方式', () => {
    expect(
      gradeThreeMultisyllableChallengeLesson.words.map((word) => word.word),
    ).toEqual(['sunset', 'rabbit', 'rainbow']);
    expect(
      gradeThreeMultisyllableChallengeLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['sun', 'set'],
      ['rab', 'bit'],
      ['rain', 'bow'],
    ]);
  });

  it('由三年級 repository 依序提供五堂長字拆讀課', () => {
    expect(gradeThreeMultisyllableLessons).toEqual([
      gradeThreeCompoundWordsLesson,
      gradeThreeClosedSyllablesLesson,
      gradeThreeOpenFirstSyllableLesson,
      gradeThreeFamiliarChunksLesson,
      gradeThreeMultisyllableChallengeLesson,
    ]);
    expect(getGradeThreeBlendingLesson('COMPOUND-WORDS')).toBe(
      gradeThreeCompoundWordsLesson,
    );
    expect(getGradeThreeUnitLessons('grade-3-multisyllable-words')).toEqual([
      gradeThreeCompoundWordsLesson,
      gradeThreeClosedSyllablesLesson,
      gradeThreeOpenFirstSyllableLesson,
      gradeThreeFamiliarChunksLesson,
      gradeThreeMultisyllableChallengeLesson,
    ]);
    expect(getGradeThreeLessonPath(gradeThreeCompoundWordsLesson)).toBe(
      '/grade/3/lesson/compound-words',
    );
    expect(getGradeThreeLessonPath(gradeThreeClosedSyllablesLesson)).toBe(
      '/grade/3/lesson/closed-syllables',
    );
    expect(getGradeThreeLessonPath(gradeThreeOpenFirstSyllableLesson)).toBe(
      '/grade/3/lesson/open-first-syllable',
    );
    expect(getGradeThreeLessonPath(gradeThreeFamiliarChunksLesson)).toBe(
      '/grade/3/lesson/familiar-chunks',
    );
    expect(getGradeThreeLessonPath(gradeThreeMultisyllableChallengeLesson)).toBe(
      '/grade/3/lesson/multisyllable-challenge',
    );
  });
});

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  getGradeThreeBlendingLesson,
  getGradeThreeLessonPath,
  getNextGradeThreeBlendingLesson,
  getGradeThreeUnitLessons,
} from './gradeThreeLessonRepository';
import {
  gradeThreeArLesson,
  gradeThreeErLesson,
  gradeThreeIrLesson,
  gradeThreeOrLesson,
  gradeThreeRControlledVowelLessons,
  gradeThreeUrLesson,
} from './grade3RControlledVowels';

function publicAssetPath(src: string) {
  return resolve(process.cwd(), 'public', src.replace(/^\//, ''));
}

function readPcmPeak(buffer: Buffer) {
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.subarray(offset, offset + 4).toString('ascii');
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;
    const chunkEnd = chunkStart + chunkSize;

    if (chunkEnd > buffer.length) {
      throw new Error('WAV chunk 超出檔案邊界。');
    }

    if (chunkId === 'data') {
      let peak = 0;

      for (let index = chunkStart; index + 1 < chunkEnd; index += 2) {
        peak = Math.max(peak, Math.abs(buffer.readInt16LE(index)));
      }

      return peak;
    }

    offset = chunkEnd + (chunkSize % 2);
  }

  throw new Error('WAV 缺少 data chunk。');
}

describe('gradeThreeRControlledVowelLessons', () => {
  it('把 car、star、farm 的 ar 視為同一個 /ɑr/ 聲音單位', () => {
    expect(gradeThreeArLesson.words.map((word) => word.word)).toEqual([
      'car',
      'star',
      'farm',
    ]);
    expect(
      gradeThreeArLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['c', 'ar'],
      ['s', 't', 'ar'],
      ['f', 'ar', 'm'],
    ]);

    const arSegments = gradeThreeArLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'ar'),
    );

    expect(arSegments).toHaveLength(3);
    expect(arSegments.every((segment) => segment.soundLabel === '/ɑr/')).toBe(true);
    expect(new Set(arSegments.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade3/r-controlled-vowels/ar-sound.wav']),
    );
  });

  it('把 corn、fork、horse 的 or 視為同一個 /ɔr/ 聲音單位', () => {
    expect(gradeThreeOrLesson.words.map((word) => word.word)).toEqual([
      'corn',
      'fork',
      'horse',
    ]);
    expect(
      gradeThreeOrLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['c', 'or', 'n'],
      ['f', 'or', 'k'],
      ['h', 'or', 's', 'e'],
    ]);

    const orSegments = gradeThreeOrLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'or'),
    );
    const silentE = gradeThreeOrLesson.words[2].segments[3];

    expect(orSegments).toHaveLength(3);
    expect(orSegments.every((segment) => segment.soundLabel === '/ɔr/')).toBe(true);
    expect(new Set(orSegments.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade3/r-controlled-vowels/or-sound.wav']),
    );
    expect(silentE).toMatchObject({
      grapheme: 'e',
      isSilent: true,
      hint: '字尾 e 不發音，它不會另外發出聲音。',
    });
  });

  it('把 her、fern、germ 的 er 視為同一個 /ɝ/ 聲音單位', () => {
    expect(gradeThreeErLesson.words.map((word) => word.word)).toEqual([
      'her',
      'fern',
      'germ',
    ]);
    expect(
      gradeThreeErLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['h', 'er'],
      ['f', 'er', 'n'],
      ['g', 'er', 'm'],
    ]);

    const erSegments = gradeThreeErLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'er'),
    );

    expect(erSegments).toHaveLength(3);
    expect(erSegments.every((segment) => segment.soundLabel === '/ɝ/')).toBe(true);
    expect(new Set(erSegments.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade3/r-controlled-vowels/er-sound.wav']),
    );
  });

  it('把 bird、girl、shirt 的 ir 視為同一個 /ɝ/ 聲音單位', () => {
    expect(gradeThreeIrLesson.words.map((word) => word.word)).toEqual([
      'bird',
      'girl',
      'shirt',
    ]);
    expect(
      gradeThreeIrLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['b', 'ir', 'd'],
      ['g', 'ir', 'l'],
      ['sh', 'ir', 't'],
    ]);

    const irSegments = gradeThreeIrLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'ir'),
    );

    expect(irSegments).toHaveLength(3);
    expect(irSegments.every((segment) => segment.soundLabel === '/ɝ/')).toBe(true);
    expect(new Set(irSegments.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade3/r-controlled-vowels/ir-sound.wav']),
    );
  });

  it('把 fur、turn、nurse 的 ur 視為同一個 /ɝ/ 聲音單位', () => {
    expect(gradeThreeUrLesson.words.map((word) => word.word)).toEqual([
      'fur',
      'turn',
      'nurse',
    ]);
    expect(
      gradeThreeUrLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['f', 'ur'],
      ['t', 'ur', 'n'],
      ['n', 'ur', 's', 'e'],
    ]);

    const urSegments = gradeThreeUrLesson.words.flatMap((word) =>
      word.segments.filter((segment) => segment.grapheme === 'ur'),
    );
    const silentE = gradeThreeUrLesson.words[2].segments[3];

    expect(urSegments).toHaveLength(3);
    expect(urSegments.every((segment) => segment.soundLabel === '/ɝ/')).toBe(true);
    expect(new Set(urSegments.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade3/r-controlled-vowels/ur-sound.wav']),
    );
    expect(silentE).toMatchObject({
      grapheme: 'e',
      isSilent: true,
      hint: '字尾 e 不發音，它不會另外發出聲音。',
    });
  });

  it('圖片、單字音訊與 R 控制母音音段都是可載入的正式資產', () => {
    const audioSources = new Set([
      ...gradeThreeRControlledVowelLessons.flatMap((lesson) =>
        lesson.words.map((word) => word.audio.src),
      ),
      ...gradeThreeRControlledVowelLessons.flatMap((lesson) =>
        lesson.words.flatMap((word) =>
          word.segments.flatMap((segment) =>
            segment.audio?.src.includes('/r-controlled-vowels/')
              ? [segment.audio.src]
              : [],
          ),
        ),
      ),
    ]);

    for (const lesson of gradeThreeRControlledVowelLessons) {
      for (const word of lesson.words) {
        const image = readFileSync(publicAssetPath(word.image.src));

        expect(image.subarray(0, 4).toString('ascii')).toBe('RIFF');
        expect(image.subarray(8, 12).toString('ascii')).toBe('WEBP');
      }
    }

    for (const source of audioSources) {
      const audio = readFileSync(publicAssetPath(source));

      expect(audio.subarray(0, 4).toString('ascii')).toBe('RIFF');
      expect(audio.subarray(8, 12).toString('ascii')).toBe('WAVE');
      expect(readPcmPeak(audio)).toBeGreaterThan(500);
    }
  });

  it('由三年級 repository 依序提供五種 R 控制母音', () => {
    expect(gradeThreeRControlledVowelLessons).toHaveLength(5);
    expect(getGradeThreeBlendingLesson('AR')).toBe(gradeThreeArLesson);
    expect(getGradeThreeBlendingLesson('OR')).toBe(gradeThreeOrLesson);
    expect(getGradeThreeBlendingLesson('ER')).toBe(gradeThreeErLesson);
    expect(getGradeThreeBlendingLesson('IR')).toBe(gradeThreeIrLesson);
    expect(getGradeThreeBlendingLesson('UR')).toBe(gradeThreeUrLesson);
    expect(getGradeThreeUnitLessons('grade-3-r-controlled-vowels')).toEqual([
      gradeThreeArLesson,
      gradeThreeOrLesson,
      gradeThreeErLesson,
      gradeThreeIrLesson,
      gradeThreeUrLesson,
    ]);
    expect(getNextGradeThreeBlendingLesson(gradeThreeArLesson)).toBe(
      gradeThreeOrLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeOrLesson)).toBe(
      gradeThreeErLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeErLesson)).toBe(
      gradeThreeIrLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeIrLesson)).toBe(
      gradeThreeUrLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeUrLesson)).toBeUndefined();
    expect(getGradeThreeLessonPath(gradeThreeArLesson)).toBe('/grade/3/lesson/ar');
    expect(getGradeThreeLessonPath(gradeThreeOrLesson)).toBe('/grade/3/lesson/or');
    expect(getGradeThreeLessonPath(gradeThreeErLesson)).toBe('/grade/3/lesson/er');
    expect(getGradeThreeLessonPath(gradeThreeIrLesson)).toBe('/grade/3/lesson/ir');
    expect(getGradeThreeLessonPath(gradeThreeUrLesson)).toBe('/grade/3/lesson/ur');
  });
});

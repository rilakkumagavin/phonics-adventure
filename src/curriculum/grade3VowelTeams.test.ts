import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  gradeThreeAlternateVowelTeamsLesson,
  gradeThreeAiAyLesson,
  gradeThreeEeEaLesson,
  gradeThreeOaOwLesson,
  gradeThreeVowelTeamChallengeLesson,
  gradeThreeVowelTeamReviewLesson,
  gradeThreeVowelTeamLessons,
} from './grade3VowelTeams';
import {
  getGradeThreeBlendingLesson,
  getGradeThreeLessonPath,
  getNextGradeThreeBlendingLesson,
} from './gradeThreeLessonRepository';

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

describe('gradeThreeAiAyLesson', () => {
  it('用 rain、train、play 比較 ai 與 ay 的共同聲音', () => {
    expect(gradeThreeAiAyLesson.words.map((word) => word.word)).toEqual([
      'rain',
      'train',
      'play',
    ]);
    expect(
      gradeThreeAiAyLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['r', 'ai', 'n'],
      ['t', 'r', 'ai', 'n'],
      ['p', 'l', 'ay'],
    ]);

    const vowelTeams = gradeThreeAiAyLesson.words.flatMap((word) =>
      word.segments.filter((segment) => ['ai', 'ay'].includes(segment.grapheme)),
    );

    expect(vowelTeams).toHaveLength(3);
    expect(vowelTeams.every((segment) => segment.soundLabel === '/eɪ/')).toBe(true);
    expect(new Set(vowelTeams.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade2/phonemes/long-a.wav']),
    );
  });

  it('用 seed、leaf、beach 比較 ee 與 ea 的共同聲音', () => {
    expect(gradeThreeEeEaLesson.words.map((word) => word.word)).toEqual([
      'seed',
      'leaf',
      'beach',
    ]);
    expect(
      gradeThreeEeEaLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['s', 'ee', 'd'],
      ['l', 'ea', 'f'],
      ['b', 'ea', 'ch'],
    ]);

    const vowelTeams = gradeThreeEeEaLesson.words.flatMap((word) =>
      word.segments.filter((segment) => ['ee', 'ea'].includes(segment.grapheme)),
    );

    expect(vowelTeams).toHaveLength(3);
    expect(vowelTeams.every((segment) => segment.soundLabel === '/iː/')).toBe(true);
    expect(new Set(vowelTeams.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade2/phonemes/long-e.wav']),
    );
    expect(gradeThreeEeEaLesson.words[2].segments[2]).toMatchObject({
      grapheme: 'ch',
      soundLabel: '/tʃ/',
    });
  });

  it('六課圖片與單字音訊都是可載入的正式資產', () => {
    for (const word of gradeThreeVowelTeamLessons.flatMap((lesson) => lesson.words)) {
      const image = readFileSync(publicAssetPath(word.image.src));
      const audio = readFileSync(publicAssetPath(word.audio.src));

      expect(image.subarray(0, 4).toString('ascii')).toBe('RIFF');
      expect(image.subarray(8, 12).toString('ascii')).toBe('WEBP');
      expect(audio.subarray(0, 4).toString('ascii')).toBe('RIFF');
      expect(audio.subarray(8, 12).toString('ascii')).toBe('WAVE');
      expect(readPcmPeak(audio)).toBeGreaterThan(500);
    }
  });

  it('用 boat、goat、snow 比較 oa 與 ow 的共同聲音', () => {
    expect(gradeThreeOaOwLesson.words.map((word) => word.word)).toEqual([
      'boat',
      'goat',
      'snow',
    ]);
    expect(
      gradeThreeOaOwLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['b', 'oa', 't'],
      ['g', 'oa', 't'],
      ['s', 'n', 'ow'],
    ]);

    const vowelTeams = gradeThreeOaOwLesson.words.flatMap((word) =>
      word.segments.filter((segment) => ['oa', 'ow'].includes(segment.grapheme)),
    );

    expect(vowelTeams).toHaveLength(3);
    expect(vowelTeams.every((segment) => segment.soundLabel === '/oʊ/')).toBe(true);
    expect(new Set(vowelTeams.map((segment) => segment.audio?.src))).toEqual(
      new Set(['/assets/audio/grade2/phonemes/long-o.wav']),
    );
  });

  it('用 rain、seed、boat 混合複習三種母音組合聲音', () => {
    expect(gradeThreeVowelTeamReviewLesson.words.map((word) => word.word)).toEqual([
      'rain',
      'seed',
      'boat',
    ]);
    expect(
      gradeThreeVowelTeamReviewLesson.words.map((word) => ({
        grapheme: word.segments[1].grapheme,
        soundLabel: word.segments[1].soundLabel,
      })),
    ).toEqual([
      { grapheme: 'ai', soundLabel: '/eɪ/' },
      { grapheme: 'ee', soundLabel: '/iː/' },
      { grapheme: 'oa', soundLabel: '/oʊ/' },
    ]);
    expect(
      gradeThreeVowelTeamReviewLesson.words.every((word) =>
        word.id.startsWith(gradeThreeVowelTeamReviewLesson.id),
      ),
    ).toBe(true);
  });

  it('用 play、leaf、snow 複習同一聲音的另一種拼法', () => {
    expect(gradeThreeAlternateVowelTeamsLesson.words.map((word) => word.word)).toEqual([
      'play',
      'leaf',
      'snow',
    ]);

    const reviewedTeams = gradeThreeAlternateVowelTeamsLesson.words.flatMap((word) =>
      word.segments
        .filter((segment) => ['ay', 'ea', 'ow'].includes(segment.grapheme))
        .map((segment) => ({
          grapheme: segment.grapheme,
          soundLabel: segment.soundLabel,
        })),
    );

    expect(reviewedTeams).toEqual([
      { grapheme: 'ay', soundLabel: '/eɪ/' },
      { grapheme: 'ea', soundLabel: '/iː/' },
      { grapheme: 'ow', soundLabel: '/oʊ/' },
    ]);
    expect(
      gradeThreeAlternateVowelTeamsLesson.words.every((word) =>
        word.id.startsWith(gradeThreeAlternateVowelTeamsLesson.id),
      ),
    ).toBe(true);
  });

  it('用 train、beach、goat 完成較長單字的綜合拼讀', () => {
    expect(gradeThreeVowelTeamChallengeLesson.words.map((word) => word.word)).toEqual([
      'train',
      'beach',
      'goat',
    ]);
    expect(
      gradeThreeVowelTeamChallengeLesson.words.map((word) =>
        word.segments.map((segment) => segment.grapheme),
      ),
    ).toEqual([
      ['t', 'r', 'ai', 'n'],
      ['b', 'ea', 'ch'],
      ['g', 'oa', 't'],
    ]);

    const chSegment = gradeThreeVowelTeamChallengeLesson.words[1].segments[2];

    expect(chSegment).toMatchObject({
      grapheme: 'ch',
      soundLabel: '/tʃ/',
    });
    expect(chSegment.audio?.src).toBe('/assets/audio/grade2/phonemes/ch-sound.wav');
    expect(
      gradeThreeVowelTeamChallengeLesson.words.every((word) =>
        word.id.startsWith(gradeThreeVowelTeamChallengeLesson.id),
      ),
    ).toBe(true);
  });

  it('可由 repository 載入並建立三年級路徑', () => {
    expect(getGradeThreeBlendingLesson('AI-AY')).toBe(gradeThreeAiAyLesson);
    expect(getGradeThreeBlendingLesson(gradeThreeAiAyLesson.id)).toBe(
      gradeThreeAiAyLesson,
    );
    expect(getGradeThreeLessonPath(gradeThreeAiAyLesson)).toBe('/grade/3/lesson/ai-ay');
    expect(getGradeThreeBlendingLesson('EE-EA')).toBe(gradeThreeEeEaLesson);
    expect(getGradeThreeLessonPath(gradeThreeEeEaLesson)).toBe('/grade/3/lesson/ee-ea');
    expect(getNextGradeThreeBlendingLesson(gradeThreeAiAyLesson)).toBe(
      gradeThreeEeEaLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeEeEaLesson)).toBe(
      gradeThreeOaOwLesson,
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeOaOwLesson)).toBe(
      gradeThreeVowelTeamReviewLesson,
    );
    expect(getGradeThreeLessonPath(gradeThreeVowelTeamReviewLesson)).toBe(
      '/grade/3/lesson/vowel-team-review-1',
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeVowelTeamReviewLesson)).toBe(
      gradeThreeAlternateVowelTeamsLesson,
    );
    expect(getGradeThreeLessonPath(gradeThreeAlternateVowelTeamsLesson)).toBe(
      '/grade/3/lesson/alternate-vowel-teams',
    );
    expect(getNextGradeThreeBlendingLesson(gradeThreeAlternateVowelTeamsLesson)).toBe(
      gradeThreeVowelTeamChallengeLesson,
    );
    expect(getGradeThreeLessonPath(gradeThreeVowelTeamChallengeLesson)).toBe(
      '/grade/3/lesson/vowel-team-challenge',
    );
    expect(
      getNextGradeThreeBlendingLesson(gradeThreeVowelTeamChallengeLesson),
    ).toBeUndefined();
  });
});

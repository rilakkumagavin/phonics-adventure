import { describe, expect, it } from 'vitest';

import { getCourseById } from '../courseRepository';
import { validateCourse } from '../validateCourse';
import { letterACourse } from './a';

const wordIds = new Set(letterACourse.words.map((word) => word.id));
const sentenceIds = new Set(letterACourse.sentences.map((sentence) => sentence.id));
const activityIds = new Set(letterACourse.activities.map((activity) => activity.id));
const reviewIds = new Set(letterACourse.reviewVariants.map((variant) => variant.id));

describe('letterACourse', () => {
  it('通過 validator 且狀態為 draft 而非 ready', () => {
    const result = validateCourse(letterACourse);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(letterACourse.metadata.status).toBe('draft');
    expect(letterACourse.metadata.status).not.toBe('placeholder');
    expect(letterACourse.metadata.status).not.toBe('ready');
  });

  it('有 apple、ant、alligator 三個核心單字', () => {
    const coreWords = letterACourse.words.filter((word) => word.isCore);

    expect(coreWords).toHaveLength(3);
    expect(coreWords.map((word) => word.word)).toEqual(['apple', 'ant', 'alligator']);
    expect(coreWords.find((word) => word.word === 'alligator')?.difficulty).toBe(2);
  });

  it('有至少兩句短句且都引用存在的單字', () => {
    expect(letterACourse.sentences.length).toBeGreaterThanOrEqual(2);
    expect(letterACourse.sentences.map((sentence) => sentence.text)).toEqual([
      'An apple.',
      'I see an ant.',
      'The alligator is big.',
    ]);

    for (const sentence of letterACourse.sentences) {
      expect(sentence.wordIds.every((wordId) => wordIds.has(wordId))).toBe(true);
    }
  });

  it('有足夠的聽說讀活動', () => {
    const listeningCount = letterACourse.activities.filter((activity) =>
      activity.skills.includes('listening'),
    ).length;
    const speakingCount = letterACourse.activities.filter((activity) =>
      activity.skills.includes('speaking'),
    ).length;
    const readingCount = letterACourse.activities.filter((activity) =>
      activity.skills.includes('reading'),
    ).length;

    expect(listeningCount).toBeGreaterThanOrEqual(2);
    expect(speakingCount).toBeGreaterThanOrEqual(1);
    expect(readingCount).toBeGreaterThanOrEqual(1);
  });

  it('有至少三個複習變化且不是完全相同題型', () => {
    expect(letterACourse.reviewVariants.length).toBeGreaterThanOrEqual(3);
    expect(
      new Set(letterACourse.reviewVariants.map((variant) => variant.activityType)),
    ).toEqual(
      new Set([
        'listen-and-choose',
        'letter-image-match',
        'record-and-playback',
        'sound-sort',
      ]),
    );
  });

  it('核心單字與短句的圖片及候選音訊皆可使用', () => {
    for (const word of letterACourse.words.filter((item) => item.isCore)) {
      expect(word.image.id).toBeTruthy();
      expect(word.image.alt).toBeTruthy();
      expect(word.image.status).toBe('ready');
      expect(word.image.src).toMatch(
        /^\/assets\/images\/courses\/a\/a-(apple|ant|alligator)-core\.webp$/,
      );
      expect(word.audio.id).toBeTruthy();
      expect(word.audio.transcript).toBe(word.word);
      expect(word.audio.status).toBe('ready');
      expect(word.audio.src).toMatch(/^\/assets\/audio\/courses\/a\/.+\.wav$/);
    }

    const expectedSentenceImages = new Map([
      ['a-sentence-apple', '/assets/images/courses/a/a-sentence-an-apple.webp'],
      ['a-sentence-ant', '/assets/images/courses/a/a-sentence-see-ant.webp'],
      [
        'a-sentence-alligator',
        '/assets/images/courses/a/a-sentence-big-alligator.webp',
      ],
    ]);

    for (const sentence of letterACourse.sentences) {
      expect(sentence.audio.status).toBe('ready');
      expect(sentence.audio.src).toMatch(/^\/assets\/audio\/courses\/a\/.+\.wav$/);
      expect(sentence.image?.id).toBeTruthy();
      expect(sentence.image?.alt).toBeTruthy();
      expect(sentence.image?.status).toBe('ready');
      expect(sentence.image?.src).toBe(expectedSentenceImages.get(sentence.id));
    }
  });

  it('A 活動共用干擾圖已切到正式 shared 資產', () => {
    const expectedDistractorImages = new Map([
      ['a-distractor-ball', '/assets/images/shared/shared-ball-core.webp'],
      ['a-distractor-cat', '/assets/images/shared/shared-cat-core.webp'],
      ['a-distractor-dog', '/assets/images/shared/shared-dog-core.webp'],
    ]);
    const activity = letterACourse.activities.find(
      (item) => item.id === 'a-listen-initial-sound-02',
    );

    expect(activity?.type).toBe('listen-and-choose');

    if (!activity || activity.type !== 'listen-and-choose') {
      throw new Error('a-listen-initial-sound-02 should be listen-and-choose');
    }

    for (const [wordId, src] of expectedDistractorImages) {
      const choice = activity.choices.find((item) => item.wordId === wordId);

      expect(choice?.image.id).toBeTruthy();
      expect(choice?.image.alt).toBeTruthy();
      expect(choice?.image.status).toBe('ready');
      expect(choice?.image.src).toBe(src);
    }
  });

  it('A 字母與圖片配對活動使用三個核心單字正式圖片', () => {
    const activity = letterACourse.activities.find(
      (item) => item.id === 'a-letter-image-match-01',
    );

    expect(activity?.type).toBe('letter-image-match');

    if (!activity || activity.type !== 'letter-image-match') {
      throw new Error('a-letter-image-match-01 should be letter-image-match');
    }

    expect(activity.pairs).toHaveLength(3);
    expect(activity.pairs.map((pair) => pair.letter)).toEqual(['A', 'a', 'A']);
    expect(activity.pairs.map((pair) => pair.wordId)).toEqual([
      'a-apple',
      'a-ant',
      'a-alligator',
    ]);

    for (const pair of activity.pairs) {
      expect(pair.image.status).toBe('ready');
      expect(pair.image.src).toMatch(
        /^\/assets\/images\/courses\/a\/a-(apple|ant|alligator)-core\.webp$/,
      );
    }
  });

  it('A 聲音分類活動使用 A 核心圖與 shared 干擾圖', () => {
    const activity = letterACourse.activities.find(
      (item) => item.id === 'a-sound-sort-01',
    );

    expect(activity?.type).toBe('sound-sort');

    if (!activity || activity.type !== 'sound-sort') {
      throw new Error('a-sound-sort-01 should be sound-sort');
    }

    expect(activity.groups.map((group) => group.label)).toEqual([
      'A 的短短聲音',
      '其他聲音',
    ]);
    expect(activity.items).toHaveLength(6);
    expect(
      activity.items.filter((item) => item.targetGroupId === 'a-sound-sort-a'),
    ).toHaveLength(3);
    expect(
      activity.items.filter((item) => item.targetGroupId === 'a-sound-sort-other'),
    ).toHaveLength(3);

    for (const item of activity.items) {
      expect(item.image.status).toBe('ready');
      expect(item.image.src).toMatch(
        /^\/assets\/images\/(courses\/a\/a-(apple|ant|alligator)-core|shared\/shared-(ball|cat|dog)-core)\.webp$/,
      );
    }
  });

  it('所有 activity references 有效', () => {
    for (const activity of letterACourse.activities) {
      expect(activity.targetLetterIds).toContain('letter-a');
      expect(activity.soundTargetIds).toContain('a-short-sound');
      expect(activity.wordIds.every((wordId) => wordIds.has(wordId))).toBe(true);
      expect(
        activity.sentenceIds.every((sentenceId) => sentenceIds.has(sentenceId)),
      ).toBe(true);
    }
  });

  it('不存在重複 ID', () => {
    expect(wordIds.size).toBe(letterACourse.words.length);
    expect(sentenceIds.size).toBe(letterACourse.sentences.length);
    expect(activityIds.size).toBe(letterACourse.activities.length);
    expect(reviewIds.size).toBe(letterACourse.reviewVariants.length);
  });

  it('A 課程可由 repository 正確取得', () => {
    expect(getCourseById('letter-a')).toBe(letterACourse);
  });

  it('內容沒有混入長母音或拼寫測驗要求', () => {
    const studentFacingContent = [
      ...letterACourse.learningObjectives.map((objective) => objective.description),
      ...letterACourse.activities.flatMap((activity) => [
        activity.title,
        activity.studentInstruction,
      ]),
      ...letterACourse.reviewVariants.map((variant) => variant.priorityHint ?? ''),
    ].join(' ');

    expect(studentFacingContent).not.toContain('a_e');
    expect(studentFacingContent).not.toContain('ai');
    expect(studentFacingContent).not.toContain('ay');
    expect(studentFacingContent).not.toContain('拼寫');
    expect(studentFacingContent).toContain('不是拼字測驗');
  });
});

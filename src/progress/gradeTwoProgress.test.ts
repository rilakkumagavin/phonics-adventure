import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { learningProgressStorageKey } from './learningProgress';
import {
  clearGradeTwoProgress,
  completeGradeTwoLesson,
  createEmptyGradeTwoProgress,
  gradeTwoProgressStorageKey,
  isGradeTwoWordPracticeComplete,
  loadGradeTwoProgress,
  recordGradeTwoBlendPractice,
  recordGradeTwoSegmentPractice,
} from './gradeTwoProgress';

const lessonId = 'grade-2-short-a-lesson-01';
const wordId = 'grade-2-short-a-cat';
const segmentId = 'grade-2-short-a-cat-c';

describe('gradeTwoProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('沒有資料時回傳獨立的空白二年級進度', () => {
    expect(loadGradeTwoProgress()).toEqual(createEmptyGradeTwoProgress());
    expect(gradeTwoProgressStorageKey).not.toBe(learningProgressStorageKey);
  });

  it('累加音段與整字播放次數並保留本地練習日期', () => {
    const practicedAt = new Date(2026, 6, 18, 23, 30);

    recordGradeTwoSegmentPractice({
      lessonId,
      wordId,
      segmentId,
      practicedAt,
    });
    recordGradeTwoSegmentPractice({
      lessonId,
      wordId,
      segmentId,
      practicedAt,
    });
    const result = recordGradeTwoBlendPractice({
      lessonId,
      wordId,
      practicedAt,
    });
    const lesson = result.progress.lessons[lessonId];
    const word = lesson.words[wordId];

    expect(result.saved).toBe(true);
    expect(word.segmentPracticeCounts[segmentId]).toBe(2);
    expect(word.blendPlayCount).toBe(1);
    expect(word.lastPracticedDate).toBe('2026-07-18');
    expect(lesson.lastPracticedDate).toBe('2026-07-18');
  });

  it('所有必要音段與整字都播放後才算完成單字', () => {
    const segmentIds = [
      'grade-2-short-a-cat-c',
      'grade-2-short-a-cat-a',
      'grade-2-short-a-cat-t',
    ];

    for (const requiredSegmentId of segmentIds) {
      recordGradeTwoSegmentPractice({
        lessonId,
        wordId,
        segmentId: requiredSegmentId,
      });
    }

    const beforeBlend =
      loadGradeTwoProgress().lessons[lessonId].words[wordId];

    expect(isGradeTwoWordPracticeComplete(beforeBlend, segmentIds)).toBe(false);

    recordGradeTwoBlendPractice({ lessonId, wordId });

    const afterBlend =
      loadGradeTwoProgress().lessons[lessonId].words[wordId];

    expect(isGradeTwoWordPracticeComplete(afterBlend, segmentIds)).toBe(true);
    expect(
      isGradeTwoWordPracticeComplete(afterBlend, [...segmentIds, 'missing-segment']),
    ).toBe(false);
  });

  it('完成課程後保留第一次完成時間並可繼續練習', () => {
    const firstCompletion = new Date('2026-07-18T10:00:00.000Z');
    const replayDate = new Date('2026-07-19T10:00:00.000Z');

    completeGradeTwoLesson({ lessonId, completedAt: firstCompletion });
    completeGradeTwoLesson({ lessonId, completedAt: replayDate });
    const progress = loadGradeTwoProgress();
    const lesson = progress.lessons[lessonId];

    expect(lesson.completed).toBe(true);
    expect(lesson.completedAt).toBe(firstCompletion.toISOString());
    expect(progress.updatedAt).toBe(replayDate.toISOString());
  });

  it('二年級寫入不會覆蓋既有 A 到 Z 進度', () => {
    const existingLetterProgress = '{"version":1,"sentinel":"keep-me"}';

    localStorage.setItem(learningProgressStorageKey, existingLetterProgress);
    recordGradeTwoSegmentPractice({ lessonId, wordId, segmentId });

    expect(localStorage.getItem(learningProgressStorageKey)).toBe(
      existingLetterProgress,
    );
    expect(localStorage.getItem(gradeTwoProgressStorageKey)).toContain(
      `"lessonId":"${lessonId}"`,
    );
  });

  it('損壞或欄位不合法的資料會安全回到空進度', () => {
    localStorage.setItem(gradeTwoProgressStorageKey, '{broken');
    expect(loadGradeTwoProgress()).toEqual(createEmptyGradeTwoProgress());

    localStorage.setItem(
      gradeTwoProgressStorageKey,
      JSON.stringify({
        version: 1,
        updatedAt: null,
        lessons: {
          [lessonId]: {
            lessonId,
            completed: false,
            completedAt: null,
            lastPracticedDate: null,
            words: {
              [wordId]: {
                wordId,
                segmentPracticeCounts: { [segmentId]: -1 },
                blendPlayCount: 0,
                lastPracticedDate: null,
              },
            },
          },
        },
      }),
    );

    expect(loadGradeTwoProgress()).toEqual(createEmptyGradeTwoProgress());
  });

  it('儲存失敗或瀏覽器拒絕 localStorage 時不拋出例外', () => {
    const unavailableStorage = {
      getItem: () => null,
      setItem: () => {
        throw new DOMException('Storage quota exceeded', 'QuotaExceededError');
      },
    } as unknown as Storage;

    expect(
      recordGradeTwoBlendPractice(
        { lessonId, wordId },
        unavailableStorage,
      ).saved,
    ).toBe(false);

    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage access denied', 'SecurityError');
    });

    expect(loadGradeTwoProgress()).toEqual(createEmptyGradeTwoProgress());
    expect(recordGradeTwoSegmentPractice({ lessonId, wordId, segmentId }).saved).toBe(
      false,
    );
    expect(clearGradeTwoProgress()).toBe(false);
  });

  it('正常資料重新載入後完整保留', () => {
    recordGradeTwoSegmentPractice({ lessonId, wordId, segmentId });
    recordGradeTwoBlendPractice({ lessonId, wordId });
    completeGradeTwoLesson({ lessonId });

    const firstLoad = loadGradeTwoProgress();
    const secondLoad = loadGradeTwoProgress();

    expect(secondLoad).toEqual(firstLoad);
    expect(secondLoad.lessons[lessonId].words[wordId].blendPlayCount).toBe(1);
  });
});

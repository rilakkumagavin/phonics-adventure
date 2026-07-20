import { beforeEach, describe, expect, it } from 'vitest';

import { learningProgressStorageKey } from './learningProgress';
import { gradeTwoProgressStorageKey } from './gradeTwoProgress';
import {
  clearGradeThreeProgress,
  completeGradeThreeLesson,
  createEmptyGradeThreeProgress,
  gradeThreeProgressStorageKey,
  isGradeThreeWordPracticeComplete,
  loadGradeThreeProgress,
  recordGradeThreeBlendPractice,
  recordGradeThreeSegmentPractice,
  saveGradeThreeProgress,
} from './gradeThreeProgress';

const lessonId = 'grade-3-ai-ay-lesson-01';
const wordId = 'grade-3-ai-ay-lesson-01-rain';
const segmentId = 'grade-3-ai-ay-lesson-01-rain-1-r';

describe('gradeThreeProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('使用獨立版本與儲存鍵', () => {
    expect(loadGradeThreeProgress()).toEqual(createEmptyGradeThreeProgress());
    expect(gradeThreeProgressStorageKey).not.toBe(learningProgressStorageKey);
    expect(gradeThreeProgressStorageKey).not.toBe(gradeTwoProgressStorageKey);
  });

  it('儲存三年級紀錄時保留 A-Z 與二年級資料', () => {
    localStorage.setItem(learningProgressStorageKey, 'keep-letters');
    localStorage.setItem(gradeTwoProgressStorageKey, 'keep-grade-two');

    expect(recordGradeThreeSegmentPractice({ lessonId, wordId, segmentId }).saved).toBe(
      true,
    );
    expect(localStorage.getItem(learningProgressStorageKey)).toBe('keep-letters');
    expect(localStorage.getItem(gradeTwoProgressStorageKey)).toBe('keep-grade-two');
    expect(localStorage.getItem(gradeThreeProgressStorageKey)).not.toBeNull();
  });

  it('記錄每個音段、整字播放與最近練習日期', () => {
    const practicedAt = new Date(2026, 6, 20, 10, 0);

    recordGradeThreeSegmentPractice({
      lessonId,
      wordId,
      segmentId,
      practicedAt,
    });
    recordGradeThreeSegmentPractice({
      lessonId,
      wordId,
      segmentId,
      practicedAt,
    });
    recordGradeThreeBlendPractice({ lessonId, wordId, practicedAt });

    const lesson = loadGradeThreeProgress().lessons[lessonId];
    const word = lesson.words[wordId];

    expect(word.segmentPracticeCounts[segmentId]).toBe(2);
    expect(word.blendPlayCount).toBe(1);
    expect(word.lastPracticedDate).toBe('2026-07-20');
    expect(lesson.practiceCount).toBe(3);
    expect(lesson.lastPracticedDate).toBe('2026-07-20');
  });

  it('只有聽完所有音段及整字才算完成一個字', () => {
    const segmentIds = [
      'grade-3-ai-ay-lesson-01-rain-1-r',
      'grade-3-ai-ay-lesson-01-rain-2-ai',
      'grade-3-ai-ay-lesson-01-rain-3-n',
    ];

    for (const requiredSegmentId of segmentIds) {
      recordGradeThreeSegmentPractice({
        lessonId,
        wordId,
        segmentId: requiredSegmentId,
      });
    }

    expect(
      isGradeThreeWordPracticeComplete(
        loadGradeThreeProgress().lessons[lessonId].words[wordId],
        segmentIds,
      ),
    ).toBe(false);

    recordGradeThreeBlendPractice({ lessonId, wordId });

    expect(
      isGradeThreeWordPracticeComplete(
        loadGradeThreeProgress().lessons[lessonId].words[wordId],
        segmentIds,
      ),
    ).toBe(true);
  });

  it('完成課程後保留完成時間', () => {
    const completedAt = new Date('2026-07-20T10:00:00.000Z');

    completeGradeThreeLesson({ lessonId, completedAt });
    const lesson = loadGradeThreeProgress().lessons[lessonId];

    expect(lesson.completed).toBe(true);
    expect(lesson.completedAt).toBe(completedAt.toISOString());
  });

  it('拒絕損壞或不合法的資料', () => {
    localStorage.setItem(gradeThreeProgressStorageKey, '{broken');
    expect(loadGradeThreeProgress()).toEqual(createEmptyGradeThreeProgress());

    localStorage.setItem(
      gradeThreeProgressStorageKey,
      JSON.stringify({
        version: 1,
        updatedAt: null,
        lessons: {
          'grade-3-example': {
            lessonId: 'grade-3-example',
            completed: false,
            completedAt: null,
            practiceCount: -1,
            lastPracticedDate: null,
            words: {},
          },
        },
      }),
    );
    expect(loadGradeThreeProgress()).toEqual(createEmptyGradeThreeProgress());
  });

  it('只清除三年級進度', () => {
    localStorage.setItem(learningProgressStorageKey, 'keep-letters');
    localStorage.setItem(gradeTwoProgressStorageKey, 'keep-grade-two');
    saveGradeThreeProgress(createEmptyGradeThreeProgress());

    expect(clearGradeThreeProgress()).toBe(true);
    expect(localStorage.getItem(gradeThreeProgressStorageKey)).toBeNull();
    expect(localStorage.getItem(learningProgressStorageKey)).toBe('keep-letters');
    expect(localStorage.getItem(gradeTwoProgressStorageKey)).toBe('keep-grade-two');
  });
});

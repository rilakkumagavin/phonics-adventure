import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  clearLearningProgress,
  createEmptyLearningProgress,
  getLearningProgressSummary,
  learningProgressStorageKey,
  loadLearningProgress,
  recordLearningActivity,
  recordLearningActivityWithResult,
} from './learningProgress';

describe('learningProgress', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('沒有本機資料時回傳空進度', () => {
    expect(loadLearningProgress()).toEqual(createEmptyLearningProgress());

    const summary = getLearningProgressSummary(loadLearningProgress());

    expect(summary.completedLetters).toBe(0);
    expect(summary.totalLetters).toBe(26);
    expect(summary.listening).toBe(0);
    expect(summary.nextReviewDate).toBeNull();
  });

  it('完成活動後寫入字母與能力熟練度', () => {
    const progress = recordLearningActivity({
      activityId: 'a-listen-initial-sound-02',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    const summary = getLearningProgressSummary(progress);

    expect(progress.version).toBe(1);
    expect(progress.letters.a.completed).toBe(false);
    expect(progress.letters.a.skills.listening.correctCount).toBe(1);
    expect(progress.letters.a.skills.listening.mastery).toBe(25);
    expect(progress.letters.a.skills.listening.lastReviewDate).toBe('2026-07-01');
    expect(progress.letters.a.skills.listening.nextReviewDate).toBe('2026-07-02');
    expect(summary.completedLetters).toBe(0);
    expect(summary.correctCount).toBe(1);
    expect(localStorage.getItem(learningProgressStorageKey)).toContain('"version":1');
  });

  it('同一天真正重玩同一活動會累加學習紀錄', () => {
    const input = {
      activityId: 'a-sound-sort-01',
      letterId: 'a',
      skill: 'listening' as const,
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    };

    recordLearningActivity(input);
    const progress = recordLearningActivity(input);

    expect(progress.letters.a.skills.listening.correctCount).toBe(2);
    expect(progress.letters.a.skills.listening.mastery).toBe(50);
    expect(getLearningProgressSummary(progress).correctCount).toBe(2);
  });

  it('聽力、口說與閱讀都練習後才完成字母', () => {
    recordLearningActivity({
      activityId: 'a-listen-initial-sound-02',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    const afterSpeaking = recordLearningActivity({
      activityId: 'a-record-and-playback-01',
      letterId: 'a',
      skill: 'speaking',
      completedAt: new Date('2026-07-01T10:05:00.000Z'),
    });

    expect(afterSpeaking.letters.a.completed).toBe(false);
    expect(afterSpeaking.letters.a.completedAt).toBeNull();

    const afterReading = recordLearningActivity({
      activityId: 'a-letter-image-match-01',
      letterId: 'a',
      skill: 'reading',
      completedAt: new Date('2026-07-01T10:10:00.000Z'),
    });

    expect(afterReading.letters.a.completed).toBe(true);
    expect(afterReading.letters.a.completedAt).toBe('2026-07-01T10:10:00.000Z');
    expect(getLearningProgressSummary(afterReading).completedLetters).toBe(1);
  });

  it('完成活動時一併記錄錯誤嘗試並安排隔日複習', () => {
    const progress = recordLearningActivity({
      activityId: 'b-read-word-picture-01',
      letterId: 'b',
      skill: 'reading',
      mistakeCount: 2,
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    const reading = progress.letters.b.skills.reading;

    expect(reading.correctCount).toBe(1);
    expect(reading.wrongCount).toBe(2);
    expect(reading.mastery).toBe(5);
    expect(reading.nextReviewDate).toBe('2026-07-02');
    expect(getLearningProgressSummary(progress).wrongCount).toBe(2);
  });

  it('損壞的 localStorage 資料會回到空進度', () => {
    localStorage.setItem(learningProgressStorageKey, '{broken');

    expect(loadLearningProgress()).toEqual(createEmptyLearningProgress());
  });

  it('本機儲存寫入失敗時回傳未儲存狀態且不拋出例外', () => {
    const unavailableStorage = {
      getItem: () => null,
      setItem: () => {
        throw new DOMException('Storage quota exceeded', 'QuotaExceededError');
      },
    } as unknown as Storage;

    const result = recordLearningActivityWithResult(
      {
        activityId: 'a-listen-initial-sound-02',
        letterId: 'a',
        skill: 'listening',
      },
      unavailableStorage,
    );

    expect(result.saved).toBe(false);
    expect(result.progress.letters.a.completed).toBe(false);
  });

  it('瀏覽器拒絕存取 localStorage 時所有操作都安全降級', () => {
    vi.spyOn(window, 'localStorage', 'get').mockImplementation(() => {
      throw new DOMException('Storage access denied', 'SecurityError');
    });

    expect(loadLearningProgress()).toEqual(createEmptyLearningProgress());

    const result = recordLearningActivityWithResult({
      activityId: 'a-listen-initial-sound-02',
      letterId: 'a',
      skill: 'listening',
    });

    expect(result.saved).toBe(false);
    expect(result.progress.letters.a.completed).toBe(false);
    expect(clearLearningProgress()).toBe(false);
  });

  it('巢狀欄位損壞或字母識別碼無效時回到空進度', () => {
    const validProgress = recordLearningActivity({
      activityId: 'a-listen-initial-sound-02',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    const missingSkills = structuredClone(validProgress) as unknown as {
      letters: { a: { skills?: unknown } };
    };
    const negativeCount = structuredClone(validProgress);
    const outOfScopeLetter = structuredClone(validProgress);
    const invalidReviewDate = structuredClone(validProgress);
    const impossibleReviewDate = structuredClone(validProgress);

    delete missingSkills.letters.a.skills;
    negativeCount.letters.a.skills.listening.wrongCount = -1;
    outOfScopeLetter.letters.aa = {
      ...structuredClone(outOfScopeLetter.letters.a),
      letterId: 'aa',
    };
    invalidReviewDate.letters.a.skills.listening.nextReviewDate = 'tomorrow';
    impossibleReviewDate.letters.a.skills.listening.nextReviewDate = '2026-02-31';

    for (const invalidProgress of [
      missingSkills,
      negativeCount,
      outOfScopeLetter,
      invalidReviewDate,
      impossibleReviewDate,
    ]) {
      localStorage.setItem(learningProgressStorageKey, JSON.stringify(invalidProgress));
      expect(loadLearningProgress()).toEqual(createEmptyLearningProgress());
    }
  });

  it('正常 version 1 資料可以完整 round-trip', () => {
    const savedProgress = recordLearningActivity({
      activityId: 'f-read-word-picture-01',
      letterId: 'f',
      skill: 'reading',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });

    expect(loadLearningProgress()).toEqual(savedProgress);
  });

  it('接近本地午夜完成仍使用當地日曆日期', () => {
    const progress = recordLearningActivity({
      activityId: 'c-read-word-picture-01',
      letterId: 'c',
      skill: 'reading',
      completedAt: new Date(2026, 6, 1, 23, 30),
    });
    const reading = progress.letters.c.skills.reading;

    expect(reading.lastReviewDate).toBe('2026-07-01');
    expect(reading.nextReviewDate).toBe('2026-07-02');
  });

  it('G 到 Z 的學習紀錄可與既有 A 到 F 資料共同保留', () => {
    recordLearningActivity({
      activityId: 'a-listen-word-01',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    recordLearningActivity({
      activityId: 'g-listen-word-01',
      letterId: 'g',
      skill: 'listening',
      completedAt: new Date('2026-07-02T10:00:00.000Z'),
    });
    const progress = recordLearningActivity({
      activityId: 'z-read-word-01',
      letterId: 'z',
      skill: 'reading',
      completedAt: new Date('2026-07-03T10:00:00.000Z'),
    });

    expect(progress.letters.a.skills.listening.correctCount).toBe(1);
    expect(progress.letters.g.skills.listening.correctCount).toBe(1);
    expect(progress.letters.z.skills.reading.correctCount).toBe(1);
    expect(loadLearningProgress()).toEqual(progress);
  });

  it('直接寫入非單一英文字母會被忽略', () => {
    const progress = recordLearningActivity({
      activityId: 'invalid-activity',
      letterId: 'aa',
      skill: 'listening',
    });

    expect(progress).toEqual(createEmptyLearningProgress());
    expect(localStorage.getItem(learningProgressStorageKey)).toBeNull();
  });

  it('可以清除本機進度', () => {
    recordLearningActivity({
      activityId: 'a-record-and-playback-01',
      letterId: 'a',
      skill: 'speaking',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });

    clearLearningProgress();

    expect(localStorage.getItem(learningProgressStorageKey)).toBeNull();
  });
});

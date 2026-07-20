import { isValidDateKey, toLocalDateKey } from './localDate';

export const gradeThreeProgressStorageKey = 'phonics-adventure.grade-3-progress.v1';

export interface GradeThreeWordProgress {
  wordId: string;
  segmentPracticeCounts: Record<string, number>;
  blendPlayCount: number;
  lastPracticedDate: string | null;
}

export interface GradeThreeLessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string | null;
  practiceCount: number;
  lastPracticedDate: string | null;
  words: Record<string, GradeThreeWordProgress>;
}

export interface GradeThreeProgress {
  version: 1;
  updatedAt: string | null;
  lessons: Record<string, GradeThreeLessonProgress>;
}

export interface GradeThreeProgressResult {
  progress: GradeThreeProgress;
  saved: boolean;
}

interface GradeThreePracticeInput {
  lessonId: string;
  wordId: string;
  practicedAt?: Date;
}

export interface RecordGradeThreeSegmentPracticeInput extends GradeThreePracticeInput {
  segmentId: string;
}

export interface CompleteGradeThreeLessonInput {
  lessonId: string;
  completedAt?: Date;
}

const progressIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createEmptyGradeThreeProgress(): GradeThreeProgress {
  return {
    version: 1,
    updatedAt: null,
    lessons: {},
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function isProgressId(value: unknown): value is string {
  return typeof value === 'string' && progressIdPattern.test(value);
}

function isNullableTimestamp(value: unknown) {
  return (
    value === null || (typeof value === 'string' && !Number.isNaN(Date.parse(value)))
  );
}

function isNullableDateKey(value: unknown) {
  return value === null || isValidDateKey(value);
}

function isCount(value: unknown) {
  return Number.isSafeInteger(value) && Number(value) >= 0;
}

function isWordProgress(
  value: unknown,
  expectedWordId: string,
): value is GradeThreeWordProgress {
  if (!isRecord(value) || !isRecord(value.segmentPracticeCounts)) {
    return false;
  }

  return (
    value.wordId === expectedWordId &&
    isCount(value.blendPlayCount) &&
    isNullableDateKey(value.lastPracticedDate) &&
    Object.entries(value.segmentPracticeCounts).every(
      ([segmentId, count]) => isProgressId(segmentId) && isCount(count),
    )
  );
}

function isLessonProgress(
  value: unknown,
  expectedLessonId: string,
): value is GradeThreeLessonProgress {
  if (!isRecord(value) || !isRecord(value.words)) {
    return false;
  }

  const completedAtIsValid =
    value.completed === true
      ? typeof value.completedAt === 'string' &&
        !Number.isNaN(Date.parse(value.completedAt))
      : value.completed === false && value.completedAt === null;

  return (
    value.lessonId === expectedLessonId &&
    completedAtIsValid &&
    isCount(value.practiceCount) &&
    isNullableDateKey(value.lastPracticedDate) &&
    Object.entries(value.words).every(
      ([wordId, word]) => isProgressId(wordId) && isWordProgress(word, wordId),
    )
  );
}

function isGradeThreeProgress(value: unknown): value is GradeThreeProgress {
  if (!isRecord(value) || !isRecord(value.lessons)) {
    return false;
  }

  return (
    value.version === 1 &&
    isNullableTimestamp(value.updatedAt) &&
    Object.entries(value.lessons).every(
      ([lessonId, lesson]) =>
        isProgressId(lessonId) && isLessonProgress(lesson, lessonId),
    )
  );
}

function getStorage(storage?: Storage) {
  if (storage) {
    return storage;
  }

  if (typeof window === 'undefined') {
    return undefined;
  }

  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

function isUsableDate(date: Date) {
  return !Number.isNaN(date.getTime());
}

function incrementCount(value: number) {
  return value < Number.MAX_SAFE_INTEGER ? value + 1 : value;
}

function createLessonProgress(lessonId: string): GradeThreeLessonProgress {
  return {
    lessonId,
    completed: false,
    completedAt: null,
    practiceCount: 0,
    lastPracticedDate: null,
    words: {},
  };
}

function createWordProgress(wordId: string): GradeThreeWordProgress {
  return {
    wordId,
    segmentPracticeCounts: {},
    blendPlayCount: 0,
    lastPracticedDate: null,
  };
}

export function loadGradeThreeProgress(storage?: Storage): GradeThreeProgress {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return createEmptyGradeThreeProgress();
  }

  try {
    const rawValue = targetStorage.getItem(gradeThreeProgressStorageKey);

    if (!rawValue) {
      return createEmptyGradeThreeProgress();
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    return isGradeThreeProgress(parsedValue)
      ? parsedValue
      : createEmptyGradeThreeProgress();
  } catch {
    return createEmptyGradeThreeProgress();
  }
}

export function saveGradeThreeProgress(
  progress: GradeThreeProgress,
  storage?: Storage,
) {
  const targetStorage = getStorage(storage);

  if (!targetStorage || !isGradeThreeProgress(progress)) {
    return false;
  }

  try {
    targetStorage.setItem(gradeThreeProgressStorageKey, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function clearGradeThreeProgress(storage?: Storage) {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return false;
  }

  try {
    targetStorage.removeItem(gradeThreeProgressStorageKey);
    return true;
  } catch {
    return false;
  }
}

export function isGradeThreeWordPracticeComplete(
  wordProgress: GradeThreeWordProgress | undefined,
  requiredSegmentIds: readonly string[],
) {
  return Boolean(
    wordProgress &&
    requiredSegmentIds.length > 0 &&
    wordProgress.blendPlayCount > 0 &&
    requiredSegmentIds.every(
      (segmentId) => (wordProgress.segmentPracticeCounts[segmentId] ?? 0) > 0,
    ),
  );
}

function getPracticeRecords(
  progress: GradeThreeProgress,
  lessonId: string,
  wordId: string,
) {
  const lesson = progress.lessons[lessonId] ?? createLessonProgress(lessonId);
  const word = lesson.words[wordId] ?? createWordProgress(wordId);

  lesson.words[wordId] = word;
  progress.lessons[lessonId] = lesson;

  return { lesson, word };
}

export function recordGradeThreeSegmentPractice(
  input: RecordGradeThreeSegmentPracticeInput,
  storage?: Storage,
): GradeThreeProgressResult {
  const progress = loadGradeThreeProgress(storage);
  const practicedAt = input.practicedAt ?? new Date();

  if (
    !isProgressId(input.lessonId) ||
    !isProgressId(input.wordId) ||
    !isProgressId(input.segmentId) ||
    !isUsableDate(practicedAt)
  ) {
    return { progress, saved: false };
  }

  const practicedDate = toLocalDateKey(practicedAt);
  const { lesson, word } = getPracticeRecords(progress, input.lessonId, input.wordId);
  const currentCount = word.segmentPracticeCounts[input.segmentId] ?? 0;

  word.segmentPracticeCounts[input.segmentId] = incrementCount(currentCount);
  word.lastPracticedDate = practicedDate;
  lesson.practiceCount = incrementCount(lesson.practiceCount);
  lesson.lastPracticedDate = practicedDate;
  progress.updatedAt = practicedAt.toISOString();

  return {
    progress,
    saved: saveGradeThreeProgress(progress, storage),
  };
}

export function recordGradeThreeBlendPractice(
  input: GradeThreePracticeInput,
  storage?: Storage,
): GradeThreeProgressResult {
  const progress = loadGradeThreeProgress(storage);
  const practicedAt = input.practicedAt ?? new Date();

  if (
    !isProgressId(input.lessonId) ||
    !isProgressId(input.wordId) ||
    !isUsableDate(practicedAt)
  ) {
    return { progress, saved: false };
  }

  const practicedDate = toLocalDateKey(practicedAt);
  const { lesson, word } = getPracticeRecords(progress, input.lessonId, input.wordId);

  word.blendPlayCount = incrementCount(word.blendPlayCount);
  word.lastPracticedDate = practicedDate;
  lesson.practiceCount = incrementCount(lesson.practiceCount);
  lesson.lastPracticedDate = practicedDate;
  progress.updatedAt = practicedAt.toISOString();

  return {
    progress,
    saved: saveGradeThreeProgress(progress, storage),
  };
}

export function completeGradeThreeLesson(
  input: CompleteGradeThreeLessonInput,
  storage?: Storage,
): GradeThreeProgressResult {
  const progress = loadGradeThreeProgress(storage);
  const completedAt = input.completedAt ?? new Date();

  if (!isProgressId(input.lessonId) || !isUsableDate(completedAt)) {
    return { progress, saved: false };
  }

  const completedDate = toLocalDateKey(completedAt);
  const lesson =
    progress.lessons[input.lessonId] ?? createLessonProgress(input.lessonId);

  lesson.completed = true;
  lesson.completedAt = lesson.completedAt ?? completedAt.toISOString();
  lesson.lastPracticedDate = completedDate;
  progress.lessons[input.lessonId] = lesson;
  progress.updatedAt = completedAt.toISOString();

  return {
    progress,
    saved: saveGradeThreeProgress(progress, storage),
  };
}

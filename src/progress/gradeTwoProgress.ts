import { isValidDateKey, toLocalDateKey } from './localDate';

export const gradeTwoProgressStorageKey =
  'phonics-adventure.grade-2-progress.v1';

export interface GradeTwoWordProgress {
  wordId: string;
  segmentPracticeCounts: Record<string, number>;
  blendPlayCount: number;
  lastPracticedDate: string | null;
}

export interface GradeTwoLessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt: string | null;
  lastPracticedDate: string | null;
  words: Record<string, GradeTwoWordProgress>;
}

export interface GradeTwoProgress {
  version: 1;
  updatedAt: string | null;
  lessons: Record<string, GradeTwoLessonProgress>;
}

export interface GradeTwoProgressResult {
  progress: GradeTwoProgress;
  saved: boolean;
}

interface GradeTwoPracticeInput {
  lessonId: string;
  wordId: string;
  practicedAt?: Date;
}

export interface RecordSegmentPracticeInput extends GradeTwoPracticeInput {
  segmentId: string;
}

export interface CompleteGradeTwoLessonInput {
  lessonId: string;
  completedAt?: Date;
}

const progressIdPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function createEmptyGradeTwoProgress(): GradeTwoProgress {
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

function isNullableDateKey(value: unknown) {
  return value === null || isValidDateKey(value);
}

function isNullableTimestamp(value: unknown) {
  return (
    value === null || (typeof value === 'string' && !Number.isNaN(Date.parse(value)))
  );
}

function isCount(value: unknown) {
  return Number.isSafeInteger(value) && Number(value) >= 0;
}

function isWordProgress(
  value: unknown,
  expectedWordId: string,
): value is GradeTwoWordProgress {
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
): value is GradeTwoLessonProgress {
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
    isNullableTimestamp(value.completedAt) &&
    isNullableDateKey(value.lastPracticedDate) &&
    Object.entries(value.words).every(
      ([wordId, wordProgress]) =>
        isProgressId(wordId) && isWordProgress(wordProgress, wordId),
    )
  );
}

function isGradeTwoProgress(value: unknown): value is GradeTwoProgress {
  if (!isRecord(value) || !isRecord(value.lessons)) {
    return false;
  }

  return (
    value.version === 1 &&
    isNullableTimestamp(value.updatedAt) &&
    Object.entries(value.lessons).every(
      ([lessonId, lessonProgress]) =>
        isProgressId(lessonId) &&
        isLessonProgress(lessonProgress, lessonId),
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

function createLessonProgress(lessonId: string): GradeTwoLessonProgress {
  return {
    lessonId,
    completed: false,
    completedAt: null,
    lastPracticedDate: null,
    words: {},
  };
}

function createWordProgress(wordId: string): GradeTwoWordProgress {
  return {
    wordId,
    segmentPracticeCounts: {},
    blendPlayCount: 0,
    lastPracticedDate: null,
  };
}

export function loadGradeTwoProgress(storage?: Storage): GradeTwoProgress {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return createEmptyGradeTwoProgress();
  }

  try {
    const rawValue = targetStorage.getItem(gradeTwoProgressStorageKey);

    if (!rawValue) {
      return createEmptyGradeTwoProgress();
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    return isGradeTwoProgress(parsedValue)
      ? parsedValue
      : createEmptyGradeTwoProgress();
  } catch {
    return createEmptyGradeTwoProgress();
  }
}

export function saveGradeTwoProgress(
  progress: GradeTwoProgress,
  storage?: Storage,
) {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return false;
  }

  try {
    targetStorage.setItem(
      gradeTwoProgressStorageKey,
      JSON.stringify(progress),
    );
    return true;
  } catch {
    return false;
  }
}

export function clearGradeTwoProgress(storage?: Storage) {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return false;
  }

  try {
    targetStorage.removeItem(gradeTwoProgressStorageKey);
    return true;
  } catch {
    return false;
  }
}

export function isGradeTwoWordPracticeComplete(
  wordProgress: GradeTwoWordProgress | undefined,
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
  progress: GradeTwoProgress,
  lessonId: string,
  wordId: string,
) {
  const lesson =
    progress.lessons[lessonId] ?? createLessonProgress(lessonId);
  const word = lesson.words[wordId] ?? createWordProgress(wordId);

  lesson.words[wordId] = word;
  progress.lessons[lessonId] = lesson;

  return { lesson, word };
}

export function recordGradeTwoSegmentPractice(
  input: RecordSegmentPracticeInput,
  storage?: Storage,
): GradeTwoProgressResult {
  const progress = loadGradeTwoProgress(storage);
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
  const { lesson, word } = getPracticeRecords(
    progress,
    input.lessonId,
    input.wordId,
  );
  const currentCount = word.segmentPracticeCounts[input.segmentId] ?? 0;

  word.segmentPracticeCounts[input.segmentId] = incrementCount(currentCount);
  word.lastPracticedDate = practicedDate;
  lesson.lastPracticedDate = practicedDate;
  progress.updatedAt = practicedAt.toISOString();

  return {
    progress,
    saved: saveGradeTwoProgress(progress, storage),
  };
}

export function recordGradeTwoBlendPractice(
  input: GradeTwoPracticeInput,
  storage?: Storage,
): GradeTwoProgressResult {
  const progress = loadGradeTwoProgress(storage);
  const practicedAt = input.practicedAt ?? new Date();

  if (
    !isProgressId(input.lessonId) ||
    !isProgressId(input.wordId) ||
    !isUsableDate(practicedAt)
  ) {
    return { progress, saved: false };
  }

  const practicedDate = toLocalDateKey(practicedAt);
  const { lesson, word } = getPracticeRecords(
    progress,
    input.lessonId,
    input.wordId,
  );

  word.blendPlayCount = incrementCount(word.blendPlayCount);
  word.lastPracticedDate = practicedDate;
  lesson.lastPracticedDate = practicedDate;
  progress.updatedAt = practicedAt.toISOString();

  return {
    progress,
    saved: saveGradeTwoProgress(progress, storage),
  };
}

export function completeGradeTwoLesson(
  input: CompleteGradeTwoLessonInput,
  storage?: Storage,
): GradeTwoProgressResult {
  const progress = loadGradeTwoProgress(storage);
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
    saved: saveGradeTwoProgress(progress, storage),
  };
}

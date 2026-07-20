import type { LearningSkill } from '../types/activity';
import { addLocalDays, isValidDateKey, toLocalDateKey } from './localDate';

export const learningProgressStorageKey = 'phonics-adventure.learning-progress.v1';

type TrackedSkill = Extract<LearningSkill, 'listening' | 'speaking' | 'reading'>;

export interface SkillProgress {
  mastery: number;
  correctCount: number;
  wrongCount: number;
  lastReviewDate: string | null;
  nextReviewDate: string | null;
}

export interface LetterProgress {
  letterId: string;
  completed: boolean;
  completedAt: string | null;
  skills: Record<TrackedSkill, SkillProgress>;
}

export interface LearningProgress {
  version: 1;
  updatedAt: string | null;
  letters: Record<string, LetterProgress>;
  activityCompletions: Record<string, string>;
}

export interface LearningProgressSummary {
  completedLetters: number;
  totalLetters: number;
  listening: number;
  speaking: number;
  reading: number;
  correctCount: number;
  wrongCount: number;
  lastReviewDate: string | null;
  nextReviewDate: string | null;
}

export interface RecordLearningActivityInput {
  activityId: string;
  letterId: string;
  skill: TrackedSkill;
  completedAt?: Date;
  correct?: boolean;
  mistakeCount?: number;
}

export interface RecordLearningActivityResult {
  progress: LearningProgress;
  saved: boolean;
}

export const supportedLetterIds = Array.from({ length: 26 }, (_, index) =>
  String.fromCharCode('a'.charCodeAt(0) + index),
);
const supportedLetterIdSet = new Set(supportedLetterIds);
const trackedSkills: TrackedSkill[] = ['listening', 'speaking', 'reading'];

function createSkillProgress(): SkillProgress {
  return {
    mastery: 0,
    correctCount: 0,
    wrongCount: 0,
    lastReviewDate: null,
    nextReviewDate: null,
  };
}

function createLetterProgress(letterId: string): LetterProgress {
  return {
    letterId,
    completed: false,
    completedAt: null,
    skills: {
      listening: createSkillProgress(),
      speaking: createSkillProgress(),
      reading: createSkillProgress(),
    },
  };
}

export function createEmptyLearningProgress(): LearningProgress {
  return {
    version: 1,
    updatedAt: null,
    letters: {},
    activityCompletions: {},
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value));
}

function isNullableDateKey(value: unknown) {
  return value === null || isValidDateKey(value);
}

function isNullableTimestamp(value: unknown) {
  return (
    value === null || (typeof value === 'string' && !Number.isNaN(Date.parse(value)))
  );
}

function isNonNegativeInteger(value: unknown) {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}

function isSkillProgress(value: unknown): value is SkillProgress {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.mastery === 'number' &&
    Number.isInteger(value.mastery) &&
    value.mastery >= 0 &&
    value.mastery <= 100 &&
    isNonNegativeInteger(value.correctCount) &&
    isNonNegativeInteger(value.wrongCount) &&
    isNullableDateKey(value.lastReviewDate) &&
    isNullableDateKey(value.nextReviewDate)
  );
}

function isLetterProgress(
  value: unknown,
  expectedLetterId: string,
): value is LetterProgress {
  if (!isRecord(value) || !isRecord(value.skills)) {
    return false;
  }

  const skills = value.skills;

  return (
    value.letterId === expectedLetterId &&
    typeof value.completed === 'boolean' &&
    isNullableTimestamp(value.completedAt) &&
    trackedSkills.every((skill) => isSkillProgress(skills[skill]))
  );
}

function isLearningProgress(value: unknown): value is LearningProgress {
  if (!isRecord(value) || !isRecord(value.letters)) {
    return false;
  }

  return (
    value.version === 1 &&
    isNullableTimestamp(value.updatedAt) &&
    Object.entries(value.letters).every(
      ([letterId, letterProgress]) =>
        supportedLetterIdSet.has(letterId) &&
        isLetterProgress(letterProgress, letterId),
    ) &&
    isRecord(value.activityCompletions) &&
    Object.values(value.activityCompletions).every((completedDate) =>
      isValidDateKey(completedDate),
    )
  );
}

function normalizeLetterCompletion(progress: LearningProgress) {
  for (const letterProgress of Object.values(progress.letters)) {
    const isCompleted = trackedSkills.every(
      (skill) => letterProgress.skills[skill].correctCount > 0,
    );

    letterProgress.completed = isCompleted;

    if (!isCompleted) {
      letterProgress.completedAt = null;
    }
  }

  return progress;
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

function getNextIntervalDays(skillProgress: SkillProgress, correct: boolean) {
  if (!correct) {
    return 1;
  }

  if (skillProgress.correctCount <= 1) {
    return 1;
  }

  if (skillProgress.correctCount === 2) {
    return 3;
  }

  if (skillProgress.correctCount === 3) {
    return 7;
  }

  return 14;
}

export function loadLearningProgress(storage?: Storage): LearningProgress {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return createEmptyLearningProgress();
  }

  try {
    const rawValue = targetStorage.getItem(learningProgressStorageKey);

    if (!rawValue) {
      return createEmptyLearningProgress();
    }

    const parsedValue: unknown = JSON.parse(rawValue);

    return isLearningProgress(parsedValue)
      ? normalizeLetterCompletion(parsedValue)
      : createEmptyLearningProgress();
  } catch {
    return createEmptyLearningProgress();
  }
}

export function saveLearningProgress(
  progress: LearningProgress,
  storage?: Storage,
): boolean {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return false;
  }

  try {
    targetStorage.setItem(learningProgressStorageKey, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function clearLearningProgress(storage?: Storage): boolean {
  const targetStorage = getStorage(storage);

  if (!targetStorage) {
    return false;
  }

  try {
    targetStorage.removeItem(learningProgressStorageKey);
    return true;
  } catch {
    return false;
  }
}

export function recordLearningActivityWithResult(
  input: RecordLearningActivityInput,
  storage?: Storage,
): RecordLearningActivityResult {
  const completedAt = input.completedAt ?? new Date();
  const completedDateKey = toLocalDateKey(completedAt);
  const progress = loadLearningProgress(storage);

  if (!supportedLetterIdSet.has(input.letterId)) {
    return { progress, saved: false };
  }

  const letterProgress =
    progress.letters[input.letterId] ?? createLetterProgress(input.letterId);
  const skillProgress = letterProgress.skills[input.skill];
  const correct = input.correct ?? true;
  const mistakeCount = Number.isFinite(input.mistakeCount)
    ? Math.min(99, Math.max(0, Math.floor(input.mistakeCount ?? 0)))
    : 0;
  const totalMistakes = mistakeCount + (correct ? 0 : 1);

  if (correct) {
    skillProgress.correctCount += 1;
  }

  skillProgress.wrongCount += totalMistakes;
  skillProgress.mastery = Math.min(
    100,
    Math.max(0, skillProgress.mastery + (correct ? 25 : 0) - totalMistakes * 10),
  );
  skillProgress.lastReviewDate = completedDateKey;
  skillProgress.nextReviewDate = addLocalDays(
    completedAt,
    getNextIntervalDays(skillProgress, correct && totalMistakes === 0),
  );

  letterProgress.completed = trackedSkills.every(
    (trackedSkill) => letterProgress.skills[trackedSkill].correctCount > 0,
  );
  letterProgress.completedAt = letterProgress.completed
    ? (letterProgress.completedAt ?? completedAt.toISOString())
    : null;
  progress.letters[input.letterId] = letterProgress;
  progress.activityCompletions[input.activityId] = completedDateKey;
  progress.updatedAt = completedAt.toISOString();

  const saved = saveLearningProgress(progress, storage);

  return { progress, saved };
}

export function recordLearningActivity(
  input: RecordLearningActivityInput,
  storage?: Storage,
) {
  return recordLearningActivityWithResult(input, storage).progress;
}

function average(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function getEarliestDate(dates: Array<string | null>) {
  const validDates = dates.filter((date): date is string => Boolean(date));

  return validDates.sort()[0] ?? null;
}

function getLatestDate(dates: Array<string | null>) {
  const validDates = dates.filter((date): date is string => Boolean(date));

  return validDates.sort().at(-1) ?? null;
}

export function getLearningProgressSummary(
  progress: LearningProgress,
): LearningProgressSummary {
  const letters = Object.values(progress.letters);
  const skillEntries = letters.flatMap((letter) => Object.values(letter.skills));

  return {
    completedLetters: letters.filter((letter) => letter.completed).length,
    totalLetters: supportedLetterIds.length,
    listening: average(letters.map((letter) => letter.skills.listening.mastery)),
    speaking: average(letters.map((letter) => letter.skills.speaking.mastery)),
    reading: average(letters.map((letter) => letter.skills.reading.mastery)),
    correctCount: skillEntries.reduce((sum, skill) => sum + skill.correctCount, 0),
    wrongCount: skillEntries.reduce((sum, skill) => sum + skill.wrongCount, 0),
    lastReviewDate: getLatestDate(skillEntries.map((skill) => skill.lastReviewDate)),
    nextReviewDate: getEarliestDate(skillEntries.map((skill) => skill.nextReviewDate)),
  };
}

export function formatProgressDate(date: string | null) {
  return date ?? '尚未安排';
}

import type { BlendingLesson } from './phonicsLesson';
import { gradeTwoConsonantBlendLessons } from './grade2ConsonantBlends';
import { gradeTwoMagicELessons } from './grade2MagicE';
import { gradeTwoDigraphLessons } from './grade2Digraphs';
import { gradeTwoShortALesson } from './grade2ShortA';
import { gradeTwoShortELesson } from './grade2ShortE';
import { gradeTwoShortILesson } from './grade2ShortI';
import { gradeTwoShortOLesson } from './grade2ShortO';
import { gradeTwoShortULesson } from './grade2ShortU';
import { gradeTwoWordFamilyLessons } from './grade2WordFamilies';

export const gradeTwoBlendingLessons = [
  gradeTwoShortALesson,
  gradeTwoShortELesson,
  gradeTwoShortILesson,
  gradeTwoShortOLesson,
  gradeTwoShortULesson,
  ...gradeTwoWordFamilyLessons,
  ...gradeTwoDigraphLessons,
  ...gradeTwoConsonantBlendLessons,
  ...gradeTwoMagicELessons,
] as const satisfies readonly BlendingLesson[];

const lessonsBySlug = new Map(
  gradeTwoBlendingLessons.map((lesson) => [lesson.slug, lesson]),
);

const lessonsById = new Map(
  gradeTwoBlendingLessons.map((lesson) => [lesson.id, lesson]),
);

export function getGradeTwoBlendingLesson(slugOrId: string) {
  const normalizedId = slugOrId.toLowerCase();

  return lessonsBySlug.get(normalizedId) ?? lessonsById.get(normalizedId);
}

export function getGradeTwoLessonPath(lesson: BlendingLesson) {
  return `/grade/2/lesson/${lesson.slug}`;
}

export function getGradeTwoUnitLessons(unitId: string) {
  return gradeTwoBlendingLessons.filter((lesson) => lesson.unitId === unitId);
}

export function getNextGradeTwoBlendingLesson(lesson: BlendingLesson) {
  const unitLessons = getGradeTwoUnitLessons(lesson.unitId);
  const lessonIndex = unitLessons.findIndex(
    (candidate) => candidate.id === lesson.id,
  );

  return lessonIndex >= 0 ? unitLessons[lessonIndex + 1] : undefined;
}

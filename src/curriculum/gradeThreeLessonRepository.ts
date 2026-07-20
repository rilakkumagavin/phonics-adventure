import type { BlendingLesson } from './phonicsLesson';
import { gradeThreeAdvancedConsonantLessons } from './grade3AdvancedConsonants';
import { gradeThreeDiphthongLessons } from './grade3Diphthongs';
import { gradeThreeMultisyllableLessons } from './grade3MultisyllableWords';
import { gradeThreeRControlledVowelLessons } from './grade3RControlledVowels';
import { gradeThreeVowelTeamLessons } from './grade3VowelTeams';

export const gradeThreeBlendingLessons = [
  ...gradeThreeVowelTeamLessons,
  ...gradeThreeRControlledVowelLessons,
  ...gradeThreeDiphthongLessons,
  ...gradeThreeAdvancedConsonantLessons,
  ...gradeThreeMultisyllableLessons,
] as const satisfies readonly BlendingLesson[];

const lessonsBySlug = new Map(
  gradeThreeBlendingLessons.map((lesson) => [lesson.slug, lesson]),
);

const lessonsById = new Map(
  gradeThreeBlendingLessons.map((lesson) => [lesson.id, lesson]),
);

export function getGradeThreeBlendingLesson(slugOrId: string) {
  const normalizedId = slugOrId.toLowerCase();

  return lessonsBySlug.get(normalizedId) ?? lessonsById.get(normalizedId);
}

export function getGradeThreeLessonPath(lesson: BlendingLesson) {
  return `/grade/3/lesson/${lesson.slug}`;
}

export function getGradeThreeUnitLessons(unitId: string) {
  return gradeThreeBlendingLessons.filter((lesson) => lesson.unitId === unitId);
}

export function getNextGradeThreeBlendingLesson(lesson: BlendingLesson) {
  const unitLessons = getGradeThreeUnitLessons(lesson.unitId);
  const lessonIndex = unitLessons.findIndex((candidate) => candidate.id === lesson.id);

  return lessonIndex >= 0 ? unitLessons[lessonIndex + 1] : undefined;
}

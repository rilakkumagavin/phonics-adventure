import type { DecodableSentenceLesson } from './decodableSentence';
import { gradeTwoDecodableSentenceLessons } from './grade2DecodableSentences';

const lessonsBySlug = new Map(
  gradeTwoDecodableSentenceLessons.map((lesson) => [lesson.slug, lesson]),
);

const lessonsById = new Map(
  gradeTwoDecodableSentenceLessons.map((lesson) => [lesson.id, lesson]),
);

export function getGradeTwoSentenceLesson(slugOrId: string) {
  const normalizedId = slugOrId.toLowerCase();

  return lessonsBySlug.get(normalizedId) ?? lessonsById.get(normalizedId);
}

export function getGradeTwoSentenceLessonPath(
  lesson: DecodableSentenceLesson,
) {
  return `/grade/2/sentence/${lesson.slug}`;
}

export function getNextGradeTwoSentenceLesson(
  lesson: DecodableSentenceLesson,
) {
  const lessonIndex = gradeTwoDecodableSentenceLessons.findIndex(
    (candidate) => candidate.id === lesson.id,
  );

  return lessonIndex >= 0
    ? gradeTwoDecodableSentenceLessons[lessonIndex + 1]
    : undefined;
}

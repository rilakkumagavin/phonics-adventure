import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gradeThreeBlendingLessons } from '../../curriculum/gradeThreeLessonRepository';
import {
  gradeThreeProgressStorageKey,
  type GradeThreeProgress,
} from '../../progress/gradeThreeProgress';
import { ShortVowelLessonPage } from './ShortVowelLessonPage';

function createProgressBeforeWord(
  lesson: (typeof gradeThreeBlendingLessons)[number],
  wordIndex: number,
): GradeThreeProgress {
  const words = Object.fromEntries(
    lesson.words.slice(0, wordIndex).map((word) => [
      word.id,
      {
        wordId: word.id,
        segmentPracticeCounts: Object.fromEntries(
          word.segments.map((segment) => [segment.id, 1]),
        ),
        blendPlayCount: 1,
        lastPracticedDate: '2026-07-22',
      },
    ]),
  );

  return {
    version: 1,
    updatedAt: '2026-07-22T00:00:00.000Z',
    lessons: {
      [lesson.id]: {
        lessonId: lesson.id,
        completed: false,
        completedAt: null,
        practiceCount: 0,
        lastPracticedDate: '2026-07-22',
        words,
      },
    },
  };
}

function renderGradeThreeLessonAtWord(
  lesson: (typeof gradeThreeBlendingLessons)[number],
  wordIndex: number,
) {
  localStorage.setItem(
    gradeThreeProgressStorageKey,
    JSON.stringify(createProgressBeforeWord(lesson, wordIndex)),
  );

  return render(
    <MemoryRouter initialEntries={[`/grade/3/lesson/${lesson.slug}`]}>
      <Routes>
        <Route
          path="/grade/3/lesson/:lessonSlug"
          element={<ShortVowelLessonPage grade={3} />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('GradeThree pronunciation display', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('shows every segment pronunciation label for every grade three word', () => {
    for (const lesson of gradeThreeBlendingLessons) {
      for (const [wordIndex, word] of lesson.words.entries()) {
        const { container, unmount } = renderGradeThreeLessonAtWord(
          lesson,
          wordIndex,
        );
        const buttons = Array.from(container.querySelectorAll('button'));

        for (const segment of word.segments) {
          const expectedLabel = segment.isSilent ? '不發音' : segment.soundLabel;
          if (!segment.isSilent) {
            expect(
              segment.soundLabel,
              `${lesson.slug} / ${word.word} / ${segment.grapheme} should use a pronunciation label`,
            ).toMatch(/^\/.+\/$/);
          }
          const matchingButton = buttons.find(
            (button) =>
              button.textContent?.includes(segment.grapheme) &&
              button.textContent.includes(expectedLabel),
          );

          expect(
            matchingButton,
            `${lesson.slug} / ${word.word} should show ${segment.grapheme} ${expectedLabel}`,
          ).toBeDefined();
        }

        unmount();
      }
    }
  });
});

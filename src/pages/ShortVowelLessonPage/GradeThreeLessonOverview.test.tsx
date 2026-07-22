import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  gradeThreeAiAyLesson,
  gradeThreeEeEaLesson,
} from '../../curriculum/grade3VowelTeams';
import { ShortVowelLessonPage } from './ShortVowelLessonPage';

function renderGradeThreeLesson(slug = 'ai-ay') {
  return render(
    <MemoryRouter initialEntries={[`/grade/3/lesson/${slug}`]}>
      <Routes>
        <Route
          path="/grade/3/lesson/:lessonSlug"
          element={<ShortVowelLessonPage grade={3} />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('GradeThree lesson overview', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('shows the lesson focus, practice type, timing, and word path', () => {
    renderGradeThreeLesson();

    expect(screen.getByLabelText('課程概覽')).toBeInTheDocument();
    expect(screen.getByText(gradeThreeAiAyLesson.vowelGrapheme)).toBeInTheDocument();
    expect(screen.getByText('音素拼讀')).toBeInTheDocument();
    expect(screen.getByText('3 個單字')).toBeInTheDocument();
    expect(screen.getByText(`下一課 ${gradeThreeEeEaLesson.title}`)).toBeInTheDocument();
    expect(screen.getByLabelText('單字練習路徑')).toHaveTextContent(
      gradeThreeAiAyLesson.words
        .map((word, index) => `${index + 1}. ${word.word}`)
        .join(''),
    );
  });

  it('shows pronunciation labels even before later segments are unlocked', () => {
    renderGradeThreeLesson();

    expect(screen.getByRole('button', { name: '播放 r 的聲音' })).toHaveTextContent(
      '/r/',
    );
    expect(screen.getByRole('button', { name: '播放 ai 的聲音' })).toHaveTextContent(
      '/eɪ/',
    );
    expect(screen.getByRole('button', { name: '播放 n 的聲音' })).toHaveTextContent(
      '/n/',
    );
    expect(screen.queryByText('等一下')).not.toBeInTheDocument();
  });
});

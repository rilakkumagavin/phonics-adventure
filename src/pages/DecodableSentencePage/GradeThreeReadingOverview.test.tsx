import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gradeThreeReadingFluencyLessons } from '../../curriculum/grade3ReadingFluency';
import { DecodableSentencePage } from './DecodableSentencePage';

const firstLesson = gradeThreeReadingFluencyLessons[0];
const secondLesson = gradeThreeReadingFluencyLessons[1];

function renderReading(path = '/grade/3/read/train-in-rain') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/grade/3/read/:lessonSlug"
          element={<DecodableSentencePage grade={3} />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('GradeThree reading overview', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('shows the reading focus, sentence, timing, and token path', () => {
    renderReading();

    expect(screen.getByLabelText('閱讀概覽')).toBeInTheDocument();
    expect(screen.getByText(firstLesson.sentence)).toBeInTheDocument();
    expect(screen.getByText(`${firstLesson.tokens.length} 個詞`)).toBeInTheDocument();
    expect(screen.getByText(`下一篇 ${secondLesson.title}`)).toBeInTheDocument();
    expect(screen.getByLabelText('逐詞閱讀路徑')).toHaveTextContent(
      firstLesson.tokens
        .map((token, index) => `${index + 1}. ${token.text}`)
        .join(''),
    );
  });
});

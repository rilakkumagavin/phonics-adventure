import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gradeThreeReadingFluencyLessons } from '../../curriculum/grade3ReadingFluency';
import {
  loadGradeThreeProgress,
  recordGradeThreeSegmentPractice,
} from '../../progress/gradeThreeProgress';
import { DecodableSentencePage } from './DecodableSentencePage';

const firstLesson = gradeThreeReadingFluencyLessons[0];

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

describe('GradeThree reading fluency page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(
      () => undefined,
    );
  });

  it('逐字發音、播放整句並保存三年級課程進度', async () => {
    const user = userEvent.setup();

    renderReading();

    const buttons = firstLesson.tokens.map((token) =>
      screen.getByRole('button', { name: `播放 ${token.text}` }),
    );

    expect(buttons[0]).toBeEnabled();
    expect(buttons[1]).toBeDisabled();

    for (const button of buttons) {
      await user.click(button);
    }

    await user.click(screen.getByRole('button', { name: '聽整句' }));
    expect(
      screen.getByRole('button', { name: '錄下我讀的句子' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '完成第 1 課' }));

    expect(loadGradeThreeProgress().lessons[firstLesson.id].completed).toBe(true);
    expect(
      screen.getByRole('link', { name: '下一課：蕨葉旁的兔子' }),
    ).toHaveAttribute('href', '/grade/3/read/rabbit-by-fern');
  });

  it('重新進入時從第一個尚未聽的字繼續', () => {
    for (const token of firstLesson.tokens.slice(0, 3)) {
      recordGradeThreeSegmentPractice({
        lessonId: firstLesson.id,
        wordId: firstLesson.practiceWordId,
        segmentId: token.id,
      });
    }

    renderReading();

    expect(screen.getByRole('button', { name: '播放 in' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '播放 the' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent(
      '從亮起來的字繼續讀。',
    );
  });
});

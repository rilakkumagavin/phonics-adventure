import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gradeTwoDecodableSentenceLessons } from '../../curriculum/grade2DecodableSentences';
import {
  loadGradeTwoProgress,
  recordGradeTwoSegmentPractice,
} from '../../progress/gradeTwoProgress';
import { DecodableSentencePage } from './DecodableSentencePage';

const firstLesson = gradeTwoDecodableSentenceLessons[0];

function renderSentence(path = '/grade/2/sentence/cat-on-mat') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/grade/2/sentence/:lessonSlug"
          element={<DecodableSentencePage />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('DecodableSentencePage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(
      () => undefined,
    );
  });

  it('逐字開放，聽完整句後可完成並保存課程', async () => {
    const user = userEvent.setup();

    renderSentence();

    const buttons = firstLesson.tokens.map((token) =>
      screen.getByRole('button', { name: `播放 ${token.text}` }),
    );

    expect(buttons[0]).toBeEnabled();
    expect(buttons[1]).toBeDisabled();
    expect(screen.getByRole('button', { name: '聽整句' })).toBeDisabled();

    for (let index = 0; index < buttons.length; index += 1) {
      await user.click(buttons[index]);

      if (buttons[index + 1]) {
        expect(buttons[index + 1]).toBeEnabled();
      }
    }

    const sentenceButton = screen.getByRole('button', { name: '聽整句' });
    expect(sentenceButton).toBeEnabled();
    await user.click(sentenceButton);

    expect(
      screen.getByRole('button', { name: '錄下我讀的句子' }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '完成第 1 課' }));

    expect(
      screen.getByRole('heading', { name: '你讀完一整句了！' }),
    ).toBeInTheDocument();
    expect(
      loadGradeTwoProgress().lessons[firstLesson.id].completed,
    ).toBe(true);
    expect(
      screen.getByRole('link', { name: '下一課：魚會游泳' }),
    ).toHaveAttribute('href', '/grade/2/sentence/fish-can-swim');
  });

  it('重新進入時回到第一個尚未聽的字', () => {
    for (const token of firstLesson.tokens.slice(0, 2)) {
      recordGradeTwoSegmentPractice({
        lessonId: firstLesson.id,
        wordId: firstLesson.practiceWordId,
        segmentId: token.id,
      });
    }

    renderSentence();

    expect(screen.getByRole('button', { name: '播放 A' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '播放 cat' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '播放 is' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '播放 on' })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent(
      '從亮起來的字繼續讀。',
    );
  });
});

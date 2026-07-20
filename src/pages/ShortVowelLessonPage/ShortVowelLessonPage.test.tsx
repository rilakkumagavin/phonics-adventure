import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { gradeTwoShortALesson } from '../../curriculum/grade2ShortA';
import { gradeTwoShortILesson } from '../../curriculum/grade2ShortI';
import type { BlendingLesson } from '../../curriculum/phonicsLesson';
import {
  completeGradeTwoLesson,
  gradeTwoProgressStorageKey,
  loadGradeTwoProgress,
  recordGradeTwoBlendPractice,
  recordGradeTwoSegmentPractice,
} from '../../progress/gradeTwoProgress';
import { learningProgressStorageKey } from '../../progress/learningProgress';
import { ShortVowelLessonPage } from './ShortVowelLessonPage';

function recordCompletedWord(wordIndex: number) {
  const word = gradeTwoShortALesson.words[wordIndex];

  for (const segment of word.segments) {
    recordGradeTwoSegmentPractice({
      lessonId: gradeTwoShortALesson.id,
      wordId: word.id,
      segmentId: segment.id,
    });
  }

  recordGradeTwoBlendPractice({
    lessonId: gradeTwoShortALesson.id,
    wordId: word.id,
  });
}

function recordCompletedLessonWord(lesson: BlendingLesson, wordIndex: number) {
  const word = lesson.words[wordIndex];

  for (const segment of word.segments) {
    recordGradeTwoSegmentPractice({
      lessonId: lesson.id,
      wordId: word.id,
      segmentId: segment.id,
    });
  }

  recordGradeTwoBlendPractice({
    lessonId: lesson.id,
    wordId: word.id,
  });
}

function renderLessonRoute(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route
          path="/grade/2/lesson/:lessonSlug"
          element={<ShortVowelLessonPage />}
        />
      </Routes>
    </MemoryRouter>,
  );
}

describe('ShortVowelLessonPage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('先顯示 cat，並依序開放三個音段與合音', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    const cButton = screen.getByRole('button', { name: '播放 c 的聲音' });
    const aButton = screen.getByRole('button', { name: '播放 a 的聲音' });
    const tButton = screen.getByRole('button', { name: '播放 t 的聲音' });
    const blendButton = screen.getByRole('button', { name: '合起來聽：cat' });

    expect(cButton).toBeEnabled();
    expect(aButton).toBeDisabled();
    expect(tButton).toBeDisabled();
    expect(blendButton).toBeDisabled();

    await user.click(cButton);
    expect(aButton).toBeEnabled();
    expect(
      loadGradeTwoProgress().lessons[gradeTwoShortALesson.id].words[
        gradeTwoShortALesson.words[0].id
      ].segmentPracticeCounts[gradeTwoShortALesson.words[0].segments[0].id],
    ).toBe(1);

    await user.click(aButton);
    expect(tButton).toBeEnabled();

    await user.click(tButton);
    expect(blendButton).toBeEnabled();

    await user.click(blendButton);
    expect(screen.getByRole('button', { name: '下一個字' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('正在播放 cat。');
    expect(
      loadGradeTwoProgress().lessons[gradeTwoShortALesson.id].words[
        gradeTwoShortALesson.words[0].id
      ].blendPlayCount,
    ).toBe(1);
  });

  it('完成 cat、map、fan 後顯示完成畫面', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    for (const [word, letters] of [
      ['cat', ['c', 'a', 't']],
      ['map', ['m', 'a', 'p']],
      ['fan', ['f', 'a', 'n']],
    ] as const) {
      for (const letter of letters) {
        await user.click(
          screen.getByRole('button', { name: `播放 ${letter} 的聲音` }),
        );
      }

      await user.click(screen.getByRole('button', { name: `合起來聽：${word}` }));
      await user.click(
        screen.getByRole('button', {
          name: word === 'fan' ? '完成第 1 課' : '下一個字',
        }),
      );
    }

    expect(
      screen.getByRole('heading', { name: '你把聲音合成單字了！' }),
    ).toBeInTheDocument();
    expect(screen.getByText('cat · map · fan')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '下一課：短母音 e' }),
    ).toHaveAttribute('href', '/grade/2/lesson/short-e');
    expect(
      loadGradeTwoProgress().lessons[gradeTwoShortALesson.id].completed,
    ).toBe(true);
    expect(localStorage.getItem(gradeTwoProgressStorageKey)).not.toBeNull();
    expect(localStorage.getItem(learningProgressStorageKey)).toBeNull();
  });

  it('cat 完成後重新進入會從 map 繼續', () => {
    recordCompletedWord(0);

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('map')).toBeInTheDocument();
    expect(screen.queryByText('cat')).not.toBeInTheDocument();
    expect(screen.getByText('第 2 個字，共 3 個')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      '從 map 繼續，一個音、一個音慢慢聽。',
    );
  });

  it('cat 與 map 完成後重新進入會從 fan 繼續', () => {
    recordCompletedWord(0);
    recordCompletedWord(1);

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('fan')).toBeInTheDocument();
    expect(screen.getByText('第 3 個字，共 3 個')).toBeInTheDocument();
  });

  it('單字只完成部分音段時回到該字第一個尚未播放的音段', () => {
    const cat = gradeTwoShortALesson.words[0];

    recordGradeTwoSegmentPractice({
      lessonId: gradeTwoShortALesson.id,
      wordId: cat.id,
      segmentId: cat.segments[0].id,
    });

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('cat')).toBeInTheDocument();
    expect(screen.getByText('第 1 個字，共 3 個')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '播放 c 的聲音' }),
    ).toBeEnabled();
    expect(
      screen.getByRole('button', { name: '播放 a 的聲音' }),
    ).toBeEnabled();
    expect(
      screen.getByRole('button', { name: '播放 t 的聲音' }),
    ).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent(
      '從 cat 的下一個聲音繼續。',
    );
  });

  it('音段都完成但尚未播放整字時直接開放合音', () => {
    const cat = gradeTwoShortALesson.words[0];

    for (const segment of cat.segments) {
      recordGradeTwoSegmentPractice({
        lessonId: gradeTwoShortALesson.id,
        wordId: cat.id,
        segmentId: segment.id,
      });
    }

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('cat')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '合起來聽：cat' }),
    ).toBeEnabled();
    expect(screen.getByRole('status')).toHaveTextContent(
      'cat 的聲音都聽過了，接著把它們合起來。',
    );
  });

  it('三個字都練完但未完成課程時回到 fan 並可直接完成', () => {
    recordCompletedWord(0);
    recordCompletedWord(1);
    recordCompletedWord(2);

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('fan')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: '完成第 1 課' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      '這一課的 3 個字都練過了，按下完成。',
    );
  });

  it('已完成課程選擇再練一次時從 cat 開始', () => {
    completeGradeTwoLesson({ lessonId: gradeTwoShortALesson.id });

    render(
      <MemoryRouter>
        <ShortVowelLessonPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('cat')).toBeInTheDocument();
    expect(screen.getByText('第 1 個字，共 3 個')).toBeInTheDocument();
  });

  it('依路由載入短母音 i，並正確處理 gift 的四個音段', async () => {
    const user = userEvent.setup();
    recordCompletedLessonWord(gradeTwoShortILesson, 0);

    renderLessonRoute('/grade/2/lesson/short-i');

    expect(
      screen.getByRole('heading', { name: '短母音 i' }),
    ).toBeInTheDocument();
    expect(screen.getByText('gift')).toBeInTheDocument();

    const gButton = screen.getByRole('button', { name: '播放 g 的聲音' });
    const iButton = screen.getByRole('button', { name: '播放 i 的聲音' });
    const fButton = screen.getByRole('button', { name: '播放 f 的聲音' });
    const tButton = screen.getByRole('button', { name: '播放 t 的聲音' });

    expect(gButton).toBeEnabled();
    expect(iButton).toBeDisabled();
    expect(fButton).toBeDisabled();
    expect(tButton).toBeDisabled();

    await user.click(gButton);
    await user.click(iButton);
    await user.click(fButton);

    expect(tButton).toBeEnabled();
    expect(
      screen.getByRole('button', { name: '合起來聽：gift' }),
    ).toBeDisabled();

    await user.click(tButton);

    expect(
      screen.getByRole('button', { name: '合起來聽：gift' }),
    ).toBeEnabled();
  });
});

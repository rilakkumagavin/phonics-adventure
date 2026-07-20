import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { loadLearningProgress } from '../../progress/learningProgress';
import { LessonPage } from './LessonPage';

function renderLesson(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/lesson/:letterId" element={<LessonPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

async function finishCurrentWord(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole('button', { name: /^聽發音：/ }));
  await user.click(screen.getByRole('button', { name: '我聽到了' }));
  await user.click(screen.getByRole('button', { name: '我念好了' }));
  await user.click(
    screen.getByRole('button', {
      name: /我讀好了，下一個字|完成這一課/,
    }),
  );
}

describe('LessonPage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('/lesson/a 一次只顯示一個核心單字與聽說讀步驟', () => {
    const { container } = renderLesson('/lesson/a');

    expect(screen.getByRole('heading', { name: 'A 的短短聲音' })).toBeInTheDocument();
    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('蘋果')).toBeInTheDocument();
    expect(screen.queryByText('ant')).not.toBeInTheDocument();
    expect(screen.queryByText('alligator')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: '一顆帶著綠葉的紅蘋果' })).toHaveAttribute(
      'src',
      '/assets/images/courses/a/a-apple-core.webp',
    );
    expect(container.querySelectorAll('img')).toHaveLength(1);
    expect(screen.getByLabelText('聽說讀步驟')).toHaveTextContent(
      '1聽一聽2跟著念3看字讀',
    );
    expect(screen.getByRole('progressbar', { name: 'A 課程進度' })).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
    expect(localStorage.length).toBe(0);
  });

  it('播放正式單字音訊後依序進入跟讀與看字讀', async () => {
    const user = userEvent.setup();
    renderLesson('/lesson/a');

    await user.click(screen.getByRole('button', { name: '聽發音：apple' }));
    expect(screen.getByRole('status')).toHaveTextContent('正在播放 apple。');

    await user.click(screen.getByRole('button', { name: '我聽到了' }));
    expect(screen.getByRole('button', { name: '再聽正確發音' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '慢速發音' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '錄下我的聲音' })).toBeInTheDocument();
    expect(
      screen.getByText('不做語音辨識或發音評分；錄音不會上傳。'),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '我念好了' }));
    expect(
      screen.getByRole('button', { name: '需要幫忙，聽正確發音' }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '我讀好了，下一個字' }));
    expect(screen.getByText('ant')).toBeInTheDocument();
    expect(screen.queryByText('apple')).not.toBeInTheDocument();
    expect(screen.getByText('第 2 個字，共 3 個')).toBeInTheDocument();
  });

  it('完成三個字後顯示完成畫面並儲存聽說讀進度', async () => {
    const user = userEvent.setup();
    renderLesson('/lesson/a');

    await finishCurrentWord(user);
    await finishCurrentWord(user);
    await finishCurrentWord(user);

    expect(
      screen.getByRole('heading', {
        name: '你聽過、念過，也讀過三個字了！',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('apple、ant、alligator')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '選下一個字母' })).toHaveAttribute(
      'href',
      '/map',
    );

    const progress = loadLearningProgress();
    expect(progress.letters.a.completed).toBe(true);
    expect(progress.letters.a.skills.listening.correctCount).toBe(1);
    expect(progress.letters.a.skills.speaking.correctCount).toBe(1);
    expect(progress.letters.a.skills.reading.correctCount).toBe(1);
  });

  it.each([
    ['b', 'B 的碰碰聲音', 'ball', '/assets/images/courses/b/b-ball-core.webp'],
    ['c', 'C 的清脆聲音', 'cat', '/assets/images/courses/c/c-cat-core.webp'],
    ['d', 'D 的短短聲音', 'dog', '/assets/images/courses/d/d-dog-core.webp'],
    ['e', 'E 的短短聲音', 'egg', '/assets/images/courses/e/e-egg-core.webp'],
    ['f', 'F 的輕輕送氣聲', 'fish', '/assets/images/courses/f/f-fish-core.webp'],
  ])('/lesson/%s 顯示該課第一個核心單字', (letter, title, word, imageSrc) => {
    const { container } = renderLesson(`/lesson/${letter}`);

    expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    expect(screen.getByText(word)).toBeInTheDocument();
    expect(container.querySelector(`img[src="${imageSrc}"]`)).not.toBeNull();
    expect(container.querySelectorAll('img')).toHaveLength(1);
  });

  it('未知字母顯示找不到課程提示', () => {
    renderLesson('/lesson/aa');

    expect(
      screen.getByRole('heading', { name: '找不到這個字母課程' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回學習地圖' })).toHaveAttribute(
      'href',
      '/map',
    );
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  gradeThreeOiLesson,
  gradeThreeOuLesson,
  gradeThreeOwLesson,
  gradeThreeOyLesson,
} from '../../curriculum/grade3Diphthongs';
import { loadGradeThreeProgress } from '../../progress/gradeThreeProgress';
import { ShortVowelLessonPage } from './ShortVowelLessonPage';

function renderDiphthongLesson(slug = 'oi') {
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

describe('GradeThree oi lesson page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('把 coin 顯示為 c、oi、n 三個聲音單位', async () => {
    const user = userEvent.setup();

    renderDiphthongLesson();

    expect(screen.getByRole('heading', { name: 'oi 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('coin 逐音拼讀').children).toHaveLength(3);

    const cButton = screen.getByRole('button', { name: '播放 c 的聲音' });
    const oiButton = screen.getByRole('button', { name: '播放 oi 的聲音' });

    expect(cButton).toBeEnabled();
    expect(oiButton).toBeDisabled();

    await user.click(cButton);

    expect(oiButton).toBeEnabled();
  });

  it('完成 coin、soil、boil 後保存第三單元本機進度', async () => {
    const user = userEvent.setup();

    renderDiphthongLesson();

    for (const word of gradeThreeOiLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的聲音`,
          }),
        );
      }

      await user.click(
        screen.getByRole('button', {
          name: `合起來聽：${word.word}`,
        }),
      );
      await user.click(
        screen.getByRole('button', {
          name: word.word === 'boil' ? '完成第 1 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('coin · soil · boil')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：oy 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/oy',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeOiLesson.id].completed).toBe(
      true,
    );
  });

  it('完成 boy、toy、joy 後保存第二課進度', async () => {
    const user = userEvent.setup();

    renderDiphthongLesson('oy');

    expect(screen.getByRole('heading', { name: 'oy 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('boy 逐音拼讀').children).toHaveLength(2);

    for (const word of gradeThreeOyLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的聲音`,
          }),
        );
      }

      await user.click(
        screen.getByRole('button', {
          name: `合起來聽：${word.word}`,
        }),
      );
      await user.click(
        screen.getByRole('button', {
          name: word.word === 'joy' ? '完成第 2 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('boy · toy · joy')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：ou 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ou',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeOyLesson.id].completed).toBe(
      true,
    );
  });

  it('完成 cloud、house、mouth 後保存第三課進度與靜音 e 提示', async () => {
    const user = userEvent.setup();

    renderDiphthongLesson('ou');

    expect(screen.getByRole('heading', { name: 'ou 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('cloud 逐音拼讀').children).toHaveLength(4);

    for (const word of gradeThreeOuLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: segment.isSilent
              ? `查看 ${segment.grapheme} 的提示`
              : `播放 ${segment.grapheme} 的聲音`,
          }),
        );

        if (segment.isSilent) {
          expect(screen.getByRole('status')).toHaveTextContent(
            '字尾 e 不發音，它不會另外發出聲音。',
          );
        }
      }

      await user.click(
        screen.getByRole('button', {
          name: `合起來聽：${word.word}`,
        }),
      );
      await user.click(
        screen.getByRole('button', {
          name: word.word === 'mouth' ? '完成第 3 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('cloud · house · mouth')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：ow 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ow-diphthong',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeOuLesson.id].completed).toBe(
      true,
    );
  });

  it('完成 cow、clown、town 後保存第四課與第三單元進度', async () => {
    const user = userEvent.setup();

    renderDiphthongLesson('ow-diphthong');

    expect(screen.getByRole('heading', { name: 'ow 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('cow 逐音拼讀').children).toHaveLength(2);

    for (const word of gradeThreeOwLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的聲音`,
          }),
        );
      }

      await user.click(
        screen.getByRole('button', {
          name: `合起來聽：${word.word}`,
        }),
      );
      await user.click(
        screen.getByRole('button', {
          name: word.word === 'town' ? '完成第 4 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('cow · clown · town')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到三年級地圖' })).toHaveAttribute(
      'href',
      '/grade/3',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeOwLesson.id].completed).toBe(
      true,
    );
  });
});

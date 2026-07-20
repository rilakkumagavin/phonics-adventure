import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  gradeThreeDgeLesson,
  gradeThreeNgLesson,
  gradeThreePhLesson,
  gradeThreeTchLesson,
} from '../../curriculum/grade3AdvancedConsonants';
import { loadGradeThreeProgress } from '../../progress/gradeThreeProgress';
import { ShortVowelLessonPage } from './ShortVowelLessonPage';

function renderAdvancedConsonantLesson(slug = 'tch') {
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

describe('GradeThree tch lesson page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('把 catch 顯示為 c、a、tch 三個聲音單位', () => {
    renderAdvancedConsonantLesson();

    expect(screen.getByRole('heading', { name: 'tch 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('catch 逐音拼讀').children).toHaveLength(3);
    expect(screen.getByRole('button', { name: '播放 tch 的聲音' })).toBeDisabled();
  });

  it('完成 catch、hatch、patch 後保存第四單元本機進度', async () => {
    const user = userEvent.setup();

    renderAdvancedConsonantLesson();

    for (const word of gradeThreeTchLesson.words) {
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
          name: word.word === 'patch' ? '完成第 1 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('catch · hatch · patch')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：dge 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/dge',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeTchLesson.id].completed).toBe(
      true,
    );
  });

  it('完成 badge、bridge、fudge 後保存第二課進度', async () => {
    const user = userEvent.setup();

    renderAdvancedConsonantLesson('dge');

    expect(screen.getByRole('heading', { name: 'dge 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('badge 逐音拼讀').children).toHaveLength(3);

    for (const word of gradeThreeDgeLesson.words) {
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
          name: word.word === 'fudge' ? '完成第 2 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('badge · bridge · fudge')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：ph 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ph',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeDgeLesson.id].completed).toBe(
      true,
    );
  });

  it('完成 phone、graph、photo 後保存第三課進度與 phone 靜音 e', async () => {
    const user = userEvent.setup();

    renderAdvancedConsonantLesson('ph');

    expect(screen.getByRole('heading', { name: 'ph 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('phone 逐音拼讀').children).toHaveLength(4);

    for (const word of gradeThreePhLesson.words) {
      const segmentRow = screen.getByLabelText(`${word.word} 逐音拼讀`);
      const segmentButtons = within(segmentRow).getAllByRole('button');

      for (const segmentButton of segmentButtons) {
        await user.click(segmentButton);
      }

      await user.click(
        screen.getByRole('button', {
          name: `合起來聽：${word.word}`,
        }),
      );
      await user.click(
        screen.getByRole('button', {
          name: word.word === 'photo' ? '完成第 3 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('phone · graph · photo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：ng 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ng',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreePhLesson.id].completed).toBe(
      true,
    );
  });

  it('完成 ring、king、wing 後保存第四課進度', async () => {
    const user = userEvent.setup();

    renderAdvancedConsonantLesson('ng');

    expect(screen.getByRole('heading', { name: 'ng 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('ring 逐音拼讀').children).toHaveLength(3);

    for (const word of gradeThreeNgLesson.words) {
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
          name: word.word === 'wing' ? '完成第 4 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('ring · king · wing')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到三年級地圖' })).toHaveAttribute(
      'href',
      '/grade/3',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeNgLesson.id].completed).toBe(
      true,
    );
  });
});

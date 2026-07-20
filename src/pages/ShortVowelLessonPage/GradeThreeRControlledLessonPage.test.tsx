import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  gradeThreeArLesson,
  gradeThreeErLesson,
  gradeThreeIrLesson,
  gradeThreeOrLesson,
  gradeThreeUrLesson,
} from '../../curriculum/grade3RControlledVowels';
import { gradeThreeAiAyLesson } from '../../curriculum/grade3VowelTeams';
import {
  loadGradeThreeProgress,
  recordGradeThreeSegmentPractice,
} from '../../progress/gradeThreeProgress';
import { ShortVowelLessonPage } from './ShortVowelLessonPage';

function renderRControlledLesson(slug = 'ar') {
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

describe('GradeThree R-controlled vowel lesson page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('把 car 顯示為 c 和 ar 兩個聲音單位', async () => {
    const user = userEvent.setup();

    renderRControlledLesson();

    expect(screen.getByRole('heading', { name: 'ar 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('car 逐音拼讀').children).toHaveLength(2);

    const cButton = screen.getByRole('button', { name: '播放 c 的聲音' });
    const arButton = screen.getByRole('button', { name: '播放 ar 的聲音' });
    const blendButton = screen.getByRole('button', { name: '合起來聽：car' });

    expect(cButton).toBeEnabled();
    expect(arButton).toBeDisabled();
    expect(blendButton).toBeDisabled();

    await user.click(cButton);
    await user.click(arButton);

    expect(blendButton).toBeEnabled();
  });

  it('完成三個 ar 單字後保存第二單元進度且保留第一單元紀錄', async () => {
    const user = userEvent.setup();
    const rain = gradeThreeAiAyLesson.words[0];

    recordGradeThreeSegmentPractice({
      lessonId: gradeThreeAiAyLesson.id,
      wordId: rain.id,
      segmentId: rain.segments[0].id,
    });
    renderRControlledLesson();

    for (const word of gradeThreeArLesson.words) {
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
          name: word.word === 'farm' ? '完成第 1 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('car · star · farm')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：or 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/or',
    );

    const progress = loadGradeThreeProgress();

    expect(progress.lessons[gradeThreeArLesson.id].completed).toBe(true);
    expect(progress.lessons[gradeThreeAiAyLesson.id]).toBeDefined();
  });

  it('完成 or 課後保存進度，並正確提示 horse 的字尾 e 不發音', async () => {
    const user = userEvent.setup();

    renderRControlledLesson('or');

    expect(screen.getByRole('heading', { name: 'or 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('corn 逐音拼讀').children).toHaveLength(3);

    for (const word of gradeThreeOrLesson.words) {
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
          name: word.word === 'horse' ? '完成第 2 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('corn · fork · horse')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：er 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/er',
    );

    const progress = loadGradeThreeProgress();

    expect(progress.lessons[gradeThreeOrLesson.id].completed).toBe(true);
  });

  it('完成 er 課後保存 her、fern、germ 的逐音與整字練習', async () => {
    const user = userEvent.setup();

    renderRControlledLesson('er');

    expect(screen.getByRole('heading', { name: 'er 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('her 逐音拼讀').children).toHaveLength(2);

    for (const word of gradeThreeErLesson.words) {
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
          name: word.word === 'germ' ? '完成第 3 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('her · fern · germ')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：ir 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ir',
    );

    const progress = loadGradeThreeProgress();

    expect(progress.lessons[gradeThreeErLesson.id].completed).toBe(true);
  });

  it('完成 ir 課後保存 bird、girl、shirt 的逐音與整字練習', async () => {
    const user = userEvent.setup();

    renderRControlledLesson('ir');

    expect(screen.getByRole('heading', { name: 'ir 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('bird 逐音拼讀').children).toHaveLength(3);

    for (const word of gradeThreeIrLesson.words) {
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
          name: word.word === 'shirt' ? '完成第 4 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('bird · girl · shirt')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：ur 的聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ur',
    );

    const progress = loadGradeThreeProgress();

    expect(progress.lessons[gradeThreeIrLesson.id].completed).toBe(true);
  });

  it('完成 ur 課後保存進度並正確提示 nurse 的字尾 e 不發音', async () => {
    const user = userEvent.setup();

    renderRControlledLesson('ur');

    expect(screen.getByRole('heading', { name: 'ur 的聲音' })).toBeInTheDocument();
    expect(screen.getByLabelText('fur 逐音拼讀').children).toHaveLength(2);

    for (const word of gradeThreeUrLesson.words) {
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
          name: word.word === 'nurse' ? '完成第 5 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('fur · turn · nurse')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到三年級地圖' })).toHaveAttribute(
      'href',
      '/grade/3',
    );

    const progress = loadGradeThreeProgress();

    expect(progress.lessons[gradeThreeUrLesson.id].completed).toBe(true);
  });
});

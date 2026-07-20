import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  gradeThreeClosedSyllablesLesson,
  gradeThreeCompoundWordsLesson,
  gradeThreeFamiliarChunksLesson,
  gradeThreeMultisyllableChallengeLesson,
  gradeThreeOpenFirstSyllableLesson,
} from '../../curriculum/grade3MultisyllableWords';
import { loadGradeThreeProgress } from '../../progress/gradeThreeProgress';
import { ShortVowelLessonPage } from './ShortVowelLessonPage';

function renderMultisyllableLesson(slug = 'compound-words') {
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

describe('GradeThree compound words lesson page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('把 sunset 顯示為 sun 與 set 兩個可播放小段', () => {
    renderMultisyllableLesson();

    expect(
      screen.getByRole('heading', { name: '兩個小字合成長字' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('sunset 分段拆讀').children).toHaveLength(2);
    expect(screen.getByRole('button', { name: '播放 sun 的小段' })).toBeEnabled();
    expect(screen.getByRole('button', { name: '播放 set 的小段' })).toBeDisabled();
  });

  it('完成三個複合字後保存第五單元本機進度', async () => {
    const user = userEvent.setup();

    renderMultisyllableLesson();

    for (const word of gradeThreeCompoundWordsLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的小段`,
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
          name: word.word === 'raincoat' ? '完成第 1 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('sunset · cupcake · raincoat')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '你把小段合成長字了！' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '下一課：中間一刀，兩邊都短音' }),
    ).toHaveAttribute('href', '/grade/3/lesson/closed-syllables');
    expect(
      loadGradeThreeProgress().lessons[gradeThreeCompoundWordsLesson.id].completed,
    ).toBe(true);
  });

  it('完成 rabbit、picnic、magnet 後保存第二課進度', async () => {
    const user = userEvent.setup();

    renderMultisyllableLesson('closed-syllables');

    expect(
      screen.getByRole('heading', { name: '中間一刀，兩邊都短音' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('rabbit 分段拆讀').children).toHaveLength(2);

    for (const word of gradeThreeClosedSyllablesLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的小段`,
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
          name: word.word === 'magnet' ? '完成第 2 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('rabbit · picnic · magnet')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '下一課：第一段開口，母音念長音' }),
    ).toHaveAttribute('href', '/grade/3/lesson/open-first-syllable');
    expect(
      loadGradeThreeProgress().lessons[gradeThreeClosedSyllablesLesson.id].completed,
    ).toBe(true);
  });

  it('完成 tiger、robot、paper 後保存第三課進度', async () => {
    const user = userEvent.setup();

    renderMultisyllableLesson('open-first-syllable');

    expect(
      screen.getByRole('heading', { name: '第一段開口，母音念長音' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('tiger 分段拆讀').children).toHaveLength(2);

    for (const word of gradeThreeOpenFirstSyllableLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的小段`,
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
          name: word.word === 'paper' ? '完成第 3 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('tiger · robot · paper')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '下一課：長字裡的熟悉聲音' }),
    ).toHaveAttribute('href', '/grade/3/lesson/familiar-chunks');
    expect(
      loadGradeThreeProgress().lessons[gradeThreeOpenFirstSyllableLesson.id].completed,
    ).toBe(true);
  });

  it('完成 rainbow、seaside、daylight 後保存第四課進度', async () => {
    const user = userEvent.setup();

    renderMultisyllableLesson('familiar-chunks');

    expect(
      screen.getByRole('heading', { name: '長字裡的熟悉聲音' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('rainbow 分段拆讀').children).toHaveLength(2);

    for (const word of gradeThreeFamiliarChunksLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的小段`,
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
          name: word.word === 'daylight' ? '完成第 4 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('rainbow · seaside · daylight')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：長字拆讀闖關' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/multisyllable-challenge',
    );
    expect(
      loadGradeThreeProgress().lessons[gradeThreeFamiliarChunksLesson.id].completed,
    ).toBe(true);
  });

  it('完成混合拆讀闖關後保存第五課與單元進度', async () => {
    const user = userEvent.setup();

    renderMultisyllableLesson('multisyllable-challenge');

    expect(screen.getByRole('heading', { name: '長字拆讀闖關' })).toBeInTheDocument();

    for (const word of gradeThreeMultisyllableChallengeLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的小段`,
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
          name: word.word === 'rainbow' ? '完成第 5 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('sunset · rabbit · rainbow')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到三年級地圖' })).toHaveAttribute(
      'href',
      '/grade/3',
    );
    expect(
      loadGradeThreeProgress().lessons[gradeThreeMultisyllableChallengeLesson.id]
        .completed,
    ).toBe(true);
  });
});

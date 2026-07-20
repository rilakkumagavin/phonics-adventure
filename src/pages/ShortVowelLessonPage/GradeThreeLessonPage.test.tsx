import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  gradeThreeAlternateVowelTeamsLesson,
  gradeThreeAiAyLesson,
  gradeThreeEeEaLesson,
  gradeThreeOaOwLesson,
  gradeThreeVowelTeamChallengeLesson,
  gradeThreeVowelTeamReviewLesson,
} from '../../curriculum/grade3VowelTeams';
import {
  gradeThreeProgressStorageKey,
  loadGradeThreeProgress,
  recordGradeThreeBlendPractice,
  recordGradeThreeSegmentPractice,
} from '../../progress/gradeThreeProgress';
import { gradeTwoProgressStorageKey } from '../../progress/gradeTwoProgress';
import { learningProgressStorageKey } from '../../progress/learningProgress';
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

describe('GradeThree ai/ay lesson page', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
  });

  it('把 ai 當成一個聲音單位，依序開放 rain 的逐音與合音', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson();

    const rButton = screen.getByRole('button', { name: '播放 r 的聲音' });
    const aiButton = screen.getByRole('button', { name: '播放 ai 的聲音' });
    const nButton = screen.getByRole('button', { name: '播放 n 的聲音' });
    const blendButton = screen.getByRole('button', {
      name: '合起來聽：rain',
    });

    expect(rButton).toBeEnabled();
    expect(aiButton).toBeDisabled();
    expect(nButton).toBeDisabled();
    expect(blendButton).toBeDisabled();

    await user.click(rButton);
    await user.click(aiButton);
    await user.click(nButton);

    expect(blendButton).toBeEnabled();
    await user.click(blendButton);

    expect(screen.getByRole('button', { name: '下一個字' })).toBeInTheDocument();
    expect(
      loadGradeThreeProgress().lessons[gradeThreeAiAyLesson.id].words[
        gradeThreeAiAyLesson.words[0].id
      ].blendPlayCount,
    ).toBe(1);
    expect(localStorage.getItem(gradeThreeProgressStorageKey)).not.toBeNull();
    expect(localStorage.getItem(gradeTwoProgressStorageKey)).toBeNull();
    expect(localStorage.getItem(learningProgressStorageKey)).toBeNull();
  });

  it('完成 rain、train、play 後儲存課程完成狀態', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson();

    for (const word of gradeThreeAiAyLesson.words) {
      for (const segment of word.segments) {
        await user.click(
          screen.getByRole('button', {
            name: `播放 ${segment.grapheme} 的聲音`,
          }),
        );
      }

      await user.click(screen.getByRole('button', { name: `合起來聽：${word.word}` }));
      await user.click(
        screen.getByRole('button', {
          name: word.word === 'play' ? '完成第 1 課' : '下一個字',
        }),
      );
    }

    expect(
      screen.getByRole('heading', { name: '你把聲音合成單字了！' }),
    ).toBeInTheDocument();
    expect(screen.getByText('rain · train · play')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：ee 和 ea' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ee-ea',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeAiAyLesson.id].completed).toBe(
      true,
    );
  });

  it('第二課依序呈現 ee、ea 與 beach 的 ch 聲音單位', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson('ee-ea');

    expect(screen.getByRole('heading', { name: 'ee 和 ea' })).toBeInTheDocument();
    expect(screen.getByText('seed')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '播放 ee 的聲音' })).toBeDisabled();

    for (const word of gradeThreeEeEaLesson.words.slice(0, 2)) {
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
      await user.click(screen.getByRole('button', { name: '下一個字' }));
    }

    expect(screen.getByText('beach')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '播放 ea 的聲音' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '播放 ch 的聲音' })).toBeDisabled();
  });

  it('完成第二課後進入 oa/ow 第三課', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson('ee-ea');

    for (const word of gradeThreeEeEaLesson.words) {
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
          name: word.word === 'beach' ? '完成第 2 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('seed · leaf · beach')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：oa 和 ow' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/oa-ow',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeEeEaLesson.id].completed).toBe(
      true,
    );
  });

  it('第三課把 oa 與 ow 視為共同的長母音', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson('oa-ow');

    expect(screen.getByRole('heading', { name: 'oa 和 ow' })).toBeInTheDocument();
    expect(screen.getByText('boat')).toBeInTheDocument();

    const bButton = screen.getByRole('button', { name: '播放 b 的聲音' });
    const oaButton = screen.getByRole('button', { name: '播放 oa 的聲音' });
    const tButton = screen.getByRole('button', { name: '播放 t 的聲音' });

    expect(bButton).toBeEnabled();
    expect(oaButton).toBeDisabled();
    expect(tButton).toBeDisabled();

    await user.click(bButton);
    await user.click(oaButton);
    await user.click(tButton);

    expect(screen.getByRole('button', { name: '合起來聽：boat' })).toBeEnabled();
  });

  it('完成第三課後進入母音組合混合複習', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson('oa-ow');

    for (const word of gradeThreeOaOwLesson.words) {
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
          name: word.word === 'snow' ? '完成第 3 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('boat · goat · snow')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：三種母音聲音' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/vowel-team-review-1',
    );
    expect(loadGradeThreeProgress().lessons[gradeThreeOaOwLesson.id].completed).toBe(
      true,
    );
  });

  it('第四課混合複習三種聲音並進入第五課', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson('vowel-team-review-1');

    expect(screen.getByRole('heading', { name: '三種母音聲音' })).toBeInTheDocument();

    for (const word of gradeThreeVowelTeamReviewLesson.words) {
      expect(screen.getByText(word.word)).toBeInTheDocument();

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
          name: word.word === 'boat' ? '完成第 4 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('rain · seed · boat')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '下一課：換一種拼法' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/alternate-vowel-teams',
    );
    expect(
      loadGradeThreeProgress().lessons[gradeThreeVowelTeamReviewLesson.id].completed,
    ).toBe(true);
  });

  it('第五課依序複習 ay、ea、ow 並進入闖關課', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson('alternate-vowel-teams');

    expect(screen.getByRole('heading', { name: '換一種拼法' })).toBeInTheDocument();

    for (const word of gradeThreeAlternateVowelTeamsLesson.words) {
      expect(screen.getByText(word.word)).toBeInTheDocument();

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
          name: word.word === 'snow' ? '完成第 5 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('play · leaf · snow')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: '下一課：母音好朋友闖關' }),
    ).toHaveAttribute('href', '/grade/3/lesson/vowel-team-challenge');
    expect(
      loadGradeThreeProgress().lessons[gradeThreeAlternateVowelTeamsLesson.id]
        .completed,
    ).toBe(true);
  });

  it('第六課完成綜合拼讀並保存第一單元完成狀態', async () => {
    const user = userEvent.setup();

    renderGradeThreeLesson('vowel-team-challenge');

    expect(screen.getByRole('heading', { name: '母音好朋友闖關' })).toBeInTheDocument();

    for (const word of gradeThreeVowelTeamChallengeLesson.words) {
      expect(screen.getByText(word.word)).toBeInTheDocument();

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
          name: word.word === 'goat' ? '完成第 6 課' : '下一個字',
        }),
      );
    }

    expect(screen.getByText('train · beach · goat')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '回到三年級地圖' })).toHaveAttribute(
      'href',
      '/grade/3',
    );
    expect(
      loadGradeThreeProgress().lessons[gradeThreeVowelTeamChallengeLesson.id].completed,
    ).toBe(true);
  });

  it('重新進入時回到第一個未完成單字', () => {
    const rain = gradeThreeAiAyLesson.words[0];

    for (const segment of rain.segments) {
      recordGradeThreeSegmentPractice({
        lessonId: gradeThreeAiAyLesson.id,
        wordId: rain.id,
        segmentId: segment.id,
      });
    }
    recordGradeThreeBlendPractice({
      lessonId: gradeThreeAiAyLesson.id,
      wordId: rain.id,
    });

    renderGradeThreeLesson();

    expect(screen.getByText('train')).toBeInTheDocument();
    expect(screen.getByText('第 2 個字，共 3 個')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      '從 train 繼續，一個音、一個音慢慢聽。',
    );
  });
});

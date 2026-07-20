import { StrictMode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import {
  learningProgressStorageKey,
  loadLearningProgress,
} from '../../progress/learningProgress';
import { CompletePage } from './CompletePage';

function renderCompletePage(path: string) {
  return render(
    <StrictMode>
      <MemoryRouter initialEntries={[path]}>
        <CompletePage />
      </MemoryRouter>
    </StrictMode>,
  );
}

describe('CompletePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('完成頁會依 query 寫入本機學習進度', async () => {
    renderCompletePage(
      '/complete?activityId=a-letter-image-match-01&letterId=a&skill=reading&mistakes=2',
    );

    expect(
      screen.getByRole('heading', { name: '今天的任務完成了' }),
    ).toBeInTheDocument();
    expect(screen.getByText('這次練習：閱讀')).toBeInTheDocument();
    expect(screen.getByText('再試一次：2 次')).toBeInTheDocument();

    await waitFor(() => {
      const progress = loadLearningProgress();

      expect(progress.letters.a.completed).toBe(false);
      expect(progress.letters.a.skills.reading.correctCount).toBe(1);
      expect(progress.letters.a.skills.reading.wrongCount).toBe(2);
    });

    expect(localStorage.getItem(learningProgressStorageKey)).toContain(
      'a-letter-image-match-01',
    );
  });

  it('StrictMode 重跑 effect 時同一次完成只記錄一次', async () => {
    renderCompletePage(
      '/complete?activityId=a-letter-image-match-01&letterId=a&skill=reading',
    );

    await waitFor(() => {
      expect(loadLearningProgress().letters.a.skills.reading.correctCount).toBe(1);
    });
  });

  it('本機儲存失敗時仍可完成任務並顯示提醒', async () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage quota exceeded', 'QuotaExceededError');
    });

    renderCompletePage(
      '/complete?activityId=a-letter-image-match-01&letterId=a&skill=reading',
    );

    expect(
      screen.getByRole('heading', { name: '今天的任務完成了' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('這次練習完成了，但目前裝置無法儲存進度。'),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      '你仍可繼續學習，稍後可以再試一次。',
    );
    expect(screen.getByRole('link', { name: '查看學習地圖' })).toHaveAttribute(
      'href',
      '/map',
    );
  });

  it.each([
    ['/complete', '缺少參數'],
    [
      '/complete?activityId=a-letter-image-match-01&letterId=z&skill=reading',
      '未知字母',
    ],
    [
      '/complete?activityId=b-letter-image-match-01&letterId=a&skill=reading',
      '跨課活動',
    ],
    [
      '/complete?activityId=a-letter-image-match-01&letterId=a&skill=listening',
      '能力不符',
    ],
  ])('%s（%s）不會寫入本機進度', (path) => {
    renderCompletePage(path);

    expect(
      screen.getByRole('heading', { name: '無法記錄這次練習' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '返回學習地圖' })).toHaveAttribute(
      'href',
      '/map',
    );
    expect(localStorage.getItem(learningProgressStorageKey)).toBeNull();
  });
});

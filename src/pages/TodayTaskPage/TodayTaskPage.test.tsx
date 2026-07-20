import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { recordLearningActivity } from '../../progress/learningProgress';
import { TodayTaskPage } from './TodayTaskPage';

function renderTodayTaskPage() {
  return render(
    <MemoryRouter>
      <TodayTaskPage />
    </MemoryRouter>,
  );
}

describe('TodayTaskPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('沒有進度時顯示新內容任務', () => {
    renderTodayTaskPage();

    expect(screen.getByRole('heading', { name: '今日任務' })).toBeInTheDocument();
    expect(
      screen.queryByText(
        '這是 Phase 2 假流程，尚未建立每日任務演算法或 localStorage。',
      ),
    ).not.toBeInTheDocument();
    expect(screen.getAllByText('新內容').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: '開始第一個任務' })).toHaveAttribute(
      'href',
      '/game/listen-and-choose?letterId=a&activityId=a-listen-word-picture-01',
    );
  });

  it('有到期進度時顯示到期複習與加強練習', () => {
    recordLearningActivity({
      activityId: 'a-listen-initial-sound-02',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-06-29T10:00:00.000Z'),
    });

    renderTodayTaskPage();

    expect(screen.getAllByText('到期複習').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('加強練習').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('複習 A 的聲音。')).toBeInTheDocument();
  });

  it('標示今天已完成的活動並優先繼續未完成任務', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 6, 1, 12, 0));
    recordLearningActivity({
      activityId: 'a-listen-word-picture-01',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date(2026, 6, 1, 10, 0),
    });

    renderTodayTaskPage();

    expect(screen.getByText('今天已完成')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '再練一次' })).toHaveAttribute(
      'href',
      '/game/listen-and-choose?letterId=a&activityId=a-listen-word-picture-01',
    );
    expect(screen.getByRole('link', { name: '繼續今日任務' })).not.toHaveAttribute(
      'href',
      '/game/listen-and-choose?letterId=a&activityId=a-listen-word-picture-01',
    );
  });
});

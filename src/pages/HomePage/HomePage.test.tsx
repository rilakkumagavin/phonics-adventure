import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { AppLayout } from '../../components/AppLayout/AppLayout';
import { recordLearningActivity } from '../../progress/learningProgress';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('沒有進度時直接引導進入 A 的小步驟課程', () => {
    render(
      <MemoryRouter>
        <AppLayout>
          <HomePage />
        </AppLayout>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Phonics Adventure' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '開始學 A' })).toHaveAttribute(
      'href',
      '/lesson/a',
    );
    expect(screen.getByRole('img', { name: '一顆帶著綠葉的紅蘋果' })).toHaveAttribute(
      'src',
      '/assets/images/courses/a/a-apple-core.webp',
    );
    expect(screen.getByText('已完成 0 / 26 個字母')).toBeInTheDocument();
    expect(screen.getAllByText('0%')).toHaveLength(3);
  });

  it('完成 A 後把下一個主入口切到 B', () => {
    recordLearningActivity({
      activityId: 'a-listen-initial-sound-02',
      letterId: 'a',
      skill: 'listening',
      completedAt: new Date('2026-07-01T10:00:00.000Z'),
    });
    recordLearningActivity({
      activityId: 'a-record-and-playback-01',
      letterId: 'a',
      skill: 'speaking',
      completedAt: new Date('2026-07-01T10:05:00.000Z'),
    });
    recordLearningActivity({
      activityId: 'a-letter-image-match-01',
      letterId: 'a',
      skill: 'reading',
      completedAt: new Date('2026-07-01T10:10:00.000Z'),
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 1 / 26 個字母')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '開始學 B' })).toHaveAttribute(
      'href',
      '/lesson/b',
    );
    expect(screen.getAllByText('25%')).toHaveLength(3);
  });
});

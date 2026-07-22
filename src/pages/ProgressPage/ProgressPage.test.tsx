import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  learningProgressStorageKey,
  recordLearningActivity,
} from '../../progress/learningProgress';
import { ProgressPage } from './ProgressPage';

describe('ProgressPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('沒有進度時顯示空狀態摘要', () => {
    render(<ProgressPage />);

    expect(screen.getByRole('heading', { name: '我的進度' })).toBeInTheDocument();
    expect(screen.getByText('已完成字母：0／26')).toBeInTheDocument();
    expect(screen.getByText('答對次數：0')).toBeInTheDocument();
    expect(screen.getAllByText('0%')).toHaveLength(9);
  });

  it('讀取 localStorage 顯示已完成字母與能力熟練度', () => {
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

    render(<ProgressPage />);

    expect(screen.getByText('已完成字母：1／26')).toBeInTheDocument();
    expect(screen.getByText('答對次數：3')).toBeInTheDocument();
    expect(screen.getByText('最近複習日期：2026-07-01')).toBeInTheDocument();
    expect(screen.getByText('下次複習日期：2026-07-02')).toBeInTheDocument();
    expect(screen.getAllByText('25%')).toHaveLength(3);
  });

  it('巢狀進度資料損壞時安全顯示空狀態', () => {
    localStorage.setItem(
      learningProgressStorageKey,
      JSON.stringify({
        version: 1,
        updatedAt: null,
        letters: { a: {} },
        activityCompletions: {},
      }),
    );

    render(<ProgressPage />);

    expect(screen.getByText('已完成字母：0／26')).toBeInTheDocument();
    expect(screen.getByText('答對次數：0')).toBeInTheDocument();
    expect(screen.getByText('答錯次數：0')).toBeInTheDocument();
  });
});

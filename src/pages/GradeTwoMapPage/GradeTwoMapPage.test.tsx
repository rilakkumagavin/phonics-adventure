import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import {
  getGradeTwoUnitLessons,
} from '../../curriculum/gradeTwoLessonRepository';
import { gradeTwoShortALesson } from '../../curriculum/grade2ShortA';
import {
  completeGradeTwoLesson,
  recordGradeTwoSegmentPractice,
} from '../../progress/gradeTwoProgress';
import { GradeTwoMapPage } from './GradeTwoMapPage';

describe('GradeTwoMapPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('顯示六個依序排列的二年級單元', () => {
    render(
      <MemoryRouter>
        <GradeTwoMapPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: '二年級自然發音' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('二年級學習單元').children).toHaveLength(6);
    expect(screen.getByRole('heading', { name: '短母音拼讀' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '一句一句讀' })).toBeInTheDocument();
    expect(screen.getByText('尚未開始')).toBeInTheDocument();
    expect(screen.getAllByText('完成上一單元後開啟')).toHaveLength(5);
    expect(screen.queryByText('規劃中')).not.toBeInTheDocument();
    expect(screen.getAllByText('已完成 0 / 5 課')).toHaveLength(4);
    expect(screen.getAllByText('最近練習：尚無紀錄')).toHaveLength(6);
    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/2/lesson/short-a',
    );
    expect(screen.getByRole('link', { name: '回到字母課程' })).toHaveAttribute(
      'href',
      '/map',
    );
    expect(
      screen.queryByRole('link', { name: '開始第一課' }),
    ).toBeInTheDocument();
  });

  it('有音段紀錄時顯示練習中、日期與繼續入口', () => {
    recordGradeTwoSegmentPractice({
      lessonId: gradeTwoShortALesson.id,
      wordId: gradeTwoShortALesson.words[0].id,
      segmentId: gradeTwoShortALesson.words[0].segments[0].id,
      practicedAt: new Date(2026, 6, 18, 10, 0),
    });

    render(
      <MemoryRouter>
        <GradeTwoMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('練習中')).toBeInTheDocument();
    expect(screen.getByText('最近練習：2026-07-18')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/2/lesson/short-a',
    );
  });

  it('完成第一課後顯示單元練習中並前往短母音 e', () => {
    completeGradeTwoLesson({
      lessonId: gradeTwoShortALesson.id,
      completedAt: new Date(2026, 6, 19, 10, 0),
    });

    render(
      <MemoryRouter>
        <GradeTwoMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('練習中')).toBeInTheDocument();
    expect(screen.getByText('已完成 1 / 5 課')).toBeInTheDocument();
    expect(screen.getByText('最近練習：2026-07-19')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/2/lesson/short-e',
    );
  });

  it('五課全部完成後顯示單元已完成與再次練習入口', () => {
    getGradeTwoUnitLessons('grade-2-short-vowels').forEach((lesson, index) => {
      completeGradeTwoLesson({
        lessonId: lesson.id,
        completedAt: new Date(2026, 6, 19 + index, 10, 0),
      });
    });

    render(
      <MemoryRouter>
        <GradeTwoMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成')).toBeInTheDocument();
    expect(screen.getByText('已完成 5 / 5 課')).toBeInTheDocument();
    expect(screen.getByText('最近練習：2026-07-23')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '再練一次' })).toHaveAttribute(
      'href',
      '/grade/2/lesson/short-a',
    );
    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/2/lesson/family-at',
    );
  });
});

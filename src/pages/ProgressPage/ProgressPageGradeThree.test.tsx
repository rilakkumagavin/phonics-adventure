import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { gradeThreeCurriculum } from '../../curriculum/grade3';
import { completeGradeThreeLesson } from '../../progress/gradeThreeProgress';
import { ProgressPage } from './ProgressPage';

describe('ProgressPage grade 3 summary', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows every grade 3 unit with its completion progress', () => {
    render(<ProgressPage />);

    expect(screen.getByLabelText('三年級單元進度')).toBeInTheDocument();

    for (const unit of gradeThreeCurriculum.units) {
      expect(screen.getByRole('heading', { name: unit.title })).toBeInTheDocument();
      expect(
        screen.getByRole('progressbar', { name: `${unit.title} 三年級進度` }),
      ).toHaveAttribute('aria-valuenow', '0');
    }
  });

  it('updates a grade 3 unit when one lesson is complete', () => {
    const firstUnit = gradeThreeCurriculum.units[0];

    completeGradeThreeLesson({
      lessonId: firstUnit.lessonIds[0],
      completedAt: new Date(2026, 6, 20, 11, 0),
    });

    render(<ProgressPage />);

    expect(
      screen.getByRole('progressbar', { name: `${firstUnit.title} 三年級進度` }),
    ).toHaveAttribute('aria-valuenow', '17');
    expect(screen.getByText(`已完成 1 / ${firstUnit.lessonIds.length} 課`)).toBeInTheDocument();
    expect(screen.getByText('最近練習：2026-07-20')).toBeInTheDocument();
  });
});

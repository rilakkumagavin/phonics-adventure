import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { getAllCourses } from '../../courses/courseRepository';
import { LearningMapPage } from './LearningMapPage';

describe('LearningMapPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('顯示目前連續建立的字母並都可以進入課程', () => {
    render(
      <MemoryRouter>
        <LearningMapPage />
      </MemoryRouter>,
    );

    const courses = getAllCourses();

    for (const letter of courses.map((course) => course.letter.uppercase)) {
      expect(screen.getByText(letter)).toBeInTheDocument();
    }

    expect(screen.getAllByRole('link', { name: '進入課程' })).toHaveLength(
      courses.length,
    );
    expect(screen.queryByRole('button', { name: '尚未解鎖' })).not.toBeInTheDocument();
  });
});

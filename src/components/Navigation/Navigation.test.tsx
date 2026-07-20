import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { Navigation } from './Navigation';

describe('Navigation', () => {
  it('主導覽提供字母課程、二年級課程與進度入口', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <Navigation />
      </MemoryRouter>,
    );

    const startLink = screen.getByRole('link', { name: '前往開始' });
    const mapLink = screen.getByRole('link', { name: '前往選字母' });
    const gradeTwoLink = screen.getByRole('link', { name: '前往二年級' });
    const gradeThreeLink = screen.getByRole('link', { name: '前往三年級' });
    const progressLink = screen.getByRole('link', { name: '前往進度' });

    expect(startLink).toHaveAttribute('href', '/');
    expect(mapLink).toHaveAttribute('href', '/map');
    expect(gradeTwoLink).toHaveAttribute('href', '/grade/2');
    expect(gradeThreeLink).toHaveAttribute('href', '/grade/3');
    expect(progressLink).toHaveAttribute('href', '/progress');
    expect(
      screen.queryByRole('link', { name: '前往今日任務' }),
    ).not.toBeInTheDocument();

    await user.click(mapLink);
    expect(mapLink).toHaveAttribute('aria-current', 'page');
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('提供正確的無障礙數值屬性', () => {
    render(<ProgressBar label="聽力進度" value={35} />);

    const progressbar = screen.getByRole('progressbar', { name: '聽力進度' });
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-valuenow', '35');
  });
});

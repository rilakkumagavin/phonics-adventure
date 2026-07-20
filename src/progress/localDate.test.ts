import { describe, expect, it } from 'vitest';

import { addLocalDays, isValidDateKey, toLocalDateKey } from './localDate';

describe('localDate', () => {
  it('使用裝置本地年月日，不依賴 UTC 字串', () => {
    const localCalendarDate = {
      getFullYear: () => 2026,
      getMonth: () => 6,
      getDate: () => 4,
    } as Date;

    expect(toLocalDateKey(localCalendarDate)).toBe('2026-07-04');
  });

  it('加一天可以安全跨月', () => {
    expect(addLocalDays(new Date(2026, 0, 31, 23, 30), 1)).toBe('2026-02-01');
  });

  it('拒絕不存在的日曆日期', () => {
    expect(isValidDateKey('2026-02-28')).toBe(true);
    expect(isValidDateKey('2026-02-29')).toBe(false);
    expect(isValidDateKey('2024-02-29')).toBe(true);
    expect(isValidDateKey('2026-13-01')).toBe(false);
  });
});

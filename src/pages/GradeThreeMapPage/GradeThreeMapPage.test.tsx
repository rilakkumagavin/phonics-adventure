import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import { gradeThreeCurriculum } from '../../curriculum/grade3';
import {
  gradeThreeDgeLesson,
  gradeThreeNgLesson,
  gradeThreePhLesson,
  gradeThreeTchLesson,
} from '../../curriculum/grade3AdvancedConsonants';
import {
  gradeThreeOiLesson,
  gradeThreeOuLesson,
  gradeThreeOwLesson,
  gradeThreeOyLesson,
} from '../../curriculum/grade3Diphthongs';
import {
  gradeThreeArLesson,
  gradeThreeErLesson,
  gradeThreeIrLesson,
  gradeThreeOrLesson,
  gradeThreeUrLesson,
} from '../../curriculum/grade3RControlledVowels';
import { gradeThreeCompoundWordsLesson } from '../../curriculum/grade3MultisyllableWords';
import { gradeThreeReadingFluencyLessons } from '../../curriculum/grade3ReadingFluency';
import {
  gradeThreeAlternateVowelTeamsLesson,
  gradeThreeAiAyLesson,
  gradeThreeEeEaLesson,
  gradeThreeOaOwLesson,
  gradeThreeVowelTeamReviewLesson,
} from '../../curriculum/grade3VowelTeams';
import {
  completeGradeThreeLesson,
  recordGradeThreeSegmentPractice,
} from '../../progress/gradeThreeProgress';
import { GradeThreeMapPage } from './GradeThreeMapPage';

describe('GradeThreeMapPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders progress rails for every grade 3 unit', () => {
    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    const progressBars = screen.getAllByRole('progressbar');

    expect(progressBars).toHaveLength(6);
    expect(progressBars.every((bar) => bar.getAttribute('aria-valuenow') === '0')).toBe(
      true,
    );
  });

  it('updates the visible unit progress rail after a lesson is complete', () => {
    completeGradeThreeLesson({
      lessonId: gradeThreeAiAyLesson.id,
      completedAt: new Date(2026, 6, 20, 11, 0),
    });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getAllByRole('progressbar')[0]).toHaveAttribute(
      'aria-valuenow',
      '17',
    );
    expect(screen.getByText('下一課')).toBeInTheDocument();
    expect(screen.getByText(gradeThreeEeEaLesson.title)).toBeInTheDocument();
  });

  it('顯示 ai/ay 第一課入口，其餘單元依序鎖定', () => {
    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '三年級自然發音' })).toBeInTheDocument();
    expect(screen.getByLabelText('三年級自然發音學習順序').children).toHaveLength(6);
    expect(screen.getByRole('heading', { name: '母音好朋友' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '短文流暢閱讀' })).toBeInTheDocument();
    expect(screen.queryByText('課程規劃中')).not.toBeInTheDocument();
    expect(screen.getAllByText('先完成上一單元')).toHaveLength(5);
    expect(screen.getByText('可以開始')).toBeInTheDocument();
    expect(screen.getByText('已完成 0 / 6 課')).toBeInTheDocument();
    expect(screen.getAllByText('已完成 0 / 5 課')).toHaveLength(3);
    expect(screen.getAllByText('已完成 0 / 4 課')).toHaveLength(2);
    expect(screen.getAllByText('最近練習：還沒有紀錄')).toHaveLength(6);
    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ai-ay',
    );
  });

  it('完成第一課後自動把入口移到 ee/ea 第二課', () => {
    completeGradeThreeLesson({
      lessonId: gradeThreeAiAyLesson.id,
      completedAt: new Date(2026, 6, 20, 11, 0),
    });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('練習中')).toBeInTheDocument();
    expect(screen.getByText('已完成 1 / 6 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ee-ea',
    );
  });

  it('完成前兩課後自動把入口移到 oa/ow 第三課', () => {
    completeGradeThreeLesson({ lessonId: gradeThreeAiAyLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeEeEaLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 2 / 6 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/oa-ow',
    );
  });

  it('完成前三課後自動把入口移到混合複習第四課', () => {
    completeGradeThreeLesson({ lessonId: gradeThreeAiAyLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeEeEaLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOaOwLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 3 / 6 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/vowel-team-review-1',
    );
  });

  it('完成前四課後自動把入口移到第五課', () => {
    completeGradeThreeLesson({ lessonId: gradeThreeAiAyLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeEeEaLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOaOwLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeVowelTeamReviewLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 4 / 6 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/alternate-vowel-teams',
    );
  });

  it('完成前五課後自動把入口移到第六課', () => {
    completeGradeThreeLesson({ lessonId: gradeThreeAiAyLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeEeEaLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOaOwLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeVowelTeamReviewLesson.id });
    completeGradeThreeLesson({
      lessonId: gradeThreeAlternateVowelTeamsLesson.id,
    });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 5 / 6 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/vowel-team-challenge',
    );
  });

  it('完成六課後顯示單元完成並提供再次練習入口', () => {
    for (const lessonId of gradeThreeCurriculum.units[0].lessonIds) {
      completeGradeThreeLesson({ lessonId });
    }

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 6 / 6 課')).toBeInTheDocument();
    expect(screen.getByText('已完成')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '再練一次' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ai-ay',
    );
    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ar',
    );
  });

  it('完成 ar 後把 R 控制母音入口移到 or 第二課', () => {
    for (const lessonId of gradeThreeCurriculum.units[0].lessonIds) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeArLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 1 / 5 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/or',
    );
  });

  it('完成 or 後把 R 控制母音入口移到 er 第三課', () => {
    for (const lessonId of gradeThreeCurriculum.units[0].lessonIds) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeArLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOrLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 2 / 5 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/er',
    );
  });

  it('完成 er 後把 R 控制母音入口移到 ir 第四課', () => {
    for (const lessonId of gradeThreeCurriculum.units[0].lessonIds) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeArLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOrLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeErLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 3 / 5 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ir',
    );
  });

  it('完成 ir 後把 R 控制母音入口移到 ur 第五課', () => {
    for (const lessonId of gradeThreeCurriculum.units[0].lessonIds) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeArLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOrLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeErLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeIrLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 4 / 5 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ur',
    );
  });

  it('完成五課後顯示 R 控制母音單元完成並保留再次練習入口', () => {
    for (const lessonId of gradeThreeCurriculum.units[0].lessonIds) {
      completeGradeThreeLesson({ lessonId });
    }
    for (const lessonId of [
      gradeThreeArLesson.id,
      gradeThreeOrLesson.id,
      gradeThreeErLesson.id,
      gradeThreeIrLesson.id,
      gradeThreeUrLesson.id,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 5 / 5 課')).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('link', { name: '再練一次' })
        .some((link) => link.getAttribute('href') === '/grade/3/lesson/ar'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/oi',
    );
  });

  it('完成 oi 後把滑動母音入口移到 oy 第二課', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeOiLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 1 / 4 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/oy',
    );
  });

  it('完成 oy 後把滑動母音入口移到 ou 第三課', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeOiLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOyLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 2 / 4 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ou',
    );
  });

  it('完成 ou 後把滑動母音入口移到 ow 第四課', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeOiLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOyLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeOuLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 3 / 4 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ow-diphthong',
    );
  });

  it('完成四課後顯示滑動母音單元完成並保留再次練習入口', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
      gradeThreeOiLesson.id,
      gradeThreeOyLesson.id,
      gradeThreeOuLesson.id,
      gradeThreeOwLesson.id,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 4 / 4 課')).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('link', { name: '再練一次' })
        .some((link) => link.getAttribute('href') === '/grade/3/lesson/oi'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/tch',
    );
  });

  it('完成 tch 後把進階子音組合入口移到 dge 第二課', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
      ...gradeThreeCurriculum.units[2].lessonIds,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeTchLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 1 / 4 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/dge',
    );
  });

  it('完成 dge 後把進階子音組合入口移到 ph 第三課', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
      ...gradeThreeCurriculum.units[2].lessonIds,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeTchLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeDgeLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 2 / 4 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ph',
    );
  });

  it('完成 ph 後把進階子音組合入口移到 ng 第四課', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
      ...gradeThreeCurriculum.units[2].lessonIds,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }
    completeGradeThreeLesson({ lessonId: gradeThreeTchLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreeDgeLesson.id });
    completeGradeThreeLesson({ lessonId: gradeThreePhLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 3 / 4 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ng',
    );
  });

  it('完成四課後顯示進階子音組合完成', () => {
    for (const lessonId of [
      ...gradeThreeCurriculum.units[0].lessonIds,
      ...gradeThreeCurriculum.units[1].lessonIds,
      ...gradeThreeCurriculum.units[2].lessonIds,
      gradeThreeTchLesson.id,
      gradeThreeDgeLesson.id,
      gradeThreePhLesson.id,
      gradeThreeNgLesson.id,
    ]) {
      completeGradeThreeLesson({ lessonId });
    }

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getAllByText('已完成 4 / 4 課')).toHaveLength(2);
    expect(
      screen
        .getAllByRole('link', { name: '再練一次' })
        .some((link) => link.getAttribute('href') === '/grade/3/lesson/tch'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/compound-words',
    );
  });

  it('完成複合字第一課後把長字拆讀入口移到閉音節第二課', () => {
    for (const unit of gradeThreeCurriculum.units.slice(0, 4)) {
      for (const lessonId of unit.lessonIds) {
        completeGradeThreeLesson({ lessonId });
      }
    }
    completeGradeThreeLesson({ lessonId: gradeThreeCompoundWordsLesson.id });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 1 / 5 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/closed-syllables',
    );
  });

  it('完成前五單元後開放短文流暢閱讀第一課', () => {
    for (const unit of gradeThreeCurriculum.units.slice(0, 5)) {
      for (const lessonId of unit.lessonIds) {
        completeGradeThreeLesson({ lessonId });
      }
    }

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: '開始第一課' })).toHaveAttribute(
      'href',
      '/grade/3/read/train-in-rain',
    );
  });

  it('完成第一篇閱讀後把入口移到第二課', () => {
    for (const unit of gradeThreeCurriculum.units.slice(0, 5)) {
      for (const lessonId of unit.lessonIds) {
        completeGradeThreeLesson({ lessonId });
      }
    }
    completeGradeThreeLesson({
      lessonId: gradeThreeReadingFluencyLessons[0].id,
    });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('已完成 1 / 5 課')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/read/rabbit-by-fern',
    );
  });

  it('有練習紀錄時顯示日期與繼續入口', () => {
    const rain = gradeThreeAiAyLesson.words[0];

    recordGradeThreeSegmentPractice({
      lessonId: gradeThreeAiAyLesson.id,
      wordId: rain.id,
      segmentId: rain.segments[0].id,
      practicedAt: new Date(2026, 6, 20, 10, 0),
    });

    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('練習中')).toBeInTheDocument();
    expect(screen.getByText('最近練習：2026-07-20')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '繼續練習' })).toHaveAttribute(
      'href',
      '/grade/3/lesson/ai-ay',
    );
  });

  it('提供回到已完成二年級地圖的入口', () => {
    render(
      <MemoryRouter>
        <GradeThreeMapPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: '回到二年級' })).toHaveAttribute(
      'href',
      '/grade/2',
    );
  });
});

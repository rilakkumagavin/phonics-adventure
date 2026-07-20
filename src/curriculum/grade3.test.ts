import { describe, expect, it } from 'vitest';

import { getCurriculumUnit } from './curriculum';
import { gradeThreeCurriculum } from './grade3';

describe('gradeThreeCurriculum', () => {
  it('建立六個依序銜接的三年級單元', () => {
    expect(gradeThreeCurriculum.grade).toBe(3);
    expect(gradeThreeCurriculum.units).toHaveLength(6);
    expect(gradeThreeCurriculum.units.map((unit) => unit.order)).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
    expect(new Set(gradeThreeCurriculum.units.map((unit) => unit.id)).size).toBe(6);
    expect(new Set(gradeThreeCurriculum.units.map((unit) => unit.slug)).size).toBe(6);
  });

  it('完整開放六個三年級單元', () => {
    const [
      vowelTeamUnit,
      rControlledUnit,
      diphthongUnit,
      advancedConsonantUnit,
      multisyllableUnit,
      readingFluencyUnit,
    ] = gradeThreeCurriculum.units;

    expect(vowelTeamUnit.status).toBe('ready');
    expect(vowelTeamUnit.lessonIds).toEqual([
      'grade-3-ai-ay-lesson-01',
      'grade-3-ee-ea-lesson-02',
      'grade-3-oa-ow-lesson-03',
      'grade-3-vowel-team-review-lesson-04',
      'grade-3-alternate-vowel-teams-lesson-05',
      'grade-3-vowel-team-challenge-lesson-06',
    ]);
    expect(vowelTeamUnit.entryPath).toBe('/grade/3/lesson/ai-ay');
    expect(rControlledUnit.status).toBe('ready');
    expect(rControlledUnit.lessonIds).toEqual([
      'grade-3-ar-lesson-01',
      'grade-3-or-lesson-02',
      'grade-3-er-lesson-03',
      'grade-3-ir-lesson-04',
      'grade-3-ur-lesson-05',
    ]);
    expect(rControlledUnit.entryPath).toBe('/grade/3/lesson/ar');
    expect(diphthongUnit.status).toBe('ready');
    expect(diphthongUnit.lessonIds).toEqual([
      'grade-3-oi-lesson-01',
      'grade-3-oy-lesson-02',
      'grade-3-ou-lesson-03',
      'grade-3-ow-lesson-04',
    ]);
    expect(diphthongUnit.entryPath).toBe('/grade/3/lesson/oi');
    expect(advancedConsonantUnit.status).toBe('ready');
    expect(advancedConsonantUnit.lessonIds).toEqual([
      'grade-3-tch-lesson-01',
      'grade-3-dge-lesson-02',
      'grade-3-ph-lesson-03',
      'grade-3-ng-lesson-04',
    ]);
    expect(advancedConsonantUnit.entryPath).toBe('/grade/3/lesson/tch');
    expect(multisyllableUnit.status).toBe('ready');
    expect(multisyllableUnit.lessonIds).toEqual([
      'grade-3-compound-words-lesson-01',
      'grade-3-closed-syllables-lesson-02',
      'grade-3-open-first-syllable-lesson-03',
      'grade-3-familiar-chunks-lesson-04',
      'grade-3-multisyllable-challenge-lesson-05',
    ]);
    expect(multisyllableUnit.entryPath).toBe('/grade/3/lesson/compound-words');
    expect(readingFluencyUnit.status).toBe('ready');
    expect(readingFluencyUnit.lessonIds).toEqual([
      'grade-3-reading-train-in-rain-lesson-01',
      'grade-3-reading-rabbit-by-fern-lesson-02',
      'grade-3-reading-play-by-seaside-lesson-03',
      'grade-3-reading-picnic-at-sunset-lesson-04',
      'grade-3-reading-rainbow-over-town-lesson-05',
    ]);
    expect(readingFluencyUnit.entryPath).toBe('/grade/3/read/train-in-rain');

    for (const unit of gradeThreeCurriculum.units) {
      expect(unit.learningGoals).toHaveLength(3);
      expect(unit.skills).toEqual(['listening', 'speaking', 'reading', 'blending']);
    }
  });

  it('可用 id 或 slug 查詢三年級單元', () => {
    expect(getCurriculumUnit(gradeThreeCurriculum, 'grade-3-vowel-teams')?.slug).toBe(
      'vowel-teams',
    );
    expect(getCurriculumUnit(gradeThreeCurriculum, 'READING-FLUENCY')?.id).toBe(
      'grade-3-reading-fluency',
    );
  });
});

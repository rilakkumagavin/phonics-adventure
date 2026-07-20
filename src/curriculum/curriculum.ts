import type { LearningSkill } from '../types/activity';
import type { SoundTargetType } from '../types/course';

export type CurriculumStatus = 'planned' | 'in-progress' | 'ready';

export type CurriculumFocus =
  | SoundTargetType
  | 'word-family'
  | 'blending'
  | 'decodable-reading'
  | 'r-controlled-vowel'
  | 'diphthong'
  | 'syllable-analysis'
  | 'reading-fluency';

export interface CurriculumUnit {
  id: string;
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  focus: CurriculumFocus[];
  skills: LearningSkill[];
  learningGoals: string[];
  estimatedLessons: number;
  prerequisiteUnitIds: string[];
  status: CurriculumStatus;
  lessonIds: readonly string[];
  firstLessonId?: string;
  entryPath?: string;
}

export interface GradeCurriculum {
  id: string;
  grade: 1 | 2 | 3;
  title: string;
  description: string;
  units: readonly CurriculumUnit[];
}

export function getCurriculumUnit(curriculum: GradeCurriculum, unitIdOrSlug: string) {
  const normalizedId = unitIdOrSlug.toLowerCase();

  return curriculum.units.find(
    (unit) =>
      unit.id.toLowerCase() === normalizedId ||
      unit.slug.toLowerCase() === normalizedId,
  );
}

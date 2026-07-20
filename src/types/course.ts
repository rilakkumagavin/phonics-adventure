import type { AudioAssetRef, ImageAssetRef } from './asset';
import type {
  CourseActivity,
  DifficultyLevel,
  LearningSkill,
  ReviewVariant,
} from './activity';

export type SoundTargetType =
  | 'letter-sound'
  | 'short-vowel'
  | 'long-vowel'
  | 'consonant-blend'
  | 'digraph'
  | 'vowel-team';

export interface SoundTarget {
  id: string;
  label: string;
  type: SoundTargetType;
  grapheme: string;
  phoneticHint: string;
  description: string;
}

export interface PronunciationGuide {
  studentHint: string;
  teacherNote?: string;
  mouthPosition?: string;
  airflowHint?: string;
  avoidZhuyinApproximation: boolean;
  commonMistakes?: string[];
}

export interface LearningObjective {
  id: string;
  skill: LearningSkill;
  description: string;
}

export interface CourseWord {
  id: string;
  word: string;
  displayWord: string;
  meaningZhTW: string;
  soundTargetIds: string[];
  difficulty: DifficultyLevel;
  image: ImageAssetRef;
  audio: AudioAssetRef;
  actionHint?: string;
  sceneHint?: string;
  tags: string[];
  isCore: boolean;
  sentenceIds?: string[];
}

export interface CourseSentence {
  id: string;
  text: string;
  teachingHintZhTW?: string;
  audio: AudioAssetRef;
  wordIds: string[];
  difficulty: DifficultyLevel;
  isCore: boolean;
  image?: ImageAssetRef;
  highlightWords?: Array<{
    wordId: string;
    text: string;
  }>;
}

export type ContentStatus = 'placeholder' | 'draft' | 'review' | 'ready';

export interface CourseMetadata {
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
  stage: string;
  estimatedMinutes: number;
  sourceNote?: string;
  contentVersion: number;
  tags: string[];
}

export interface LetterCourse {
  id: string;
  version: number;
  letter: {
    uppercase: string;
    lowercase: string;
    name: string;
    primarySound: SoundTarget;
    pronunciationGuide: PronunciationGuide;
  };
  title: string;
  subtitle?: string;
  learningObjectives: LearningObjective[];
  words: CourseWord[];
  sentences: CourseSentence[];
  activities: CourseActivity[];
  reviewVariants: ReviewVariant[];
  metadata: CourseMetadata;
}

import type { AudioAssetRef, ImageAssetRef } from './asset';

export type DifficultyLevel = 1 | 2 | 3;

export type LearningSkill = 'listening' | 'speaking' | 'reading' | 'blending';

export type CourseActivityType =
  | 'listen-and-choose'
  | 'letter-image-match'
  | 'record-and-playback'
  | 'sound-sort'
  | 'read-and-choose';

export type HintStepType =
  | 'replay-audio'
  | 'slow-audio'
  | 'show-image'
  | 'show-mouth-hint'
  | 'reduce-options'
  | 'show-partial-answer'
  | 'reveal-answer';

export interface HintStep {
  type: HintStepType;
  studentText: string;
}

export interface CompletionRule {
  attemptsRequired?: number;
  correctRequired?: number;
  allowSkip?: boolean;
}

interface BaseActivity {
  id: string;
  type: CourseActivityType;
  title: string;
  studentInstruction: string;
  skills: LearningSkill[];
  difficulty: DifficultyLevel;
  hintSteps: HintStep[];
  completion: CompletionRule;
  targetLetterIds: string[];
  soundTargetIds: string[];
  wordIds: string[];
  sentenceIds: string[];
  canAppearInDailyReview: boolean;
}

export interface ListenAndChooseActivity extends BaseActivity {
  type: 'listen-and-choose';
  promptAudio: AudioAssetRef;
  choices: Array<{
    id: string;
    wordId: string;
    image: ImageAssetRef;
    isCorrect: boolean;
  }>;
}

export interface LetterImageMatchActivity extends BaseActivity {
  type: 'letter-image-match';
  pairs: Array<{
    id: string;
    letter: string;
    wordId: string;
    image: ImageAssetRef;
  }>;
}

export interface RecordAndPlaybackActivity extends BaseActivity {
  type: 'record-and-playback';
  modelAudio: AudioAssetRef;
  recordingPrompt: string;
}

export interface SoundSortActivity extends BaseActivity {
  type: 'sound-sort';
  groups: Array<{
    id: string;
    soundTargetId: string;
    label: string;
  }>;
  items: Array<{
    id: string;
    wordId: string;
    targetGroupId: string;
    image: ImageAssetRef;
  }>;
}

export interface ReadAndChooseActivity extends BaseActivity {
  type: 'read-and-choose';
  promptText: string;
  choices: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
}

export type CourseActivity =
  | ListenAndChooseActivity
  | LetterImageMatchActivity
  | RecordAndPlaybackActivity
  | SoundSortActivity
  | ReadAndChooseActivity;

export type ReviewActivityType = CourseActivityType;

export interface ReviewVariant {
  id: string;
  targetContentId: string;
  activityType: ReviewActivityType;
  skills: LearningSkill[];
  difficulty: DifficultyLevel;
  requiresAudio: boolean;
  requiresImage: boolean;
  usesNewContext: boolean;
  distractorIds?: string[];
  suggestedIntervalDays?: number;
  priorityHint?: string;
}

import type { CourseActivity, LearningSkill } from '../types/activity';
import type { AssetStatus } from '../types/asset';
import type { CourseSentence, CourseWord, LetterCourse } from '../types/course';

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string;
  message: string;
  path: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

const validMetadataStatuses = new Set<AssetStatus | 'review'>([
  'placeholder',
  'draft',
  'review',
  'ready',
]);

const requiredSkills: LearningSkill[] = ['listening', 'speaking', 'reading'];

function createIssue(
  severity: ValidationSeverity,
  code: string,
  path: string,
  message: string,
): ValidationIssue {
  return { severity, code, path, message };
}

function collectDuplicateIds<T>(
  items: readonly T[],
  getId: (item: T) => string,
): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const item of items) {
    const id = getId(item);
    if (seen.has(id)) {
      duplicates.add(id);
    }
    seen.add(id);
  }

  return [...duplicates];
}

function hasImageAsset(word: CourseWord): boolean {
  return Boolean(word.image.id && word.image.alt && word.image.status);
}

function hasAudioAsset(item: CourseWord | CourseSentence): boolean {
  return Boolean(item.audio.id && item.audio.kind && item.audio.status);
}

function collectActivityReferences(activity: CourseActivity): {
  wordIds: string[];
  sentenceIds: string[];
} {
  return {
    wordIds: activity.wordIds,
    sentenceIds: activity.sentenceIds,
  };
}

export function validateCourse(course: LetterCourse): ValidationResult {
  const issues: ValidationIssue[] = [];
  const wordIds = new Set(course.words.map((word) => word.id));
  const sentenceIds = new Set(course.sentences.map((sentence) => sentence.id));

  if (!course.id) {
    issues.push(createIssue('error', 'missing-course-id', 'id', '課程 ID 不可空白。'));
  }

  if (!course.letter.uppercase || !/^[A-Z]$/.test(course.letter.uppercase)) {
    issues.push(
      createIssue(
        'error',
        'invalid-uppercase',
        'letter.uppercase',
        '字母大寫需為 A 到 Z 的單一大寫字母。',
      ),
    );
  }

  if (!course.letter.lowercase || !/^[a-z]$/.test(course.letter.lowercase)) {
    issues.push(
      createIssue(
        'error',
        'invalid-lowercase',
        'letter.lowercase',
        '字母小寫需為 a 到 z 的單一小寫字母。',
      ),
    );
  }

  for (const duplicateId of collectDuplicateIds(course.words, (word) => word.id)) {
    issues.push(
      createIssue(
        'error',
        'duplicate-word-id',
        'words',
        `單字 ID 重複：${duplicateId}`,
      ),
    );
  }

  for (const duplicateId of collectDuplicateIds(
    course.sentences,
    (sentence) => sentence.id,
  )) {
    issues.push(
      createIssue(
        'error',
        'duplicate-sentence-id',
        'sentences',
        `句子 ID 重複：${duplicateId}`,
      ),
    );
  }

  for (const duplicateId of collectDuplicateIds(
    course.activities,
    (activity) => activity.id,
  )) {
    issues.push(
      createIssue(
        'error',
        'duplicate-activity-id',
        'activities',
        `活動 ID 重複：${duplicateId}`,
      ),
    );
  }

  for (const word of course.words) {
    if (word.isCore && !hasImageAsset(word)) {
      issues.push(
        createIssue(
          'error',
          'missing-word-image-asset',
          `words.${word.id}.image`,
          `核心單字 ${word.id} 缺少圖片資產參照。`,
        ),
      );
    }

    if (word.isCore && !hasAudioAsset(word)) {
      issues.push(
        createIssue(
          'error',
          'missing-word-audio-asset',
          `words.${word.id}.audio`,
          `核心單字 ${word.id} 缺少音訊資產參照。`,
        ),
      );
    }

    for (const sentenceId of word.sentenceIds ?? []) {
      if (!sentenceIds.has(sentenceId)) {
        issues.push(
          createIssue(
            'error',
            'unknown-word-sentence-reference',
            `words.${word.id}.sentenceIds`,
            `單字 ${word.id} 引用了不存在的句子 ${sentenceId}。`,
          ),
        );
      }
    }
  }

  for (const sentence of course.sentences) {
    for (const wordId of sentence.wordIds) {
      if (!wordIds.has(wordId)) {
        issues.push(
          createIssue(
            'error',
            'unknown-sentence-word-reference',
            `sentences.${sentence.id}.wordIds`,
            `句子 ${sentence.id} 引用了不存在的單字 ${wordId}。`,
          ),
        );
      }
    }
  }

  for (const activity of course.activities) {
    const references = collectActivityReferences(activity);

    for (const wordId of references.wordIds) {
      if (!wordIds.has(wordId)) {
        issues.push(
          createIssue(
            'error',
            'unknown-activity-word-reference',
            `activities.${activity.id}.wordIds`,
            `活動 ${activity.id} 引用了不存在的單字 ${wordId}。`,
          ),
        );
      }
    }

    for (const sentenceId of references.sentenceIds) {
      if (!sentenceIds.has(sentenceId)) {
        issues.push(
          createIssue(
            'error',
            'unknown-activity-sentence-reference',
            `activities.${activity.id}.sentenceIds`,
            `活動 ${activity.id} 引用了不存在的句子 ${sentenceId}。`,
          ),
        );
      }
    }
  }

  for (const skill of requiredSkills) {
    const hasSkill = course.activities.some((activity) =>
      activity.skills.includes(skill),
    );

    if (!hasSkill) {
      issues.push(
        createIssue(
          'error',
          'missing-required-skill-activity',
          'activities',
          `課程至少需要一個 ${skill} 活動。`,
        ),
      );
    }
  }

  for (const variant of course.reviewVariants) {
    if (
      !wordIds.has(variant.targetContentId) &&
      !sentenceIds.has(variant.targetContentId)
    ) {
      issues.push(
        createIssue(
          'error',
          'unknown-review-target-reference',
          `reviewVariants.${variant.id}.targetContentId`,
          `複習變化 ${variant.id} 引用了不存在的內容 ${variant.targetContentId}。`,
        ),
      );
    }
  }

  if (!validMetadataStatuses.has(course.metadata.status)) {
    issues.push(
      createIssue(
        'error',
        'invalid-metadata-status',
        'metadata.status',
        `metadata 狀態不合法：${course.metadata.status}`,
      ),
    );
  }

  if (course.metadata.status === 'ready') {
    issues.push(
      createIssue(
        'warning',
        'ready-status-needs-content-review',
        'metadata.status',
        'Phase 3 骨架資料不應直接視為正式 ready。',
      ),
    );
  }

  for (const word of course.words) {
    if (word.image.status === 'placeholder' || word.audio.status === 'placeholder') {
      issues.push(
        createIssue(
          'warning',
          'placeholder-word-asset',
          `words.${word.id}`,
          `單字 ${word.id} 仍使用 placeholder 資產。`,
        ),
      );
    }
  }

  const errors = issues.filter((issue) => issue.severity === 'error');
  const warnings = issues.filter((issue) => issue.severity === 'warning');

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

export function validateCourses(courses: readonly LetterCourse[]): ValidationResult {
  const results = courses.map(validateCourse);
  const errors = results.flatMap((result) => result.errors);
  const warnings = results.flatMap((result) => result.warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

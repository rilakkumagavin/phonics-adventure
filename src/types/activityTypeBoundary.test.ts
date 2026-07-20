import { describe, expect, it } from 'vitest';

import type { CourseActivity } from './activity';

function getActivityPrimaryAction(activity: CourseActivity): string {
  switch (activity.type) {
    case 'listen-and-choose':
      return activity.promptAudio.transcript;
    case 'letter-image-match':
      return activity.pairs[0]?.letter ?? '';
    case 'record-and-playback':
      return activity.recordingPrompt;
    case 'sound-sort':
      return activity.groups[0]?.label ?? '';
    case 'read-and-choose':
      return activity.promptText;
  }
}

describe('CourseActivity type boundaries', () => {
  it('discriminated union 可依 type 正確縮小型別', () => {
    const activity: CourseActivity = {
      id: 'type-test-read',
      type: 'read-and-choose',
      title: '讀字測試',
      studentInstruction: '選出正確答案。',
      skills: ['reading'],
      difficulty: 1,
      hintSteps: [],
      completion: {
        correctRequired: 1,
      },
      targetLetterIds: ['letter-a'],
      soundTargetIds: ['a-primary-sound'],
      wordIds: ['a-apple'],
      sentenceIds: [],
      canAppearInDailyReview: true,
      promptText: 'apple',
      choices: [
        {
          id: 'type-test-choice',
          text: 'A',
          isCorrect: true,
        },
      ],
    };

    expect(getActivityPrimaryAction(activity)).toBe('apple');
  });

  it('不合法活動資料會在 TypeScript 階段被阻擋', () => {
    // @ts-expect-error listen-and-choose 需要 promptAudio 與 choices。
    const invalidActivity: CourseActivity = {
      id: 'invalid-listen',
      type: 'listen-and-choose',
      title: '不合法活動',
      studentInstruction: '缺少必要題目資料。',
      skills: ['listening'],
      difficulty: 1,
      hintSteps: [],
      completion: {},
      targetLetterIds: ['letter-a'],
      soundTargetIds: ['a-primary-sound'],
      wordIds: ['a-apple'],
      sentenceIds: [],
      canAppearInDailyReview: true,
    };

    expect(invalidActivity.type).toBe('listen-and-choose');
  });
});

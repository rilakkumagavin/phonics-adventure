import type { CourseActivity, LearningSkill } from '../types/activity';
import type { LetterCourse } from '../types/course';
import type { LearningProgress } from '../progress/learningProgress';
import { toLocalDateKey } from '../progress/localDate';

export type DailyTaskKind = 'due-review' | 'weak-skill' | 'new-content';

export interface DailyReviewTask {
  id: string;
  activityId: string;
  kind: DailyTaskKind;
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  skill: LearningSkill;
}

export interface DailyReviewPlan {
  tasks: DailyReviewTask[];
  dueReviewCount: number;
  weakSkillCount: number;
  newContentCount: number;
  estimatedMinutes: number;
}

const maxDailyTasks = 4;
const targetDueReviewTasks = 2;
const targetWeakSkillTasks = 1;

function getPrimarySkill(activity: CourseActivity): LearningSkill {
  return activity.skills[0] ?? 'listening';
}

function getGameHref(course: LetterCourse, activity: CourseActivity) {
  if (
    activity.type === 'listen-and-choose' ||
    activity.type === 'letter-image-match' ||
    activity.type === 'record-and-playback' ||
    activity.type === 'sound-sort' ||
    activity.type === 'read-and-choose'
  ) {
    const params = new URLSearchParams({
      letterId: course.letter.lowercase,
      activityId: activity.id,
    });

    return `/game/${activity.type}?${params.toString()}`;
  }

  return `/lesson/${course.letter.lowercase}`;
}

function getReadyActivities(course: LetterCourse) {
  return course.activities.filter((activity) =>
    [
      'listen-and-choose',
      'letter-image-match',
      'record-and-playback',
      'sound-sort',
      'read-and-choose',
    ].includes(activity.type),
  );
}

function createTask(
  kind: DailyTaskKind,
  course: LetterCourse,
  activity: CourseActivity,
  suffix: string,
): DailyReviewTask {
  const skill = getPrimarySkill(activity);

  return {
    id: `${kind}-${activity.id}-${suffix}`,
    activityId: activity.id,
    kind,
    title: activity.title,
    description:
      kind === 'due-review'
        ? `複習 ${course.letter.uppercase} 的聲音。`
        : kind === 'weak-skill'
          ? `加強 ${activity.studentInstruction}`
          : `開始 ${course.letter.uppercase} 的下一個小任務。`,
    actionLabel: kind === 'new-content' ? '開始任務' : '開始複習',
    href: getGameHref(course, activity),
    skill,
  };
}

function isDue(nextReviewDate: string | null, todayKey: string) {
  return Boolean(nextReviewDate && nextReviewDate <= todayKey);
}

function getDueReviewTasks(
  progress: LearningProgress,
  courses: readonly LetterCourse[],
  todayKey: string,
) {
  const tasks: DailyReviewTask[] = [];

  for (const course of courses) {
    const letterProgress = progress.letters[course.letter.lowercase];

    if (!letterProgress) {
      continue;
    }

    const dueSkills = Object.entries(letterProgress.skills)
      .filter(([, skillProgress]) => isDue(skillProgress.nextReviewDate, todayKey))
      .map(([skill]) => skill as LearningSkill);

    for (const skill of dueSkills) {
      const activity = getReadyActivities(course).find((item) =>
        item.skills.includes(skill),
      );

      if (activity) {
        tasks.push(createTask('due-review', course, activity, skill));
      }
    }
  }

  return tasks;
}

function getWeakSkillTasks(
  progress: LearningProgress,
  courses: readonly LetterCourse[],
) {
  const tasks: DailyReviewTask[] = [];

  for (const course of courses) {
    const letterProgress = progress.letters[course.letter.lowercase];

    if (!letterProgress) {
      continue;
    }

    const weakestSkill = Object.entries(letterProgress.skills)
      .sort(([, left], [, right]) => left.mastery - right.mastery)
      .map(([skill]) => skill as LearningSkill)[0];

    const activities = getReadyActivities(course).filter((item) =>
      item.skills.includes(weakestSkill),
    );

    for (const activity of activities) {
      tasks.push(
        createTask('weak-skill', course, activity, `${weakestSkill}-${activity.id}`),
      );
    }
  }

  return tasks;
}

function getNewContentTasks(
  progress: LearningProgress,
  courses: readonly LetterCourse[],
) {
  const completedLetters = new Set(
    Object.entries(progress.letters)
      .filter(([, letterProgress]) => letterProgress.completed)
      .map(([letterId]) => letterId),
  );
  const tasks: DailyReviewTask[] = [];

  for (const course of courses) {
    const letterKey = course.letter.lowercase;

    if (completedLetters.has(letterKey)) {
      continue;
    }

    const activity = getReadyActivities(course)[0];

    tasks.push({
      id: `new-content-${course.id}`,
      activityId: activity?.id ?? `lesson-${letterKey}`,
      kind: 'new-content',
      title: course.title,
      description: `學一點 ${course.letter.uppercase} 的聲音。`,
      actionLabel: '進入課程',
      href: activity ? getGameHref(course, activity) : `/lesson/${letterKey}`,
      skill: activity ? getPrimarySkill(activity) : 'listening',
    });

    break;
  }

  return tasks;
}

function pushUniqueTasks(
  target: DailyReviewTask[],
  source: DailyReviewTask[],
  maxCount: number,
) {
  for (const task of source) {
    if (target.length >= maxCount) {
      break;
    }

    if (target.some((current) => current.href === task.href)) {
      continue;
    }

    target.push(task);
  }
}

export function generateDailyReviewPlan(
  progress: LearningProgress,
  courses: readonly LetterCourse[],
  today: Date = new Date(),
): DailyReviewPlan {
  const todayKey = toLocalDateKey(today);
  const tasks: DailyReviewTask[] = [];
  const dueReviewTasks = getDueReviewTasks(progress, courses, todayKey);
  const weakSkillTasks = getWeakSkillTasks(progress, courses);
  const newContentTasks = getNewContentTasks(progress, courses);

  pushUniqueTasks(tasks, dueReviewTasks, targetDueReviewTasks);
  pushUniqueTasks(tasks, weakSkillTasks, targetDueReviewTasks + targetWeakSkillTasks);
  pushUniqueTasks(tasks, newContentTasks, maxDailyTasks);

  if (tasks.length < maxDailyTasks) {
    const fallbackTasks = courses.flatMap((course) =>
      getReadyActivities(course).map((activity) =>
        createTask('new-content', course, activity, `fallback-${activity.id}`),
      ),
    );

    pushUniqueTasks(tasks, fallbackTasks, maxDailyTasks);
  }

  return {
    tasks,
    dueReviewCount: tasks.filter((task) => task.kind === 'due-review').length,
    weakSkillCount: tasks.filter((task) => task.kind === 'weak-skill').length,
    newContentCount: tasks.filter((task) => task.kind === 'new-content').length,
    estimatedMinutes: Math.max(5, tasks.length * 2),
  };
}

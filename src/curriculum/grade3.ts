import type { GradeCurriculum } from './curriculum';
import {
  getGradeThreeLessonPath,
  gradeThreeBlendingLessons,
} from './gradeThreeLessonRepository';
import {
  getGradeThreeReadingLessonPath,
  gradeThreeReadingFluencyLessons,
} from './grade3ReadingFluency';

const coreSkills = ['listening', 'speaking', 'reading', 'blending'] as const;
const vowelTeamLessons = gradeThreeBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-3-vowel-teams',
);
const firstVowelTeamLesson = vowelTeamLessons[0];
const rControlledVowelLessons = gradeThreeBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-3-r-controlled-vowels',
);
const firstRControlledVowelLesson = rControlledVowelLessons[0];
const diphthongLessons = gradeThreeBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-3-diphthongs',
);
const firstDiphthongLesson = diphthongLessons[0];
const advancedConsonantLessons = gradeThreeBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-3-advanced-consonants',
);
const firstAdvancedConsonantLesson = advancedConsonantLessons[0];
const multisyllableLessons = gradeThreeBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-3-multisyllable-words',
);
const firstMultisyllableLesson = multisyllableLessons[0];
const firstReadingFluencyLesson = gradeThreeReadingFluencyLessons[0];

export const gradeThreeCurriculum = {
  id: 'grade-3-phonics',
  grade: 3,
  title: '三年級自然發音',
  description: '從熟悉的拼讀出發，練習更多母音組合、拆讀較長的字，最後把聲音帶進短文。',
  units: [
    {
      id: 'grade-3-vowel-teams',
      slug: 'vowel-teams',
      order: 1,
      title: '母音好朋友',
      subtitle: 'ai、ay、ee、ea、oa、ow',
      focus: ['vowel-team', 'blending'],
      skills: [...coreSkills],
      learningGoals: [
        '聽出常見母音組合的聲音',
        '比較同一個聲音的不同拼法',
        '把母音組合放進單字拼讀',
      ],
      estimatedLessons: 6,
      prerequisiteUnitIds: [],
      status: 'ready',
      lessonIds: vowelTeamLessons.map((lesson) => lesson.id),
      firstLessonId: firstVowelTeamLesson.id,
      entryPath: getGradeThreeLessonPath(firstVowelTeamLesson),
    },
    {
      id: 'grade-3-r-controlled-vowels',
      slug: 'r-controlled-vowels',
      order: 2,
      title: 'R 控制母音',
      subtitle: 'ar、or、er、ir、ur',
      focus: ['r-controlled-vowel', 'blending'],
      skills: [...coreSkills],
      learningGoals: [
        '聽出母音遇到 r 之後的聲音',
        '分辨 ar、or 與 er 類聲音',
        '拼讀含有 R 控制母音的單字',
      ],
      estimatedLessons: 5,
      prerequisiteUnitIds: ['grade-3-vowel-teams'],
      status: 'ready',
      lessonIds: rControlledVowelLessons.map((lesson) => lesson.id),
      firstLessonId: firstRControlledVowelLesson.id,
      entryPath: getGradeThreeLessonPath(firstRControlledVowelLesson),
    },
    {
      id: 'grade-3-diphthongs',
      slug: 'diphthongs',
      order: 3,
      title: '滑動的母音',
      subtitle: 'oi、oy、ou、ow',
      focus: ['diphthong', 'blending'],
      skills: [...coreSkills],
      learningGoals: [
        '跟著口型聽見滑動的母音',
        '分辨相近的雙母音聲音',
        '依單字位置選擇常見拼法',
      ],
      estimatedLessons: 4,
      prerequisiteUnitIds: ['grade-3-r-controlled-vowels'],
      status: 'ready',
      lessonIds: diphthongLessons.map((lesson) => lesson.id),
      firstLessonId: firstDiphthongLesson.id,
      entryPath: getGradeThreeLessonPath(firstDiphthongLesson),
    },
    {
      id: 'grade-3-advanced-consonants',
      slug: 'advanced-consonants',
      order: 4,
      title: '進階子音組合',
      subtitle: 'tch、dge、ph、ng',
      focus: ['digraph', 'blending'],
      skills: [...coreSkills],
      learningGoals: [
        '聽出較長子音組合的聲音',
        '把多個字母看成一個聲音單位',
        '拼讀含有進階子音組合的單字',
      ],
      estimatedLessons: 4,
      prerequisiteUnitIds: ['grade-3-diphthongs'],
      status: 'ready',
      lessonIds: advancedConsonantLessons.map((lesson) => lesson.id),
      firstLessonId: firstAdvancedConsonantLesson.id,
      entryPath: getGradeThreeLessonPath(firstAdvancedConsonantLesson),
    },
    {
      id: 'grade-3-multisyllable-words',
      slug: 'multisyllable-words',
      order: 5,
      title: '長字拆開讀',
      subtitle: '複合字與雙音節單字',
      focus: ['syllable-analysis', 'blending'],
      skills: [...coreSkills],
      learningGoals: [
        '用拍手找出單字的音節',
        '把較長單字拆成可拼讀的小段',
        '拆讀後重新合成完整單字',
      ],
      estimatedLessons: 5,
      prerequisiteUnitIds: ['grade-3-advanced-consonants'],
      status: 'ready',
      lessonIds: multisyllableLessons.map((lesson) => lesson.id),
      firstLessonId: firstMultisyllableLesson.id,
      entryPath: getGradeThreeLessonPath(firstMultisyllableLesson),
    },
    {
      id: 'grade-3-reading-fluency',
      slug: 'reading-fluency',
      order: 6,
      title: '短文流暢閱讀',
      subtitle: '從逐字拼讀走向完整句子',
      focus: ['decodable-reading', 'reading-fluency'],
      skills: [...coreSkills],
      learningGoals: [
        '先正確讀出每個字',
        '依標點分段朗讀句子',
        '重讀短文並讓語句更流暢',
      ],
      estimatedLessons: 5,
      prerequisiteUnitIds: ['grade-3-multisyllable-words'],
      status: 'ready',
      lessonIds: gradeThreeReadingFluencyLessons.map((lesson) => lesson.id),
      firstLessonId: firstReadingFluencyLesson.id,
      entryPath: getGradeThreeReadingLessonPath(firstReadingFluencyLesson),
    },
  ],
} as const satisfies GradeCurriculum;

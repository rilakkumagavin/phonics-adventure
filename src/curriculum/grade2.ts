import type { GradeCurriculum } from './curriculum';
import { gradeTwoDecodableSentenceLessons } from './grade2DecodableSentences';
import {
  getGradeTwoLessonPath,
  gradeTwoBlendingLessons,
} from './gradeTwoLessonRepository';
import { getGradeTwoSentenceLessonPath } from './gradeTwoSentenceRepository';

const coreSkills = ['listening', 'speaking', 'reading'] as const;
const shortVowelLessons = gradeTwoBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-2-short-vowels',
);
const firstShortVowelLesson = shortVowelLessons[0];
const wordFamilyLessons = gradeTwoBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-2-word-families',
);
const firstWordFamilyLesson = wordFamilyLessons[0];
const digraphLessons = gradeTwoBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-2-digraphs',
);
const firstDigraphLesson = digraphLessons[0];
const consonantBlendLessons = gradeTwoBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-2-consonant-blends',
);
const firstConsonantBlendLesson = consonantBlendLessons[0];
const magicELessons = gradeTwoBlendingLessons.filter(
  (lesson) => lesson.unitId === 'grade-2-magic-e',
);
const firstMagicELesson = magicELessons[0];
const firstSentenceLesson = gradeTwoDecodableSentenceLessons[0];

export const gradeTwoCurriculum = {
  id: 'grade-2-phonics',
  grade: 2,
  title: '二年級自然發音',
  description: '從單一字母音前進到拼讀規則、字族與短句。',
  units: [
    {
      id: 'grade-2-short-vowels',
      slug: 'short-vowels',
      order: 1,
      title: '短母音拼讀',
      subtitle: 'a、e、i、o、u 與 CVC 單字',
      focus: ['short-vowel', 'blending'],
      skills: [...coreSkills],
      learningGoals: ['聽出五個短母音', '將三個聲音合成一個單字', '讀出常見 CVC 單字'],
      estimatedLessons: 5,
      prerequisiteUnitIds: [],
      status: 'ready',
      lessonIds: shortVowelLessons.map((lesson) => lesson.id),
      firstLessonId: firstShortVowelLesson.id,
      entryPath: getGradeTwoLessonPath(firstShortVowelLesson),
    },
    {
      id: 'grade-2-word-families',
      slug: 'word-families',
      order: 2,
      title: '字族小隊',
      subtitle: '-at、-an、-ap、-ox、-en',
      focus: ['word-family', 'blending'],
      skills: [...coreSkills],
      learningGoals: ['辨識相同字尾', '替換開頭聲音形成新字', '讀出同字族單字'],
      estimatedLessons: 5,
      prerequisiteUnitIds: ['grade-2-short-vowels'],
      status: 'ready',
      lessonIds: wordFamilyLessons.map((lesson) => lesson.id),
      firstLessonId: firstWordFamilyLesson.id,
      entryPath: getGradeTwoLessonPath(firstWordFamilyLesson),
    },
    {
      id: 'grade-2-digraphs',
      slug: 'digraphs',
      order: 3,
      title: '兩個字母一個聲音',
      subtitle: 'sh、ch、th、wh',
      focus: ['digraph'],
      skills: [...coreSkills],
      learningGoals: ['聽辨常見子音組合', '連結字形與聲音', '拼讀含子音組合的單字'],
      estimatedLessons: 4,
      prerequisiteUnitIds: ['grade-2-word-families'],
      status: 'ready',
      lessonIds: digraphLessons.map((lesson) => lesson.id),
      firstLessonId: firstDigraphLesson.id,
      entryPath: getGradeTwoLessonPath(firstDigraphLesson),
    },
    {
      id: 'grade-2-consonant-blends',
      slug: 'consonant-blends',
      order: 4,
      title: '子音連音',
      subtitle: 'fr、dr、st、mp、tr',
      focus: ['consonant-blend', 'blending'],
      skills: [...coreSkills],
      learningGoals: ['聽見連續的兩個子音', '依序念出兩個聲音', '拼讀含連音的短單字'],
      estimatedLessons: 5,
      prerequisiteUnitIds: ['grade-2-digraphs'],
      status: 'ready',
      lessonIds: consonantBlendLessons.map((lesson) => lesson.id),
      firstLessonId: firstConsonantBlendLesson.id,
      entryPath: getGradeTwoLessonPath(firstConsonantBlendLesson),
    },
    {
      id: 'grade-2-magic-e',
      slug: 'magic-e',
      order: 5,
      title: 'Magic E 長母音',
      subtitle: 'a_e、i_e、o_e、u_e',
      focus: ['long-vowel'],
      skills: [...coreSkills],
      learningGoals: ['比較短母音與長母音', '辨識字尾不發音的 e', '拼讀常見 Magic E 單字'],
      estimatedLessons: 4,
      prerequisiteUnitIds: ['grade-2-consonant-blends'],
      status: 'ready',
      lessonIds: magicELessons.map((lesson) => lesson.id),
      firstLessonId: firstMagicELesson.id,
      entryPath: getGradeTwoLessonPath(firstMagicELesson),
    },
    {
      id: 'grade-2-decodable-sentences',
      slug: 'decodable-sentences',
      order: 6,
      title: '一句一句讀',
      subtitle: '用學過的聲音讀短句',
      focus: ['decodable-reading'],
      skills: [...coreSkills],
      learningGoals: ['逐字拼讀短句', '聽完後跟讀整句', '重讀熟悉句子建立流暢度'],
      estimatedLessons: 5,
      prerequisiteUnitIds: ['grade-2-magic-e'],
      status: 'ready',
      lessonIds: gradeTwoDecodableSentenceLessons.map((lesson) => lesson.id),
      firstLessonId: firstSentenceLesson.id,
      entryPath: getGradeTwoSentenceLessonPath(firstSentenceLesson),
    },
  ],
} as const satisfies GradeCurriculum;

import { createBlendingLesson } from './createBlendingLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

const vowelTeamAudio = gradeTwoPhonemeAudio.longA;

export const gradeThreeAiAyLesson = createBlendingLesson({
  id: 'grade-3-ai-ay-lesson-01',
  slug: 'ai-ay',
  unitId: 'grade-3-vowel-teams',
  unitLabel: '母音好朋友',
  order: 1,
  title: 'ai 和 ay',
  subtitle: '兩種拼法，都能發出 /eɪ/。一個聲音、一個聲音，再合起來讀。',
  vowelGrapheme: 'ai / ay',
  vowelSoundLabel: '/eɪ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'rain',
      meaningZhTW: '雨',
      imageSrc: '/assets/images/courses/r/r-rain-core.webp',
      imageAlt: '一朵藍色雨雲與清楚的雨滴',
      audioSrc: '/assets/audio/grade3/vowel-teams/rain.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
        { grapheme: 'ai', soundLabel: '/eɪ/', audioSrc: vowelTeamAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'train',
      meaningZhTW: '火車',
      imageSrc: '/assets/images/grade3/vowel-teams/train.webp',
      imageAlt: '一台色彩鮮明的玩具火車',
      audioSrc: '/assets/audio/grade3/vowel-teams/train.wav',
      pattern: 'CCVVC',
      segments: [
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
        { grapheme: 'ai', soundLabel: '/eɪ/', audioSrc: vowelTeamAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'play',
      meaningZhTW: '玩',
      imageSrc: '/assets/images/grade3/vowel-teams/play.webp',
      imageAlt: '兩位孩子開心地一起玩球',
      audioSrc: '/assets/audio/grade3/vowel-teams/play.wav',
      pattern: 'CCVV',
      segments: [
        { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
        { grapheme: 'ay', soundLabel: '/eɪ/', audioSrc: vowelTeamAudio },
      ],
    },
  ],
});

export const gradeThreeEeEaLesson = createBlendingLesson({
  id: 'grade-3-ee-ea-lesson-02',
  slug: 'ee-ea',
  unitId: 'grade-3-vowel-teams',
  unitLabel: '母音好朋友',
  order: 2,
  title: 'ee 和 ea',
  subtitle: '兩種拼法，都能發出 /iː/。看清楚母音好朋友，再把聲音合起來讀。',
  vowelGrapheme: 'ee / ea',
  vowelSoundLabel: '/iː/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'seed',
      meaningZhTW: '種子',
      imageSrc: '/assets/images/grade3/vowel-teams/seed.webp',
      imageAlt: '一顆長出嫩芽與綠葉的種子',
      audioSrc: '/assets/audio/grade3/vowel-teams/seed.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        {
          grapheme: 'ee',
          soundLabel: '/iː/',
          audioSrc: gradeTwoPhonemeAudio.longE,
        },
        { grapheme: 'd', soundLabel: '/d/', audioLetter: 'd' },
      ],
    },
    {
      word: 'leaf',
      meaningZhTW: '葉子',
      imageSrc: '/assets/images/courses/l/l-leaf-core.webp',
      imageAlt: '一片清楚的綠色葉子',
      audioSrc: '/assets/audio/grade3/vowel-teams/leaf.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
        {
          grapheme: 'ea',
          soundLabel: '/iː/',
          audioSrc: gradeTwoPhonemeAudio.longE,
        },
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
      ],
    },
    {
      word: 'beach',
      meaningZhTW: '海灘',
      imageSrc: '/assets/images/grade3/vowel-teams/beach.webp',
      imageAlt: '有陽傘、沙灘球與藍色海水的海灘',
      audioSrc: '/assets/audio/grade3/vowel-teams/beach.wav',
      pattern: 'CVVCC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        {
          grapheme: 'ea',
          soundLabel: '/iː/',
          audioSrc: gradeTwoPhonemeAudio.longE,
        },
        { grapheme: 'ch', soundLabel: '/tʃ/', audioLetter: 'c' },
      ],
    },
  ],
});

export const gradeThreeOaOwLesson = createBlendingLesson({
  id: 'grade-3-oa-ow-lesson-03',
  slug: 'oa-ow',
  unitId: 'grade-3-vowel-teams',
  unitLabel: '母音好朋友',
  order: 3,
  title: 'oa 和 ow',
  subtitle: '兩種拼法，都能發出 /oʊ/。聽見長母音，再把前後的聲音接起來。',
  vowelGrapheme: 'oa / ow',
  vowelSoundLabel: '/oʊ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'boat',
      meaningZhTW: '船',
      imageSrc: '/assets/images/grade3/vowel-teams/boat.webp',
      imageAlt: '一艘有紅白船帆的藍色玩具船',
      audioSrc: '/assets/audio/grade3/vowel-teams/boat.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        {
          grapheme: 'oa',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
      ],
    },
    {
      word: 'goat',
      meaningZhTW: '山羊',
      imageSrc: '/assets/images/courses/g/g-goat-core.webp',
      imageAlt: '一隻表情友善的白色小山羊',
      audioSrc: '/assets/audio/grade3/vowel-teams/goat.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
        {
          grapheme: 'oa',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
      ],
    },
    {
      word: 'snow',
      meaningZhTW: '雪',
      imageSrc: '/assets/images/grade3/vowel-teams/snow.webp',
      imageAlt: '一堆白雪與正在飄落的雪花',
      audioSrc: '/assets/audio/grade3/vowel-teams/snow.wav',
      pattern: 'CCVV',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        {
          grapheme: 'ow',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
      ],
    },
  ],
});

export const gradeThreeVowelTeamReviewLesson = createBlendingLesson({
  id: 'grade-3-vowel-team-review-lesson-04',
  slug: 'vowel-team-review-1',
  unitId: 'grade-3-vowel-teams',
  unitLabel: '母音好朋友',
  order: 4,
  title: '三種母音聲音',
  subtitle: '複習 ai、ee 和 oa 的聲音。看清楚母音好朋友，再把前後的聲音接起來。',
  vowelGrapheme: 'ai / ee / oa',
  vowelSoundLabel: '/eɪ/ /iː/ /oʊ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'rain',
      meaningZhTW: '雨',
      imageSrc: '/assets/images/courses/r/r-rain-core.webp',
      imageAlt: '一朵藍色雨雲與清楚的雨滴',
      audioSrc: '/assets/audio/grade3/vowel-teams/rain.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
        {
          grapheme: 'ai',
          soundLabel: '/eɪ/',
          audioSrc: gradeTwoPhonemeAudio.longA,
        },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'seed',
      meaningZhTW: '種子',
      imageSrc: '/assets/images/grade3/vowel-teams/seed.webp',
      imageAlt: '一顆長出嫩芽與綠葉的種子',
      audioSrc: '/assets/audio/grade3/vowel-teams/seed.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        {
          grapheme: 'ee',
          soundLabel: '/iː/',
          audioSrc: gradeTwoPhonemeAudio.longE,
        },
        { grapheme: 'd', soundLabel: '/d/', audioLetter: 'd' },
      ],
    },
    {
      word: 'boat',
      meaningZhTW: '船',
      imageSrc: '/assets/images/grade3/vowel-teams/boat.webp',
      imageAlt: '一艘有紅白船帆的藍色玩具船',
      audioSrc: '/assets/audio/grade3/vowel-teams/boat.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        {
          grapheme: 'oa',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
      ],
    },
  ],
});

export const gradeThreeAlternateVowelTeamsLesson = createBlendingLesson({
  id: 'grade-3-alternate-vowel-teams-lesson-05',
  slug: 'alternate-vowel-teams',
  unitId: 'grade-3-vowel-teams',
  unitLabel: '母音好朋友',
  order: 5,
  title: '換一種拼法',
  subtitle: '同一種聲音可以有不同拼法。用 ay、ea 和 ow，再讀一次熟悉的單字。',
  vowelGrapheme: 'ay / ea / ow',
  vowelSoundLabel: '/eɪ/ /iː/ /oʊ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'play',
      meaningZhTW: '玩',
      imageSrc: '/assets/images/grade3/vowel-teams/play.webp',
      imageAlt: '兩位孩子開心地一起玩球',
      audioSrc: '/assets/audio/grade3/vowel-teams/play.wav',
      pattern: 'CCVV',
      segments: [
        { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
        {
          grapheme: 'ay',
          soundLabel: '/eɪ/',
          audioSrc: gradeTwoPhonemeAudio.longA,
        },
      ],
    },
    {
      word: 'leaf',
      meaningZhTW: '葉子',
      imageSrc: '/assets/images/courses/l/l-leaf-core.webp',
      imageAlt: '一片清楚的綠色葉子',
      audioSrc: '/assets/audio/grade3/vowel-teams/leaf.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
        {
          grapheme: 'ea',
          soundLabel: '/iː/',
          audioSrc: gradeTwoPhonemeAudio.longE,
        },
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
      ],
    },
    {
      word: 'snow',
      meaningZhTW: '雪',
      imageSrc: '/assets/images/grade3/vowel-teams/snow.webp',
      imageAlt: '一堆白雪與正在飄落的雪花',
      audioSrc: '/assets/audio/grade3/vowel-teams/snow.wav',
      pattern: 'CCVV',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        {
          grapheme: 'ow',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
      ],
    },
  ],
});

export const gradeThreeVowelTeamChallengeLesson = createBlendingLesson({
  id: 'grade-3-vowel-team-challenge-lesson-06',
  slug: 'vowel-team-challenge',
  unitId: 'grade-3-vowel-teams',
  unitLabel: '母音好朋友',
  order: 6,
  title: '母音好朋友闖關',
  subtitle: '挑戰較長的單字。找出母音好朋友，一個聲音、一個聲音，再完整讀出來。',
  vowelGrapheme: 'ai / ea / oa',
  vowelSoundLabel: '/eɪ/ /iː/ /oʊ/',
  estimatedMinutes: 8,
  words: [
    {
      word: 'train',
      meaningZhTW: '火車',
      imageSrc: '/assets/images/grade3/vowel-teams/train.webp',
      imageAlt: '一台色彩鮮明的玩具火車',
      audioSrc: '/assets/audio/grade3/vowel-teams/train.wav',
      pattern: 'CCVVC',
      segments: [
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        { grapheme: 'r', soundLabel: '/r/', audioLetter: 'r' },
        {
          grapheme: 'ai',
          soundLabel: '/eɪ/',
          audioSrc: gradeTwoPhonemeAudio.longA,
        },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'beach',
      meaningZhTW: '海灘',
      imageSrc: '/assets/images/grade3/vowel-teams/beach.webp',
      imageAlt: '有陽傘、沙灘球與藍色海水的海灘',
      audioSrc: '/assets/audio/grade3/vowel-teams/beach.wav',
      pattern: 'CVVCC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        {
          grapheme: 'ea',
          soundLabel: '/iː/',
          audioSrc: gradeTwoPhonemeAudio.longE,
        },
        {
          grapheme: 'ch',
          soundLabel: '/tʃ/',
          audioSrc: gradeTwoPhonemeAudio.chSound,
        },
      ],
    },
    {
      word: 'goat',
      meaningZhTW: '山羊',
      imageSrc: '/assets/images/courses/g/g-goat-core.webp',
      imageAlt: '一隻表情友善的白色小山羊',
      audioSrc: '/assets/audio/grade3/vowel-teams/goat.wav',
      pattern: 'CVVC',
      segments: [
        { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
        {
          grapheme: 'oa',
          soundLabel: '/oʊ/',
          audioSrc: gradeTwoPhonemeAudio.longO,
        },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
      ],
    },
  ],
});

export const gradeThreeVowelTeamLessons = [
  gradeThreeAiAyLesson,
  gradeThreeEeEaLesson,
  gradeThreeOaOwLesson,
  gradeThreeVowelTeamReviewLesson,
  gradeThreeAlternateVowelTeamsLesson,
  gradeThreeVowelTeamChallengeLesson,
] as const;

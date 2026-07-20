import { createBlendingLesson } from './createBlendingLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

const arSoundAudio = '/assets/audio/grade3/r-controlled-vowels/ar-sound.wav';
const orSoundAudio = '/assets/audio/grade3/r-controlled-vowels/or-sound.wav';
const erSoundAudio = '/assets/audio/grade3/r-controlled-vowels/er-sound.wav';
const irSoundAudio = '/assets/audio/grade3/r-controlled-vowels/ir-sound.wav';
const urSoundAudio = '/assets/audio/grade3/r-controlled-vowels/ur-sound.wav';

export const gradeThreeArLesson = createBlendingLesson({
  id: 'grade-3-ar-lesson-01',
  slug: 'ar',
  unitId: 'grade-3-r-controlled-vowels',
  unitLabel: 'R 控制母音',
  order: 1,
  title: 'ar 的聲音',
  subtitle: 'a 遇到 r，會一起發出 /ɑr/。把 ar 當成一個聲音，再和前後接起來。',
  vowelGrapheme: 'ar',
  vowelSoundLabel: '/ɑr/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'car',
      meaningZhTW: '汽車',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/car.webp',
      imageAlt: '一台紅色玩具汽車',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/car.wav',
      pattern: 'CVC',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        { grapheme: 'ar', soundLabel: '/ɑr/', audioSrc: arSoundAudio },
      ],
    },
    {
      word: 'star',
      meaningZhTW: '星星',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/star.webp',
      imageAlt: '一顆立體的黃色五角星星',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/star.wav',
      pattern: 'CCVC',
      segments: [
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        { grapheme: 'ar', soundLabel: '/ɑr/', audioSrc: arSoundAudio },
      ],
    },
    {
      word: 'farm',
      meaningZhTW: '農場',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/farm.webp',
      imageAlt: '有紅色穀倉、筒倉與白色圍籬的玩具農場',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/farm.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
        { grapheme: 'ar', soundLabel: '/ɑr/', audioSrc: arSoundAudio },
        { grapheme: 'm', soundLabel: '/m/', audioLetter: 'm' },
      ],
    },
  ],
});

export const gradeThreeOrLesson = createBlendingLesson({
  id: 'grade-3-or-lesson-02',
  slug: 'or',
  unitId: 'grade-3-r-controlled-vowels',
  unitLabel: 'R 控制母音',
  order: 2,
  title: 'or 的聲音',
  subtitle: 'o 遇到 r，會一起發出 /ɔr/。把 or 當成一個聲音，再和前後接起來。',
  vowelGrapheme: 'or',
  vowelSoundLabel: '/ɔr/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'corn',
      meaningZhTW: '玉米',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/corn.webp',
      imageAlt: '一根有綠色外葉的黃色玉米',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/corn.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'c', soundLabel: '/k/', audioLetter: 'c' },
        { grapheme: 'or', soundLabel: '/ɔr/', audioSrc: orSoundAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'fork',
      meaningZhTW: '叉子',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/fork.webp',
      imageAlt: '一支有藍色握柄的銀色叉子',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/fork.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
        { grapheme: 'or', soundLabel: '/ɔr/', audioSrc: orSoundAudio },
        { grapheme: 'k', soundLabel: '/k/', audioLetter: 'k' },
      ],
    },
    {
      word: 'horse',
      meaningZhTW: '馬',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/horse.webp',
      imageAlt: '一匹站立的棕色玩具馬',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/horse.wav',
      pattern: 'CVCCe',
      segments: [
        { grapheme: 'h', soundLabel: '/h/', audioLetter: 'h' },
        { grapheme: 'or', soundLabel: '/ɔr/', audioSrc: orSoundAudio },
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        {
          grapheme: 'e',
          soundLabel: 'silent',
          isSilent: true,
          hint: '字尾 e 不發音，它不會另外發出聲音。',
        },
      ],
    },
  ],
});

export const gradeThreeErLesson = createBlendingLesson({
  id: 'grade-3-er-lesson-03',
  slug: 'er',
  unitId: 'grade-3-r-controlled-vowels',
  unitLabel: 'R 控制母音',
  order: 3,
  title: 'er 的聲音',
  subtitle: 'e 遇到 r，會一起發出 /ɝ/。先聽清楚 er，再把前後的聲音接起來。',
  vowelGrapheme: 'er',
  vowelSoundLabel: '/ɝ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'her',
      meaningZhTW: '她',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/her.webp',
      imageAlt: '一位指著自己的女孩',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/her.wav',
      pattern: 'CVC',
      segments: [
        { grapheme: 'h', soundLabel: '/h/', audioLetter: 'h' },
        { grapheme: 'er', soundLabel: '/ɝ/', audioSrc: erSoundAudio },
      ],
    },
    {
      word: 'fern',
      meaningZhTW: '蕨類植物',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/fern.webp',
      imageAlt: '一盆有羽狀綠葉的蕨類植物',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/fern.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
        { grapheme: 'er', soundLabel: '/ɝ/', audioSrc: erSoundAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'germ',
      meaningZhTW: '細菌',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/germ.webp',
      imageAlt: '一個綠色圓形的細菌玩偶',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/germ.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'g', soundLabel: '/dʒ/', audioLetter: 'j' },
        { grapheme: 'er', soundLabel: '/ɝ/', audioSrc: erSoundAudio },
        { grapheme: 'm', soundLabel: '/m/', audioLetter: 'm' },
      ],
    },
  ],
});

export const gradeThreeIrLesson = createBlendingLesson({
  id: 'grade-3-ir-lesson-04',
  slug: 'ir',
  unitId: 'grade-3-r-controlled-vowels',
  unitLabel: 'R 控制母音',
  order: 4,
  title: 'ir 的聲音',
  subtitle: 'i 遇到 r，也會發出 /ɝ/。看見 ir 時，把兩個字母當成一個聲音。',
  vowelGrapheme: 'ir',
  vowelSoundLabel: '/ɝ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'bird',
      meaningZhTW: '鳥',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/bird.webp',
      imageAlt: '一隻藍色身體與黃色胸口的小鳥',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/bird.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
        { grapheme: 'ir', soundLabel: '/ɝ/', audioSrc: irSoundAudio },
        { grapheme: 'd', soundLabel: '/d/', audioLetter: 'd' },
      ],
    },
    {
      word: 'girl',
      meaningZhTW: '女孩',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/girl.webp',
      imageAlt: '一位穿紫色上衣與牛仔吊帶褲的女孩',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/girl.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 'g', soundLabel: '/g/', audioLetter: 'g' },
        { grapheme: 'ir', soundLabel: '/ɝ/', audioSrc: irSoundAudio },
        { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
      ],
    },
    {
      word: 'shirt',
      meaningZhTW: '上衣',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/shirt.webp',
      imageAlt: '一件藍綠色的短袖上衣',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/shirt.wav',
      pattern: 'CCVCC',
      segments: [
        {
          grapheme: 'sh',
          soundLabel: '/ʃ/',
          audioSrc: gradeTwoPhonemeAudio.shSound,
        },
        { grapheme: 'ir', soundLabel: '/ɝ/', audioSrc: irSoundAudio },
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
      ],
    },
  ],
});

export const gradeThreeUrLesson = createBlendingLesson({
  id: 'grade-3-ur-lesson-05',
  slug: 'ur',
  unitId: 'grade-3-r-controlled-vowels',
  unitLabel: 'R 控制母音',
  order: 5,
  title: 'ur 的聲音',
  subtitle: 'u 遇到 r，也會發出 /ɝ/。聽完 ur，再把整個字順順地合起來。',
  vowelGrapheme: 'ur',
  vowelSoundLabel: '/ɝ/',
  estimatedMinutes: 7,
  words: [
    {
      word: 'fur',
      meaningZhTW: '毛皮',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/fur.webp',
      imageAlt: '一塊柔軟的棕色毛皮',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/fur.wav',
      pattern: 'CVC',
      segments: [
        { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
        { grapheme: 'ur', soundLabel: '/ɝ/', audioSrc: urSoundAudio },
      ],
    },
    {
      word: 'turn',
      meaningZhTW: '轉彎',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/turn.webp',
      imageAlt: '一台紅色玩具車沿著藍色彎道轉彎',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/turn.wav',
      pattern: 'CVCC',
      segments: [
        { grapheme: 't', soundLabel: '/t/', audioLetter: 't' },
        { grapheme: 'ur', soundLabel: '/ɝ/', audioSrc: urSoundAudio },
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
      ],
    },
    {
      word: 'nurse',
      meaningZhTW: '護理師',
      imageSrc: '/assets/images/grade3/r-controlled-vowels/nurse.webp',
      imageAlt: '一位穿藍綠色醫療服的護理師',
      audioSrc: '/assets/audio/grade3/r-controlled-vowels/nurse.wav',
      pattern: 'CVCCe',
      segments: [
        { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        { grapheme: 'ur', soundLabel: '/ɝ/', audioSrc: urSoundAudio },
        { grapheme: 's', soundLabel: '/s/', audioLetter: 's' },
        {
          grapheme: 'e',
          soundLabel: 'silent',
          isSilent: true,
          hint: '字尾 e 不發音，它不會另外發出聲音。',
        },
      ],
    },
  ],
});

export const gradeThreeRControlledVowelLessons = [
  gradeThreeArLesson,
  gradeThreeOrLesson,
  gradeThreeErLesson,
  gradeThreeIrLesson,
  gradeThreeUrLesson,
] as const;

import { createBlendingLesson } from './createBlendingLesson';

const audioRoot = '/assets/audio/grade3/multisyllable';
const imageRoot = '/assets/images/grade3/multisyllable';

export const gradeThreeCompoundWordsLesson = createBlendingLesson({
  id: 'grade-3-compound-words-lesson-01',
  slug: 'compound-words',
  unitId: 'grade-3-multisyllable-words',
  unitLabel: '長字拆開讀',
  order: 1,
  title: '兩個小字合成長字',
  subtitle: '先聽左邊的小字，再聽右邊的小字，最後把兩段連起來讀完整單字。',
  vowelGrapheme: '兩段',
  vowelSoundLabel: '拍兩下',
  practiceMode: 'syllable',
  estimatedMinutes: 7,
  words: [
    {
      word: 'sunset',
      meaningZhTW: '日落',
      imageSrc: `${imageRoot}/sunset.webp`,
      imageAlt: '橘色太陽正落到綠色山丘後方',
      audioSrc: `${audioRoot}/sunset.wav`,
      pattern: 'compound',
      segments: [
        { grapheme: 'sun', soundLabel: 'sun', audioSrc: `${audioRoot}/sun.wav` },
        { grapheme: 'set', soundLabel: 'set', audioSrc: `${audioRoot}/set.wav` },
      ],
    },
    {
      word: 'cupcake',
      meaningZhTW: '杯子蛋糕',
      imageSrc: `${imageRoot}/cupcake.webp`,
      imageAlt: '一個有粉紅糖霜與紅櫻桃的杯子蛋糕',
      audioSrc: `${audioRoot}/cupcake.wav`,
      pattern: 'compound',
      segments: [
        { grapheme: 'cup', soundLabel: 'cup', audioSrc: `${audioRoot}/cup.wav` },
        {
          grapheme: 'cake',
          soundLabel: 'cake',
          audioSrc: `${audioRoot}/cake.wav`,
        },
      ],
    },
    {
      word: 'raincoat',
      meaningZhTW: '雨衣',
      imageSrc: `${imageRoot}/raincoat.webp`,
      imageAlt: '一件有藍色鈕扣與帽子的黃色兒童雨衣',
      audioSrc: `${audioRoot}/raincoat.wav`,
      pattern: 'compound',
      segments: [
        {
          grapheme: 'rain',
          soundLabel: 'rain',
          audioSrc: `${audioRoot}/rain.wav`,
        },
        {
          grapheme: 'coat',
          soundLabel: 'coat',
          audioSrc: `${audioRoot}/coat.wav`,
        },
      ],
    },
  ],
});

export const gradeThreeClosedSyllablesLesson = createBlendingLesson({
  id: 'grade-3-closed-syllables-lesson-02',
  slug: 'closed-syllables',
  unitId: 'grade-3-multisyllable-words',
  unitLabel: '長字拆開讀',
  order: 2,
  title: '中間一刀，兩邊都短音',
  subtitle:
    '看到中間有兩個子音時，把它們分到兩邊。先讀第一段，再讀第二段，最後合成長字。',
  vowelGrapheme: '兩段',
  vowelSoundLabel: '短母音',
  practiceMode: 'syllable',
  estimatedMinutes: 7,
  words: [
    {
      word: 'rabbit',
      meaningZhTW: '兔子',
      imageSrc: `${imageRoot}/rabbit.webp`,
      imageAlt: '一隻坐著微笑的白色兔子',
      audioSrc: `${audioRoot}/rabbit.wav`,
      pattern: 'two-syllable',
      segments: [
        { grapheme: 'rab', soundLabel: '/ræb/', audioSrc: `${audioRoot}/rab.wav` },
        { grapheme: 'bit', soundLabel: '/bɪt/', audioSrc: `${audioRoot}/bit.wav` },
      ],
    },
    {
      word: 'picnic',
      meaningZhTW: '野餐',
      imageSrc: `${imageRoot}/picnic.webp`,
      imageAlt: '草地上的野餐籃、蘋果、三明治與紅白格子布',
      audioSrc: `${audioRoot}/picnic.wav`,
      pattern: 'two-syllable',
      segments: [
        { grapheme: 'pic', soundLabel: '/pɪk/', audioSrc: `${audioRoot}/pic.wav` },
        { grapheme: 'nic', soundLabel: '/nɪk/', audioSrc: `${audioRoot}/nic.wav` },
      ],
    },
    {
      word: 'magnet',
      meaningZhTW: '磁鐵',
      imageSrc: `${imageRoot}/magnet.webp`,
      imageAlt: '一個紅藍兩色的 U 形磁鐵',
      audioSrc: `${audioRoot}/magnet.wav`,
      pattern: 'two-syllable',
      segments: [
        { grapheme: 'mag', soundLabel: '/mæɡ/', audioSrc: `${audioRoot}/mag.wav` },
        { grapheme: 'net', soundLabel: '/nɛt/', audioSrc: `${audioRoot}/net.wav` },
      ],
    },
  ],
});

export const gradeThreeOpenFirstSyllableLesson = createBlendingLesson({
  id: 'grade-3-open-first-syllable-lesson-03',
  slug: 'open-first-syllable',
  unitId: 'grade-3-multisyllable-words',
  unitLabel: '長字拆開讀',
  order: 3,
  title: '第一段開口，母音念長音',
  subtitle: '第一段停在母音時，母音常會念自己的名字。先聽第一段，再接上第二段。',
  vowelGrapheme: '開音節',
  vowelSoundLabel: '長母音',
  practiceMode: 'syllable',
  estimatedMinutes: 7,
  words: [
    {
      word: 'tiger',
      meaningZhTW: '老虎',
      imageSrc: `${imageRoot}/tiger.webp`,
      imageAlt: '一隻站著微笑的橘色小老虎',
      audioSrc: `${audioRoot}/tiger.wav`,
      pattern: 'two-syllable',
      segments: [
        { grapheme: 'ti', soundLabel: '/taɪ/', audioSrc: `${audioRoot}/ti.wav` },
        { grapheme: 'ger', soundLabel: '/ɡɚ/', audioSrc: `${audioRoot}/ger.wav` },
      ],
    },
    {
      word: 'robot',
      meaningZhTW: '機器人',
      imageSrc: `${imageRoot}/robot.webp`,
      imageAlt: '一個有銀色身體與藍色手腳的微笑玩具機器人',
      audioSrc: `${audioRoot}/robot.wav`,
      pattern: 'two-syllable',
      segments: [
        { grapheme: 'ro', soundLabel: '/roʊ/', audioSrc: `${audioRoot}/ro.wav` },
        { grapheme: 'bot', soundLabel: '/bɑt/', audioSrc: `${audioRoot}/bot.wav` },
      ],
    },
    {
      word: 'paper',
      meaningZhTW: '紙',
      imageSrc: `${imageRoot}/paper.webp`,
      imageAlt: '一張有三條藍色橫線的白紙',
      audioSrc: `${audioRoot}/paper.wav`,
      pattern: 'two-syllable',
      segments: [
        { grapheme: 'pa', soundLabel: '/peɪ/', audioSrc: `${audioRoot}/pa.wav` },
        { grapheme: 'per', soundLabel: '/pɚ/', audioSrc: `${audioRoot}/per.wav` },
      ],
    },
  ],
});

export const gradeThreeFamiliarChunksLesson = createBlendingLesson({
  id: 'grade-3-familiar-chunks-lesson-04',
  slug: 'familiar-chunks',
  unitId: 'grade-3-multisyllable-words',
  unitLabel: '長字拆開讀',
  order: 4,
  title: '長字裡的熟悉聲音',
  subtitle: '先找出學過的母音組合，再把兩個熟悉的小段接起來。長字也能一步一步讀。',
  vowelGrapheme: '熟悉小段',
  vowelSoundLabel: '母音組合',
  practiceMode: 'syllable',
  estimatedMinutes: 7,
  words: [
    {
      word: 'rainbow',
      meaningZhTW: '彩虹',
      imageSrc: `${imageRoot}/rainbow.webp`,
      imageAlt: '一道在藍天與白雲間展開的彩虹',
      audioSrc: `${audioRoot}/rainbow.wav`,
      pattern: 'compound',
      segments: [
        {
          grapheme: 'rain',
          soundLabel: '/reɪn/',
          audioSrc: `${audioRoot}/rain.wav`,
        },
        { grapheme: 'bow', soundLabel: '/boʊ/', audioSrc: `${audioRoot}/bow.wav` },
      ],
    },
    {
      word: 'seaside',
      meaningZhTW: '海邊',
      imageSrc: `${imageRoot}/seaside.webp`,
      imageAlt: '有海浪、貝殼與紅色水桶的晴朗海邊',
      audioSrc: `${audioRoot}/seaside.wav`,
      pattern: 'compound',
      segments: [
        { grapheme: 'sea', soundLabel: '/siː/', audioSrc: `${audioRoot}/sea.wav` },
        {
          grapheme: 'side',
          soundLabel: '/saɪd/',
          audioSrc: `${audioRoot}/side.wav`,
        },
      ],
    },
    {
      word: 'daylight',
      meaningZhTW: '日光',
      imageSrc: `${imageRoot}/daylight.webp`,
      imageAlt: '晴朗藍天下照亮綠色草地的明亮太陽',
      audioSrc: `${audioRoot}/daylight.wav`,
      pattern: 'compound',
      segments: [
        { grapheme: 'day', soundLabel: '/deɪ/', audioSrc: `${audioRoot}/day.wav` },
        {
          grapheme: 'light',
          soundLabel: '/laɪt/',
          audioSrc: `${audioRoot}/light.wav`,
        },
      ],
    },
  ],
});

export const gradeThreeMultisyllableChallengeLesson = createBlendingLesson({
  id: 'grade-3-multisyllable-challenge-lesson-05',
  slug: 'multisyllable-challenge',
  unitId: 'grade-3-multisyllable-words',
  unitLabel: '長字拆開讀',
  order: 5,
  title: '長字拆讀闖關',
  subtitle: '混合三種拆讀方式。先找出兩個好讀的小段，再把它們順順地接成完整單字。',
  vowelGrapheme: '混合拆讀',
  vowelSoundLabel: '兩段合成',
  practiceMode: 'syllable',
  estimatedMinutes: 7,
  words: [
    {
      word: 'sunset',
      meaningZhTW: '日落',
      imageSrc: `${imageRoot}/sunset.webp`,
      imageAlt: '橘色太陽正落到綠色山丘後方',
      audioSrc: `${audioRoot}/sunset.wav`,
      pattern: 'compound',
      segments: [
        { grapheme: 'sun', soundLabel: 'sun', audioSrc: `${audioRoot}/sun.wav` },
        { grapheme: 'set', soundLabel: 'set', audioSrc: `${audioRoot}/set.wav` },
      ],
    },
    {
      word: 'rabbit',
      meaningZhTW: '兔子',
      imageSrc: `${imageRoot}/rabbit.webp`,
      imageAlt: '一隻坐著微笑的白色兔子',
      audioSrc: `${audioRoot}/rabbit.wav`,
      pattern: 'two-syllable',
      segments: [
        { grapheme: 'rab', soundLabel: '/ræb/', audioSrc: `${audioRoot}/rab.wav` },
        { grapheme: 'bit', soundLabel: '/bɪt/', audioSrc: `${audioRoot}/bit.wav` },
      ],
    },
    {
      word: 'rainbow',
      meaningZhTW: '彩虹',
      imageSrc: `${imageRoot}/rainbow.webp`,
      imageAlt: '一道在藍天與白雲間展開的彩虹',
      audioSrc: `${audioRoot}/rainbow.wav`,
      pattern: 'compound',
      segments: [
        {
          grapheme: 'rain',
          soundLabel: '/reɪn/',
          audioSrc: `${audioRoot}/rain.wav`,
        },
        { grapheme: 'bow', soundLabel: '/boʊ/', audioSrc: `${audioRoot}/bow.wav` },
      ],
    },
  ],
});

export const gradeThreeMultisyllableLessons = [
  gradeThreeCompoundWordsLesson,
  gradeThreeClosedSyllablesLesson,
  gradeThreeOpenFirstSyllableLesson,
  gradeThreeFamiliarChunksLesson,
  gradeThreeMultisyllableChallengeLesson,
] as const;

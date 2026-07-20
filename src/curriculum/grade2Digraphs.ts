import { createBlendingLesson } from './createBlendingLesson';
import { gradeTwoPhonemeAudio } from './gradeTwoPhonemeAudio';

const unitId = 'grade-2-digraphs';
const unitLabel = '兩個字母一個聲音';
const generatedImage = (word: string) =>
  `/assets/images/grade2/digraphs/${word}.webp`;
const generatedAudio = (word: string) =>
  `/assets/audio/grade2/digraphs/${word}.wav`;

const sh = {
  grapheme: 'sh',
  soundLabel: '/ʃ/',
  audioSrc: gradeTwoPhonemeAudio.shSound,
};
const ch = {
  grapheme: 'ch',
  soundLabel: '/tʃ/',
  audioSrc: gradeTwoPhonemeAudio.chSound,
};
const th = {
  grapheme: 'th',
  soundLabel: '/θ/',
  audioSrc: gradeTwoPhonemeAudio.thSound,
};
const wh = {
  grapheme: 'wh',
  soundLabel: '/w/',
  audioLetter: 'w',
};

export const gradeTwoDigraphLessons = [
  createBlendingLesson({
    id: 'grade-2-digraph-sh-lesson-01',
    slug: 'digraph-sh',
    unitId,
    unitLabel,
    order: 1,
    title: 'sh 的聲音',
    subtitle: 's 和 h 站在一起，會發出安靜的 /ʃ/。',
    vowelGrapheme: 'sh',
    vowelSoundLabel: '/ʃ/',
    words: [
      {
        word: 'fish',
        meaningZhTW: '魚',
        sourceLetter: 'f',
        imageAlt: '一隻橘色小魚',
        pattern: 'CVCC',
        segments: [
          { grapheme: 'f', soundLabel: '/f/', audioLetter: 'f' },
          { grapheme: 'i', soundLabel: '/ɪ/', audioLetter: 'i' },
          sh,
        ],
      },
      {
        word: 'ship',
        meaningZhTW: '船',
        imageAlt: '一艘紅藍色的小船',
        imageSrc: generatedImage('ship'),
        audioSrc: generatedAudio('ship'),
        pattern: 'CCVC',
        segments: [
          sh,
          { grapheme: 'i', soundLabel: '/ɪ/', audioLetter: 'i' },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-digraph-ch-lesson-02',
    slug: 'digraph-ch',
    unitId,
    unitLabel,
    order: 2,
    title: 'ch 的聲音',
    subtitle: 'c 和 h 站在一起，會發出短短的 /tʃ/。',
    vowelGrapheme: 'ch',
    vowelSoundLabel: '/tʃ/',
    words: [
      {
        word: 'chip',
        meaningZhTW: '洋芋片',
        imageAlt: '一片金黃色洋芋片',
        imageSrc: generatedImage('chip'),
        audioSrc: generatedAudio('chip'),
        pattern: 'CCVC',
        segments: [
          ch,
          { grapheme: 'i', soundLabel: '/ɪ/', audioLetter: 'i' },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
      {
        word: 'chin',
        meaningZhTW: '下巴',
        imageAlt: '一位孩子指著自己的下巴',
        imageSrc: generatedImage('chin'),
        audioSrc: generatedAudio('chin'),
        pattern: 'CCVC',
        segments: [
          ch,
          { grapheme: 'i', soundLabel: '/ɪ/', audioLetter: 'i' },
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-digraph-th-lesson-03',
    slug: 'digraph-th',
    unitId,
    unitLabel,
    order: 3,
    title: 'th 的聲音',
    subtitle: '舌尖輕碰牙齒，讓氣流發出 /θ/。',
    vowelGrapheme: 'th',
    vowelSoundLabel: '/θ/',
    words: [
      {
        word: 'thin',
        meaningZhTW: '薄的',
        imageAlt: '一本很薄的藍色書',
        imageSrc: generatedImage('thin'),
        audioSrc: generatedAudio('thin'),
        pattern: 'CCVC',
        segments: [
          th,
          { grapheme: 'i', soundLabel: '/ɪ/', audioLetter: 'i' },
          { grapheme: 'n', soundLabel: '/n/', audioLetter: 'n' },
        ],
      },
      {
        word: 'bath',
        meaningZhTW: '洗澡',
        imageAlt: '裝著泡泡水和黃色小鴨的浴缸',
        imageSrc: generatedImage('bath'),
        audioSrc: generatedAudio('bath'),
        pattern: 'CVCC',
        segments: [
          { grapheme: 'b', soundLabel: '/b/', audioLetter: 'b' },
          {
            grapheme: 'a',
            soundLabel: '/æ/',
            audioSrc: gradeTwoPhonemeAudio.shortA,
          },
          th,
        ],
      },
    ],
  }),
  createBlendingLesson({
    id: 'grade-2-digraph-wh-lesson-04',
    slug: 'digraph-wh',
    unitId,
    unitLabel,
    order: 4,
    title: 'wh 的聲音',
    subtitle: '在美式英語裡，wh 常常發出 /w/。',
    vowelGrapheme: 'wh',
    vowelSoundLabel: '/w/',
    words: [
      {
        word: 'whip',
        meaningZhTW: '長鞭',
        imageAlt: '一條盤起來的棕色長鞭',
        imageSrc: generatedImage('whip'),
        audioSrc: generatedAudio('whip'),
        pattern: 'CCVC',
        segments: [
          wh,
          { grapheme: 'i', soundLabel: '/ɪ/', audioLetter: 'i' },
          { grapheme: 'p', soundLabel: '/p/', audioLetter: 'p' },
        ],
      },
      {
        word: 'whale',
        meaningZhTW: '鯨魚',
        sourceLetter: 'w',
        imageAlt: '一隻友善的藍色鯨魚',
        pattern: 'CCVCe',
        segments: [
          wh,
          {
            grapheme: 'a_e',
            soundLabel: '/eɪ/',
            audioSrc: '/assets/audio/grade2/phonemes/long-a.wav',
          },
          { grapheme: 'l', soundLabel: '/l/', audioLetter: 'l' },
        ],
      },
    ],
  }),
] as const;

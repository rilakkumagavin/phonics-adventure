import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { gradeTwoDecodableSentenceLessons } from './grade2DecodableSentences';
import {
  getGradeTwoSentenceLesson,
  getGradeTwoSentenceLessonPath,
} from './gradeTwoSentenceRepository';

function assetExists(src: string) {
  return existsSync(resolve(process.cwd(), 'public', src.replace(/^\//, '')));
}

describe('二年級可拼讀短句', () => {
  it('提供五課且由短句需要的逐字資料組成', () => {
    expect(gradeTwoDecodableSentenceLessons).toHaveLength(5);
    expect(
      gradeTwoDecodableSentenceLessons.map((lesson) => lesson.sentence),
    ).toEqual([
      'A cat is on a mat.',
      'The fish can swim.',
      'The frog can jump.',
      'I ride a bike.',
      'The rose is in a vase.',
    ]);
    expect(
      gradeTwoDecodableSentenceLessons.every(
        (lesson) => lesson.tokens.length >= 4,
      ),
    ).toBe(true);
  });

  it('每個字、整句與情境圖片都有可用資產', () => {
    for (const lesson of gradeTwoDecodableSentenceLessons) {
      expect(assetExists(lesson.image.src), lesson.image.src).toBe(true);
      expect(assetExists(lesson.audio.src), lesson.audio.src).toBe(true);

      for (const token of lesson.tokens) {
        expect(assetExists(token.audio.src), token.audio.src).toBe(true);
      }
    }
  });

  it('可由 slug 或 id 查找，並產生短句專用路徑', () => {
    const firstLesson = gradeTwoDecodableSentenceLessons[0];

    expect(getGradeTwoSentenceLesson('cat-on-mat')?.id).toBe(firstLesson.id);
    expect(getGradeTwoSentenceLesson(firstLesson.id)?.slug).toBe('cat-on-mat');
    expect(getGradeTwoSentenceLessonPath(firstLesson)).toBe(
      '/grade/2/sentence/cat-on-mat',
    );
  });
});

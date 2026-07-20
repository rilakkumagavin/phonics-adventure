import { gradeTwoBlendingLessons } from '../src/curriculum/gradeTwoLessonRepository';

interface AuditEntry {
  grapheme: string;
  soundLabel: string;
  audioSrc: string | null;
  words: string[];
}

const entries = new Map<string, AuditEntry>();

for (const lesson of gradeTwoBlendingLessons) {
  for (const word of lesson.words) {
    for (const segment of word.segments) {
      const key = `${segment.grapheme}|${segment.soundLabel}`;
      const entry = entries.get(key) ?? {
        grapheme: segment.grapheme,
        soundLabel: segment.soundLabel,
        audioSrc: segment.audio?.src ?? null,
        words: [],
      };

      if (entry.audioSrc !== (segment.audio?.src ?? null)) {
        throw new Error(
          `${key} uses multiple audio sources: ${entry.audioSrc} and ${
            segment.audio?.src ?? 'none'
          }`,
        );
      }

      if (!entry.words.includes(word.word)) {
        entry.words.push(word.word);
      }

      entries.set(key, entry);
    }
  }
}

const report = [...entries.values()].sort((left, right) =>
  `${left.grapheme}-${left.soundLabel}`.localeCompare(
    `${right.grapheme}-${right.soundLabel}`,
  ),
);

console.log(JSON.stringify(report, null, 2));

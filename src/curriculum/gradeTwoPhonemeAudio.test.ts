import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { gradeTwoBlendingLessons } from './gradeTwoLessonRepository';

interface PhonemeManifest {
  reviewStatus: string;
  assets: Array<{
    soundLabel: string;
    relativePath: string;
  }>;
}

const projectRoot = process.cwd();
const manifest = JSON.parse(
  readFileSync(
    resolve(projectRoot, 'docs/assets/grade2-phoneme-manifest.json'),
    'utf8',
  ),
) as PhonemeManifest;
const manifestPaths = new Map(
  manifest.assets.map((asset) => [
    asset.soundLabel,
    `/${asset.relativePath}`,
  ]),
);
const soundingSegments = gradeTwoBlendingLessons.flatMap((lesson) =>
  lesson.words.flatMap((word) =>
    word.segments.filter((segment) => !segment.isSilent),
  ),
);

function publicPath(src: string) {
  return resolve(projectRoot, 'public', src.replace(/^\//, ''));
}

describe('二年級教學音段資產', () => {
  it('31 種音值都有唯一且完整的 manifest 紀錄', () => {
    const usedSoundLabels = new Set(
      soundingSegments.map((segment) => segment.soundLabel),
    );

    expect(manifest.reviewStatus).toBe('needs-human-listening');
    expect(manifest.assets).toHaveLength(31);
    expect(manifestPaths.size).toBe(31);
    expect(usedSoundLabels.size).toBe(31);
    expect([...usedSoundLabels].sort()).toEqual(
      [...manifestPaths.keys()].sort(),
    );
  });

  it('所有音段只引用二年級專用 WAV，不再回退舊課程音檔', () => {
    for (const segment of soundingSegments) {
      const expectedPath = manifestPaths.get(segment.soundLabel);

      expect(segment.audio).toBeDefined();
      expect(segment.audio?.src).toBe(expectedPath);
      expect(segment.audio?.src).toMatch(
        /^\/assets\/audio\/grade2\/phonemes\/.+\.wav$/,
      );
    }
  });

  it('每個 manifest 音檔都是存在、非空且可辨識的 PCM WAV', () => {
    const hashes = new Set<string>();

    for (const asset of manifest.assets) {
      const path = publicPath(`/${asset.relativePath}`);

      expect(existsSync(path), asset.relativePath).toBe(true);
      const bytes = readFileSync(path);

      expect(bytes.length, asset.relativePath).toBeGreaterThan(4_000);
      expect(bytes.subarray(0, 4).toString('ascii')).toBe('RIFF');
      expect(bytes.subarray(8, 12).toString('ascii')).toBe('WAVE');
      hashes.add(createHash('sha256').update(bytes).digest('hex'));
    }

    expect(hashes.size).toBe(manifest.assets.length);
  });

  it('Magic E 的字尾 e 仍維持不發音且沒有假音檔', () => {
    const silentSegments = gradeTwoBlendingLessons.flatMap((lesson) =>
      lesson.words.flatMap((word) =>
        word.segments.filter((segment) => segment.isSilent),
      ),
    );

    expect(silentSegments).toHaveLength(8);
    expect(
      silentSegments.every(
        (segment) =>
          segment.grapheme === 'e' &&
          segment.soundLabel === '不發音' &&
          segment.audio === undefined,
      ),
    ).toBe(true);
  });
});

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getAllCourses } from '../courses/courseRepository';

interface ReadyImageAsset {
  alt: string;
  id: string;
  src: string;
  status: 'ready';
}

function collectReadyImages(value: unknown, images: ReadyImageAsset[]) {
  if (!value || typeof value !== 'object') {
    return;
  }

  if (
    'status' in value &&
    value.status === 'ready' &&
    'src' in value &&
    typeof value.src === 'string' &&
    value.src.endsWith('.webp') &&
    'id' in value &&
    typeof value.id === 'string' &&
    'alt' in value &&
    typeof value.alt === 'string'
  ) {
    images.push(value as ReadyImageAsset);
    return;
  }

  for (const nestedValue of Object.values(value)) {
    collectReadyImages(nestedValue, images);
  }
}

function readVp8Dimensions(filePath: string) {
  const buffer = readFileSync(filePath);

  if (
    buffer.length < 30 ||
    buffer.subarray(0, 4).toString('ascii') !== 'RIFF' ||
    buffer.subarray(8, 12).toString('ascii') !== 'WEBP' ||
    buffer.subarray(12, 16).toString('ascii') !== 'VP8 '
  ) {
    throw new Error(`${filePath} 不是可解析的 VP8 WebP。`);
  }

  const riffSize = buffer.readUInt32LE(4) + 8;
  const chunkSize = buffer.readUInt32LE(16);

  if (riffSize > buffer.length || 20 + chunkSize > buffer.length) {
    throw new Error(`${filePath} 的 WebP 資料已截斷。`);
  }

  if (buffer.subarray(23, 26).toString('hex') !== '9d012a') {
    throw new Error(`${filePath} 缺少 VP8 frame header。`);
  }

  return {
    fileSize: buffer.length,
    height: buffer.readUInt16LE(28) & 0x3fff,
    width: buffer.readUInt16LE(26) & 0x3fff,
  };
}

describe('已建立課程的圖片資產完整性', () => {
  it('所有正式課程圖片都有完整且尺寸合理的 WebP 檔案', () => {
    const imageReferences: ReadyImageAsset[] = [];

    collectReadyImages(getAllCourses(), imageReferences);

    const imagesBySrc = new Map(
      imageReferences.map((image) => [image.src, image] as const),
    );

    expect(imagesBySrc.size).toBeGreaterThanOrEqual(getAllCourses().length * 3);

    for (const image of imagesBySrc.values()) {
      expect(image.alt.trim(), `${image.id} 缺少替代文字`).not.toBe('');
      expect(image.src).toMatch(
        /^\/assets\/images\/(?:courses\/[a-z]|shared)\/.+\.webp$/,
      );

      const filePath = resolve('public', image.src.slice(1));
      expect(existsSync(filePath), `${image.id} 缺少 ${filePath}`).toBe(true);

      const metrics = readVp8Dimensions(filePath);
      const aspectRatio = metrics.width / metrics.height;

      expect(metrics.fileSize, `${image.id} 圖片檔案過小`).toBeGreaterThan(4_096);
      expect(metrics.width, `${image.id} 圖片寬度不足`).toBeGreaterThanOrEqual(512);
      expect(metrics.height, `${image.id} 圖片高度不足`).toBeGreaterThanOrEqual(512);
      expect(aspectRatio, `${image.id} 圖片過窄`).toBeGreaterThanOrEqual(0.75);
      expect(aspectRatio, `${image.id} 圖片過寬`).toBeLessThanOrEqual(1.5);
    }
  });
});

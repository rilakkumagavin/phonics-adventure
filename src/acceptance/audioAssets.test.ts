import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { getAllCourses } from '../courses/courseRepository';

interface PcmWavMetrics {
  audioFormat: number;
  bitsPerSample: number;
  channels: number;
  durationSeconds: number;
  leadingSilenceSeconds: number;
  peakAmplitude: number;
  sampleRate: number;
}

function readPcmWavMetrics(filePath: string): PcmWavMetrics {
  const buffer = readFileSync(filePath);

  if (
    buffer.length < 12 ||
    buffer.subarray(0, 4).toString('ascii') !== 'RIFF' ||
    buffer.subarray(8, 12).toString('ascii') !== 'WAVE'
  ) {
    throw new Error(`${filePath} 不是有效的 RIFF/WAVE 檔案。`);
  }

  if (buffer.readUInt32LE(4) + 8 > buffer.length) {
    throw new Error(`${filePath} 的 RIFF 資料長度超出檔案邊界。`);
  }

  let offset = 12;
  let formatChunk: Buffer | undefined;
  let dataChunk: Buffer | undefined;

  while (offset + 8 <= buffer.length) {
    const chunkId = buffer.subarray(offset, offset + 4).toString('ascii');
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;
    const chunkEnd = chunkStart + chunkSize;

    if (chunkEnd > buffer.length) {
      throw new Error(`${filePath} 的 ${chunkId} chunk 已截斷。`);
    }

    if (chunkId === 'fmt ') {
      formatChunk = buffer.subarray(chunkStart, chunkEnd);
    } else if (chunkId === 'data') {
      dataChunk = buffer.subarray(chunkStart, chunkEnd);
    }

    offset = chunkEnd + (chunkSize % 2);
  }

  if (!formatChunk || formatChunk.length < 16 || !dataChunk) {
    throw new Error(`${filePath} 缺少完整的 fmt 或 data chunk。`);
  }

  const audioFormat = formatChunk.readUInt16LE(0);
  const channels = formatChunk.readUInt16LE(2);
  const sampleRate = formatChunk.readUInt32LE(4);
  const bitsPerSample = formatChunk.readUInt16LE(14);
  const bytesPerSample = bitsPerSample / 8;
  const bytesPerSecond = sampleRate * channels * bytesPerSample;

  if (
    audioFormat !== 1 ||
    channels < 1 ||
    sampleRate < 1 ||
    bitsPerSample !== 16 ||
    dataChunk.length % bytesPerSample !== 0
  ) {
    throw new Error(`${filePath} 不是可檢查的 16-bit PCM WAV。`);
  }

  let peakAmplitude = 0;
  let firstAudibleSample = dataChunk.length / bytesPerSample;
  const audibleThreshold = 327;

  for (let index = 0; index < dataChunk.length; index += bytesPerSample) {
    const amplitude = Math.abs(dataChunk.readInt16LE(index));
    peakAmplitude = Math.max(peakAmplitude, amplitude);

    if (
      firstAudibleSample === dataChunk.length / bytesPerSample &&
      amplitude >= audibleThreshold
    ) {
      firstAudibleSample = index / bytesPerSample;
    }
  }

  return {
    audioFormat,
    bitsPerSample,
    channels,
    durationSeconds: dataChunk.length / bytesPerSecond,
    leadingSilenceSeconds: firstAudibleSample / channels / sampleRate,
    peakAmplitude,
    sampleRate,
  };
}

describe('已建立課程的音訊資產完整性', () => {
  it('每課的三個單字與三個句子都有可用 WAV', () => {
    const readyAssets = getAllCourses().flatMap((course) => [
      ...course.words.map((word) => word.audio),
      ...course.sentences.map((sentence) => sentence.audio),
    ]);

    const expectedAssetCount = getAllCourses().length * 6;

    expect(readyAssets).toHaveLength(expectedAssetCount);
    expect(new Set(readyAssets.map((asset) => asset.id)).size).toBe(
      expectedAssetCount,
    );

    for (const asset of readyAssets) {
      expect(asset.status).toBe('ready');
      expect(asset.src).toMatch(/^\/assets\/audio\/courses\/[a-z]\/.+\.wav$/);

      const filePath = resolve('public', asset.src.slice(1));
      expect(existsSync(filePath), `${asset.id} 缺少 ${filePath}`).toBe(true);

      const metrics = readPcmWavMetrics(filePath);

      expect(metrics.audioFormat, `${asset.id} 必須使用 PCM`).toBe(1);
      expect(metrics.channels, `${asset.id} 應為單聲道`).toBe(1);
      expect(metrics.sampleRate, `${asset.id} 取樣率過低`).toBeGreaterThanOrEqual(
        16_000,
      );
      expect(metrics.bitsPerSample, `${asset.id} 應為 16-bit`).toBe(16);
      expect(metrics.durationSeconds, `${asset.id} 音訊過短`).toBeGreaterThanOrEqual(
        0.4,
      );
      expect(metrics.durationSeconds, `${asset.id} 音訊過長`).toBeLessThanOrEqual(8);
      expect(metrics.peakAmplitude, `${asset.id} 疑似為空白音訊`).toBeGreaterThan(500);
    }
  });

  it('每個已建立課程都使用可播放的獨立字母音', () => {
    const courses = getAllCourses();
    const getLetterAudio = (course: (typeof courses)[number]) => {
      const letterSoundActivities = course.activities.filter(
        (activity) =>
          activity.type === 'record-and-playback' ||
          activity.type === 'listen-and-choose',
      );
      return letterSoundActivities
        .flatMap((activity) => {
          if (activity.type === 'record-and-playback') {
            return [activity.modelAudio];
          }

          return [activity.promptAudio];
        })
        .find((asset) => asset.kind === 'letter');
    };

    for (const course of courses) {
      const letterAudio = getLetterAudio(course);
      const letter = course.letter.lowercase;

      expect(letterAudio?.status).toBe('ready');
      expect(letterAudio?.src).toBe(
        `/assets/audio/courses/${letter}/letter-sound.wav`,
      );
      expect(letterAudio?.transcript).toBe(
        course.letter.primarySound.phoneticHint,
      );

      const filePath = resolve('public', letterAudio!.src.slice(1));
      expect(existsSync(filePath)).toBe(true);

      const metrics = readPcmWavMetrics(filePath);
      expect(metrics.audioFormat).toBe(1);
      expect(metrics.channels).toBe(1);
      expect(metrics.sampleRate).toBe(22_050);
      expect(metrics.bitsPerSample).toBe(16);
      expect(metrics.durationSeconds).toBeGreaterThanOrEqual(0.4);
      expect(metrics.durationSeconds).toBeLessThanOrEqual(3);
      expect(
        metrics.leadingSilenceSeconds,
        `${letterAudio!.id} 開頭靜音過長`,
      ).toBeLessThanOrEqual(0.5);
      expect(metrics.peakAmplitude).toBeGreaterThan(500);
    }
  });
});

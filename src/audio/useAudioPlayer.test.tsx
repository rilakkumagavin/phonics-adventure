import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { AudioAssetRef } from '../types/asset';
import { useAudioPlayer } from './useAudioPlayer';

class MockAudioElement {
  currentTime = 0;
  onended: (() => void) | null = null;
  onerror: (() => void) | null = null;
  playbackRate = 1;
  pause = vi.fn();
  play = vi.fn(() => playImplementation?.() ?? Promise.resolve());

  constructor(public src: string) {}
}

const readyAudio: AudioAssetRef = {
  id: 'a-apple-audio',
  src: '/assets/audio/courses/a/apple.mp3',
  kind: 'word',
  transcript: 'apple',
  status: 'ready',
  playbackRateOptions: [1, 0.75],
};

const placeholderAudio: AudioAssetRef = {
  ...readyAudio,
  id: 'a-ant-audio',
  transcript: 'ant',
  status: 'placeholder',
};

let createdAudio: MockAudioElement[];
let playImplementation: (() => Promise<void>) | undefined;

function mockAudioConstructor() {
  createdAudio = [];

  vi.stubGlobal(
    'Audio',
    vi.fn((src: string) => {
      const audio = new MockAudioElement(src);
      createdAudio.push(audio);
      return audio;
    }),
  );
}

describe('useAudioPlayer', () => {
  beforeEach(() => {
    playImplementation = undefined;
    mockAudioConstructor();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('placeholder 音訊不建立 Audio 並回傳待補訊息', async () => {
    const { result } = renderHook(() => useAudioPlayer());

    const playback = await act(() =>
      result.current.playAudio(placeholderAudio, { label: 'ant' }),
    );

    expect(playback).toEqual({
      played: false,
      message: 'ant 的正式音訊將在後續階段加入。',
      status: 'unavailable',
    });
    expect(globalThis.Audio).not.toHaveBeenCalled();
    expect(result.current.state.status).toBe('idle');
  });

  it('ready 音訊會建立 Audio、播放並更新播放狀態', async () => {
    const { result } = renderHook(() => useAudioPlayer());

    const playback = await act(() =>
      result.current.playAudio(readyAudio, { label: 'apple' }),
    );

    expect(playback).toEqual({
      played: true,
      message: '正在播放 apple。',
      status: 'playing',
    });
    expect(createdAudio).toHaveLength(1);
    expect(createdAudio[0].src).toBe('/assets/audio/courses/a/apple.mp3');
    expect(createdAudio[0].playbackRate).toBe(1);
    expect(createdAudio[0].play).toHaveBeenCalledTimes(1);
    expect(result.current.state).toMatchObject({
      status: 'playing',
      activeAudioId: 'a-apple-audio',
      playbackRate: 1,
    });
  });

  it('支援慢速播放', async () => {
    const { result } = renderHook(() => useAudioPlayer());

    const playback = await act(() =>
      result.current.playAudio(readyAudio, {
        label: 'apple',
        playbackRate: 0.75,
      }),
    );

    expect(playback.message).toBe('正在慢速播放 apple。');
    expect(createdAudio[0].playbackRate).toBe(0.75);
    expect(result.current.state.playbackRate).toBe(0.75);
  });

  it('播放下一段音訊時會停止上一段，避免重疊', async () => {
    const { result } = renderHook(() => useAudioPlayer());
    const nextAudio: AudioAssetRef = {
      ...readyAudio,
      id: 'a-ant-audio',
      src: '/assets/audio/courses/a/ant.mp3',
      transcript: 'ant',
    };

    await act(() => result.current.playAudio(readyAudio, { label: 'apple' }));
    await act(() => result.current.playAudio(nextAudio, { label: 'ant' }));

    expect(createdAudio).toHaveLength(2);
    expect(createdAudio[0].pause).toHaveBeenCalledTimes(1);
    expect(createdAudio[0].currentTime).toBe(0);
    expect(createdAudio[1].src).toBe('/assets/audio/courses/a/ant.mp3');
    expect(result.current.state.activeAudioId).toBe('a-ant-audio');
  });

  it('播放結束會回到 idle', async () => {
    const { result } = renderHook(() => useAudioPlayer());

    await act(() => result.current.playAudio(readyAudio, { label: 'apple' }));
    act(() => {
      createdAudio[0].onended?.();
    });

    expect(result.current.state.status).toBe('idle');
    expect(result.current.state.activeAudioId).toBeNull();
  });

  it('較早的播放 Promise 晚完成時不會覆蓋目前音訊狀態', async () => {
    const resolvers: Array<() => void> = [];
    playImplementation = () =>
      new Promise<void>((resolve) => {
        resolvers.push(resolve);
      });
    const nextAudio: AudioAssetRef = {
      ...readyAudio,
      id: 'a-ant-audio',
      src: '/assets/audio/courses/a/ant.mp3',
      transcript: 'ant',
    };
    const { result } = renderHook(() => useAudioPlayer());
    let firstPlayback!: ReturnType<typeof result.current.playAudio>;
    let secondPlayback!: ReturnType<typeof result.current.playAudio>;

    act(() => {
      firstPlayback = result.current.playAudio(readyAudio, { label: 'apple' });
      secondPlayback = result.current.playAudio(nextAudio, { label: 'ant' });
    });

    await act(async () => {
      resolvers[1]();
      await secondPlayback;
    });
    await act(async () => {
      resolvers[0]();
      await firstPlayback;
    });

    expect(await firstPlayback).toMatchObject({ status: 'cancelled' });
    expect(result.current.state).toMatchObject({
      status: 'playing',
      activeAudioId: 'a-ant-audio',
    });
  });

  it('離開頁面後播放 Promise 完成不會更新狀態', async () => {
    let resolvePlayback: (() => void) | undefined;
    playImplementation = () =>
      new Promise<void>((resolve) => {
        resolvePlayback = resolve;
      });
    const { result, unmount } = renderHook(() => useAudioPlayer());
    let playback!: ReturnType<typeof result.current.playAudio>;

    act(() => {
      playback = result.current.playAudio(readyAudio);
    });
    unmount();

    await act(async () => {
      resolvePlayback?.();
      await playback;
    });

    expect(await playback).toMatchObject({ status: 'cancelled' });
    expect(createdAudio[0].pause).toHaveBeenCalledTimes(1);
  });
});

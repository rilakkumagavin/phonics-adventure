import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useVoiceRecorder } from './useVoiceRecorder';

class MockMediaRecorder {
  static instances: MockMediaRecorder[] = [];
  static emitsData = true;

  mimeType = 'audio/webm';
  ondataavailable: ((event: BlobEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onstop: (() => void) | null = null;
  state: RecordingState = 'inactive';

  constructor(public stream: MediaStream) {
    MockMediaRecorder.instances.push(this);
  }

  start = vi.fn(() => {
    this.state = 'recording';
  });

  stop = vi.fn(() => {
    this.state = 'inactive';

    if (MockMediaRecorder.emitsData) {
      this.ondataavailable?.({
        data: new Blob(['voice sample'], { type: this.mimeType }),
      } as BlobEvent);
    }

    this.onstop?.();
  });
}

class MockAudioElement {
  onended: (() => void) | null = null;
  pause = vi.fn();
  play = vi.fn(() => Promise.resolve());

  constructor(public src: string) {}
}

const originalMediaDevices = Object.getOwnPropertyDescriptor(navigator, 'mediaDevices');
const originalCreateObjectUrl = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
const originalRevokeObjectUrl = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');

let getUserMedia: ReturnType<typeof vi.fn>;
let stopTrack: ReturnType<typeof vi.fn>;
let createObjectUrl: ReturnType<typeof vi.fn>;
let revokeObjectUrl: ReturnType<typeof vi.fn>;
let createdAudio: MockAudioElement[];

function installMediaDevices() {
  Object.defineProperty(navigator, 'mediaDevices', {
    configurable: true,
    value: { getUserMedia },
  });
}

function restoreProperty(
  target: object,
  property: string,
  descriptor: PropertyDescriptor | undefined,
) {
  if (descriptor) {
    Object.defineProperty(target, property, descriptor);
  } else {
    Reflect.deleteProperty(target, property);
  }
}

describe('useVoiceRecorder', () => {
  beforeEach(() => {
    MockMediaRecorder.instances = [];
    MockMediaRecorder.emitsData = true;
    stopTrack = vi.fn();
    getUserMedia = vi.fn().mockResolvedValue({
      getTracks: () => [{ stop: stopTrack }],
    } as unknown as MediaStream);
    createObjectUrl = vi.fn(() => 'blob:voice-recording');
    revokeObjectUrl = vi.fn();
    createdAudio = [];

    installMediaDevices();
    vi.stubGlobal('MediaRecorder', MockMediaRecorder);
    vi.stubGlobal(
      'Audio',
      vi.fn((src: string) => {
        const audio = new MockAudioElement(src);
        createdAudio.push(audio);
        return audio;
      }),
    );
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectUrl,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectUrl,
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    restoreProperty(navigator, 'mediaDevices', originalMediaDevices);
    restoreProperty(URL, 'createObjectURL', originalCreateObjectUrl);
    restoreProperty(URL, 'revokeObjectURL', originalRevokeObjectUrl);
  });

  it('瀏覽器不支援 MediaRecorder 時回報不支援', async () => {
    vi.stubGlobal('MediaRecorder', undefined);
    const { result } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());

    expect(result.current.isSupported).toBe(false);
    expect(result.current.state).toEqual({
      status: 'unsupported',
      audioUrl: null,
      errorMessage: '這台裝置目前不能在瀏覽器中錄音。',
    });
    expect(getUserMedia).not.toHaveBeenCalled();
  });

  it('麥克風權限被拒絕時保留其他學習功能可用的提示', async () => {
    getUserMedia.mockRejectedValue(
      new DOMException('Permission denied', 'NotAllowedError'),
    );
    const { result } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());

    expect(result.current.state).toEqual({
      status: 'permission-denied',
      audioUrl: null,
      errorMessage: '麥克風沒有開啟，還是可以先聽原音練習。',
    });
    expect(MockMediaRecorder.instances).toHaveLength(0);
  });

  it('MediaRecorder 建構失敗時會關閉已取得的麥克風', async () => {
    vi.stubGlobal(
      'MediaRecorder',
      class {
        constructor() {
          throw new DOMException('Unsupported recording format', 'NotSupportedError');
        }
      },
    );
    const { result } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());

    expect(stopTrack).toHaveBeenCalledTimes(1);
    expect(createObjectUrl).not.toHaveBeenCalled();
    expect(result.current.state).toEqual({
      status: 'error',
      audioUrl: null,
      errorMessage: '錄音暫時不能使用，請稍後再試。',
    });
  });

  it('停止錄音後建立記憶體 Blob URL 並關閉麥克風', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());
    expect(result.current.state.status).toBe('recording');
    expect(MockMediaRecorder.instances[0].start).toHaveBeenCalledTimes(1);

    act(() => result.current.stopRecording());

    expect(stopTrack).toHaveBeenCalledTimes(1);
    expect(createObjectUrl).toHaveBeenCalledTimes(1);
    const recordedBlob = createObjectUrl.mock.calls[0][0] as Blob;
    expect(recordedBlob.type).toBe('audio/webm');
    expect(recordedBlob.size).toBeGreaterThan(0);
    expect(result.current.state).toEqual({
      status: 'recorded',
      audioUrl: 'blob:voice-recording',
      errorMessage: null,
    });
  });

  it('停止錄音但沒有音訊資料時不會建立空白回放', async () => {
    MockMediaRecorder.emitsData = false;
    const { result } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());
    act(() => result.current.stopRecording());

    expect(stopTrack).toHaveBeenCalledTimes(1);
    expect(createObjectUrl).not.toHaveBeenCalled();
    expect(result.current.state).toEqual({
      status: 'error',
      audioUrl: null,
      errorMessage: '錄音暫時不能使用，請稍後再試。',
    });
  });

  it('可回放錄音，播放結束後回到已錄製狀態', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());
    act(() => result.current.stopRecording());
    await act(() => result.current.playRecording());

    expect(createdAudio).toHaveLength(1);
    expect(createdAudio[0].src).toBe('blob:voice-recording');
    expect(createdAudio[0].play).toHaveBeenCalledTimes(1);
    expect(result.current.state.status).toBe('playing');

    act(() => createdAudio[0].onended?.());
    expect(result.current.state.status).toBe('recorded');
  });

  it('重新錄音會停止回放並撤銷舊 Blob URL', async () => {
    const { result } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());
    act(() => result.current.stopRecording());
    await act(() => result.current.playRecording());
    act(() => result.current.resetRecording());

    expect(createdAudio[0].pause).toHaveBeenCalledTimes(1);
    expect(revokeObjectUrl).toHaveBeenCalledWith('blob:voice-recording');
    expect(result.current.state).toEqual({
      status: 'idle',
      audioUrl: null,
      errorMessage: null,
    });
  });

  it('離開頁面時停止錄音、關閉麥克風並清除暫存 URL', async () => {
    const { result, unmount } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());
    unmount();

    expect(MockMediaRecorder.instances[0].stop).toHaveBeenCalledTimes(1);
    expect(stopTrack).toHaveBeenCalledTimes(1);
    expect(createObjectUrl).not.toHaveBeenCalled();
    expect(revokeObjectUrl).not.toHaveBeenCalled();
  });

  it('已完成錄音後離開頁面會撤銷暫存 URL', async () => {
    const { result, unmount } = renderHook(() => useVoiceRecorder());

    await act(() => result.current.startRecording());
    act(() => result.current.stopRecording());
    unmount();

    expect(revokeObjectUrl).toHaveBeenCalledWith('blob:voice-recording');
  });

  it('等待麥克風權限時離開頁面不會在稍後啟動錄音', async () => {
    let resolveStream: ((stream: MediaStream) => void) | undefined;
    const pendingStream = new Promise<MediaStream>((resolve) => {
      resolveStream = resolve;
    });
    getUserMedia.mockReturnValue(pendingStream);
    const { result, unmount } = renderHook(() => useVoiceRecorder());

    let startPromise: Promise<void>;
    act(() => {
      startPromise = result.current.startRecording();
    });
    unmount();

    await act(async () => {
      resolveStream?.({
        getTracks: () => [{ stop: stopTrack }],
      } as unknown as MediaStream);
      await startPromise;
    });

    expect(stopTrack).toHaveBeenCalledTimes(1);
    expect(MockMediaRecorder.instances).toHaveLength(0);
  });
});

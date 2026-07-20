import { useCallback, useEffect, useRef, useState } from 'react';

export type VoiceRecorderStatus =
  | 'idle'
  | 'requesting'
  | 'recording'
  | 'recorded'
  | 'playing'
  | 'unsupported'
  | 'permission-denied'
  | 'error';

export interface VoiceRecorderState {
  status: VoiceRecorderStatus;
  audioUrl: string | null;
  errorMessage: string | null;
}

const unsupportedMessage = '這台裝置目前不能在瀏覽器中錄音。';
const permissionDeniedMessage = '麥克風沒有開啟，還是可以先聽原音練習。';
const recordingErrorMessage = '錄音暫時不能使用，請稍後再試。';

function getMediaDevices() {
  return typeof navigator === 'undefined' ? undefined : navigator.mediaDevices;
}

function isRecorderSupported() {
  return Boolean(getMediaDevices()?.getUserMedia && globalThis.MediaRecorder);
}

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

function isPermissionError(error: unknown) {
  return (
    error instanceof DOMException &&
    (error.name === 'NotAllowedError' || error.name === 'SecurityError')
  );
}

export function useVoiceRecorder() {
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const [state, setState] = useState<VoiceRecorderState>({
    status: 'idle',
    audioUrl: null,
    errorMessage: null,
  });

  const clearPlayback = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, []);

  const clearAudioUrl = useCallback(() => {
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }, []);

  const resetRecording = useCallback(() => {
    clearPlayback();
    clearAudioUrl();
    chunksRef.current = [];
    setState({
      status: 'idle',
      audioUrl: null,
      errorMessage: null,
    });
  }, [clearAudioUrl, clearPlayback]);

  const stopRecording = useCallback(() => {
    const recorder = mediaRecorderRef.current;

    if (recorder?.state === 'recording') {
      recorder.stop();
    }
  }, []);

  const startRecording = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    clearPlayback();
    clearAudioUrl();
    chunksRef.current = [];

    if (!isRecorderSupported()) {
      setState({
        status: 'unsupported',
        audioUrl: null,
        errorMessage: unsupportedMessage,
      });
      return;
    }

    setState({
      status: 'requesting',
      audioUrl: null,
      errorMessage: null,
    });

    try {
      const stream = await getMediaDevices()!.getUserMedia({ audio: true });

      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        stopStream(stream);
        return;
      }

      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        stopStream(streamRef.current);
        streamRef.current = null;
        mediaRecorderRef.current = null;

        if (isMountedRef.current) {
          setState({
            status: 'error',
            audioUrl: null,
            errorMessage: recordingErrorMessage,
          });
        }
      };

      recorder.onstop = () => {
        stopStream(stream);

        if (streamRef.current === stream) {
          streamRef.current = null;
        }

        if (mediaRecorderRef.current === recorder) {
          mediaRecorderRef.current = null;
        }

        if (!isMountedRef.current) {
          return;
        }

        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        });

        if (blob.size === 0) {
          setState({
            status: 'error',
            audioUrl: null,
            errorMessage: recordingErrorMessage,
          });
          return;
        }

        const audioUrl = URL.createObjectURL(blob);

        audioUrlRef.current = audioUrl;
        setState({
          status: 'recorded',
          audioUrl,
          errorMessage: null,
        });
      };

      recorder.start();
      setState({
        status: 'recording',
        audioUrl: null,
        errorMessage: null,
      });
    } catch (error) {
      if (!isMountedRef.current || requestId !== requestIdRef.current) {
        return;
      }

      stopStream(streamRef.current);
      streamRef.current = null;
      mediaRecorderRef.current = null;

      setState({
        status: isPermissionError(error) ? 'permission-denied' : 'error',
        audioUrl: null,
        errorMessage: isPermissionError(error)
          ? permissionDeniedMessage
          : recordingErrorMessage,
      });
    }
  }, [clearAudioUrl, clearPlayback]);

  const playRecording = useCallback(async () => {
    if (!audioUrlRef.current) {
      return;
    }

    clearPlayback();

    const audio = new Audio(audioUrlRef.current);
    audioRef.current = audio;
    audio.onended = () => {
      if (audioRef.current === audio) {
        setState((current) => ({
          ...current,
          status: 'recorded',
        }));
      }
    };

    try {
      await audio.play();
      setState((current) => ({
        ...current,
        status: 'playing',
        errorMessage: null,
      }));
    } catch {
      setState((current) => ({
        ...current,
        status: 'error',
        errorMessage: recordingErrorMessage,
      }));
    }
  }, [clearPlayback]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      requestIdRef.current += 1;

      const recorder = mediaRecorderRef.current;

      if (recorder) {
        recorder.ondataavailable = null;
        recorder.onerror = null;
        recorder.onstop = null;

        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }

      stopStream(streamRef.current);
      streamRef.current = null;
      mediaRecorderRef.current = null;
      clearPlayback();
      clearAudioUrl();
    };
  }, [clearAudioUrl, clearPlayback]);

  return {
    isSupported: isRecorderSupported(),
    playRecording,
    resetRecording,
    startRecording,
    state,
    stopRecording,
  };
}

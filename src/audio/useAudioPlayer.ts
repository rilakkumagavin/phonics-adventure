import { useCallback, useEffect, useRef, useState } from 'react';

import type { AudioAssetRef } from '../types/asset';

export type AudioPlaybackStatus = 'idle' | 'loading' | 'playing' | 'error';

export interface AudioPlaybackState {
  status: AudioPlaybackStatus;
  activeAudioId: string | null;
  errorMessage: string | null;
  playbackRate: number;
}

export interface AudioPlaybackResult {
  played: boolean;
  message: string;
  status: AudioPlaybackStatus | 'cancelled' | 'unavailable';
}

export interface PlayAudioOptions {
  label?: string;
  playbackRate?: number;
}

const defaultPlaybackRate = 1;

function getAudioLabel(asset: AudioAssetRef, label?: string) {
  return label ?? asset.transcript;
}

export function getAudioUnavailableMessage(label: string) {
  return `${label} 的正式音訊將在後續階段加入。`;
}

export function getAudioPlayingMessage(label: string, playbackRate: number) {
  return playbackRate < defaultPlaybackRate
    ? `正在慢速播放 ${label}。`
    : `正在播放 ${label}。`;
}

export function getAudioErrorMessage(label: string) {
  return `${label} 音訊目前無法播放，請稍後再試。`;
}

export function useAudioPlayer() {
  const isMountedRef = useRef(true);
  const playbackIdRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlaybackState>({
    status: 'idle',
    activeAudioId: null,
    errorMessage: null,
    playbackRate: defaultPlaybackRate,
  });

  const stopAudio = useCallback(() => {
    playbackIdRef.current += 1;

    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    setState((current) => ({
      ...current,
      status: 'idle',
      activeAudioId: null,
      errorMessage: null,
    }));
  }, []);

  const playAudio = useCallback(
    async (asset: AudioAssetRef, options: PlayAudioOptions = {}) => {
      const playbackId = ++playbackIdRef.current;
      const label = getAudioLabel(asset, options.label);
      const playbackRate = options.playbackRate ?? defaultPlaybackRate;

      if (asset.status !== 'ready') {
        return {
          played: false,
          message: getAudioUnavailableMessage(label),
          status: 'unavailable',
        } satisfies AudioPlaybackResult;
      }

      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(asset.src);
      audioRef.current = audio;
      audio.playbackRate = playbackRate;

      audio.onended = () => {
        if (isMountedRef.current && audioRef.current === audio) {
          setState({
            status: 'idle',
            activeAudioId: null,
            errorMessage: null,
            playbackRate,
          });
        }
      };

      audio.onerror = () => {
        if (isMountedRef.current && audioRef.current === audio) {
          setState({
            status: 'error',
            activeAudioId: asset.id,
            errorMessage: getAudioErrorMessage(label),
            playbackRate,
          });
        }
      };

      setState({
        status: 'loading',
        activeAudioId: asset.id,
        errorMessage: null,
        playbackRate,
      });

      try {
        await audio.play();

        if (
          !isMountedRef.current ||
          playbackId !== playbackIdRef.current ||
          audioRef.current !== audio
        ) {
          return {
            played: false,
            message: '',
            status: 'cancelled',
          } satisfies AudioPlaybackResult;
        }

        setState({
          status: 'playing',
          activeAudioId: asset.id,
          errorMessage: null,
          playbackRate,
        });

        return {
          played: true,
          message: getAudioPlayingMessage(label, playbackRate),
          status: 'playing',
        } satisfies AudioPlaybackResult;
      } catch {
        if (
          !isMountedRef.current ||
          playbackId !== playbackIdRef.current ||
          audioRef.current !== audio
        ) {
          return {
            played: false,
            message: '',
            status: 'cancelled',
          } satisfies AudioPlaybackResult;
        }

        const message = getAudioErrorMessage(label);

        if (audioRef.current === audio) {
          setState({
            status: 'error',
            activeAudioId: asset.id,
            errorMessage: message,
            playbackRate,
          });
        }

        return {
          played: false,
          message,
          status: 'error',
        } satisfies AudioPlaybackResult;
      }
    },
    [],
  );

  const replayAudio = useCallback(
    (asset: AudioAssetRef, options: PlayAudioOptions = {}) => playAudio(asset, options),
    [playAudio],
  );

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      playbackIdRef.current += 1;

      if (audioRef.current) {
        audioRef.current.onended = null;
        audioRef.current.onerror = null;
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return {
    playAudio,
    replayAudio,
    stopAudio,
    state,
  };
}

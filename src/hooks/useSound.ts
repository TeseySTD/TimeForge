import { SoundContext } from "@/contexts/SoundContext";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

type ReturnType = {
  play: (
    volume?: number,
    loop?: boolean,
    playbackRate?: number,
    onEnded?: () => void
  ) => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  setGlobalVolume: (volume: number) => void;
  isPlaying: () => boolean;
  isLoading: boolean;
  isLoaded: boolean;
};


/**
 * A hook that provides access sound actions. 
 * Each hook give interface to each sound separately, not by path.
 *
 * The play function plays a sound with the given volume, loop, playbackRate, and onEnded callback.
 * 
 * The stop function stops the currently playing sound.
 * 
 * The setVolume function sets the volume of the currently playing sound.
 * 
 * The setGlobalVolume function sets the global volume of all sounds.
 * 
 * The isPlaying function returns whether a sound is currently playing.
 * 
 * The isLoading function returns whether a sound is currently being loaded.
 * 
 * The isLoaded function returns whether a sound is already loaded.
 *
 * @param soundPath The path of the sound to be played.
 * @returns An object containing the play, stop, setVolume, setGlobalVolume, isPlaying, isLoading, and isLoaded functions.
 * @example
 * const {play, stop, setVolume, setGlobalVolume, isPlaying, isLoading, isLoaded} = useSound('/path/to/sound.wav');
 * play(1, false, 1, () => console.log('Sound has finished playing'));
 * stop();
 * setVolume(0.5);
 * setGlobalVolume(0.5);
 * console.log(isPlaying()); //Returns whether a sound is currently playing
 * console.log(isLoading()); //Returns whether a sound is currently being loaded
 * console.log(isLoaded()); //Returns whether a sound is already loaded
 */
export default function useSound(soundPath: string): ReturnType {
  const context = useContext(SoundContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentInstanceRef = useRef<string | null>(null);

  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }

  const {
    audioContextRef,
    masterGainRef,
    soundsRef,
    instancesRef,
    setGlobalVolume,
    initializeAudio,
    isInitialized
  } = context;

  const loadSound = useCallback(async () => {
    if (!soundPath) return;

    if (soundsRef.current.has(soundPath)) {
      setIsLoaded(true);
      console.debug(`Sound ${soundPath} is already loaded`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(soundPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch sound: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current!.decodeAudioData(arrayBuffer);

      soundsRef.current.set(soundPath, {
        buffer: audioBuffer,
      });

      setIsLoaded(true);
    } catch (err) {
      console.error(`Failed to load sound ${soundPath}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [soundPath, audioContextRef, soundsRef, initializeAudio]);

  useEffect(() => {
    console.debug("Try to load sound ", soundPath);
    if (isInitialized) {
      console.debug("Loading sound... ", soundPath);
      loadSound();
    }
  }, [loadSound, isInitialized]);

  const play = useCallback(
    (volume: number = 1, loop: boolean = false, playbackRate: number = 1, onEnded?: () => void) => {
      const soundData = soundsRef.current.get(soundPath);
      if (!soundData) {
        console.error('Sound not loaded:', soundPath);
        return;
      }

      try {
        if (currentInstanceRef.current) {
          stop();
        }

        const source = audioContextRef.current!.createBufferSource();
        const gainNode = audioContextRef.current!.createGain();

        source.buffer = soundData.buffer;
        source.loop = loop;
        source.playbackRate.value = playbackRate;

        gainNode.gain.value = volume;

        source.connect(gainNode);
        gainNode.connect(masterGainRef.current!);

        const instanceId = `${soundPath}_${Date.now()}_${Math.random()}`;
        currentInstanceRef.current = instanceId;

        const instance = { source, gainNode, path: soundPath };
        instancesRef.current.set(instanceId, instance);

        const handleEnded = () => {
          instancesRef.current.delete(instanceId);
          if (currentInstanceRef.current === instanceId) {
            currentInstanceRef.current = null;
          }
          if (onEnded) onEnded();
        };

        source.onended = handleEnded;

        source.start();

      } catch (err) {
        console.error('Failed to play sound:', err);
      }
    }, [soundPath, isLoaded, audioContextRef, masterGainRef, soundsRef, instancesRef, loadSound, initializeAudio]);

  const stop = useCallback(() => {
    if (currentInstanceRef.current) {
      const instance = instancesRef.current.get(currentInstanceRef.current);
      if (instance && instance.source) {
        try {
          instance.source.stop();
        } catch (e) {
          //Sound already stopped
        }
      }

      //Clearing is handled in handleEnded
    }
  }, [instancesRef]);

  const setVolume = useCallback((volume: number) => {
    if (currentInstanceRef.current) {
      const instance = instancesRef.current.get(currentInstanceRef.current);
      if (instance && instance.gainNode) {
        instance.gainNode.gain.value = volume;
      }
    }
  }, [instancesRef]);

  const isPlaying = useCallback(() => {
    return currentInstanceRef.current !== null && instancesRef.current.has(currentInstanceRef.current);
  }, [instancesRef]);

  return {
    play,
    stop,
    setVolume,
    setGlobalVolume,
    isPlaying,
    isLoading,
    isLoaded,
  };
};
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { SoundContext, type PlayingInstance, type SoundInstance } from "./SoundContext";

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalVolume, setGlobalVolume] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const soundsRef = useRef<Map<string, SoundInstance>>(new Map());
  const instancesRef = useRef<Map<string, PlayingInstance>>(new Map());

  const initializeAudio = useCallback(async () => {
    console.debug('initialize audio');
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext)();
        masterGainRef.current = audioContextRef.current.createGain();
        masterGainRef.current.connect(audioContextRef.current.destination);
        masterGainRef.current.gain.value = globalVolume;
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize AudioContext:', error);
      }
    }
  }, [globalVolume]);
  const handleUserGesture = async () => {
    if (audioContextRef.current?.state === "suspended") {
      console.debug("AudioContext is suspended, resuming...");
      await audioContextRef.current.resume();
      console.debug("AudioContext resumed after user gesture");
    }
  };

  useEffect(() => {
    initializeAudio();
    window.addEventListener("click", handleUserGesture);
    window.addEventListener("keydown", handleUserGesture);
    window.addEventListener("touchstart", handleUserGesture);

    return () => {
      window.removeEventListener("click", handleUserGesture);
      window.removeEventListener("keydown", handleUserGesture);
      window.removeEventListener("touchstart", handleUserGesture);
    };
  }, [])

  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = globalVolume;
    }
  }, [globalVolume]);

  const value = {
    audioContextRef,
    masterGainRef,
    soundsRef,
    instancesRef,
    globalVolume,
    setGlobalVolume,
    isInitialized,
    initializeAudio
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};
import { createContext } from 'react'; 
export type SoundInstance = {
    buffer: AudioBuffer;
}

export type PlayingInstance = {
    source: AudioBufferSourceNode;
    gainNode: GainNode;
    path: string;
}
interface SoundContextType {
    audioContextRef: React.RefObject<AudioContext | null>;
    masterGainRef: React.RefObject<GainNode | null>;
    soundsRef: React.RefObject<Map<string, SoundInstance>>;
    instancesRef: React.RefObject<Map<string, PlayingInstance>>;
    globalVolume: number;
    setGlobalVolume: React.Dispatch<React.SetStateAction<number>>;
    isInitialized: boolean;
    initializeAudio: () => Promise<void>;

}
export const SoundContext = createContext<SoundContextType>({
    audioContextRef: { current: null },
    masterGainRef: { current: null },
    soundsRef: { current: new Map() },
    instancesRef: { current: new Map() },
    globalVolume: 1,
    setGlobalVolume: () => { },
    isInitialized: false,
    initializeAudio: async () => { },
});

import type Timer from "@/types/timer";
import type TimersSet from "@/types/timersSet";
import { createContext } from "react";

interface TimersContextValue {
    activeTimers: Map<number, Timer>;
    setActiveTimers: (timers: Map<number, Timer>) => void;
    loadTimersSets: () => TimersSet[];
}

export const TimersContext = createContext<TimersContextValue>({
    activeTimers: new Map(),
    setActiveTimers: () => { },
    loadTimersSets: () => []
});
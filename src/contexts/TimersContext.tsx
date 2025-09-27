import type Timer from "@/types/timer";
import type TimersSet from "@/types/timersSet";
import { createContext } from "react";

export type lastSelectedDataType = {
    timersSetId?: number,
    timerId?: number
}

interface TimersContextValue {
    activeTimers: Map<number, Timer>;
    setActiveTimers: (timers: Map<number, Timer>) => void;
    lastSelected: lastSelectedDataType;
    setLastSelected: (data: lastSelectedDataType) => void;
    loadTimersSets: () => TimersSet[];
}

export const TimersContext = createContext<TimersContextValue>({
    activeTimers: new Map(),
    setActiveTimers: () => { },
    lastSelected: {},
    setLastSelected: () => { },
    loadTimersSets: () => []
});
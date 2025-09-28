import Timer from "@/types/timer";
import TimersSet from "@/types/timersSet";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import { TimersContext, type lastSelectedDataType } from "./TimersContext";
import { getAllTimersSets, saveTimersSet } from "@/utils/storageUtils";

const defaultData = [
    new TimersSet('Default Timers', [
        new Timer('5 min', 60 * 5),
        new Timer('10 min', 60 * 10),
        new Timer('15 min', 60 * 15),
        new Timer('20 min', 60 * 20)
    ]),
    new TimersSet('Pomodoro', [
        new Timer('Pomodoro', 25 * 60),
        new Timer('Short break', 5 * 60),
        new Timer('Long break', 15 * 60)
    ])
]

const testData = new Array(7).fill(null).map((_, index) =>
    new TimersSet(`Set ${index + 1}`, index % 2 == 0 ?
        [
            new Timer(`Timer 1, Set ${index + 1}`, 125),
            new Timer(`Timer 2, Set ${index + 1}`, 6),
            new Timer(`Timer 3, Set ${index + 1}`, 2 * 60 * 60 + 2)
        ] :
        [
            new Timer(`Timer 1, Set ${index + 1}`, 6),
            new Timer(`Timer 2, Set ${index + 1}`, 125),
            new Timer(`Timer 3, Set ${index + 1}`, 2 * 60 * 60 + 2),
            new Timer(`Timer 4, Set ${index + 1}`, 2 * 60 * 60 + 2),
            new Timer(`Timer 5, Set ${index + 1}`, 2 * 60 * 60 + 2),
            new Timer(`Timer 6, Set ${index + 1}`, 2 * 60 * 60 + 2)
        ],
    )
);


export const TimersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoadedFromStorage, setIsLoadedFromStorage] = useState(false);
    const [activeTimers, setActiveTimers] = useState<Map<number, Timer>>(new Map());
    const [lastSelected, setLastSelected] = useState<lastSelectedDataType>({});

    const loadTimersSets = useCallback(() => {
        let storageData = getAllTimersSets();
        if (isLoadedFromStorage)
            return storageData;

        if (storageData.length == 0) {
            storageData = defaultData;

            storageData.forEach(s => saveTimersSet(s));
        }
        setIsLoadedFromStorage(true);
        return storageData;
    }, [isLoadedFromStorage]);

    const value = useMemo(() => ({
        activeTimers,
        setActiveTimers,
        lastSelected,
        setLastSelected,
        loadTimersSets
    }), [activeTimers, lastSelected, loadTimersSets]);

    return <TimersContext.Provider value={value}>{children}</TimersContext.Provider>;
}
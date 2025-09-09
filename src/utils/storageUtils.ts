import TimersSet from "@/types/timersSet";
import { deserializeTimersSets, serializeTimersSets } from "./serializeUtils";

const TIMERS_SETS_ARRAY_KEY = 'timersSets';

export function saveTimersSet(timersSet: TimersSet): void {

    const currentArray = deserializeTimersSets(localStorage.getItem(TIMERS_SETS_ARRAY_KEY) || '[]');
    if (currentArray.find(t => t.id === timersSet.id))
        currentArray[currentArray.findIndex(t => t.id === timersSet.id)] = timersSet;
    else
        currentArray.push(timersSet);
    localStorage.setItem(TIMERS_SETS_ARRAY_KEY, JSON.stringify(serializeTimersSets(currentArray)));
}

export function getTimersSet(id: number): TimersSet | null {
    const timersSetsData = localStorage.getItem(TIMERS_SETS_ARRAY_KEY);
    if (timersSetsData) {
        const timersSets = deserializeTimersSets(timersSetsData);
        return timersSets.find(timersSet => timersSet.id === id) || null;
    }
    return null;
}

export function getAllTimersSets(): TimersSet[] {
    const timersSets = [];
    const timersSetsData = localStorage.getItem(TIMERS_SETS_ARRAY_KEY);

    if (timersSetsData) {
        timersSets.push(...deserializeTimersSets(timersSetsData));
    }
    return timersSets;
}

export function deleteTimersSet(id: number): void {
    const timersSetsData = localStorage.getItem(TIMERS_SETS_ARRAY_KEY);
    if (timersSetsData) {
        const timersSets = deserializeTimersSets(timersSetsData)
            .filter(timersSet => timersSet.id !== id);
        const timersSetsToSave = serializeTimersSets(timersSets);

        localStorage.setItem(TIMERS_SETS_ARRAY_KEY, JSON.stringify(timersSetsToSave));
    }
}

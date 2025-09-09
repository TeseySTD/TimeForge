import Timer from "@/types/timer";
import type TimersSet from "@/types/timersSet";

function serializeTimer(timer: Timer): any {
    return {
        id: timer.id,
        name: timer.name,
        timeInSec: timer.timeInSec,
        isActive: timer.isActive,
        isFinished: timer.isFinished,
        endTime: timer['endTime']?.getTime(),
        pausedTimeInMs: timer['pausedTimeInMs']
    };
}

function deserializeTimer(data: any): Timer {
    const timer = new Timer(data.name, data.timeInSec, data.id);

    timer.isActive = data.isActive || false;
    timer.isFinished = data.isFinished || false;

    if (data.endTime) {
        timer['endTime'] = new Date(data.endTime);
    }
    if (data.pausedTimeInMs !== undefined) {
        timer['pausedTimeInMs'] = data.pausedTimeInMs;
    }

    return timer;
}

function serializeTimersSet(timersSet: TimersSet): any {
    return {
        ...timersSet,
        timers: timersSet.timers?.map(timer => serializeTimer(timer))
    };
}

function deserializeTimersSet(data: any): TimersSet {
    return {
        ...data,
        timers: data.timers?.map((timerData: any) => deserializeTimer(timerData))
    };
}

export function serializeTimersSets(timersSets: TimersSet[]): any {
    return timersSets.map(timersSet => serializeTimersSet(timersSet));
}

export function deserializeTimersSets(data: any): TimersSet[] {
    const parsed = typeof data === "string" ? JSON.parse(data) : data;

    return parsed.map((timersSetData: any) => deserializeTimersSet(timersSetData));
}
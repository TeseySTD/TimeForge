import type Timer from "./timer";

class TimersSet{
    static readonly MIN_NAME_LENGTH = 2;
    static readonly MAX_NAME_LENGTH = 30;

    id: number;
    name: string;
    timers: Timer[] = [];

    constructor(name: string, timers: Timer[], id = Math.random()) {
        if(timers.length === 0) throw new EmptyTimersError();
        this.id = id;
        this.name = name;
        this.timers = timers;
    }
}

class EmptyTimersError extends Error {
    constructor(){
        super('TimersSet must have at least one timer');
    }
}


export default TimersSet
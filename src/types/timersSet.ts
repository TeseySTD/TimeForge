import type Timer from "./timer";

class TimersSet{
    id: number;
    name: string;
    timers: Timer[] = [];

    constructor(id: number, name: string, timers: Timer[]){
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
class Timer {
    id : number;
    name: string;
    timeInSec: number;
    isActive: boolean = false;
    isFinished: boolean = false;

    private endTime?: Date;
    private pausedTimeInMs?: number;
    private get pausedTimeInSec() {
        return this.pausedTimeInMs ? Math.ceil(this.pausedTimeInMs / 1000) : undefined;
    }
    private intervalId?: number;

    onTick: (t: Timer) => void = () => { console.debug('tick') };
    onReset: (t: Timer) => void = () => { console.debug('reset') };
    onFinish: () => void = () => { console.debug('finish') };
    onStateChange:(state: boolean) => void = () => { console.debug(`state change to ${this.isActive}')`) };

    constructor(name: string, time: number, id = Math.random()) {
        this.id = id;
        this.name = name;
        this.timeInSec = time;
    }

    get timeLeftInSec() {
        if (!this.endTime)
            return this.pausedTimeInSec ?? this.timeInSec;

        const now = Date.now();
        const endTime = this.endTime.getTime();
        const diffMs = endTime - now;

        const remaining = diffMs > 0 ? Math.ceil(diffMs / 1000) - 1 : 0; // -1 to account for the current second

        return remaining;
    }

    get timeLeftInMs() {
        if (!this.endTime)
            return this.pausedTimeInMs ?? this.timeInSec * 1000;

        const now = Date.now();
        const endTime = this.endTime.getTime();
        const diffMs = endTime - now;

        return diffMs;
    }

    get isTimerStopped() {
        return this.timeLeftInSec < 0;
    }

    public startTimer() {
        const timeToUse = this.pausedTimeInMs ?? this.timeInSec * 1000;
        this.endTime = new Date(Date.now() + timeToUse);
        this.isActive = true;
        this.pausedTimeInMs = undefined;

        this.onTick(this); //First tick
        this.onStateChange(this.isActive);
        this.startInterval();
    }

    public pauseTimer() {
        if (!this.isActive)
            return;

        this.isActive = false;
        this.pausedTimeInMs = this.timeLeftInMs;
        this.endTime = undefined;
        this.onStateChange(this.isActive);
        this.clearInterval();
    }

    public stopTimer() {
        this.isActive = false;
        this.onStateChange(this.isActive);
        this.isFinished = true;
        this.endTime = undefined;
        this.pausedTimeInMs = undefined;

        this.clearInterval();
    }

    public resetTimer() {
        this.stopTimer();
        this.isFinished = false;
        this.onReset(this);
    }

    private startInterval() {
        this.clearInterval();

        this.intervalId = window.setInterval(() => {
            console.debug('interval ticks');
            if (!this.isActive)
                return;

            if (this.timeLeftInMs < 0) {
                this.finish();
                return;
            }

            this.onTick(this);
        }, 1000);
    }

    private finish() {
        this.isActive = false;
        this.isFinished = true;
        this.clearInterval();
        this.onStateChange(this.isActive);
        this.onFinish();
    }

    private clearInterval() {
        console.debug('clearing interval');
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
            console.debug('interval cleared');
        }
    }

    public destroy() {
        this.clearInterval();
    }
}

export default Timer;
class Timer {
    name: string;
    timeInSec: number;
    isActive: boolean = false;
    isFinished: boolean = false;

    private endTime?: Date;
    private pausedTimeInSec?: number;
    private intervalId?: number;
    
    private onTick: (t: Timer) => void;
    private onFinish: () => void;

    constructor(name: string, time: number,
        onTick: (t: Timer) => void,
        onFinish: () => void) {
        this.name = name;
        this.timeInSec = time;
        this.onTick = onTick;
        this.onFinish = onFinish;
    }

    get timeLeftInSec(){
        if (!this.endTime) {
            return this.pausedTimeInSec ?? this.timeInSec;
        }

        const remaining = Math.max(0, Math.floor((this.endTime.getTime() - Date.now()) / 1000));

        return remaining;
    }

    get isTimerStopped(){
        return this.timeLeftInSec <= 0;
    }

    public startTimer() {
        const timeToUse = this.pausedTimeInSec ?? this.timeInSec;
        this.endTime = new Date(Date.now() + timeToUse * 1000);
        this.isActive = true;
        this.pausedTimeInSec = undefined;

        this.startInterval();
    }

    public pauseTimer() {
        if (!this.isActive) return;

        this.isActive = false;
        this.pausedTimeInSec = this.timeLeftInSec;
        this.endTime = undefined;
        this.clearInterval();
    }

    public resumeTimer() {
        if (this.isActive || this.isFinished || !this.pausedTimeInSec) return;

        this.startTimer();
    }

    public stopTimer() {
        this.isActive = false;
        this.isFinished = true;
        this.endTime = undefined;
        this.pausedTimeInSec = undefined;
        this.clearInterval();
    }

    public resetTimer() {
        this.stopTimer();
        this.isFinished = false;
        this.pausedTimeInSec = undefined;
    }

    private startInterval() {
        this.clearInterval();

        this.intervalId = window.setInterval(() => {
            if (!this.isActive) {
                this.clearInterval();
                return;
            }

            this.onTick(this);

            if (this.timeLeftInSec <= 0) {
                this.finish();
            }
        }, 1000);
    }

    private finish() {
        this.isActive = false;
        this.isFinished = true;
        this.clearInterval();
        this.onFinish();
    }

    private clearInterval() {
        if (this.intervalId) {
            this.intervalId = undefined;
        }
    }

    public destroy() {
        this.clearInterval();
    }
}

export default Timer;
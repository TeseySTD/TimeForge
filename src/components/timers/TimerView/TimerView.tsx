import { useEffect, useRef, useState } from 'react';
import './TimerView.scss'
import Timer from '@/types/timer';
import { parseSecondsToTimeString } from '@/utils/timeUtils';

interface Props {
    timer: Timer;
}
type TimerState = {
    time: string
    progress: number
};

const TimerView: React.FC<Props> = ({ timer }) => {
    const [time, setTime] = useState<TimerState>({time:"00:00:00", progress: 100 });

    const timerRef = useRef<Timer>(timer);
    timerRef.current = timer;

    const renderOnTick = (t: Timer) => {
        const canBeRendered = t.id === timerRef.current.id; //Check if the timer is selected
        if (!canBeRendered) return;

        const timeLeftInSec = t.timeLeftInSec;
        const timeLeftInMs = t.timeLeftInMs;
        const totalTimeInMs = t.timeInSec * 1000;

        const progress = timeLeftInMs > 0 ? (timeLeftInMs / totalTimeInMs) * 100 : 0;

        setTime(
            {
                time: parseSecondsToTimeString(timeLeftInSec),
                progress: progress
            }
        );
    }

    useEffect(() => {
        timer.onTick = renderOnTick;
        timer.onReset = renderOnTick;
        renderOnTick(timer);
    }, [timer]);


    return (
        <div className='timer-view'>
            <h2>{timer.name}</h2>
            <div className='time-section'>
                <span>{time.time}</span>
            </div>
            <div className='progress-container'>
                <div
                    className='progress-bar'
                    style={{ width: `${time.progress}%` }}
                />
            </div>
        </div>
    )
}

export default TimerView
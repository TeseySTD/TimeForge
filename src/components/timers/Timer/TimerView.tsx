import { useEffect, useState } from 'react';
import './TimerView.scss'
import Timer from '@/types/timer';

interface Props {
    timer: Timer;
    isVisible: boolean
}
type TimerState = { hours: string; minutes: string; seconds: string };

const TimerView: React.FC<Props> = ({ timer, isVisible }) => {
    const [time, setTime] = useState<TimerState>({ hours: '00', minutes: '00', seconds: '00' });
    const renderOnTick = (t: Timer) => {
        const timeLeftInSec = t.timeLeftInSec;

        const hours = Math.floor(timeLeftInSec / 60 / 60)
        const minutes = Math.floor((timeLeftInSec - hours * 60 * 60) / 60); 
        const seconds = (timeLeftInSec % 60);

        setTime(
            {
                hours: hours.toString().padStart(2, '0'),
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
            }
        );
    }

    useEffect(() => {
        timer.onTick = renderOnTick;
        timer.onReset = renderOnTick;
        renderOnTick(timer);
    }, [timer]);


    return (
        <div className='timer-view' style={{ display: isVisible ? 'block' : 'none' }}>
            <h2>{timer.name}</h2>
            <div className='time-section'>
                <span>{time.hours}:</span>
                <span>{time.minutes}:</span>
                <span>{time.seconds}</span>
            </div>

        </div>
    )
}

export default TimerView
import './Timers.scss'
import TimerMenu from "../TimerMenu/TimerMenu"
import TimersSet from '@/types/timersSet';
import Timer from '@/types/timer';
import { useEffect, useState } from 'react';
import TimerView from '../Timer/TimerView';
import IconButton from '@/components/ui/IconButton/IconButton';

const testData = new Array(7).fill(null).map((_, index) =>
    new TimersSet(index, `Set ${index + 1}`, [
        new Timer(`Timer 1, ${index + 1}`, 125),
        new Timer(`Timer 2, ${index + 1}`, 5),
        new Timer(`Timer 3, ${index + 1}`, 2 * 60 * 60 + 2),
    ])
);

const Timers: React.FC = () => {
    const [t, setSelectedTimersSet] = useState<TimersSet>(testData[0]);
    const [selectedTimer, setSelectedTimer] = useState<Timer>(t.timers[0]);
    const [isSelectedTimerActive, setIsSelectedTimerActive] = useState(false);

    const setSetAndFirstTimer = (set: TimersSet) => {
        setSelectedTimersSet(set);
        setSelectedTimer(set.timers[0]);
    }

    useEffect(() => {
        setIsSelectedTimerActive(selectedTimer.isActive);
        selectedTimer.onStateChange = (state: boolean) => {
            setIsSelectedTimerActive(state);
        }
    }, [selectedTimer])

    return (
        <div id="timers">
            <TimerMenu timersSets={testData} setSelectedCallback={setSetAndFirstTimer} />
            <div id='timers-list'>
                <div id='timers-list-header'>
                    {
                        t.timers.map((timer, index) => (
                            <span key={timer.name}>
                                <span
                                    className={`timer-name ${selectedTimer === timer ? 'selected' : ''}`}
                                    onClick={() => setSelectedTimer(timer)}
                                >
                                    {timer.name}
                                </span>
                                {index < t.timers.length - 1 && (
                                    <span className="divider">|</span>
                                )}
                            </span>
                        ))
                    }
                </div>
                <div id='timers-list-body'>
                    <TimerView timer={selectedTimer} />
                </div>
                <div id='timers-list-footer'>
                    <IconButton className='start-timer-button'
                        onClick={() => {
                            if (!isSelectedTimerActive)
                                selectedTimer.startTimer();
                            else
                                selectedTimer.pauseTimer();
                            setIsSelectedTimerActive(!isSelectedTimerActive);
                        }}>
                        {
                            !isSelectedTimerActive ?
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg> :
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                        }
                    </IconButton>
                    <IconButton className='reset-timer-button' onClick={() => selectedTimer.resetTimer()}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                        </svg>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Timers

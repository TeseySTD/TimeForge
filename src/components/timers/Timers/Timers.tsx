import './Timers.scss'
import TimerMenu from "../TimerMenu/TimerMenu"
import TimersSet from '@/types/timersSet';
import Timer from '@/types/timer';
import { useState } from 'react';
import TimerView from '../Timer/TimerView';
import Button from '@/components/ui/Button/Button';

const testData = new Array(7).fill(null).map((_, index) =>
    new TimersSet(index, `Set ${index + 1}`, [
        new Timer('Timer 1', 125),
        new Timer('Timer 2', 5),
        new Timer('Timer 3', 2 * 60 * 60 + 2),
    ])
);

const Timers: React.FC = () => {
    const t = testData[0];
    const [selectedTimer, setSelectedTimer] = useState<Timer>(t.timers[0]);

    return (
        <div id="timers">
            <TimerMenu timersSets={testData} />
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
                    {
                        t.timers.map((timer) => (
                            <TimerView key={timer.name} timer={timer} isVisible={timer === selectedTimer} />
                        ))
                    }
                </div>
                <div id='timers-list-footer'>
                    <Button className='start-timer-button' onClick={() => selectedTimer.startTimer()}>Start</Button>
                    <Button className='pause-timer-button' onClick={() => selectedTimer.pauseTimer()}>Pause</Button>
                    <Button className='reset-timer-button' onClick={() => selectedTimer.resetTimer()}>Reset</Button>
                </div>
            </div>
        </div>
    )
}

export default Timers

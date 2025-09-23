import type React from 'react';
import './TimersList.scss';
import type TimersSet from '@/types/timersSet';
import type Timer from '@/types/timer';
import TimerView from '@/components/timers/TimerView/TimerView';
import IconButton from '@/components/ui/IconButton/IconButton';

interface Props {
    timersSet: TimersSet;
    selectedTimer: Timer;
    isSelectedTimerActive: boolean;
    selectTimerCallback: (timer: Timer) => void;
    startTimerCallback: () => void;
    resetTimerCallback: () => void;
}

const TimersList: React.FC<Props> = (
    {
        timersSet,
        selectedTimer,
        isSelectedTimerActive,
        selectTimerCallback,
        startTimerCallback,
        resetTimerCallback,
    }
) => {
    return (
        <div id='timers-list'>
            <div id='timers-list-header'>
                {
                    timersSet.timers.map((timer, index) => (
                        <span key={timer.id}>
                            <span
                                className={`timer-name ${selectedTimer === timer ? 'selected' : ''}`}
                                onClick={() => selectTimerCallback(timer)}
                            >
                                {timer.name}
                            </span>
                            {index < timersSet.timers.length - 1 && (
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
                    onClick={startTimerCallback}>
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
                <IconButton className='reset-timer-button'
                    onClick={resetTimerCallback}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                </IconButton>
            </div>
        </div>
    )
}

export default TimersList
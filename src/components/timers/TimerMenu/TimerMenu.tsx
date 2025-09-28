import TimersSet from '@/types/timersSet';
import './TimerMenu.scss'
import { HorizontalScrollArea } from '@/components/ui/HorizontalScrollArea/HorizontalScrollArea';

interface Props {
    timersSets: TimersSet[]
    setSelectedCallback: (set: TimersSet) => void
    selectedTimersSet?: TimersSet
}

const TimerMenu: React.FC<Props> = ({ timersSets, selectedTimersSet, setSelectedCallback }) => {
    return (
        <div id="timer-menu">
            <HorizontalScrollArea selectedIndex={selectedTimersSet ? timersSets.findIndex((set) => set.id === selectedTimersSet.id) : 0}>
                {timersSets.length > 0 && timersSets.map((set) => (
                    <div className={`set ${selectedTimersSet && set.id === selectedTimersSet.id ? 'selected' : ''}`} key={set.id}
                        onClick={() => {
                            setSelectedCallback(set);
                        }
                        }>
                        <p>{set.name}</p>
                    </div>
                ))
                }
            </HorizontalScrollArea>

        </div>
    )
}

export default TimerMenu;
import TimersSet from '@/types/timersSet';
import './TimerMenu.scss'
import { useEffect, useRef, useState } from 'react';

interface Props {
    timersSets: TimersSet[]
    setSelectedCallback: (set: TimersSet) => void
}

function setScrolling(ref: React.RefObject<HTMLDivElement | null>) {
    const el = ref.current!;
    let startX = 0, startLeft = 0, dragging = false, hasMoved = false;
    const DRAG_THRESHOLD = 5;

    const onDown = (e: PointerEvent) => {
        dragging = true;
        hasMoved = false;
        el.classList.add('grabbing');
        startX = e.clientX;
        startLeft = el.scrollLeft;
    };

    const onMove = (e: PointerEvent) => {
        if (!dragging) return;

        const deltaX = Math.abs(e.clientX - startX);
        if (deltaX > DRAG_THRESHOLD) {
            hasMoved = true;
            el.scrollLeft = startLeft - (e.clientX - startX);
            e.preventDefault();
        }
    };

    const onUp = (e: PointerEvent) => {
        dragging = false;
        el.classList.remove('grabbing');

        if (hasMoved) {
            const blockClick = (clickEvent: Event) => {
                clickEvent.preventDefault();
                clickEvent.stopPropagation();
                el.removeEventListener('click', blockClick, true);
            };
            el.addEventListener('click', blockClick, true);
        }
    };

    const onDocumentMove = (e: PointerEvent) => onMove(e);
    const onDocumentUp = (e: PointerEvent) => onUp(e);

    el.addEventListener('pointerdown', onDown);
    document.addEventListener('pointermove', onDocumentMove);
    document.addEventListener('pointerup', onDocumentUp);
    el.addEventListener('pointercancel', onUp);

    return () => {
        el.classList.remove('grabbing');
        el.removeEventListener('pointerdown', onDown);
        document.removeEventListener('pointermove', onDocumentMove);
        document.removeEventListener('pointerup', onDocumentUp);
        el.removeEventListener('pointercancel', onUp);
    };
}

const TimerMenu: React.FC<Props> = ({ timersSets, setSelectedCallback }) => {
    const [selectedTimerSet, setSelectedTimerSet] = useState<TimersSet>(timersSets[0]);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        return setScrolling(ref);
    }, []);
    return (
        <div id="timer-menu" ref={ref}>
            {timersSets.map((set) => (
                <div className={`set ${set.id === selectedTimerSet.id ? 'selected' : ''}`} key={set.id}
                    onClick={() => {
                        setSelectedTimerSet(set);
                        setSelectedCallback(set);
                    }
                    }>
                    <p>{set.name}</p>
                </div>
            ))}
        </div>
    )
}

export default TimerMenu;
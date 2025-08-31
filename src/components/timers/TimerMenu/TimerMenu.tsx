import TimersSet from '@/types/timersSet';
import './TimerMenu.scss'
import { useEffect, useRef } from 'react';

interface Props { 
    timersSets: TimersSet[]
}

function setScrolling(ref: React.RefObject<HTMLDivElement | null>) {
    const el = ref.current!;
    let startX = 0, startLeft = 0, dragging = false;

    const onDown = (e: PointerEvent) => {
        dragging = true;
        el.classList.add('grabbing');
        el.setPointerCapture(e.pointerId);
        startX = e.clientX;
        startLeft = el.scrollLeft;
        e.preventDefault();
    };
    const onMove = (e: PointerEvent) => {
        if (!dragging) return;
        el.scrollLeft = startLeft - (e.clientX - startX);
        e.preventDefault();
    };
    const onUp = (e: PointerEvent) => {
        dragging = false;
        el.classList.remove('grabbing');
        el.releasePointerCapture(e.pointerId);
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    
    return () => {
        el.classList.remove('grabbing');
        el.removeEventListener('pointerdown', onDown);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', onUp);
        el.removeEventListener('pointercancel', onUp);
    };
}

const TimerMenu: React.FC<Props> = ({ timersSets }) => {

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        return setScrolling(ref);
    }, []);
    return (
        <div id="timer-menu" ref={ref}>
            {timersSets.map((set) => (
                <div className='set' key={set.id}>
                    <p>{set.name}</p>
                </div>
            ))}
        </div>
    )
}

export default TimerMenu;
import TimersSet from '@/types/timersSet';
import './TimerMenu.scss'
import Timer from '@/types/timer';
import { useEffect, useRef } from 'react';

const testData = new Array(7).fill(null).map((_, index) =>
    new TimersSet(index, `Set ${index + 1}`, [
        new Timer('Timer 1', 1000, () => {}, () => {}),
        new Timer('Timer 2', 2000, () => {}, () => {}),
    ])
);

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

const TimerMenu: React.FC = () => {

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        return setScrolling(ref);
    }, []);
    return (
        <div id="timer-menu" ref={ref}>
            {testData.map((set) => (
                <div className='set' key={set.id}>
                    <p>{set.name}</p>
                </div>
            ))}
        </div>
    )
}

export default TimerMenu;
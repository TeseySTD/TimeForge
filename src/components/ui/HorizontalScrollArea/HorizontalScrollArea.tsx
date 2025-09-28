import type React from 'react';
import './HorizontalScrollArea.scss';
import { useEffect, useRef } from 'react';

export interface Props {
    children: React.ReactNode;
    selectedIndex: number;
    className?: string;
}

function setScrolling(ref: React.RefObject<HTMLDivElement | null>) {
    const el = ref.current!;
    let startX = 0;
    let startLeft = 0;
    let isDragging = false;
    let hasMoved = false;
    const DRAG_THRESHOLD = 5;
    
    const onMouseDown = (e: MouseEvent) => {
        if (e.button !== 0) return; // Only left mouse button 
        
        isDragging = true;
        hasMoved = false;
        startX = e.clientX;
        startLeft = el.scrollLeft;
        
        e.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    
    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        
        const deltaX = startX - e.clientX;
        
        if (Math.abs(deltaX) > DRAG_THRESHOLD && !hasMoved) {
            hasMoved = true;
            el.classList.add('grabbing');
        }
        
        if (hasMoved) {
            el.scrollLeft = startLeft + deltaX;
        }
    };
    
    const onMouseUp = () => {
        if (isDragging && hasMoved) {
            setTimeout(() => {
                const blockNextClick = (e: Event) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    el.removeEventListener('click', blockNextClick, true);
                };
                el.addEventListener('click', blockNextClick, true);
            }, 0);
        }
        
        isDragging = false;
        hasMoved = false;
        el.classList.remove('grabbing');
        
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    
    // Touch events
    const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        
        isDragging = true;
        hasMoved = false;
        startX = e.touches[0].clientX;
        startLeft = el.scrollLeft;
    };
    
    const onTouchMove = (e: TouchEvent) => {
        if (!isDragging || e.touches.length !== 1) return;
        
        const deltaX = startX - e.touches[0].clientX;
        
        if (Math.abs(deltaX) > DRAG_THRESHOLD && !hasMoved) {
            hasMoved = true;
            e.preventDefault(); 
        }
        
        if (hasMoved) {
            e.preventDefault();
            el.scrollLeft = startLeft + deltaX;
        }
    };
    
    const onTouchEnd = () => {
        if (isDragging && hasMoved) {
            setTimeout(() => {
                const blockNextClick = (e: Event) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    el.removeEventListener('click', blockNextClick, true);
                };
                el.addEventListener('click', blockNextClick, true);
            }, 0);
        }
        
        isDragging = false;
        hasMoved = false;
        el.classList.remove('grabbing');
    };
    
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    el.addEventListener('touchcancel', onTouchEnd);
    
    return () => {
        el.classList.remove('grabbing');
        el.removeEventListener('mousedown', onMouseDown);
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
        el.removeEventListener('touchcancel', onTouchEnd);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
}

export const HorizontalScrollArea: React.FC<Props> = ({ children, selectedIndex, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const scrollToElement = (target: HTMLElement | null) => {
        if (!containerRef.current || !target) return;
        target?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    };
    
    useEffect(() => {
        return setScrolling(containerRef);
    }, []);
    
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        
        const child = container.children.item(selectedIndex) as HTMLElement | undefined;
        const target = child ?? null;
        
        if (target) {
            requestAnimationFrame(() => scrollToElement(target));
        }
    }, [selectedIndex]);
    
    return (
        <div 
            ref={containerRef} 
            className={`horizontal-scroll-area ${className || ''}`}
        >
            {children}
        </div>
    );
};
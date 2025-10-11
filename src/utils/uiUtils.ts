import type { RefObject } from "react";

export function setVisibleWithDelay(ref: RefObject<HTMLDivElement | null>, delay: number = 50){
    setTimeout(() => {
        ref.current?.classList.add('visible');
    }, delay)   
}
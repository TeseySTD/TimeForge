import { useEffect, useRef } from "react"

export const useThrottling  = (func: Function, delay = 500) => {
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
    useEffect(() => {
        return () => {
            if (!timer.current) return;
            clearTimeout(timer.current);
        };
    }, []);

    const throttledFunction = ((...args: any[]) => {
        if (timer.current)
            return;
        else
            func(...args);
        const newTimer = setTimeout(() => {
            clearTimeout(timer.current);
            timer.current = undefined;
        }, delay);
        timer.current = newTimer;
    });

    return throttledFunction;
}

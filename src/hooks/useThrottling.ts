import { useEffect, useRef } from "react"
/**
 * A hook, that provides throttling wrapping for some action.
 * 
 * @param func - Function to wrap
 * @param delay - Delay of throttling in milliseconds, by default is 500ms
 * @returns Wrapped function with throttling  
 */
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

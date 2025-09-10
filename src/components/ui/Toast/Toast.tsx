import './Toast.scss'

import React, { useEffect, useRef, useState } from 'react';

export interface Props {
    hasCloseButton?: boolean;
    children: React.ReactNode;
    autoClose?: number;
    titleText?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose?: () => void;
}

export const Toast: React.FC<Props> = ({
    hasCloseButton = true,
    children,
    titleText,
    autoClose,
    type = 'info',
    onClose
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const [whenClose, setWhenClose] = useState(0);
    const [timeLeftToClose, setTimeLeftToClose] = useState(0);

    useEffect(() => {
        if (!autoClose) return;

        setWhenClose(Date.now() + autoClose);
        timeoutRef.current = setTimeout(() => {
            handleClose();
        }, autoClose);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = () => {
        if (autoClose) {
            if (timeoutRef.current)
                clearTimeout(timeoutRef.current);
            if (!isClosing) setTimeLeftToClose(whenClose - Date.now());
        }
    };

    const handleMouseLeave = () => {
        if (timeLeftToClose) {
            setWhenClose(Date.now() + timeLeftToClose);
            timeoutRef.current = setTimeout(() => {
                handleClose()
            }, timeLeftToClose);
        }
    };

    const handleClose = () => {
        if (isClosing) return;

        if (timeoutRef.current)
            clearTimeout(timeoutRef.current);

        setIsClosing(true);
        timeoutRef.current = setTimeout(() => {
            onClose?.();
        }, 220);
    };

    return (
        <div
            className={`toast ${type}` + (isClosing ? ' closing' : '')}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="toast-body">
                {titleText && <div className="toast-title">{titleText}</div>}
                <div className="toast-content">{children}</div>
            </div>
            {hasCloseButton && (
                <button className="toast-close" onClick={handleClose}>×</button>
            )}
            {autoClose && (
                <div
                    className="toast-progress"
                    style={{ '--duration': `${autoClose}ms` } as React.CSSProperties}
                />
            )}
        </div>
    );
};

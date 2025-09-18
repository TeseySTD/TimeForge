import type React from 'react'
import './Button.scss'
import useSound from '@/hooks/useSound'
import bubblePop from '@/assets/sounds/bubble-pop.wav'

interface Props {
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset',
    title?: string
}

const Button: React.FC<Props> = ({ 
    onClick, 
    className, 
    disabled = false, 
    children, 
    type = 'button',
    title = 'button'
}) => {
    const {play: playPopSound} = useSound(bubblePop);

    return (
        <button 
            className={`button ${className || ""}`}
            onClick={() => {
                playPopSound(0.1); 
                if (onClick) onClick();
            }}
            disabled={disabled}
            type={type}
            title={title}
        >
            {children}
        </button>
    )
}

export default Button
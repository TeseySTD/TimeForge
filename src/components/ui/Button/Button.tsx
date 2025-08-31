import type React from 'react'
import './Button.scss'

interface Props {
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<Props> = ({ 
    onClick, 
    className, 
    disabled = false, 
    children, 
    type = 'button' 
}) => {
    return (
        <button 
            className={`button ${className || ""}`}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button
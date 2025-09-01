import React from 'react'
import './IconButton.scss'
import Button from '../Button/Button'

interface Props {
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset'
}

const IconButton: React.FC<Props> = ({ 
    onClick, 
    className, 
    disabled = false, 
    children, 
    type = 'button' 
}) => {
    return(
        <Button
            onClick={onClick}
            className={`icon-button ${className || ""}`}
            disabled={disabled}
            type={type}
        >
            {children}
        </Button>
    )
}

export default IconButton
import React from 'react'
import './IconButton.scss'
import Button from '../Button/Button'

interface Props {
    onClick?: () => void,
    className?: string,
    disabled?: boolean,
    children: React.ReactNode,
    type?: 'button' | 'submit' | 'reset'
    title?: string
}

const IconButton: React.FC<Props> = ({ 
    onClick, 
    className, 
    disabled = false, 
    children, 
    type = 'button',
    title = 'icon-button'
}) => {
    return(
        <Button
            onClick={onClick}
            className={`icon-button ${className || ""}`}
            disabled={disabled}
            type={type}
            title={title}
        >
            {children}
        </Button>
    )
}

export default IconButton
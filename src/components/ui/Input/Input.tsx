import './Input.scss'
import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText?: string
    className?: string
    error?: string
}

const Input: React.FC<Props> = (
    {
        labelText,
        className = "",
        error,
        ...props
    }
) => {
    const inputId = props.id || `input-${Math.random().toString(36)}`
    return (
        <div className={"input-container" + className}>
            {labelText && <label htmlFor={inputId}>{labelText}</label>}
            <input className={error ? "error" : ""}
                {...props}
                id={inputId}
            />
            {error && (
                <span id={`${inputId}-error`} className="input-error" role="alert">
                    {error}
                </span>
            )}
        </div>
    )
}

export default Input
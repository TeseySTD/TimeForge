import './Input.scss'
import React from 'react'

interface Props {
    labelText?: string
    type?: string
    className?: string
    name?: string
    defaultValue?: string
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = (
    {
        labelText,
        type = 'text',
        name,
        className = "",
        defaultValue,
        placeholder,
        value,
        onChange
    }
) => {
    return (
        <div className={"input-container" + className}>
            {labelText && <label htmlFor={name}>{labelText}</label>}
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Input
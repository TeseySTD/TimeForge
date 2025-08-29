import type React from 'react'
import './Switch.scss'

interface Props{
    switchEventHandler: () => void,
    className?: string,
    checked?: boolean   
}

const Switch: React.FC<Props> = ({ switchEventHandler, className, checked = false }) => {
    return (
        <div>
            <label className={"switch " + className || ""} >
                <input type="checkbox" onChange={switchEventHandler} checked={checked}/>
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default Switch
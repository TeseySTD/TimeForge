import type React from 'react'
import './Switch.scss'

interface Props{
    switchEventHandler: () => void
}

const Switch: React.FC<Props> = ({ switchEventHandler }) => {
    return (
        <div>
            <label className="switch" title='Toggle theme'>
                <input type="checkbox" onChange={switchEventHandler}/>
                <span className="slider"></span>
            </label>
        </div>
    )
}

export default Switch
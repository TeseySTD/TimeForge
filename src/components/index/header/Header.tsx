import type React from 'react'
import './Header.scss'
import Switch from '@/components/ui/Switch/Switch'

interface Props {
    toggleThemeHandler: () => void
}

const Header: React.FC<Props> = ({ toggleThemeHandler }) => {
    return (
        <header>
            <div id='header'>
                <div className='container'>
                    <Switch switchEventHandler={toggleThemeHandler} />
                </div>
            </div>
            <h1>Time Forge</h1>
        </header>
    )
}

export default Header
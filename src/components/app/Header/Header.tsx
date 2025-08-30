import type React from 'react'
import './Header.scss'
import ThemeToggle from '@/components/app/ThemeToggle/ThemeToggle'

const Header: React.FC = () => {
    return (
        <header>
            <div id='header'>
                <div className='container'>
                    <a className='brand' href="/">Time Forge</a>
                </div>
                <div className='container'>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

export default Header
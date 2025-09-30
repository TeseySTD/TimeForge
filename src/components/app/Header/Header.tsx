import type React from 'react'
import { useState } from 'react'
import './Header.scss'
import ThemeToggle from '@/components/app/ThemeToggle/ThemeToggle'
import { NavLink } from 'react-router'
import { useThrottling } from '@/hooks/useThrottling'
import SettingsMenu from '../SettingsMenu/SettingsMenu'

function SettingsIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06
                                    a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21
                                    a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51
                                    1.65 1.65 0 0 0-1.82.33l-.06.06
                                    a2 2 0 1 1-2.83-2.83l.06-.06
                                    a1.65 1.65 0 0 0 .33-1.82
                                    1.65 1.65 0 0 0-1.51-1H3
                                    a2 2 0 1 1 0-4h.09
                                    a1.65 1.65 0 0 0 1.51-1
                                    1.65 1.65 0 0 0-.33-1.82l-.06-.06
                                    a2 2 0 1 1 2.83-2.83l.06.06
                                    a1.65 1.65 0 0 0 1.82.33h.09
                                    A1.65 1.65 0 0 0 10 3.09V3
                                    a2 2 0 1 1 4 0v.09
                                    c0 .69.39 1.31 1 1.51h.09
                                    a1.65 1.65 0 0 0 1.82-.33l.06-.06
                                    a2 2 0 1 1 2.83 2.83l-.06.06
                                    a1.65 1.65 0 0 0-.33 1.82v.09
                                    c.2.61.82 1 1.51 1H21
                                    a2 2 0 1 1 0 4h-.09
                                    c-.69 0-1.31.39-1.51 1z"
            />
        </svg>
    )
}

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const throttledToggleMenu = useThrottling(toggleMenu);

    const closeMenu = () => setIsMenuOpen(false)
    const closeSettings = () => setIsSettingsOpen(false)    

    return (
        <>
            <header>
                <div id='header'>
                    <div className='container'>
                        <NavLink className='brand' to="/">Time Forge</NavLink>
                    </div>
                    <div className='container desktop-nav'>
                        <NavLink className='nav-item' to="/">Home</NavLink>
                        <NavLink className='nav-item' to="/timers">Timers</NavLink>
                        <div className="settings-wrapper" onClick={() => setIsSettingsOpen(true)}>
                            <SettingsIcon />
                        </div>
                        <ThemeToggle />
                    </div>
                    <div className='burger-menu' onClick={throttledToggleMenu}>
                        <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
                        <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
                        <span className={`burger-line ${isMenuOpen ? 'active' : ''}`}></span>
                    </div>
                </div>
            </header>

            {/* Mobile Side Menu */}
            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className='side-menu-content'>
                    <NavLink className='nav-item mobile' to="/" >Home</NavLink>
                    <NavLink className='nav-item mobile' to="/timers" >Timers</NavLink>
                    <div className='tools-wrapper'>
                        <div className="settings-wrapper" onClick={() => setIsSettingsOpen(true)}>
                            <SettingsIcon />
                        </div>                        
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && <div className='menu-overlay' onClick={closeMenu}></div>}

            {/* Settings */}
            <SettingsMenu isOpened={isSettingsOpen} onClose={closeSettings} />
        </>
    )
}

export default Header
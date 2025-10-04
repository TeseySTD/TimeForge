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
                    <NavLink className='nav-item mobile' to="/" >
                        <svg className='nav-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g stroke-width="0">
                            </g>
                            <g stroke-linecap="round" stroke-linejoin="round"></g>
                            <g > <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4498 10.275L11.9998 3.1875L2.5498 10.275L2.9998 11.625H3.7498V20.25H20.2498V11.625H20.9998L21.4498 10.275ZM5.2498 18.75V10.125L11.9998 5.0625L18.7498 10.125V18.75H14.9999V14.3333L14.2499 13.5833H9.74988L8.99988 14.3333V18.75H5.2498ZM10.4999 18.75H13.4999V15.0833H10.4999V18.75Z"
                                fill="currentColor"
                            >
                            </path>
                            </g>
                        </svg>
                    </NavLink>
                    <NavLink className='nav-item mobile' to="/timers">
                        <svg className='nav-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9095 21.9987C16.8301 21.9987 20.819 18.0098 20.819 13.0892C20.819 8.1686 16.8301 4.17969 11.9095 4.17969C6.98892 4.17969 3 8.1686 3 13.0892C3 18.0098 6.98892 21.9987 11.9095 21.9987Z"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                            />
                            <path d="M11.9102 8V14.3639L15.7285 16.9095" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <mask id="path-3-inside-1_579_13" fill="currentColor">
                                <path d="M19.5462 1L22.0918 3.54557L20.819 4.81836L18.2734 2.27279L19.5462 1Z" />
                            </mask>
                            <path d="M19.5462 1L23.0818 -2.53553L19.5462 -6.07107L16.0107 -2.53553L19.5462 1ZM22.0918 3.54557L25.6273 7.0811L29.1629 3.54557L25.6273 0.0100365L22.0918 3.54557ZM20.819 4.81836L17.2835 8.35389L20.819 11.8894L24.3545 8.35389L20.819 4.81836ZM18.2734 2.27279L14.7379 -1.26275L11.2024 2.27279L14.7379 5.80832L18.2734 2.27279ZM19.5462 1L16.0107 4.53553L18.5563 7.0811L22.0918 3.54557L25.6273 0.0100365L23.0818 -2.53553L19.5462 1ZM22.0918 3.54557L18.5563 0.0100365L17.2835 1.28282L20.819 4.81836L24.3545 8.35389L25.6273 7.0811L22.0918 3.54557ZM20.819 4.81836L24.3545 1.28282L21.809 -1.26275L18.2734 2.27279L14.7379 5.80832L17.2835 8.35389L20.819 4.81836ZM18.2734 2.27279L21.809 5.80832L23.0818 4.53553L19.5462 1L16.0107 -2.53553L14.7379 -1.26275L18.2734 2.27279Z"
                                fill="currentColor" mask="url(#path-3-inside-1_579_13)" 
                            />
                        </svg>

                    </NavLink>
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
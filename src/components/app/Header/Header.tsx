import type React from 'react'
import { useState } from 'react'
import './Header.scss'
import ThemeToggle from '@/components/app/ThemeToggle/ThemeToggle'
import { NavLink } from 'react-router'
import { useThrottling } from '@/hooks/useThrottling'

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const throttledToggleMenu = useThrottling(toggleMenu);

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

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
                    <div className='theme-toggle-wrapper'>
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMenuOpen && <div className='menu-overlay' onClick={closeMenu}></div>}
        </>
    )
}

export default Header
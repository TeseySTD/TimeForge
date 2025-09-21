import type React from "react"
import "./Home.scss"
import logo from '@/assets/logo.svg'
import { NavLink } from "react-router"
const Home: React.FC = () => {
    return (
        <div id="home">
            <h1>Time Forge</h1>
            <NavLink to="/" target="_blank">
                <img src={logo} className="logo" alt="TimeForge logo" />
            </NavLink>
            <h1>Web application for time tracking.</h1>
        </div>
    )
}

export default Home
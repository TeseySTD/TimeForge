import type React from "react"
import "./Home.scss"
import logo from '@/assets/logo.svg'
import { NavLink } from "react-router"
import { useEffect, useRef } from "react"
import { set } from "zod"
import { setVisibleWithDelay } from "@/utils/uiUtils"
const Home: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setVisibleWithDelay(ref);
    }, []);

    return (
        <div id="home" ref={ref}>
            <h1>Time Forge</h1>
            <NavLink to="/" target="_blank">
                <img src={logo} className="logo" alt="TimeForge logo" />
            </NavLink>
            <h1>Web application for time tracking.</h1>
        </div>
    )
}

export default Home
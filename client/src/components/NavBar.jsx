import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import ExitIcon from "./icons/ExitIcon.jsx";
import NavLink from "./NavLink.jsx";
import UserIcon from "./icons/UserIcon.jsx";
import useUser from "../hooks/useUser.jsx";

export default function NavBar({className, ref}) { 
    const { isLogged, setIsLogged, globalUsername } = useUser();
    const [loginStatus, setLoginStatus] = useState("");
    const [href, setHref] = useState(window.location.href);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        const isLogged = window.sessionStorage.getItem("isLogged") === "true" ? true : false;
        setIsLogged(isLogged);
    }, [handleExit]);

    function handleExit() {
        window.sessionStorage.clear();
        window.sessionStorage.setItem("isLogged", false);
        setIsLogged(window.sessionStorage.getItem("isLogged") === "true" ? true : false);
        Axios.get("http://localhost:5174/logout").then((res) => {
            setLoginStatus(res.data.message);
        });
    }

    return (
        <>
        {/* This is an invisible div with relative position so that it takes up the height of the menu (because menu is absolute/fixed) */}
        {/* <div className="relative w-full h-20 opacity-0 pointer-events-none"></div> */}
        <header ref={ref} className={`absolute z-50 top-0 left-0 w-full h-20 flex items-center justify-between px-8 ${className}`}>
            <Link to="/"><h1 className="text-4xl font-bold bg-clip-text text-white/10 bg-gradient-to-br from-emerald-400 to-blue-500">escReact</h1></Link>
            <nav className="flex gap-3">
                <NavLink href="/leaderboards" text="Clasificación" />
                {href !== "http://localhost:5173/esc" && <NavLink href="/esc" text="Esc" />}
                {href !== "http://localhost:5173/react" && <NavLink href="/react" text="React" />}
                {!isLogged && (
                <>
                    <Link to="/login" className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full hover:scale-105 transition-all duration-200">Iniciar sesión</Link>
                    <Link to="/register" className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Regístrate</Link>
                </>
                )
                }
                {isLogged && (
                    <div className="flex items-center gap-3">
                        <div className="py-2 px-4 flex items-center justify-center gap-x-0.5 font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full">
                            <UserIcon className={"size-4.5"} />
                            <span>{globalUsername}</span>
                        </div>
                        <button className="flex items-center justify-center rounded-full group transition-all duration-100 border border-white/90 hover:bg-red-500/20 hover:border-red-500/30 w-10 h-10" onClick={handleExit}><ExitIcon className={"group-hover:text-red-500/70"} /></button>
                    </div>
                )}
            </nav>
        </header>
        </>
    )
}
import "../App.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";
import MainBackground from "../components/MainBackground";
import useUser from "../hooks/useUser";

export default function Login() { 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");
    const { isLogged, setIsLogged } = useUser();

    Axios.defaults.withCredentials = true;

    function loginUser(e) {
        e.preventDefault();

        Axios.post("http://localhost:5174/login", {
            username: username,
            password: password
        }).then((res) => {
            if (res.data.message) {
                window.sessionStorage.clear();
                window.sessionStorage.setItem("isLogged", false);
                setLoginStatus(res.data.message);
            } else {
                setLoginStatus("Has iniciado sesión correctamente");
                window.sessionStorage.clear();
                window.sessionStorage.setItem("username", res.data[0].username);
                window.sessionStorage.setItem("isLogged", true);
                window.location.href = "/";
            }
        })
    }

    useEffect(() => {
        // Axios.get("http://localhost:5174/login").then((res) => {
        //     console.log(res)
        //     if (res.data.isLoggedIn === true) {
        //         setLoginStatus("Has iniciado sesión correctamente");
        //         window.location.href = "/";
        //     }
        //     else {
        //         window.sessionStorage.clear();
        //         window.sessionStorage.setItem("username", res.data.user[0].username);
        //         window.sessionStorage.setItem("isLogged", false);
        //     }
        // });
        if (isLogged === true) {
            setLoginStatus("Has iniciado sesión correctamente");
            window.location.href = "/";
        }
    }, []);
    
    return (
        <>
            <MainBackground />
            <main className="h-screen flex items-center justify-center">
                <section className="flex w-[1000px] h-[400px]">
                    <form method="POST" className="flex flex-col justify-center w-full rounded-l-sm bg-black/50 p-10">
                        <h1 className="text-3xl self-center font-bold mb-9">Inicia sesión en escReact</h1>
                        <div className="relative">
                            <input onChange={(e) => {setUsername(e.target.value)}} className="relative w-full py-2 pr-2 pl-2 bg-transparent text-base font-medium border-none outline-0 z-20 transition-all duration-300" type='text' id='username' name='username' maxLength={55} required />
                            <label className="font-semibold absolute left-0 pointer-events-none py-2 pr-1 pl-1 text-base transition-all duration-300" htmlFor="username">Usuario</label>
                            <i className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-br from-emerald-600 to-blue-600 overflow-hidden rounded-xs transition-all duration-300"></i>
                            <div>
                                <i className="absolute left-0.5 bottom-0.5 w-[calc(100%-4px)] h-0 z-10 opacity-0 bg-black/80 overflow-hidden transition-all duration-300"></i>
                            </div>
                        </div>
                        <div className="mt-8 mb-2 relative">
                            <input onChange={(e) => {setPassword(e.target.value)}} className="relative w-full py-2 pr-2 pl-2 bg-transparent text-base font-medium border-none outline-0 z-20 transition-all duration-300" type='password' id='password' name='password' maxLength={25} required />
                            <label className="font-semibold absolute left-0 pointer-events-none py-2 pr-1 pl-1 text-base transition-all duration-300" htmlFor="password">Contraseña</label>
                            <i className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-br from-emerald-600 to-blue-600 overflow-hidden rounded-xs transition-all duration-300"></i>
                            <div>
                                <i className="absolute left-0.5 bottom-0.5 w-[calc(100%-4px)] h-0 z-10 opacity-0 bg-black/80 overflow-hidden transition-all duration-300"></i>
                            </div>
                        </div>
                        <h1>{loginStatus}</h1>
                        <button onClick={loginUser} type="submit" className="w-fit self-center py-2 px-8 mt-4 font-semibold rounded-full bg-gradient-to-br from-emerald-600 to-blue-600 hover:scale-110 transition-all duration-150">Iniciar sesión</button>
                    </form>
                    <aside className="flex flex-col items-center justify-center gap-3 p-10 w-full rounded-r-sm bg-gradient-to-br from-emerald-600 to-blue-600">
                        <h1 className="text-3xl font-bold text-center">¿Eres nuevo/a?</h1>
                        <p className="flex text-pretty text-center">Puedes registrarte justo aquí para empezar a mejorar tu mecanografía y tiempo de reacción</p>
                        <Link to="/register" className="w-fit py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-150">Regístrate</Link>
                    </aside>
                </section>
            </main>
        </>
    )
}
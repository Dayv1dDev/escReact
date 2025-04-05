import "../App.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Axios from "axios";
import MainBackground from "../components/MainBackground";

export default function Register() {
    const emailInputRef = useRef(null);

    const [regUsername, setRegUsername] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");

    Axios.defaults.withCredentials = true;

    function registerUser(e) {
        e.preventDefault();

        Axios.post("http://localhost:5174/register", {
            username: regUsername,
            email: regEmail,
            password: regPassword
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.error("Error al registrar el usuario: ", err);
        });
    }

    function handleEmailInput() {
        const labelEl = emailInputRef.current.nextElementSibling;
        const colorEl = labelEl.nextElementSibling;
        const darkBgEl = colorEl.nextElementSibling.firstElementChild;

        if (emailInputRef.current.value !== "") {
            labelEl.classList.add("translate-e-label");
            colorEl.classList.add("h-[38px]")
            darkBgEl.classList.remove("opacity-0");
            darkBgEl.classList.add("opacity-100", "h-[34px]");
        }
        else {
            labelEl.classList.remove("translate-e-label");
            colorEl.classList.remove("h-[38px]")
            darkBgEl.classList.remove("opacity-100", "h-[34px]");
            darkBgEl.classList.add("opacity-0");
        }
        return
    }

    return (
        <>
            <MainBackground />
            <main className="h-screen flex items-center justify-center">
                <section className="flex w-[1000px] h-[400px]">
                    <aside className="flex flex-col items-center justify-center gap-3 p-10 w-full rounded-l-sm bg-gradient-to-br from-emerald-600 to-blue-600">
                        <h1 className="text-3xl font-bold text-center">¿Ya dispones de una cuenta en escReact?</h1>
                        <p className="flex text-pretty text-center"></p>
                        <Link to="/login" className="w-fit py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-150">Iniciar sesión</Link>
                    </aside>
                    <form method="POST" className="flex flex-col justify-center w-full rounded-r-sm bg-black/50 p-10">
                        <h1 className="text-3xl self-center font-bold mb-9">Crea tu cuenta de escReact</h1>
                        <article className="flex flex-col gap-9 mb-4">
                            <div className="relative">
                                <input onChange={(e) => {setRegUsername(e.target.value)}} className="relative w-full py-2 pr-2 pl-2 bg-transparent text-base font-medium border-none outline-0 z-20 transition-all duration-300" type='text' id='username' name='username' maxLength={55} required />
                                <label className="font-semibold absolute left-0 pointer-events-none py-2 pr-1 pl-1 text-base transition-all duration-300" htmlFor="username">Usuario</label>
                                <i className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-br from-emerald-600 to-blue-600 overflow-hidden rounded-xs transition-all duration-300"></i>
                                <div>
                                    <i className="absolute left-0.5 bottom-0.5 w-[calc(100%-4px)] h-0 z-10 opacity-0 bg-black/80 overflow-hidden transition-all duration-300"></i>
                                </div>
                            </div>
                            <div className="relative">
                                <input ref={emailInputRef} onInput={handleEmailInput} onChange={(e) => {setRegEmail(e.target.value)}} className="relative w-full py-2 pr-2 pl-2 bg-transparent text-base font-medium border-none outline-0 z-20 transition-all duration-300" type="email" id='email' name='email' maxLength={100} required />
                                <label className="font-semibold absolute left-0 pointer-events-none py-2 pr-1 pl-1 text-base transition-all duration-300" htmlFor="email">Correo electrónico</label>
                                <i className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-br from-emerald-600 to-blue-600 overflow-hidden rounded-xs transition-all duration-300"></i>
                                <div>
                                    <i className="absolute left-0.5 bottom-0.5 w-[calc(100%-4px)] h-0 z-10 opacity-0 bg-black/80 overflow-hidden transition-all duration-300"></i>
                                </div>
                            </div>
                            <div className="relative">
                                <input onChange={(e) => {setRegPassword(e.target.value)}} className="relative w-full py-2 pr-2 pl-2 bg-transparent text-base font-medium border-none outline-0 z-20 transition-all duration-300" type='password' id='password' name='password' maxLength={25} required />
                                <label className="font-semibold absolute left-0 pointer-events-none py-2 pr-1 pl-1 text-base transition-all duration-300" htmlFor="password">Contraseña</label>
                                <i className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-br from-emerald-600 to-blue-600 overflow-hidden rounded-xs transition-all duration-300"></i>
                                <div>
                                    <i className="absolute left-0.5 bottom-0.5 w-[calc(100%-4px)] h-0 z-10 opacity-0 bg-black/80 overflow-hidden transition-all duration-300"></i>
                                </div>
                            </div>
                        </article>
                        <button onClick={registerUser} type="submit" className="w-fit self-center py-2 px-8 mt-4 font-semibold rounded-full bg-gradient-to-br from-emerald-600 to-blue-600 hover:scale-110 transition-all duration-150">Registrarse</button>
                    </form>
                </section>
            </main>
        </>
    )
}
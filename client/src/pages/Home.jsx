import { Link } from "react-router-dom";
import MainBackground from "../components/MainBackground.jsx";
import NavBar from "../components/NavBar.jsx";
import useUser from "../hooks/useUser.jsx";

export default function Home() {
    const { globalUsername, isLogged } = useUser();

    return (    
        <div className="w-screen min-h-screen flex flex-col justify-between">
            <main className="flex flex-col items-center justify-center">
                <MainBackground />
                <NavBar />
                <section className="flex flex-col items-center w-full xl:w-7xl gap-3 mt-56">
                    <h1 className="text-3xl font-bold text-white text-center text-wrap">La plataforma ideal para prácticar mecanografía y mejorar tus reflejos</h1>
                    {isLogged === false && (
                        <>
                        <p className="text-xl text-white/70 text-center">¡Regístrate o inicia sesión y empieza a jugar!</p>
                        <div className="flex items-center gap-3">
                            <Link to={"/login"} className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full hover:scale-105 transition-all duration-200">Iniciar sesión</Link>
                            <Link to={"/register"} className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Regístrarse</Link>
                        </div>
                        </>
                    )}
                    {isLogged === true && (
                        <>
                        <p className="text-xl text-white/70 text-center text-balance">¡Hola, {globalUsername}! ¿Listo para jugar?</p>
                        <Link to={"/leaderboards"} className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Ver clasificación</Link>
                        </>
                    )}
                </section>
                <section className="flex flex-col items-center gap-4 mt-70 w-full xl:w-7xl">
                    <h2 className="text-2xl font-semibold">¿Cómo funciona escReact? 🤔</h2>
                    <p className="text-lg text-center text-white/70 text-wrap">Está formado por dos juegos totalmente diferentes, esc y React, los cuales son totalmente diferentes, en el primero deberás escribir el mayor número de palabras posibles en un tiempo determinado, y en el segundo, debes hacer clic en una caja cuando cambie de color lo más rápido posible.</p>
                    <article className="grid w- grid-cols-1 gap-5 xl:w-full xl:grid-cols-2 xl:gap-20 items-center mt-5">
                        <div className="flex flex-col items-center justify-center gap-4 border border-[#444] rounded-lg p-4 bg-black/50">
                            <h3 className="text-xl font-bold">Esc</h3>
                            <p className="text-base text-white/70">Escribe el mayor número de palabras posibles en un tiempo determinado</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4 border border-[#444] rounded-lg p-4 bg-black/50">
                            <h3 className="text-xl font-bold">React</h3>
                            <p className="text-wrap text-base text-white/70">Escribe el mayor número de palabras posibles en un tiempo determinado</p>
                        </div>
                    </article>
                </section>
            </main>
            <footer className="flex items-center justify-center border-t border-[#333]">
                <div className="flex flex-col w-full xl:w-7xl">
                    <p>escReact &copy; 2025</p>
                    <p>Sitio web realizado por David Moreno Cámara</p>
                </div>
            </footer>
        </div>
    )
}

{/* 
<h1 className="text-6xl font-bold text-white">React</h1>
<p className="text-xl text-white/90">Haz clic en esta caja para iniciar el test de reacción</p>
<p className="text-sm text-white/70">Cuando la caja se vuelva de color verde, clica lo antes posible</p> */}
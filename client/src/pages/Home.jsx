import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import MainBackground from "../components/MainBackground.jsx";
import NavBar from "../components/NavBar.jsx";
import useUser from "../hooks/useUser.jsx";

export default function Home() {
    const { globalUsername, isLogged } = useUser();

    return (
        <>
        <div className="relative max-w-screen min-h-screen flex flex-col justify-between">
            <main className="flex flex-col items-center justify-center px-4">
                <MainBackground />
                <NavBar />
                <section className="flex flex-col items-center w-fit xl:w-6xl gap-3 mt-52">
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
                        <p className="text-xl text-white/70 text-center text-balance">¡Bienvenido/a de nuevo, <span className="font-semibold text-white/20 bg-clip-text bg-gradient-to-br from-emerald-500 to-blue-500">{globalUsername}</span>!</p> 
                        <Link to={"/leaderboards"} className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full hover:scale-105 transition-all duration-200">Ver clasificación</Link>
                        </>
                    )}
                </section>
                <section className="flex flex-col items-center gap-4 mt-70 w-full xl:w-6xl">
                    <h2 className="text-2xl font-semibold">¿Cómo funciona escReact? 🤔</h2>
                    <p className="text-lg text-center text-white/70 text-wrap">Está formado por dos juegos totalmente diferentes, esc y React, los cuales son totalmente diferentes, en el primero deberás escribir el mayor número de palabras posibles en un tiempo determinado, y en el segundo, debes hacer clic en una caja cuando cambie de color lo más rápido posible.</p>
                    <article className="grid grid-cols-1 gap-5 w-96 xl:w-full xl:grid-cols-2 xl:gap-20 items-center mt-5">
                        <div className="flex flex-col items-start justify-center gap-4 border border-[#444] rounded-lg p-4 bg-black/50">
                            <h3 className="text-xl font-bold">Esc</h3>
                            <p className="text-base text-white/70 text-wrap">Escribe el mayor número de palabras posibles en un tiempo determinado.</p>
                            <img className="rounded-lg border border-[#444]" src="./esc.png" alt="Imagen de Esc" />
                            <div className="flex justify-start items-start gap-3">
                                <Link to="/esc" className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full hover:scale-105 transition-all duration-200">Jugar</Link>
                                <Link to="/leaderboards/#esc" className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Clasificación</Link>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-center gap-4 border border-[#444] rounded-lg p-4 bg-black/50">
                            <h3 className="text-xl font-bold">React</h3>
                            <p className="text-wrap text-base text-white/70">Reacciona lo más rápido que puedas a las pantallas verdes para lucir tu velocidad de reacción.</p>
                            <img className="rounded-lg border border-[#444] opacity-70" src="./react.png" alt="Imagen de React" />
                            <div className="flex justify-start items-start gap-3">
                                <Link to="/react" className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full hover:scale-105 transition-all duration-200">Jugar</Link>
                                <Link to="/leaderboards/#react" className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Clasificación</Link>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
            <Footer className="mt-10" />
        </div>
        </>
    )
}
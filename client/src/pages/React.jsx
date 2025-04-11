import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import MainBackground from "../components/MainBackground";

export default function React() {
    const startBoxRef = useRef(null);
    const gameBoxRef = useRef(null);

    function handleStartGame() {
        startBoxRef.current.classList.add("opacity-0", "pointer-events-none");
        gameBoxRef.current.classList.remove("opacity-0", "pointer-events-none");

        gameBoxRef.current.classList.add("bg-red-500/50");
        setTimeout(() => {
            gameBoxRef.current.classList.remove("bg-red-500/50");
            gameBoxRef.current.classList.add("bg-green-500/50");
        }, Math.floor(Math.random() * 2000) + 3000);
    }

    function handleBoxClick() {
        startBoxRef.current.classList.remove("bg-green-500/50");
        startBoxRef.current.classList.add("bg-red-500/50");
        setTimeout(() => {
            startBoxRef.current.classList.remove("bg-red-500/50");
            startBoxRef.current.classList.add("bg-green-500/50");
        }, Math.floor(Math.random() * 2000) + 3000);
    }

    return (
        <main className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <MainBackground />
            <NavBar />
            <button disabled={false} ref={startBoxRef} onClick={handleStartGame} className="absolute top-20 h-[calc(100%-500px)] w-full flex flex-col gap-3 items-center justify-center bg-gradient-to-br from-emerald-500/50 to-blue-600/50">
                <h1 className="text-6xl font-bold text-white">React</h1>
                <p className="text-xl text-white/90">Haz clic en esta caja para iniciar el test de reacción</p>
                <p className="text-sm text-white/70">Cuando la caja se vuelva de color verde, clica lo antes posible</p>
            </button>
            <button disabled={true} ref={gameBoxRef} onClick={handleBoxClick} className="absolute top-20 h-[calc(100%-500px)] w-full opacity-0 pointer-events-none">

            </button>
        </main>
    )
}

{/* <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-6xl font-bold text-white">EscReact</h1>
        <p className="text-xl text-white/70">¡Pronto estará disponible!</p>
        <p className="text-sm text-white/50">Mientras tanto, puedes visitar el <Link to={"/leaderboards"}>leaderboard de esc.</Link></p>
</div> */}
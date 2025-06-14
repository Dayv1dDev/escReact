import Axios from "axios";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import MainBackground from "../components/MainBackground";
import useUser from "../hooks/useUser.jsx";

export default function React() {
    Axios.defaults.withCredentials = true;
    let timeoutId = null;
    const msTillChange = Math.floor(Math.random() * 2000) + 3000;

    const startBoxRef = useRef(null);
    const gameBoxRef = useRef(null);
    const resultsBoxRef = useRef(null);

    const { isLogged, globalUsername } = useUser();

    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isPlayingRound, setIsPlayingRound] = useState(false);
    const [waitingForClick, setWaitingForClick] = useState(false);
    const [msSinceGreen, setMsSinceGreen] = useState(0);
    const [innerGameMessage, setInnerGameMessage] = useState("");
    const [innerSecondMessage, setInnerSecondMessage] = useState(null);
    const [resultsArray, setResultsArray] = useState([]);
    const [gameAverage, setGameAverage] = useState(0);

    function handleStartGame() {
        setResultsArray([]);
        startBoxRef.current.classList.add("opacity-0", "pointer-events-none", "hidden");
        startBoxRef.current.classList.remove("flex", "flex-col", "items-center", "justify-center");
        gameBoxRef.current.classList.remove("opacity-0", "pointer-events-none", "hidden");
        gameBoxRef.current.classList.add("flex", "flex-col", "items-center", "justify-center");

        gameBoxRef.current.classList.add("bg-red-500/50");
        setIsGameStarted(true);
        setIsPlayingRound(true);
        setInnerGameMessage("Espera a que la caja se vuelva verde...");
        timeoutId = setTimeout(() => {
            gameBoxRef.current.classList.remove("bg-red-500/50");
            gameBoxRef.current.classList.add("bg-green-500/50");
            setInnerGameMessage("¡Haz clic!");
            setMsSinceGreen(Date.now());
            setWaitingForClick(true);
        }, msTillChange);
    }

    function handleResetGame() {
        clearTimeout(timeoutId);
        setIsGameStarted(false);
        setIsPlayingRound(false);
        setWaitingForClick(false);
        setMsSinceGreen(0);
        setInnerGameMessage("");
        setInnerSecondMessage(null);
        setResultsArray([]);
        setGameAverage(0);

        resultsBoxRef.current.classList.add("opacity-0", "pointer-events-none");

        gameBoxRef.current.classList.remove("bg-green-500/50", "bg-red-500/50", "bg-blue-500/50");
        gameBoxRef.current.classList.add("opacity-0", "pointer-events-none", "hidden");

        startBoxRef.current.classList.remove("opacity-0", "pointer-events-none", "hidden");
        startBoxRef.current.classList.add("flex", "flex-col", "items-center", "justify-center");
    }

    function handleBoxClick() {
        setInnerSecondMessage(null);
        if (resultsArray.length === 3) gameOver();
        if (waitingForClick){
            const reactionTime = Date.now() - msSinceGreen;
            setWaitingForClick(false);
            setIsPlayingRound(false);
            setResultsArray((prev) => [...prev, reactionTime]);
            setInnerGameMessage(`Tu tiempo de reacción ha sido de: ${reactionTime} ms.`);
            setInnerSecondMessage("Haz clic para continuar.");
            gameBoxRef.current.classList.remove("bg-green-500/50");
            gameBoxRef.current.classList.add("bg-blue-500/50");
        }
        if (isGameStarted && !isPlayingRound) {
            gameBoxRef.current.classList.remove("bg-blue-500/50");
            gameBoxRef.current.classList.add("bg-red-500/50");
            setInnerGameMessage("Espera a que la caja se vuelva verde...");
            setIsPlayingRound(true);
            setTimeout(() => {
                gameBoxRef.current.classList.remove("bg-red-500/50");
                gameBoxRef.current.classList.add("bg-green-500/50");
                setInnerGameMessage("¡Haz clic!");
                setMsSinceGreen(Date.now());
                setWaitingForClick(true);
            }, msTillChange);
        }
    }

    function gameOver() {
        setIsGameStarted(false);
        gameBoxRef.current.classList.remove("flex", "flex-col", "items-center", "justify-center");
        gameBoxRef.current.classList.add("opacity-0", "pointer-events-none", "hidden");
        resultsBoxRef.current.classList.remove("opacity-0", "pointer-events-none");

        resultsArray.sort((a, b) => a - b);
        const average = Math.floor(resultsArray.reduce((a, b) => a + b, 0) / resultsArray.length);

        setGameAverage(average);

        Axios.post("http://localhost:5174/react", {
            username: globalUsername,
            speed: average
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.error("Error al enviar la puntuación: ", err);
        });
    }

    return (
        <>
        {isLogged === true && (
            <main className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <MainBackground />
                <NavBar />
                <article ref={startBoxRef} onClick={handleStartGame} className="absolute top-20 h-[calc(100%-500px)] w-full flex flex-col gap-3 items-center justify-center cursor-pointer bg-gradient-to-br from-emerald-500/50 to-blue-600/50">
                    <h1 className="text-6xl font-bold text-white">React</h1>
                    <p className="text-xl text-white/90">Haz clic en esta caja para iniciar el test de reacción</p>
                    <p className="text-sm text-white/70">Cuando la caja se vuelva de color verde, clica lo antes posible</p>
                </article>
                <article ref={gameBoxRef} onClick={handleBoxClick} className="absolute hidden top-20 h-[calc(100%-500px)] w-full opacity-0 pointer-events-none cursor-pointer">
                    <span className="flex flex-col text-xl font-semibold">
                        {innerGameMessage}
                        {innerSecondMessage && <span className="text-sm text-white/70">{innerSecondMessage}</span>}
                    </span>
                </article>
                <article ref={resultsBoxRef} className="absolute top-20 h-[calc(100%-500px)] w-full flex flex-col gap-3 items-center justify-center bg-gradient-to-br from-emerald-500/50 to-blue-600/50 opacity-0 pointer-events-none">
                    <h1 className="text-6xl font-bold text-white">Resultados</h1>
                    <p className="text-xl font-semibold text-white/90">Tus tiempos de reacción han sido: {resultsArray.join(", ")} ms. Con una media de {gameAverage} ms</p>
                    <div className="flex gap-3">
                        <button className="bg-black/25 hover:bg-gray-600/20 transition-all duration-300 p-2 rounded-md w-fit place-self-center" onClick={handleResetGame}>Reset</button>
                        <Link to="/leaderboards/#react" className="bg-black/25 hover:bg-gray-600/20 transition-all duration-300 p-2 rounded-md place-self-center">Clasificación</Link>
                    </div>
                </article>
            </main>
        )}
        {isLogged === false && (
            <main className="flex h-screen w-auto items-center justify-center">
                <MainBackground />
                <section className="flex flex-col items-center justify-center gap-6 p-10 max-w-[500px] rounded-sm bg-gradient-to-br from-emerald-600/50 to-blue-600/50">
                    <h1 className="text-center text-3xl font-bold">Inicia sesión o regístrate para poder jugar a React</h1>
                    <div className="flex gap-3">
                        <Link to="/login" className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 hover:scale-105 transition-all duration-300 rounded-full">Iniciar sesión</Link>
                        <Link to="/register" className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Regístrate</Link>
                    </div>
                </section>
            </main>
        )}
        </>
    )
}
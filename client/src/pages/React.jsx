import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import NavBar from "../components/NavBar";
import MainBackground from "../components/MainBackground";

export default function React() {
    let timeoutId = null;
    const msTillChange = Math.floor(Math.random() * 2000) + 3000;

    const startBoxRef = useRef(null);
    const gameBoxRef = useRef(null);
    const resultsBoxRef = useRef(null);

    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isPlayingRound, setIsPlayingRound] = useState(false);
    const [waitingForClick, setWaitingForClick] = useState(false);
    const [msSinceGreen, setMsSinceGreen] = useState(0);
    const [innerGameMessage, setInnerGameMessage] = useState("");
    const [innerSecondMessage, setInnerSecondMessage] = useState(null);
    const [resultsArray, setResultsArray] = useState([]);
    const [gameAverage, setGameAverage] = useState(0);

    // useEffect(() => {
    //     var timeoutId = setTimeout(() => {
    //         gameBoxRef.current.classList.remove("bg-red-500/50");
    //         gameBoxRef.current.classList.add("bg-green-500/50");
    //         setInnerGameMessage("¡Haz clic!");
    //         setMsSinceGreen(Date.now());
    //         setWaitingForClick(true);
    //     }, msTillChange);
    // }, [isGameStarted, isPlayingRound]);

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

    function handleBoxClick() {
        console.log("click");
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
        // if (!waitingForClick && isGameStarted && isPlayingRound) {
        //     setInnerGameMessage("¡Demasiado pronto! Espera a que la caja se vuelva verde.");
        //     clearTimeout(timeoutId);
        //     setWaitingForClick(false);
        //     setIsPlayingRound(false);
        //     gameBoxRef.current.classList.remove("bg-red-500/50");
        //     gameBoxRef.current.classList.add("bg-blue-500/50");
        // }
    }

    function gameOver() {
        setIsGameStarted(false);
        gameBoxRef.current.classList.remove("flex", "flex-col", "items-center", "justify-center");
        gameBoxRef.current.classList.add("opacity-0", "pointer-events-none", "hidden");
        resultsBoxRef.current.classList.remove("opacity-0", "pointer-events-none");

        resultsArray.sort((a, b) => a - b);
        const average = resultsArray.reduce((a, b) => a + b, 0) / resultsArray.length;

        setGameAverage(average);
    }
    // TO-DO: No dejar que el usuario pueda jugar sin iniciar sesión
    // TO-DO: Dentro del juego, si el usuario hace clic antes de que la caja se vuelva verde, mostrar bien el mensaje de error informativo sin que desaparezca por la pantalla verde
    // TO-DO: Guardar los resultados en la base de datos
    return (
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
            </article>
        </main>
    )
}

{/* 
<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-4">
    <h1 className="text-6xl font-bold text-white">EscReact</h1>
    <p className="text-xl text-white/70">¡Pronto estará disponible!</p>
    <p className="text-sm text-white/50">Mientras tanto, puedes visitar el <Link to={"/leaderboards"}>leaderboard de esc.</Link></p>
</div>
*/}
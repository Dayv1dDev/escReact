import { useEffect, useState } from "react";
import { words } from "../data/words";
import MainBackground from "../components/MainBackground";

export default function Esc() {
    const INITIAL_TIME = 30;
    const sortedWords = words.sort(() => Math.random() - 0.5).slice(0, 30);
    const [time, setTime] = useState(INITIAL_TIME);
    const [currentWords, setCurrentWords] = useState(sortedWords);

    useEffect(() => {
        startGame();
        // startEvents();
    }, []);

    function startGame() {
        setCurrentWords(sortedWords);
        let currentTime = INITIAL_TIME;

        const firstWordEl = document.querySelector("x-word");
        firstWordEl.classList.add("active");
        firstWordEl.firstElementChild.classList.add("active");

        const interval = setInterval(() => {
            currentTime--;
            setTime(currentTime);

            if (currentTime === 0) {
                clearInterval(interval);
                gameOver();
            }
        }, 1000);
    }
    
    function gameOver() {
        console.log("Game Over");
    }
    
    function startEvents() {
        // document.addEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(event) {
        console.log(event.key);
    }


    return (
        <main className="h-screen flex justify-center items-center font-mono">
            <MainBackground />
            <section className="md:w-3xl sm:w-xl w-lg flex flex-col justify-center">
                <time className="mb-1.5 md:text-3xl text-2xl font-semibold bg-clip-text text-white/10 bg-gradient-to-br from-emerald-500 to-blue-600">{time}</time>
                <p className="flex flex-wrap md:text-2xl sm:text-xl text-xl gap-x-3 gap-y-1">
                    {currentWords.map((word, index) => {
                        const letters = word.split("");

                        return (
                            <x-word key={index}>
                                {letters.map((letter, index) => {
                                    return (
                                        <x-letter key={index}>{letter}</x-letter>
                                    )
                                })}
                            </x-word>
                        )
                    })}
                </p>
                <input autoFocus className="absolute top-0 left-0 pointer-events-none" />
            </section>
        </main>
    )
};
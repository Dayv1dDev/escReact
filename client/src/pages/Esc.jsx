import { useState } from "react";
import { words } from "../data/words";
import MainBackground from "../components/MainBackground";

export default function Esc() {
    const INITIAL_TIME = 30;
    const [time, setTime] = useState(INITIAL_TIME);

    const sortedWords = words.sort(() => Math.random() - 0.5).slice(0, 30)

    // startGame()
    // startEvents()

    function startGame() {
        let currentTime = INITIAL_TIME;
    }
    
    function startEvents() {
        // document.addEventListener("keydown", handleKeyDown);
    }

    return (
        <main className="h-screen flex justify-center items-center font-mono">
            <MainBackground />
            <section className="md:w-3xl sm:w-xl w-lg flex flex-col justify-center">
                <time className="md:text-3xl text-2xl font-semibold bg-clip-text text-white/10 bg-gradient-to-br from-emerald-500 to-blue-600">{time}</time>
                <p className="flex flex-wrap md:text-2xl sm:text-xl text-xl gap-x-2 gap-y-0.5">
                    {sortedWords.map((word, index) => {
                        const letters = word.split("")

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
                <input autoFocus className="-z-333 absolute top-0 left-0 pointer-events-none" />
            </section>
        </main>
    )
};
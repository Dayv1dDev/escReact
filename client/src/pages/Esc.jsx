import { act, useEffect, useRef, useState } from "react";
import { words } from "../data/words";
import MainBackground from "../components/MainBackground";

export default function Esc() {
    const inputRef = useRef(null);

    const INITIAL_TIME = 30;
    const sortedWords = words.sort(() => Math.random() - 0.5).slice(0, 30);
    const [time, setTime] = useState(INITIAL_TIME);
    const [currentWords, setCurrentWords] = useState(sortedWords);

    useEffect(() => {
        startGame();
        startEvents();
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
        document.addEventListener("keydown", () => {
            inputRef.current.focus();
        });

        inputRef.current.addEventListener("keydown", keyDown);
        inputRef.current.addEventListener("keyup", keyUp);
    }

    function keyDown(e) {
        const { key } = e;
        const activeWordEl = document.querySelector("x-word.active");
        const activeLetterEl = activeWordEl.querySelector("x-letter.active");

        if (key === " ") {
            e.preventDefault();
            
            const nextWordEl = activeWordEl.nextElementSibling;
            const nextLetterEl = nextWordEl.querySelector("x-letter");

            activeWordEl.classList.remove("active", "marked");
            activeLetterEl.classList.remove("active");

            nextWordEl.classList.add("active");
            nextLetterEl.classList.add("active");

            inputRef.current.value = "";

            const hasMissingLetters = activeWordEl.querySelectorAll("x-letter:not(.correct)").length > 0;
            const classToAdd = hasMissingLetters ? "marked" : "correct";
            activeWordEl.classList.add(classToAdd);
        }

        if (key === "Backspace") {
            const prevWordEl = activeWordEl.previousElementSibling;
            const prevLetterEl = activeLetterEl.previousElementSibling;

            if (!prevWordEl && !prevLetterEl) {
                e.preventDefault();
                return;
            }
            
            const markedWordEl = document.querySelector("x-word.marked");
            if (!prevLetterEl && markedWordEl) {
                e.preventDefault();

                activeWordEl.classList.remove("active");
                activeLetterEl.classList.remove("active");
                prevWordEl.classList.remove("marked");
                prevWordEl.classList.add("active");

                const destinationLetterEl = prevWordEl.querySelector("x-letter:last-child");
                destinationLetterEl.classList.add("active");

                inputRef.current.value = [
                    ...prevWordEl.querySelectorAll("x-letter.correct", "x-letter.incorrect")
                ].map(letterEl => { 
                    return letterEl.classList.contains("correct") ? letterEl.innerText : "?";
                }).join("");
            }
        }
    }
    

    function keyUp(e) {
        const activeWordEl = document.querySelector("x-word.active");
        const activeLetterEl = activeWordEl.querySelector("x-letter.active");
        const lettersEl = activeWordEl.querySelectorAll("x-letter");

        const currentWord = activeWordEl.textContent.trim();
        inputRef.current.maxLength = currentWord.length;


        lettersEl.forEach(letterEl => {
            letterEl.classList.remove("correct", "incorrect");
        });
        
        inputRef.current.value.split("").forEach((char, index) => {
            const letterEl = lettersEl[index];
            const letterToCheck = currentWord[index];
            
            const isCorrect = char === letterToCheck;
            const letterClass = isCorrect ? "correct" : "incorrect";
            
            letterEl.classList.add(letterClass);
        })

        activeLetterEl.classList.remove("active", "is-last");
        const inputLength = inputRef.current.value.length;
        const nextLetterEl = lettersEl[inputLength];

        if (nextLetterEl) nextLetterEl.classList.add("active");  
        else activeLetterEl.classList.add("active", "is-last");
        // TO-DO: Revisar que la clase is-last funcione correctamente
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
                <input ref={inputRef} autoFocus className="absolute top-0 left-0 pointer-events-none" />
            </section>
            <section id="stats" className="hidden">
                <h2>Resultados:</h2>
                <p>Palabras correctas: <span id="correct-words">0</span></p>
                <p>Palabras incorrectas: <span id="incorrect-words">0</span></p>
                <p>Palabras totales: <span id="total-words">0</span></p>
                <p>Velocidad: <span id="speed">0</span> ppm</p>
            </section>
        </main>
    )
};
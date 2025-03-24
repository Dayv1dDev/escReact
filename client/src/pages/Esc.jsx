import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { words } from "../data/words";
import MainBackground from "../components/MainBackground";

export default function Esc() {
    const gameRef = useRef(null);
    const statsRef = useRef(null);
    const wordsRef = useRef(null);
    const inputRef = useRef(null);

    const INITIAL_TIME = 30;
    const sortedWords = words.toSorted(() => Math.random() - 0.5).slice(0, 36);

    const [time, setTime] = useState(INITIAL_TIME);
    const [currentWords, setCurrentWords] = useState(sortedWords);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

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
                setCorrectWords(gameOver().correctWords);
                setIncorrectWords(gameOver().incorrectWords);
                setSpeed(gameOver().speed);
                setAccuracy(gameOver().accuracy);
            }
        }, 1000);
    }
    
    function gameOver() {
        gameRef.current.classList.remove("flex", "flex-col");
        gameRef.current.classList.add("hidden");
        statsRef.current.classList.remove("hidden");
        statsRef.current.classList.add("flex", "flex-col");

        const incorrectWords = document.querySelectorAll("x-word.marked").length;
        const correctWords = document.querySelectorAll("x-word.correct").length;
        const incorrectLetters = document.querySelectorAll("x-letter.incorrect").length;
        const correctLetters = document.querySelectorAll("x-letter.correct").length;

        const totalLetters = correctLetters + incorrectLetters;
        
        const speed = correctWords / INITIAL_TIME * 60;
        const accuracy = (totalLetters > 0 ? (correctLetters / totalLetters) * 100 : 0).toFixed(2);

        return { correctWords, incorrectWords, speed, accuracy };
    }

    function resetGame() {
        setTime(INITIAL_TIME);

        gameRef.current.classList.remove("hidden");
        gameRef.current.classList.add("flex", "flex-col");
        statsRef.current.classList.remove("flex", "flex-col");
        statsRef.current.classList.add("hidden");

        wordsRef.current.querySelectorAll("x-word").forEach(wordEl => {
            wordEl.classList.remove("active", "marked", "correct");
            wordEl.querySelectorAll("x-letter").forEach(letterEl => {
                letterEl.classList.remove("active", "correct", "incorrect");
            });
        });

        inputRef.current.value = "";

        setCorrectWords(0);
        setIncorrectWords(0);
        setSpeed(0);
        setAccuracy(0);

        startGame();
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
                    ...prevWordEl.querySelectorAll("x-letter.correct, x-letter.incorrect")
                ].map(letterEl => { 
                    return letterEl.classList.contains("correct") ? letterEl.innerText : "¿";
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
        <main className="h-screen flex justify-center items-center">
            <MainBackground />
            <section ref={gameRef} className="font-mono md:w-3xl sm:w-xl w-lg flex flex-col justify-center">
                <time className="mb-1.5 md:text-3xl text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">{time}</time>
                <p ref={wordsRef} className="flex flex-wrap md:text-2xl sm:text-xl text-xl gap-x-3 gap-y-1">
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
                <input ref={inputRef} autoFocus className="absolute top-0 left-0 opacity-0 pointer-events-none" />
            </section>
            <section ref={statsRef} id="stats" className="hidden">
                <h2 className="mb-2 text-4xl font-bold">Resultados</h2>
                <div className="grid grid-cols-2 gap-6">
                    <p className="flex flex-col font-bold text-white/5 bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-400">Palabras correctas: <span className="text-white font-medium">{correctWords}</span></p>
                    <p className="flex flex-col font-bold text-white/5 bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-400">Palabras incorrectas: <span className="text-white font-medium">{incorrectWords}</span></p>
                    <p className="flex flex-col font-bold text-white/5 bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-400">Velocidad: <span className="text-white font-medium">{speed} ppm</span></p>
                    <p className="flex flex-col font-bold text-white/5 bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-400">Precisión: <span className="text-white font-medium">{accuracy}%</span></p>
                </div>
                <div className="mt-6 flex gap-4">
                    <button className="bg-black/25 hover:bg-gray-600/20 transition-all duration-300 p-2 rounded-md w-fit place-self-center" onClick={resetGame}>Reset</button>
                    <Link href="/leaderboard" className="bg-black/25 hover:bg-gray-600/20 transition-all duration-300 p-2 rounded-md place-self-center">Clasificación</Link>
                </div>
            </section>
        </main>
    )
};
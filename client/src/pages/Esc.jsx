import "../App.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { words } from "../data/words";
import MainBackground from "../components/MainBackground";
import NavBar from "../components/NavBar";
import ResultsParagraph from "../components/ResultsParagraph";
import useUser from "../hooks/useUser.jsx";

export default function Esc() {
    const navBarRef = useRef(null);
    const gameRef = useRef(null);
    const statsRef = useRef(null);
    const wordsRef = useRef(null);
    const startRef = useRef(null);
    const inputRef = useRef(null);

    const { isLogged, globalUsername } = useUser();

    const INITIAL_TIME = 30;
    const sortedWords = words.toSorted(() => Math.random() - 0.5).slice(0, 36);

    const [time, setTime] = useState(INITIAL_TIME);
    const [currentWords, setCurrentWords] = useState(sortedWords);
    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        if (isLogged === true) {
            setCurrentWords(sortedWords);
            startEvents();
        }
    }, [isLogged]);

    function startGame() {
        startRef.current.classList.add("hidden");
        navBarRef.current.classList.add("hidden");
        inputRef.current.disabled = false;
        startRef.current.disabled = true;
        let currentTime = INITIAL_TIME;

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
        gameRef.current.classList.remove("flex", "flex-col");
        gameRef.current.classList.add("hidden");
        statsRef.current.classList.remove("hidden");
        statsRef.current.classList.add("flex", "flex-col");

        inputRef.current.disabled = true;
        
        const incorrectWords = document.querySelectorAll("x-word.marked").length;
        const correctWords = document.querySelectorAll("x-word.correct").length;
        const incorrectLetters = document.querySelectorAll("x-letter.incorrect").length;
        const correctLetters = document.querySelectorAll("x-letter.correct").length;
        
        const totalLetters = correctLetters + incorrectLetters;
        
        const speed = correctWords / INITIAL_TIME * 60;
        let accuracy = totalLetters > 0 && correctLetters > 0 ? ((correctLetters / totalLetters) * 100).toFixed(2) : 0;
        if (!incorrectLetters && totalLetters > 0) accuracy = 100;
        
        Axios.post("http://localhost:5174/esc", {
            username: globalUsername,
            speed: speed,
            accuracy: accuracy
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.error("Error al enviar la puntuación: ", err);
        });

        setCorrectWords(correctWords);
        setIncorrectWords(incorrectWords);
        setSpeed(speed);
        setAccuracy(accuracy);
    }

    function resetGame() {
        setTime(INITIAL_TIME);
        startRef.current.disabled = false;
        inputRef.current.disabled = true;
        inputRef.current.value = "";

        gameRef.current.classList.remove("hidden");
        gameRef.current.classList.add("flex", "flex-col");
        statsRef.current.classList.remove("flex", "flex-col");
        statsRef.current.classList.add("hidden");

        startRef.current.classList.remove("hidden");

        wordsRef.current.querySelectorAll("x-word").forEach(wordEl => {
            wordEl.classList.remove("active", "marked", "correct");
            wordEl.querySelectorAll("x-letter").forEach(letterEl => {
                letterEl.classList.remove("active", "correct", "incorrect");
            });
        });

        setCorrectWords(0);
        setIncorrectWords(0);
        setSpeed(0);
        setAccuracy(0);
        window.location.reload();

        startEvents();
    }
    
    function startEvents() {
        const firstWordEl = document.querySelector("x-word");
        firstWordEl.classList.add("active");
        firstWordEl.firstElementChild.classList.add("active");

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
            activeLetterEl.classList.remove("active", "is-last");

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
    

    function keyUp() {
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
    }

    return (
        <>
        {isLogged === true && (
            <>
            <main className="relative h-screen flex justify-center items-center">
                <MainBackground />
                <NavBar ref={navBarRef} className={"opacity-85"} />
                <section ref={gameRef} className="font-mono md:w-3xl sm:w-xl w-lg flex flex-col justify-center">
                    <time className="mb-1.5 md:text-3xl text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">{time}</time>
                    <p ref={wordsRef} className="flex flex-wrap md:text-2xl sm:text-xl text-xl gap-x-3 gap-y-1">
                        {currentWords.map((word, index) => {
                            const letters = word.split("");

                            return (
                                <x-word key={index}>
                                    {letters.map((letter, index) => {
                                        return (
                                            <x-letter key={`${index}`} id={`${index}`}>{letter}</x-letter>
                                        )
                                    })}
                                </x-word>
                            )
                        })}
                    </p>
                    <button disabled={false} ref={startRef} onClick={startGame} className="absolute left-0 top-0 h-screen w-full bg-black/70">
                        <span>Pulsa clic para comenzar el test</span>
                    </button>
                    <input ref={inputRef} disabled autoFocus className="absolute top-0 left-0 opacity-0 pointer-events-none" />
                </section>
                <section ref={statsRef} id="stats" className="hidden">
                    <h2 className="mb-2 text-4xl font-bold">Resultados</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <ResultsParagraph stat={"Palabras correctas: "} statConst={correctWords} />
                        <ResultsParagraph stat={"Palabras incorrectas: "} statConst={incorrectWords} />
                        <ResultsParagraph stat={"Velocidad: "} statConst={`${speed} ppm`} />
                        <ResultsParagraph stat={"Precisión: "} statConst={`${accuracy}%`} />
                    </div>
                    <div className="mt-6 flex gap-4">
                        <button className="bg-black/25 hover:bg-gray-600/20 transition-all duration-300 p-2 rounded-md w-fit place-self-center" onClick={resetGame}>Reset</button>
                        <Link to="/leaderboards/#esc" className="bg-black/25 hover:bg-gray-600/20 transition-all duration-300 p-2 rounded-md place-self-center">Clasificación</Link>
                    </div>
                </section>
            </main>
            </>
        )}
        {isLogged === false && (
            <main className="flex h-screen w-auto items-center justify-center">
                <MainBackground />
                <section className="flex flex-col items-center justify-center gap-6 p-10 max-w-[500px] rounded-sm bg-gradient-to-br from-emerald-600/50 to-blue-600/50">
                    <h1 className="text-center text-3xl font-bold">Inicia sesión o regístrate para poder jugar a Esc</h1>
                    <div className="flex gap-3">
                        <Link to="/login" className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 hover:scale-105 transition-all duration-300 rounded-full">Iniciar sesión</Link>
                        <Link to="/register" className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Regístrate</Link>
                    </div>
                </section>
            </main>
        )}
        </>
    )
};
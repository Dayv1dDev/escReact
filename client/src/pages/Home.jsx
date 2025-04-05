import { Link } from "react-router-dom";
import MainBackground from "../components/MainBackground.jsx";
import NavBar from "../components/NavBar.jsx";

export default function Home() {
    return (    
        <div className="w-screen h-screen flex flex-col">
            <MainBackground />
            <main className="h-full">
                <NavBar />
                <section className="flex flex-col items-center">
                    <h1 className="text-3xl">La plataforma para prácticar mecanografía y reducir tu tiempo de reacción</h1>
                    <Link href="/register" className="w-fit py-2 px-4 mt-4 font-semibold border border-black rounded-full hover:bg-black/10 hover:border-black/50 transition-all duration-150">Regístrate</Link>
                </section>
            </main>
            <footer className="flex items-center justify-center border-t border-[#333]">
                <div className="flex flex-col w-7xl">
                    <p>escReact &copy; 2025</p>
                    <p>Sitio web programado por David Moreno Cámara</p>
                </div>
            </footer>
        </div>
    )
}
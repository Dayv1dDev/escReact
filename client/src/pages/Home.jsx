import MainBackground from "../components/MainBackground.jsx";
import NavBar from "../components/NavBar.jsx";

export default function Home() {
    return (    
        <>
            <MainBackground />
            <main>
                <NavBar />
                <section className="flex flex-col items-center">
                    <h1 className="text-6xl font-bold">¡Bienvenido/a a escReact!</h1>
                    <p className="text-2xl">La mejor plataforma de aprendizaje de Esc y React</p>
                    <a href="/register.html" className="w-fit py-2 px-4 mt-4 font-semibold border border-black rounded-full hover:bg-black/10 hover:border-black/50 transition-all duration-150">Regístrate</a>
                </section>
            </main>
        </>
    )
}
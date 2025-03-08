import { Link } from "react-router-dom";

export default function NavBar() { 
    return (
        <>
        {/* This is an invisible div with relative position so that it takes up the height of the menu (because menu is absolute/fixed) */}
        <div className="relative w-full h-20 opacity-0 pointer-events-none"></div>
        <header className="absolute z-50 top-0 left-0 w-full h-20 flex items-center justify-between px-8">
            <Link to="/"><h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-[#adadad]">escReact</h1></Link>
            <nav className="flex gap-3">
                <Link to="/esc" className="py-2 px-4 flex items-center">Esc</Link>
                <Link to="/react" className="py-2 px-4 flex items-center">React</Link>
                <Link to="/login" className="py-2 px-4 flex items-center font-semibold bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full">Iniciar sesión</Link>
                <Link to="/register" className="py-2 px-4 font-semibold border border-white rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300">Regístrate</Link>
            </nav>
        </header>
        </>
    )
}
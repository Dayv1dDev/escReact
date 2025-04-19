export default function Footer({ className }) {
    return (
        <footer className={`flex items-center justify-center border-t border-[#333] ${className}`}>
            <div className="flex flex-col w-full p-3 xl:p-0 xl:py-3 xl:w-6xl">
                <p className="font-bold">escReact &copy; 2025</p>
                <p>Sitio web realizado por <span className="font-bold text-white/20 bg-clip-text bg-gradient-to-br from-emerald-500 to-blue-500">David Moreno Cámara</span></p>
            </div>
        </footer>
    )
}
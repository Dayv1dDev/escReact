export default function ResultsParagraph({ stat, statConst, className }) {
    return (
        <p className={`flex flex-col font-bold text-white/5 bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-400 ${className}`}> 
            {stat}
            <span className="text-white font-medium">{statConst}</span>
        </p>
    )
}
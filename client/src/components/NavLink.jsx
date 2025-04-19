import "../App.css";
import { Link } from "react-router-dom";

export default function NavLink({href, text}) {
    return (
        <Link to={href} className="relative nav-link-animation-parent font-semibold flex items-center"><span className="w-fit nav-link-animation">{text}</span></Link>
    )
}
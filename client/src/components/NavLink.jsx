import "../App.css";
import { Link } from "react-router-dom";

export default function NavLink({href, text}) {
    return (
        <Link to={href} className="py-1.5 px-3 font-semibold flex items-center nav-link-animation">{text}</Link>
    )
}
import Context from "../context/UserContext.jsx";
import { useContext } from "react";

export default function useUser() {
    const { globalUsername, setGlobalUsername, isLogged, setIsLogged } = useContext(Context);

    return { 
        globalUsername, 
        setGlobalUsername, 
        isLogged, 
        setIsLogged
    };
}
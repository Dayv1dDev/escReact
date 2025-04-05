import { createContext, useState } from "react";

const Context = createContext();

export function UserContextProvider ({ children }) {
    const [globalUsername, setGlobalUsername] = useState(() => window.sessionStorage.getItem("username"));
    const [isLogged, setIsLogged] = useState(() => window.sessionStorage.getItem("isLogged") === "true" ? true : false);

    return (
        <Context.Provider value={{ globalUsername, setGlobalUsername, isLogged, setIsLogged }}>
            {children}
        </Context.Provider>
    );
};

export default Context;
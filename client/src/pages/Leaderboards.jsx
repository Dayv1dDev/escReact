import { useEffect, useState } from "react";
import Axios from "axios";
import MainBackground from "../components/MainBackground";
import NavBar from "../components/NavBar";
import useUser from "../hooks/useUser";

export default function Leaderboards() {
    const { globalUsername, isLogged } = useUser();
    const [escData, setEscData] = useState([]);
    const [escErrMsg, setEscErrMsg] = useState(null);
    const [reactData, setReactData] = useState([]);
    const [reactErrMsg, setReactErrMsg] = useState(null);
    const [username, setUsername] = useState(null);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        if (isLogged === true) setUsername(globalUsername);
        if (isLogged === false) setUsername(null);
        if (isLogged === null) setUsername(null);
    }, [isLogged])

    useEffect(() => {
        if (isLogged === true) setUsername(globalUsername);

        Axios.get("http://localhost:5174/esc/leaderboard", {
        }).then((res) => {
            if (res.data.message) setEscErrMsg(res.data.message);
            else {
                console.log(res.data);
                console.log('Clasificación del juego "Esc" obtenida correctamente');
                setEscData(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });

        Axios.get("http://localhost:5174/react/leaderboard", {
        }).then((res) => {
            if (res.data.message) setReactErrMsg(res.data.message);
            else {
                console.log(res.data);
                console.log('Clasificación del juego "React" obtenida correctamente');
                setReactData(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <main className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <MainBackground />
            <NavBar />
            <section className="flex flex-col items-center justify-center gap-y-20 w-full h-auto">
                <table className="table-auto w-1/2 text-center shadow-md rounded-lg overflow-hidden">
                    <caption className="bg-black/50 text-2xl font-bold text-white">Clasificación de Esc</caption>
                    {escErrMsg === null && (
                        <>
                        <thead>
                            <tr className="bg-black/50">
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">#</th>
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">Usuario</th>
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">Puntuación</th>
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">Precisión</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {username !== null && (
                                <>
                                {escData.map((user, index) => {
                                    const position = index + 1;
                                    const isCurrentUser = user.username === username;
                                    const rowCurrentUserClass = isCurrentUser ? "bg-gradient-to-br from-emerald-500/30 to-blue-600/30" : "";
                                    let evenOddPosStyling = "";

                                    if (!isCurrentUser) evenOddPosStyling = position % 2 === 0 ? "bg-black/50" : "bg-black/20";
                                    return (
                                        <tr className={`${rowCurrentUserClass} ${evenOddPosStyling}`} key={user.scoreId}>
                                            <td>{position}</td>
                                            <td>{user.username}</td>
                                            <td>{user.score} ppm</td>
                                            <td>{user.accuracy}%</td>
                                        </tr>
                                    )
                                })}
                                </>
                            )}
                            {username === null && (
                                <>
                                {escData.map((user, index) => {
                                    const position = index + 1;
                                    const evenOddPosStyling = position % 2 === 0 ? "bg-black/50" : "bg-black/20";
                                    return (
                                        <tr className={`${evenOddPosStyling}`} key={user.scoreId}>
                                            <td>{position}</td>
                                            <td>{user.username}</td>
                                            <td>{user.score} ppm</td>
                                            <td>{user.accuracy}%</td>
                                        </tr>
                                    )
                                })}
                                </>
                            )}
                        </tbody>
                        </>
                    )}
                    {escErrMsg !== null && (
                        <span>{escErrMsg}</span>
                    )}
                </table>
                <table className="table-auto w-1/2 text-center bg-black/10 shadow-md rounded-lg overflow-hidden">
                    <caption className="bg-black/50 text-2xl font-bold text-white">Clasificación de React</caption>
                    {reactErrMsg === null && (
                        <>
                        <thead>
                            <tr className="bg-black/50">
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">#</th>
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">Usuario</th>
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">Puntuación</th>
                                <th className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 to-blue-600">Precisión</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {username !== null && (
                                <>
                                {reactData.map((user, index) => {
                                    const position = index + 1;
                                    const isCurrentUser = user.username === username;
                                    const rowCurrentUserClass = isCurrentUser ? "bg-gradient-to-br from-emerald-500/30 to-blue-600/30" : "";
                                    let evenOddPosStyling = "";

                                    if (!isCurrentUser) evenOddPosStyling = position % 2 === 0 ? "bg-black/50" : "bg-black/20";
                                    return (
                                        <tr className={`${rowCurrentUserClass} ${evenOddPosStyling}`} key={user.scoreId}>
                                            <td>{position}</td>
                                            <td>{user.username}</td>
                                            <td>{user.score} ppm</td>
                                            <td>{user.accuracy}%</td>
                                        </tr>
                                    )
                                })}
                                </>
                            )}
                            {username === null && (
                                <>
                                {reactData.map((user, index) => {
                                    const position = index + 1;
                                    const evenOddPosStyling = position % 2 === 0 ? "bg-black/50" : "bg-black/20";
                                    return (
                                        <tr className={`${evenOddPosStyling}`} key={user.scoreId}>
                                            <td>{position}</td>
                                            <td>{user.username}</td>
                                            <td>{user.score} ppm</td>
                                            <td>{user.accuracy}%</td>
                                        </tr>
                                    )
                                })}
                                </>
                            )}
                        </tbody>
                        </>
                    )}
                    {reactErrMsg !== null && (
                        <tbody>
                            <tr className="h-20"><td>{reactErrMsg}</td></tr>
                        </tbody>
                    )}
                </table>
            </section>
        </main>
    )
}
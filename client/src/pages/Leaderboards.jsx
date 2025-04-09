import useUser from "../hooks/useUser";
import MainBackground from "../components/MainBackground";
import Axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

export default function Leaderboards() {
    // TO-DO: Dar estilos a la tabla
    const { globalUsername, isLogged } = useUser();
    const [data, setData] = useState([]);

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:5174/leaderboards", {
        }).then((res) => {
            if (res.data.message) console.log(res.data.message);
            else {
                console.log(res.data);
                console.log("Clasificación obtenida correctamente");
                setData(res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <main className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
            <MainBackground />
            <NavBar />
            <h1>Leaderboards</h1>
            <table className="table-auto w-1/2 text-center bg-black/10 shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Puntuación</th>
                        <th>Precisión</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => {
                        return (
                            <tr key={user.scoreId}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.score} ppm</td>
                                <td>{user.accuracy}%</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </main>
    )
}
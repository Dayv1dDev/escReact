const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "DMCFutbol10@",
    database: "escreact"
});

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al registrar el usuario");
        }
        res.status(201).send("Usuario registrado con éxito");
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error al iniciar sesión");
        }

        if (result.length > 0) {
            res.status(200).send("Inicio de sesión exitoso");
        } else {
            res.status(401).send("Nombre de usuario o contraseña incorrectos");
        }
    });
})

app.listen(5713, () => {
    console.log("Servidor conectado en el puerto 5713");
})
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: "./.env" });

const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    key: "userId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

db.connect((err) => {
    if (err) console.log(err);
    else console.log("MySQL conectado con éxito...");
});

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) console.log(err);
        db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hash], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al registrar el usuario");
            }
            res.status(201).send("Usuario registrado con éxito");
        });
    });
});

app.get("/", (req, res) => {
    if (req.session.user) res.send({ loggedIn: true, user: req.session.user });
    else res.send({ loggedIn: false });
});

app.get("/login", (req, res) => {
    if (req.session.user) res.send({ isLoggedIn: true, user: req.session.user });
    else res.send({ isLoggedIn: false, user: null });
});

app.get("/logout", (req, res) => {
    res.clearCookie("userId");
    req.session.destroy((err) => {
        if (err) console.log(err);
    });
    res.send({ message: "Sesión cerrada con éxito" });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT * FROM users WHERE username = ?", username, (err, result) => {
        if (err) res.send({ err: err });
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (err, response) => {
                if (err) console.log(err);
                if (response) {
                    req.session.user = result;
                    res.send(result);
                }
                else res.send({ message: "Nombre de usuario o contraseña incorrectos" });
            });
        } 
        else res.send({ message: "Usuario inexistente en la base de datos" });
    });
});

app.post("/esc", (req, res) => {
    const { username, speed, accuracy } = req.body;

    db.query("SELECT user_id FROM users WHERE username = ?", username, (err, result) => {
        const userId = result[0].user_id;
        if (err) res.send({ err: err });
        if (result.length > 0) {
            db.query("INSERT INTO scores(user, username, game, score, accuracy) VALUES (?, ?, 'Esc', ?, ?)", [userId, username, speed, accuracy], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Error al registrar los datos de esc");
                }
                res.status(201).send("Datos de esc registrados con éxito");
            });
        } 
        else res.send({ message: "Usuario inexistente en la base de datos" });
    })
});

app.get("/leaderboards", (req, res) => {
    db.query("SELECT * FROM scores ORDER BY score DESC", (err, result) => {
        if (err) console.log(err);
        if (result.length > 0) {
            const scores = result.map(score => {
                return {
                    scoreId: score.score_id,
                    userId: score.user,
                    username: score.username,
                    game: score.game,
                    score: score.score,
                    accuracy: score.accuracy
                };
            });
            res.send(scores);
        }
        else res.send({ message: "No hay datos disponibles en la base de datos" });
    });
});

app.listen(5174, () => {
    console.log("Servidor conectado en el puerto 5174");
});
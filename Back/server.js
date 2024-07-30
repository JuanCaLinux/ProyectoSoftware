const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./connectBD.js")
const appLogin = require("./loginBD.js")
const appRegister = require("./registerBD")
const appCategoria = require("./categoriaBD")
const mysql = require("mysql");
import { config } from 'dotenv';

const app = express();
config();
const { PORT } = process.env;

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'Vista' sirve el index.html en el inicio del servidor
app.use(express.static(path.join(__dirname,"..", 'Vista'))); //busca el index, porque maneja la solicitud que hacen al servidor y ubica el index y lo pone


// Configurar rutas

app.use("/api/login", appLogin);
app.use("/api/register", appRegister);
app.use("/api/categoria", appCategoria);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'Vista', 'index.html'));
});
//const PORT = 3000; // Cambiado a un puerto comúnmente utilizado para servidores web
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("./connectBD.js")
const appLogin = require("./loginBD.js")
const appRegister = require("./registerBD")
const appRegistrarGasto = require("./registroGastosBD")
const mysql = require("mysql");

const app = express();

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'Vista' sirve el index.html en el inicio del servidor
app.use(express.static(path.join(__dirname,"..", 'Vista'))); //busca el index, porque maneja la solicitud que hacen al servidor y ubica el index y lo pone


// Configurar rutas

//Ruta para manejar el login
app.use(appLogin);

// Ruta para manejar el registro de usuarios
app.use(appRegister);

// Ruta para manejar el registro de gastos
app.use(appRegistrarGasto);


const PORT = 3000; // Cambiado a un puerto comúnmente utilizado para servidores web
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

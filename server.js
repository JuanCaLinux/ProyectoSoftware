const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { body, validationResult } = require('express-validator');
const registerRoute = require('./register');
const loginRoute = require('./login'); // Importar el nuevo archivo login.js
require('dotenv').config({ path: './conexionbd.env' });

const app = express();

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta 'Vista'
app.use(express.static(path.join(__dirname, 'Vista')));

// Usar las rutas definidas en los archivos separados
app.use('/', registerRoute);
app.use('/', loginRoute); // Usar el nuevo archivo login.js

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

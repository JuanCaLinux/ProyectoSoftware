// Importación del módulo express para crear el servidor
const express = require("express");
// Creación de una instancia de la aplicación express para manejar las rutas de login
const appLogin = express();
// Importación del módulo de conexión a la base de datos
const db = require("./connectBD.js");

// Ruta POST para manejar solicitudes de login
// Esta ruta es llamada desde el script que maneja el formulario y devuelve si el email y password están en la base de datos
// Otro script maneja el resto de la lógica de la aplicación
appLogin.post('/login', (req, res) => {
    // Extracción de las credenciales de email y password del cuerpo de la solicitud
    const { email, password } = req.body;

    // Consulta SQL para verificar si el email y el password existen en la tabla de usuarios
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    // Ejecución de la consulta SQL con los valores de email y password
    db.query(query, [email, password], (err, results) => {
        // Manejo de errores en la consulta
        if (err) throw err;
        // Verificación de los resultados de la consulta
        if (results.length > 0) {
            // Si se encuentran resultados, se responde con éxito
            res.json({ success: true });
        } else {
            // Si no se encuentran resultados, se responde con fallo
            res.json({ success: false });
        }
    });
});

// Exportación de la instancia de la aplicación para ser usada en otros módulos
module.exports = appLogin;


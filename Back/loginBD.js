// Importación del módulo express para crear el servidor
import express from "express"
// Creación de una instancia de la aplicación express para manejar las rutas de login
const appLogin = express();
// Importación del módulo de conexión a la base de datos
import db from "./connectBD.js";

// Middleware para parsear el cuerpo de las solicitudes como JSON
appLogin.use(express.json());

// Ruta POST para manejar solicitudes de login
appLogin.post('/login', (req, res) => {
    // Extracción de las credenciales de email y password del cuerpo de la solicitud
    const { email, password } = req.body;

    // Consulta SQL para verificar si el email y el password existen en la tabla de usuarios
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Enviar el ID del usuario junto con el resto de la información
            res.json({
                success: true,
                admin: user.role === 'admin',
                userId: user.id // Suponiendo que el campo de ID se llama 'id'
            });
        } else {
            res.json({ success: false });
        }
    });
});

// Exportación de la instancia de la aplicación para ser usada en otros módulos
export default appLogin;

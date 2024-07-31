// backend/loginBD.js
const express = require("express");
const appLogin = express();
const db = require("./connectBD.js");
appLogin.use(express.json());

// Ruta POST para manejar solicitudes de login
appLogin.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            const user = results[0];
            res.json({
                success: true,
                admin: user.role === 'admin',
                userId: user.id
            });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = appLogin;

const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql');
require('dotenv').config({ path: './conexionbd.env' });

const router = express.Router();
const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // Manejar contraseña vacía
    database: process.env.DB_NAME || 'moneymate'
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos MySQL:', err);
        process.exit(1); // Terminar el proceso en caso de error
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Ruta para el manejo del inicio de sesión
router.post('/login', [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage('Contraseña requerida')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ?';

    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            return res.status(500).json({ success: false, message: 'Error del servidor' });
        }
        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                return res.json({ success: true });
            }
        }
        res.json({ success: false, message: 'Email o contraseña incorrectos' });
    });
});

module.exports = router;

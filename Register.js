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

// Ruta para manejar el registro de usuarios
router.post('/register', [
    body('nombre').notEmpty().withMessage('Nombre requerido'),
    body('apellido').notEmpty().withMessage('Apellido requerido'),
    body('email').isEmail().withMessage('Email inválido'),
    body('telefono').notEmpty().withMessage('Teléfono requerido'),
    body('usuario').notEmpty().withMessage('Usuario requerido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, apellido, email, telefono, usuario, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO usuarios (nombre, apellido, email, telefono, usuario, password) VALUES (?, ?, ?, ?, ?, ?)';

        db.query(query, [nombre, apellido, email, telefono, usuario, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error al insertar usuario:', err);
                return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
            }
            console.log('Usuario registrado correctamente.');
            res.status(200).json({ success: true, message: 'Usuario registrado correctamente' });
        });
    } catch (err) {
        console.error('Error al hashear la contraseña:', err);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

module.exports = router;

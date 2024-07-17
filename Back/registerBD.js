const express = require("express");
const appRegister = express();
const db = require("./connectBD");

appRegister.post('/register', (req, res) => {
    const { nombre, apellido, email, telefono, usuario, password } = req.body;

    // Verifica que tengas todas las variables definidas correctamente
    if (!nombre || !apellido || !email || !telefono || !usuario || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const query = "INSERT INTO usuarios (nombre, apellido, email, telefono, usuario, password) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(query, [nombre, apellido, email, telefono, usuario, password], (err ,result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
        }
        console.log('Usuario registrado correctamente.');
        res.status(200).json({ success: true, message: 'Usuario registrado correctamente' });
    });
});
module.exports = appRegister
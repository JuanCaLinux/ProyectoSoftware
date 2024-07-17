const express = require("express");
const appLogin = express();
const db = require("./connectBD.js")

//esta ruta se llama desde el script que maneja el formulario y devuelve si el email y password estan en la base de datos, el otro script maneja el resto

appLogin.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

module.exports = appLogin


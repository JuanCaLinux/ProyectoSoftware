const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();

// Configurar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar MySQL
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root', // Aquí deberías especificar la contraseña de tu base de datos MySQL
    database: 'moneymate'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
});

// Configurar rutas
//esta ruta se llama desde el script que maneja el formulario y devuelve si el email y password estan en la base de datos, el otro script maneja el resto
app.post('/login', (req, res) => {
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

// Ruta para manejar el registro de usuarios
app.post('/register', (req, res) => {
    const { nombre, apellido, email, telefono, usuario, password } = req.body;

    // Verifica que tengas todas las variables definidas correctamente
    if (!nombre || !apellido || !email || !telefono || !usuario || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO usuarios (nombre, apellido, email, telefono, usuario, password) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [nombre, apellido, email, telefono, usuario, password], (err, result) => {
        if (err) {
            console.error('Error al insertar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al registrar usuario' });
        }
        console.log('Usuario registrado correctamente.');
        res.status(200).json({ success: true, message: 'Usuario registrado correctamente' });
    });
});


// Servir archivos estáticos desde la carpeta 'Vista'
app.use(express.static(path.join(__dirname, 'Vista')));

const PORT = 3000; // Cambiado a un puerto comúnmente utilizado para servidores web
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

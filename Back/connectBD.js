const mysql = require("mysql");

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

module.exports = db;
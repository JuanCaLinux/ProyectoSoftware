const mysql = require("mysql");
const {DB_HOST,DB_NAME,DB_PORT,DB_PASSWORD,DB_USER} = require("./config.js")


const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD, // Aquí deberías especificar la contraseña de tu base de datos MySQL
    port:DB_PORT,
    database: DB_NAME

});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos MySQL.');
});

module.exports = db;
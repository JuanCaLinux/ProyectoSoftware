// const mysql = require("mysql");
// const {DB_HOST,DB_NAME,DB_PORT,DB_PASSWORD,DB_USER} = require("./config.js")
//
//
// const db = mysql.createConnection({
//     host: DB_HOST,
//     user: DB_USER,
//     password: DB_PASSWORD, // Aquí deberías especificar la contraseña de tu base de datos MySQL
//     port:DB_PORT,
//     database: DB_NAME
//
// });
//
// db.connect((err) => {
//     if (err) throw err;
//     console.log('Conectado a la base de datos MySQL.');
// });
//
// module.exports = db;

import mysql from 'mysql2/promise';
import { config } from 'dotenv';
import { parse } from 'url';

config(); // Cargar variables de entorno desde .env

const createDBConnection = async () => {
    try {
        const dbUrl = process.env.DATABASE_URL;
        const { hostname: host, port, pathname, auth } = new URL(dbUrl);
        const [user, password] = auth.split(':');
        const database = pathname.slice(1);

        const db = await mysql.createConnection({
            host,
            port,
            user,
            password,
            database,
        });
        console.log('Conectado a la base de datos MySQL.');
        return db;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
};

export default createDBConnection;


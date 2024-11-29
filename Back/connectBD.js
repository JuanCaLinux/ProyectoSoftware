import mysql from 'mysql2/promise'; // Importa la versión con soporte de promesas
import { config } from 'dotenv';

config(); // Cargar variables de entorno desde .env

const createDBConnection = async () => {
    try {
        const host = process.env.DB_HOST || "localhost";
        const port = process.env.DB_PORT || 3306;
        const user = process.env.DB_USER || "root";
        const password = process.env.DB_PASSWORD || "root";
        const database = process.env.DB_NAME || "moneymate";

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

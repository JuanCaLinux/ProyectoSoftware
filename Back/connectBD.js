import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables del archivo .env

const createDBConnection = async () => {
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);

        console.log('Conexión a MySQL exitosa');
        return connection;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
};

export default createDBConnection;

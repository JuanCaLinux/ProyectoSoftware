import mysql from 'mysql2/promise'; // Importa la versión con soporte de promesas
import { config } from 'dotenv';

config(); // Cargar variables de entorno desde .env (local)

const createDBConnection = async () => {
    try {
        const databaseUrl = process.env.DATABASE_URL; // Usar la URL de la base de datos desde las variables de entorno de Azure

        if (!databaseUrl) {
            throw new Error('DATABASE_URL no está definida en las variables de entorno');
        }

        // Configuración para la conexión con SSL
        const connection = await mysql.createConnection({
            uri: databaseUrl,
            ssl: {
                ca: fs.readFileSync('/path/to/BaltimoreCyberTrustRoot.crt.pem'), // Ruta al certificado raíz de Azure (puede que lo necesites)
            }
        });

        console.log('Conectado a la base de datos MySQL con SSL.');
        return connection;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
};

export default createDBConnection;

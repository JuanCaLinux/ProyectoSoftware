import mysql from 'mysql2/promise';  // Usamos mysql2 con promise

// Crear la conexión a la base de datos de manera que podamos usar async/await
const createDBConnection = async () => {
    try {
        // Usamos las variables de entorno configuradas en Vercel
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,  // Utilizamos la variable de entorno DB_HOST
            user: process.env.DB_USER,  // Utilizamos la variable de entorno DB_USER
            password: process.env.DB_PASSWORD,  // Utilizamos la variable de entorno DB_PASSWORD
            database: process.env.DB_NAME,  // Utilizamos la variable de entorno DB_NAME
            port: 3306  // El puerto generalmente sigue siendo 3306
        });
        console.log('Conexión a MySQL exitosa');
        return connection; // Retornamos la conexión
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err; // Propagamos el error para manejarlo en el controlador
    }
};

export default createDBConnection;

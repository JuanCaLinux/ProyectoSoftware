import express from "express";
const appRegistrarGasto = express();
import createDBConnection from "./connectBD.js";

appRegistrarGasto.use(express.json());

appRegistrarGasto.post('/', async (req, res) => {
    const { cantidad, fecha, descripcion, categoria, usuarioId } = req.body;
    console.log('Datos recibidos en /registrar-gasto:', req.body);

    let db;

    try {
        db = await createDBConnection();

        const queryGasto = 'INSERT INTO gastos (cantidad, fecha, descripcion, categoria, usuario_id) VALUES (?, ?, ?, ?, ?)';
        const [resultGasto] = await db.execute(queryGasto, [cantidad, fecha, descripcion, categoria, usuarioId]);
 if (resultGasto.affectedRows > 0){
     console.log('Gasto registrado con éxito');
     res.json({ success: true });
 }

    } catch (err) {
        console.error('Error al procesar la solicitud:', err.message);
        console.error(err.stack);
        return res.status(500).json({ success: false, message: 'Error al procesar la solicitud', error: err.message });
    } finally {
        if (db) {
            try {
                await db.end();
                console.log('Conexión a la base de datos cerrada.');
            } catch (closeErr) {
                console.error('Error al cerrar la conexión a la base de datos:', closeErr.message);
            }
        }
    }
});

export default appRegistrarGasto;

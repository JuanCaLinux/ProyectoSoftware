import express from "express";
const appRegistrarGasto = express();
import createDBConnection from "./connectBD.js";

appRegistrarGasto.use(express.json());

appRegistrarGasto.get('/', async (req, res) => {
    const { usuarioId } = req.query; // Asumimos que se pasa el usuarioId como parámetro de consulta
    console.log('Datos recibidos en /gastos:', req.query);

    let db;

    try {
        db = await createDBConnection();

        const queryGastos = 'SELECT * FROM gastos WHERE usuario_id = ?';
        const [gastos] = await db.execute(queryGastos, [usuarioId]);

        if (gastos.length > 0) {
            console.log('Gastos recuperados con éxito');
            res.json({ success: true, data: gastos });
        } else {
            console.log('No se encontraron gastos para el usuario');
            res.json({ success: true, data: [] });
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

appRegistrarGasto.delete('/', async (req, res) => {
    const { gastoId } = req.query; // Obtener el ID del gasto a eliminar de los parámetros de consulta
    console.log('ID del gasto a eliminar:', gastoId);

    let db;

    try {
        db = await createDBConnection();

        const queryDelete = 'DELETE FROM gastos WHERE id = ?';
        const [resultDelete] = await db.execute(queryDelete, [gastoId]);

        if (resultDelete.affectedRows > 0) {
            console.log('Gasto eliminado con éxito');
            res.json({ success: true });
        } else {
            console.log('No se encontró el gasto para eliminar');
            res.status(404).json({ success: false, message: 'Gasto no encontrado' });
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

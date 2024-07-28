const express = require("express");
const appCategoria = express();
const db = require("./connectBD.js")
/*ruta que devuelve todas*/
appCategoria.get("/categoria",(req, res)=>{
    let usuario_id = req.query.usuarioId;
    const query = 'SELECT * FROM categorias WHERE usuario_id = ?';

    db.query(query, [usuario_id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true, data:results });
        } else {
            res.json({ success: false });
        }
    });
})

appCategoria.delete("/categoria",(req,res)=>{
    const id = req.body
    const query = 'DELETE FROM categorias WHERE id = ?;'

    db.query(query,[id],(err,results)=>{
        if (err) throw err;
        if(results.affectedRows===0){
            return res.json({success:false,message:"no encontrado"})
        }
        return res.json({success:true,message:"dato eliminado correctamente"})
    })
})

/*ruta para agregar categorias*/
appCategoria.post("/categoria", async(req,res)=>{
    const {categoriasNuevas} = req.body
    let categoryAdded = [];
    const query = 'INSERT INTO categorias (nombre, presupuesto, usuario_id) VALUES (?, ?, ?);'

try{
    await Promise.all(categoriasNuevas.map((categoria)=>{
        return new Promise((resolve,reject)=>{
            db.query(query,[categoria.categoria,categoria.monto,categoria.usuarioId],(err,results)=>{
                if (err) throw err;
                if(results.affectedRows>0){
                    categoryAdded.push(categoria.id)
                }
                resolve();
            })
        })
    }))
    res.json({ success: true, message: 'Registros actualizados con éxito'})
}catch (err){
    console.error('Error in request handling:', err);
    res.status(500).json({ success: false, message: 'Error al actualizar registros', error: err.message });
}



})

/*ruta que actualiza las categorias todas*/
appCategoria.put("/categoria",async (req, res)=>{
    const {categoriasActualizar} = req.body
    const query = 'UPDATE categorias SET nombre = ?, presupuesto = ? WHERE usuario_id = ? AND id = ?;'


/*hay que manejar que guarde los que no existen */
   const promises = categoriasActualizar.map(async (categoria)=>{
        await db.query(query, [categoria.categoria,categoria.monto,categoria.usuarioId,categoria.id], (err, results) => {
            if (err) throw err;
            if (results.insertId){
                // res.json({success:true})
                // console.log('1 registro insertado, ID:', results.insertId);
                resolve(results);
            }
        });
    })
    try {
        // Esperar a que todas las promesas se resuelvan
        const results = await Promise.all(promises);

        // Verificar si alguna actualización se realizó
        const allUpdated = results.length>0

        if (allUpdated) {
            res.json({ success: true, message: 'Registros actualizados con éxito' });
        } else {
            res.status(404).json({ success: false, message: 'No se encontraron registros para actualizar' });
        }
    } catch (err) {
        console.error('Error ejecutando las consultas:', err);
        res.status(500).json({ success: false, message: 'Error ejecutando las consultas' });
    }
})

module.exports=appCategoria

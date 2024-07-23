const express = require("express");
const appCategoria = express();
const db = require("./connectBD.js")

appCategoria.get("/categoria",(req, res)=>{
    usuario_id = req.body
    const query = 'SELECT * FROM categorias WHERE usuario_id = ?';

    db.query(query, [usuario_id], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
})


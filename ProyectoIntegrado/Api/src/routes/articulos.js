const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/api/articulos', (req, res) =>{
    mysqlConnection.query('SELECT b.*, cb.tipoBien FROM proyecto.bienes AS b JOIN proyecto.codigobienes AS cb on b.codTipoBien = cb.codBienes;', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.get('/api/articulo/:idBienes', (req, res)=>{
    var idBienes = req.params.idBienes;
    console.log(idBienes);
    mysqlConnection.query('SELECT * FROM bienes WHERE idBienes = ?', [idBienes], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});

router.post('/api/postArticulo', (req, res)=>{

    var articulo = {
        "idBienes": 0,
        "codTipoBien": req.body.codTipoBien,
        "nombre": req.body.nombre,
        "unidadMedida": req.body.unidadMedida,
        "precioUnitario": req.body.precioUnitario
    }

    mysqlConnection.query('INSERT INTO proyecto.bienes SET ?', articulo, function(err, rows, fields){
        if (err){
            res.send({
                'code': 400,
                'failed': 'Error ocurred'
            })
        } else {
            res.send({
                'code': 200,
                'success': 'Empleado registrado correctamente!'
            })
        }
    })
});

router.put('/api/editArticulo/:idBienes', (req, res)=>{
    const{dniEmpleados, nombreEmpleado, idDepartamento, codEmpleado, cargoEmpleado} = req.body;
    var idBienes = req.params.idBienes
    console.log(req.body);
    console.log(idBienes);
    const query = `
    CALL EditarEmpleado(?,?,?,?,?,?);
    `;
    mysqlConnection.query(query,[dniEmpleados, nombreEmpleado, idDepartamento, codEmpleado, cargoEmpleado, idEmpleado], (err, rows, fields)=>{
        if(!err){
            res.json({Status:'Empleado editado con exito!'});
        }else{
            console.log(err);
        }
    });
});


router.delete('/api/delArticulo/:idBienes', (req, res)=>{
    var idBienes = req.params.idBienes
    console.log(idBienes)
    mysqlConnection.query('DELETE FROM proyecto.bienes WHERE idBienes = ?', [idBienes], (err, rows, fields) =>{
        if(!err){
            res.json({Status:'Empleado eliminado con exito!'});
        }else{
            console.log(err);
        }
    });
});



module.exports = router;

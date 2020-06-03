const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');
const bcrypt = require('bcryptjs');


router.get('/empleados', (req, res) =>{
    mysqlConnection.query('SELECT e.*, d.nombreDepartamento FROM proyecto.empleados AS e JOIN proyecto.departamentos AS d on e.idDepartamento = d.idDepartamentos;', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});


router.get('/empleados/:idEmpleado', (req, res)=>{
    var idEmpleado = req.params.idEmpleado;
    console.log(idEmpleado);
    mysqlConnection.query('SELECT * FROM empleados WHERE idEmpleado = ?', [idEmpleado], (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});



router.post('/empleados', (req, res)=>{

    var empleado = {
        "idEmpleado": 0,
        "dniEmpleados": req.body.dniEmpleados,
        "nombreEmpleado": req.body.nombreEmpleado,
        "idDepartamento": req.body.idDepartamento,
        "codEmpleado": req.body.codEmpleado,
        "cargoEmpleado": req.body.cargoEmpleado,
        "email": req.body.email
    }

    mysqlConnection.query('INSERT INTO proyecto.empleados SET ?', empleado, function(err, rows, fields){
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

/*//sequelize
.query('CALL login (:email, :pwd, :device)', 
{replacements: { email: "me@jsbot.io", pwd: 'pwd', device: 'android', }})
.then(v=>console.log(v));*/
router.put('/empleados/:idEmpleado', (req, res)=>{
    const{dniEmpleados, nombreEmpleado, idDepartamento, codEmpleado, cargoEmpleado} = req.body;
    var idEmpleado = req.params.idEmpleado
    console.log(req.body);
    console.log(idEmpleado);
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


router.delete('/empleados/:idEmpleado', (req, res)=>{
    var idEmpleado = req.params.idEmpleado
    console.log(idEmpleado)
    mysqlConnection.query('DELETE FROM proyecto.empleados WHERE idEmpleado = ?', [idEmpleado], (err, rows, fields) =>{
        if(!err){
            res.json({Status:'Empleado eliminado con exito!'});
        }else{
            console.log(err);
        }
    });
});



module.exports = router;
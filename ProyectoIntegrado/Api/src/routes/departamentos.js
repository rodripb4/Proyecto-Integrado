const express = require('express');
const router = express.Router();
const mysqlConnection = require('../database');

router.get('/departamentos', (req, res) =>{
    mysqlConnection.query('SELECT * FROM proyecto.departamentos', (err, rows, fields) =>{
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    });
});
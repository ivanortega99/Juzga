const { response } = require('express');
const dbOperations = require('../DB/dbOperations.js');
var config = require('../DB/dbConfig');
const sql = require('mssql');
const controller = {};

//Controladores
controller.showUsers = (request, response) => {
    dbOperations.getUsers().then(result => {
        response.json(result);
    })
}

controller.loginUser = async (req, res) => {
    try {
        let pool = await sql.connect(config);
        console.log(req.body);
        let row = await pool.query(`SELECT * FROM usr_User WHERE usr_username = '${req.body.usr_mail}'`);
        if(row[recordset].usr_password == req.body.usr_password){
            
        }else{
            res.json({result:"Contrasena invalida"})
        }

    } catch (error) {
        console.log(error.message);
        res.json({result:error.message})
    }
}

module.exports = controller;
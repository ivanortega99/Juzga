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
        let row = await pool.query(`SELECT * FROM usr_User WHERE usr_username = '${req.body.usr_mail}'`);
        if(row['recordset'][0].usr_password == req.body.usr_password){
            res.json({result:200})
        }else{
            res.json({result:500})
        }

    } catch (error) {
        console.log(error.message);
        res.json({result:error.message})
    }
}

module.exports = controller;
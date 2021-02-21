var config = require('../DB/dbConfig');
const sql = require('mssql');

const controller = {};

//Funciones en la BD
async function getUsers(){
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().query("SELECT * FROM usr_User");
        return usuarios.recordsets[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers: getUsers,
}
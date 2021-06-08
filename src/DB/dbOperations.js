var config = require('../DB/dbConfig');
const sql = require('mssql');

const controller = {};

//Funciones en la BD
async function getUsers() {
    try {
        let pool = await sql.connect(config);
        let usuarios = await pool.request().query("SELECT usr_id,usr_username,typ_name FROM usr_User INNER JOIN typ_UserType ON usr_User.usr_tipo_fk = typ_UserType.typ_id");
        return usuarios.recordsets[0];
    } catch (error) {ñ
        console.log(error);
    }
}

module.exports = {
    getUsers: getUsers,
}
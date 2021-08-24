const db = require('../../config/db');

exports.addUser = async (userData) => {
    try {
        let dbResponse = await db.query('INSERT INTO Usuario (id_tipo_usuario, nombre, apellidos, email, nombre_usuario, contrasena) VALUES (?, ?, ?, ?, ? , ?)',
            [userData.id_tipo_usuario,
            userData.nombre,
            userData.apellidos,
            userData.email,
            userData.nombre_usuario,
            userData.contrasena]);

        return {
            message: "Usuario creado",
            payload: {
                inserted: dbResponse.insertId
            },
            code: 201
        }
    } catch (err) {
        console.log(err);
        return {
            message: err.sqlMessage,
            code: 501
        }
    }
}
const db = require('../../config/db');

// Obtener todos los usuarios
exports.getUsers = async () => {
    try {
        let usuarios = await db.query("SELECT id_usuario, nombre_usuario, apellidos_usuario, email, username, tipo_usuario FROM Usuario INNER JOIN TipoUsuario ON TipoUsuario.id_tipo_usuario = Usuario.id_tipo_usuario");

        return {
            message: "Usuarios obtenidos!",
            payload: usuarios,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Obtener un solo usuario
exports.getUser = async (userId) => {
    try {
        let user = await db.query("SELECT id_usuario, nombre_usuario, apellidos_usuario, email, username, tipo FROM Usuario INNER JOIN TipoUsuario ON TipoUsuario.id_tipo_usuario = Usuario.id_tipo_usuario WHERE Usuario.id_usuario = ?", [userId]);

        return {
            message: "Usuario obtenido",
            payload: user[0],
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Crear usuario
exports.addUser = async (userData) => {
    try {
        let dbResponse = await db.query('INSERT INTO Usuario (id_tipo_usuario, nombre_usuario, apellidos_usuario, email, username, contrasena) VALUES (?, ?, ?, ?, ? , ?)',
            [userData.id_tipo_usuario,
            userData.nombre_usuario,
            userData.apellidos_usuario,
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

// Actualizar usuario
exports.updateUser = async (userId, dataToUpdate) => {
    try {
        let query = "";
        let newData = [];

        if (dataToUpdate.contrasena) {
            query = "UPDATE Usuario " +
            "SET nombre_usuario = ?, apellidos_usuario = ?, email = ?, username = ?, contrasena = ?, id_tipo_usuario = ? " +
            "WHERE id_usuario = ?";

            newData = [dataToUpdate.nombre_usuario, dataToUpdate.apellidos_usuario, dataToUpdate.email, dataToUpdate.username, dataToUpdate.contrasena, dataToUpdate.id_tipo_usuario, userId];
        } else {
            query = "UPDATE Usuario " +
            "SET nombre_usuario = ?, apellidos_usuario = ?, email = ?, username = ?, id_tipo_usuario = ? " +
            "WHERE id_usuario = ?";

            newData = [dataToUpdate.nombre_usuario, dataToUpdate.apellidos_usuario, dataToUpdate.email, dataToUpdate.username, dataToUpdate.id_tipo_usuario, userId];
        }
        let userUpdated = await db.query(query, newData);

        return {
            message: "Usuario actualizado",
            payload: userUpdated.message,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Eliminar un usuario
exports.deleteUser = async (userId) => {
    try {
        let userDeleted = await db.query("DELETE FROM Usuario WHERE id_usuario = ?", [userId]);
        console.log(userDeleted);
        return {
            message: "Usuario eliminado!",
            payload: { affectedRows: userDeleted.affectedRows },
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}
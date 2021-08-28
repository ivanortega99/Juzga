const usuariosDAO = require('../../dao/usuarios/usuarios.dao');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getUsers = async () => {
    try {
        let daoResponse = await usuariosDAO.getUsers();

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Obtener un usuario
exports.getUser = async (userId) => {
    try {
        let daoResponse = await usuariosDAO.getUser(userId);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Agregar usuario
exports.addUser = async (userData) => {
    try {
        let newPassword = await hashPassword(userData.contrasena);
        userData.contrasena = newPassword;

        let daoResponse = await usuariosDAO.addUser(userData);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

// Actualizar usuario
exports.updateUser = async (userId, dataToUpdate) => {
    try {
        if (dataToUpdate.contrasena) {
            let newPassword = await hashPassword(dataToUpdate.contrasena);
            dataToUpdate.contrasena = newPassword;
        }

        let daoResponse = await usuariosDAO.updateUser(userId, dataToUpdate);

        return daoResponse
    } catch (err) {
        console.log(err);
    }
}

// Eliminar un usuario
exports.deleteUser = async (userId) => {
    try {
        let daoResponse = await usuariosDAO.deleteUser(userId);

        return daoResponse;
    } catch (err) {
        console.log(err);
    }
}

/**
 * hashPassword function, encrypt password
 * @param {String} password - Student's password
 * @returns {String} encrypted
 */
 const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) reject(err)
            bcrypt.hash(password, salt, (err, encrypted) => {
                if (err) reject(err)
                resolve(encrypted)
            })
        })
    })
}
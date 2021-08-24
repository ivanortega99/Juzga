const usuariosDAO = require('../../dao/usuarios/usuarios.dao');
const bcrypt = require('bcryptjs');



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
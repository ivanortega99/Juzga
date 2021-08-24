const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const response = require('../../config/response');

exports.login = async (email, password) => {
    try {
        let user = await db.query('SELECT * FROM Usuario INNER JOIN TipoUsuario ON Usuario.id_tipo_usuario = TipoUsuario.id_tipo_usuario WHERE email LIKE ?', [email]);
        
        if (user.length == 0) {
            return {
                message: "Usuario no encontrado",
                code: 401,
                payload: ""
            }
        }

        let validate =  await validatePassword(user[0].contrasena, password);
        if (validate) {
            // datos correctos
            let newToken = generateJWT(user[0], password)
            return {
                message: "Usuario logeado correctamente",
                code: 200,
                payload: {
                    usuario: newToken[1],
                    token: newToken[0]
                }
            }
        } else {
            // datos incorrectos
            return {
                message: "Datos incorrectos",
                code: 401,
                payload: ""
            }
        }
    } catch (err) {
        console.log(err);
    }
}

/**
 * validatePassword function
 * @param {String} dbPass - Password in the database
 * @param {String} password - password entered by user
 * @returns {} _ -
 */
 const validatePassword = (dbPass, password) => {
    console.log('validatePassword function');

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, dbPass, (err, res) => {
            if(err) reject({message: err, code: 400})
            resolve(res)
        })
    })
}

/**
 * generateJWT function
 * @param {Student} student
 * @param {String} password - student password
 * @returns {Object} payload - jwt token and token decrypted
 */
 const generateJWT = (user, password) => {
    console.log('generateJWT function');

    let expiresIn = 28800
    // let expiresIn = 30
    let payload = {
        id_usuario: user.id_usuario,
        id_tipo_usuario: user.id_tipo_usuario,
        nombre: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        nombre_usuario: user.nombre_usuario,
        tipo_usuario: user.tipo
    }

    return [jwt.sign(payload, process.env.JWT_KEY || 'secret_key', {
        expiresIn: expiresIn
    }), payload]
}